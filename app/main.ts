import { BodyNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
import ParsingNFTDataABI from "./ParsingNFTData.json" with {
  type: "json",
};
import { connect, readContract } from "@wagmi/core";

const projectId = "7538ca3cec20504b06a3338d0e53b028";

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      projectId,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

(async () => {
  console.log("Start Test");

  new Button({
    type: ButtonType.Contained,
    title: "Open Modal",
    onClick: () => {
      connect(config, {
        connector: walletConnect({
          projectId,
        }),
      });
    },
  }).appendTo(BodyNode);

  const result = await readContract(config, {
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
