
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
    'index.csr.html': {size: 11359, hash: 'b2f459dab01e6d4dbace7150ce73c03df7a5a8c1846c7fa11ff05976d3a76ed0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '28a12241769b7427cd7c04d55dd52e194643a1d2f3a59591e9172f37764fee83', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'f341378aaf4a812979e36d22a5d37f88746479a4ea2168c88c86d11526284609', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '2236e479c399fbb47a9a3ac9bb9aa7f0739af71631ef2c0180c54379074b6984', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'ba87953d385ab8918f1075c59babc62c8f998fbaa0836434d1705db2d9bda68b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '0b3687d53ef938c1b7ff976f89be22b2304e8ebaaa4d72ec0780bd433cc0529c', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54646, hash: '578b4b790c1624778885a82e51d297d050f8e8514d18217608361e62c01688a0', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59042, hash: 'd4bb2ebc877de420246660549d5100093a32c3e1c76c5199fcbf3966612ecad8', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73468, hash: 'de8e3710eab2d7b49e377bfa3b4e1da09609230c53e36abbdcaa7911dbe38fbd', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '81d1c073e7280cf21f8fb3113363c09cee9dd2f800b582a292dee81be4ee7dd1', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57709, hash: '9dcc5bc8bb043aea66b36650e76422168ed721cb751fbfd32374c69d5059af96', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54178, hash: 'ed946a5180ebe27b714b6d7d47a810398fc3836f33259f4fbb688896e59f573c', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'ebe3825552597f80eeb890bdb7570dd374883c9e8ddb1838a49cef121a7c334c', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '9501ce58041e8f0d9ba587ce39d7debece9d443269912fb8b3acff4b22735a58', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53294, hash: '098434125983cd38474e6753458981b550e70f4abdb8a4fe3618507864cec8a9', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65737, hash: '783d9b01d6a69fbda9bb266ee7950cc81acf791f3858886d4a252156467eeb77', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89241, hash: 'b936179c910cc74f35950fb4f32c4ab12ce294a5f9777dcc6cef373307791732', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'e45269d097d89ffb52c6b699b295e35d7515387f77f932437bc98ca198343386', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57691, hash: '5ee9864a09b505e1f279aa06d305b239adeae99b5fd3f08dcae6826fec142e44', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 76627, hash: '76c354d604d52ee5674b66175b70825515da50322e9defa8ec29617079defbeb', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 70991, hash: '9c404afdfe9fbbd84749aa581ed7c789e83c1761f2d11b481674f2fc9c44b741', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72370, hash: '4745cbcf82899c1f2fe6baaf3073afc8abc116b29278edc9d32d5fb530fba128', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63343, hash: '78f3a8704489252ef0d1842d9589667041264112cb47839a1aa11bd5056dbf33', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58455, hash: '32a75588e4bbfec99be71a35fe60e0ee888a2f0ad9c5fefcc33923bcde94c74e', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-TDBBZWGG.css': {size: 83272, hash: 'X/Ex/VcYYI8', text: () => import('./assets-chunks/styles-TDBBZWGG_css.mjs').then(m => m.default)}
  },
};
