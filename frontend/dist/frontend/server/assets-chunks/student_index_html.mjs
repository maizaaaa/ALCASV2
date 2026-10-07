export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
.fade-in-up[_ngcontent-ng-c421433301] {
  animation: _ngcontent-ng-c421433301_fadeInUp 0.4s ease-out forwards;
}
@keyframes _ngcontent-ng-c421433301_fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/*# sourceMappingURL=/student-dashboard.css.map */</style><style ng-app-id="ng">@import "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";


[_nghost-ng-c3809052639] {
  display: block;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.student-navbar[_ngcontent-ng-c3809052639] {
  background:
    linear-gradient(
      135deg,
      #0F766E 0%,
      #0b554f 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(15, 118, 110, 0.25);
  padding: 0 24px;
  transition: all 0.3s ease;
}
.navbar-container[_ngcontent-ng-c3809052639] {
  max-width: 1280px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.brand-section[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-icon[_ngcontent-ng-c3809052639] {
  width: 40px;
  height: 40px;
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #ccfbf1);
  color: #0F766E;
  font-weight: 800;
  font-size: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.brand-text[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-title[_ngcontent-ng-c3809052639] {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
}
.role-badge.student[_ngcontent-ng-c3809052639] {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: rgba(252, 194, 94, 0.2) !important;
  color: #ffc156 !important;
  border: 1px solid rgb(252, 194, 94) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.desktop-nav[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-item[_ngcontent-ng-c3809052639] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.nav-icon[_ngcontent-ng-c3809052639] {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}
.nav-item[_ngcontent-ng-c3809052639]:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.12);
}
.nav-item.active[_ngcontent-ng-c3809052639] {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.35);
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.controls-section[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 16px;
}
.theme-toggle-btn[_ngcontent-ng-c3809052639] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.theme-toggle-btn[_ngcontent-ng-c3809052639]:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
.control-icon[_ngcontent-ng-c3809052639] {
  width: 18px;
  height: 18px;
}
.user-profile-badge[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 15px;
  transition: background 0.2s;
}
.user-profile-badge[_ngcontent-ng-c3809052639]:hover {
  background: rgba(255, 255, 255, 0.1);
}
.avatar-circle[_ngcontent-ng-c3809052639] {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #ccfbf1);
  color: #0F766E;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.user-name[_ngcontent-ng-c3809052639] {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}
.logout-btn[_ngcontent-ng-c3809052639] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid rgba(254, 202, 202, 0.3);
  border-radius: 10px;
  color: #fecaca;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.logout-btn[_ngcontent-ng-c3809052639]:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: #f87171;
  color: #ffffff;
}
.hamburger-btn[_ngcontent-ng-c3809052639] {
  display: none;
  padding: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}
.hamburger-btn[_ngcontent-ng-c3809052639]:hover {
  background: rgba(255, 255, 255, 0.15);
}
.mobile-drawer[_ngcontent-ng-c3809052639] {
  display: none;
  background-color: #0b554f;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 0;
}
.mobile-nav[_ngcontent-ng-c3809052639] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mobile-nav-item[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
}
.mobile-nav-item[_ngcontent-ng-c3809052639]:hover, 
.mobile-nav-item.active[_ngcontent-ng-c3809052639] {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-weight: 700;
}
.dark[_nghost-ng-c3809052639]   .student-navbar[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .student-navbar[_ngcontent-ng-c3809052639] {
  background: #0B191E !important;
  border-bottom: 1px solid rgba(45, 212, 191, 0.2) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}
.dark[_nghost-ng-c3809052639]   .brand-icon[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .brand-icon[_ngcontent-ng-c3809052639] {
  background:
    linear-gradient(
      135deg,
      #14b8a6,
      #115e59) !important;
  color: #ffffff !important;
}
.dark[_nghost-ng-c3809052639]   .role-badge.student[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .role-badge.student[_ngcontent-ng-c3809052639] {
  background-color: rgba(254, 240, 138, 0.15) !important;
  color: #fef08a !important;
  border-color: rgba(254, 240, 138, 0.4) !important;
}
.dark[_nghost-ng-c3809052639]   .nav-item[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .nav-item[_ngcontent-ng-c3809052639] {
  color: #94a3b8;
}
.dark[_nghost-ng-c3809052639]   .nav-item[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .nav-item[_ngcontent-ng-c3809052639]:hover {
  color: #2dd4bf;
  background-color: rgba(45, 212, 191, 0.08);
}
.dark[_nghost-ng-c3809052639]   .nav-item.active[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .nav-item.active[_ngcontent-ng-c3809052639] {
  background-color: rgba(45, 212, 191, 0.15) !important;
  color: #2dd4bf !important;
  border: 1px solid rgba(45, 212, 191, 0.3) !important;
  border-left: 1px solid rgba(45, 212, 191, 0.3) !important;
  box-shadow: none !important;
}
.dark[_nghost-ng-c3809052639]   .theme-toggle-btn[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .theme-toggle-btn[_ngcontent-ng-c3809052639] {
  background: rgba(45, 212, 191, 0.1) !important;
  border-color: rgba(45, 212, 191, 0.25) !important;
  color: #2dd4bf !important;
}
.dark[_nghost-ng-c3809052639]   .theme-toggle-btn[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .theme-toggle-btn[_ngcontent-ng-c3809052639]:hover {
  background: rgba(45, 212, 191, 0.2) !important;
  border-color: #2dd4bf !important;
  color: #ffffff !important;
}
.dark[_nghost-ng-c3809052639]   .avatar-circle[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .avatar-circle[_ngcontent-ng-c3809052639] {
  background: #0d9488 !important;
  color: #ffffff !important;
}
.dark[_nghost-ng-c3809052639]   .logout-btn[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .logout-btn[_ngcontent-ng-c3809052639] {
  border-color: rgba(251, 113, 133, 0.4) !important;
  color: #fda4af !important;
}
.dark[_nghost-ng-c3809052639]   .logout-btn[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .logout-btn[_ngcontent-ng-c3809052639]:hover {
  background-color: rgba(244, 63, 94, 0.2) !important;
  border-color: #fb7185 !important;
  color: #ffffff !important;
}
.dark[_nghost-ng-c3809052639]   .mobile-drawer[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .mobile-drawer[_ngcontent-ng-c3809052639] {
  background-color: #0B191E !important;
}
.notif-wrapper[_ngcontent-ng-c3809052639] {
  position: relative;
  display: inline-block;
}
.notif-toggle-btn[_ngcontent-ng-c3809052639] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.notif-toggle-btn[_ngcontent-ng-c3809052639]:hover, 
.notif-toggle-btn.active[_ngcontent-ng-c3809052639] {
  background: rgba(255, 255, 255, 0.22);
  border-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
.notif-toggle-btn.muted[_ngcontent-ng-c3809052639] {
  opacity: 0.75;
}
.notif-badge[_ngcontent-ng-c3809052639] {
  position: absolute;
  top: -4px;
  right: -4px;
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
  padding: 0 4px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0F766E;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
  animation: _ngcontent-ng-c3809052639_pulse-badge 2s infinite;
}
@keyframes _ngcontent-ng-c3809052639_pulse-badge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.notif-muted-dot[_ngcontent-ng-c3809052639] {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background-color: #94a3b8;
  border-radius: 50%;
  border: 1px solid #0F766E;
}
.notif-dropdown[_ngcontent-ng-c3809052639] {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 340px;
  background: #ffffff;
  border: 1px solid rgba(15, 118, 110, 0.15);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  z-index: 200;
  animation: _ngcontent-ng-c3809052639_fadeInDown 0.2s ease-out;
}
@keyframes _ngcontent-ng-c3809052639_fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.notif-dropdown-header[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.notif-header-title[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-text[_ngcontent-ng-c3809052639] {
  font-weight: 700;
  font-size: 15px;
  color: #0f172a;
}
.unread-pill[_ngcontent-ng-c3809052639] {
  font-size: 11px;
  font-weight: 700;
  background: #ccfbf1;
  color: #0f766e;
  padding: 2px 8px;
  border-radius: 12px;
}
.notif-switch-box[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.switch-label[_ngcontent-ng-c3809052639] {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}
.toggle-pill[_ngcontent-ng-c3809052639] {
  width: 36px;
  height: 20px;
  background-color: #cbd5e1;
  border-radius: 999px;
  padding: 2px;
  transition: background-color 0.25s ease;
  display: flex;
  align-items: center;
}
.toggle-pill.on[_ngcontent-ng-c3809052639] {
  background-color: #0f766e;
}
.toggle-thumb[_ngcontent-ng-c3809052639] {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease;
}
.toggle-pill.on[_ngcontent-ng-c3809052639]   .toggle-thumb[_ngcontent-ng-c3809052639] {
  transform: translateX(16px);
}
.notif-actions-bar[_ngcontent-ng-c3809052639] {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
}
.notif-action-btn[_ngcontent-ng-c3809052639] {
  background: none;
  border: none;
  color: #0f766e;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.notif-action-btn[_ngcontent-ng-c3809052639]:hover:not(:disabled) {
  color: #115e59;
  text-decoration: underline;
}
.notif-action-btn[_ngcontent-ng-c3809052639]:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}
.notif-dropdown-body[_ngcontent-ng-c3809052639] {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}
.notif-card[_ngcontent-ng-c3809052639] {
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
.notif-card[_ngcontent-ng-c3809052639]:hover {
  background: #f8fafc;
}
.notif-card.unread[_ngcontent-ng-c3809052639] {
  background: #f0fdf4;
  border-left-color: #0f766e;
}
.notif-card-icon[_ngcontent-ng-c3809052639] {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.notif-card-icon.appointment[_ngcontent-ng-c3809052639] {
  background: #ccfbf1;
  color: #0f766e;
}
.notif-card-icon.reminder[_ngcontent-ng-c3809052639] {
  background: #fef3c7;
  color: #d97706;
}
.notif-card-icon.system[_ngcontent-ng-c3809052639] {
  background: #e0f2fe;
  color: #0284c7;
}
.card-icon[_ngcontent-ng-c3809052639] {
  width: 18px;
  height: 18px;
}
.notif-card-info[_ngcontent-ng-c3809052639] {
  flex: 1;
  min-width: 0;
}
.notif-card-top[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 2px;
}
.notif-card-title[_ngcontent-ng-c3809052639] {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.notif-card-time[_ngcontent-ng-c3809052639] {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
}
.notif-card-msg[_ngcontent-ng-c3809052639] {
  font-size: 12px;
  color: #475569;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.notif-dismiss-btn[_ngcontent-ng-c3809052639] {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}
.notif-dismiss-btn[_ngcontent-ng-c3809052639]:hover {
  color: #ef4444;
}
.notif-empty-state[_ngcontent-ng-c3809052639] {
  text-align: center;
  padding: 24px 16px;
}
.empty-icon-wrap[_ngcontent-ng-c3809052639] {
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
.empty-icon[_ngcontent-ng-c3809052639] {
  width: 22px;
  height: 22px;
}
.empty-title[_ngcontent-ng-c3809052639] {
  font-weight: 700;
  font-size: 14px;
  color: #334155;
  margin: 0 0 4px;
}
.empty-desc[_ngcontent-ng-c3809052639] {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 12px;
}
.enable-notif-btn[_ngcontent-ng-c3809052639] {
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
.enable-notif-btn[_ngcontent-ng-c3809052639]:hover {
  background: #115e59;
}
.notif-mobile-row[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.mobile-notif-left[_ngcontent-ng-c3809052639] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dark[_nghost-ng-c3809052639]   .notif-toggle-btn[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-toggle-btn[_ngcontent-ng-c3809052639] {
  background: rgba(45, 212, 191, 0.1) !important;
  border-color: rgba(45, 212, 191, 0.25) !important;
  color: #2dd4bf !important;
}
.dark[_nghost-ng-c3809052639]   .notif-toggle-btn[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .notif-toggle-btn[_ngcontent-ng-c3809052639]:hover, 
.dark[_nghost-ng-c3809052639]   .notif-toggle-btn.active[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-toggle-btn.active[_ngcontent-ng-c3809052639] {
  background: rgba(45, 212, 191, 0.2) !important;
  border-color: #2dd4bf !important;
  color: #ffffff !important;
}
.dark[_nghost-ng-c3809052639]   .notif-badge[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-badge[_ngcontent-ng-c3809052639] {
  border-color: #0B191E;
}
.dark[_nghost-ng-c3809052639]   .notif-dropdown[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-dropdown[_ngcontent-ng-c3809052639] {
  background: #132329;
  border-color: rgba(45, 212, 191, 0.2);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
}
.dark[_nghost-ng-c3809052639]   .notif-dropdown-header[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-dropdown-header[_ngcontent-ng-c3809052639] {
  background: #0f1c21;
  border-bottom-color: rgba(45, 212, 191, 0.15);
}
.dark[_nghost-ng-c3809052639]   .title-text[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .title-text[_ngcontent-ng-c3809052639] {
  color: #f1f5f9;
}
.dark[_nghost-ng-c3809052639]   .unread-pill[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .unread-pill[_ngcontent-ng-c3809052639] {
  background: rgba(45, 212, 191, 0.2);
  color: #2dd4bf;
}
.dark[_nghost-ng-c3809052639]   .switch-label[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .switch-label[_ngcontent-ng-c3809052639] {
  color: #94a3b8;
}
.dark[_nghost-ng-c3809052639]   .toggle-pill[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .toggle-pill[_ngcontent-ng-c3809052639] {
  background-color: #334155;
}
.dark[_nghost-ng-c3809052639]   .toggle-pill.on[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .toggle-pill.on[_ngcontent-ng-c3809052639] {
  background-color: #2dd4bf;
}
.dark[_nghost-ng-c3809052639]   .toggle-pill.on[_ngcontent-ng-c3809052639]   .toggle-thumb[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .toggle-pill.on[_ngcontent-ng-c3809052639]   .toggle-thumb[_ngcontent-ng-c3809052639] {
  background-color: #0f1c21;
}
.dark[_nghost-ng-c3809052639]   .notif-actions-bar[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-actions-bar[_ngcontent-ng-c3809052639] {
  background: #132329;
  border-bottom-color: rgba(45, 212, 191, 0.1);
}
.dark[_nghost-ng-c3809052639]   .notif-action-btn[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-action-btn[_ngcontent-ng-c3809052639] {
  color: #2dd4bf;
}
.dark[_nghost-ng-c3809052639]   .notif-card[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-card[_ngcontent-ng-c3809052639] {
  background: #192c33;
}
.dark[_nghost-ng-c3809052639]   .notif-card[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .notif-card[_ngcontent-ng-c3809052639]:hover {
  background: #1f353e;
}
.dark[_nghost-ng-c3809052639]   .notif-card.unread[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-card.unread[_ngcontent-ng-c3809052639] {
  background: #143236;
  border-left-color: #2dd4bf;
}
.dark[_nghost-ng-c3809052639]   .notif-card-title[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-card-title[_ngcontent-ng-c3809052639] {
  color: #f8fafc;
}
.dark[_nghost-ng-c3809052639]   .notif-card-msg[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .notif-card-msg[_ngcontent-ng-c3809052639] {
  color: #cbd5e1;
}
.dark[_nghost-ng-c3809052639]   .empty-icon-wrap[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .empty-icon-wrap[_ngcontent-ng-c3809052639] {
  background: #192c33;
  color: #64748b;
}
.dark[_nghost-ng-c3809052639]   .empty-title[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .empty-title[_ngcontent-ng-c3809052639] {
  color: #f1f5f9;
}
.dark[_nghost-ng-c3809052639]   .empty-desc[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .empty-desc[_ngcontent-ng-c3809052639] {
  color: #94a3b8;
}
.dark[_nghost-ng-c3809052639]   .enable-notif-btn[_ngcontent-ng-c3809052639], .dark   [_nghost-ng-c3809052639]   .enable-notif-btn[_ngcontent-ng-c3809052639] {
  background: #2dd4bf;
  color: #0B191E;
}
.dark[_nghost-ng-c3809052639]   .enable-notif-btn[_ngcontent-ng-c3809052639]:hover, .dark   [_nghost-ng-c3809052639]   .enable-notif-btn[_ngcontent-ng-c3809052639]:hover {
  background: #14b8a6;
}
@media (max-width: 1024px) {
  .user-name[_ngcontent-ng-c3809052639], 
   .btn-label[_ngcontent-ng-c3809052639] {
    display: none;
  }
  .theme-toggle-btn[_ngcontent-ng-c3809052639], 
   .logout-btn[_ngcontent-ng-c3809052639] {
    padding: 8px;
  }
}
@media (max-width: 768px) {
  .desktop-nav[_ngcontent-ng-c3809052639] {
    display: none;
  }
  .hamburger-btn[_ngcontent-ng-c3809052639] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .mobile-drawer[_ngcontent-ng-c3809052639] {
    display: block;
  }
  .notif-dropdown[_ngcontent-ng-c3809052639] {
    width: 300px;
    right: -40px;
  }
}
/*# sourceMappingURL=/navbar-student.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>
  <app-root ng-version="21.2.15" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-student-dashboard _nghost-ng-c421433301="" ngh="1"><div _ngcontent-ng-c421433301="" class="min-h-screen relative overflow-x-hidden font-sans text-slate-800 dark:text-slate-100 flex flex-col student-dashboard-bg"><div _ngcontent-ng-c421433301="" class="fixed inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-30"><div _ngcontent-ng-c421433301="" class="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-teal-400/80 rounded-full blur-[120px]"></div><div _ngcontent-ng-c421433301="" class="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-cyan-400/60 rounded-full blur-[120px]"></div><div _ngcontent-ng-c421433301="" class="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-emerald-400/60 rounded-full blur-[120px]"></div></div><div _ngcontent-ng-c421433301="" class="relative z-10 flex flex-col min-h-screen"><app-navbar-student _ngcontent-ng-c421433301="" _nghost-ng-c3809052639="" ngh="0"><header _ngcontent-ng-c3809052639="" class="student-navbar"><div _ngcontent-ng-c3809052639="" class="navbar-container"><div _ngcontent-ng-c3809052639="" class="brand-section"><div _ngcontent-ng-c3809052639="" class="brand-icon">CE</div><div _ngcontent-ng-c3809052639="" class="brand-text"><span _ngcontent-ng-c3809052639="" class="brand-title">ConsultEase</span><span _ngcontent-ng-c3809052639="" class="role-badge student">Student</span></div></div><nav _ngcontent-ng-c3809052639="" class="desktop-nav"><a _ngcontent-ng-c3809052639="" routerlink="/student" routerlinkactive="active" class="nav-item active" href="/student" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span _ngcontent-ng-c3809052639="">My Schedule</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/book" routerlinkactive="active" class="nav-item" href="/student/book" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg><span _ngcontent-ng-c3809052639="">Booking</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/history" routerlinkactive="active" class="nav-item" href="/student/history" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c3809052639="">History</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/setting" routerlinkactive="active" class="nav-item" href="/student/setting" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c3809052639="">Settings</span></a></nav><div _ngcontent-ng-c3809052639="" class="controls-section"><a _ngcontent-ng-c3809052639="" routerlink="/student/profile" title="My Profile" class="user-profile-badge" href="/student/profile" jsaction="click:;"><div _ngcontent-ng-c3809052639="" class="avatar-circle">A</div><span _ngcontent-ng-c3809052639="" class="user-name">Ahmad Razak</span></a><div _ngcontent-ng-c3809052639="" class="notif-wrapper"><button _ngcontent-ng-c3809052639="" title="Notifications" class="notif-toggle-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span _ngcontent-ng-c3809052639="" class="notif-badge">2</span><!--container--><!--container--></button><!--container--></div><button _ngcontent-ng-c3809052639="" title="Toggle Dark/Light Mode" class="theme-toggle-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg><!--ng-container--><!--container--><!--container--></button><button _ngcontent-ng-c3809052639="" title="Sign Out" class="logout-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c3809052639="" class="btn-label">Sign Out</span></button><button _ngcontent-ng-c3809052639="" title="Toggle Navigation Menu" class="hamburger-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><!--container--><!--container--></svg></button></div></div><!--container--></header></app-navbar-student><main _ngcontent-ng-c421433301="" class="max-w-7xl mx-auto w-full p-10 flex-1 box-border"><div _ngcontent-ng-c421433301="" class="flex justify-between items-end mb-8 relative"><div _ngcontent-ng-c421433301=""><h1 _ngcontent-ng-c421433301="" class="text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-teal-800 dark:from-white dark:via-white dark:to-cyan-200 bg-clip-text text-transparent tracking-tight mb-1"> Weekly Schedule</h1><p _ngcontent-ng-c421433301="" class="text-teal-600 dark:text-teal-400 font-bold opacity-80 flex items-center gap-2"><svg _ngcontent-ng-c421433301="" fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4"><path _ngcontent-ng-c421433301="" fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1v-1a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> May 8 - May 12, 2026 </p></div><button _ngcontent-ng-c421433301="" routerlink="/student/book" class="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-teal-500/20 dark:shadow-teal-950/30 transition-all transform hover:-translate-y-1" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> Search &amp; Book </button></div><div _ngcontent-ng-c421433301="" class="hybrid-calendar-card bg-white/95 dark:bg-[#071317]/80 backdrop-blur-2xl border border-slate-100 dark:border-teal-900/40 shadow-[0_15px_50px_rgba(15,118,110,0.06)] dark:shadow-[0_10px_40px_rgba(45,212,191,0.05)] rounded-[2rem] overflow-hidden"><div _ngcontent-ng-c421433301="" class="grid grid-cols-5 min-h-[600px]"><div _ngcontent-ng-c421433301="" class="flex flex-col relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-slate-100 dark:after:bg-teal-900/20 last:after:hidden"><div _ngcontent-ng-c421433301="" class="p-5 text-center bg-slate-50/40 dark:bg-[#09151A]/60 border-b border-slate-100 dark:border-teal-900/20"><h3 _ngcontent-ng-c421433301="" class="text-xs font-black text-slate-500 dark:text-teal-400 uppercase tracking-widest">Monday</h3></div><div _ngcontent-ng-c421433301="" class="p-4 flex-1 flex flex-col gap-4"><div _ngcontent-ng-c421433301="" routerlink="/student/history" class="fade-in-up group relative p-5 rounded-3xl shadow-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer overflow-hidden bg-emerald-50 border-emerald-100/80 text-emerald-950 dark:bg-teal-950/40 dark:border-teal-800/60 dark:text-teal-200" tabindex="0" jsaction="click:;"><div _ngcontent-ng-c421433301="" class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-30 dark:opacity-20 blur-2xl transition-all group-hover:scale-150 bg-emerald-400 dark:bg-teal-500"></div><div _ngcontent-ng-c421433301="" class="relative z-10"><div _ngcontent-ng-c421433301="" class="text-xs font-black opacity-60 mb-2 flex items-center gap-1.5"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-3.5 h-3.5"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 10:00 AM - 11:00 AM </div><div _ngcontent-ng-c421433301="" class="text-[15px] font-extrabold mb-1 tracking-tight leading-snug">Dr. Ahmad Fauzi</div><div _ngcontent-ng-c421433301="" class="text-[13px] font-bold opacity-75 mb-4">FYP Advising</div><span _ngcontent-ng-c421433301="" class="inline-block px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-sm bg-emerald-200/80 text-emerald-900 border border-emerald-300/80 dark:bg-teal-900/80 dark:text-teal-200 dark:border-teal-700/80"> CONFIRMED </span></div></div><!--container--><!--container--></div></div><div _ngcontent-ng-c421433301="" class="flex flex-col relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-slate-100 dark:after:bg-teal-900/20 last:after:hidden"><div _ngcontent-ng-c421433301="" class="p-5 text-center bg-slate-50/40 dark:bg-[#09151A]/60 border-b border-slate-100 dark:border-teal-900/20"><h3 _ngcontent-ng-c421433301="" class="text-xs font-black text-slate-500 dark:text-teal-400 uppercase tracking-widest">Tuesday</h3></div><div _ngcontent-ng-c421433301="" class="p-4 flex-1 flex flex-col gap-4"><!--container--><div _ngcontent-ng-c421433301="" routerlink="/student/book" class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200/60 dark:border-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800/60 rounded-3xl p-6 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/20 dark:hover:bg-teal-950/10 transition-all duration-300 cursor-pointer group/empty min-h-[160px]" tabindex="0" jsaction="click:;"><div _ngcontent-ng-c421433301="" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center mb-2 group-hover/empty:bg-teal-50 dark:group-hover/empty:bg-teal-950 transition-colors"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-slate-400 group-hover/empty:text-teal-600 dark:group-hover/empty:text-teal-400 group-hover/empty:rotate-90 transition-transform duration-300"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></div><span _ngcontent-ng-c421433301="" class="text-[10px] font-black uppercase tracking-wider">Book Session</span></div><!--container--></div></div><div _ngcontent-ng-c421433301="" class="flex flex-col relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-slate-100 dark:after:bg-teal-900/20 last:after:hidden"><div _ngcontent-ng-c421433301="" class="p-5 text-center bg-slate-50/40 dark:bg-[#09151A]/60 border-b border-slate-100 dark:border-teal-900/20"><h3 _ngcontent-ng-c421433301="" class="text-xs font-black text-slate-500 dark:text-teal-400 uppercase tracking-widest">Wednesday</h3></div><div _ngcontent-ng-c421433301="" class="p-4 flex-1 flex flex-col gap-4"><div _ngcontent-ng-c421433301="" routerlink="/student/history" class="fade-in-up group relative p-5 rounded-3xl shadow-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer overflow-hidden bg-orange-50 border-orange-100/80 text-orange-950 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200" tabindex="0" jsaction="click:;"><div _ngcontent-ng-c421433301="" class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-30 dark:opacity-20 blur-2xl transition-all group-hover:scale-150 bg-orange-400 dark:bg-amber-500"></div><div _ngcontent-ng-c421433301="" class="relative z-10"><div _ngcontent-ng-c421433301="" class="text-xs font-black opacity-60 mb-2 flex items-center gap-1.5"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-3.5 h-3.5"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 02:00 PM - 03:00 PM </div><div _ngcontent-ng-c421433301="" class="text-[15px] font-extrabold mb-1 tracking-tight leading-snug">Prof. Sarah Tan</div><div _ngcontent-ng-c421433301="" class="text-[13px] font-bold opacity-75 mb-4">Career Advice</div><span _ngcontent-ng-c421433301="" class="inline-block px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-sm bg-orange-200/80 text-orange-900 border border-orange-300/80 dark:bg-amber-900/80 dark:text-amber-200 dark:border-amber-700/80"> PENDING </span></div></div><!--container--><!--container--></div></div><div _ngcontent-ng-c421433301="" class="flex flex-col relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-slate-100 dark:after:bg-teal-900/20 last:after:hidden"><div _ngcontent-ng-c421433301="" class="p-5 text-center bg-slate-50/40 dark:bg-[#09151A]/60 border-b border-slate-100 dark:border-teal-900/20"><h3 _ngcontent-ng-c421433301="" class="text-xs font-black text-slate-500 dark:text-teal-400 uppercase tracking-widest">Thursday</h3></div><div _ngcontent-ng-c421433301="" class="p-4 flex-1 flex flex-col gap-4"><!--container--><div _ngcontent-ng-c421433301="" routerlink="/student/book" class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200/60 dark:border-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800/60 rounded-3xl p-6 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/20 dark:hover:bg-teal-950/10 transition-all duration-300 cursor-pointer group/empty min-h-[160px]" tabindex="0" jsaction="click:;"><div _ngcontent-ng-c421433301="" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center mb-2 group-hover/empty:bg-teal-50 dark:group-hover/empty:bg-teal-950 transition-colors"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-slate-400 group-hover/empty:text-teal-600 dark:group-hover/empty:text-teal-400 group-hover/empty:rotate-90 transition-transform duration-300"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></div><span _ngcontent-ng-c421433301="" class="text-[10px] font-black uppercase tracking-wider">Book Session</span></div><!--container--></div></div><div _ngcontent-ng-c421433301="" class="flex flex-col relative after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-slate-100 dark:after:bg-teal-900/20 last:after:hidden"><div _ngcontent-ng-c421433301="" class="p-5 text-center bg-slate-50/40 dark:bg-[#09151A]/60 border-b border-slate-100 dark:border-teal-900/20"><h3 _ngcontent-ng-c421433301="" class="text-xs font-black text-slate-500 dark:text-teal-400 uppercase tracking-widest">Friday</h3></div><div _ngcontent-ng-c421433301="" class="p-4 flex-1 flex flex-col gap-4"><div _ngcontent-ng-c421433301="" routerlink="/student/history" class="fade-in-up group relative p-5 rounded-3xl shadow-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer overflow-hidden bg-emerald-50 border-emerald-100/80 text-emerald-950 dark:bg-teal-950/40 dark:border-teal-800/60 dark:text-teal-200" tabindex="0" jsaction="click:;"><div _ngcontent-ng-c421433301="" class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-30 dark:opacity-20 blur-2xl transition-all group-hover:scale-150 bg-emerald-400 dark:bg-teal-500"></div><div _ngcontent-ng-c421433301="" class="relative z-10"><div _ngcontent-ng-c421433301="" class="text-xs font-black opacity-60 mb-2 flex items-center gap-1.5"><svg _ngcontent-ng-c421433301="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-3.5 h-3.5"><path _ngcontent-ng-c421433301="" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 09:00 AM - 10:00 AM </div><div _ngcontent-ng-c421433301="" class="text-[15px] font-extrabold mb-1 tracking-tight leading-snug">Dr. Ramesh</div><div _ngcontent-ng-c421433301="" class="text-[13px] font-bold opacity-75 mb-4">Exam Review</div><span _ngcontent-ng-c421433301="" class="inline-block px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-sm bg-emerald-200/80 text-emerald-900 border border-emerald-300/80 dark:bg-teal-900/80 dark:text-teal-200 dark:border-teal-700/80"> CONFIRMED </span></div></div><!--container--><!--container--></div></div><!--container--></div></div></main></div></div></app-student-dashboard><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"41":"t12","42":"t13","43":"t14","45":"t15","46":"t16","54":"t17","55":"t18","56":"t19"},"c":{"41":[{"i":"t12","r":1}],"42":[],"43":[],"45":[{"i":"t15","r":2,"e":{"0":1}}],"46":[],"54":[{"i":"t17","r":1}],"55":[],"56":[]}},{"t":{"22":"t20"},"c":{"22":[{"i":"t20","r":1,"t":{"5":"t21","6":"t22"},"c":{"5":[{"i":"t21","r":1}],"6":[]}},{"i":"t20","r":1,"t":{"5":"t21","6":"t22"},"c":{"5":[],"6":[{"i":"t22","r":1}]}},{"i":"t20","r":1,"t":{"5":"t21","6":"t22"},"c":{"5":[{"i":"t21","r":1}],"6":[]}},{"i":"t20","r":1,"t":{"5":"t21","6":"t22"},"c":{"5":[],"6":[{"i":"t22","r":1}]}},{"i":"t20","r":1,"t":{"5":"t21","6":"t22"},"c":{"5":[{"i":"t21","r":1}],"6":[]}}]}},{"c":{"0":[{"i":"c421433301","r":1}]}}]}</script></body></html>`;