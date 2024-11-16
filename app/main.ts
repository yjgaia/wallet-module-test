import { BodyNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { SupabaseConnector } from "@common-module/supabase";
import {
  WalletLoginConfig,
  WalletLoginManager,
} from "@common-module/wallet-login";
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

  /*WalletLoginManager.on("sessionChanged", (walletAddress) => {
    console.log("Wallet Address:", walletAddress);
  });*/

  new Button({
    type: ButtonType.Contained,
    title: "Open Modal",
    onClick: () => WalletLoginManager.openWallet(),
  }).appendTo(BodyNode);

  new Button({
    type: ButtonType.Contained,
    title: "Disconnect",
    onClick: () => WalletLoginManager.disconnect(),
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
