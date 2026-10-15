
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
    'index.csr.html': {size: 11359, hash: '3d9b5188e6c0ff2eda806d94a504b7adafb7bed9ac055d92ce934987f6ed52ce', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'faec373efcbabdb75e747d96edd7caefcdf456c8053a8dfad5f3d40874793f1b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '5ca8e1af9589097101b4c9311bf30e3c78a7c7b5adea501b370afe1ff2ef9ace', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '9929c8da45239cc412b35bc0795c551346a5458cee5beb1402b2c72793cfc2b1', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'ea110f62e945a48f43a0ccb927780e7015837b4ebeacd861b5718fe973f7fb1c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: 'ad2631b1b6c9e88b750a6a531326c102b652e642073a7ee2763300eda4c2db90', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59363, hash: 'd6dc2b74fa5a5d48311216aed9205a9241e71124463181d1acf58eb728a1be97', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80544, hash: '7b24aac671177ab1cfa1b0dca2bef605bd8847061c58bd8304581439b840031c', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 70081, hash: '662aa2587d5f1326cc2fd39bbdd95233b86ca0decaf8bd9f6d49325e2d4450d6', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: 'd83b4c73c907398e8a242128cfdc850c55c06972e4b221670b663b54fbbbfce5', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 58736, hash: 'da2962290c6eef842e049607777a32eedb86ea575acc44badcb367f76eccba38', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '38fee0e3d107d982818ab35c26adc91446933c0a77544aa77d168493067738d4', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: 'c551d3b8d6c9d48bbe6005b4822f5cc6ece3fbc98d33470c81998cc1345a0b90', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 136022, hash: '6a9ea73ab6d69887020650928a5431e8af000552b1dab2a6ffaaf70824f7ed8c', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72691, hash: 'ce545e29996e1e899ff69fa7473b7d488633a491baff3b98a35107268133edce', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 58736, hash: '64e3022ac0f36f45b796b14a5b4b1723e91f0cf283b844199f56fc1d8de47175', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88894, hash: '5ce92d141b2c807c1e365c1643de8d32dadff39038c5631234f4cbaaf485d266', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 71312, hash: '010f82f260b18a9ceab71465559d743669ee8063ea76baed08307b92c4d7ccc4', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 91547, hash: '9f801b2b31bd43d61a47a4d05bb0a2de768d66c7394bfc51763fc499507b3659', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'cb2f78e9d1a00a8d1aa8633385fd767ef2c133c9f1a33fb28bcbbf65f68f334b', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67961, hash: '024a52c5b9e8add8bd680b046d29a952ea01c6f649b80f005ef5710081722199', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53310, hash: '9af16883611d81e607df24d08b2c961c5d74b38a16b847c7e89663fe3c713962', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89562, hash: 'e7970d3b2b99111332e0aa7bd57d211c5ecac8ecea4217387148fd9de3d8e934', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: '3ca14d01436861275831ed56edad4ece5bd25f6202a473a339a492b2e431c983', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 133452, hash: '3815932d444f32d221a212a4abd1e52d51cf707e16c53b96e774e6316e7ebf65', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-BD3YWWVQ.css': {size: 95318, hash: 'fA7lzPC/5K4', text: () => import('./assets-chunks/styles-BD3YWWVQ_css.mjs').then(m => m.default)}
  },
};
