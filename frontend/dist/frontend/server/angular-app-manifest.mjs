
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
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
    'index.csr.html': {size: 531, hash: '3289313267d3d5ea666ab109094444882d2b900ae493a880b841356fe8bac809', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1071, hash: '4a96f0ead7cc3f77522064d150aad1e254da43cfddf097439a14657d990e1ac6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 24291, hash: '633d6c7048ba6e65dcdf02cf310ecb87150194ef569b2d978331aef453061dcf', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 25547, hash: '2ef6def1c249670481eda787182ac6deaa7f5946af9acb9096eb8bac91518b46', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 23644, hash: '116a18c2415342b8c16f66bda550917c723c5a6a1328ec59b2b919f01f8c878a', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 66597, hash: 'be8d6c025f8ab8b8159bc87b12312097099115ad9403beca0aaba2646abc83ba', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 47591, hash: '9dbceece0f29bba153d85031f50be2460ebe27782563785be3274befee7e390b', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 73065, hash: '007b0b8d464e2b600c56c794f24e1d48e02cf1394ac4979fe9562675abeb112a', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 42252, hash: '456abf2f5e9699dafda66a007e10ba5421f2f5cbe524c79fb0f88dbe225569e7', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 50037, hash: '9e8267a03fb9945930096cef9dd8d22d30482626aa5cc9ce0686777dc2182d6c', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 34842, hash: '6673c2ab666b04a0439ede9d83de585c675244b39ff25074e45852aa98aa588c', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 25584, hash: 'fca02ddc2719cf3ed6074d7a00df3db1157129c8d9f3edcdc6b0abd446402f77', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 53327, hash: '953f0902a27b5858be982e86d01815a68b5a69993e0b09c1b8d7d6622334e181', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 59530, hash: '2b4547f1409d3ed4ac549a65041d6506c2269790cc2cc21ead6342e329c94dab', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 45215, hash: '3f4558d789af0b19da72b1ae541dd8b96ac90174d71c87a09a58b111bd0c7cb0', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 64750, hash: 'b7209f324d4414e20fdd7f710e005be963b927c443f6d40bb4bf5e8f17913834', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 87153, hash: 'c8985d2c8f4d46097cc7c8c7ca29bb13385083d5acd8f7d42074b957e557c167', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 27185, hash: '2500d0c2d5cc39523f632405726b14ada35a200b8162dec2e57cb0860d024297', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 50265, hash: '0de17ec2cff3aafb95172b491b56759c16833ed66cfa389e9c8026b16059b06f', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 55578, hash: '94bf7afb6a74eb10e0196b2cadb197fc98ab4ee179bb44d904f146c90dba95d1', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 75871, hash: '3b0d5d3a79db34cfaff19e5797440e38e9c6ba2799680d9191b82a8ac86d04f8', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 36184, hash: '506f0c52e1a78bbf86a98dae20c5d65bc62f8b35c864f54f83afaaba3d495ccb', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 51807, hash: 'acafcfd852d2341395e39423378d8d3779869f5a059e4f18c3114a0ee67141bd', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 67886, hash: '043686d02897333f78cbd2755fb3df461ae13e5cb09210120d958a1e7796a0a2', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)}
  },
};
