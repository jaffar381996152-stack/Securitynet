"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import useWalletConnectGate from "@/hooks/useWalletConnectGate";
import settings from "../../../data/settings";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || settings.CONTRACT_ADDRESS;
const USDT_NETWORKS = settings.USDT_NETWORKS;
const XN_PRICE = 0.20;

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

const IMPORT_STEPS = [
  "Open MetaMask or Trust Wallet and tap 'Import Token'",
  "Select 'Custom Token' and paste the contract address",
  "Contract: 0x917D93261B6b232F6b8b643d65b48928D1c85FFc",
  "Token symbol will auto-fill as XN · Decimals: 18",
  "Tap 'Add Token' — your XN balance will appear",
];

const NETWORK_CARDS = [
  { key: "BSC",  name: "BEP-20", desc: "Binance Smart Chain — fastest & lowest fees", recommended: true  },
  { key: "ETH",  name: "ERC-20", desc: "Ethereum — widely supported",                recommended: false },
  { key: "TRON", name: "TRC-20", desc: "Tron — fast & low cost",                     recommended: false },
];

export default function DigitalGold() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { connectWallet } = useWalletConnectGate();

  const [selectedNetwork, setSelectedNetwork] = useState("BSC");
  const [usdtAmount, setUsdtAmount]           = useState(15);
  const [xnAmount, setXnAmount]               = useState((15 / XN_PRICE).toFixed(2));
  const [userTokenBalance, setUserTokenBalance] = useState(null);

  const [verified, setVerified]       = useState(null);
  const [burstKey, setBurstKey]       = useState(0);
  const [tronAddress, setTronAddress] = useState("");
  const [copied, setCopied]           = useState(false);
  const [scanning, setScanning]       = useState(false);
  const [importOpen, setImportOpen]   = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const pollIntervalRef = useRef(null);
  const scannerRef      = useRef(null);
  const scannerDivRef   = useRef(null);
  const importSectionRef = useRef(null);

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

  // ── Payment check ─────────────────────────────────────────────────────────

  const checkPayment = useCallback(async () => {
    if (!usdtAmount || parseFloat(usdtAmount) < 10) return false;
    if (selectedNetwork === "TRON" && !tronAddress) return false;
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
        setVerified(data.data);
        setBurstKey((k) => k + 1);
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
  }, [selectedNetwork, tronAddress, address, usdtAmount]);

  // Background poll — auto-detects payment every 15s
  useEffect(() => {
    if (!isConnected || !address || verified) { clearInterval(pollIntervalRef.current); return; }
    pollIntervalRef.current = setInterval(checkPayment, 15000);
    return () => clearInterval(pollIntervalRef.current);
  }, [isConnected, address, verified, checkPayment]);

  // Manual "I've sent the payment" check
  const handleManualPaymentCheck = async () => {
    if (!isConnected) {
      toast.error("Connect your wallet first.");
      return;
    }
    if (!usdtAmount || parseFloat(usdtAmount) < 10) {
      toast.error("Enter an amount of at least 10 USDT.");
      return;
    }
    if (selectedNetwork === "TRON" && !tronAddress) {
      toast.error("Enter your TRON sender address first.");
      return;
    }
    setCheckingPayment(true);
    const found = await checkPayment();
    setCheckingPayment(false);
    if (!found) {
      toast("Payment not detected yet — we'll keep checking automatically every 15 seconds.", { icon: "⏳" });
    }
  };

  const currentNetwork = USDT_NETWORKS[selectedNetwork];
  const networkLabel   = { BSC: "BEP-20", ETH: "ERC-20", TRON: "TRC-20" }[selectedNetwork];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-gold)" }}>

      {/* Widget header */}
      <div
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid var(--border-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
          PURCHASE XN TOKENS
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          STAGE 3 · $0.20 USDT
        </span>
      </div>

      <div style={{ padding: "24px" }}>

        {/* ── SUCCESS STATE ── */}
        {verified && (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div
              style={{
                width: 64, height: 64,
                border: "2px solid var(--c-success)", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", background: "rgba(74,140,111,0.1)",
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
            <button
              type="button"
              className="btn-link"
              style={{ justifyContent: "center", margin: "0 auto", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                setImportOpen(true);
                importSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              HOW TO IMPORT XN TOKENS →
            </button>
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
              <StepLabel>STEP 1 — SELECT PAYMENT NETWORK</StepLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {NETWORK_CARDS.map((net) => {
                  const active = selectedNetwork === net.key;
                  return (
                    <button
                      key={net.key}
                      onClick={() => handleNetworkChange(net.key)}
                      className={active ? "net-card net-card-active" : "net-card"}
                    >
                      <div>
                        <div className="net-card-name">{net.name}</div>
                        <div className="net-card-desc">{net.desc}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {net.recommended && <span className="net-rec">RECOMMENDED</span>}
                        <div className="net-check">
                          {active && <div className="net-check-inner" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wallet */}
            <div>
              <StepLabel>STEP 2 — CONNECT YOUR WALLET</StepLabel>
              {!isConnected ? (
                <div>
                  <button
                    onClick={connectWallet}
                    className="btn-ghost"
                    style={{ width: "100%", height: 52, justifyContent: "center", marginBottom: 10 }}
                  >
                    CONNECT WALLET
                  </button>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["MetaMask", "Coinbase", "Trust", "WalletConnect"].map((w) => (
                      <span key={w} className="wallet-logo-tag">{w}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ border: "1px solid rgba(74,140,111,0.3)", background: "rgba(74,140,111,0.06)", padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-success)" }}>
                      CONNECTED
                    </span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => open({ view: "Account" })} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", cursor: "pointer", background: "none", border: "none" }}>
                        CHANGE
                      </button>
                      <button onClick={() => disconnect()} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-danger)", cursor: "pointer", background: "none", border: "none" }}>
                        DISCONNECT
                      </button>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-sec)", wordBreak: "break-all" }}>{address}</p>
                  {userTokenBalance !== null && (
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--c-success)", marginTop: 6 }}>
                      XN BALANCE: {userTokenBalance} XN
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* TRON sender address */}
            {selectedNetwork === "TRON" && (
              <div>
                <StepLabel>YOUR TRON SENDER ADDRESS</StepLabel>
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
                      flex: 1, background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)",
                      padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 11,
                      color: "var(--text-primary)", outline: "none",
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
                      fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: scanning ? "var(--c-danger)" : "var(--gold)", cursor: "pointer", whiteSpace: "nowrap",
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
              <StepLabel>STEP 3 — ENTER AMOUNT</StepLabel>

              {/* Quick-select */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleUsdtChange(amt)}
                    style={{
                      flex: 1, padding: "6px 0",
                      background: usdtAmount == amt ? "var(--gold)" : "var(--bg-tertiary)",
                      border: usdtAmount == amt ? "1px solid var(--gold)" : "1px solid var(--border-sub)",
                      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
                      color: usdtAmount == amt ? "var(--text-inv)" : "var(--text-muted)",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* USDT input */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                YOU SEND
              </div>
              <div style={{ position: "relative", marginBottom: 4 }}>
                <input
                  type="number"
                  value={usdtAmount}
                  min={10}
                  max={10000}
                  onChange={(e) => handleUsdtChange(e.target.value)}
                  style={{
                    width: "100%", height: 64,
                    background: "var(--bg-tertiary)", border: "1px solid var(--border-sub)",
                    padding: "0 60px 0 18px",
                    fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--text-primary)", outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", pointerEvents: "none" }}>
                  USDT
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 10 }}>
                MIN: 10 USDT
              </p>

              {/* Rate line */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1, height: 1, background: "var(--border-sub)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--gold)", whiteSpace: "nowrap" }}>
                  1 XN = 0.20 USDT
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--border-sub)" }} />
              </div>

              {/* XN output */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
                YOU RECEIVE
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  value={xnAmount}
                  onChange={(e) => handleXnChange(e.target.value)}
                  style={{
                    width: "100%", height: 64,
                    background: "var(--bg-tertiary)", border: "1px solid var(--border-gold)",
                    padding: "0 50px 0 18px",
                    fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--gold)", outline: "none",
                  }}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--gold)", pointerEvents: "none" }}>
                  XN
                </span>
              </div>
            </div>

            {/* Step 4: Send & Confirm */}
            <div>
              <StepLabel>STEP 4 — SEND &amp; CONFIRM</StepLabel>

              {currentNetwork?.depositAddress ? (
                <>
                  <div style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
                    Send <strong style={{ color: "var(--text-primary)" }}>{usdtAmount} {networkLabel} USDT</strong> to:
                  </div>

                  {/* Address box */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      background: "var(--bg-tertiary)", border: "1px solid var(--border-gold)",
                      padding: "14px 16px", marginBottom: 12,
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
                        fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em",
                        textTransform: "uppercase", color: copied ? "var(--c-success)" : "var(--text-inv)",
                        cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
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

                  {/* Manual payment check */}
                  <button
                    className="btn-primary authorize-btn"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={handleManualPaymentCheck}
                    disabled={checkingPayment}
                    data-cursor="cta"
                  >
                    {checkingPayment ? "CHECKING…" : "I'VE SENT THE PAYMENT"}
                  </button>

                  {/* Payment listener indicator */}
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

      {/* Import collapsible */}
      <div ref={importSectionRef} style={{ borderTop: "1px solid var(--border-sub)" }}>
        <button
          className="import-toggle"
          onClick={() => setImportOpen(!importOpen)}
        >
          <span>HOW TO ADD XN TO YOUR WALLET</span>
          <span style={{ transform: importOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
        </button>
        <div style={{ maxHeight: importOpen ? 280 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ padding: "0 24px 20px" }}>
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

function StepLabel({ children }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>
      {children}
    </div>
  );
}
