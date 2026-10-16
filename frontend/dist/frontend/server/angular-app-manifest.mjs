
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
    'index.csr.html': {size: 11359, hash: 'ffe212b65a9fcdce4a38404579e116f2870899eab259f16c4110c35ae1cf55d0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'ddba69dbd22e0d92acfe00341cfc1b9ad32109a6cdc2bb63386e757735e3b997', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '297ce18e3c14aae3b02aa2510b183593a8376caaa1e840ebe2f23ef7b4fcdfb7', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'd548d8cc6ad11197dc7e70f9cc48b552b86bd1d413dabef5737124c55701a6b7', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'd37079b8b76c08090a3195b89cda4b9c317bb5e4ce10e45efd0dbc5b4eca4884', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: '8400c05f6c208cf2a0143abf7f6a70c51eb38a799ccdb1ac69ddce75889e3ee0', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80541, hash: '3c5603306e61c462f46b655b4514e086531535e7e3ef5396ff57928f298689f8', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 70083, hash: 'd4a5f2740510b8cbd0b6a93adfc92735d0ace53062adebfeefab437499e4873d', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54895, hash: '97d4589763546e9f9a4255f895f6e7af8f239a4b705d933fd07afacc519556c5', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 72307, hash: 'dac81f90fdb18dd6892827580e81bb2fab674675134b725531dbfbb51eb575a2', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 67557, hash: '14bf881da318873813af986472f9a42b5d901849bd8be8a870c1a369642ca8ca', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '79cb35a0f345c2e0cb133ddd285418b499d524b900a348b1d092f0551f306142', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: '054c66f13b352c6a432d19edf528d0514a8caf54d40e2362eab2c3603c567527', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 136954, hash: '2235ac66afd4f3065501b2e52da880f52cbab1ef87a4413258f9e9834b049b1f', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70202, hash: 'd454a87253801cf541ee7a761dd819990a183a26191cc718214a376597821353', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 74395, hash: '5e3e88b6e3c75dc9115664ec63601a0adc1b61d78f461a0d7dfe70870623027b', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 91534, hash: 'bf407e317e32caca4b9870b450b1ce9c47b6e6ad94c403a40f75eabd1e0f86f8', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88894, hash: 'c72788d0f24ac640f44a51f6cc700c146696e12cb2d499fb663a5f5a1ab5f0fc', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '96494bf71efed21f327eeaa62c973a7bdea89739e2e7c4c3b2df7e5920111d70', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 67550, hash: 'e94e8512c346fa53b66ddd84b7834375394dd040931c0807fcdfb100b0d22fed', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67952, hash: '5b13ddf3f8ae22ef802bfc8fd3f810425d9c0283e0983ee1bb4ae3995deff00a', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53310, hash: '8803afdce3c4cfe2eb69a316e711dd057a068da170f00fa7349ba9bfa1831b76', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: '601c3e8f8b8fceafe1611cb271749de37456d45fe957c1af2b9d4c866f90303f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 91584, hash: '7fc250bc31b83e3081279173ceb5f4a696859713c6f858cdf9f3df09540a783e', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 133475, hash: 'f83f7f42f44f495b4f9b87cd3014089d163e6d7f1e0af9c31b45fde608083179', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-IO5RH77B.css': {size: 99115, hash: 'B+VmUBbkG5s', text: () => import('./assets-chunks/styles-IO5RH77B_css.mjs').then(m => m.default)}
  },
};
