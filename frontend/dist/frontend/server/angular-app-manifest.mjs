
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
    'index.csr.html': {size: 11359, hash: 'c26d54d6135c550ee715643d89748a7462df5732fa1bae640405eaaa5b9fbc92', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '489e4efe6d24600493d235746533a975a821cd8366a464355754c7b0957a1aa3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: 'ba11a873a747c6e12c8e7e87e2b57fe2d59fd0f39c436e531bcd945a035ec8d6', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '6124d25f870712b7c4f9bc8c66bb82515725afaf02ad853bc7139e7dda48c1f6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'e623ad9640e9dc6c9eaaa9c90cdf84dafa63f8e23ad46da94f85cae3c212d484', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 67168, hash: '9b17f456d69d163b0d9c9816da92a959d818fc2a110ac1f99cd5712d18461a56', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 44408, hash: '95a45fbf84507167dac60da67f481bece845963d099c0010ff9ab64d167e2910', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 49007, hash: '3932044a411cd163d83ef6ea3c3b938afc73a5428ae8ca2c45225313d25e9aba', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 48607, hash: 'b646a832b3058963e6151d63806df3a5e3095d2890bb484ebfadff2c54aa7352', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 49564, hash: 'fa4e4615b20902829336afa55a7494ac1ace2fbe331f113576c4646e15349748', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 59531, hash: 'df109e10be9bc42b79045326be828d7e4c91410b6a2f225368655882dda6130d', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 64169, hash: '822a235428f260912a2bb70f71e51c81fb0809fde47241763a7cc08dbe072fe0', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '6d20cfd2a975e0028490b34acfa45b727214a3c27ceb51f6ebbaa3017b6cff3a', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'c79618595f8f8922d8edda43d9308127fe4eda99bdbaca509283bf7c1e7cff05', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 55492, hash: '738975374e74a7751638f003c62d11b2d45bba38bb3734a481971ce69a1b49bd', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 43056, hash: 'b84fcefebcf798c8b033124ef0487ca48788de1180d6eed4ed1e443557374811', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 57195, hash: '8fa993f21c3518ca0ee870062ef07ed78ba1f66f39d7c3f14e0f49efc5e211b8', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'ab6310a948ab9fe0ba95ba929edb66156dba66ce47b162bba8e81e98db5ef67c', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 47446, hash: '5b2aaf8b65ff013d8b168d6c54a5c0024c73150754ce72e03ec0d8b291abf9e6', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 47592, hash: 'dcf0ab9a16ea0a0a921c4117a8ec5b65e1850bf4c5761265896a811be3dd1f4f', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 87478, hash: '8f130b6e985e1da535d1eb1eb1b72d36c2d8518bc8b14e007c21a272233f475e', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 51266, hash: '515fbd9ba75f22d39125933ca17f86975acbdf9e2f6baff24d3d4f7fe88b0359', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 49925, hash: 'f0325e3d438785b76a092a7e32ca3f4c3c89e844e6d63d69e70cf14ebfddb9f1', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 55415, hash: '11298564371bacc8dac4c48855366c8a19642fc8bad8d7c9e29a74bac3612737', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-2YOCIPAX.css': {size: 77481, hash: 'tLYYIBn0igY', text: () => import('./assets-chunks/styles-2YOCIPAX_css.mjs').then(m => m.default)}
  },
};
