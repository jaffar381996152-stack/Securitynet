"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import toast from "react-hot-toast";

/**
 * Gates the wallet-connect modal behind authentication.
 * If the user isn't signed in, redirects to /signin and resumes the
 * wallet-connect flow automatically once they return authenticated.
 */
export default function useWalletConnectGate() {
  const { status } = useSession();
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const router = useRouter();
  const autoOpened = useRef(false);

  useEffect(() => {
    if (autoOpened.current) return;
    if (status !== "authenticated" || isConnected) return;
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("connectWallet") !== "1") return;

    autoOpened.current = true;
    open();

    url.searchParams.delete("connectWallet");
    const qs = url.searchParams.toString();
    window.history.replaceState({}, "", `${url.pathname}${qs ? `?${qs}` : ""}${url.hash}`);
  }, [status, isConnected, open]);

  const connectWallet = () => {
    if (status === "authenticated") {
      open();
      return;
    }

    toast.error("Please sign in or create an account to connect your wallet.");

    const url = new URL(window.location.href);
    url.searchParams.set("connectWallet", "1");
    const callbackUrl = `${url.pathname}${url.search}`;
    router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return { connectWallet };
}
