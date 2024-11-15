"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[382],{70382:(e,t,i)=>{i.r(t),i.d(t,{W3mModal:()=>h});var o=i(6461),a=i(14737),s=i(60178),n=i(15322);const r=s.AH`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var c=i(4674),l=function(e,t,i,o){var a,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(n=(s<3?a(n):s>3?a(t,i,n):a(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const d="scroll-lock";let h=class extends s.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=o.W3.state.open,this.caipAddress=o.WB.state.activeCaipAddress,this.caipNetwork=o.WB.state.activeCaipNetwork,this.isSiweEnabled=o.Hd.state.isSiweEnabled,this.shake=o.W3.state.shake,this.initializeTheming(),o.Np.prefetch(),this.unsubscribe.push(o.W3.subscribeKey("open",(e=>e?this.onOpen():this.onClose())),o.W3.subscribeKey("shake",(e=>this.shake=e)),o.Uj.subscribeKey("siweStatus",(e=>this.onSiweStatusChange(e)),"eip155"),o.WB.subscribeKey("activeCaipNetwork",(e=>this.onNewNetwork(e))),o.WB.subscribeKey("activeCaipAddress",(e=>this.onNewAddress(e))),o.Hd.subscribeKey("isSiweEnabled",(e=>this.isSiweEnabled=e))),o.En.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),this.onRemoveKeyboardListener()}render(){return this.open?s.qy`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
              <w3m-alertbar></w3m-alertbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e="ConnectingSiwe"===o.IN.state.view,t="ApproveTransaction"===o.IN.state.view;if(this.isSiweEnabled){const{SIWEController:a}=await i.e(249).then(i.bind(i,33249));"success"!==a.state.status&&(e||t)?o.W3.shake():o.W3.close()}else o.W3.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=o.Wn.state,i=a.UiHelperUtil.getColorTheme(t);(0,a.initializeTheming)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),o.Pt.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=d,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${d}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",(t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}}),this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}onSiweStatusChange(e){"success"===e&&o.W3.close()}async onNewAddress(e){const t=this.caipAddress,a=t?o.wE.getPlainAddress(t):void 0,s=e?o.wE.getPlainAddress(e):void 0,n=a===s;if(this.caipAddress=e,await o.x4.initializeSWIXIfAvailable(),s&&!n&&this.isSiweEnabled)try{const{SIWEController:e}=await i.e(249).then(i.bind(i,33249)),t="success"===o.Uj.state.siweStatus;!a&&s?this.onSiweNavigation():t&&a&&s&&a!==s&&e.state._client?.options.signOutOnAccountChange&&(await e.signOut(),this.onSiweNavigation())}catch(e){throw this.caipAddress=t,e}s||o.W3.close()}async onNewNetwork(e){if(!this.caipAddress)return this.caipNetwork=e,void o.IN.goBack();const t=this.caipNetwork?.caipNetworkId?.toString(),a=e?.caipNetworkId?.toString();if(t&&a&&t!==a)if(this.isSiweEnabled){const{SIWEController:e}=await i.e(249).then(i.bind(i,33249));e.state._client?.options.signOutOnNetworkChange?(await e.signOut(),this.onSiweNavigation()):o.IN.goBack()}else o.IN.goBack();this.caipNetwork=e}onSiweNavigation(){const e=o.WB.state.activeChain===c.oU.CHAIN.EVM;!("success"===o.Uj.state.siweStatus)&&e?this.open?o.IN.replace("ConnectingSiwe"):o.W3.open({view:"ConnectingSiwe"}):o.IN.goBack()}};h.styles=r,l([(0,n.wk)()],h.prototype,"open",void 0),l([(0,n.wk)()],h.prototype,"caipAddress",void 0),l([(0,n.wk)()],h.prototype,"caipNetwork",void 0),l([(0,n.wk)()],h.prototype,"isSiweEnabled",void 0),l([(0,n.wk)()],h.prototype,"shake",void 0),h=l([(0,a.customElement)("w3m-modal")],h)}}]);