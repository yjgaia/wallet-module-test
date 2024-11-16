import { BodyNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  createSIWEConfig,
  formatMessage,
  type SIWECreateMessageArgs,
  type SIWESession,
  type SIWEVerifyMessageArgs,
} from "@reown/appkit-siwe";
import { mainnet } from "@reown/appkit/networks";
import { createPublicClient, http } from "viem";
import ParsingNFTDataABI from "./ParsingNFTData.json" with {
  type: "json",
};
import { SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig, WalletLoginManager } from "@common-module/wallet-login";

const projectId = "7538ca3cec20504b06a3338d0e53b028";

const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

(async () => {
  console.log("Start Test");

  WalletLoginConfig.supabaseConnector = new SupabaseConnector(
    "https://dhzxulywizygtdficytt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenh1bHl3aXp5Z3RkZmljeXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTIxNDUsImV4cCI6MjA0NTY4ODE0NX0.xUd8nqcT2aVn1j4x8c-pRbDcFSaIGtkn7SAcmKleBms",
    WalletLoginManager,
  );

  WalletLoginManager.init({
    projectId,
    metadata,
    networks: [mainnet],
  });

  //WalletLoginManager.on("sessionChanged", (walletAddress) => {
  //  console.log("Wallet Address:", walletAddress);
  //});

  new Button({
    type: ButtonType.Contained,
    title: "Open Modal",
    onClick: () => WalletLoginManager.openWallet(),
  }).appendTo(BodyNode);

  new Button({
    type: ButtonType.Contained,
    title: "Logout",
    onClick: () => WalletLoginManager.logout(),
  }).appendTo(BodyNode);

  const result = await WalletLoginManager.readContract({
    chainId: 1,
    address: "0x06f98E2E91E64103d612243a151750d14e5EDacC",
    abi: ParsingNFTDataABI.abi,
    functionName: "getERC721BalanceList_OneToken",
    args: [
      "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372",
      ["0xbB22b6F3CE72A5Beb3CC400d9b6AF808A18E0D4c"],
    ],
  });

  console.log("Result:", result);
})();

/*export const networks: any = [mainnet];

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

async function getSession() {
  const res = await fetch(BASE_URL + "/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data == "{}" ? null : data as SIWESession;
}

const verifyMessage = async ({ message, signature }: SIWEVerifyMessageArgs) => {
  try {
    const response = await fetch(BASE_URL + "/verify", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ message, signature }),
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result === true;
  } catch (error) {
    return false;
  }
};

const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: window.location.host,
    uri: window.location.origin,
    chains: [1, 2020],
    statement: "Please sign with your account",
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce: () =>
    WalletLoginConfig.supabaseConnector.callEdgeFunction<string>(
      "siwe/nonce",
    ),
  verifyMessage: async ({ message, signature }) => {
    const token = await WalletLoginConfig.supabaseConnector
      .callEdgeFunction<string>(
        "siwe/verify",
        {
          message,
          signature,
          projectId: projectId,
        },
      );
    WalletLoginManager.token = token;
    return true;
  },
  getSession: async () => {
    const result = await WalletLoginConfig.supabaseConnector
      .callEdgeFunction<{ address: string; chainId: number }>(
        "siwe/session",
      );
    return (result.address && result.chainId) ? result : null;
  },
  signOut: async () => true,
});

// 3. Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  siweConfig: siweConfig,
});

const BASE_URL = "http://localhost:8080";

(async () => {
  console.log("Start Test");

  WalletLoginConfig.supabaseConnector = new SupabaseConnector(
    "https://dhzxulywizygtdficytt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenh1bHl3aXp5Z3RkZmljeXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTIxNDUsImV4cCI6MjA0NTY4ODE0NX0.xUd8nqcT2aVn1j4x8c-pRbDcFSaIGtkn7SAcmKleBms",
    WalletLoginManager,
  );

  new Button({
    type: ButtonType.Contained,
    title: "Open Modal",
    onClick: () => modal.open(),
  }).appendTo(BodyNode);

  const client = createPublicClient({
    chain: mainnet as any,
    transport: http(),
  });

  const result = await client.readContract({
    address: "0x06f98E2E91E64103d612243a151750d14e5EDacC",
    abi: ParsingNFTDataABI.abi,
    functionName: "getERC721BalanceList_OneToken",
    args: [
      "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372",
      ["0xbB22b6F3CE72A5Beb3CC400d9b6AF808A18E0D4c"],
    ],
  });

  console.log("Result:", result);
})();
*/