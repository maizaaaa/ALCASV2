
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
    'index.csr.html': {size: 11359, hash: 'f9ab9a7e0519b1c3b7e8f2d67f57e7d26a2edc4f91b0ab4f56ecc19ca4618818', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'dd4f54facc2ad9e50816fb5702d5182f54f309698c6a766e5c7eb2687ee254a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'f81f98e1f35dc98d59e0c2da7cac28b58675964bd8d29f4cb83db2d6f14ec3b2', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '2ddfa7d86cbd1cc6dc46a903b3c5f5ed4ba04e3f7a52c40ff0b6430692e5eccc', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'cfbfbeaa2e2d7b539211302837dc0a6ba22f49e48b66a48e6f046b7dfdf9f2e7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77726, hash: 'c64754b8494dbd162d8d46b3a82cc3aaea54a8a87dba796798a4d13fd3cc016b', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73786, hash: 'e1c853c965ca08ca18285b249edbdec63f9e4824413020900be5f70e1cf06e24', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59363, hash: '1e857e4a5d3c492040655b04752ef6a7e817c63b1da8df9111e27ecb5deedd64', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 70081, hash: '7afad38cd6be3d24da8353a704e0579fec397786cd644d7e889014d6a303df18', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: '3c28edb6c8b428409a03e9b3a563b504dbb97d9f4a1f4ff8aadeb25a53e649da', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: '97895fbb790827a8c103ca61bb937c0fbc9f67a7d7ff58b140aebd2aa47cc1c4', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '1c103850a3224ce99b3da72025a57e09cc17e4a25b33ccfd89df1c0b4378b0b6', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 124432, hash: 'c57efed401adbb670609cac1dd1fcba0f36ed05b638f6ba00fc6a44c261de2dd', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: 'fa775a12d032c7be5a63ca4da45723e61106f4e4424f2b11785067a6bf621dce', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 55301, hash: 'ed0e67c387f1957f9117d66f3dbd082dcdca989735e35c5cf7f758538c30fba6', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89562, hash: 'fd889825281c999d54facd991060cff89afef404b4598f379e85fb2aba4ec772', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '9a5e0f4287899258eadcbe469b07e793f8a8f60347be9fe279dc1443c160eb42', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53285, hash: 'cb8b0dedbe1d2577c329b7f2411e99fa630853bc8f682435e2f0c8b2e8e3d865', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 122879, hash: '8de56c7283fda5e161e6ba9e198b2d470ab616ba221646d6ef4f25c9737eb4fb', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 71312, hash: '0a3521e1f30d877ce56c91c84e8b44a807138dbb397c385cc1e3ef9190d7d438', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: '1ed0b9d3017700a5d913ec8fe7c210fea773bebe6c1d76ddb396e27add214398', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72691, hash: 'e9052f45cbbc0aec740e726a40d8ba18e7c8b671b03625ed0b1a8d9f8c8d761b', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 80967, hash: '3190b6af3afb2ae4b224168d300bfa396a8c4e1fc62e2086b5b2990357d59736', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 77936, hash: '4a584f1e2877564a72551e97aacfd49e088f2ea29a1175d1a4d43e648fef9ed8', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-QWAKV3K7.css': {size: 90707, hash: 'Ot6/r2mi+Ic', text: () => import('./assets-chunks/styles-QWAKV3K7_css.mjs').then(m => m.default)}
  },
};
