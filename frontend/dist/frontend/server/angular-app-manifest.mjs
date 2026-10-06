
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
    'index.csr.html': {size: 11359, hash: '81a8e263d49c2da643d81793b9fb0157fe6ff63b07850da3d85a36ea2741578f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '091fccac73f6082f7f59a537e2f406b6976af9d62ebe0a9a1a95e23a2c77ae3d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '919998101ead20355f232f13be1cf507f56bcae6ee10cba6049803225747b019', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'bdc449009a62ce4393cef20fc8ded8af37032b39f1ad8170b4e622337785eb44', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '91cb3b727ed238070b13de0fa094c23c1febf3426e797a06d4419222633e4db5', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: 'bd71da5c29ee1852cc02717472efa2f3245eaa6c2c13a87af40a9c29c271aa57', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54650, hash: '09ece2a3be0bcbe18c657927ad45c1ac41e13d9fe8a1fdf0fe4da38a173fb3fc', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59042, hash: 'cf032bd9bafa35934bf1624da487ed037f6a7047bc240c708e872239c03afe94', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73463, hash: '50f082ad59702f0fb92d8896cc1ceaf99cca37a797567696224eb66c5bf38889', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '5803cedefa4067f7198069e2d274967a5a2f1520c4c650036ece7a66ca5849be', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 71199, hash: '1b16fe7e6c551771e6be6556035c30368a7dafa9499411d22727172c28129348', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 75837, hash: 'd18e6fbf0793e202e943a33dd1fce43936d65f59634c24d6ddba3d13153d06db', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: 'a2a6d27aa56f59435d9a10a12f6daee11200ef6b05a00365fb4cab3c4050523b', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '957e7923e6027ca8c22a1beb3990372307d35b6c02dd1138b187082866d34950', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65733, hash: '91a66be998671e66714404072608b1cd3710ae3c9705b996436ade7183857a52', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53301, hash: '2e246e9f0c1ed0dbd4c5e15152adb23283c5239ffd728e2a38b6c125cd55a726', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89259, hash: 'c5c5676490aeaafde677132ffd3608cb289ca000f35e611e3540149a43a0b768', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '8a845d6267aef6ca3d03ec8ab5185bfe5bcbd9e138c20f89ed8b18c33e47fbd9', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57691, hash: '10ba7850a78b01a9db03f97be0eea5b7ffb6978445b41a74926351a5e1d03f6b', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 74554, hash: '851b7b111c8d0c8e5b061069db74e8ec4138678e1bc82a2dae9c30f294385f0e', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 90878, hash: 'f7e7377b7de497927c77abad5d2c20c48a2d4254a78a9720d8e0d4ebed24a1bd', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58458, hash: 'e067dba9a26623ae20582d19f88a070faf41d682280d409bdef35892729233da', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 61593, hash: '5e228e8c21c5eea8f8cda8f666e4eec4376ceab9a68ac86e35fd20a54eeb4b22', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72370, hash: '3c056e38412c32a1e5012519002b9f04954c6c0905997080f09ff6d8f0e91bb9', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-L5WCCMJP.css': {size: 77303, hash: 'QYZNTIfQLg8', text: () => import('./assets-chunks/styles-L5WCCMJP_css.mjs').then(m => m.default)}
  },
};
