import { BodyNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { SupabaseConnector } from "@common-module/supabase";
import {
  WalletLoginConfig,
  WalletLoginManager,
} from "@common-module/wallet-login";
import { GaiaUIPreset } from "@gaiaprotocol/ui-preset";
import { mainnet } from "@wagmi/core/chains";

(async () => {
  console.log("Start Test");

  GaiaUIPreset.init();

  WalletLoginConfig.init({
    chains: [mainnet as any],
    walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
    supabaseConnector: new SupabaseConnector(
      "https://vykzkqqncxcfzflpkcsr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
      WalletLoginManager,
    ),
  });

  WalletLoginManager.init();

  new Button({
    type: ButtonType.Contained,
    title: "Login",
    onClick: () => WalletLoginManager.login(),
  }).appendTo(BodyNode);

  new Button({
    type: ButtonType.Contained,
    title: "Logout",
    onClick: () => WalletLoginManager.logout(),
  }).appendTo(BodyNode);
})();
