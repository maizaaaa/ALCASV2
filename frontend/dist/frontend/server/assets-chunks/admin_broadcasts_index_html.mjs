export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
.admin-layout[_ngcontent-ng-c3408378010] {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family:
    "Inter",
    "Segoe UI",
    sans-serif;
}
.main-content[_ngcontent-ng-c3408378010] {
  flex: 1;
  overflow-y: auto;
}
.dashboard-wrapper[_ngcontent-ng-c3408378010] {
  padding: 32px;
}
.dashboard-header[_ngcontent-ng-c3408378010] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
}
.page-title[_ngcontent-ng-c3408378010] {
  font-size: 32px;
  font-weight: 800;
  color: #0d2219;
  letter-spacing: -0.8px;
  margin: 0 0 6px 0;
}
.page-subtitle[_ngcontent-ng-c3408378010] {
  color: #64748b;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}
.dashboard-modern-bg[_ngcontent-ng-c3408378010] {
  background-color: #f8fafc;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 32px 32px;
  position: relative;
}
.ambient-glow[_ngcontent-ng-c3408378010] {
  position: absolute;
  top: -100px;
  left: 100px;
  width: 500px;
  height: 500px;
  background:
    radial-gradient(
      circle,
      rgba(20, 184, 166, 0.1) 0%,
      transparent 70%);
  z-index: 0;
}
.glass-card[_ngcontent-ng-c3408378010] {
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}
.broadcast-grid[_ngcontent-ng-c3408378010] {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 1024px) {
  .broadcast-grid[_ngcontent-ng-c3408378010] {
    grid-template-columns: 1fr;
  }
}
.content-card[_ngcontent-ng-c3408378010] {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.card-header[_ngcontent-ng-c3408378010] {
  padding: 20px 24px;
}
.card-header[_ngcontent-ng-c3408378010]   h2[_ngcontent-ng-c3408378010] {
  font-size: 18px;
  color: #1a4331;
  margin: 0;
}
.border-bottom[_ngcontent-ng-c3408378010] {
  border-bottom: 1px solid #f1f5f9;
}
.card-body[_ngcontent-ng-c3408378010] {
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}
.no-padding[_ngcontent-ng-c3408378010] {
  padding: 0;
}
.form-group[_ngcontent-ng-c3408378010] {
  margin-bottom: 20px;
}
label[_ngcontent-ng-c3408378010] {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.helper-text[_ngcontent-ng-c3408378010] {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
  display: block;
}
.text-right[_ngcontent-ng-c3408378010] {
  text-align: right;
}
.mt-4[_ngcontent-ng-c3408378010] {
  margin-top: 32px;
}
.mt-2[_ngcontent-ng-c3408378010] {
  margin-top: 16px;
}
.audience-pills[_ngcontent-ng-c3408378010] {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.pill-btn[_ngcontent-ng-c3408378010] {
  background: #f1f5f9;
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  color: #475569;
  transition: 0.2s;
  cursor: pointer;
}
.pill-btn[_ngcontent-ng-c3408378010]:hover {
  background: #e2e8f0;
}
.pill-btn.active[_ngcontent-ng-c3408378010] {
  background: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}
.checkbox-group[_ngcontent-ng-c3408378010] {
  display: flex;
  gap: 24px;
}
.custom-checkbox[_ngcontent-ng-c3408378010] {
  display: block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  -webkit-user-select: none;
  user-select: none;
  text-transform: none;
  letter-spacing: normal;
}
.custom-checkbox[_ngcontent-ng-c3408378010]   input[_ngcontent-ng-c3408378010] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark[_ngcontent-ng-c3408378010] {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  transition: 0.2s;
}
.custom-checkbox[_ngcontent-ng-c3408378010]:hover   input[_ngcontent-ng-c3408378010]    ~ .checkmark[_ngcontent-ng-c3408378010] {
  background-color: #e2e8f0;
}
.custom-checkbox[_ngcontent-ng-c3408378010]   input[_ngcontent-ng-c3408378010]:checked    ~ .checkmark[_ngcontent-ng-c3408378010] {
  background-color: #14b8a6;
  border-color: #14b8a6;
}
.checkmark[_ngcontent-ng-c3408378010]:after {
  content: "";
  position: absolute;
  display: none;
}
.custom-checkbox[_ngcontent-ng-c3408378010]   input[_ngcontent-ng-c3408378010]:checked    ~ .checkmark[_ngcontent-ng-c3408378010]:after {
  display: block;
}
.custom-checkbox[_ngcontent-ng-c3408378010]   .checkmark[_ngcontent-ng-c3408378010]:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.modern-input[_ngcontent-ng-c3408378010], 
.modern-textarea[_ngcontent-ng-c3408378010] {
  width: 100% !important;
  box-sizing: border-box !important;
  display: block;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 14px;
}
.modern-input[_ngcontent-ng-c3408378010]:focus {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
}
.modern-textarea[_ngcontent-ng-c3408378010] {
  resize: vertical;
  min-height: 120px;
}
.btn-primary[_ngcontent-ng-c3408378010] {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: #1a4331;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}
.btn-primary[_ngcontent-ng-c3408378010]:hover:not(:disabled) {
  background-color: #143426;
}
.btn-primary[_ngcontent-ng-c3408378010]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-full[_ngcontent-ng-c3408378010] {
  width: 100%;
}
.btn-icon[_ngcontent-ng-c3408378010] {
  width: 20px;
  height: 20px;
}
.btn-premium-solid[_ngcontent-ng-c3408378010] {
  background: #0d2219;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}
.history-list[_ngcontent-ng-c3408378010] {
  list-style: none;
  margin: 0;
  padding: 0;
}
.history-item[_ngcontent-ng-c3408378010] {
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
}
.history-item[_ngcontent-ng-c3408378010]:hover {
  background: #f8fafc;
}
.history-item[_ngcontent-ng-c3408378010]:last-child {
  border-bottom: none;
}
.history-header[_ngcontent-ng-c3408378010] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.history-date[_ngcontent-ng-c3408378010] {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}
.status-badge[_ngcontent-ng-c3408378010] {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.status-badge.sent[_ngcontent-ng-c3408378010] {
  background: #dcfce7;
  color: #166534;
}
.history-subject[_ngcontent-ng-c3408378010] {
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}
.history-meta[_ngcontent-ng-c3408378010] {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.meta-tag[_ngcontent-ng-c3408378010] {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}
.meta-tag.audience[_ngcontent-ng-c3408378010] {
  background: #f1f5f9;
  color: #475569;
}
.meta-tag.channels[_ngcontent-ng-c3408378010] {
  background: #f0fdfa;
  color: #0f766e;
  border: 1px solid #ccfbf1;
}
.spinner[_ngcontent-ng-c3408378010] {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: _ngcontent-ng-c3408378010_spin 1s linear infinite;
}
@keyframes _ngcontent-ng-c3408378010_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.h2-text[_ngcontent-ng-c3408378010] {
  font-size: 14px;
  font-weight: 800;
  color: #0d2219;
  margin: 0 0 16px 0;
  text-transform: capitalize;
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}
.dark[_nghost-ng-c3408378010]   .admin-layout[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .admin-layout[_ngcontent-ng-c3408378010] {
  background:
    radial-gradient(
      circle at top right,
      #0a2d36 0%,
      #031317 50%,
      #020a0d 100%);
}
.dark[_nghost-ng-c3408378010]   .main-content[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .main-content[_ngcontent-ng-c3408378010] {
  background-color: transparent;
}
.dark[_nghost-ng-c3408378010]   .ambient-glow[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .ambient-glow[_ngcontent-ng-c3408378010] {
  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(45, 212, 191, 0.12) 0%,
      transparent 40%);
}
.dark[_nghost-ng-c3408378010]   .dashboard-modern-bg[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .dashboard-modern-bg[_ngcontent-ng-c3408378010] {
  background-image: radial-gradient(rgba(45, 212, 191, 0.12) 1.5px, transparent 1.5px);
}
.dark[_nghost-ng-c3408378010]   .page-title[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .page-title[_ngcontent-ng-c3408378010] {
  background:
    linear-gradient(
      135deg,
      #ffffff 40%,
      #a5f3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.dark[_nghost-ng-c3408378010]   .page-subtitle[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .page-subtitle[_ngcontent-ng-c3408378010] {
  color: #94a3b8;
}
.dark[_nghost-ng-c3408378010]   .h2-text[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .h2-text[_ngcontent-ng-c3408378010] {
  background:
    linear-gradient(
      135deg,
      #ffffff 70%,
      #99f6e4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.dark[_nghost-ng-c3408378010]   label[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   label[_ngcontent-ng-c3408378010] {
  color: #94a3b8;
}
.dark[_nghost-ng-c3408378010]   .helper-text[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .helper-text[_ngcontent-ng-c3408378010] {
  color: #64748b;
}
.dark[_nghost-ng-c3408378010]   .glass-card[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .glass-card[_ngcontent-ng-c3408378010] {
  background: rgba(9, 29, 36, 0.65);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(45, 212, 191, 0.15);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.dark[_nghost-ng-c3408378010]   .glass-card[_ngcontent-ng-c3408378010]:hover, .dark   [_nghost-ng-c3408378010]   .glass-card[_ngcontent-ng-c3408378010]:hover {
  border-color: rgba(45, 212, 191, 0.35);
}
.dark[_nghost-ng-c3408378010]   .border-bottom[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .border-bottom[_ngcontent-ng-c3408378010] {
  border-bottom: 1px solid rgba(45, 212, 191, 0.15);
}
.dark[_nghost-ng-c3408378010]   .pill-btn[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .pill-btn[_ngcontent-ng-c3408378010] {
  background: #091d24;
  color: #94a3b8;
  border: 1px solid #1e3e46;
}
.dark[_nghost-ng-c3408378010]   .pill-btn[_ngcontent-ng-c3408378010]:hover, .dark   [_nghost-ng-c3408378010]   .pill-btn[_ngcontent-ng-c3408378010]:hover {
  background: #1e3e46;
  color: #f1f5f9;
}
.dark[_nghost-ng-c3408378010]   .pill-btn.active[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .pill-btn.active[_ngcontent-ng-c3408378010] {
  background: rgba(45, 212, 191, 0.1);
  color: #2dd4bf;
  border-color: rgba(45, 212, 191, 0.3);
}
.dark[_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010] {
  color: #cbd5e1;
}
.dark[_nghost-ng-c3408378010]   .checkmark[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .checkmark[_ngcontent-ng-c3408378010] {
  background-color: #051419;
  border: 1px solid #1e3e46;
}
.dark[_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010]:hover   input[_ngcontent-ng-c3408378010]    ~ .checkmark[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010]:hover   input[_ngcontent-ng-c3408378010]    ~ .checkmark[_ngcontent-ng-c3408378010] {
  background-color: #091d24;
}
.dark[_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010]   input[_ngcontent-ng-c3408378010]:checked    ~ .checkmark[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .custom-checkbox[_ngcontent-ng-c3408378010]   input[_ngcontent-ng-c3408378010]:checked    ~ .checkmark[_ngcontent-ng-c3408378010] {
  background-color: #14b8a6;
  border-color: #14b8a6;
}
.dark[_nghost-ng-c3408378010]   .modern-input[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .modern-input[_ngcontent-ng-c3408378010], 
.dark[_nghost-ng-c3408378010]   .modern-textarea[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .modern-textarea[_ngcontent-ng-c3408378010] {
  background: #091d24;
  border-color: #1e3e46;
  color: #f1f5f9;
}
.dark[_nghost-ng-c3408378010]   .modern-input[_ngcontent-ng-c3408378010]:focus, .dark   [_nghost-ng-c3408378010]   .modern-input[_ngcontent-ng-c3408378010]:focus, 
.dark[_nghost-ng-c3408378010]   .modern-textarea[_ngcontent-ng-c3408378010]:focus, .dark   [_nghost-ng-c3408378010]   .modern-textarea[_ngcontent-ng-c3408378010]:focus {
  border-color: #2dd4bf;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.15);
}
.dark[_nghost-ng-c3408378010]   .btn-premium-solid[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .btn-premium-solid[_ngcontent-ng-c3408378010] {
  background: #2dd4bf;
  color: #020a0d;
}
.dark[_nghost-ng-c3408378010]   .btn-premium-solid[_ngcontent-ng-c3408378010]:hover, .dark   [_nghost-ng-c3408378010]   .btn-premium-solid[_ngcontent-ng-c3408378010]:hover {
  background: #22d3ee;
  box-shadow: 0 8px 20px rgba(34, 211, 238, 0.3);
}
.dark[_nghost-ng-c3408378010]   .history-item[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .history-item[_ngcontent-ng-c3408378010] {
  border-bottom: 1px solid rgba(45, 212, 191, 0.08);
}
.dark[_nghost-ng-c3408378010]   .history-item[_ngcontent-ng-c3408378010]:hover, .dark   [_nghost-ng-c3408378010]   .history-item[_ngcontent-ng-c3408378010]:hover {
  background: rgba(45, 212, 191, 0.04);
}
.dark[_nghost-ng-c3408378010]   .history-subject[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .history-subject[_ngcontent-ng-c3408378010] {
  color: #cbd5e1;
}
.dark[_nghost-ng-c3408378010]   .meta-tag.audience[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .meta-tag.audience[_ngcontent-ng-c3408378010] {
  background: #091d24;
  color: #2dd4bf;
}
.dark[_nghost-ng-c3408378010]   .status-badge.sent[_ngcontent-ng-c3408378010], .dark   [_nghost-ng-c3408378010]   .status-badge.sent[_ngcontent-ng-c3408378010] {
  background: rgba(45, 212, 191, 0.15);
  color: #2dd4bf;
}
@media (max-width: 1024px) {
  .dashboard-wrapper[_ngcontent-ng-c3408378010] {
    padding: 24px 32px;
  }
}
@media (max-width: 768px) {
  .dashboard-wrapper[_ngcontent-ng-c3408378010] {
    padding: 20px 16px;
  }
  .page-title[_ngcontent-ng-c3408378010] {
    font-size: 26px;
  }
  .dashboard-header[_ngcontent-ng-c3408378010] {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;
  }
}
@media (max-width: 480px) {
  .checkbox-group[_ngcontent-ng-c3408378010] {
    flex-direction: column;
    gap: 12px;
  }
}
/*# sourceMappingURL=/broadcast-hub.css.map */</style><style ng-app-id="ng">
.sidebar[_ngcontent-ng-c819290705] {
  width: 260px;
  background-color: #0B191E;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
}
.sidebar-header[_ngcontent-ng-c819290705] {
  padding: 32px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}
.brand-icon[_ngcontent-ng-c819290705] {
  width: 48px;
  height: 48px;
  background:
    linear-gradient(
      135deg,
      #14b8a6,
      #115e59);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  margin: 0 auto 12px auto;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
}
.sidebar-header[_ngcontent-ng-c819290705]   h2[_ngcontent-ng-c819290705] {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.role-badge[_ngcontent-ng-c819290705] {
  display: inline-block;
  margin-top: 8px;
  background-color: rgba(20, 184, 166, 0.2);
  color: #5eead4;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.sidebar-nav[_ngcontent-ng-c819290705] {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.sidebar-nav[_ngcontent-ng-c819290705]::-webkit-scrollbar {
  display: none;
}
.nav-item[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.nav-icon[_ngcontent-ng-c819290705] {
  width: 20px;
  height: 20px;
}
.nav-item[_ngcontent-ng-c819290705]:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
.nav-item.active[_ngcontent-ng-c819290705] {
  background-color: rgba(15, 118, 110, 0.15);
  color: white;
  border-left: 4px solid #0F766E;
}
.notif-sidebar-container[_ngcontent-ng-c819290705] {
  position: relative;
  width: 100%;
}
.notif-nav-btn[_ngcontent-ng-c819290705] {
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  justify-content: space-between;
  text-align: left;
}
.notif-left[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.notif-sidebar-badge[_ngcontent-ng-c819290705] {
  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
}
.notif-sidebar-off[_ngcontent-ng-c819290705] {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}
.notif-flyout-panel[_ngcontent-ng-c819290705] {
  position: fixed;
  left: 270px;
  top: 340px;
  width: 350px;
  background: #ffffff;
  border: 1px solid rgba(15, 118, 110, 0.15);
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 9999;
  animation: _ngcontent-ng-c819290705_slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  color: #1e293b;
}
@keyframes _ngcontent-ng-c819290705_slideInRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.flyout-header[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.flyout-title-box[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.flyout-title[_ngcontent-ng-c819290705] {
  font-weight: 700;
  font-size: 15px;
  color: #0f172a;
}
.unread-pill[_ngcontent-ng-c819290705] {
  font-size: 11px;
  font-weight: 700;
  background: #ccfbf1;
  color: #0f766e;
  padding: 2px 8px;
  border-radius: 12px;
}
.notif-switch-box[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.switch-label[_ngcontent-ng-c819290705] {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.toggle-pill[_ngcontent-ng-c819290705] {
  width: 36px;
  height: 20px;
  background-color: #cbd5e1;
  border-radius: 999px;
  padding: 2px;
  transition: background-color 0.25s ease;
  display: flex;
  align-items: center;
}
.toggle-pill.on[_ngcontent-ng-c819290705] {
  background-color: #0f766e;
}
.toggle-thumb[_ngcontent-ng-c819290705] {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease;
}
.toggle-pill.on[_ngcontent-ng-c819290705]   .toggle-thumb[_ngcontent-ng-c819290705] {
  transform: translateX(16px);
}
.flyout-actions-bar[_ngcontent-ng-c819290705] {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
}
.flyout-action-btn[_ngcontent-ng-c819290705] {
  background: none;
  border: none;
  color: #0f766e;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.flyout-action-btn[_ngcontent-ng-c819290705]:hover:not(:disabled) {
  color: #115e59;
  text-decoration: underline;
}
.flyout-action-btn[_ngcontent-ng-c819290705]:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}
.flyout-body[_ngcontent-ng-c819290705] {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}
.flyout-notif-card[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #ffffff;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-left: 3px solid transparent;
}
.flyout-notif-card[_ngcontent-ng-c819290705]:hover {
  background: #f8fafc;
}
.flyout-notif-card.unread[_ngcontent-ng-c819290705] {
  background: #f0fdf4;
  border-left-color: #0f766e;
}
.card-type-icon[_ngcontent-ng-c819290705] {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.card-type-icon.user[_ngcontent-ng-c819290705] {
  background: #ccfbf1;
  color: #0f766e;
}
.card-type-icon.system[_ngcontent-ng-c819290705] {
  background: #e0f2fe;
  color: #0284c7;
}
.card-type-icon.security[_ngcontent-ng-c819290705] {
  background: #fee2e2;
  color: #dc2626;
}
.type-svg[_ngcontent-ng-c819290705] {
  width: 18px;
  height: 18px;
}
.card-details[_ngcontent-ng-c819290705] {
  flex: 1;
  min-width: 0;
}
.card-header-row[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 2px;
}
.card-title[_ngcontent-ng-c819290705] {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-time[_ngcontent-ng-c819290705] {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
}
.card-message[_ngcontent-ng-c819290705] {
  font-size: 12px;
  color: #475569;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-dismiss-btn[_ngcontent-ng-c819290705] {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}
.card-dismiss-btn[_ngcontent-ng-c819290705]:hover {
  color: #ef4444;
}
.flyout-empty-state[_ngcontent-ng-c819290705] {
  text-align: center;
  padding: 24px 16px;
}
.empty-icon-wrap[_ngcontent-ng-c819290705] {
  width: 44px;
  height: 44px;
  background: #f1f5f9;
  color: #94a3b8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}
.empty-icon[_ngcontent-ng-c819290705] {
  width: 22px;
  height: 22px;
}
.empty-title[_ngcontent-ng-c819290705] {
  font-weight: 700;
  font-size: 14px;
  color: #334155;
  margin: 0 0 4px;
}
.empty-desc[_ngcontent-ng-c819290705] {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 12px;
}
.enable-notif-btn[_ngcontent-ng-c819290705] {
  background: #0f766e;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.enable-notif-btn[_ngcontent-ng-c819290705]:hover {
  background: #115e59;
}
.sidebar-footer[_ngcontent-ng-c819290705] {
  padding: 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background-color: #0B191E;
  margin-top: auto;
  z-index: 50;
}
.theme-toggle-nav-btn[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background-color: transparent;
  color: #9ca3af;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}
.theme-toggle-nav-btn[_ngcontent-ng-c819290705]:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
.logout-btn[_ngcontent-ng-c819290705] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.logout-btn[_ngcontent-ng-c819290705]:hover {
  background-color: rgba(239, 68, 68, 0.1);
}
.dark[_nghost-ng-c819290705]   .sidebar[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .sidebar[_ngcontent-ng-c819290705] {
  background-color: #0B191E;
}
.dark[_nghost-ng-c819290705]   .sidebar-footer[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .sidebar-footer[_ngcontent-ng-c819290705] {
  background-color: #0B191E;
}
.dark[_nghost-ng-c819290705]   .nav-item.active[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .nav-item.active[_ngcontent-ng-c819290705] {
  background-color: rgba(45, 212, 191, 0.1);
  color: #2dd4bf;
  border-left: 4px solid #2dd4bf;
  box-shadow: inset 4px 0 12px rgba(45, 212, 191, 0.05);
}
.dark[_nghost-ng-c819290705]   .nav-item[_ngcontent-ng-c819290705]:hover, .dark   [_nghost-ng-c819290705]   .nav-item[_ngcontent-ng-c819290705]:hover {
  color: #2dd4bf;
}
.dark[_nghost-ng-c819290705]   .notif-flyout-panel[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .notif-flyout-panel[_ngcontent-ng-c819290705] {
  background: #132329;
  border-color: rgba(45, 212, 191, 0.2);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  color: #f8fafc;
}
.dark[_nghost-ng-c819290705]   .flyout-header[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-header[_ngcontent-ng-c819290705] {
  background: #0f1c21;
  border-bottom-color: rgba(45, 212, 191, 0.15);
}
.dark[_nghost-ng-c819290705]   .flyout-title[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-title[_ngcontent-ng-c819290705] {
  color: #f1f5f9;
}
.dark[_nghost-ng-c819290705]   .unread-pill[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .unread-pill[_ngcontent-ng-c819290705] {
  background: rgba(45, 212, 191, 0.2);
  color: #2dd4bf;
}
.dark[_nghost-ng-c819290705]   .switch-label[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .switch-label[_ngcontent-ng-c819290705] {
  color: #94a3b8;
}
.dark[_nghost-ng-c819290705]   .toggle-pill[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .toggle-pill[_ngcontent-ng-c819290705] {
  background-color: #334155;
}
.dark[_nghost-ng-c819290705]   .toggle-pill.on[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .toggle-pill.on[_ngcontent-ng-c819290705] {
  background-color: #2dd4bf;
}
.dark[_nghost-ng-c819290705]   .toggle-pill.on[_ngcontent-ng-c819290705]   .toggle-thumb[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .toggle-pill.on[_ngcontent-ng-c819290705]   .toggle-thumb[_ngcontent-ng-c819290705] {
  background-color: #0f1c21;
}
.dark[_nghost-ng-c819290705]   .flyout-actions-bar[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-actions-bar[_ngcontent-ng-c819290705] {
  background: #132329;
  border-bottom-color: rgba(45, 212, 191, 0.1);
}
.dark[_nghost-ng-c819290705]   .flyout-action-btn[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-action-btn[_ngcontent-ng-c819290705] {
  color: #2dd4bf;
}
.dark[_nghost-ng-c819290705]   .flyout-notif-card[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-notif-card[_ngcontent-ng-c819290705] {
  background: #192c33;
}
.dark[_nghost-ng-c819290705]   .flyout-notif-card[_ngcontent-ng-c819290705]:hover, .dark   [_nghost-ng-c819290705]   .flyout-notif-card[_ngcontent-ng-c819290705]:hover {
  background: #1f353e;
}
.dark[_nghost-ng-c819290705]   .flyout-notif-card.unread[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .flyout-notif-card.unread[_ngcontent-ng-c819290705] {
  background: #143236;
  border-left-color: #2dd4bf;
}
.dark[_nghost-ng-c819290705]   .card-title[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .card-title[_ngcontent-ng-c819290705] {
  color: #f8fafc;
}
.dark[_nghost-ng-c819290705]   .card-message[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .card-message[_ngcontent-ng-c819290705] {
  color: #cbd5e1;
}
.dark[_nghost-ng-c819290705]   .empty-icon-wrap[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .empty-icon-wrap[_ngcontent-ng-c819290705] {
  background: #192c33;
  color: #64748b;
}
.dark[_nghost-ng-c819290705]   .empty-title[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .empty-title[_ngcontent-ng-c819290705] {
  color: #f1f5f9;
}
.dark[_nghost-ng-c819290705]   .empty-desc[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .empty-desc[_ngcontent-ng-c819290705] {
  color: #94a3b8;
}
.dark[_nghost-ng-c819290705]   .enable-notif-btn[_ngcontent-ng-c819290705], .dark   [_nghost-ng-c819290705]   .enable-notif-btn[_ngcontent-ng-c819290705] {
  background: #2dd4bf;
  color: #0B191E;
}
.dark[_nghost-ng-c819290705]   .enable-notif-btn[_ngcontent-ng-c819290705]:hover, .dark   [_nghost-ng-c819290705]   .enable-notif-btn[_ngcontent-ng-c819290705]:hover {
  background: #14b8a6;
}
@media (max-width: 1024px) {
  .sidebar[_ngcontent-ng-c819290705] {
    width: 72px;
  }
  .sidebar-header[_ngcontent-ng-c819290705] {
    padding: 20px 0;
  }
  .sidebar-header[_ngcontent-ng-c819290705]   h2[_ngcontent-ng-c819290705], 
   .role-badge[_ngcontent-ng-c819290705] {
    display: none !important;
  }
  .nav-item[_ngcontent-ng-c819290705] {
    font-size: 0 !important;
    justify-content: center;
    padding: 12px 0;
    gap: 0;
  }
  .notif-sidebar-badge[_ngcontent-ng-c819290705], 
   .notif-sidebar-off[_ngcontent-ng-c819290705] {
    position: absolute;
    top: 4px;
    right: 8px;
  }
  .notif-flyout-panel[_ngcontent-ng-c819290705] {
    left: 80px;
    top: 240px;
    width: 300px;
  }
  .sidebar-footer[_ngcontent-ng-c819290705] {
    padding: 16px 8px;
  }
  .logout-btn[_ngcontent-ng-c819290705] {
    font-size: 0 !important;
    padding: 12px;
    justify-content: center;
  }
  .theme-toggle-nav-btn[_ngcontent-ng-c819290705] {
    justify-content: center;
    padding: 12px 0;
    gap: 0;
  }
  .theme-toggle-nav-btn[_ngcontent-ng-c819290705]   span[_ngcontent-ng-c819290705] {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .sidebar[_ngcontent-ng-c819290705] {
    width: 60px;
  }
  .sidebar-footer[_ngcontent-ng-c819290705] {
    width: 60px;
  }
  .notif-flyout-panel[_ngcontent-ng-c819290705] {
    left: 68px;
    top: 240px;
    width: 280px;
  }
}
/*# sourceMappingURL=/sidebar.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","change","input","compositionstart","compositionend"],["blur"]);</script>
  <app-root ng-version="21.2.15" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-broadcast-hub _nghost-ng-c3408378010="" ngh="1"><div _ngcontent-ng-c3408378010="" class="admin-layout"><app-sidebar _ngcontent-ng-c3408378010="" _nghost-ng-c819290705="" ngh="0"><aside _ngcontent-ng-c819290705="" class="sidebar"><div _ngcontent-ng-c819290705="" class="sidebar-header"><div _ngcontent-ng-c819290705="" class="brand-icon">AS</div><h2 _ngcontent-ng-c819290705="">ALCAS</h2><span _ngcontent-ng-c819290705="" class="role-badge">Admin</span></div><nav _ngcontent-ng-c819290705="" class="sidebar-nav"><a _ngcontent-ng-c819290705="" routerlink="/admin" routerlinkactive="active" class="nav-item" href="/admin" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span _ngcontent-ng-c819290705="">Overview</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/users" routerlinkactive="active" class="nav-item" href="/admin/users" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span _ngcontent-ng-c819290705="">User Management</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/logs" routerlinkactive="active" class="nav-item" href="/admin/logs" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span _ngcontent-ng-c819290705="">Consultation Logs</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/attendance" routerlinkactive="active" class="nav-item" href="/admin/attendance" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg><span _ngcontent-ng-c819290705="">Attendance Tracking</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/analytics" routerlinkactive="active" class="nav-item" href="/admin/analytics" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span _ngcontent-ng-c819290705="">Analytics &amp; Reports</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/broadcasts" routerlinkactive="active" class="nav-item active" href="/admin/broadcasts" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg><span _ngcontent-ng-c819290705="">Announcements</span></a><a _ngcontent-ng-c819290705="" routerlink="/admin/settings" routerlinkactive="active" class="nav-item" href="/admin/settings" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span _ngcontent-ng-c819290705="">System Settings</span></a><div _ngcontent-ng-c819290705="" class="notif-sidebar-container"><button _ngcontent-ng-c819290705="" title="Toggle Notifications Panel" class="nav-item notif-nav-btn" jsaction="click:;"><div _ngcontent-ng-c819290705="" class="notif-left"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span _ngcontent-ng-c819290705="">Notifications</span></div><span _ngcontent-ng-c819290705="" class="notif-sidebar-badge">2</span><!--container--><!--container--></button><!--container--></div><button _ngcontent-ng-c819290705="" title="Toggle Dark/Light Mode" class="theme-toggle-nav-btn" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg><span _ngcontent-ng-c819290705="">Dark Mode</span><!--ng-container--><!--container--><!--container--></button></nav><div _ngcontent-ng-c819290705="" class="sidebar-footer"><button _ngcontent-ng-c819290705="" class="logout-btn" jsaction="click:;"><svg _ngcontent-ng-c819290705="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c819290705="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c819290705="">Sign Out</span></button></div></aside></app-sidebar><main _ngcontent-ng-c3408378010="" class="main-content dashboard-modern-bg"><div _ngcontent-ng-c3408378010="" class="ambient-glow"></div><div _ngcontent-ng-c3408378010="" class="dashboard-wrapper relative z-10"><div _ngcontent-ng-c3408378010="" class="dashboard-header glass-header"><div _ngcontent-ng-c3408378010=""><h1 _ngcontent-ng-c3408378010="" class="page-title">Broadcast Hub</h1><p _ngcontent-ng-c3408378010="" class="page-subtitle">Send urgent announcements and track delivery history.</p></div></div><div _ngcontent-ng-c3408378010="" class="broadcast-grid"><div _ngcontent-ng-c3408378010="" class="content-card glass-card"><div _ngcontent-ng-c3408378010="" class="card-header border-bottom"><h2 _ngcontent-ng-c3408378010="" class="h2-text">New Announcement</h2></div><div _ngcontent-ng-c3408378010="" class="card-body"><div _ngcontent-ng-c3408378010="" class="form-group"><label _ngcontent-ng-c3408378010="">Target Audience</label><div _ngcontent-ng-c3408378010="" class="audience-pills"><button _ngcontent-ng-c3408378010="" class="pill-btn active" jsaction="click:;">Everyone</button><button _ngcontent-ng-c3408378010="" class="pill-btn" jsaction="click:;">Students Only</button><button _ngcontent-ng-c3408378010="" class="pill-btn" jsaction="click:;">Lecturers Only</button></div></div><div _ngcontent-ng-c3408378010="" class="form-group"><label _ngcontent-ng-c3408378010="">Delivery Method</label><div _ngcontent-ng-c3408378010="" class="checkbox-group"><label _ngcontent-ng-c3408378010="" class="custom-checkbox"><input _ngcontent-ng-c3408378010="" type="checkbox" class="ng-untouched ng-pristine ng-valid" checked="" jsaction="change:;blur:;"><span _ngcontent-ng-c3408378010="" class="checkmark"></span> In-App </label><label _ngcontent-ng-c3408378010="" class="custom-checkbox"><input _ngcontent-ng-c3408378010="" type="checkbox" class="ng-untouched ng-pristine ng-valid" jsaction="change:;blur:;"><span _ngcontent-ng-c3408378010="" class="checkmark"></span> Email Blast </label></div></div><div _ngcontent-ng-c3408378010="" class="form-group mt-4"><label _ngcontent-ng-c3408378010="">Subject</label><input _ngcontent-ng-c3408378010="" type="text" placeholder="e.g., System Maintenance" class="modern-input ng-untouched ng-pristine ng-valid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"></div><div _ngcontent-ng-c3408378010="" class="form-group"><label _ngcontent-ng-c3408378010="">Message Body</label><textarea _ngcontent-ng-c3408378010="" rows="6" placeholder="Type your message here..." class="modern-textarea ng-untouched ng-pristine ng-valid" jsaction="input:;blur:;compositionstart:;compositionend:;"></textarea><small _ngcontent-ng-c3408378010="" class="helper-text text-right">0 / 500 chars</small></div><button _ngcontent-ng-c3408378010="" class="btn-premium-solid btn-full" jsaction="click:;"> Send Broadcast Now </button></div></div><div _ngcontent-ng-c3408378010="" class="content-card glass-card no-padding"><div _ngcontent-ng-c3408378010="" class="card-header border-bottom"><h2 _ngcontent-ng-c3408378010="" class="h2-text">Recent Broadcasts</h2></div><ul _ngcontent-ng-c3408378010="" class="history-list"><li _ngcontent-ng-c3408378010="" class="history-item"><div _ngcontent-ng-c3408378010="" class="history-header"><span _ngcontent-ng-c3408378010="" class="history-date">2024-03-15 08:00 AM</span><span _ngcontent-ng-c3408378010="" class="status-badge sent">✓ Sent</span></div><h3 _ngcontent-ng-c3408378010="" class="history-subject">System Maintenance Tonight</h3><div _ngcontent-ng-c3408378010="" class="history-meta"><span _ngcontent-ng-c3408378010="" class="meta-tag audience">ALL</span></div></li><li _ngcontent-ng-c3408378010="" class="history-item"><div _ngcontent-ng-c3408378010="" class="history-header"><span _ngcontent-ng-c3408378010="" class="history-date">2024-03-10 02:30 PM</span><span _ngcontent-ng-c3408378010="" class="status-badge sent">✓ Sent</span></div><h3 _ngcontent-ng-c3408378010="" class="history-subject">Reminder: Update Consultation Hours</h3><div _ngcontent-ng-c3408378010="" class="history-meta"><span _ngcontent-ng-c3408378010="" class="meta-tag audience">LECTURERS</span></div></li><li _ngcontent-ng-c3408378010="" class="history-item"><div _ngcontent-ng-c3408378010="" class="history-header"><span _ngcontent-ng-c3408378010="" class="history-date">2024-03-01 09:00 AM</span><span _ngcontent-ng-c3408378010="" class="status-badge sent">✓ Sent</span></div><h3 _ngcontent-ng-c3408378010="" class="history-subject">Welcome to Semester A232</h3><div _ngcontent-ng-c3408378010="" class="history-meta"><span _ngcontent-ng-c3408378010="" class="meta-tag audience">STUDENTS</span></div></li><!--container--></ul></div></div></div></main></div></app-broadcast-hub><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"52":"t0","53":"t1","54":"t2","56":"t3","57":"t4"},"c":{"52":[{"i":"t0","r":1}],"53":[],"54":[],"56":[{"i":"t3","r":3,"e":{"0":2}}],"57":[]}},{"t":{"56":"t37"},"c":{"56":[{"i":"t37","r":1,"x":3}]}},{"c":{"0":[{"i":"c3408378010","r":1}]}}]}</script></body></html>`;