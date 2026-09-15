
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
    'index.csr.html': {size: 11359, hash: '9331b05833ca4ba85b6baeba0db257330eed4ba2e455ed5dca524ae6a7cd43ae', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '1e2ca14449f0dc4296f06ddd3004a715f97a30f9062ed6978d06b384b8aabcbb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'c3fb20c088f4ace4f5ed527ab5f31eab89111848a8f3cfedcfe4317b8c0b2b4c', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '34c8734c196184fbae7521074cbc653f168cef625e355d10128bcb22a604c6d0', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '492046698314c627394552792f974719a54fe5ea27387ff12aa51357436f5fba', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 67168, hash: '2fb660d1023b9a6b25fb12bcc1b5d1d08fb125fbb065259d8afb835faaa87c52', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 44408, hash: '5485ece4fd40b0c12e25942379d4be0ad36c488707314e0f44b0afcb0b488216', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 48597, hash: 'c51b31bf8215fa69a602f3ae07115272bafe1deb763659c0af2e119b4d90a993', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 49010, hash: '26739827528baab3c33d709cfeba0891a814307d9100556f8caafc369991122c', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 49564, hash: '2f9b5bf64dad60c9c8d854cd27710b238185db48f51ae8ec144915824e8fedfb', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 64171, hash: 'e43aee5cf9c5f227b830a499a086049878322514f4722e2272af9ca86cfefeaf', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 59531, hash: 'b1ba6ffe6b93d36d9264d64daedb766f9d92ced9cb240b010c5b9a2185b8a263', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '7672f7061931923d6c634f765464148612ca460133eae3b3e0c3933121b2542e', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '8ef66d20cb2a3baba838d77f1ebc543b08328bc5e61b15b24c0a55039d639b5a', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 43056, hash: 'c66896f0a52b57829bce6ae482eecbb95578b47de6c5cbdf1f0db7dcf010529c', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 57198, hash: 'a1a7875566e397cb560fc620e3da18672f1a6bd2b53a34d9c8781a3d783f335e', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'd90e1b0b5702f2ad2092d2726830256e2599b09a4d87e978c5ae3b1ddb664a0a', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 55495, hash: '5a891f3f92316fa7298dfa22d38e81ec148954aa6308bca5d107b97950617cf6', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 87478, hash: '92fe444d56763b5756bdaeeab6072add9ae1a2bb1fed7c1598073f787af24f08', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 47446, hash: '4d8de9e5372938dee2995fbb8154159b5dbffbbb0f76dc5cea886b97f59b5f86', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 51269, hash: 'db6b7a543f2d6789736d73ac6a2900a0d8b5b3e735bee4c17bad9d16d9e7f6e1', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 47595, hash: '6cf7ce20b96c0fafbe37ff115e1c4cf0642ea9b6a0210cf97cbdcf44e89d6294', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 49615, hash: '995dff41a1379beff65858389c7ae35a3de747c03138d329a40690fe6d36dcb7', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 55418, hash: 'b87e291c798381af313f96b12dca0cc4aa9417989bfc5c673775d0fec676e27f', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-CHPBTH23.css': {size: 82191, hash: 'GdXZCS7i7eQ', text: () => import('./assets-chunks/styles-CHPBTH23_css.mjs').then(m => m.default)}
  },
};
