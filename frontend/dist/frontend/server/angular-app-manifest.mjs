
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
    'index.csr.html': {size: 11359, hash: 'bb68d92c84471ed9e6cf41faf5d8652d8a8e2758ee4d422d0df32ca9c64785f1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'aab5e84e167c1bf24b74001c8558d553c011b90ef6358fdda08cf94250116cea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 33283, hash: '655e0d0a5fd6a7834a276919a6283a0c036abcd02858bc9dcd39763c803d1f67', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'd7484969df0dc65a7d2cca25d09cf6afddc662ee209bf154aca7666337c63093', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 38679, hash: '2b33b4ad02253255f4b2aab67c85ffd261ec84703f9f8fdb2771a301ba07f89a', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 99865, hash: 'a99690085bf749dfa25a9150b4c691e3a24599a5589d926bdd866ba457f16ec8', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80157, hash: '903019babcb625b061b40026494a335e85efbc6e88d7ca03d38e86ed7cf2c91e', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 78038, hash: '8f556872732380f6bb94a44066d496aa981d79336ce1ea826d64cd675919bd2f', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 63675, hash: 'a88af750adb31b0f7c677bfce5caa4bbf804707a2ab63f70ef8e915a3c34f625', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 83680, hash: '628c8caf48c506fb8ce60a2d031d5b3a7bc4c0515d25182e7013bbf3bb9e66cb', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 74805, hash: 'd6c95c156d1404b4c202bb871516135097c857922ae2fca2d35bcce8a1123505', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 145812, hash: 'f41166ef7c99ebcf30eb4fc936cac537e4515fe8a40d5d0f65dab9ada2391129', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 70413, hash: '09df79513935fc915e6cd11f6ca15ff6eebe57cb0db26972abd517c3849eb808', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '79d84e661bca86102fbc0484fd7b39fd8bb60ef37364247e547e9f8fbac93d8f', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 78152, hash: '5f53d4644770b014de982ff4591805680038970934434b81890e4e35adbf54ea', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 82345, hash: 'c2e4e0186fdb35329af18b80878df3673bc9acfee89f1471d5ef739e20b0e2f1', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 90748, hash: '8a8be3335bd1a471d1dc5de60b42276a9546f0942a96c84dfbb91a4f48656f24', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'e1797489759bd93bd7368830ca4917d67fc1226a24434626685393ca3b0f61c1', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 74798, hash: '6c829b31e1bf63428df0621fea06da92b984087a4c0a2fd56dabe9a03a4f6e33', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 98235, hash: '22ed3e1d8366ca7c852c8ff3703f61492011cf73e5adb08f9026c3257042d10f', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 68219, hash: 'd8e8d1e3cd00ae063246055255725807cb1799af402444b7576bd001645b2ad6', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 48206, hash: '523023747b525081703869f1652ee85cc5064c0be1ed5e1ad91a057eac7d95de', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 82076, hash: '8d0d90c3b6d226cfc5b56ee3eee0f0c9d3a8479fea470f708e99d619f1037fc0', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 145174, hash: '6f72c5de371b28a61ad33776ec474e6876154c2de52635b62e05f7a38d2ba2b2', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 151101, hash: '8a017422689b1771cb2a75033d4da291a34459ca3b9e76b5bd2835e7bd59d90e', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-3GYI3JI6.css': {size: 105153, hash: 'snB3BIUoZK0', text: () => import('./assets-chunks/styles-3GYI3JI6_css.mjs').then(m => m.default)}
  },
};
