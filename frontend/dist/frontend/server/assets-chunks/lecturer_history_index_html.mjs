export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
.lecturer-layout[_ngcontent-ng-c1416008732] {
  display: flex;
  min-height: 100vh;
  font-family: "Plus Jakarta Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
  max-width: 100vw;
}
.main-content[_ngcontent-ng-c1416008732] {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  position: relative;
}
.dashboard-wrapper[_ngcontent-ng-c1416008732] {
  padding: 32px 40px;
  min-height: 100vh;
  font-family: "Plus Jakarta Sans", sans-serif;
  color: #1f2937;
  position: relative;
  z-index: 1;
  max-width: 1600px;
  margin: 0 auto;
}
.flex-between[_ngcontent-ng-c1416008732] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}
.page-title[_ngcontent-ng-c1416008732] {
  font-size: 32px;
  font-weight: 800;
  background:
    linear-gradient(
      135deg,
      #0B191E 0%,
      #0F766E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  letter-spacing: -0.8px;
  margin: 0 0 6px 0;
}
.page-subtitle[_ngcontent-ng-c1416008732] {
  color: #475569;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}
.btn-outline-blue[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #0F766E 0%,
      #115e59 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.25);
}
.btn-outline-blue[_ngcontent-ng-c1416008732]:hover {
  background:
    linear-gradient(
      135deg,
      #115e59 0%,
      #042f2e 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.35);
}
.btn-icon[_ngcontent-ng-c1416008732] {
  width: 18px;
  height: 18px;
}
.filter-card[_ngcontent-ng-c1416008732] {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  padding: 20px 24px;
  border-radius: 16px;
  margin-bottom: 28px;
  border: 1px solid rgba(204, 251, 241, 0.8);
  box-shadow: 0 10px 30px -10px rgba(15, 118, 110, 0.08);
  flex-wrap: wrap;
}
.filter-group[_ngcontent-ng-c1416008732] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 180px;
}
.filter-group.flex-2[_ngcontent-ng-c1416008732] {
  flex: 2;
  min-width: 280px;
}
.filter-group[_ngcontent-ng-c1416008732]   label[_ngcontent-ng-c1416008732] {
  font-size: 12px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.input-with-icon[_ngcontent-ng-c1416008732] {
  position: relative;
}
.input-icon[_ngcontent-ng-c1416008732] {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #0F766E;
}
.input-with-icon[_ngcontent-ng-c1416008732]   input[_ngcontent-ng-c1416008732], 
.modern-input[_ngcontent-ng-c1416008732], 
.modern-select[_ngcontent-ng-c1416008732] {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.25s ease;
  background: white;
  font-family: inherit;
  color: #0B191E;
  font-weight: 600;
}
.input-with-icon[_ngcontent-ng-c1416008732]   input[_ngcontent-ng-c1416008732] {
  padding-left: 38px;
}
.input-with-icon[_ngcontent-ng-c1416008732]   input[_ngcontent-ng-c1416008732]:focus, 
.modern-input[_ngcontent-ng-c1416008732]:focus, 
.modern-select[_ngcontent-ng-c1416008732]:focus {
  border-color: #0F766E;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
}
.filter-actions[_ngcontent-ng-c1416008732] {
  display: flex;
  align-items: center;
  padding-bottom: 2px;
}
.btn-text[_ngcontent-ng-c1416008732] {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-text[_ngcontent-ng-c1416008732]:hover {
  background: rgba(15, 118, 110, 0.1);
  color: #0F766E;
  border-color: #0F766E;
}
.content-card[_ngcontent-ng-c1416008732] {
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(204, 251, 241, 0.8);
  box-shadow: 0 10px 30px -10px rgba(15, 118, 110, 0.08);
}
.table-container[_ngcontent-ng-c1416008732] {
  width: 100%;
  overflow-x: auto;
}
.sophisticated-table[_ngcontent-ng-c1416008732] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}
.sophisticated-table[_ngcontent-ng-c1416008732]   th[_ngcontent-ng-c1416008732] {
  padding: 12px 18px;
  font-size: 12px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-align: left;
  border: none;
}
.sophisticated-table[_ngcontent-ng-c1416008732]   th.text-right[_ngcontent-ng-c1416008732] {
  text-align: right;
}
.sophisticated-table[_ngcontent-ng-c1416008732]   tbody[_ngcontent-ng-c1416008732]   tr[_ngcontent-ng-c1416008732] {
  background: #ffffff;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(15, 118, 110, 0.04);
}
.sophisticated-table[_ngcontent-ng-c1416008732]   tbody[_ngcontent-ng-c1416008732]   tr[_ngcontent-ng-c1416008732]:hover {
  background: #f0fdfa;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.12);
}
.sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732] {
  padding: 16px 18px;
  vertical-align: middle;
  border-top: 1px solid rgba(204, 251, 241, 0.8);
  border-bottom: 1px solid rgba(204, 251, 241, 0.8);
}
.sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732]:first-child {
  border-left: 1px solid rgba(204, 251, 241, 0.8);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732]:last-child {
  border-right: 1px solid rgba(204, 251, 241, 0.8);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.date-text[_ngcontent-ng-c1416008732] {
  font-size: 14px;
  font-weight: 800;
  color: #0B191E;
}
.time-text[_ngcontent-ng-c1416008732] {
  font-size: 12px;
  color: #0F766E;
  font-weight: 700;
}
.student-name[_ngcontent-ng-c1416008732] {
  font-size: 15px;
  font-weight: 800;
  color: #0F766E;
  margin-bottom: 2px;
}
.matric-text[_ngcontent-ng-c1416008732] {
  font-size: 12px;
  color: #475569;
  font-weight: 600;
}
.reason-truncate[_ngcontent-ng-c1416008732] {
  font-size: 13px;
  color: #1e293b;
  font-style: italic;
  font-weight: 500;
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.status-badge[_ngcontent-ng-c1416008732] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  transition: all 0.25s ease;
}
.badge-dot[_ngcontent-ng-c1416008732] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
.status-badge.completed[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #dcfce7,
      #ccfbf1);
  color: #065f46;
  border: 1.5px solid #6ee7b7;
  box-shadow: 0 2px 8px rgba(6, 95, 70, 0.12);
}
.status-badge.completed[_ngcontent-ng-c1416008732]   .badge-dot[_ngcontent-ng-c1416008732] {
  background-color: #059669;
}
.status-badge.no-show[_ngcontent-ng-c1416008732], 
.status-badge.no_show[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #fef3c7,
      #fde68a);
  color: #92400e;
  border: 1.5px solid #fcd34d;
  box-shadow: 0 2px 8px rgba(146, 64, 14, 0.12);
}
.status-badge.no-show[_ngcontent-ng-c1416008732]   .badge-dot[_ngcontent-ng-c1416008732], 
.status-badge.no_show[_ngcontent-ng-c1416008732]   .badge-dot[_ngcontent-ng-c1416008732] {
  background-color: #d97706;
}
.status-badge.rejected[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #ffe4e6,
      #fecdd3);
  color: #9f1239;
  border: 1.5px solid #fda4af;
  box-shadow: 0 2px 8px rgba(159, 18, 57, 0.12);
}
.status-badge.rejected[_ngcontent-ng-c1416008732]   .badge-dot[_ngcontent-ng-c1416008732] {
  background-color: #e11d48;
}
.status-badge.cancelled[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #f1f5f9,
      #cbd5e1);
  color: #334155;
  border: 1.5px solid #94a3b8;
  box-shadow: 0 2px 8px rgba(51, 65, 85, 0.12);
}
.status-badge.cancelled[_ngcontent-ng-c1416008732]   .badge-dot[_ngcontent-ng-c1416008732] {
  background-color: #64748b;
}
.actions-cell[_ngcontent-ng-c1416008732] {
  text-align: right;
}
.action-btn.view-btn[_ngcontent-ng-c1416008732] {
  background: #0F766E;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  box-shadow: 0 4px 10px rgba(15, 118, 110, 0.2);
}
.action-btn.view-btn[_ngcontent-ng-c1416008732]:hover {
  background: #115e59;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(15, 118, 110, 0.3);
}
.empty-state[_ngcontent-ng-c1416008732] {
  text-align: center;
  padding: 56px 24px !important;
}
.empty-state-content[_ngcontent-ng-c1416008732] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 440px;
  margin: 0 auto;
}
.empty-icon-ring[_ngcontent-ng-c1416008732] {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background:
    linear-gradient(
      135deg,
      rgba(15, 118, 110, 0.1) 0%,
      rgba(20, 184, 166, 0.2) 100%);
  border: 1.5px solid rgba(15, 118, 110, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px auto;
  box-shadow: 0 12px 24px -6px rgba(15, 118, 110, 0.15), 0 0 20px rgba(15, 118, 110, 0.08);
}
.empty-icon-ring[_ngcontent-ng-c1416008732]   svg[_ngcontent-ng-c1416008732], 
.empty-icon[_ngcontent-ng-c1416008732] {
  width: 40px;
  height: 40px;
  color: #0F766E;
  margin: 0 !important;
  filter: drop-shadow(0 2px 4px rgba(15, 118, 110, 0.2));
}
.empty-title[_ngcontent-ng-c1416008732] {
  font-size: 19px;
  color: #0B191E;
  font-weight: 800;
  margin: 0 0 6px 0;
  letter-spacing: -0.3px;
}
.empty-subtitle[_ngcontent-ng-c1416008732] {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
}
html.dark[_ngcontent-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732], 
html.dark[_nghost-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732], html.dark   [_nghost-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732], 
body.dark[_ngcontent-ng-c1416008732]   .empty-state[_ngcontent-ng-c1416008732] {
  background: rgba(5, 20, 25, 0.75) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .empty-state-content[_ngcontent-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], 
html.dark[_nghost-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], html.dark   [_nghost-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732], 
body.dark[_ngcontent-ng-c1416008732]   .empty-title[_ngcontent-ng-c1416008732] {
  color: #ffffff !important;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732], 
html.dark[_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732], html.dark   [_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732], 
body.dark[_ngcontent-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      rgba(45, 212, 191, 0.2) 0%,
      rgba(20, 184, 166, 0.3) 100%) !important;
  border-color: rgba(45, 212, 191, 0.45) !important;
  box-shadow: 0 12px 24px -6px rgba(45, 212, 191, 0.3) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732]   svg[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732]   svg[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-icon-ring[_ngcontent-ng-c1416008732]   svg[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732], 
html.dark[_nghost-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732], html.dark   [_nghost-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732], 
body.dark[_ngcontent-ng-c1416008732]   .empty-icon[_ngcontent-ng-c1416008732] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732], 
.dark[_nghost-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732], .dark   [_nghost-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732], 
html.dark[_nghost-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732], html.dark   [_nghost-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732], 
body.dark[_ngcontent-ng-c1416008732]   .empty-subtitle[_ngcontent-ng-c1416008732] {
  color: #5eead4 !important;
  font-weight: 600 !important;
}
.modal-backdrop[_ngcontent-ng-c1416008732] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(2, 10, 13, 0.7);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-container[_ngcontent-ng-c1416008732] {
  background: white;
  width: 100%;
  max-width: 540px;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.fade-in-up[_ngcontent-ng-c1416008732] {
  animation: _ngcontent-ng-c1416008732_fadeInUp 0.3s ease-out forwards;
}
@keyframes _ngcontent-ng-c1416008732_fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.modal-header[_ngcontent-ng-c1416008732] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}
.modal-header[_ngcontent-ng-c1416008732]   h2[_ngcontent-ng-c1416008732] {
  margin: 0 0 2px 0;
  font-size: 18px;
  font-weight: 800;
  color: #0B191E;
}
.modal-subtitle[_ngcontent-ng-c1416008732] {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}
.close-btn[_ngcontent-ng-c1416008732] {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn[_ngcontent-ng-c1416008732]:hover {
  background: #fef2f2;
  color: #ef4444;
}
.modal-body[_ngcontent-ng-c1416008732] {
  padding: 24px;
}
.status-banner[_ngcontent-ng-c1416008732] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 20px;
  border: 1.5px solid transparent;
}
.banner-status-icon[_ngcontent-ng-c1416008732] {
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-banner.completed-bg[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #dcfce7,
      #ccfbf1);
  color: #047857;
  border-color: #6ee7b7;
}
.status-banner.no-show-bg[_ngcontent-ng-c1416008732], 
.status-banner.no_show-bg[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #fef3c7,
      #fde68a);
  color: #92400e;
  border-color: #fcd34d;
}
.status-banner.rejected-bg[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #ffe4e6,
      #fecdd3);
  color: #9f1239;
  border-color: #fda4af;
}
.status-banner.cancelled-bg[_ngcontent-ng-c1416008732], 
.status-banner.cancelled[_ngcontent-ng-c1416008732] {
  background:
    linear-gradient(
      135deg,
      #f1f5f9,
      #e2e8f0);
  color: #334155;
  border-color: #cbd5e1;
}
.detail-grid[_ngcontent-ng-c1416008732] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.detail-group[_ngcontent-ng-c1416008732]   label[_ngcontent-ng-c1416008732] {
  font-size: 11px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}
.detail-group[_ngcontent-ng-c1416008732]   p[_ngcontent-ng-c1416008732] {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0B191E;
}
.detail-group.full-width[_ngcontent-ng-c1416008732] {
  grid-column: 1 / -1;
  margin-top: 12px;
}
.divider[_ngcontent-ng-c1416008732] {
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
}
.text-box[_ngcontent-ng-c1416008732] {
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
}
.text-box.outline[_ngcontent-ng-c1416008732] {
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  font-style: italic;
}
.text-box.filled[_ngcontent-ng-c1416008732] {
  background: rgba(15, 118, 110, 0.08);
  border: 1px solid rgba(15, 118, 110, 0.2);
  color: #0F766E;
  font-weight: 600;
}
.modal-footer[_ngcontent-ng-c1416008732] {
  padding: 16px 24px;
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
}
.btn-solid-blue[_ngcontent-ng-c1416008732] {
  background-color: #0F766E;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-solid-blue[_ngcontent-ng-c1416008732]:hover {
  background-color: #115e59;
}
html.dark[_ngcontent-ng-c1416008732]   .filter-card[_ngcontent-ng-c1416008732] {
  background: rgba(5, 20, 25, 0.5) !important;
  border: 1px solid rgba(45, 212, 191, 0.12) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  backdrop-filter: blur(12px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .filter-group[_ngcontent-ng-c1416008732]   label[_ngcontent-ng-c1416008732] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .input-with-icon[_ngcontent-ng-c1416008732]   input[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .modern-input[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .modern-select[_ngcontent-ng-c1416008732] {
  background-color: #051419 !important;
  border: 1px solid rgba(45, 212, 191, 0.25) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .input-with-icon[_ngcontent-ng-c1416008732]   input[_ngcontent-ng-c1416008732]::placeholder {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .input-icon[_ngcontent-ng-c1416008732] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-text[_ngcontent-ng-c1416008732] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-text[_ngcontent-ng-c1416008732]:hover {
  color: #5eead4 !important;
  background: rgba(45, 212, 191, 0.1) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-outline-blue[_ngcontent-ng-c1416008732] {
  border-color: rgba(45, 212, 191, 0.4) !important;
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-outline-blue[_ngcontent-ng-c1416008732]:hover {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .content-card[_ngcontent-ng-c1416008732] {
  background: rgba(5, 20, 25, 0.65) !important;
  border: 1px solid rgba(45, 212, 191, 0.15) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  backdrop-filter: blur(12px) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   th[_ngcontent-ng-c1416008732] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   tbody[_ngcontent-ng-c1416008732]   tr[_ngcontent-ng-c1416008732] {
  background: rgba(9, 29, 36, 0.75) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   tbody[_ngcontent-ng-c1416008732]   tr[_ngcontent-ng-c1416008732]:hover {
  background: rgba(9, 29, 36, 0.95) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732] {
  border-top-color: rgba(45, 212, 191, 0.12) !important;
  border-bottom-color: rgba(45, 212, 191, 0.12) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732]:first-child {
  border-left-color: rgba(45, 212, 191, 0.12) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .sophisticated-table[_ngcontent-ng-c1416008732]   td[_ngcontent-ng-c1416008732]:last-child {
  border-right-color: rgba(45, 212, 191, 0.12) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .date-text[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .student-name[_ngcontent-ng-c1416008732] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .time-text[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .matric-text[_ngcontent-ng-c1416008732] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .reason-truncate[_ngcontent-ng-c1416008732] {
  color: #f1f5f9 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .action-btn.view-btn[_ngcontent-ng-c1416008732] {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #2dd4bf !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .action-btn.view-btn[_ngcontent-ng-c1416008732]:hover {
  background: #0F766E !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .status-badge.completed[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.completed-bg[_ngcontent-ng-c1416008732] {
  background: rgba(16, 185, 129, 0.18) !important;
  color: #34d399 !important;
  border: 1.5px solid rgba(52, 211, 153, 0.4) !important;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .status-badge.no-show[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-badge.no_show[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.no-show-bg[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.no_show-bg[_ngcontent-ng-c1416008732] {
  background: rgba(245, 158, 11, 0.18) !important;
  color: #fbbf24 !important;
  border: 1.5px solid rgba(251, 191, 36, 0.4) !important;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .status-badge.rejected[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.rejected-bg[_ngcontent-ng-c1416008732] {
  background: rgba(239, 68, 68, 0.18) !important;
  color: #f87171 !important;
  border: 1.5px solid rgba(248, 113, 113, 0.4) !important;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .status-badge.cancelled[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.cancelled-bg[_ngcontent-ng-c1416008732], 
html.dark[_ngcontent-ng-c1416008732]   .status-banner.cancelled[_ngcontent-ng-c1416008732] {
  background: rgba(148, 163, 184, 0.18) !important;
  color: #cbd5e1 !important;
  border: 1.5px solid rgba(148, 163, 184, 0.4) !important;
  box-shadow: 0 2px 8px rgba(148, 163, 184, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-container[_ngcontent-ng-c1416008732] {
  background: #091d24 !important;
  border: 1.5px solid rgba(45, 212, 191, 0.3) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-header[_ngcontent-ng-c1416008732] {
  background: rgba(5, 20, 25, 0.9) !important;
  border-bottom: 1px solid rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-header[_ngcontent-ng-c1416008732]   h2[_ngcontent-ng-c1416008732] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-subtitle[_ngcontent-ng-c1416008732] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .close-btn[_ngcontent-ng-c1416008732] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .close-btn[_ngcontent-ng-c1416008732]:hover {
  color: #f87171 !important;
  background: rgba(239, 68, 68, 0.18) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-body[_ngcontent-ng-c1416008732] {
  background: #091d24 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .detail-group[_ngcontent-ng-c1416008732]   label[_ngcontent-ng-c1416008732] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .detail-group[_ngcontent-ng-c1416008732]   p[_ngcontent-ng-c1416008732] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c1416008732]   .divider[_ngcontent-ng-c1416008732] {
  background: rgba(45, 212, 191, 0.18) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .text-box.outline[_ngcontent-ng-c1416008732] {
  background: #051419 !important;
  border-color: rgba(45, 212, 191, 0.25) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .text-box.filled[_ngcontent-ng-c1416008732] {
  background: rgba(15, 118, 110, 0.25) !important;
  border-color: rgba(45, 212, 191, 0.35) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}
html.dark[_ngcontent-ng-c1416008732]   .modal-footer[_ngcontent-ng-c1416008732] {
  background-color: #051419 !important;
  border-top: 1px solid rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-solid-blue[_ngcontent-ng-c1416008732] {
  background-color: #0F766E !important;
  color: #ffffff !important;
  border: 1px solid #2dd4bf !important;
}
html.dark[_ngcontent-ng-c1416008732]   .btn-solid-blue[_ngcontent-ng-c1416008732]:hover {
  background-color: #115e59 !important;
}
@media (max-width: 1024px) {
  .dashboard-wrapper[_ngcontent-ng-c1416008732] {
    padding: 24px 20px;
  }
  .filter-card[_ngcontent-ng-c1416008732] {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-group[_ngcontent-ng-c1416008732], 
   .filter-group.flex-2[_ngcontent-ng-c1416008732] {
    width: 100%;
  }
  .filter-actions[_ngcontent-ng-c1416008732] {
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  .dashboard-wrapper[_ngcontent-ng-c1416008732] {
    padding: 16px 12px;
  }
  .page-title[_ngcontent-ng-c1416008732] {
    font-size: 24px;
  }
  .page-subtitle[_ngcontent-ng-c1416008732] {
    font-size: 13px;
  }
  .flex-between[_ngcontent-ng-c1416008732] {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .btn-outline-blue[_ngcontent-ng-c1416008732] {
    width: 100%;
    justify-content: center;
  }
  .detail-grid[_ngcontent-ng-c1416008732] {
    grid-template-columns: 1fr;
  }
}
/*# sourceMappingURL=/lecturer-history.css.map */</style><style ng-app-id="ng">
.sidebar[_ngcontent-ng-c3181499964] {
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
.sidebar-header[_ngcontent-ng-c3181499964] {
  padding: 32px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}
.brand-icon[_ngcontent-ng-c3181499964] {
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
.sidebar-header[_ngcontent-ng-c3181499964]   h2[_ngcontent-ng-c3181499964] {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.role-badge.lecturer[_ngcontent-ng-c3181499964] {
  display: inline-block;
  margin-top: 8px;
  background-color: rgba(16, 185, 129, 0.2);
  color: #ffc156;
  border: 1px solid rgb(252, 194, 94);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.sidebar-nav[_ngcontent-ng-c3181499964] {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.sidebar-nav[_ngcontent-ng-c3181499964]::-webkit-scrollbar {
  display: none;
}
.nav-item[_ngcontent-ng-c3181499964] {
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
.nav-icon[_ngcontent-ng-c3181499964] {
  width: 20px;
  height: 20px;
}
.nav-item[_ngcontent-ng-c3181499964]:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
.nav-item.active[_ngcontent-ng-c3181499964] {
  background-color: rgba(15, 118, 110, 0.15);
  color: white;
  border-left: 4px solid #0F766E;
}
.notif-sidebar-container[_ngcontent-ng-c3181499964] {
  position: relative;
  width: 100%;
}
.notif-nav-btn[_ngcontent-ng-c3181499964] {
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  justify-content: space-between;
  text-align: left;
}
.notif-left[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.notif-sidebar-badge[_ngcontent-ng-c3181499964] {
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
.notif-sidebar-off[_ngcontent-ng-c3181499964] {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}
.drawer-backdrop[_ngcontent-ng-c3181499964] {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 9998;
  animation: _ngcontent-ng-c3181499964_fadeInBackdrop 0.25s ease-out forwards;
}
@keyframes _ngcontent-ng-c3181499964_fadeInBackdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.quick-drawer-panel[_ngcontent-ng-c3181499964] {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 90vw;
  height: 100vh;
  background: #ffffff;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: #1e293b;
  box-sizing: border-box;
}
.quick-drawer-panel.open[_ngcontent-ng-c3181499964] {
  transform: translateX(0);
}
.drawer-header[_ngcontent-ng-c3181499964] {
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.title-with-badge[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  gap: 10px;
}
.drawer-title-area[_ngcontent-ng-c3181499964]   h3[_ngcontent-ng-c3181499964] {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0B191E;
}
.drawer-subtitle[_ngcontent-ng-c3181499964] {
  margin: 3px 0 0 0;
  font-size: 12.5px;
  color: #64748b;
  font-weight: 500;
}
.drawer-header-actions[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  gap: 14px;
}
.drawer-close-btn[_ngcontent-ng-c3181499964] {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #94a3b8;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.drawer-close-btn[_ngcontent-ng-c3181499964]:hover {
  color: #ef4444;
  background: #fef2f2;
}
.drawer-actions-bar[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
}
.total-count-lbl[_ngcontent-ng-c3181499964] {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.mark-read-btn[_ngcontent-ng-c3181499964] {
  background: transparent;
  border: none;
  color: #0F766E;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.mark-read-btn[_ngcontent-ng-c3181499964]:hover:not(:disabled) {
  color: #115e59;
  text-decoration: underline;
}
.mark-read-btn[_ngcontent-ng-c3181499964]:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}
.drawer-body[_ngcontent-ng-c3181499964] {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}
.time-group-section[_ngcontent-ng-c3181499964] {
  margin-bottom: 24px;
}
.group-section-title[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding-bottom: 8px;
  margin-bottom: 12px;
  border-bottom: 1.5px solid rgba(15, 118, 110, 0.15);
}
.group-count[_ngcontent-ng-c3181499964] {
  background: rgba(15, 118, 110, 0.1);
  color: #0F766E;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}
.drawer-notif-card[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  margin-bottom: 12px;
  position: relative;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.drawer-notif-card[_ngcontent-ng-c3181499964]:hover {
  background: #f8fafc;
  box-shadow: 0 6px 16px rgba(15, 118, 110, 0.08);
  border-color: #cbd5e1;
}
.drawer-notif-card.unread[_ngcontent-ng-c3181499964] {
  background: #f0fdfa;
  border-left: 4px solid #0F766E;
  border-color: rgba(15, 118, 110, 0.3);
}
.card-left[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;
}
.card-status-badge[_ngcontent-ng-c3181499964] {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-status-badge[_ngcontent-ng-c3181499964]   svg[_ngcontent-ng-c3181499964], 
.card-status-badge[_ngcontent-ng-c3181499964]   .type-svg[_ngcontent-ng-c3181499964] {
  width: 22px;
  height: 22px;
  display: block;
  margin: auto;
}
.card-status-badge.booking[_ngcontent-ng-c3181499964] {
  background:
    linear-gradient(
      135deg,
      #dcfce7 0%,
      #a7f3d0 100%);
  color: #047857;
  border: 1.5px solid #6ee7b7;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}
.card-status-badge.reminder[_ngcontent-ng-c3181499964] {
  background:
    linear-gradient(
      135deg,
      #fef3c7 0%,
      #fde68a 100%);
  color: #d97706;
  border: 1.5px solid #fcd34d;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}
.card-status-badge.cancellation[_ngcontent-ng-c3181499964] {
  background:
    linear-gradient(
      135deg,
      #fee2e2 0%,
      #fecdd3 100%);
  color: #dc2626;
  border: 1.5px solid #fda4af;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}
.card-content[_ngcontent-ng-c3181499964] {
  flex: 1;
  min-width: 0;
}
.card-meta[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.card-title[_ngcontent-ng-c3181499964] {
  font-size: 14px;
  font-weight: 700;
  color: #0B191E;
}
.card-time[_ngcontent-ng-c3181499964] {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
}
.card-msg[_ngcontent-ng-c3181499964] {
  font-size: 12.5px;
  color: #334155;
  line-height: 1.5;
  margin: 0 0 10px 0;
}
.card-actions-row[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.mini-btn[_ngcontent-ng-c3181499964] {
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.mini-btn.approve-btn[_ngcontent-ng-c3181499964] {
  background: #0F766E;
  color: white;
  border: none;
  box-shadow: 0 2px 6px rgba(15, 118, 110, 0.2);
}
.mini-btn.approve-btn[_ngcontent-ng-c3181499964]:hover {
  background: #115e59;
}
.mini-btn.view-btn[_ngcontent-ng-c3181499964] {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}
.mini-btn.view-btn[_ngcontent-ng-c3181499964]:hover {
  background: rgba(15, 118, 110, 0.1);
  color: #0F766E;
  border-color: #0F766E;
}
.dismiss-btn[_ngcontent-ng-c3181499964] {
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}
.dismiss-btn[_ngcontent-ng-c3181499964]:hover {
  color: #ef4444;
}
.drawer-empty-state[_ngcontent-ng-c3181499964] {
  text-align: center;
  padding: 48px 20px;
}
.drawer-empty-state[_ngcontent-ng-c3181499964]   h4[_ngcontent-ng-c3181499964] {
  font-weight: 800;
  font-size: 16px;
  color: #0B191E;
  margin: 12px 0 6px;
}
.drawer-empty-state[_ngcontent-ng-c3181499964]   p[_ngcontent-ng-c3181499964] {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 16px;
}
.notif-switch-box[_ngcontent-ng-c3181499964] {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.switch-label[_ngcontent-ng-c3181499964] {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.toggle-pill[_ngcontent-ng-c3181499964] {
  width: 36px;
  height: 20px;
  background-color: #cbd5e1;
  border-radius: 999px;
  padding: 2px;
  transition: background-color 0.25s ease;
  display: flex;
  align-items: center;
}
.toggle-pill.on[_ngcontent-ng-c3181499964] {
  background-color: #0f766e;
}
.toggle-thumb[_ngcontent-ng-c3181499964] {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease;
}
.toggle-pill.on[_ngcontent-ng-c3181499964]   .toggle-thumb[_ngcontent-ng-c3181499964] {
  transform: translateX(16px);
}
.unread-pill[_ngcontent-ng-c3181499964] {
  font-size: 11px;
  font-weight: 700;
  background: #ccfbf1;
  color: #0f766e;
  padding: 2px 8px;
  border-radius: 12px;
}
.sidebar-footer[_ngcontent-ng-c3181499964] {
  padding: 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background-color: #0B191E;
  margin-top: auto;
  z-index: 50;
}
.theme-toggle-nav-btn[_ngcontent-ng-c3181499964] {
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
.theme-toggle-nav-btn[_ngcontent-ng-c3181499964]:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
.logout-btn[_ngcontent-ng-c3181499964] {
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
.logout-btn[_ngcontent-ng-c3181499964]:hover {
  background-color: rgba(239, 68, 68, 0.1);
}
.dark[_nghost-ng-c3181499964]   .sidebar[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .sidebar[_ngcontent-ng-c3181499964] {
  background-color: #0B191E;
}
.dark[_nghost-ng-c3181499964]   .sidebar-footer[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .sidebar-footer[_ngcontent-ng-c3181499964] {
  background-color: #0B191E;
}
.dark[_nghost-ng-c3181499964]   .nav-item.active[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .nav-item.active[_ngcontent-ng-c3181499964] {
  background-color: rgba(45, 212, 191, 0.1);
  color: #2dd4bf;
  border-left: 4px solid #2dd4bf;
  box-shadow: inset 4px 0 12px rgba(45, 212, 191, 0.05);
}
.dark[_nghost-ng-c3181499964]   .role-badge.lecturer[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .role-badge.lecturer[_ngcontent-ng-c3181499964], 
html.dark[_nghost-ng-c3181499964]   .role-badge.lecturer[_ngcontent-ng-c3181499964], html.dark   [_nghost-ng-c3181499964]   .role-badge.lecturer[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .role-badge.lecturer[_ngcontent-ng-c3181499964] {
  background-color: rgba(16, 185, 129, 0.2) !important;
  color: #ffc156 !important;
  border: 1px solid rgb(252, 194, 94) !important;
}
.dark[_nghost-ng-c3181499964]   .nav-item[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .nav-item[_ngcontent-ng-c3181499964]:hover {
  color: #2dd4bf;
}
.dark[_nghost-ng-c3181499964]   .quick-drawer-panel[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .quick-drawer-panel[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .quick-drawer-panel[_ngcontent-ng-c3181499964] {
  background: #091d24 !important;
  color: #f8fafc !important;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.75) !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-header[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-header[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-header[_ngcontent-ng-c3181499964] {
  background: #051419 !important;
  border-bottom-color: rgba(45, 212, 191, 0.18) !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-title-area[_ngcontent-ng-c3181499964]   h3[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-title-area[_ngcontent-ng-c3181499964]   h3[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-title-area[_ngcontent-ng-c3181499964]   h3[_ngcontent-ng-c3181499964] {
  color: #ffffff !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-subtitle[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-subtitle[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-subtitle[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .unread-pill[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .unread-pill[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .unread-pill[_ngcontent-ng-c3181499964] {
  background: rgba(45, 212, 191, 0.2) !important;
  color: #2dd4bf !important;
}
.dark[_nghost-ng-c3181499964]   .switch-label[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .switch-label[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .switch-label[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .toggle-pill[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .toggle-pill[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .toggle-pill[_ngcontent-ng-c3181499964] {
  background-color: #334155 !important;
}
.dark[_nghost-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964] {
  background-color: #2dd4bf !important;
}
.dark[_nghost-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964]   .toggle-thumb[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964]   .toggle-thumb[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .toggle-pill.on[_ngcontent-ng-c3181499964]   .toggle-thumb[_ngcontent-ng-c3181499964] {
  background-color: #051419 !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964]:hover, 
html.dark[_ngcontent-ng-c3181499964]   .drawer-close-btn[_ngcontent-ng-c3181499964]:hover {
  color: #f87171 !important;
  background: rgba(239, 68, 68, 0.18) !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-actions-bar[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-actions-bar[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-actions-bar[_ngcontent-ng-c3181499964] {
  background: #091d24 !important;
  border-bottom-color: rgba(45, 212, 191, 0.12) !important;
}
.dark[_nghost-ng-c3181499964]   .total-count-lbl[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .total-count-lbl[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .total-count-lbl[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964] {
  color: #2dd4bf !important;
}
.dark[_nghost-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964]:hover:not(:disabled), .dark   [_nghost-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964]:hover:not(:disabled), 
html.dark[_ngcontent-ng-c3181499964]   .mark-read-btn[_ngcontent-ng-c3181499964]:hover:not(:disabled) {
  color: #5eead4 !important;
}
.dark[_nghost-ng-c3181499964]   .group-section-title[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .group-section-title[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .group-section-title[_ngcontent-ng-c3181499964] {
  color: #2dd4bf !important;
  border-bottom-color: rgba(45, 212, 191, 0.25) !important;
}
.dark[_nghost-ng-c3181499964]   .group-count[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .group-count[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .group-count[_ngcontent-ng-c3181499964] {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #5eead4 !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964] {
  background: rgba(5, 20, 25, 0.8) !important;
  border-color: rgba(45, 212, 191, 0.18) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964]:hover, 
html.dark[_ngcontent-ng-c3181499964]   .drawer-notif-card[_ngcontent-ng-c3181499964]:hover {
  background: rgba(9, 29, 36, 0.95) !important;
  border-color: rgba(45, 212, 191, 0.35) !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-notif-card.unread[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-notif-card.unread[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-notif-card.unread[_ngcontent-ng-c3181499964] {
  background: #0c272e !important;
  border-left-color: #2dd4bf !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
}
.dark[_nghost-ng-c3181499964]   .card-title[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .card-title[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .card-title[_ngcontent-ng-c3181499964] {
  color: #ffffff !important;
}
.dark[_nghost-ng-c3181499964]   .card-time[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .card-time[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .card-time[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .card-msg[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .card-msg[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .card-msg[_ngcontent-ng-c3181499964] {
  color: #cbd5e1 !important;
}
.dark[_nghost-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964] {
  background: #051419 !important;
  color: #cbd5e1 !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
}
.dark[_nghost-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964]:hover, 
html.dark[_ngcontent-ng-c3181499964]   .mini-btn.view-btn[_ngcontent-ng-c3181499964]:hover {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #2dd4bf !important;
  border-color: #2dd4bf !important;
}
.dark[_nghost-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964] {
  color: #64748b !important;
}
.dark[_nghost-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964]:hover, 
html.dark[_ngcontent-ng-c3181499964]   .dismiss-btn[_ngcontent-ng-c3181499964]:hover {
  color: #f87171 !important;
}
.dark[_nghost-ng-c3181499964]   .empty-icon-wrap[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .empty-icon-wrap[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .empty-icon-wrap[_ngcontent-ng-c3181499964] {
  background: #051419 !important;
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   h4[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   h4[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   h4[_ngcontent-ng-c3181499964] {
  color: #ffffff !important;
}
.dark[_nghost-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   p[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   p[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .drawer-empty-state[_ngcontent-ng-c3181499964]   p[_ngcontent-ng-c3181499964] {
  color: #94a3b8 !important;
}
.dark[_nghost-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964], .dark   [_nghost-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964], 
html.dark[_ngcontent-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964] {
  background: #2dd4bf !important;
  color: #020a0d !important;
  font-weight: 800 !important;
}
.dark[_nghost-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964]:hover, .dark   [_nghost-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964]:hover, 
html.dark[_ngcontent-ng-c3181499964]   .enable-notif-btn[_ngcontent-ng-c3181499964]:hover {
  background: #14b8a6 !important;
  color: #ffffff !important;
}
@media (max-width: 1024px) {
  .sidebar[_ngcontent-ng-c3181499964] {
    width: 72px;
  }
  .sidebar-header[_ngcontent-ng-c3181499964] {
    padding: 20px 0;
  }
  .sidebar-header[_ngcontent-ng-c3181499964]   h2[_ngcontent-ng-c3181499964], 
   .role-badge[_ngcontent-ng-c3181499964] {
    display: none !important;
  }
  .nav-item[_ngcontent-ng-c3181499964] {
    font-size: 0 !important;
    justify-content: center;
    padding: 12px 0;
    gap: 0;
  }
  .notif-sidebar-badge[_ngcontent-ng-c3181499964], 
   .notif-sidebar-off[_ngcontent-ng-c3181499964] {
    position: absolute;
    top: 4px;
    right: 8px;
  }
  .notif-flyout-panel[_ngcontent-ng-c3181499964] {
    left: 80px;
    top: 180px;
    width: 300px;
  }
  .sidebar-footer[_ngcontent-ng-c3181499964] {
    padding: 16px 8px;
  }
  .logout-btn[_ngcontent-ng-c3181499964] {
    font-size: 0 !important;
    padding: 12px;
    justify-content: center;
  }
  .theme-toggle-nav-btn[_ngcontent-ng-c3181499964] {
    justify-content: center;
    padding: 12px 0;
    gap: 0;
  }
  .theme-toggle-nav-btn[_ngcontent-ng-c3181499964]   span[_ngcontent-ng-c3181499964] {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .sidebar[_ngcontent-ng-c3181499964] {
    width: 60px;
  }
  .sidebar-footer[_ngcontent-ng-c3181499964] {
    width: 60px;
  }
  .notif-flyout-panel[_ngcontent-ng-c3181499964] {
    left: 68px;
    top: 180px;
    width: 280px;
  }
}
/*# sourceMappingURL=/sidebar-lect.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","input","compositionstart","compositionend","change"],["blur"]);</script>
  <app-root ng-version="21.2.15" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-lecturer-history _nghost-ng-c1416008732="" ngh="1"><div _ngcontent-ng-c1416008732="" class="lecturer-layout"><app-sidebar-lect _ngcontent-ng-c1416008732="" _nghost-ng-c3181499964="" ngh="0"><aside _ngcontent-ng-c3181499964="" class="sidebar"><div _ngcontent-ng-c3181499964="" class="sidebar-header"><div _ngcontent-ng-c3181499964="" class="brand-icon">AL</div><h2 _ngcontent-ng-c3181499964="">ALCAS</h2><span _ngcontent-ng-c3181499964="" class="role-badge lecturer">Lecturer</span></div><nav _ngcontent-ng-c3181499964="" class="sidebar-nav"><a _ngcontent-ng-c3181499964="" routerlink="/lecturer" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span _ngcontent-ng-c3181499964="">Overview</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/schedule" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span _ngcontent-ng-c3181499964="">My Schedule</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/appointments" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span _ngcontent-ng-c3181499964="">Appointments</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/history" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span _ngcontent-ng-c3181499964="">Consultation History</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/profile" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span _ngcontent-ng-c3181499964="">My Profile</span></a><div _ngcontent-ng-c3181499964="" class="notif-sidebar-container"><button _ngcontent-ng-c3181499964="" title="Toggle Quick Drawer Notifications" class="nav-item notif-nav-btn" jsaction="click:;"><div _ngcontent-ng-c3181499964="" class="notif-left"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span _ngcontent-ng-c3181499964="">Notifications</span></div><!--container--><!--container--></button></div><button _ngcontent-ng-c3181499964="" title="Toggle Dark/Light Mode" class="theme-toggle-nav-btn" jsaction="click:;"><!--container--><!--container--></button></nav><div _ngcontent-ng-c3181499964="" class="sidebar-footer"><button _ngcontent-ng-c3181499964="" class="logout-btn" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c3181499964="">Sign Out</span></button></div></aside><!--container--><div _ngcontent-ng-c3181499964="" class="quick-drawer-panel" jsaction="click:;"><div _ngcontent-ng-c3181499964="" class="drawer-header"><div _ngcontent-ng-c3181499964="" class="drawer-title-area"><div _ngcontent-ng-c3181499964="" class="title-with-badge"><h3 _ngcontent-ng-c3181499964="">Notifications</h3><!--container--></div><p _ngcontent-ng-c3181499964="" class="drawer-subtitle">Manage student requests and consultation updates</p></div><div _ngcontent-ng-c3181499964="" class="drawer-header-actions"><div _ngcontent-ng-c3181499964="" title="Toggle Notifications On/Off" class="notif-switch-box" jsaction="click:;"><span _ngcontent-ng-c3181499964="" class="switch-label"><!--ngetn--></span><div _ngcontent-ng-c3181499964="" class="toggle-pill"><span _ngcontent-ng-c3181499964="" class="toggle-thumb"></span></div></div><button _ngcontent-ng-c3181499964="" title="Close Drawer" class="drawer-close-btn" jsaction="click:;">×</button></div></div><!--container--><div _ngcontent-ng-c3181499964="" class="drawer-body"><!--container--><!--container--></div></div></app-sidebar-lect><main _ngcontent-ng-c1416008732="" class="main-content dashboard-modern-bg"><div _ngcontent-ng-c1416008732="" class="dashboard-wrapper"><div _ngcontent-ng-c1416008732="" class="dashboard-header flex-between"><div _ngcontent-ng-c1416008732=""><h1 _ngcontent-ng-c1416008732="" class="page-title">Consultation History</h1><p _ngcontent-ng-c1416008732="" class="page-subtitle">View your past meetings, student records, and saved notes.</p></div><button _ngcontent-ng-c1416008732="" class="btn-outline-blue" jsaction="click:;"><svg _ngcontent-ng-c1416008732="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="btn-icon"><path _ngcontent-ng-c1416008732="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Export CSV Report </button></div><div _ngcontent-ng-c1416008732="" class="glass-card filter-card"><div _ngcontent-ng-c1416008732="" class="filter-group flex-2"><label _ngcontent-ng-c1416008732="">Search Records</label><div _ngcontent-ng-c1416008732="" class="input-with-icon"><svg _ngcontent-ng-c1416008732="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="input-icon"><path _ngcontent-ng-c1416008732="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input _ngcontent-ng-c1416008732="" type="text" placeholder="Search student name, matric, or ID..." jsaction="input:;blur:;compositionstart:;compositionend:;"></div></div><div _ngcontent-ng-c1416008732="" class="filter-group"><label _ngcontent-ng-c1416008732="">Status</label><select _ngcontent-ng-c1416008732="" class="modern-select" jsaction="change:;blur:;"><option _ngcontent-ng-c1416008732="" value="ALL">All Statuses</option><option _ngcontent-ng-c1416008732="" value="COMPLETED">Completed</option><option _ngcontent-ng-c1416008732="" value="NO-SHOW">No-Show</option><option _ngcontent-ng-c1416008732="" value="REJECTED">Rejected</option><option _ngcontent-ng-c1416008732="" value="CANCELLED">Cancelled</option></select></div><div _ngcontent-ng-c1416008732="" class="filter-group"><label _ngcontent-ng-c1416008732="">Specific Date</label><input _ngcontent-ng-c1416008732="" type="date" class="modern-input" jsaction="input:;blur:;compositionstart:;compositionend:;"></div><div _ngcontent-ng-c1416008732="" class="filter-actions"><button _ngcontent-ng-c1416008732="" class="btn-text" jsaction="click:;">Clear Filters</button></div></div><div _ngcontent-ng-c1416008732="" class="glass-card content-card"><div _ngcontent-ng-c1416008732="" class="table-container"><table _ngcontent-ng-c1416008732="" class="sophisticated-table"><thead _ngcontent-ng-c1416008732=""><tr _ngcontent-ng-c1416008732=""><th _ngcontent-ng-c1416008732="">Date &amp; Time</th><th _ngcontent-ng-c1416008732="">Student Details</th><th _ngcontent-ng-c1416008732="">Reason for Visit</th><th _ngcontent-ng-c1416008732="">Status</th><th _ngcontent-ng-c1416008732="" class="text-right">Action</th></tr></thead><tbody _ngcontent-ng-c1416008732=""><!--container--><!--container--></tbody></table></div></div></div></main><!--container--></div></app-lecturer-history><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"41":"t13","42":"t14","44":"t15","45":"t16","52":"t17","59":"t18","70":"t19","72":"t20","73":"t21"},"c":{"41":[],"42":[],"44":[],"45":[],"52":[],"59":[],"70":[],"72":[],"73":[]}},{"t":{"59":"t22","60":"t23","61":"t24"},"c":{"59":[],"60":[],"61":[]}},{"c":{"0":[{"i":"c1416008732","r":1}]}}]}</script></body></html>`;