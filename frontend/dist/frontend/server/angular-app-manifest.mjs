
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
    'index.csr.html': {size: 11359, hash: '44f7e46dfe5f36a07ff27e5961347bdc81a5bd401ef038c5d1157b1c0150d46a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '4684300effb5755fcd10f0dbba0e5a900cc71388afb143dbfca5eb454fa4a4fc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 38679, hash: '6c8d008e9b60f761b81af24a5108c17470918acd9fcb108baafc8e00c0b35db3', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 33283, hash: '2055aac21627b53a5033ae3573c88b0b9ee924af108aaa537b7f8cfa37784a86', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '89b09718bf1a0140040cc670aca79acf1e83522d67db496265af3331c1e6f7c6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: 'e1360b28d7b9da8c74a077f4975ba5f5051ebcabe9efa7403271dd735fcc256f', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80548, hash: 'ce4af209c518578d70d1a90590061016bf1d1a6e16517bb8e40a181adf086728', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 77540, hash: '06197441b7c00b3272658d575de0a1934e400ee0e5fddb56acfd9fa5197489e7', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 63661, hash: 'a07a015ed1cf5edeb84e59758522254cdb8f108229ded78a216d5971ce567949', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 79767, hash: 'a57fc19f55c5926d78832a2b742d5da7281f158d0e604c65768454fde99fdc57', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'ce87fcab3ccd9f94f47f2d366fb68bf368a80cf41d97eef222e5e0e169886578', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 70399, hash: 'f600206a54ccf1df234e014eb788c09455189ffed6a17500cbd54b9fb7faf541', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 74672, hash: '9889ba16e4833c36f68289d4d679ed1f8e613e1f51d79f02a36b9a19e74b242b', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 138933, hash: 'b05fe5dcd66e26517b54c990eb2e3af958cd2a3a573f1aa9da3c37fdf96bc688', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 81847, hash: 'f303797204e80af7d3fa7ec6e44bcdb0e1818266e755dcb7a41fe27585d47e2b', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 77659, hash: '5195723bb8a5a574bb8fb1aa012cd83789d8fece4ac449d809d802c7a51f3e9e', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 74665, hash: 'b6061ffa50af944168d4a5708a1401195291a3b83da98bd933657a23354f8697', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 90293, hash: 'd8d20ff08e0f5b1954bac803db9212c3a3777adff355182179dde5425bea34f9', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '900c2332199adf99781172724e9380d44262eb91a6a42a0dfef4fa8636e3952c', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 92592, hash: '2e303eab81bb0c84e7804900269c1d2fce784133f8c30f04c22cf4dca53d5a9d', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67965, hash: '26bf2b0e1bf1fe197c72922f29a1e4a417b2c4ae480cd9a01d640c253666daa1', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 81229, hash: '9b403cf35b0dc19f5534cf4af8b849e481c273f947d59a82ba4c9714c65c3c2d', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: 'b97deb8229716b0925b6a585048a76a5ed647c0328869b15d18b71811f127e8c', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 143690, hash: 'ef656f9e14b43d1f23c46a335d8f56b0cb3b1261147b2534e3305d4bcad100e1', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 140671, hash: '33eac9d84d0cd81500410b69198fea452f72bdd2dba61837304ace66199c7850', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-GIZI6F56.css': {size: 102745, hash: 'wBXvLe+zuiw', text: () => import('./assets-chunks/styles-GIZI6F56_css.mjs').then(m => m.default)}
  },
};
