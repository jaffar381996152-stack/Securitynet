"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, bsc } from "@reown/appkit/networks";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const origin = typeof window !== "undefined" ? window.location.origin : "https://securitynet.ai";
const walletIconUrl = `${origin}/wallet-icon.png`;

const metadata = {
  name: "Securitynet",
  description: "AI Eyes, Safe Skies Fueled By Blockchain Technology",
  url: origin,
  icons: [walletIconUrl],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [bsc, mainnet],
  projectId,
  features: {
    analytics: false,
  },
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#483AA0",
    "--w3m-color-mix": "#483AA0",
    "--w3m-color-mix-strength": 0,
    "--w3m-font-family": "inherit",
  },
  tokens: {
    "eip155:56": {
      address: (process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0") as `0x${string}`,
      image: walletIconUrl,
    },
  },
});

export function AppKit({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
