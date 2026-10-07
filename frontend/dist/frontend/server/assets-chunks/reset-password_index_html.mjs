export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
.login-page-wrapper[_ngcontent-ng-c1612505067] {
  --teal-dark: #0F766E;
  --teal-medium: #0D9488;
  --teal-light: #14B8A6;
  --turquoise: #2DD4BF;
  --cyan: #06B6D4;
  --dark-accent: #042F2E;
  --bg-gradient:
    radial-gradient(
      circle at 10% 20%,
      #14B8A6 0%,
      #0D9488 40%,
      #0F766E 90%);
  --card-bg: rgba(255, 255, 255, 0.82);
  --card-border: rgba(255, 255, 255, 0.35);
  --input-bg: #FFFFFF;
  --text-main: #042F2E;
  --text-muted: #115E59;
  --border-color: #CCFBF1;
  --motif-color: rgba(255, 255, 255, 0.22);
  --shadow-card: 0 20px 40px -15px rgba(4, 47, 46, 0.15), 0 10px 10px -10px rgba(4, 47, 46, 0.05);
  --shadow-input-focus: 0 0 0 4px rgba(20, 184, 166, 0.18);
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  background: var(--bg-gradient);
  color: var(--text-color);
  font-family:
    "Space Grotesk",
    system-ui,
    -apple-system,
    sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  transition: background 0.4s ease, color 0.4s ease;
}
.dark[_nghost-ng-c1612505067]   .login-page-wrapper[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .login-page-wrapper[_ngcontent-ng-c1612505067] {
  --bg-gradient:
    radial-gradient(
      circle at 10% 20%,
      #0D9488 0%,
      #0F766E 40%,
      #042F2E 90%);
  --card-bg: rgba(11, 23, 27, 0.75);
  --card-border: rgba(255, 255, 255, 0.08);
  --input-bg: #0D1E21;
  --text-main: #F2FBF9;
  --text-muted: #99F6E4;
  --border-color: #115E59;
  --motif-color: rgba(45, 212, 191, 0.15);
  --shadow-card: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  --shadow-input-focus: 0 0 0 4px rgba(45, 212, 191, 0.25);
}
.centered-container[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  z-index: 10;
  position: relative;
}
.fluid-teal-backdrop[_ngcontent-ng-c1612505067] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}
.glow-orb[_ngcontent-ng-c1612505067] {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.35;
  transition: opacity 0.5s ease;
}
.orb-1[_ngcontent-ng-c1612505067] {
  top: -20%;
  left: -10%;
  width: 600px;
  height: 600px;
  background-color: var(--turquoise);
  animation: _ngcontent-ng-c1612505067_float-orb 28s ease-in-out infinite alternate;
}
.orb-2[_ngcontent-ng-c1612505067] {
  bottom: -20%;
  right: -10%;
  width: 700px;
  height: 700px;
  background-color: var(--cyan);
  animation: _ngcontent-ng-c1612505067_float-orb 32s ease-in-out infinite alternate-reverse;
}
.orb-3[_ngcontent-ng-c1612505067] {
  top: 30%;
  right: 20%;
  width: 500px;
  height: 500px;
  background-color: #059669;
  animation: _ngcontent-ng-c1612505067_float-orb 25s ease-in-out infinite alternate;
}
@keyframes _ngcontent-ng-c1612505067_float-orb {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(80px, -50px) scale(1.1);
  }
  100% {
    transform: translate(-40px, 60px) scale(0.95);
  }
}
.university-motifs[_ngcontent-ng-c1612505067] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 3;
}
.motif-svg[_ngcontent-ng-c1612505067] {
  position: absolute;
  color: var(--motif-color);
  fill: none;
  opacity: 0.85;
  transition: color 0.5s ease;
}
.motif-cap[_ngcontent-ng-c1612505067] {
  top: 15%;
  left: 12%;
  width: 90px;
  height: 90px;
  animation: _ngcontent-ng-c1612505067_float-motif 12s ease-in-out infinite alternate;
}
.motif-books[_ngcontent-ng-c1612505067] {
  bottom: 15%;
  left: 10%;
  width: 100px;
  height: 100px;
  animation: _ngcontent-ng-c1612505067_float-motif 15s ease-in-out infinite alternate-reverse;
}
.motif-chat[_ngcontent-ng-c1612505067] {
  top: 20%;
  right: 12%;
  width: 85px;
  height: 85px;
  animation: _ngcontent-ng-c1612505067_float-motif 10s ease-in-out infinite alternate;
}
.motif-calendar[_ngcontent-ng-c1612505067] {
  bottom: 18%;
  right: 15%;
  width: 90px;
  height: 90px;
  animation: _ngcontent-ng-c1612505067_float-motif 14s ease-in-out infinite alternate-reverse;
}
@keyframes _ngcontent-ng-c1612505067_float-motif {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(4deg) scale(1.05);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}
.login-card[_ngcontent-ng-c1612505067] {
  width: 100%;
  max-width: 600px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 2.25rem 2.25rem;
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}
.login-card[_ngcontent-ng-c1612505067]:hover {
  transform: translateY(-4px);
  border-color: rgba(45, 212, 191, 0.5);
  box-shadow: 0 30px 60px -15px rgba(11, 23, 27, 0.25), var(--shadow-card);
}
.card-header-brand[_ngcontent-ng-c1612505067] {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5rem;
}
.logo-box[_ngcontent-ng-c1612505067] {
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 0.6rem;
  margin-bottom: 0.85rem;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.05);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.login-card[_ngcontent-ng-c1612505067]:hover   .logo-box[_ngcontent-ng-c1612505067] {
  transform: scale(1.06) rotate(3deg);
  border-color: var(--turquoise);
}
.uum-logo[_ngcontent-ng-c1612505067] {
  width: 100%;
  height: 100%;
}
.project-title[_ngcontent-ng-c1612505067] {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}
.welcome-message[_ngcontent-ng-c1612505067] {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
}
.login-form[_ngcontent-ng-c1612505067] {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}
.form-group[_ngcontent-ng-c1612505067] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-label[_ngcontent-ng-c1612505067] {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
}
.input-wrapper[_ngcontent-ng-c1612505067] {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon[_ngcontent-ng-c1612505067] {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: color 0.3s ease;
}
.input-icon[_ngcontent-ng-c1612505067]   svg[_ngcontent-ng-c1612505067] {
  width: 18px;
  height: 18px;
}
.form-control[_ngcontent-ng-c1612505067] {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--text-main);
  background-color: var(--input-bg);
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  outline: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}
.form-control[_ngcontent-ng-c1612505067]:focus {
  border-color: var(--teal-light);
  box-shadow: var(--shadow-input-focus);
}
.form-control[_ngcontent-ng-c1612505067]:focus    + .input-icon[_ngcontent-ng-c1612505067] {
  color: var(--teal-light);
}
.password-toggle-btn[_ngcontent-ng-c1612505067] {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}
.password-toggle-btn[_ngcontent-ng-c1612505067]:hover {
  color: var(--teal-light);
}
.password-toggle-btn[_ngcontent-ng-c1612505067]   svg[_ngcontent-ng-c1612505067] {
  width: 20px;
  height: 20px;
}
.password-input[_ngcontent-ng-c1612505067] {
  padding-right: 2.75rem;
}
.role-badge-container[_ngcontent-ng-c1612505067] {
  margin-top: 0.5rem;
}
.role-badge[_ngcontent-ng-c1612505067] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #FEF3C7;
  border: 1.5px solid #FDE68A;
  border-radius: 8px;
  padding: 0.45rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #78350F;
  box-shadow: 0 2px 4px rgba(120, 53, 15, 0.05);
  transition: all 0.3s ease;
}
.dark[_nghost-ng-c1612505067]   .role-badge[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .role-badge[_ngcontent-ng-c1612505067] {
  background-color: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.25);
  color: #FBBF24;
  box-shadow: none;
}
.status-indicator-dot[_ngcontent-ng-c1612505067] {
  width: 6px;
  height: 6px;
  background-color: #D97706;
  border-radius: 50%;
  box-shadow: 0 0 6px #F59E0B;
}
.dark[_nghost-ng-c1612505067]   .status-indicator-dot[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .status-indicator-dot[_ngcontent-ng-c1612505067] {
  background-color: #FBBF24;
  box-shadow: 0 0 6px #FBBF24;
}
.role-label[_ngcontent-ng-c1612505067] {
  color: var(--text-muted);
}
.role-value[_ngcontent-ng-c1612505067] {
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.05em;
}
.form-options[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.checkbox-container[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  padding-left: 1.75rem;
}
.checkbox-container[_ngcontent-ng-c1612505067]   input[_ngcontent-ng-c1612505067] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.custom-checkbox[_ngcontent-ng-c1612505067] {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  background-color: var(--input-bg);
  border: 1.5px solid var(--border-color);
  border-radius: 6px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.checkbox-container[_ngcontent-ng-c1612505067]:hover   input[_ngcontent-ng-c1612505067]    ~ .custom-checkbox[_ngcontent-ng-c1612505067] {
  border-color: var(--teal-light);
}
.checkbox-container[_ngcontent-ng-c1612505067]   input[_ngcontent-ng-c1612505067]:checked    ~ .custom-checkbox[_ngcontent-ng-c1612505067] {
  background-color: var(--teal-medium);
  border-color: var(--teal-medium);
}
.custom-checkbox[_ngcontent-ng-c1612505067]::after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.checkbox-container[_ngcontent-ng-c1612505067]   input[_ngcontent-ng-c1612505067]:checked    ~ .custom-checkbox[_ngcontent-ng-c1612505067]::after {
  display: block;
}
.checkbox-label[_ngcontent-ng-c1612505067] {
  font-weight: 600;
  color: var(--text-muted);
}
.checkbox-container[_ngcontent-ng-c1612505067]:hover   .checkbox-label[_ngcontent-ng-c1612505067] {
  color: var(--text-main);
}
.forgot-link[_ngcontent-ng-c1612505067] {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}
.forgot-link[_ngcontent-ng-c1612505067]:hover {
  color: var(--teal-light);
}
.btn-login[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background:
    linear-gradient(
      135deg,
      var(--teal-medium) 0%,
      var(--teal-dark) 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  padding: 0.95rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(15, 118, 110, 0.25);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 0.75rem;
}
.btn-login[_ngcontent-ng-c1612505067]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 118, 110, 0.35);
  background:
    linear-gradient(
      135deg,
      var(--teal-light) 0%,
      var(--teal-medium) 100%);
}
.btn-login[_ngcontent-ng-c1612505067]:active:not(:disabled) {
  transform: translateY(0);
}
.btn-login[_ngcontent-ng-c1612505067]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
.btn-arrow-icon[_ngcontent-ng-c1612505067] {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}
.btn-login[_ngcontent-ng-c1612505067]:hover:not(:disabled)   .btn-arrow-icon[_ngcontent-ng-c1612505067] {
  transform: translateX(4px);
}
.register-footer[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  margin-top: 1rem;
}
.register-text[_ngcontent-ng-c1612505067] {
  color: var(--text-muted);
  font-weight: 500;
}
.register-link[_ngcontent-ng-c1612505067] {
  color: var(--teal-medium);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
}
.register-link[_ngcontent-ng-c1612505067]:hover {
  color: var(--teal-dark);
  text-decoration: underline;
}
.dark[_nghost-ng-c1612505067]   .register-link[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .register-link[_ngcontent-ng-c1612505067] {
  color: var(--turquoise);
}
.dark[_nghost-ng-c1612505067]   .register-link[_ngcontent-ng-c1612505067]:hover, .dark   [_nghost-ng-c1612505067]   .register-link[_ngcontent-ng-c1612505067]:hover {
  color: #22D3EE;
}
.theme-toggle-btn[_ngcontent-ng-c1612505067] {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 99;
  background-color: var(--card-bg);
  border: 1.5px solid var(--card-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-main);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
}
.theme-toggle-btn[_ngcontent-ng-c1612505067]:hover {
  transform: scale(1.08) rotate(15deg);
  border-color: var(--teal-light);
}
.icon-sun[_ngcontent-ng-c1612505067] {
  width: 20px;
  height: 20px;
  color: #FBBF24;
}
.icon-moon[_ngcontent-ng-c1612505067] {
  width: 20px;
  height: 20px;
  color: var(--teal-dark);
}
.dark[_nghost-ng-c1612505067]   .icon-moon[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .icon-moon[_ngcontent-ng-c1612505067] {
  color: #E2E8F0;
}
.animate-fade-in[_ngcontent-ng-c1612505067] {
  animation: _ngcontent-ng-c1612505067_fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes _ngcontent-ng-c1612505067_fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .motif-svg[_ngcontent-ng-c1612505067] {
    transform: scale(0.7);
  }
}
@media (max-width: 480px) {
  .centered-container[_ngcontent-ng-c1612505067] {
    padding: 1rem;
  }
  .login-card[_ngcontent-ng-c1612505067] {
    padding: 2.25rem 1.5rem;
    border-radius: 12px;
  }
  .university-motifs[_ngcontent-ng-c1612505067] {
    display: none;
  }
}


.reset-card[_ngcontent-ng-c1612505067] {
  max-width: 600px;
  width: 100%;
}
.clean-input[_ngcontent-ng-c1612505067] {
  padding-left: 1rem !important;
}
.alert[_ngcontent-ng-c1612505067] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.alert-danger[_ngcontent-ng-c1612505067] {
  background-color: #FEF2F2;
  border: 1.5px solid #FEE2E2;
  color: #991B1B;
}
.dark[_nghost-ng-c1612505067]   .alert-danger[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .alert-danger[_ngcontent-ng-c1612505067] {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #F87171;
}
.alert-success[_ngcontent-ng-c1612505067] {
  background-color: #ECFDF5;
  border: 1.5px solid #D1FAE5;
  color: #065F46;
}
.dark[_nghost-ng-c1612505067]   .alert-success[_ngcontent-ng-c1612505067], .dark   [_nghost-ng-c1612505067]   .alert-success[_ngcontent-ng-c1612505067] {
  background-color: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
  color: #34D399;
}
.alert-icon[_ngcontent-ng-c1612505067] {
  font-size: 1.1rem;
  line-height: 1;
}
.alert-text[_ngcontent-ng-c1612505067] {
  flex: 1;
}
/*# sourceMappingURL=/reset-password.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["submit","click","input","compositionstart","compositionend"],["blur"]);</script>
  <app-root ng-version="21.2.15" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-reset-password _nghost-ng-c1612505067="" ngh="0"><div _ngcontent-ng-c1612505067="" class="login-page-wrapper"><div _ngcontent-ng-c1612505067="" class="fluid-teal-backdrop"><div _ngcontent-ng-c1612505067="" class="glow-orb orb-1"></div><div _ngcontent-ng-c1612505067="" class="glow-orb orb-2"></div><div _ngcontent-ng-c1612505067="" class="glow-orb orb-3"></div></div><div _ngcontent-ng-c1612505067="" class="university-motifs"><svg _ngcontent-ng-c1612505067="" viewBox="0 0 100 100" aria-hidden="true" class="motif-svg motif-cap"><polygon _ngcontent-ng-c1612505067="" points="50,20 90,40 50,60 10,40" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></polygon><polygon _ngcontent-ng-c1612505067="" points="30,50 30,75 50,85 70,75 70,50" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></polygon><path _ngcontent-ng-c1612505067="" d="M70,40 L90,65 L90,80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path><circle _ngcontent-ng-c1612505067="" cx="90" cy="80" r="3" fill="currentColor"></circle></svg><svg _ngcontent-ng-c1612505067="" viewBox="0 0 100 100" aria-hidden="true" class="motif-svg motif-books"><path _ngcontent-ng-c1612505067="" d="M15,75 L80,75 L85,85 L20,85 Z" fill="none" stroke="currentColor" stroke-width="3"></path><path _ngcontent-ng-c1612505067="" d="M15,75 L15,81 L20,85" fill="none" stroke="currentColor" stroke-width="3"></path><path _ngcontent-ng-c1612505067="" d="M20,55 L75,55 L80,68 L25,68 Z" fill="none" stroke="currentColor" stroke-width="3"></path><path _ngcontent-ng-c1612505067="" d="M20,55 L20,62 L25,68" fill="none" stroke="currentColor" stroke-width="3"></path><g _ngcontent-ng-c1612505067="" transform="rotate(-15 45 45)"><rect _ngcontent-ng-c1612505067="" x="30" y="25" width="45" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="3"></rect></g></svg><svg _ngcontent-ng-c1612505067="" viewBox="0 0 100 100" aria-hidden="true" class="motif-svg motif-chat"><path _ngcontent-ng-c1612505067="" d="M20,25 H80 A5,5 0 0,1 85,30 V65 A5,5 0 0,1 80,70 H45 L25,85 V70 H20 A5,5 0 0,1 15,65 V30 A5,5 0 0,1 20,25 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></path><circle _ngcontent-ng-c1612505067="" cx="35" cy="48" r="4" fill="currentColor"></circle><circle _ngcontent-ng-c1612505067="" cx="50" cy="48" r="4" fill="currentColor"></circle><circle _ngcontent-ng-c1612505067="" cx="65" cy="48" r="4" fill="currentColor"></circle></svg><svg _ngcontent-ng-c1612505067="" viewBox="0 0 100 100" aria-hidden="true" class="motif-svg motif-calendar"><rect _ngcontent-ng-c1612505067="" x="20" y="25" width="60" height="55" rx="8" fill="none" stroke="currentColor" stroke-width="3"></rect><line _ngcontent-ng-c1612505067="" x1="20" y1="42" x2="80" y2="42" stroke="currentColor" stroke-width="3"></line><line _ngcontent-ng-c1612505067="" x1="38" y1="18" x2="38" y2="28" stroke="currentColor" stroke-width="3" stroke-linecap="round"></line><line _ngcontent-ng-c1612505067="" x1="62" y1="18" x2="62" y2="28" stroke="currentColor" stroke-width="3" stroke-linecap="round"></line><path _ngcontent-ng-c1612505067="" d="M42,58 L48,64 L62,50" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div _ngcontent-ng-c1612505067="" class="centered-container"><div _ngcontent-ng-c1612505067="" class="login-card reset-card animate-fade-in"><div _ngcontent-ng-c1612505067="" class="card-header-brand"><h2 _ngcontent-ng-c1612505067="" class="project-title">RESET YOUR PASSWORD</h2><p _ngcontent-ng-c1612505067="" class="welcome-message">Set a new password for your account</p></div><form _ngcontent-ng-c1612505067="" novalidate="" class="login-form ng-untouched ng-pristine ng-invalid" jsaction="submit:;"><!--container--><!--container--><div _ngcontent-ng-c1612505067="" class="form-group"><label _ngcontent-ng-c1612505067="" for="newPassword" class="form-label">New Password</label><div _ngcontent-ng-c1612505067="" class="input-wrapper"><input _ngcontent-ng-c1612505067="" type="password" id="newPassword" name="newPassword" placeholder="Enter your new password" required="" minlength="6" class="form-control clean-input ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"></div></div><!--container--><div _ngcontent-ng-c1612505067="" class="form-group"><label _ngcontent-ng-c1612505067="" for="confirmPassword" class="form-label">Confirm New Password</label><div _ngcontent-ng-c1612505067="" class="input-wrapper"><input _ngcontent-ng-c1612505067="" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your new password" required="" class="form-control clean-input ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"></div></div><!--container--><button _ngcontent-ng-c1612505067="" type="submit" class="btn-login" disabled=""><span _ngcontent-ng-c1612505067="">Set Password</span><!--container--><!--container--></button><!--container--><div _ngcontent-ng-c1612505067="" class="register-footer"><a _ngcontent-ng-c1612505067="" routerlink="/login" class="register-link" href="/login" jsaction="click:;">Return to Login</a></div></form></div></div></div></app-reset-password><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"38":"t0","39":"t1","40":"t2","41":"t3","42":"t4"},"c":{"38":[],"39":[],"40":[{"i":"t2","r":1}],"41":[{"i":"t3","r":1}],"42":[{"i":"t4","r":1,"t":{"1":"t5","2":"t6"},"c":{"1":[{"i":"t5","r":1}],"2":[]}}]}},{"c":{"0":[{"i":"c1612505067","r":1}]}}]}</script></body></html>`;