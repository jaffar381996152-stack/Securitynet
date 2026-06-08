const SETTINGS_LIST = [
  {
    id: "dev",
    CODE_URL:
      "https://bscscan.com/token/0x508534e9A712e07ac9d55d497eF3f0884aea67fe#code",
    CONTRACT_ADDRESS: "0x97fFb1034C8cB6ae2D93f3833F2e48716F1b2AA1",
    CHAIN_Id: 1337,
    NETWORK: "the Ganache",
    STABLE_COINS: {
      USDT: "0xF3869035b55Ab4dfE10b0973424E44B6f2eE3C48",
    },
    // Deposit wallet addresses per network (where users manually send USDT)
    USDT_NETWORKS: {
      BSC: {
        label: "Binance Smart Chain (BEP-20)",
        depositAddress: "0x2731bdA849E0A4d1904b556509B9709Adc2Ed705",
        usdtContract: "0x55d398326f99059ff775485246999027b3197955",
        chainId: 1337,
        moralisChain: "0x61",
        decimals: 18,
      },
      ETH: {
        label: "Ethereum (ERC-20)",
        depositAddress: "0x2731bdA849E0A4d1904b556509B9709Adc2Ed705",
        usdtContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        moralisChain: "0x1",
        decimals: 6,
      },
      TRON: {
        label: "Tron (TRC-20)",
        depositAddress: "TU3n2wTQr97j53feE42cjvcNUZPYjm4NtL",
        usdtContract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        moralisChain: null, // handled separately via TRON API
        decimals: 6,
      },
    },
  },
  {
    id: "test",
    CODE_URL:
      "https://testnet.bscscan.com/token/0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0#code",
    CONTRACT_ADDRESS: "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0",
    CHAIN_Id: 97,
    NETWORK: "The BNB Chain Testnet",
    STABLE_COINS: {
      USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    },
    USDT_NETWORKS: {
      BSC: {
        label: "Binance Smart Chain (BEP-20)",
        depositAddress: "YOUR_BSC_DEPOSIT_WALLET_ADDRESS",
        usdtContract: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        chainId: 97,
        moralisChain: "0x61",
        decimals: 18,
      },
      ETH: {
        label: "Ethereum (ERC-20)",
        depositAddress: "YOUR_ETH_DEPOSIT_WALLET_ADDRESS",
        usdtContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        moralisChain: "0x1",
        decimals: 6,
      },
      TRON: {
        label: "Tron (TRC-20)",
        depositAddress: "YOUR_TRON_DEPOSIT_WALLET_ADDRESS",
        usdtContract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        moralisChain: null,
        decimals: 6,
      },
    },
  },
  {
    id: "live",
    CODE_URL:
      "https://bscscan.com/token/0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0#code",
    CONTRACT_ADDRESS: "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0",
    CHAIN_Id: 56,
    NETWORK: "The Binance Smart Chain",
    STABLE_COINS: {
      USDT: "0x55d398326f99059ff775485246999027b3197955",
    },
    USDT_NETWORKS: {
      BSC: {
        label: "Binance Smart Chain (BEP-20)",
        depositAddress: "0x917D93261B6b232F6b8b643d65b48928D1c85FFc",
        usdtContract: "0x55d398326f99059ff775485246999027b3197955",
        chainId: 56,
        moralisChain: "0x38",
        decimals: 18,
      },
      ETH: {
        label: "Ethereum (ERC-20)",
        depositAddress: "0x917D93261B6b232F6b8b643d65b48928D1c85FFc",
        usdtContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        moralisChain: "0x1",
        decimals: 6,
      },
      TRON: {
        label: "Tron (TRC-20)",
        depositAddress: "TU3n2wTQr97j53feE42cjvcNUZPYjm4NtL",
        usdtContract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        moralisChain: null,
        decimals: 6,
      },
    },
  },
];

// Read deposit addresses from NEXT_PUBLIC_ env vars (available on both server and client)
const DEPOSIT_BSC  = process.env.NEXT_PUBLIC_DEPOSIT_WALLET_BSC  || "";
const DEPOSIT_ETH  = process.env.NEXT_PUBLIC_DEPOSIT_WALLET_ETH  || "";
const DEPOSIT_TRON = process.env.NEXT_PUBLIC_DEPOSIT_WALLET_TRON || "";

// Inject env-based deposit addresses into all environments
SETTINGS_LIST.forEach((s) => {
  s.USDT_NETWORKS.BSC.depositAddress  = DEPOSIT_BSC;
  s.USDT_NETWORKS.ETH.depositAddress  = DEPOSIT_ETH;
  s.USDT_NETWORKS.TRON.depositAddress = DEPOSIT_TRON;
});

let settings = null;

const envKey =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SETTING) || null;

if (envKey) {
  settings = SETTINGS_LIST.find((s) => s.id === envKey) || null;
}

if (!settings) {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.startsWith("localhost")) {
      settings = SETTINGS_LIST.find((s) => s.id === "dev");
    } else if (hostname.startsWith("testnet.")) {
      settings = SETTINGS_LIST.find((s) => s.id === "test");
    } else {
      settings = SETTINGS_LIST.find((s) => s.id === "live");
    }
  } else {
    settings = SETTINGS_LIST.find((s) => s.id === "live");
  }
}

export default settings;
