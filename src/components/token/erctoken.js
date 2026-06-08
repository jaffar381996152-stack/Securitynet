"use client";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";

import Participate from "@/app/presale/components/Participate";
import SaleTimer from "@/app/presale/components/SaleTimer";
import XNCoin from "@/components/brand/XNCoin";
import CoinBurst from "@/components/brand/CoinBurst";
import settings from "../../../data/settings";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || settings.CONTRACT_ADDRESS;
const USDT_NETWORKS = settings.USDT_NETWORKS;
const XN_PRICE = 0.20;

// ─── Chain logos ────────────────────────────────────────────────────────────

const BscLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#F0B90B" />
    <path d="M12 4.5L9.75 6.75L12 9L14.25 6.75L12 4.5Z" fill="white" />
    <path d="M7.5 9L5.25 11.25L7.5 13.5L9.75 11.25L7.5 9Z" fill="white" />
    <path d="M16.5 9L14.25 11.25L16.5 13.5L18.75 11.25L16.5 9Z" fill="white" />
    <path d="M12 9L9.75 11.25L12 13.5L14.25 11.25L12 9Z" fill="white" />
    <path d="M12 13.5L9.75 15.75L12 18L14.25 15.75L12 13.5Z" fill="white" />
  </svg>
);

const EthLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#627EEA" />
    <path d="M12 4.5V10.275L16.875 12.45L12 4.5Z" fill="white" fillOpacity="0.6" />
    <path d="M12 4.5L7.125 12.45L12 10.275V4.5Z" fill="white" />
    <path d="M12 15.975V19.5L16.878 13.35L12 15.975Z" fill="white" fillOpacity="0.6" />
    <path d="M12 19.5V15.974L7.125 13.35L12 19.5Z" fill="white" />
    <path d="M12 15.075L16.875 12.45L12 10.277V15.075Z" fill="white" fillOpacity="0.2" />
    <path d="M7.125 12.45L12 15.075V10.277L7.125 12.45Z" fill="white" fillOpacity="0.6" />
  </svg>
);

const TronLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#EF0027" />
    <path d="M17.5 9.5L12 5L6 9.5L8.5 18L12 19.5L15.5 18L17.5 9.5Z" fill="white" fillOpacity="0.15" />
    <path d="M12 5L17.5 9.5L15.5 10.5L12 7.5V5Z" fill="white" />
    <path d="M12 5L6 9.5L8.5 10.5L12 7.5V5Z" fill="white" fillOpacity="0.7" />
    <path d="M8.5 10.5L12 19.5V12L8.5 10.5Z" fill="white" fillOpacity="0.7" />
    <path d="M15.5 10.5L12 12V19.5L15.5 10.5Z" fill="white" />
    <path d="M8.5 10.5L15.5 10.5L12 12L8.5 10.5Z" fill="white" fillOpacity="0.5" />
  </svg>
);

const NETWORK_OPTIONS = [
  { key: "BSC",  label: "BNB Chain", sub: "BEP-20", Icon: BscLogo  },
  { key: "ETH",  label: "Ethereum",  sub: "ERC-20", Icon: EthLogo  },
  { key: "TRON", label: "Tron",      sub: "TRC-20", Icon: TronLogo },
];

// ─── Design primitives ───────────────────────────────────────────────────────

const GREEN = "#00C853";
const RED   = "#EF4444";

// The whole buy flow lives in ONE card that reshapes itself as you progress —
// no page changes, no separate boxes. These describe its three faces.
const FLOW_STAGES = [
  { key: "connect",   label: "Connect" },
  { key: "configure", label: "Send" },
  { key: "success",   label: "Done" },
];

const stageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

const SectionLabel = ({ children }) => (
  <p
    className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
    style={{ color: "var(--text-accent)" }}
  >
    {children}
  </p>
);

// ─── Main component ──────────────────────────────────────────────────────────

export default function DigitalGold() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const [selectedNetwork, setSelectedNetwork] = useState("BSC");
  const [usdtAmount, setUsdtAmount]     = useState(15);
  const [xnAmount, setXnAmount]         = useState((15 / XN_PRICE).toFixed(2));
  const [userTokenBalance, setUserTokenBalance] = useState(null);
  const [tokensSold]  = useState(0);
  const [presaleCap]  = useState(0);

  const [verified, setVerified]         = useState(null);
  const [burstKey, setBurstKey]         = useState(0);
  const [tronAddress, setTronAddress]   = useState("");
  const [copied, setCopied]             = useState(false);
  const [scanning, setScanning]         = useState(false);
  const pollIntervalRef = useRef(null);
  const scannerRef      = useRef(null);
  const scannerDivRef   = useRef(null);

  const startScanner = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    setScanning(true);
    setTimeout(async () => {
      const qr = new Html5Qrcode("tron-qr-reader");
      scannerRef.current = qr;
      try {
        await qr.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (text) => {
            setTronAddress(text.trim());
            qr.stop().then(() => setScanning(false)).catch(() => setScanning(false));
          },
          () => {}
        );
      } catch {
        setScanning(false);
      }
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setTronAddress(text.trim());
    } catch {}
  };

  const currentNetwork = USDT_NETWORKS[selectedNetwork];

  // Fetch XN balance on wallet connect
  useEffect(() => {
    if (!isConnected || !address) return;
    const fetchBalance = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          [
            "function balanceOf(address account) view returns (uint256)",
            "function decimals() view returns (uint8)",
          ],
          provider
        );
        const [balance, decimals] = await Promise.all([
          contract.balanceOf(address),
          contract.decimals(),
        ]);
        setUserTokenBalance(ethers.formatUnits(balance, decimals));
      } catch {}
    };
    fetchBalance();
  }, [isConnected, address]);

  const handleUsdtChange = (value) => {
    setUsdtAmount(value);
    setXnAmount((parseFloat(value) / XN_PRICE).toFixed(2));
    setVerified(null);
  };

  const handleXnChange = (value) => {
    setXnAmount(value);
    setUsdtAmount((parseFloat(value) * XN_PRICE).toFixed(2));
    setVerified(null);
  };

  const handleNetworkChange = (key) => {
    setSelectedNetwork(key);
    setVerified(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Background payment poll every 15 s once wallet is connected
  useEffect(() => {
    if (!isConnected || !address || verified) {
      clearInterval(pollIntervalRef.current);
      return;
    }
    const checkPayment = async () => {
      if (!usdtAmount || parseFloat(usdtAmount) < 10) return;
      if (selectedNetwork === "TRON" && !tronAddress) return;
      try {
        const res = await fetch("/api/check-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            network: selectedNetwork,
            senderAddress: selectedNetwork === "TRON" ? tronAddress : address,
            connectedWallet: address,
            usdtAmount: parseFloat(usdtAmount),
          }),
        });
        const data = await res.json();
        if (data.success) {
          clearInterval(pollIntervalRef.current);
          setVerified(data.data);
          setBurstKey((k) => k + 1);
          toast.success(
            <span>
              <strong>Payment Confirmed!</strong>
              <br />
              We received <strong>{data.data.usdtAmount} USDT</strong> from your wallet.
              <br />
              <strong>{data.data.xnTokens} XN</strong> tokens are being sent to your wallet now.
            </span>,
            { duration: 8000 }
          );
        }
      } catch {}
    };
    pollIntervalRef.current = setInterval(checkPayment, 15000);
    return () => clearInterval(pollIntervalRef.current);
  }, [isConnected, address, selectedNetwork, usdtAmount, verified, tronAddress]);

  const networkLabel = { BSC: "BEP-20", ETH: "ERC-20", TRON: "TRC-20" }[selectedNetwork];

  // The single smart card has three faces — which one shows depends purely
  // on where the user is in the flow (no separate pages/boxes to manage).
  const stage = !isConnected ? "connect" : verified ? "success" : "configure";
  const stageIndex = FLOW_STAGES.findIndex((s) => s.key === stage);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Page header ── */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center mb-4"
          >
            <XNCoin size={72} float spinDuration={12} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--accent-cyan)" }}
          >
            Token Sale
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            SecurityNet (XN) Presale
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-3 mt-2"
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Manually import the XN token (if not already) into your wallet before purchasing.
            </p>
            <a
              href="/news/how-to-add-a-xn-token"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost btn-shimmer text-xs px-4 py-2 rounded-lg"
            >
              How to import XN tokens →
            </a>
            <p className="text-sm font-semibold mt-1" style={{ color: "var(--text-accent)" }}>
              1 XN = 0.20 USDT · Min: $10
            </p>
          </motion.div>
        </div>

        {/* ── Sale timer ── */}
        <div className="mb-10">
          <SaleTimer tokensSold={tokensSold} presaleCap={presaleCap} />
        </div>

        {/* ── Main layout ── */}
        <div className="flex lg:flex-nowrap flex-wrap lg:gap-10 gap-6">

          {/* Sidebar */}
          <div className="lg:w-3/12 w-full lg:order-1 order-2">
            <Participate tokensSold={tokensSold} presaleCap={presaleCap} />
          </div>

          {/* ── Smart buy card — ONE card that reshapes itself through the whole flow ── */}
          <div className="lg:w-9/12 w-full lg:order-2 order-1">
            <motion.div
              layout
              className="glass-card rounded-[var(--radius-card)] p-6 lg:p-8 relative overflow-visible"
              transition={{ layout: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
            >
              <CoinBurst active={stage === "success"} burstKey={burstKey} />

              {/* Progress rail */}
              <div className="flex items-center mb-8">
                {FLOW_STAGES.map((s, i) => {
                  const active = stageIndex === i;
                  const done = stageIndex > i;
                  return (
                    <div key={s.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex items-center gap-2.5 shrink-0">
                        <motion.div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          animate={{
                            background: done
                              ? GREEN
                              : active
                              ? "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)"
                              : "var(--bg-tertiary)",
                            boxShadow: done
                              ? `0 0 14px ${GREEN}55`
                              : active
                              ? "0 0 14px var(--brand-glow)"
                              : "none",
                            color: done || active ? "#fff" : "var(--text-muted)",
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {done ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            i + 1
                          )}
                        </motion.div>
                        <span
                          className="text-xs font-semibold hidden sm:inline"
                          style={{ color: active || done ? "var(--text-primary)" : "var(--text-muted)" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < FLOW_STAGES.length - 1 && (
                        <div
                          className="flex-1 h-px mx-3 relative overflow-hidden rounded-full"
                          style={{ background: "var(--border-subtle)" }}
                        >
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}80` }}
                            initial={false}
                            animate={{ width: stageIndex > i ? "100%" : "0%" }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">

                {/* ── Face 1 — Connect ── */}
                {stage === "connect" && (
                  <motion.div key="connect" {...stageMotion}>
                    <h3 className="font-sora text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                      Connect Your Wallet
                    </h3>
                    <p className="text-sm mb-6 max-w-md" style={{ color: "var(--text-secondary)" }}>
                      Connect your crypto wallet to begin — MetaMask, Coinbase, Trust Wallet, and more are
                      supported. The instant you connect, this card reshapes itself so you can pick a network,
                      enter an amount, and send — all without leaving this spot.
                    </p>
                    <appkit-button />
                    <p className="text-xs mt-5 max-w-md font-medium" style={{ color: "var(--text-muted)" }}>
                      If your wallet didn&apos;t redirect after connecting, please navigate back to the website manually.
                    </p>
                  </motion.div>
                )}

                {/* ── Face 2 — Configure & send ── */}
                {stage === "configure" && (
                  <motion.div key="configure" {...stageMotion} className="space-y-7">

                    {/* Connected wallet */}
                    <div className="rounded-xl px-4 py-3 glass" style={{ border: `1px solid ${GREEN}40` }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Connected wallet</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => open({ view: "Account" })}
                            className="text-xs font-medium hover:underline"
                            style={{ color: "var(--text-accent)" }}
                          >
                            Change
                          </button>
                          <span style={{ color: "var(--border-subtle)" }}>|</span>
                          <button
                            onClick={() => disconnect()}
                            className="text-xs font-medium hover:underline"
                            style={{ color: RED }}
                          >
                            Disconnect
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-mono break-all" style={{ color: "var(--text-secondary)" }}>
                        {address}
                      </p>
                      {userTokenBalance !== null && (
                        <p className="text-sm font-semibold mt-1.5" style={{ color: GREEN }}>
                          XN Balance: {userTokenBalance} XN
                        </p>
                      )}
                    </div>

                    {/* Network */}
                    <div>
                      <SectionLabel>Pick your USDT network</SectionLabel>
                      <div className="grid grid-cols-3 gap-3">
                        {NETWORK_OPTIONS.map((net) => {
                          const selected = selectedNetwork === net.key;
                          return (
                            <button
                              key={net.key}
                              onClick={() => handleNetworkChange(net.key)}
                              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl transition-all duration-200"
                              style={selected ? {
                                background: "var(--surface-glow)",
                                border: "1px solid var(--brand-mid)",
                                boxShadow: "inset 0 0 20px var(--surface-glow)",
                              } : {
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              <net.Icon />
                              <span
                                className="font-semibold text-sm"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {net.label}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={selected ? {
                                  background: "var(--brand-mid)",
                                  color: "white",
                                } : {
                                  background: "var(--bg-surface)",
                                  color: "var(--text-muted)",
                                }}
                              >
                                {net.sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div
                        className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm glass"
                        style={{ border: "1px solid var(--border-subtle)" }}
                      >
                        <span style={{ color: "var(--accent-cyan)" }}>ℹ</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          Send{" "}
                          <strong style={{ color: "var(--text-primary)" }}>{networkLabel} USDT</strong>{" "}
                          to our deposit address.
                        </span>
                      </div>

                      {/* TRON sender address input */}
                      {selectedNetwork === "TRON" && (
                        <div className="mt-4">
                          <label
                            className="text-xs font-semibold uppercase tracking-wide block mb-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <strong style={{ color: "var(--text-primary)" }}>TRC-20</strong> — Enter the TRON wallet address you will be sending USDT{" "}
                            <span style={{ color: RED }}>from</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Paste/Scan your TRON wallet address"
                              value={tronAddress}
                              onChange={(e) => setTronAddress(e.target.value.trim())}
                              className="flex-1 rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all"
                              style={{
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-primary)",
                              }}
                            />
                            <button
                              onClick={pasteFromClipboard}
                              className="px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                              style={{
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-secondary)",
                              }}
                            >
                              Paste
                            </button>
                            <button
                              onClick={scanning ? stopScanner : startScanner}
                              className="px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                              style={scanning ? {
                                background: `${RED}14`,
                                border: `1px solid ${RED}4D`,
                                color: RED,
                              } : {
                                background: "var(--surface-glow)",
                                border: "1px solid var(--brand-mid)",
                                color: "var(--text-accent)",
                              }}
                            >
                              {scanning ? "✕ Stop" : "📷 Scan"}
                            </button>
                          </div>
                          {scanning && (
                            <div
                              className="mt-3 rounded-xl overflow-hidden"
                              style={{ border: "1px solid var(--border-subtle)" }}
                            >
                              <div id="tron-qr-reader" ref={scannerDivRef} />
                            </div>
                          )}
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            For verification — we detect your payment automatically.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Amount */}
                    <div>
                      <SectionLabel>Enter the amount</SectionLabel>
                      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                        Enter USDT to see XN, or enter XN to see the USDT cost — both fields update automatically.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">

                        {/* USDT */}
                        <div>
                          <label
                            className="text-xs font-semibold uppercase tracking-wide block mb-2"
                            style={{ color: "var(--text-muted)" }}
                          >
                            You Send
                          </label>
                          <div
                            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                            style={{
                              background: "var(--bg-tertiary)",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg glass shrink-0"
                              style={{
                                border: "1px solid var(--border-glass)",
                                color: "var(--text-accent)",
                              }}
                            >
                              USDT
                            </span>
                            <input
                              type="number"
                              className="flex-1 bg-transparent text-right outline-none font-sora font-semibold"
                              style={{ fontSize: "1.125rem", color: "var(--text-primary)" }}
                              placeholder="0.00"
                              value={usdtAmount}
                              min={10}
                              max={10000}
                              onChange={(e) => handleUsdtChange(e.target.value)}
                            />
                          </div>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            Min: 10 USDT
                          </p>
                        </div>

                        {/* XN */}
                        <div>
                          <label
                            className="text-xs font-semibold uppercase tracking-wide block mb-2"
                            style={{ color: "var(--text-muted)" }}
                          >
                            You Receive
                          </label>
                          <div
                            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                            style={{
                              background: "var(--bg-tertiary)",
                              border: "1px solid var(--brand-mid)",
                              boxShadow: "inset 0 0 14px var(--surface-glow)",
                            }}
                          >
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg glass shrink-0"
                              style={{
                                border: "1px solid var(--border-glass)",
                                color: "var(--text-accent)",
                              }}
                            >
                              XN
                            </span>
                            <input
                              type="number"
                              className="flex-1 bg-transparent text-right outline-none font-sora font-semibold"
                              style={{ fontSize: "1.125rem", color: "var(--text-primary)" }}
                              placeholder="0.00"
                              value={xnAmount}
                              onChange={(e) => handleXnChange(e.target.value)}
                            />
                          </div>
                          <p className="text-xs mt-1 text-right" style={{ color: "var(--text-muted)" }}>
                            0.20 USDT = 1 XN
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Send & confirm */}
                    <div>
                      <SectionLabel>Send &amp; we&apos;ll confirm automatically</SectionLabel>
                      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                        Copy the deposit address below and send your USDT — XN tokens are sent to your wallet
                        automatically as soon as we detect confirmation.
                      </p>

                      <div className="mb-4">
                        <label
                          className="text-xs font-semibold uppercase tracking-wide block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Send {networkLabel} USDT to this address
                        </label>

                        {currentNetwork?.depositAddress ? (
                          <>
                            <div
                              className="flex items-center gap-3 rounded-xl px-4 py-3"
                              style={{
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              <span
                                className="text-sm font-mono break-all flex-1"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {currentNetwork.depositAddress}
                              </span>
                              <div className="relative shrink-0">
                                <button
                                  onClick={() => copyToClipboard(currentNetwork.depositAddress)}
                                  className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                                  style={copied ? {
                                    background: `${GREEN}20`,
                                    border: `1px solid ${GREEN}59`,
                                    color: GREEN,
                                  } : {
                                    background: "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                                    color: "white",
                                  }}
                                >
                                  {copied ? "✓ Copied" : "Copy"}
                                </button>
                                {copied && (
                                  <div
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass rounded-lg px-3 py-2 text-xs z-10 whitespace-nowrap"
                                    style={{
                                      border: "1px solid var(--border-glass)",
                                      color: "var(--text-secondary)",
                                    }}
                                  >
                                    Paste this address in your wallet and send exactly {usdtAmount} USDT.
                                    <div
                                      className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                                      style={{ borderTopColor: "var(--border-glass)" }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs mt-2" style={{ color: RED }}>
                              ⚠ Only send <strong>{networkLabel} USDT</strong> to this address. Other tokens will be lost permanently.
                            </p>
                          </>
                        ) : (
                          <div
                            className="flex items-center gap-3 rounded-xl px-4 py-4 glass"
                            style={{ border: "1px solid rgba(245,158,11,0.35)" }}
                          >
                            <span className="text-xl shrink-0">⚠</span>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                                Deposit address not configured
                              </p>
                              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                                The {selectedNetwork} deposit wallet has not been set up yet. Please check back soon or contact support.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Listening indicator */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(0,212,255,0)",
                            "0 0 18px rgba(0,212,255,0.14)",
                            "0 0 0px rgba(0,212,255,0)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 glass"
                        style={{ border: "1px solid rgba(0,212,255,0.20)" }}
                      >
                        <span className="relative flex h-3 w-3 shrink-0">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: "var(--accent-cyan)" }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-3 w-3"
                            style={{ background: "var(--accent-cyan)" }}
                          />
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          <strong style={{ color: "var(--text-primary)" }}>Listening for your payment</strong> — send{" "}
                          {networkLabel} USDT to the address above. We&apos;ll detect it automatically within 15 seconds of
                          confirmation.
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ── Face 3 — Success, with the coin celebrating ── */}
                {stage === "success" && verified && (
                  <motion.div key="success" {...stageMotion}>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.svg
                        width="44" height="44" viewBox="0 0 36 36" fill="none"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <circle cx="18" cy="18" r="17" fill={`${GREEN}20`} stroke={`${GREEN}66`} strokeWidth="1.5" />
                        <motion.path
                          d="M11 18.5L16 23.5L25 13"
                          stroke={GREEN}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                      </motion.svg>
                      <span className="font-sora text-2xl font-bold" style={{ color: GREEN }}>
                        Payment Confirmed!
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
                      We received{" "}
                      <strong style={{ color: "var(--text-primary)" }}>{verified.usdtAmount} USDT</strong>{" "}
                      from your wallet.
                    </p>
                    <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                      <strong style={{ color: "var(--text-primary)" }}>{verified.xnTokens} XN</strong> tokens are
                      being sent to your wallet now.
                    </p>
                    <a
                      href="/news/how-to-import-xn-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                      style={{ color: GREEN }}
                    >
                      How to import XN tokens →
                    </a>
                    {verified.txHash && (
                      <p className="text-xs font-mono mt-3 break-all" style={{ color: "var(--text-muted)" }}>
                        Tx: {verified.txHash}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
