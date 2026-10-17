
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
    "redirectTo": "/admin/admin/broadcasts",
    "route": "/admin/broadcast-hub"
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
    "route": "/student/appointments"
  },
  {
    "renderMode": 2,
    "redirectTo": "/student/student/appointments",
    "route": "/student/student-appointment"
  },
  {
    "renderMode": 2,
    "redirectTo": "/student/student/appointments",
    "route": "/student/student-appointments"
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
    'index.csr.html': {size: 11359, hash: 'bb7608fb89cfed20df7cb7e220eb5dceb726dd36b220fa554bd3cce052d71e4d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '3fda1c918a5cd9764f956246fa1687bdb9db24e18063b377c0ddd06f3ce251c9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'e1d2db52eaa3ff245d71d50face2c64a46d8b0db5031d01086094dfb8a442470', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'e1a8ea6a378a7d34cb323dbd69dcf430841fdd8927b5724b6aac10a9d12317e3', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: 'ed61c8f18058d98fbbcd3189175e236a49a796b09753f360e8d4761a2884a83e', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: '8e13467646ba800519d7a49ab021f6bb688eac7699e5f236a6933b8f9cc05e74', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80544, hash: 'a7ffe41744f2ab36d267ca1e5d3ca3d9d56764e4f177ff14876e9887860957d4', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 72307, hash: '5fe28abd82c481a7040dcd9bd8c9d298d655f3f55ccf754bdfa5ef12a00c3c9b', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 70081, hash: '9e13971bd5d7814a3af28d45c761b783d0bb4dc1f283c58df45ccf25e114f30b', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 63279, hash: '26de1130c7c16e47fbfbfe70887302f523d849483c9a5acbb18b6ee5974ec1e8', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'bb77bfab9dfd0812b7742984774c0b5bdf208f86ab2795ac355991ab3b15346f', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 70017, hash: '4747553acca442882916030252cc943537c825d48fddbeb0cd059298bd084387', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 74179, hash: '9695c92a2a5ba65fc98ce3e525070e7a88be0bc6f6c239e13cc73627a0b5f126', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 136892, hash: '57654d358dc3ddd0d319ad6fbd9c5c04761e441f2eb10628fb6a6929fbb8e4c0', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 74395, hash: '151a95c9677c531ec8a29f897ea1edaee89f676d65d8be0b2a888f67d50ad1f0', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70202, hash: 'f294756a46bd48e6ce04431453ce2ba07881077047b7c161a08667b15b25fe8b', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88894, hash: 'f74abde111962e2895815c91cf8d15b21b0752abf095a5fb525c2b78980fe87f', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 74172, hash: '1dfe1657ff19fabf5cf1285fa16ef623d18e5868c562999559fc1da2ad818906', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 91547, hash: 'dcfd3f2c073a67a94fdc6eeafd2e1382b4dcb8d71fc7b873f11c580982d5b3f3', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '55fa25da894d338b49d5aa4f34dffb15e54b9a27054cbfe9a102c8e8466c61ff', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67961, hash: 'abb68af90fb4ab7ebf1789a906f3f1c15fda30ccab393f2b0e63a52f6420302d', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: '69005031f6118bf9ae9db270e0a83b3973f1f7308490a71e3236620d90df7dff', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 81185, hash: '57773a00f3cc82fdd06490c8d1054fae577514b7d6d1b16fc28ce293676940ac', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 91584, hash: 'aebfc9e52b36918dbf5cc75ab3d233fb2c5d09948bbe9702321b644f07b4647e', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 139426, hash: 'ccf3853b6aa727a2fa0fcd123777256ad3bbf98fd8d2b01d3d989423de94f251', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-HKRH7ED3.css': {size: 101613, hash: 'c8sDW0fWuJE', text: () => import('./assets-chunks/styles-HKRH7ED3_css.mjs').then(m => m.default)}
  },
};
