export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" as="style"><style ng-app-id="ng">
[_nghost-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
}
.student-card[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.lecturer-avatar[_ngcontent-ng-c392957778] {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-weight: 800 !important;
  font-size: 17px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lecturer-name[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  letter-spacing: -0.3px !important;
}
.consultation-reason[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  line-height: 1.45 !important;
}
.date-text[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 13px !important;
  font-weight: 700 !important;
}
.time-text[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}
.location-pill[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  line-height: 1.4 !important;
}
.status-pill[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}
.modal-section-title[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  letter-spacing: -0.3px !important;
}
.modal-label[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}
.modal-val[_ngcontent-ng-c392957778] {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
}
/*# sourceMappingURL=/student-appointments.css.map */</style><style ng-app-id="ng">@import "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";


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
  <app-root ng-version="21.2.15" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-student-appointments _nghost-ng-c392957778="" ngh="1"><div _ngcontent-ng-c392957778="" class="min-h-screen relative overflow-x-hidden font-sans text-slate-800 dark:text-slate-100 flex flex-col student-dashboard-bg"><div _ngcontent-ng-c392957778="" class="fixed inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-30"><div _ngcontent-ng-c392957778="" class="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-teal-400/80 rounded-full blur-[120px]"></div><div _ngcontent-ng-c392957778="" class="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-cyan-400/60 rounded-full blur-[120px]"></div><div _ngcontent-ng-c392957778="" class="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-emerald-400/60 rounded-full blur-[120px]"></div></div><div _ngcontent-ng-c392957778="" class="relative z-10 flex flex-col min-h-screen"><app-navbar-student _ngcontent-ng-c392957778="" _nghost-ng-c3809052639="" ngh="0"><header _ngcontent-ng-c3809052639="" class="student-navbar"><div _ngcontent-ng-c3809052639="" class="navbar-container"><div _ngcontent-ng-c3809052639="" class="brand-section"><div _ngcontent-ng-c3809052639="" class="brand-icon">CE</div><div _ngcontent-ng-c3809052639="" class="brand-text"><span _ngcontent-ng-c3809052639="" class="brand-title">ConsultEase</span><span _ngcontent-ng-c3809052639="" class="role-badge student">Student</span></div></div><nav _ngcontent-ng-c3809052639="" class="desktop-nav"><a _ngcontent-ng-c3809052639="" routerlink="/student" routerlinkactive="active" class="nav-item" href="/student" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span _ngcontent-ng-c3809052639="">My Schedule</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/book" routerlinkactive="active" class="nav-item" href="/student/book" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg><span _ngcontent-ng-c3809052639="">Booking</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/history" routerlinkactive="active" class="nav-item active" href="/student/history" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c3809052639="">History</span></a><a _ngcontent-ng-c3809052639="" routerlink="/student/setting" routerlinkactive="active" class="nav-item" href="/student/setting" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="nav-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c3809052639="">Settings</span></a></nav><div _ngcontent-ng-c3809052639="" class="controls-section"><a _ngcontent-ng-c3809052639="" routerlink="/student/profile" title="My Profile" class="user-profile-badge" href="/student/profile" jsaction="click:;"><div _ngcontent-ng-c3809052639="" class="avatar-circle">A</div><span _ngcontent-ng-c3809052639="" class="user-name">Ahmad Razak</span></a><div _ngcontent-ng-c3809052639="" class="notif-wrapper"><button _ngcontent-ng-c3809052639="" title="Notifications" class="notif-toggle-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span _ngcontent-ng-c3809052639="" class="notif-badge">2</span><!--container--><!--container--></button><!--container--></div><button _ngcontent-ng-c3809052639="" title="Toggle Dark/Light Mode" class="theme-toggle-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg><!--ng-container--><!--container--><!--container--></button><button _ngcontent-ng-c3809052639="" title="Sign Out" class="logout-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c3809052639="" class="btn-label">Sign Out</span></button><button _ngcontent-ng-c3809052639="" title="Toggle Navigation Menu" class="hamburger-btn" jsaction="click:;"><svg _ngcontent-ng-c3809052639="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="control-icon"><path _ngcontent-ng-c3809052639="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><!--container--><!--container--></svg></button></div></div><!--container--></header></app-navbar-student><main _ngcontent-ng-c392957778="" class="max-w-5xl mx-auto w-full p-10 flex-1 box-border"><div _ngcontent-ng-c392957778="" class="flex flex-col items-center mb-10"><h1 _ngcontent-ng-c392957778="" class="text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-teal-800 dark:from-white dark:via-white dark:to-cyan-200 bg-clip-text text-transparent tracking-tight mb-6"> Consultation Sessions</h1><div _ngcontent-ng-c392957778="" class="flex p-1.5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-teal-900/35 rounded-2xl shadow-sm"><button _ngcontent-ng-c392957778="" class="px-8 py-3 rounded-xl font-bold transition-all w-48 text-center bg-white dark:bg-teal-900/40 shadow-md text-teal-700 dark:text-teal-300" jsaction="click:;"> Upcoming </button><button _ngcontent-ng-c392957778="" class="px-8 py-3 rounded-xl font-bold transition-all w-48 text-center text-slate-500 hover:text-slate-700 dark:text-slate-400" jsaction="click:;"> History </button></div></div><div _ngcontent-ng-c392957778="" class="space-y-4 animate-fade-in-up"><!--container--><div _ngcontent-ng-c392957778="" class="group student-card bg-white dark:bg-[#071317]/80 border border-slate-100 dark:border-teal-900/30 shadow-md hover:shadow-lg rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300"><div _ngcontent-ng-c392957778="" class="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0"><div _ngcontent-ng-c392957778="" class="lecturer-avatar bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-teal-900 border-2 border-white dark:border-teal-800 shadow-sm text-teal-700 dark:text-teal-300"> A </div><div _ngcontent-ng-c392957778=""><h3 _ngcontent-ng-c392957778="" class="lecturer-name text-slate-900 dark:text-white">Dr. Ahmad Fauzi</h3><p _ngcontent-ng-c392957778="" class="consultation-reason text-slate-500 dark:text-slate-400 mt-0.5">I need you to check my Chapter 1 methodology draft before submission.</p><div _ngcontent-ng-c392957778="" class="mt-2 flex flex-wrap items-center gap-2"><!--container--><span _ngcontent-ng-c392957778="" class="location-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/30"> ⏳ Venue Pending Approval </span><!--ng-container--><!--container--></div><!--container--></div></div><div _ngcontent-ng-c392957778="" class="flex items-center gap-8 w-full md:w-auto"><div _ngcontent-ng-c392957778="" class="text-left md:text-right"><p _ngcontent-ng-c392957778="" class="date-text text-teal-700 dark:text-teal-400">2026-05-10</p><p _ngcontent-ng-c392957778="" class="time-text text-slate-500 dark:text-slate-400 mt-0.5">10:00 AM</p></div><span _ngcontent-ng-c392957778="" class="status-pill px-3 py-1.5 rounded-xl w-28 text-center border bg-orange-100 text-orange-800 border-orange-200/50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/40"> PENDING </span><div _ngcontent-ng-c392957778="" class="flex gap-2"><button _ngcontent-ng-c392957778="" title="View Details" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-950/20 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Reschedule" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Cancel" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300 dark:hover:border-rose-950/30 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div _ngcontent-ng-c392957778="" class="group student-card bg-white dark:bg-[#071317]/80 border border-slate-100 dark:border-teal-900/30 shadow-md hover:shadow-lg rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300"><div _ngcontent-ng-c392957778="" class="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0"><div _ngcontent-ng-c392957778="" class="lecturer-avatar bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-teal-900 border-2 border-white dark:border-teal-800 shadow-sm text-teal-700 dark:text-teal-300"> A </div><div _ngcontent-ng-c392957778=""><h3 _ngcontent-ng-c392957778="" class="lecturer-name text-slate-900 dark:text-white">Dr. Ahmad Fauzi</h3><p _ngcontent-ng-c392957778="" class="consultation-reason text-slate-500 dark:text-slate-400 mt-0.5">I am struggling to understand the pointers concept from yesterday's lecture.</p><div _ngcontent-ng-c392957778="" class="mt-2 flex flex-wrap items-center gap-2"><!--container--><span _ngcontent-ng-c392957778="" class="location-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/30"> ⏳ Venue Pending Approval </span><!--ng-container--><!--container--></div><!--container--></div></div><div _ngcontent-ng-c392957778="" class="flex items-center gap-8 w-full md:w-auto"><div _ngcontent-ng-c392957778="" class="text-left md:text-right"><p _ngcontent-ng-c392957778="" class="date-text text-teal-700 dark:text-teal-400">2026-05-12</p><p _ngcontent-ng-c392957778="" class="time-text text-slate-500 dark:text-slate-400 mt-0.5">03:00 PM</p></div><span _ngcontent-ng-c392957778="" class="status-pill px-3 py-1.5 rounded-xl w-28 text-center border bg-orange-100 text-orange-800 border-orange-200/50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/40"> PENDING </span><div _ngcontent-ng-c392957778="" class="flex gap-2"><button _ngcontent-ng-c392957778="" title="View Details" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-950/20 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Reschedule" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Cancel" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300 dark:hover:border-rose-950/30 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div _ngcontent-ng-c392957778="" class="group student-card bg-white dark:bg-[#071317]/80 border border-slate-100 dark:border-teal-900/30 shadow-md hover:shadow-lg rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300"><div _ngcontent-ng-c392957778="" class="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0"><div _ngcontent-ng-c392957778="" class="lecturer-avatar bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-teal-900 border-2 border-white dark:border-teal-800 shadow-sm text-teal-700 dark:text-teal-300"> A </div><div _ngcontent-ng-c392957778=""><h3 _ngcontent-ng-c392957778="" class="lecturer-name text-slate-900 dark:text-white">Dr. Ahmad Fauzi</h3><p _ngcontent-ng-c392957778="" class="consultation-reason text-slate-500 dark:text-slate-400 mt-0.5">System architecture review and Chapter 2 ER Diagram inspection.</p><div _ngcontent-ng-c392957778="" class="mt-2 flex flex-wrap items-center gap-2"><span _ngcontent-ng-c392957778="" class="location-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-teal-950/80 dark:text-teal-200 border border-emerald-300 dark:border-teal-700/60 shadow-sm"> 📍 <strong _ngcontent-ng-c392957778="">Block A, Room BK-34</strong></span><span _ngcontent-ng-c392957778="" class="status-pill text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md">Room Assigned</span><!--ng-container--><!--container--><!--container--></div><div _ngcontent-ng-c392957778="" class="mt-2 text-xs font-medium text-teal-800 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/40 p-2.5 rounded-xl border border-teal-100 dark:border-teal-900/40"> 💬 Note: "Please print out your latest ER diagram draft." </div><!--container--></div></div><div _ngcontent-ng-c392957778="" class="flex items-center gap-8 w-full md:w-auto"><div _ngcontent-ng-c392957778="" class="text-left md:text-right"><p _ngcontent-ng-c392957778="" class="date-text text-teal-700 dark:text-teal-400">2026-05-08</p><p _ngcontent-ng-c392957778="" class="time-text text-slate-500 dark:text-slate-400 mt-0.5">09:00 AM</p></div><span _ngcontent-ng-c392957778="" class="status-pill px-3 py-1.5 rounded-xl w-28 text-center border bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800/40"> CONFIRMED </span><div _ngcontent-ng-c392957778="" class="flex gap-2"><button _ngcontent-ng-c392957778="" title="View Details" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-950/20 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Reschedule" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Cancel" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300 dark:hover:border-rose-950/30 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div _ngcontent-ng-c392957778="" class="group student-card bg-white dark:bg-[#071317]/80 border border-slate-100 dark:border-teal-900/30 shadow-md hover:shadow-lg rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300"><div _ngcontent-ng-c392957778="" class="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0"><div _ngcontent-ng-c392957778="" class="lecturer-avatar bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-teal-900 border-2 border-white dark:border-teal-800 shadow-sm text-teal-700 dark:text-teal-300"> A </div><div _ngcontent-ng-c392957778=""><h3 _ngcontent-ng-c392957778="" class="lecturer-name text-slate-900 dark:text-white">Dr. Ahmad Fauzi</h3><p _ngcontent-ng-c392957778="" class="consultation-reason text-slate-500 dark:text-slate-400 mt-0.5">Career advice regarding software engineering internships and course path.</p><div _ngcontent-ng-c392957778="" class="mt-2 flex flex-wrap items-center gap-2"><span _ngcontent-ng-c392957778="" class="location-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-teal-950/80 dark:text-teal-200 border border-emerald-300 dark:border-teal-700/60 shadow-sm"> 📍 <strong _ngcontent-ng-c392957778="">Webex Virtual Room</strong></span><span _ngcontent-ng-c392957778="" class="status-pill text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md">Room Assigned</span><!--ng-container--><!--container--><!--container--></div><!--container--></div></div><div _ngcontent-ng-c392957778="" class="flex items-center gap-8 w-full md:w-auto"><div _ngcontent-ng-c392957778="" class="text-left md:text-right"><p _ngcontent-ng-c392957778="" class="date-text text-teal-700 dark:text-teal-400">2026-05-08</p><p _ngcontent-ng-c392957778="" class="time-text text-slate-500 dark:text-slate-400 mt-0.5">02:30 PM</p></div><span _ngcontent-ng-c392957778="" class="status-pill px-3 py-1.5 rounded-xl w-28 text-center border bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800/40"> CONFIRMED </span><div _ngcontent-ng-c392957778="" class="flex gap-2"><button _ngcontent-ng-c392957778="" title="View Details" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-950/20 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Reschedule" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:border-teal-300 dark:hover:border-teal-800 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button><button _ngcontent-ng-c392957778="" title="Cancel" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/30 text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300 dark:hover:border-rose-950/30 transition-all tooltip" jsaction="click:;"><svg _ngcontent-ng-c392957778="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c392957778="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><!--container--></div><!--container--><!--container--></main></div></div><!--container--></app-student-appointments><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"41":"t12","42":"t13","43":"t14","45":"t15","46":"t16","54":"t17","55":"t18","56":"t19"},"c":{"41":[{"i":"t12","r":1}],"42":[],"43":[],"45":[{"i":"t15","r":2,"e":{"0":1}}],"46":[],"54":[{"i":"t17","r":1}],"55":[],"56":[]}},{"t":{"16":"t20","17":"t26","18":"t27"},"c":{"16":[{"i":"t20","r":1,"t":{"1":"t21","2":"t22"},"c":{"1":[],"2":[{"i":"t22","r":1,"t":{"10":"t23","11":"t24","12":"t25"},"c":{"10":[],"11":[{"i":"t24","r":2,"e":{"0":1}}],"12":[]},"x":2},{"i":"t22","r":1,"t":{"10":"t23","11":"t24","12":"t25"},"c":{"10":[{"i":"t23","r":3,"e":{"0":2}}],"11":[],"12":[{"i":"t25","r":1}]}},{"i":"t22","r":1,"t":{"10":"t23","11":"t24","12":"t25"},"c":{"10":[{"i":"t23","r":3,"e":{"0":2}}],"11":[],"12":[]}}]}}],"17":[],"18":[]}},{"c":{"0":[{"i":"c392957778","r":1}]}}]}</script></body></html>`;