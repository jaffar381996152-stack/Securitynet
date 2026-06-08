import { mainnet, arbitrum, bsc, bscTestnet, localhost } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

/**
 * Map environment setting -> networks array.
 * Set NEXT_PUBLIC_SETTING to 'dev' | 'test' | 'live' (client-side) to pick a set.
 */
const NETWORK_SETS: Record<string, [AppKitNetwork, ...AppKitNetwork[]]> = {
  dev: [localhost],
  test: [bscTestnet, localhost],
  live: [mainnet, bsc, bscTestnet],
};

const envKey =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_SETTING
    ? String(process.env.NEXT_PUBLIC_SETTING).toLowerCase()
    : "live";

export const networks = NETWORK_SETS[envKey] ?? NETWORK_SETS.live;
