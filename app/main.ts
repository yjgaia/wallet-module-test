import { BodyNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletSessionManager } from "@common-module/wallet";
import {
  createSIWEConfig,
  formatMessage,
  type SIWECreateMessageArgs,
  type SIWESession,
  type SIWEVerifyMessageArgs,
} from "@reown/appkit-siwe";
import { mainnet } from "@reown/appkit/networks";
import ParsingNFTDataABI from "./ParsingNFTData.json" with {
  type: "json",
};

const projectId = "7538ca3cec20504b06a3338d0e53b028";

const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

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

  getNonce: async () => { //This is only an example, substitute it with your actual nonce getter.
    const nonce =
      "0f3c11af88662c90529dc2b8382ad56c507c06d64c9c365144e0937f00a11359";
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }
    return nonce;
  },
  getSession,
  verifyMessage,
  signOut: async () => { //Example
    // Implement your Sign out function
    return true;
  },
});

const BASE_URL = "http://localhost:8080";

(async () => {
  console.log("Start Test");

  WalletSessionManager.init({
    projectId,
    metadata,
    networks: [mainnet],
    //siweConfig,
  });

  WalletSessionManager.on("sessionChanged", (walletAddress) => {
    console.log("Wallet Address:", walletAddress);
  });

  new Button({
    type: ButtonType.Contained,
    title: "Open Modal",
    onClick: () => WalletSessionManager.openModal(),
  }).appendTo(BodyNode);

  const result = await WalletSessionManager.readContract({
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
