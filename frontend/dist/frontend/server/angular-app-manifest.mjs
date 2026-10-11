
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/registration-success"
  },
  {
    "renderMode": 2,
    "route": "/verification-code"
  },
  {
    "renderMode": 2,
    "route": "/reset-password"
  },
  {
    "renderMode": 2,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "route": "/admin/users"
  },
  {
    "renderMode": 2,
    "route": "/admin/logs"
  },
  {
    "renderMode": 2,
    "route": "/admin/attendance"
  },
  {
    "renderMode": 2,
    "route": "/admin/settings"
  },
  {
    "renderMode": 2,
    "route": "/admin/broadcasts"
  },
  {
    "renderMode": 2,
    "route": "/admin/analytics"
  },
  {
    "renderMode": 2,
    "route": "/lecturer"
  },
  {
    "renderMode": 2,
    "route": "/lecturer/schedule"
  },
  {
    "renderMode": 2,
    "route": "/lecturer/appointments"
  },
  {
    "renderMode": 2,
    "route": "/lecturer/history"
  },
  {
    "renderMode": 2,
    "route": "/lecturer/profile"
  },
  {
    "renderMode": 2,
    "route": "/student"
  },
  {
    "renderMode": 2,
    "route": "/student/book"
  },
  {
    "renderMode": 2,
    "route": "/student/history"
  },
  {
    "renderMode": 2,
    "route": "/student/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 11359, hash: '092b7ff085f448a5f80796f212450112abda1061f1f30ea882fbf9a24e65dd91', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'de77d6164e6e5aa0aa3890c0d5ebcabd07b649b1d2e8dc6bd1dcdf01c983a212', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'fc9ebbb7dc8434e6d7d3b8e88fc5893b287ce94f56a2cedfe0ab24c46a778279', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '9dd78eff8481bf9c2d1811409a1a3269f72cd59fb4effbc6113753af12d57bb7', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '3c2830af895ab170bf1fc3148757fe5184abb6a5d40a6258d280608cd6599a76', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '2f9e1d7c279cc5488ca7eda57c33a7fb3127fb5c96435c60400db7bfb2eb107b', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54646, hash: 'da86273d680d7561132231d61c8632048823d66506d1fa341f4739051ab6019d', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59043, hash: 'acdc0ef9c8035995c749a5208d306ffd85e5fa88cdd964a0b64ee35f7efe23a2', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73466, hash: '7ecb4652cf50ca41d148232146178b283d17356ae4034770d1635f6933c8fc7d', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: 'ed746dac66a64914f06916235dcb54e723d36817dd72c5457c45b39d840031ae', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: '2fdb768c8bbfc7d371b5c73fc7e7d2026f35ae9d78c1073b60d0a3644518cd7f', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '6bb49d4e78feac369d1866c8f16af7c89c622a2c5a74751f1ac0ad870fb7e33e', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '78b6f112cdc7a724fb282a16b1fab9ff0e3bc7e410f1f07228bef9bd79d74604', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '39403af2050669b103ac7f364f72f92fca91bb20f7de1fc30d2104d393024449', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 64983, hash: 'f217e9db23642fc658d23737087892b0a246333117b9fd494415dd1bedc362c9', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53294, hash: 'fb54dcf5bd1aa898bb13d3e47bb5dac7230d2422f1bf9b2280a9c0f2a78a28d4', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89241, hash: '4f7b3b763555725524fd7f1592c176b135412bd667454419ddfd7a5e483d4591', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'fab342dd4251e3ae718e371178c0ed76839556039cfc9b9b67bedf1fa78e76af', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 52948, hash: '8a6d92275d0d203cceb31e79f2f102ed5b0ed764eeabf66ea91496e35dbaf9e2', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57684, hash: '347b0877450f47f560d8b5a408d724c2895f7bdf39d30bb8d1d8f93c052577de', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70991, hash: '62928f4d9fc63c79c1e5948ef1cf1464eaad7054c804acc91b51999a575da060', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 59469, hash: 'b5d3cc449dda69d0d9b6dcdcc451a51aeb9116fb29c637564b98a9620548ef3c', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: 'cb0c52395910c57e84e2746096deff28a1ddd7697c4bb47b2432d9c186a3c832', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72370, hash: '1b0ede9e8083d92095224019fdfdff8e28c71a367c65c4a8fe05498a2214ab49', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-U72WSVID.css': {size: 90298, hash: 'ZtM4FPPVdLE', text: () => import('./assets-chunks/styles-U72WSVID_css.mjs').then(m => m.default)}
  },
};
