"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[249],{33249:(t,e,n)=>{n.d(e,{SIWEController:()=>c,getDidAddress:()=>o.q_h,getDidChainId:()=>o.aG$});var i=n(55476),s=n(98520),a=n(6461);const r=(0,s.BX)({status:"uninitialized"}),c={state:r,subscribeKey:(t,e)=>(0,i.u$)(r,t,e),subscribe:t=>(0,s.B1)(r,(()=>t(r))),_getClient(){if(!r._client)throw new Error("SIWEController client not set");return r._client},async getNonce(t){const e=this._getClient(),n=await e.getNonce(t);return this.setNonce(n),n},async getSession(){try{const t=this._getClient(),e=await t.getSession();return e&&(this.setSession(e),this.setStatus("success")),e||void 0}catch{return}},createMessage(t){const e=this._getClient().createMessage(t);return this.setMessage(e),e},async verifyMessage(t){const e=this._getClient();return await e.verifyMessage(t)},async signIn(){const t=this._getClient();return await t.signIn()},async signOut(){const t=this._getClient();await t.signOut(),this.setStatus("ready"),this.setSession(void 0),t.onSignOut?.()},onSignIn(t){const e=this._getClient();e.onSignIn?.(t)},onSignOut(){const t=this._getClient();t.onSignOut?.()},async setSIWEClient(t){r._client=(0,s.KR)(t),r.session=await this.getSession(),r.status=r.session?"success":"ready",a.WB.setAccountProp("siweStatus",r.status,"eip155"),a.Hd.setIsSiweEnabled(t.options.enabled)},setNonce(t){r.nonce=t},setStatus(t){r.status=t,a.WB.setAccountProp("siweStatus",r.status,"eip155")},setMessage(t){r.message=t},setSession(t){r.session=t,r.status=t?"success":"ready",a.WB.setAccountProp("siweStatus",r.status,"eip155")}};n(4674);var o=n(31650),l=n(14737),u=n(60178);const g=u.AH`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var p=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let d=class extends u.WF{constructor(){super(...arguments),this.dappImageUrl=a.Hd.state.metadata?.icons,this.walletImageUrl=a.Uj.state.connectedWalletInfo?.icon}firstUpdated(){const t=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");t?.[0]&&this.createAnimation(t[0],"translate(18px)"),t?.[1]&&this.createAnimation(t[1],"translate(-18px)")}render(){return u.qy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(t,e){t.animate([{transform:"translateX(0px)"},{transform:e}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};d.styles=g,d=p([(0,l.customElement)("w3m-connecting-siwe")],d);var w=n(15322),h=n(96294),S=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let C=class extends u.WF{constructor(){super(...arguments),this.dappName=a.Hd.state.metadata?.name,this.isSigning=!1,this.isCancelling=!1}render(){return u.qy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,a.En.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track",properties:{network:a.WB.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:a.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}});try{c.setStatus("loading");const t=await c.signIn();return c.setStatus("success"),a.En.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track",properties:{network:a.WB.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:a.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),t}catch(t){const e=a.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT;return e?a.Pt.showError("This application might not support Smart Accounts"):a.Pt.showError("Signature declined"),c.setStatus("error"),a.En.sendEvent({event:"SIWE_AUTH_ERROR",type:"track",properties:{network:a.WB.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:e}})}finally{this.isSigning=!1}}async onCancel(){this.isCancelling=!0;a.WB.state.activeCaipAddress?(await a.x4.disconnect(),a.W3.close()):a.IN.push("Connect"),this.isCancelling=!1,a.En.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track",properties:{network:a.WB.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:a.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}};S([(0,w.wk)()],C.prototype,"isSigning",void 0),S([(0,w.wk)()],C.prototype,"isCancelling",void 0),C=S([(0,l.customElement)("w3m-connecting-siwe-view")],C)}}]);