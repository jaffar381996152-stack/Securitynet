"use client";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import settings from "../../../data/settings";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || settings.CONTRACT_ADDRESS;
const USDT_NETWORKS = settings.USDT_NETWORKS;
const XN_PRICE = 0.20;

// ─── Chain logos ─────────────────────────────────────────────────────────────

const BscLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#F0B90B" />
    <path d="M12 4.5L9.75 6.75L12 9L14.25 6.75L12 4.5Z" fill="white" />
    <path d="M7.5 9L5.25 11.25L7.5 13.5L9.75 11.25L7.5 9Z" fill="white" />
    <path d="M16.5 9L14.25 11.25L16.5 13.5L18.75 11.25L16.5 9Z" fill="white" />
    <path d="M12 9L9.75 11.25L12 13.5L14.25 11.25L12 9Z" fill="white" />
    <path d="M12 13.5L9.75 15.75L12 18L14.25 15.75L12 13.5Z" fill="white" />
  </svg>
);
const EthLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
  { key: "BSC",  label: "BNB Chain", sub: "BEP-20", Icon: BscLogo,  recommended: true },
  { key: "ETH",  label: "Ethereum",  sub: "ERC-20", Icon: EthLogo,  recommended: false },
  { key: "TRON", label: "Tron",      sub: "TRC-20", Icon: TronLogo, recommended: false },
];

const QUICK_AMOUNTS = [50, 100, 500, 1000];

// ─── Main component ───────────────────────────────────────────────────────────

export default function DigitalGold() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const [selectedNetwork, setSelectedNetwork] = useState("BSC");
  const [usdtAmount, setUsdtAmount]           = useState(15);
  const [xnAmount, setXnAmount]               = useState((15 / XN_PRICE).toFixed(2));
  const [userTokenBalance, setUserTokenBalance] = useState(null);

  const [verified, setVerified]   = useState(null);
  const [burstKey, setBurstKey]   = useState(0);
  const [tronAddress, setTronAddress] = useState("");
  const [copied, setCopied]       = useState(false);
  const [scanning, setScanning]   = useState(false);

  const pollIntervalRef = useRef(null);
  const scannerRef      = useRef(null);
  const scannerDivRef   = useRef(null);

  // ── Handlers ─────────────────────────────────────────────────────────────

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
      } catch { setScanning(false); }
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) { scannerRef.current.stop().catch(() => {}); scannerRef.current = null; }
    setScanning(false);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setTronAddress(text.trim());
    } catch {}
  };

  const handleUsdtChange = (value) => { setUsdtAmount(value); setXnAmount((parseFloat(value) / XN_PRICE).toFixed(2)); setVerified(null); };
  const handleXnChange   = (value) => { setXnAmount(value);   setUsdtAmount((parseFloat(value) * XN_PRICE).toFixed(2)); setVerified(null); };
  const handleNetworkChange = (key) => { setSelectedNetwork(key); setVerified(null); };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Balance fetch ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isConnected || !address) return;
    const fetchBalance = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
        const contract = new ethers.Contract(CONTRACT_ADDRESS, [
          "function balanceOf(address account) view returns (uint256)",
          "function decimals() view returns (uint8)",
        ], provider);
        const [balance, decimals] = await Promise.all([contract.balanceOf(address), contract.decimals()]);
        setUserTokenBalance(ethers.formatUnits(balance, decimals));
      } catch {}
    };
    fetchBalance();
  }, [isConnected, address]);

  // ── Payment poll ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isConnected || !address || verified) { clearInterval(pollIntervalRef.current); return; }
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
            `Payment Confirmed! We received ${data.data.usdtAmount} USDT. ${data.data.xnTokens} XN tokens are being sent to your wallet.`,
            { duration: 8000 }
          );
        }
      } catch {}
    };
    pollIntervalRef.current = setInterval(checkPayment, 15000);
    return () => clearInterval(pollIntervalRef.current);
  }, [isConnected, address, selectedNetwork, usdtAmount, verified, tronAddress]);

  const currentNetwork = USDT_NETWORKS[selectedNetwork];
  const networkLabel   = { BSC: "BEP-20", ETH: "ERC-20", TRON: "TRC-20" }[selectedNetwork];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-gold)",
      }}
    >
      {/* Widget header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-sub)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
            BUY XN TOKEN
          </div>
          <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
            1 XN = {XN_PRICE} USDT
          </div>
        </div>
        {isConnected && (
          <div className="badge badge-active">
            WALLET CONNECTED
          </div>
        )}
      </div>

      <div style={{ padding: "24px" }}>

        {/* ── SUCCESS STATE ── */}
        {verified && (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                border: "2px solid var(--c-success)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                background: "rgba(74,140,111,0.1)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-success)", marginBottom: 12 }}>
              TRANSFER INITIATED
            </div>
            <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", marginBottom: 6 }}>
              Received: <strong style={{ color: "var(--text-primary)" }}>{verified.usdtAmount} USDT</strong>
            </p>
            <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
              Sending: <strong style={{ color: "var(--gold)" }}>{verified.xnTokens} XN</strong>
            </p>
            <a href="/news/how-to-add-a-xn-token" target="_blank" rel="noopener noreferrer" className="btn-link" style={{ justifyContent: "center" }}>
              HOW TO IMPORT XN TOKENS →
            </a>
            {verified.txHash && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 16, wordBreak: "break-all", letterSpacing: "0.06em" }}>
                TX: {verified.txHash}
              </p>
            )}
          </div>
        )}

        {/* ── MAIN FLOW ── */}
        {!verified && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Step 1: Network */}
            <div>
              <WidgetLabel>STEP 1 · SELECT NETWORK</WidgetLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {NETWORK_OPTIONS.map((net) => {
                  const selected = selectedNetwork === net.key;
                  return (
                    <button
                      key={net.key}
                      onClick={() => handleNetworkChange(net.key)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        padding: "14px 8px",
                        border: selected ? "1px solid var(--gold)" : "1px solid var(--border-sub)",
                        background: selected ? "var(--gold-ghost)" : "var(--bg-tertiary)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        position: "relative",
                      }}
                    >
                      {net.recommended && (
                        <span
                          style={{
                            position: "absolute",
                            top: -1,
                            left: -1,
                            right: -1,
                            fontFamily: "var(--font-mono)",
                            fontSize: 8,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            background: "var(--gold)",
                            color: "var(--text-inv)",
                            padding: "2px 0",
                            textAlign: "center",
                          }}
                        >
                          RECOMMENDED
                        </span>
                      )}
                      <div style={{ marginTop: net.recommended ? 10 : 0 }}>
                        <net.Icon />
                      </div>
                      <span style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: selected ? "var(--gold)" : "var(--text-muted)" }}>
                        {net.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wallet */}
            <div>
              <WidgetLabel>STEP 2 · CONNECT WALLET</WidgetLabel>
              {!isConnected ? (
                <div>
                  <appkit-button />
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: "var(--text-muted)", marginTop: 10 }}>
                    SUPPORTS METAMASK, TRUST WALLET, WALLETCONNECT +30 MORE
                  </p>
                </div>
              ) : (
                <div style={{ border: "1px solid rgba(74,140,111,0.3)", background: "rgba(74,140,111,0.06)", padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-success)" }}>CONNECTED</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => open({ view: "Account" })} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", cursor: "pointer" }}>CHANGE</button>
                      <button onClick={() => disconnect()} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-danger)", cursor: "pointer" }}>DISCONNECT</button>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-sec)", wordBreak: "break-all" }}>{address}</p>
                  {userTokenBalance !== null && (
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--c-success)", marginTop: 6 }}>XN BALANCE: {userTokenBalance} XN</p>
                  )}
                </div>
              )}
            </div>

            {/* TRON sender address */}
            {selectedNetwork === "TRON" && (
              <div>
                <WidgetLabel>YOUR TRON SENDER ADDRESS</WidgetLabel>
                <p style={{ fontFamily: "var(--font-disp)", fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
                  Enter the TRON wallet you will send USDT <span style={{ color: "var(--c-danger)" }}>from</span>:
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    placeholder="TYour...TRON...wallet...address"
                    value={tronAddress}
                    onChange={(e) => setTronAddress(e.target.value.trim())}
                    style={{
                      flex: 1,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-sub)",
                      padding: "10px 12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                  />
                  <button
                    onClick={pasteFromClipboard}
                    style={{ padding: "0 12px", background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-sec)", cursor: "pointer", whiteSpace: "nowrap" }}
                  >PASTE</button>
                  <button
                    onClick={scanning ? stopScanner : startScanner}
                    style={{
                      padding: "0 12px",
                      background: scanning ? "rgba(168,82,82,0.1)" : "var(--gold-ghost)",
                      border: scanning ? "1px solid var(--c-danger)" : "1px solid var(--border-gold)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: scanning ? "var(--c-danger)" : "var(--gold)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >{scanning ? "STOP" : "SCAN"}</button>
                </div>
                {scanning && (
                  <div style={{ marginTop: 12, border: "1px solid var(--border-sub)" }}>
                    <div id="tron-qr-reader" ref={scannerDivRef} />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Amount */}
            <div>
              <WidgetLabel>STEP 3 · ENTER AMOUNT</WidgetLabel>
              {/* Quick select */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleUsdtChange(amt)}
                    style={{
                      flex: 1,
                      padding: "6px 0",
                      background: usdtAmount == amt ? "var(--gold)" : "var(--bg-tertiary)",
                      border: usdtAmount == amt ? "1px solid var(--gold)" : "1px solid var(--border-sub)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: usdtAmount == amt ? "var(--text-inv)" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {/* USDT input */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>YOU SEND (USDT)</div>
                  <div style={{ display: "flex", alignItems: "center", background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", padding: "10px 12px" }}>
                    <input
                      type="number"
                      value={usdtAmount}
                      min={10}
                      max={10000}
                      onChange={(e) => handleUsdtChange(e.target.value)}
                      style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-primary)", width: "100%" }}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>USDT</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 4, letterSpacing: "0.1em" }}>MIN: 10 USDT</p>
                </div>

                {/* XN output */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>YOU RECEIVE (XN)</div>
                  <div style={{ display: "flex", alignItems: "center", background: "var(--bg-tertiary)", border: "1px solid var(--border-gold)", padding: "10px 12px" }}>
                    <input
                      type="number"
                      value={xnAmount}
                      onChange={(e) => handleXnChange(e.target.value)}
                      style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--gold)", width: "100%" }}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--gold)", letterSpacing: "0.1em" }}>XN</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 4, textAlign: "right", letterSpacing: "0.1em" }}>0.20 USDT = 1 XN</p>
                </div>
              </div>
            </div>

            {/* Step 4: Contract address + authorize */}
            <div>
              <WidgetLabel>STEP 4 · SEND & AUTHORIZE</WidgetLabel>

              {currentNetwork?.depositAddress ? (
                <>
                  <div style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                    Send <strong style={{ color: "var(--text-primary)" }}>{usdtAmount} {networkLabel} USDT</strong> to:
                  </div>

                  {/* Address box */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-gold)",
                      padding: "14px 16px",
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-sec)", flex: 1, wordBreak: "break-all", letterSpacing: "0.04em" }}>
                      {currentNetwork.depositAddress}
                    </span>
                    <button
                      onClick={() => copyToClipboard(currentNetwork.depositAddress)}
                      style={{
                        padding: "8px 16px",
                        background: copied ? "rgba(74,140,111,0.15)" : "var(--gold)",
                        border: copied ? "1px solid var(--c-success)" : "none",
                        fontFamily: "var(--font-disp)",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: copied ? "var(--c-success)" : "var(--text-inv)",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>

                  {/* Warning */}
                  <div style={{ background: "rgba(168,82,82,0.08)", border: "1px solid rgba(168,82,82,0.25)", padding: "10px 14px", marginBottom: 16 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-danger)" }}>
                      ⚠ ONLY SEND {networkLabel} USDT TO THIS ADDRESS. OTHER TOKENS WILL BE LOST PERMANENTLY.
                    </p>
                  </div>

                  {/* Authorize button */}
                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => copyToClipboard(currentNetwork.depositAddress)}
                    data-cursor="cta"
                  >
                    AUTHORIZE TRANSFER →
                  </button>

                  {/* Listening indicator */}
                  {isConnected && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "10px 14px", border: "1px solid rgba(74,140,111,0.2)", background: "rgba(74,140,111,0.04)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                        LISTENING FOR PAYMENT — CONFIRMATION WITHIN 15s
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ border: "1px solid var(--border-gold)", background: "var(--gold-ghost)", padding: "16px 18px" }}>
                  <p style={{ fontFamily: "var(--font-disp)", fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 6 }}>
                    Deposit address not configured
                  </p>
                  <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)" }}>
                    The {selectedNetwork} deposit wallet has not been set up yet. Please check back soon or contact support.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Widget footer */}
      <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border-sub)", background: "var(--bg-tertiary)" }}>
        <a
          href="/news/how-to-add-a-xn-token"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          HOW TO IMPORT XN TOKENS →
        </a>
      </div>
    </div>
  );
}

function WidgetLabel({ children }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>
      {children}
    </div>
  );
}
