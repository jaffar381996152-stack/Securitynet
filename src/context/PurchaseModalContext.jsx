"use client";
import { createContext, useCallback, useContext, useState } from "react";

const PurchaseModalContext = createContext(null);

export function PurchaseModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState("");
  const [nonce, setNonce] = useState(0);

  const openPurchaseModal = useCallback((amount) => {
    setInitialAmount(amount ?? "");
    setNonce((n) => n + 1);
    setIsOpen(true);
  }, []);

  const closePurchaseModal = useCallback(() => setIsOpen(false), []);

  return (
    <PurchaseModalContext.Provider value={{ isOpen, initialAmount, nonce, openPurchaseModal, closePurchaseModal }}>
      {children}
    </PurchaseModalContext.Provider>
  );
}

export function usePurchaseModal() {
  const ctx = useContext(PurchaseModalContext);
  if (!ctx) throw new Error("usePurchaseModal must be used within a PurchaseModalProvider");
  return ctx;
}
