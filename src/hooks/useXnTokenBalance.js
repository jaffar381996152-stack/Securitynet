"use client";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import settings from "../../data/settings";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || settings.CONTRACT_ADDRESS;
const BSC_RPC = "https://bsc-dataseed1.binance.org/";
const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

/**
 * Reads the connected wallet's live XN balance straight from BSC.
 *
 * When `watch` is true (use it on the post-payment success screen) it re-reads
 * every `intervalMs` and flips `received` to true once the balance covers the
 * pre-purchase baseline plus the `expectedXn` just bought — i.e. the tokens have
 * landed on-chain. This gives the buyer on-site proof of receipt without having
 * to import the token into their wallet first.
 *
 * Detection is threshold-based (baseline + expected), not increase-based,
 * precisely because the server awaits the XN transfer's confirmation before
 * replying — so the tokens are usually already on-chain by the time we start
 * watching, and a naive "did the balance go up from here?" check would never
 * fire. We freeze the baseline to the balance read *before* the purchase.
 */
export default function useXnTokenBalance({
  address,
  isConnected,
  watch = false,
  expectedXn = 0,
  intervalMs = 5000,
}) {
  const [balance, setBalance] = useState(null);
  const [received, setReceived] = useState(false);
  const baselineRef = useRef(null);
  const balanceRef = useRef(null);

  // Mirror the latest balance into a ref so the watch-start effect can freeze
  // the pre-purchase value without taking `balance` as a dependency.
  useEffect(() => { balanceRef.current = balance; }, [balance]);

  // Freeze the pre-purchase balance the moment watching begins, then reset.
  useEffect(() => {
    if (watch) {
      baselineRef.current = balanceRef.current;
      setReceived(false);
    }
  }, [watch, address]);

  useEffect(() => {
    if (!isConnected || !address) {
      setBalance(null);
      return;
    }

    let cancelled = false;
    let timer = null;
    let decimals = null;
    const provider = new ethers.JsonRpcProvider(BSC_RPC);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider);

    const read = async () => {
      try {
        if (decimals === null) decimals = await contract.decimals();
        const raw = await contract.balanceOf(address);
        if (cancelled) return;
        const value = parseFloat(ethers.formatUnits(raw, decimals));
        setBalance(value);

        if (watch && expectedXn > 0) {
          const base = baselineRef.current ?? 0;
          // 0.999 absorbs any rounding between the quoted XN and on-chain units.
          if (value >= base + expectedXn * 0.999) {
            setReceived(true);
            if (timer) { clearInterval(timer); timer = null; }
          }
        }
      } catch {
        /* transient RPC hiccup — next tick retries */
      }
    };

    read();
    if (watch) timer = setInterval(read, intervalMs);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [isConnected, address, watch, expectedXn, intervalMs]);

  return { balance, received };
}
