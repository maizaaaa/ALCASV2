
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
    'index.csr.html': {size: 11359, hash: 'd185e38b6ce6ce8af65b8eede7d11b9cfea28176f62e45f859c0e7983a9d3757', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '4c3f1490e6eabd4ea57e00e5457a29d581340a5ef687002ee4d3f2d4f8711dcf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '361dfc854a441665a68beb9c0097b3d47bad4fbecadb48af80618c4908fc1919', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'aeeab3a2912eed0b0767e653f5dbda1dea4f02495fdaa72042141eb1187ffdd5', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '000d9cf6b2be95edf7e1d954be204944510003774c1ce20900fffb4820dbfeae', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: '1c429985813e1cf98c0faf4ac1761ebdace18545ea9703549910da19e0b9fc5d', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80541, hash: 'fd69f87b3acd958caf5a155222b30c6822c94c0df3b01ddbecbcd0624b8b3314', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 77540, hash: '259af83c28b3fa45b08575cfa2ea1c4a8091ddbf5c800365db71e17583fc0d19', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 79767, hash: 'fef035ab6a3da5c17d445b0c55cff15fb8c636601b4376f2d5bcb492084667c2', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 74672, hash: '7588afbf10a107c4bdf0d1949e89adba70838f228f9d153db286bf2b323b80df', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 63661, hash: '9bf311c0bc12a0fcb1af773227fb0fdd0151ba488e44acd7a11231db49af65e4', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 70399, hash: '4778c17f965a701fc259b9bd9ab0ba3e973467cd22693a8dd3e7dae59d4291c7', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 136919, hash: 'ec3b7b15edc1b7250ec8f6e19347f0f411dd083e1ac943c3474ca14752557d0b', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'bc4ddd7ac1cb5e6a84d1ad445e5384f15abdd605c4ccfc8ba9784b81c4c8047e', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 77654, hash: '1b4c41fd98c7210f62305c75997e93a41d08b1bf127e38e8998af8837ad33a32', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 81852, hash: '4368bcb9f5eb3633dbab8fcdf1d6f0608d2d509aae5bb5b0813118ddaa38431e', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88891, hash: 'c3f874b601a763479f937c82cc689c196b2101bae7b7ce0b72f9112f77c51a2f', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 92579, hash: '53f0deea4506b50370012ac0174a9c57c56d4b5bd0c14711434ce74f3de7304c', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '4baa125eb19a42a30c522faaf9b0122322824b73707924addafcb78c6faba69a', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 74665, hash: '5d7646640a924abc66d63d1b490f20d8b57ae70cd7d7059ec98ef10729d51edf', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67958, hash: '0cce9f4cc76961384673b2caf5ee9ce845362f4625ed90005874ea91ea5a1920', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: '74bc1d9c515ba9043da055a0eb5ccce8cdecba972efb211fde3cc87bbf97524c', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 81229, hash: '9a7ca450f39762f40501f40efebd16c55d6dc77d86a331443bb326010ad2ba21', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 140669, hash: 'bac325ac670810b5c7317d5e34bd1f07cd1d1f9c1431741b9b9bd5ccd0ec6b7c', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 143695, hash: '5b1211b9c07a3706b0ab4369faf419b8c073be58fcf6eefc82f9b5ceae7296cd', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'styles-GIZI6F56.css': {size: 102745, hash: 'wBXvLe+zuiw', text: () => import('./assets-chunks/styles-GIZI6F56_css.mjs').then(m => m.default)}
  },
};
