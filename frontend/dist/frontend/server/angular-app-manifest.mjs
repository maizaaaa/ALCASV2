
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
    'index.csr.html': {size: 11359, hash: 'bf2763cc5cdf363a0e68871b66672db60bf0abfd0cfe5f4afdba75d1b4cc7df2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'b5829ed8e1dc85aa19daea21aa5eb1a64fdf5f7842bd74457e435907b0060ea8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '1b2df1be62cd87ad657530e98b95662c3b434bf4785f300607712eab3802a84d', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '8337f35f1e1747a1a58c0b267e3db1f9068464bdf89059d692fd413367866c78', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '02f3da821b0ac5c352ff5d9fed60db10b4293920be8df31532471c46867733d7', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '11d1e52b70cf9aeb5ef5f6ae84e414e53001690e3f6e3c514e9d001fa1eb6514', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59040, hash: 'a06fd402a2b4db117662e0cfc040980326848644e8a1558b3f56f6c828a6e87c', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54648, hash: '709b7eed386f653724669acf278d05c34f4b7e25be0d322298a0856406ed3055', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73468, hash: 'fbcccde4c37fa17b54aa33c8826b3b03a44c1c7477bb943afdb8903e3f7b0eac', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '685ae02a26ca56a0e7b9e516a7e9f64142fc8a092de6fd7700c9c702cad2a487', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: 'a1d05b3884a50ae23a06e009f644ea514dbe46f985c536108031a71e365491ff', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: 'dac64e23a184a0b222c842b20dd5ac75786f1ed89b7210f2aaf5041148a99cee', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '90cbdcf6ae778143762360eee004126831bb44982ceecfcded61d02d30064f98', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'dca053936bf27e63f12e7026c44add33866b8a5b1f97284b98e004dfdb38e6f5', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89241, hash: '34da1c935e9cd6f20c64ecb6f594e01161a57377c85cac8f9213407437acf347', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53295, hash: '7d3809cdaad8cf7ff151210edf864d35c0e1f5da849111a767fad1eb239f49f3', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65737, hash: 'faf72a8c8654c74c690bd4f3ae12962b8f27a339fc9c8c25392ffd093b7dcfc2', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'e47fa159a36c41afe793c4a2a406b295efe707f92fb397a200e7704ee7b6a730', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 52948, hash: 'a1292cf917d5e8ee55e8d06a2ad03015e12f957a1121e1a436040f2792f60c81', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57685, hash: '9c5288bd199f28067556dbb504724d7320e85e363ca5e54e500eb3993fb20645', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70984, hash: '527ebb90c6dd00cc06e0608bc6cf0488e17d4efe2853b12543dc2a5477c61078', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72370, hash: '8d657f87607b0f7839a21be72d9719ea7e7483a13a9158d8b9e4231ff009495a', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: 'c216983a84a0f2bedc02c4b04afa38f65a9ae37322b64265caf4da087c813b4f', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58458, hash: '7669317e8b864c708076446c33120a34f7cf22b9de35df927910e74b859d7f00', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-U72WSVID.css': {size: 90298, hash: 'ZtM4FPPVdLE', text: () => import('./assets-chunks/styles-U72WSVID_css.mjs').then(m => m.default)}
  },
};
