"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[382],{70382:(e,t,i)=>{i.r(t),i.d(t,{W3mModal:()=>h});var a=i(6461),o=i(14737),s=i(60178),n=i(15322);const r=s.AH`
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
`;var c=i(4674),l=function(e,t,i,a){var o,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const d="scroll-lock";let h=class extends s.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=a.W3.state.open,this.caipAddress=a.WB.state.activeCaipAddress,this.caipNetwork=a.WB.state.activeCaipNetwork,this.isSiweEnabled=a.Hd.state.isSiweEnabled,this.shake=a.W3.state.shake,this.initializeTheming(),a.Np.prefetch(),this.unsubscribe.push(a.W3.subscribeKey("open",(e=>e?this.onOpen():this.onClose())),a.W3.subscribeKey("shake",(e=>this.shake=e)),a.Uj.subscribeKey("siweStatus",(e=>this.onSiweStatusChange(e)),"eip155"),a.WB.subscribeKey("activeCaipNetwork",(e=>this.onNewNetwork(e))),a.WB.subscribeKey("activeCaipAddress",(e=>this.onNewAddress(e))),a.Hd.subscribeKey("isSiweEnabled",(e=>this.isSiweEnabled=e))),a.En.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),this.onRemoveKeyboardListener()}render(){return this.open?s.qy`
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
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e="ConnectingSiwe"===a.IN.state.view,t="ApproveTransaction"===a.IN.state.view,o="UnsupportedChain"===a.IN.state.view;if(this.isSiweEnabled){const{SIWEController:o}=await i.e(249).then(i.bind(i,33249));"success"!==o.state.status&&(e||t)?a.W3.shake():a.W3.close()}else o?a.W3.shake():a.W3.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=a.Wn.state,i=o.UiHelperUtil.getColorTheme(t);(0,o.initializeTheming)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),a.Pt.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=d,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${d}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",(t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}}),this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}onSiweStatusChange(e){"success"===e&&a.W3.close()}async onNewAddress(e){const t=this.caipAddress,o=t?a.wE.getPlainAddress(t):void 0,s=e?a.wE.getPlainAddress(e):void 0,n=o===s;if(this.caipAddress=e,await a.x4.initializeSWIXIfAvailable(),s&&!n&&this.isSiweEnabled)try{const{SIWEController:e}=await i.e(249).then(i.bind(i,33249)),t="success"===a.Uj.state.siweStatus;!o&&s?this.onSiweNavigation():t&&o&&s&&o!==s&&e.state._client?.options.signOutOnAccountChange&&(await e.signOut(),this.onSiweNavigation())}catch(e){throw this.caipAddress=t,e}s||a.W3.close()}async onNewNetwork(e){if(!this.caipAddress)return this.caipNetwork=e,void a.IN.goBack();const t=this.caipNetwork?.caipNetworkId?.toString(),o=e?.caipNetworkId?.toString();if(t&&o&&t!==o)if(this.isSiweEnabled){const{SIWEController:e}=await i.e(249).then(i.bind(i,33249));e.state._client?.options.signOutOnNetworkChange?(await e.signOut(),this.onSiweNavigation()):a.IN.goBack()}else a.IN.goBack();this.caipNetwork=e}onSiweNavigation(){const e=a.WB.state.activeChain===c.oU.CHAIN.EVM;!("success"===a.Uj.state.siweStatus)&&e?this.open?a.IN.replace("ConnectingSiwe"):a.W3.open({view:"ConnectingSiwe"}):a.IN.goBack()}};h.styles=r,l([(0,n.wk)()],h.prototype,"open",void 0),l([(0,n.wk)()],h.prototype,"caipAddress",void 0),l([(0,n.wk)()],h.prototype,"caipNetwork",void 0),l([(0,n.wk)()],h.prototype,"isSiweEnabled",void 0),l([(0,n.wk)()],h.prototype,"shake",void 0),h=l([(0,o.customElement)("w3m-modal")],h)}}]);