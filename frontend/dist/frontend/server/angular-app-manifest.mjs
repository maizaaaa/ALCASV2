
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
    'index.csr.html': {size: 11359, hash: '6e4e1fe0bf0d96b3de1709da52a22f1ad41b6adf579099fde6078fd4fe9a36e3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'ef5b6afb7e4764da2e2cb7217a93b93a8bd714b794bab221af90480bad0c6c05', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '8ed89970413080eba28cc8da4fe3fd5ec44f0f21e6e0c395a532f187e03f03cb', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '0ec0c5d977a250442164c9e734e45cbab54a2c5ab1658bd48bd09d4963b614e4', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '90b01750e1d077a149d9aa600408d0b82d6080b65b3c714f1d82c62078b7fe8b', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '4d6d50e3be90a2373329acdcba11f9ee3e4065d7a4dfbcb0aec3a99ed764ebc7', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54646, hash: '809f740e4d9f274ede8eb2d00fa9c63c42c4747e2d040730c05f77fba4cdc2d6', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59043, hash: '3ec98739aa8240fb50dd7371a8a9afb2d49493e488cd44204afe0dcabeb409c6', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73466, hash: '1d0277b20d8e1a807bf0639a987fec38c423a4684aa419b8831e18b1be25cb5a', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '6239762b399c48166e86ced5b8927110e8b7941f458762002a95ccee3b77f673', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: 'e30ce6fad79556499919ac88a0aeb4718e1eca2d30dbde4df9f9400c51444387', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: 'b18702f4dc6d79930c5eb406f7f08f3219a5cab43fa32d40d98d523c8e0967f6', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '38f280762f65c2c90053b45a35aa345874ed2179c5f82eaec8811902fb6df31a', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: 'c0afc79ec1a85f2093ef12734b1103def1da13c2c0a8eeec77b8dfd18dc548ca', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53301, hash: '14acd4606d83fbf6d1c3c076b6837db8501774f6e6e15c59205391df13c4478c', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89241, hash: '15f600b0a607aabd214c100ce6f96755909d5238c167df99b4fe7bc86db31779', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'a5b7a2c9dc801d692fd153c17eb0d8427237b99f0df30e38544880e75ee47256', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 52948, hash: '7bef2af92db0098212165790c01fd1526708f06085da60ca98a23bf3857dfbd5', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 120991, hash: '28e42be9b0912c1eab123db55aeffe5a503a587ab012605276d67c3f99678299', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70987, hash: '1086cca654de8cea21a9e1223988b6a7baf34ff36c62c834a636189eb8da87e6', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 78271, hash: '8789a20b05d7e534944df76a0d82de5fdfed896f35579bf9d263046fa8182209', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: 'ae6ff5f03b21a4caa3c95799330681c8dfee1939a82bc3c95b477e558945e640', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72367, hash: 'e5e672309915ef3bc72ec0112e35459656a0ae092b5c7544f6c8a71ca9a7f9f9', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 73381, hash: '8a41526e5cfed440427046398517960cb0c5c877a59b4876c037d3c182282001', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-U72WSVID.css': {size: 90298, hash: 'ZtM4FPPVdLE', text: () => import('./assets-chunks/styles-U72WSVID_css.mjs').then(m => m.default)}
  },
};
