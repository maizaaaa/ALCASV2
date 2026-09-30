
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
    'index.csr.html': {size: 11359, hash: 'dfc06ae4431488fe71c4610eead1236d0e3b3557c125234034f80fa2c7b3e479', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'bc49303fd7c0f5edb5a98dabb7f3abe7e80097a5c61e16d8f86750bb74b11967', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'c5b4eceb9bd235f5fabf3b0850d187d1322edc2b173906d7035a5fb0fc67e8d0', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'eb30d5cb6cb56420641e71bb981366a41de2094f0b62053579fce449b29e19c7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '1d2a9aa60f0f75f332bae13d7403c7164490a0960beae304461bd7db69e365e1', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: 'df117ff6bd37bfb27d8df7cf0644ae6cec02b2f4126ebbd44827b6eaa05f5a65', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54648, hash: '0ab7699c46081ff3f4ee4778a591e3d70682f6569c5000324cbff4e2fe75476b', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 59253, hash: '303aa2ecab035f7412ad447e660883835a9cbb87693eccdef534842e9e1333be', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59083, hash: '992a28527989f1221483716f8aa5b37e078f7213fd3b1e3c060db7db5e218550', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 60046, hash: '6d10987fc9fdcb60e864ab2ed0bc4eb85dc162c621746f62cca057d3c9897de9', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 71199, hash: 'eec82720f736a8dfe3ee9ec95d15ceb7dff1e1201d930779e827222737098b0b', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 75837, hash: '50954bee552ff5a29ecdb2c4ad73edfca6aa4a97be58bdaa8e30d59b8d42527d', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '790c45b6707948b3cb464ea10ed8f71e292258bbab7e4d3791c55d06d3f15979', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '5beb7a222281ffb3da1488939277d05d176fddfbdae99886f8bfef079efc10a0', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65731, hash: 'dc4a6e18c5b8066be7882423b0498e910abad73702d76b404d9a7f0a0e34cf48', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '000470060feefbc989e99a88d48e83a8b8e61d572d453b2d0e074a1ddc38b7ed', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53297, hash: '716469ac994ff1fff6ecf9c80c5df779a61b0b6fdc88d5f436c1dc4d368e9e72', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 67678, hash: '2258983ca8c9798404096b91e7aaf40053b306f141f73930e5fa3ddfa93aaa12', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 58075, hash: '51631189c7091d1a0fa4ba09a084c276d76672d14c3f0ba351287ddc8d256bb5', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 68807, hash: '0d5f15871a0f809c6186050abffc57504b8e2dad2c25673f0f8b799dc09f38de', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57685, hash: '328f404e4607ab8a6e9a0f96d61b78891e0b9b628e3fb9eb42ad8219ee8c3eab', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58455, hash: '061e4b7920c7973a912cc509cb435454d223860058217925194d37ef8e5f0dc4', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 65891, hash: 'c36e6ca2e2e06893a4d2b735aa90102ad37b49cda9b0698265a986db841efd4c', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 61593, hash: '3a09b595ad952a4cb86259e43069a0c0b45ad0b93c0f92d06d5369a18bd53bf2', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'styles-G4FTP6TS.css': {size: 77279, hash: 'XaVT+p4g1H0', text: () => import('./assets-chunks/styles-G4FTP6TS_css.mjs').then(m => m.default)}
  },
};
