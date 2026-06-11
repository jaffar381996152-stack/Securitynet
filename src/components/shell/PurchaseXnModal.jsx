"use client";
import { useEffect, useState } from "react";
import { usePurchaseModal } from "@/context/PurchaseModalContext";
import DigitalGold from "@/components/token/erctoken";

export default function PurchaseXnModal() {
  const { isOpen, initialAmount, nonce, closePurchaseModal } = usePurchaseModal();
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      const raf = requestAnimationFrame(() => setShow(true));
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = prevOverflow;
      };
    }
    setShow(false);
    const t = setTimeout(() => setRender(false), 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closePurchaseModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closePurchaseModal]);

  if (!render) return null;

  return (
    <div className={`purchase-modal-backdrop${show ? " open" : ""}`} onClick={closePurchaseModal}>
      <div className="purchase-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="purchase-modal-close" onClick={closePurchaseModal} aria-label="Close">
          ✕
        </button>
        <DigitalGold key={nonce} initialUsdtAmount={initialAmount} />
      </div>
    </div>
  );
}
