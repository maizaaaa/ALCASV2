
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
    'index.csr.html': {size: 12409, hash: 'a798de0dbec3d73749ad831d151ca56d48dc8c9d351dfbadf9930a9e2e0de1e1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'e0d211763de638d8ea7e4b87800048f0897201cf5a51f3f180428b592b6d7a59', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 33293, hash: '364797520f34c7c4b94a8e75af528ea6c7a985dcf18d8c907f2ffbd5ce3fdf25', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 35296, hash: '094dc541f4cfb95ee1f2e6eb84c0452c211991e71035bb58c47a8611ea11723f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 33948, hash: '930e2dfb6efce6e5d3bb09e6867c3dc7b2e85ee113ca278cf854e8628be2f08a', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 78458, hash: 'fc57e48a4ac3bbd08d0603d97cb894391ba628f8eccd179288dfcdc18ed7717a', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 55698, hash: '40216fc54d1ea1f73d0a16eff7770136d47863600ef8188fa982b1ebae921b2a', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 60090, hash: '25311dd7e3befc95b515a77f17cddc7ed26b797d4a0fcddae5b157e624869995', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 74518, hash: '028a3adf5c77b342f183598d5cb97d27d13ee35b01317767f78a314f8298042b', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 70810, hash: 'edd98bb990faa7566d9a4fd7791e8d811c805381e353204b1359ae4e49305216', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 55299, hash: 'f43b21aed14fe212f36059304b54a80337df5f292e53be0858cbc8196630139c', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 58854, hash: '1eacba2bc79291fce809c80c3c4cde6132f2b3e5479ac571c0c346a18616a8c3', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 35014, hash: '286019432c232d60289767903496cd5b99a53d512854267dce382c908e04105f', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 43869, hash: '732e088813ca07ce8ba094ee7e086b4a047ff41f828ad54f6cc7b2d39e00fff0', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 90291, hash: 'e8e06d3ce10e17885050846ae3baf6a19a2052f6f9f5fa80c12a0ee4c709e871', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 66781, hash: 'e898cfe2a2532941bd564f667ba793619671bbb8a025039422ca6bdd5d778451', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 54351, hash: '299f2af7a50144ab958e044cf2cafd87e1869f1b7c213a1e555b2dcc14d60548', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 36166, hash: '86f6b4c54a2514e72995badbefc478c1b37b256718d2f5635815e6bed8d1ecfc', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53998, hash: '56c3bcb6a01e82acb001c39fed3feb7aa53fadc7d025892317e52420701ef5c1', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 58735, hash: 'd0d9ffcfe5ec1af22638048c394f0bd41097ecad9a004325822d78d22152c062', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 72034, hash: '36251ce2b0cd99278d670dc8e59eee53ed2e41cca9d2d175cd45f248aea0fbe7', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 59505, hash: 'b16a75c4bbc611dd9ab3b1eda0a863d8bc6e5429d5c94134c679840da1379911', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 73420, hash: '45ce3fb0f673df4cc45ad71269a4aa2702dfbd8a4336aa08faafbf425f13bc50', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 64530, hash: 'e81e32e0e907889897a0a272fe4e0634daaa978ffe473a245ef17e87bd974523', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'styles-2VJTFRMP.css': {size: 89325, hash: 'EMcL2WFQYLw', text: () => import('./assets-chunks/styles-2VJTFRMP_css.mjs').then(m => m.default)}
  },
};
