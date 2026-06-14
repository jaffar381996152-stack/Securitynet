"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useAppKitAccount } from "@reown/appkit/react";
import useWalletConnectGate from "@/hooks/useWalletConnectGate";
import settings from "../../../../data/settings";

const XN_PRICE      = 0.20;
const USDT_NETWORKS = settings.USDT_NETWORKS;
const NETWORK_LABEL = { BSC: "BEP-20", ETH: "ERC-20", TRON: "TRC-20" };
const XN_CONTRACT   = settings.CONTRACT_ADDRESS;

const IMPORT_STEPS = [
  "Open MetaMask or Trust Wallet and tap 'Import Token'",
  "Select 'Custom Token' and paste the contract address",
  `Contract: ${XN_CONTRACT}`,
  "Token symbol will auto-fill as XN · Decimals: 18",
  "Tap 'Add Token' — your XN balance will appear",
];

/* ── Premium corner brackets ─────────────────────────────────── */
function Brackets() {
  const A = 18, off = 9, c = "var(--gold)", w = "1.5px";
  const base = { position: "absolute", width: A, height: A, pointerEvents: "none", zIndex: 4 };
  return (
    <>
      <span style={{ ...base, top: off, left: off, borderTop: `${w} solid ${c}`, borderLeft: `${w} solid ${c}` }} />
      <span style={{ ...base, top: off, right: off, borderTop: `${w} solid ${c}`, borderRight: `${w} solid ${c}` }} />
      <span style={{ ...base, bottom: off, left: off, borderBottom: `${w} solid ${c}`, borderLeft: `${w} solid ${c}` }} />
      <span style={{ ...base, bottom: off, right: off, borderBottom: `${w} solid ${c}`, borderRight: `${w} solid ${c}` }} />
    </>
  );
}

/* ── Spine node ─────────────────────────────────────────────── */
function Node({ state, n }) {
  const base = {
    position: "absolute",
    left: 8,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    fontWeight: 700,
    background: "var(--bg-secondary)",
    zIndex: 1,
    transition: "all 0.3s ease",
  };
  if (state === "done")
    return (
      <span style={{ ...base, border: "1px solid var(--gold)", color: "var(--gold)", boxShadow: "0 0 0 4px rgba(212,175,110,0.10)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
      </span>
    );
  if (state === "active")
    return <span style={{ ...base, border: "1px solid var(--gold)", color: "var(--gold)", boxShadow: "0 0 14px rgba(212,175,110,0.45), 0 0 0 4px rgba(212,175,110,0.10)" }}>{n}</span>;
  if (state === "live")
    return (
      <span style={{ ...base, border: "1px solid var(--gold)", boxShadow: "0 0 0 4px rgba(212,175,110,0.10)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", animation: "ubPulse 1.6s ease-in-out infinite" }} />
      </span>
    );
  if (state === "accent")
    return <span style={{ ...base, border: "1px solid var(--border-gold)", color: "var(--gold)", fontSize: 12 }}>✦</span>;
  if (state === "blocked")
    return <span style={{ ...base, border: "1px solid var(--border-sub)", color: "var(--text-muted)" }}>{n}</span>;
  return <span style={{ ...base, border: "1px solid var(--border-gold)", color: "var(--gold)" }}>{n}</span>;
}

/* ── Spine step row (rail + connecting line + content) ──────── */
function Step({ state, n, last, title, children }) {
  const headingColor = state === "done" || state === "active" ? "var(--gold)" : "var(--text-primary)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "40px 1fr" }}>
      <div style={{ position: "relative" }}>
        {!last && <span style={{ position: "absolute", left: 19, top: 24, bottom: 0, width: 2, background: "rgba(212,175,110,0.28)" }} />}
        <Node state={state} n={n} />
      </div>
      <div style={{ paddingBottom: last ? 2 : 26, minWidth: 0 }}>
        <div style={{ minHeight: 24, display: "flex", alignItems: "center", fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: headingColor }}>
          {title}
        </div>
        {children && <div style={{ marginTop: 12 }}>{children}</div>}
      </div>
    </div>
  );
}

export default function PurchaseCard({ showTokenCalculator = true }) {
  const { address, isConnected } = useAppKitAccount();
  const { connectWallet } = useWalletConnectGate();

  const [network, setNetwork]       = useState("BSC");
  const [usdtAmt, setUsdtAmt]       = useState("");
  const [xnAmt, setXnAmt]           = useState("");
  const [copied, setCopied]         = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [tronAddress, setTronAddress]         = useState("");
  const [scanning, setScanning]               = useState(false);
  const [verified, setVerified]               = useState(null);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const pollIntervalRef = useRef(null);
  const scannerRef      = useRef(null);

  const handleUsdt = (v) => {
    setUsdtAmt(v);
    const num = parseFloat(v);
    setXnAmt(!isNaN(num) && num > 0 ? (num / XN_PRICE).toFixed(2) : "");
    setVerified(null);
  };
  const handleXn = (v) => {
    setXnAmt(v);
    const num = parseFloat(v);
    setUsdtAmt(!isNaN(num) && num > 0 ? (num * XN_PRICE).toFixed(2) : "");
    setVerified(null);
  };
  const handleNetworkChange = (key) => { setNetwork(key); setVerified(null); };

  const depositAddress = USDT_NETWORKS?.[network]?.depositAddress;
  const networkLabel   = NETWORK_LABEL[network];

  const copyAddr = () => {
    if (!depositAddress) return;
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // TRON QR scanner
  const startScanner = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    setScanning(true);
    setTimeout(async () => {
      const qr = new Html5Qrcode("presale-tron-qr-reader");
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

  // Payment check — calls /api/check-payment
  const checkPayment = useCallback(async () => {
    if (!usdtAmt || parseFloat(usdtAmt) < 10) return false;
    if (network === "TRON" && !tronAddress) return false;
    try {
      const res = await fetch("/api/check-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          network,
          senderAddress: network === "TRON" ? tronAddress : address,
          connectedWallet: address,
          usdtAmount: parseFloat(usdtAmt),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setVerified(data.data);
        toast.success(
          `Payment Confirmed! We received ${data.data.usdtAmount} USDT. ${data.data.xnTokens} XN tokens are being sent to your wallet.`,
          { duration: 8000 }
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [network, tronAddress, address, usdtAmt]);

  // Background poll — auto-detects payment every 15s
  useEffect(() => {
    if (!isConnected || !address || verified) { clearInterval(pollIntervalRef.current); return; }
    pollIntervalRef.current = setInterval(checkPayment, 15000);
    return () => clearInterval(pollIntervalRef.current);
  }, [isConnected, address, verified, checkPayment]);

  const handleManualPaymentCheck = async () => {
    if (!isConnected) { toast.error("Connect your wallet first."); return; }
    if (!usdtAmt || parseFloat(usdtAmt) < 10) { toast.error("Enter an amount of at least 10 USDT."); return; }
    if (network === "TRON" && !tronAddress) { toast.error("Enter your TRON sender address first."); return; }
    setCheckingPayment(true);
    const found = await checkPayment();
    setCheckingPayment(false);
    if (!found) {
      toast("Payment not detected yet — we'll keep checking automatically every 15 seconds.", { icon: "⏳" });
    }
  };

  const confirmDisabled = checkingPayment || !isConnected || !usdtAmt || parseFloat(usdtAmt) < 10 || (network === "TRON" && !tronAddress);

  const inputBase = {
    width: "100%",
    height: 52,
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-sub)",
    borderRadius: 0,
    outline: "none",
    paddingLeft: 14,
    fontFamily: "var(--font-mono)",
    fontSize: 18,
    boxSizing: "border-box",
  };

  const calcShown = showTokenCalculator;

  return (
    <div className="card-dark" style={{ border: "1px solid var(--border-gold)", position: "relative" }}>
      <Brackets />

      {/* Status strip */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--border-sub)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-sec)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
          SECURE CHANNEL
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-sec)" }}>
          STAGE 3 · <span style={{ color: "var(--gold)" }}>$0.20</span>
        </span>
      </div>

      {verified ? (
        /* ── SUCCESS STATE ── */
        <div style={{ padding: "40px 24px", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, border: "2px solid var(--c-success)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", background: "rgba(74,140,111,0.1)", boxShadow: "0 0 24px rgba(74,140,111,0.25)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-success)", marginBottom: 12 }}>
            TRANSFER INITIATED
          </div>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-sec)", marginBottom: 4 }}>
            Received: <strong style={{ color: "var(--text-primary)" }}>{verified.usdtAmount} USDT</strong>
          </p>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-sec)", marginBottom: 18 }}>
            Sending: <strong style={{ color: "var(--gold)" }}>{verified.xnTokens} XN</strong>
          </p>
          <button type="button" onClick={() => setImportOpen(true)} style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
            HOW TO IMPORT XN TOKENS →
          </button>
          {verified.txHash && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 16, wordBreak: "break-all", letterSpacing: "0.06em" }}>
              TX: {verified.txHash}
            </p>
          )}
        </div>
      ) : (
        /* ── VAULT SPINE ── */
        <div style={{ padding: "24px 20px 16px" }}>

          {/* Step 1 · Connect */}
          <Step n={1} state={isConnected ? "done" : "active"} title="CONNECT WALLET">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                style={{ width: "100%", height: 46, background: "transparent", border: "1px solid var(--gold)", fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-ghost)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                CONNECT WALLET
              </button>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", border: "1px solid var(--border-sub)", background: "var(--bg-tertiary)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--c-success)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-success)", display: "inline-block" }} />
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </div>
            )}
          </Step>

          {/* Step 2 · Network (+ TRON sender appears here when TRC-20) */}
          <Step n={2} state={isConnected ? "active" : "default"} title="CHOOSE NETWORK">
            <div style={{ display: "flex", gap: 8 }}>
              {["BEP-20", "ERC-20", "TRC-20"].map((net) => {
                const key = { "BEP-20": "BSC", "ERC-20": "ETH", "TRC-20": "TRON" }[net];
                const active = network === key;
                return (
                  <button
                    key={net}
                    onClick={() => handleNetworkChange(key)}
                    style={{
                      flex: 1,
                      padding: "10px 4px",
                      border: active ? "1px solid var(--gold)" : "1px solid var(--border-sub)",
                      background: active ? "var(--gold-ghost)" : "transparent",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: active ? "var(--gold)" : "var(--text-sec)",
                      cursor: "pointer",
                      boxShadow: active ? "0 0 0 1px var(--gold)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {net}
                  </button>
                );
              })}
            </div>

            {network === "TRON" && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
                  YOUR TRON SENDER ADDRESS
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    placeholder="TYour...TRON...wallet...address"
                    value={tronAddress}
                    onChange={(e) => setTronAddress(e.target.value.trim())}
                    style={{ flex: 1, minWidth: 0, background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-primary)", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                  />
                  <button onClick={pasteFromClipboard} style={{ padding: "0 10px", background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-sec)", cursor: "pointer", whiteSpace: "nowrap" }}>PASTE</button>
                  <button onClick={scanning ? stopScanner : startScanner} style={{ padding: "0 10px", background: scanning ? "rgba(168,82,82,0.1)" : "var(--gold-ghost)", border: scanning ? "1px solid var(--c-danger)" : "1px solid var(--border-gold)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: scanning ? "var(--c-danger)" : "var(--gold)", cursor: "pointer", whiteSpace: "nowrap" }}>{scanning ? "STOP" : "SCAN"}</button>
                </div>
                {scanning && <div style={{ marginTop: 10, border: "1px solid var(--border-sub)" }}><div id="presale-tron-qr-reader" /></div>}
              </div>
            )}
          </Step>

          {/* Step 3 · Deposit address */}
          <Step n={3} state={depositAddress ? "active" : "blocked"} title="DEPOSIT ADDRESS">
            {depositAddress ? (
              <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border-gold)", padding: "12px 12px 12px 14px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 6 }}>
                  {networkLabel} · USDT ONLY
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-primary)", flex: 1, wordBreak: "break-all", letterSpacing: "0.02em", lineHeight: 1.4 }}>
                    {depositAddress}
                  </span>
                  <button
                    onClick={copyAddr}
                    style={{ alignSelf: "stretch", padding: "0 14px", background: copied ? "rgba(74,140,111,0.15)" : "var(--gold)", border: "none", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: copied ? "var(--c-success)" : "var(--text-inv)", cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}
                  >
                    {copied ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ fontFamily: "var(--font-disp)", fontSize: 12, color: "var(--text-sec)", border: "1px dashed var(--border-sub)", padding: "12px 14px" }}>
                Deposit address not configured.
              </div>
            )}
          </Step>

          {/* Step 4 · Send */}
          <Step n={4} last={!calcShown} state={isConnected && depositAddress ? "live" : "default"} title="SEND USDT TO THE ADDRESS">
            {isConnected && depositAddress ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-sec)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "ubPulse 1.6s ease-in-out infinite", flexShrink: 0 }} />
                Awaiting transfer · auto-detecting every 15s
              </div>
            ) : null}
          </Step>

          {/* Step ✦ · Calculator (no boxed container) */}
          {calcShown && (
            <Step state="accent" last title="TOKEN CALCULATOR">
              {/* USDT input */}
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={usdtAmt}
                  min={10}
                  placeholder="Enter USDT amount"
                  onChange={(e) => handleUsdt(e.target.value)}
                  style={{ ...inputBase, paddingRight: 64, color: "var(--text-primary)", border: "1px solid var(--border-sub)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--border-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)" }}>USDT</span>
              </div>

              <div style={{ textAlign: "center", color: "var(--gold)", fontSize: 16, lineHeight: 1, margin: "6px 0" }}>↓</div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>YOU RECEIVE</div>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={xnAmt}
                  placeholder="0.00"
                  onChange={(e) => handleXn(e.target.value)}
                  style={{ ...inputBase, paddingRight: 48, color: "var(--gold)", border: "1px solid var(--border-gold)" }}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>XN</span>
              </div>

              {/* Confirm */}
              {depositAddress && (
                <button
                  className="authorize-btn"
                  onClick={handleManualPaymentCheck}
                  disabled={confirmDisabled}
                  style={{ width: "100%", height: 48, marginTop: 14, background: "var(--gold)", color: "var(--text-inv)", border: "none", fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", cursor: confirmDisabled ? "default" : "pointer", opacity: confirmDisabled ? 0.5 : 1, transition: "opacity 0.2s" }}
                >
                  {checkingPayment ? "CHECKING…" : "I'VE SENT THE PAYMENT"}
                </button>
              )}
            </Step>
          )}
        </div>
      )}

      {/* How to add XN (collapsible) */}
      <div style={{ borderTop: "1px solid var(--border-sub)" }}>
        <button className="import-toggle" onClick={() => setImportOpen(!importOpen)}>
          <span>HOW TO ADD XN TO YOUR WALLET</span>
          <span style={{ transform: importOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
        </button>
        <div style={{ maxHeight: importOpen ? 280 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ padding: "0 20px 18px" }}>
            {IMPORT_STEPS.map((step, i) => (
              <div key={i} className="import-step">
                <span className="import-num">0{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
