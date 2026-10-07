export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
.lecturer-layout[_ngcontent-ng-c2289663177] {
  display: flex;
  min-height: 100vh;
  font-family: "Plus Jakarta Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
  max-width: 100vw;
}
.main-content[_ngcontent-ng-c2289663177] {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  position: relative;
}
.dashboard-wrapper[_ngcontent-ng-c2289663177] {
  padding: 32px 40px;
  min-height: 100vh;
  font-family: "Plus Jakarta Sans", sans-serif;
  color: #1f2937;
  position: relative;
  z-index: 1;
  max-width: 1600px;
  margin: 0 auto;
}
.flex-between[_ngcontent-ng-c2289663177] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}
.page-title[_ngcontent-ng-c2289663177] {
  font-size: 32px;
  font-weight: 800;
  color: #0B191E;
  letter-spacing: -0.8px;
  margin: 0 0 6px 0;
}
.page-subtitle[_ngcontent-ng-c2289663177] {
  color: #64748b;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}
.controls-card[_ngcontent-ng-c2289663177] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  padding: 16px 24px;
  border-radius: 16px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0 10px 30px -10px rgba(15, 118, 110, 0.05);
}
.tabs-container[_ngcontent-ng-c2289663177] {
  display: flex;
  gap: 8px;
}
.tab-btn[_ngcontent-ng-c2289663177] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: #64748b;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}
.tab-btn[_ngcontent-ng-c2289663177]:hover {
  background: rgba(15, 118, 110, 0.08);
  color: #0F766E;
}
.tab-btn.active[_ngcontent-ng-c2289663177] {
  background: rgba(15, 118, 110, 0.12);
  color: #0F766E;
  box-shadow: 0 2px 8px rgba(15, 118, 110, 0.1);
}
.badge.yellow[_ngcontent-ng-c2289663177] {
  background: #fef3c7;
  color: #b45309;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}
.search-container[_ngcontent-ng-c2289663177] {
  position: relative;
  width: 340px;
}
.search-icon[_ngcontent-ng-c2289663177] {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #94a3b8;
}
.search-input[_ngcontent-ng-c2289663177] {
  width: 100%;
  padding: 10px 14px 10px 40px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.25s ease;
  background: white;
  font-family: inherit;
  color: #0B191E;
}
.search-input[_ngcontent-ng-c2289663177]:focus {
  border-color: #0F766E;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
}
.appointments-grid[_ngcontent-ng-c2289663177] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  gap: 24px;
}
.appt-card[_ngcontent-ng-c2289663177] {
  background: rgba(255, 255, 255, 0.88);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 1);
  border-top-width: 4px;
  box-shadow: 0 10px 30px -10px rgba(15, 118, 110, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  overflow: visible;
  position: relative;
  z-index: 1;
}
.appt-card[_ngcontent-ng-c2289663177]:hover {
  box-shadow: 0 20px 40px -15px rgba(15, 118, 110, 0.12);
  transform: translateY(-4px);
  z-index: 50;
}
.pending-border[_ngcontent-ng-c2289663177] {
  border-top-color: #f59e0b;
}
.upcoming-border[_ngcontent-ng-c2289663177] {
  border-top-color: #0F766E;
}
.appt-header[_ngcontent-ng-c2289663177] {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}
.student-info[_ngcontent-ng-c2289663177] {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar[_ngcontent-ng-c2289663177] {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      rgba(15, 118, 110, 0.15),
      rgba(20, 184, 166, 0.25));
  color: #0F766E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 17px;
  border: 1px solid rgba(15, 118, 110, 0.2);
}
.student-info.clickable[_ngcontent-ng-c2289663177] {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 4px 8px;
  margin: -4px -8px;
  border-radius: 10px;
  transition: all 0.25s ease;
}
.student-info.clickable[_ngcontent-ng-c2289663177]:hover {
  background: rgba(15, 118, 110, 0.08);
}
.student-info.clickable[_ngcontent-ng-c2289663177]:hover   .student-name[_ngcontent-ng-c2289663177] {
  color: #0F766E;
  text-decoration: underline;
}
.student-hover-card[_ngcontent-ng-c2289663177] {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 320px;
  background: white;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(15, 118, 110, 0.3);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 16px 40px -5px rgba(15, 118, 110, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
  pointer-events: none;
}
.student-hover-card[_ngcontent-ng-c2289663177]::before {
  content: "";
  position: absolute;
  top: -7px;
  left: 24px;
  width: 12px;
  height: 12px;
  background: white;
  border-top: 1.5px solid rgba(15, 118, 110, 0.3);
  border-left: 1.5px solid rgba(15, 118, 110, 0.3);
  transform: rotate(45deg);
}
.student-info.clickable[_ngcontent-ng-c2289663177]:hover   .student-hover-card[_ngcontent-ng-c2289663177] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}
.hover-card-header[_ngcontent-ng-c2289663177] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}
.hover-avatar-sm[_ngcontent-ng-c2289663177] {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      rgba(15, 118, 110, 0.2),
      rgba(20, 184, 166, 0.35));
  color: #0F766E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  border: 2px solid rgba(15, 118, 110, 0.3);
}
.hover-name[_ngcontent-ng-c2289663177] {
  margin: 0 0 2px 0;
  font-size: 15px;
  font-weight: 800;
  color: #0B191E;
}
.hover-matric-pill[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  background: rgba(15, 118, 110, 0.1);
  color: #0F766E;
  padding: 2px 8px;
  border-radius: 10px;
}
.hover-card-body[_ngcontent-ng-c2289663177] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.hover-row[_ngcontent-ng-c2289663177] {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.h-label[_ngcontent-ng-c2289663177] {
  font-size: 10px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.h-val[_ngcontent-ng-c2289663177] {
  font-size: 12.5px;
  font-weight: 700;
  color: #0B191E;
  word-break: break-word;
}
.hover-footer-hint[_ngcontent-ng-c2289663177] {
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px dashed rgba(226, 232, 240, 0.8);
  font-size: 11px;
  font-weight: 700;
  color: #0F766E;
  text-align: right;
}
.text-green-val[_ngcontent-ng-c2289663177] {
  color: #059669 !important;
  font-weight: 800;
}
.student-name[_ngcontent-ng-c2289663177] {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 800;
  color: #0B191E;
}
.matric-text[_ngcontent-ng-c2289663177] {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}
.time-block[_ngcontent-ng-c2289663177] {
  text-align: right;
}
.appt-date[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.appt-time[_ngcontent-ng-c2289663177] {
  font-size: 15px;
  font-weight: 800;
}
.pending-text[_ngcontent-ng-c2289663177] {
  color: #d97706;
}
.upcoming-text[_ngcontent-ng-c2289663177] {
  color: #0F766E;
}
.appt-body[_ngcontent-ng-c2289663177] {
  padding: 20px;
  flex: 1;
  background: rgba(248, 250, 252, 0.7);
}
.session-meta-bar[_ngcontent-ng-c2289663177] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 10px;
}
.location-badge[_ngcontent-ng-c2289663177] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 118, 110, 0.08);
  border: 1px solid rgba(15, 118, 110, 0.2);
  color: #0F766E;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
.location-badge.is-online[_ngcontent-ng-c2289663177] {
  background: rgba(2, 132, 199, 0.08);
  border-color: rgba(2, 132, 199, 0.25);
  color: #0284c7;
}
.badge-icon[_ngcontent-ng-c2289663177] {
  width: 14px;
  height: 14px;
}
.confirmed-pill[_ngcontent-ng-c2289663177] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.25);
  color: #059669;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.btn-outline-teal[_ngcontent-ng-c2289663177] {
  background: transparent;
  border: 1.5px solid #0F766E;
  color: #0F766E;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.btn-outline-teal[_ngcontent-ng-c2289663177]:hover {
  background: rgba(15, 118, 110, 0.1);
  border-color: #0d6760;
  color: #0d6760;
}
.appt-body[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 6px;
}
.reason-text[_ngcontent-ng-c2289663177] {
  margin: 0;
  font-size: 14px;
  color: #334155;
  line-height: 1.5;
  font-style: italic;
  font-weight: 500;
}
.appt-footer[_ngcontent-ng-c2289663177] {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  background: white;
}
.btn-solid-blue[_ngcontent-ng-c2289663177] {
  background-color: #0F766E;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-solid-blue[_ngcontent-ng-c2289663177]:hover {
  background-color: #115e59;
}
.btn-solid-green[_ngcontent-ng-c2289663177] {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-solid-green[_ngcontent-ng-c2289663177]:hover {
  background-color: #059669;
}
.btn-solid-yellow[_ngcontent-ng-c2289663177] {
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-solid-yellow[_ngcontent-ng-c2289663177]:hover {
  background-color: #d97706;
}
.btn-outline-red[_ngcontent-ng-c2289663177] {
  background: transparent;
  color: #ef4444;
  border: 1.5px solid #ef4444;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-outline-red[_ngcontent-ng-c2289663177]:hover {
  background: #fef2f2;
}
.btn-outline-gray[_ngcontent-ng-c2289663177] {
  background: transparent;
  color: #475569;
  border: 1.5px solid #cbd5e1;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-outline-gray[_ngcontent-ng-c2289663177]:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}
.summary-box[_ngcontent-ng-c2289663177] {
  background:
    linear-gradient(
      135deg,
      #f0fdfa 0%,
      #e6fffa 100%);
  border: 1px solid #ccfbf1;
  border-left: 4px solid #0F766E;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 14px;
  color: #1e293b;
  font-weight: 550;
  line-height: 1.7;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.06);
}
.summary-box[_ngcontent-ng-c2289663177]   strong[_ngcontent-ng-c2289663177] {
  color: #0F766E;
  font-weight: 550;
}
.summary-box.pending-summary[_ngcontent-ng-c2289663177] {
  background:
    linear-gradient(
      135deg,
      #fffbeb 0%,
      #fef3c7 100%);
  border: 1px solid #fde68a;
  border-left: 4px solid #f59e0b;
}
.summary-box.pending-summary[_ngcontent-ng-c2289663177]   strong[_ngcontent-ng-c2289663177] {
  color: #d97706;
}
.mt-4[_ngcontent-ng-c2289663177] {
  margin-top: 16px;
}
.form-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  display: block;
  font-size: 14px;
  font-weight: 550;
  color: #1e293b;
  margin-bottom: 8px;
}
.text-red[_ngcontent-ng-c2289663177] {
  color: #ef4444;
  font-weight: 700;
}
.modern-textarea[_ngcontent-ng-c2289663177] {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s ease;
  background: white;
  color: #0B191E;
}
.modern-textarea[_ngcontent-ng-c2289663177]:focus {
  border-color: #0F766E;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
}
.helper-text[_ngcontent-ng-c2289663177] {
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
  display: block;
}
.bg-red[_ngcontent-ng-c2289663177] {
  background-color: #ef4444 !important;
}
.bg-red[_ngcontent-ng-c2289663177]:hover {
  background-color: #dc2626 !important;
}
.bg-green[_ngcontent-ng-c2289663177] {
  background-color: #10b981 !important;
}
.bg-green[_ngcontent-ng-c2289663177]:hover {
  background-color: #059669 !important;
}
.bg-yellow[_ngcontent-ng-c2289663177] {
  background-color: #f59e0b;
  color: white;
}
.bg-yellow[_ngcontent-ng-c2289663177]:hover {
  background-color: #d97706;
}
.btn-outline-yellow[_ngcontent-ng-c2289663177] {
  background: rgba(245, 158, 11, 0.06);
  border: 1.5px solid #f59e0b;
  color: #d97706;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  box-shadow: 0 1px 2px rgba(245, 158, 11, 0.05);
}
.btn-outline-yellow[_ngcontent-ng-c2289663177]:hover {
  background-color: #fef3c7;
  border-color: #d97706;
  color: #b45309;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}
.btn-outline-yellow[_ngcontent-ng-c2289663177]:active {
  transform: translateY(0);
  box-shadow: none;
}
.empty-state[_ngcontent-ng-c2289663177] {
  grid-column: 1 / -1;
  width: 100%;
  padding: 64px 24px;
  background: rgba(255, 255, 255, 0.85);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 2px dashed rgba(15, 118, 110, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0 10px 30px -10px rgba(15, 118, 110, 0.06);
  transition: all 0.3s ease;
}
.empty-state[_ngcontent-ng-c2289663177]:hover {
  border-color: rgba(15, 118, 110, 0.4);
  background: rgba(255, 255, 255, 0.95);
}
.empty-state-content[_ngcontent-ng-c2289663177] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 440px;
  margin: 0 auto;
}
.empty-icon-ring[_ngcontent-ng-c2289663177] {
  width: 84px;
  height: 84px;
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
  margin: 0 auto 20px auto;
  box-shadow: 0 12px 24px -6px rgba(15, 118, 110, 0.15), 0 0 20px rgba(15, 118, 110, 0.08);
}
.empty-icon-ring[_ngcontent-ng-c2289663177]   svg[_ngcontent-ng-c2289663177], 
.empty-icon[_ngcontent-ng-c2289663177] {
  width: 42px;
  height: 42px;
  color: #0F766E;
  margin: 0;
  filter: drop-shadow(0 2px 4px rgba(15, 118, 110, 0.2));
}
.empty-title[_ngcontent-ng-c2289663177] {
  font-size: 20px;
  color: #0B191E;
  font-weight: 800;
  margin: 0 0 8px 0;
  letter-spacing: -0.4px;
}
.empty-subtitle[_ngcontent-ng-c2289663177] {
  color: #64748b;
  margin: 0;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.55;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177], 
html.dark[_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177], html.dark   [_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177], 
body.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.75) !important;
  border-color: rgba(45, 212, 191, 0.35) !important;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover, 
html.dark[_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover, html.dark   [_nghost-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover, 
body.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]:hover {
  background: rgba(9, 29, 36, 0.9) !important;
  border-color: rgba(45, 212, 191, 0.5) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177], 
html.dark[_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177], html.dark   [_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177], 
body.dark[_ngcontent-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177] {
  background:
    linear-gradient(
      135deg,
      rgba(45, 212, 191, 0.2) 0%,
      rgba(20, 184, 166, 0.3) 100%) !important;
  border-color: rgba(45, 212, 191, 0.45) !important;
  box-shadow: 0 12px 24px -6px rgba(45, 212, 191, 0.3) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177]   svg[_ngcontent-ng-c2289663177], 
html.dark[_ngcontent-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177]   svg[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-icon-ring[_ngcontent-ng-c2289663177]   svg[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177], 
html.dark[_nghost-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177], html.dark   [_nghost-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177], 
body.dark[_ngcontent-ng-c2289663177]   .empty-icon[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177], 
html.dark[_nghost-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177], html.dark   [_nghost-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177], 
body.dark[_ngcontent-ng-c2289663177]   .empty-title[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177], 
html.dark[_nghost-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177], html.dark   [_nghost-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177], 
body.dark[_ngcontent-ng-c2289663177]   .empty-subtitle[_ngcontent-ng-c2289663177] {
  color: #5eead4 !important;
  font-weight: 600 !important;
}
.modal-backdrop[_ngcontent-ng-c2289663177] {
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
  padding: 16px;
  box-sizing: border-box;
}
.modal-container[_ngcontent-ng-c2289663177] {
  background: white;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.fade-in-up[_ngcontent-ng-c2289663177] {
  animation: _ngcontent-ng-c2289663177_fadeInUp 0.3s ease-out forwards;
}
@keyframes _ngcontent-ng-c2289663177_fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.modal-header[_ngcontent-ng-c2289663177] {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}
.modal-header[_ngcontent-ng-c2289663177]   h2[_ngcontent-ng-c2289663177] {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0B191E;
}
.close-btn[_ngcontent-ng-c2289663177] {
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
.close-btn[_ngcontent-ng-c2289663177]:hover {
  background: #fef2f2;
  color: #ef4444;
}
.modal-body[_ngcontent-ng-c2289663177] {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  max-height: calc(85vh - 120px);
}
.modal-footer[_ngcontent-ng-c2289663177] {
  flex-shrink: 0;
  padding: 14px 20px;
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-text[_ngcontent-ng-c2289663177] {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.btn-text[_ngcontent-ng-c2289663177]:hover {
  background: #e2e8f0;
  color: #1e293b;
}
html.dark[_ngcontent-ng-c2289663177]   .controls-card[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.5) !important;
  border: 1px solid rgba(45, 212, 191, 0.12) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  backdrop-filter: blur(12px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .tab-btn[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
  font-weight: 700 !important;
  border: 1px solid transparent !important;
}
html.dark[_ngcontent-ng-c2289663177]   .tab-btn[_ngcontent-ng-c2289663177]:hover {
  color: #5eead4 !important;
  background: rgba(45, 212, 191, 0.08) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .tab-btn.active[_ngcontent-ng-c2289663177] {
  background: rgba(15, 118, 110, 0.25) !important;
  color: #5eead4 !important;
  border: 1px solid rgba(45, 212, 191, 0.2) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}
html.dark[_ngcontent-ng-c2289663177]   .search-input[_ngcontent-ng-c2289663177] {
  background-color: #051419 !important;
  border: 1px solid rgba(45, 212, 191, 0.3) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .search-input[_ngcontent-ng-c2289663177]::placeholder {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .search-input[_ngcontent-ng-c2289663177]:focus {
  border-color: #2dd4bf !important;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .search-icon[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177] {
  background: rgba(9, 29, 36, 0.85) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(45, 212, 191, 0.25) !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
  overflow: visible !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .appt-card[_ngcontent-ng-c2289663177]:hover {
  background: rgba(9, 29, 36, 0.95) !important;
  border-color: rgba(45, 212, 191, 0.35) !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177] {
  background: #091d24 !important;
  border-color: rgba(45, 212, 191, 0.4) !important;
  box-shadow: 0 16px 40px -5px rgba(0, 0, 0, 0.7), 0 6px 15px rgba(0, 0, 0, 0.4) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177]::before, 
.dark[_nghost-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177]::before, .dark   [_nghost-ng-c2289663177]   .student-hover-card[_ngcontent-ng-c2289663177]::before {
  background: #091d24 !important;
  border-top-color: rgba(45, 212, 191, 0.4) !important;
  border-left-color: rgba(45, 212, 191, 0.4) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .hover-card-header[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .hover-card-header[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .hover-card-header[_ngcontent-ng-c2289663177] {
  border-bottom-color: rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .hover-avatar-sm[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .hover-avatar-sm[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .hover-avatar-sm[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.2) !important;
  color: #2dd4bf !important;
  border-color: rgba(45, 212, 191, 0.4) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .hover-name[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .hover-name[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .hover-name[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .hover-matric-pill[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .hover-matric-pill[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .hover-matric-pill[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .h-label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .h-label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .h-label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .h-val[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .h-val[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .h-val[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .hover-footer-hint[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .hover-footer-hint[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .hover-footer-hint[_ngcontent-ng-c2289663177] {
  border-top-color: rgba(45, 212, 191, 0.2) !important;
  color: #5eead4 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .pending-border[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .pending-border[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .pending-border[_ngcontent-ng-c2289663177] {
  border-top-color: #f59e0b !important;
}
html.dark[_ngcontent-ng-c2289663177]   .upcoming-border[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .upcoming-border[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .upcoming-border[_ngcontent-ng-c2289663177] {
  border-top-color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-header[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-header[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-header[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.95) !important;
  border-bottom: 1px solid rgba(45, 212, 191, 0.18) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .avatar[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .avatar[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .avatar[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.2) !important;
  color: #2dd4bf !important;
  border: 1.5px solid rgba(45, 212, 191, 0.4) !important;
  box-shadow: 0 0 10px rgba(45, 212, 191, 0.25) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .student-name[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .student-name[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .student-name[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
  font-size: 16px !important;
  font-weight: 800 !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.15) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .matric-text[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .matric-text[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .matric-text[_ngcontent-ng-c2289663177] {
  color: #cbd5e1 !important;
  font-weight: 600 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-date[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-date[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-date[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .upcoming-text[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .upcoming-text[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .upcoming-text[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .pending-text[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .pending-text[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .pending-text[_ngcontent-ng-c2289663177] {
  color: #fbbf24 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177] {
  background: rgba(9, 29, 36, 0.75) !important;
  border-bottom: 1px solid rgba(45, 212, 191, 0.12) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .location-badge[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .location-badge[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .location-badge[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.15) !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
  color: #5eead4 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .location-badge.is-online[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .location-badge.is-online[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .location-badge.is-online[_ngcontent-ng-c2289663177] {
  background: rgba(56, 189, 248, 0.15) !important;
  border-color: rgba(56, 189, 248, 0.3) !important;
  color: #38bdf8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .confirmed-pill[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .confirmed-pill[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .confirmed-pill[_ngcontent-ng-c2289663177] {
  background: rgba(52, 211, 153, 0.18) !important;
  border-color: rgba(52, 211, 153, 0.35) !important;
  color: #34d399 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .remarks-box[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .remarks-box[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .remarks-box[_ngcontent-ng-c2289663177] {
  background: rgba(15, 118, 110, 0.2) !important;
  border-left-color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .remarks-label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .remarks-label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .remarks-label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .remarks-text[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .remarks-text[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .remarks-text[_ngcontent-ng-c2289663177] {
  color: #e2e8f0 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-body[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
}
html.dark[_ngcontent-ng-c2289663177]   .reason-text[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .reason-text[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .reason-text[_ngcontent-ng-c2289663177] {
  color: #f1f5f9 !important;
  font-weight: 500 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .appt-footer[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .appt-footer[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .appt-footer[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.95) !important;
  border-top: 1px solid rgba(45, 212, 191, 0.18) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177] {
  background-color: #2dd4bf !important;
  color: #020a0d !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .btn-solid-blue[_ngcontent-ng-c2289663177]:hover {
  background-color: #14b8a6 !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177] {
  background-color: #f59e0b !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .btn-solid-yellow[_ngcontent-ng-c2289663177]:hover {
  background-color: #d97706 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177] {
  border-color: rgba(245, 158, 11, 0.6) !important;
  color: #fbbf24 !important;
  background: rgba(245, 158, 11, 0.1) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .btn-outline-yellow[_ngcontent-ng-c2289663177]:hover {
  background: rgba(245, 158, 11, 0.25) !important;
  color: #ffffff !important;
  border-color: #f59e0b !important;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177] {
  border-color: rgba(45, 212, 191, 0.3) !important;
  color: #cbd5e1 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .btn-outline-gray[_ngcontent-ng-c2289663177]:hover {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177] {
  border-color: rgba(239, 68, 68, 0.5) !important;
  color: #f87171 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .btn-outline-red[_ngcontent-ng-c2289663177]:hover {
  background: rgba(239, 68, 68, 0.2) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.6) !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]   svg[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]   h3[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .empty-state[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modal-container[_ngcontent-ng-c2289663177] {
  background: #091d24 !important;
  border: 1.5px solid rgba(45, 212, 191, 0.3) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modal-header[_ngcontent-ng-c2289663177] {
  background: rgba(5, 20, 25, 0.9) !important;
  border-bottom: 1px solid rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modal-header[_ngcontent-ng-c2289663177]   h2[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .close-btn[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .close-btn[_ngcontent-ng-c2289663177]:hover {
  color: #f87171 !important;
  background: rgba(239, 68, 68, 0.18) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modal-body[_ngcontent-ng-c2289663177] {
  background: #091d24 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .summary-box[_ngcontent-ng-c2289663177] {
  background: rgba(15, 118, 110, 0.15) !important;
  background-image: none !important;
  border: 1px solid rgba(45, 212, 191, 0.3) !important;
  border-left: 4px solid #2dd4bf !important;
  color: #f8fafc !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .summary-box[_ngcontent-ng-c2289663177]   strong[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .summary-box.pending-summary[_ngcontent-ng-c2289663177] {
  background: rgba(245, 158, 11, 0.15) !important;
  background-image: none !important;
  border: 1px solid rgba(245, 158, 11, 0.35) !important;
  border-left: 4px solid #f59e0b !important;
}
html.dark[_ngcontent-ng-c2289663177]   .summary-box.pending-summary[_ngcontent-ng-c2289663177]   strong[_ngcontent-ng-c2289663177] {
  color: #fbbf24 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .form-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
  font-weight: 550 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .text-red[_ngcontent-ng-c2289663177] {
  color: #f87171 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modern-textarea[_ngcontent-ng-c2289663177] {
  background-color: #051419 !important;
  border: 1.5px solid rgba(45, 212, 191, 0.3) !important;
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modern-textarea[_ngcontent-ng-c2289663177]::placeholder {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modern-textarea[_ngcontent-ng-c2289663177]:focus {
  border-color: #2dd4bf !important;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .helper-text[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .modal-footer[_ngcontent-ng-c2289663177] {
  background-color: #051419 !important;
  background: #051419 !important;
  border-top: 1px solid rgba(45, 212, 191, 0.2) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-text[_ngcontent-ng-c2289663177] {
  background: rgba(15, 118, 110, 0.15) !important;
  border: 1px solid rgba(45, 212, 191, 0.3) !important;
  color: #5eead4 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .btn-text[_ngcontent-ng-c2289663177]:hover {
  background: rgba(45, 212, 191, 0.25) !important;
  color: #ffffff !important;
}
.student-modal[_ngcontent-ng-c2289663177] {
  max-width: 580px;
  width: 90%;
  border-radius: 20px;
}
.student-header-info[_ngcontent-ng-c2289663177] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.student-avatar-lg[_ngcontent-ng-c2289663177] {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      rgba(15, 118, 110, 0.2),
      rgba(20, 184, 166, 0.35));
  color: #0F766E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  border: 2px solid rgba(15, 118, 110, 0.3);
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
}
.matric-badge[_ngcontent-ng-c2289663177] {
  display: inline-block;
  background: rgba(15, 118, 110, 0.1);
  border: 1px solid rgba(15, 118, 110, 0.2);
  color: #0F766E;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  margin-top: 4px;
}
.info-grid[_ngcontent-ng-c2289663177] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.info-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}
.info-group[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177] {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0B191E;
}
.text-teal-val[_ngcontent-ng-c2289663177] {
  color: #0F766E !important;
  font-weight: 700;
}
.student-stats-row[_ngcontent-ng-c2289663177] {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.mini-stat[_ngcontent-ng-c2289663177] {
  flex: 1;
  background: rgba(15, 118, 110, 0.06);
  border: 1px solid rgba(15, 118, 110, 0.15);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat-val[_ngcontent-ng-c2289663177] {
  font-size: 18px;
  font-weight: 800;
  color: #0B191E;
}
.stat-val.text-green[_ngcontent-ng-c2289663177] {
  color: #059669;
}
.stat-lbl[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
}
.last-topic-box[_ngcontent-ng-c2289663177] {
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  padding: 14px 16px;
}
.last-topic-box[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 800;
  color: #0F766E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}
.last-topic-box[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177] {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  font-style: italic;
}
@media (max-width: 1024px) {
  .dashboard-wrapper[_ngcontent-ng-c2289663177] {
    padding: 24px 20px;
  }
  .controls-card[_ngcontent-ng-c2289663177] {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  .search-container[_ngcontent-ng-c2289663177] {
    width: 100%;
  }
  .appointments-grid[_ngcontent-ng-c2289663177] {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .dashboard-wrapper[_ngcontent-ng-c2289663177] {
    padding: 16px 12px;
  }
  .page-title[_ngcontent-ng-c2289663177] {
    font-size: 24px;
  }
  .page-subtitle[_ngcontent-ng-c2289663177] {
    font-size: 13px;
  }
  .tabs-container[_ngcontent-ng-c2289663177] {
    flex-direction: column;
  }
  .tab-btn[_ngcontent-ng-c2289663177] {
    width: 100%;
    justify-content: center;
  }
}
.room-input-container[_ngcontent-ng-c2289663177] {
  margin-top: 4px;
}
.room-input[_ngcontent-ng-c2289663177] {
  padding: 10px 14px;
  font-weight: 600;
  border-color: #cbd5e1;
}
.quick-rooms-wrapper[_ngcontent-ng-c2289663177] {
  margin-top: 10px;
}
.quick-label[_ngcontent-ng-c2289663177] {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 6px;
}
.quick-chips[_ngcontent-ng-c2289663177] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip-btn[_ngcontent-ng-c2289663177] {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.chip-btn[_ngcontent-ng-c2289663177]:hover {
  background: rgba(15, 118, 110, 0.1);
  border-color: #0F766E;
  color: #0F766E;
}
.chip-btn.active[_ngcontent-ng-c2289663177] {
  background: #0F766E;
  border-color: #0F766E;
  color: white;
  box-shadow: 0 2px 6px rgba(15, 118, 110, 0.25);
}
html.dark[_ngcontent-ng-c2289663177]   .student-avatar-lg[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .student-avatar-lg[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .student-avatar-lg[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.2) !important;
  color: #2dd4bf !important;
  border-color: rgba(45, 212, 191, 0.4) !important;
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.25) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .matric-badge[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .matric-badge[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .matric-badge[_ngcontent-ng-c2289663177] {
  background: rgba(45, 212, 191, 0.15) !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .info-group[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .mini-stat[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .mini-stat[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .mini-stat[_ngcontent-ng-c2289663177] {
  background: #051419 !important;
  border-color: rgba(45, 212, 191, 0.25) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .stat-val[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .stat-val[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .stat-val[_ngcontent-ng-c2289663177] {
  color: #ffffff !important;
}
html.dark[_ngcontent-ng-c2289663177]   .stat-val.text-green[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .stat-val.text-green[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .stat-val.text-green[_ngcontent-ng-c2289663177] {
  color: #34d399 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .stat-lbl[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .stat-lbl[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .stat-lbl[_ngcontent-ng-c2289663177] {
  color: #94a3b8 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177] {
  background: #051419 !important;
  border-color: rgba(45, 212, 191, 0.25) !important;
}
html.dark[_ngcontent-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .last-topic-box[_ngcontent-ng-c2289663177]   p[_ngcontent-ng-c2289663177] {
  color: #e2e8f0 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .quick-label[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .quick-label[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .quick-label[_ngcontent-ng-c2289663177] {
  color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177] {
  background: #051419 !important;
  border-color: rgba(45, 212, 191, 0.3) !important;
  color: #cbd5e1 !important;
}
html.dark[_ngcontent-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177]:hover, 
.dark[_nghost-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177]:hover, .dark   [_nghost-ng-c2289663177]   .chip-btn[_ngcontent-ng-c2289663177]:hover {
  background: rgba(45, 212, 191, 0.15) !important;
  color: #2dd4bf !important;
  border-color: #2dd4bf !important;
}
html.dark[_ngcontent-ng-c2289663177]   .chip-btn.active[_ngcontent-ng-c2289663177], 
.dark[_nghost-ng-c2289663177]   .chip-btn.active[_ngcontent-ng-c2289663177], .dark   [_nghost-ng-c2289663177]   .chip-btn.active[_ngcontent-ng-c2289663177] {
  background: #2dd4bf !important;
  color: #020a0d !important;
  border-color: #2dd4bf !important;
  box-shadow: 0 2px 8px rgba(45, 212, 191, 0.3) !important;
  font-weight: 800 !important;
}
/*# sourceMappingURL=/lecturer-appointments.css.map */</style><style ng-app-id="ng">
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
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","input","compositionstart","compositionend"],["blur"]);</script>
  <app-root ng-version="21.2.15" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-lecturer-appointments _nghost-ng-c2289663177="" ngh="1"><div _ngcontent-ng-c2289663177="" class="lecturer-layout"><app-sidebar-lect _ngcontent-ng-c2289663177="" _nghost-ng-c3181499964="" ngh="0"><aside _ngcontent-ng-c3181499964="" class="sidebar"><div _ngcontent-ng-c3181499964="" class="sidebar-header"><div _ngcontent-ng-c3181499964="" class="brand-icon">AL</div><h2 _ngcontent-ng-c3181499964="">ALCAS</h2><span _ngcontent-ng-c3181499964="" class="role-badge lecturer">Lecturer</span></div><nav _ngcontent-ng-c3181499964="" class="sidebar-nav"><a _ngcontent-ng-c3181499964="" routerlink="/lecturer" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span _ngcontent-ng-c3181499964="">Overview</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/schedule" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span _ngcontent-ng-c3181499964="">My Schedule</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/appointments" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span _ngcontent-ng-c3181499964="">Appointments</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/history" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span _ngcontent-ng-c3181499964="">Consultation History</span></a><a _ngcontent-ng-c3181499964="" routerlink="/lecturer/profile" routerlinkactive="active" class="nav-item" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span _ngcontent-ng-c3181499964="">My Profile</span></a><div _ngcontent-ng-c3181499964="" class="notif-sidebar-container"><button _ngcontent-ng-c3181499964="" title="Toggle Quick Drawer Notifications" class="nav-item notif-nav-btn" jsaction="click:;"><div _ngcontent-ng-c3181499964="" class="notif-left"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span _ngcontent-ng-c3181499964="">Notifications</span></div><!--container--><!--container--></button></div><button _ngcontent-ng-c3181499964="" title="Toggle Dark/Light Mode" class="theme-toggle-nav-btn" jsaction="click:;"><!--container--><!--container--></button></nav><div _ngcontent-ng-c3181499964="" class="sidebar-footer"><button _ngcontent-ng-c3181499964="" class="logout-btn" jsaction="click:;"><svg _ngcontent-ng-c3181499964="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3181499964="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c3181499964="">Sign Out</span></button></div></aside><!--container--><div _ngcontent-ng-c3181499964="" class="quick-drawer-panel" jsaction="click:;"><div _ngcontent-ng-c3181499964="" class="drawer-header"><div _ngcontent-ng-c3181499964="" class="drawer-title-area"><div _ngcontent-ng-c3181499964="" class="title-with-badge"><h3 _ngcontent-ng-c3181499964="">Notifications</h3><!--container--></div><p _ngcontent-ng-c3181499964="" class="drawer-subtitle">Manage student requests and consultation updates</p></div><div _ngcontent-ng-c3181499964="" class="drawer-header-actions"><div _ngcontent-ng-c3181499964="" title="Toggle Notifications On/Off" class="notif-switch-box" jsaction="click:;"><span _ngcontent-ng-c3181499964="" class="switch-label"><!--ngetn--></span><div _ngcontent-ng-c3181499964="" class="toggle-pill"><span _ngcontent-ng-c3181499964="" class="toggle-thumb"></span></div></div><button _ngcontent-ng-c3181499964="" title="Close Drawer" class="drawer-close-btn" jsaction="click:;">×</button></div></div><!--container--><div _ngcontent-ng-c3181499964="" class="drawer-body"><!--container--><!--container--></div></div></app-sidebar-lect><main _ngcontent-ng-c2289663177="" class="main-content dashboard-modern-bg"><div _ngcontent-ng-c2289663177="" class="dashboard-wrapper"><div _ngcontent-ng-c2289663177="" class="dashboard-header flex-between"><div _ngcontent-ng-c2289663177=""><h1 _ngcontent-ng-c2289663177="" class="page-title">Manage Appointments</h1><p _ngcontent-ng-c2289663177="" class="page-subtitle">Review pending requests and manage your upcoming consultations.</p></div></div><div _ngcontent-ng-c2289663177="" class="glass-card controls-card"><div _ngcontent-ng-c2289663177="" class="tabs-container"><button _ngcontent-ng-c2289663177="" class="tab-btn" jsaction="click:;"> Pending Requests <!--container--></button><button _ngcontent-ng-c2289663177="" class="tab-btn" jsaction="click:;"> Upcoming Sessions </button></div><div _ngcontent-ng-c2289663177="" class="search-container"><svg _ngcontent-ng-c2289663177="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="search-icon"><path _ngcontent-ng-c2289663177="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input _ngcontent-ng-c2289663177="" type="text" placeholder="Search student name or matric..." class="search-input" jsaction="input:;blur:;compositionstart:;compositionend:;"></div></div><div _ngcontent-ng-c2289663177="" class="appointments-grid"><!--container--><!--container--></div></div></main><!--container--><!--container--></div></app-lecturer-appointments><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"41":"t7","42":"t8","44":"t9","45":"t10","52":"t11","59":"t12","70":"t13","72":"t14","73":"t15"},"c":{"41":[],"42":[],"44":[],"45":[],"52":[],"59":[],"70":[],"72":[],"73":[]}},{"t":{"14":"t18","22":"t19","23":"t20","24":"t21","25":"t22"},"c":{"14":[],"22":[],"23":[],"24":[],"25":[]}},{"c":{"0":[{"i":"c2289663177","r":1}]}}]}</script></body></html>`;