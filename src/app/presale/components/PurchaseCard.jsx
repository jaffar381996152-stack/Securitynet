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

const CARD = { border: "1px solid var(--border-gold)", padding: 18 };

function StepHeading({ n, children, color = "var(--text-sec)" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color }}>
      {n != null && (
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", flexShrink: 0, border: "1px solid var(--border-gold)", color: "var(--gold)", fontSize: 9, fontWeight: 700 }}>
          {n}
        </span>
      )}
      {children}
    </div>
  );
}

function DownArrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", color: "var(--gold)" }} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {verified ? (
        /* ── SUCCESS STATE ── */
        <div className="card-dark" style={{ ...CARD, padding: "32px 20px", textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "2px solid var(--c-success)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: "rgba(74,140,111,0.1)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-success)", marginBottom: 10 }}>
            TRANSFER INITIATED
          </div>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>
            Received: <strong style={{ color: "var(--text-primary)" }}>{verified.usdtAmount} USDT</strong>
          </p>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
            Sending: <strong style={{ color: "var(--gold)" }}>{verified.xnTokens} XN</strong>
          </p>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            style={{ fontFamily: "var(--font-disp)", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}
          >
            HOW TO IMPORT XN TOKENS →
          </button>
          {verified.txHash && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 14, wordBreak: "break-all", letterSpacing: "0.06em" }}>
              TX: {verified.txHash}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* ── CARD 1: Connect Wallet ── */}
          <div className="card-dark" style={CARD}>
            {!isConnected ? (
              <>
                <StepHeading n={1}>CONNECT WALLET</StepHeading>
                <button
                  onClick={connectWallet}
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: 12,
                    background: "transparent",
                    border: "1px solid var(--gold)",
                    fontFamily: "var(--font-disp)",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-ghost)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  CONNECT WALLET
                </button>
              </>
            ) : (
              <StepHeading n={1} color="var(--c-success)">
                WALLET CONNECTED · {address?.slice(0, 6)}…{address?.slice(-4)}
              </StepHeading>
            )}
          </div>

          <DownArrow />

          {/* ── CARD 2: Choose Network ── */}
          <div className="card-dark" style={CARD}>
            <StepHeading n={2}>CHOOSE NETWORK</StepHeading>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
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
                      letterSpacing: "0.12em",
                      color: active ? "var(--gold)" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {net}
                  </button>
                );
              })}
            </div>
          </div>

          <DownArrow />

          {/* ── CARD 3: Copy Deposit Address ── */}
          <div className="card-dark" style={CARD}>
            <StepHeading n={3}>COPY DEPOSIT ADDRESS</StepHeading>
            {depositAddress ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-sec)", flex: 1, wordBreak: "break-all", letterSpacing: "0.04em" }}>
                  {depositAddress}
                </span>
                <button
                  onClick={copyAddr}
                  style={{
                    padding: "6px 12px",
                    background: copied ? "rgba(74,140,111,0.15)" : "var(--gold)",
                    border: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: copied ? "var(--c-success)" : "var(--text-inv)",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? "✓" : "COPY"}
                </button>
              </div>
            ) : (
              <p style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", marginTop: 12 }}>
                Deposit address not configured.
              </p>
            )}
          </div>

          <DownArrow />

          {/* ── CARD 4: Send USDT ── */}
          <div className="card-dark" style={CARD}>
            <StepHeading n={4}>SEND USDT TO THE COPIED ADDRESS</StepHeading>
          </div>

          {/* ── Token Calculator ── */}
          {showTokenCalculator && (
            <div className="card-dark" style={CARD}>
              <StepHeading>TOKEN CALCULATOR</StepHeading>

              {/* TRON sender address (only for TRON) */}
              {network === "TRON" && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
                    YOUR TRON SENDER ADDRESS
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      type="text"
                      placeholder="TYour...TRON...wallet...address"
                      value={tronAddress}
                      onChange={(e) => setTronAddress(e.target.value.trim())}
                      style={{
                        flex: 1, minWidth: 0, background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)",
                        padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 11,
                        color: "var(--text-primary)", outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                    />
                    <button
                      onClick={pasteFromClipboard}
                      style={{ padding: "0 10px", background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-sec)", cursor: "pointer", whiteSpace: "nowrap" }}
                    >
                      PASTE
                    </button>
                    <button
                      onClick={scanning ? stopScanner : startScanner}
                      style={{
                        padding: "0 10px",
                        background: scanning ? "rgba(168,82,82,0.1)" : "var(--gold-ghost)",
                        border: scanning ? "1px solid var(--c-danger)" : "1px solid var(--border-gold)",
                        fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                        color: scanning ? "var(--c-danger)" : "var(--gold)", cursor: "pointer", whiteSpace: "nowrap",
                      }}
                    >
                      {scanning ? "STOP" : "SCAN"}
                    </button>
                  </div>
                  {scanning && (
                    <div style={{ marginTop: 10, border: "1px solid var(--border-sub)" }}>
                      <div id="presale-tron-qr-reader" />
                    </div>
                  )}
                </div>
              )}

              {/* USDT input */}
              <div style={{ position: "relative", marginTop: 12 }}>
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
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                  USDT
                </span>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: "center", color: "var(--gold)", fontSize: 16, lineHeight: 1, margin: "4px 0" }}>↓</div>

              {/* YOU RECEIVE */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
                YOU RECEIVE
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={xnAmt}
                  placeholder="0.00"
                  onChange={(e) => handleXn(e.target.value)}
                  style={{ ...inputBase, paddingRight: 48, color: "var(--gold)", border: "1px solid var(--border-gold)" }}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>
                  XN
                </span>
              </div>

              {/* Confirm payment */}
              {depositAddress && (
                <>
                  <button
                    className="authorize-btn"
                    onClick={handleManualPaymentCheck}
                    disabled={confirmDisabled}
                    style={{
                      width: "100%",
                      height: 48,
                      marginTop: 12,
                      background: "var(--gold)",
                      color: "var(--text-inv)",
                      border: "none",
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      cursor: confirmDisabled ? "default" : "pointer",
                      opacity: confirmDisabled ? 0.5 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {checkingPayment ? "CHECKING…" : "I'VE SENT THE PAYMENT"}
                  </button>

                  {isConnected && (
                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
                      AUTO-CHECKING EVERY 15s
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* ── How to add XN (collapsible) ── */}
      <div className="card-dark" style={{ border: "1px solid var(--border-sub)" }}>
        <button className="import-toggle" onClick={() => setImportOpen(!importOpen)}>
          <span>HOW TO ADD XN TO YOUR WALLET</span>
          <span style={{ transform: importOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
        </button>
        <div style={{ maxHeight: importOpen ? 280 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ padding: "0 18px 18px" }}>
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
