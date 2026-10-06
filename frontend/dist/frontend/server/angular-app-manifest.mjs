
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
    'index.csr.html': {size: 11359, hash: '2b649d9ee7166b631b101d4b2dcce7d8322bf5d4032413411553a4b47b89936e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '37b79a8ed4335070d51cc99353e6d2cd1bd539617473f714c01d3980c89da210', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '96c9f04e9268d49e228402d231cd29391a5787a28c380e2c68dc11e50283ed4e', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '98af3355d4f5d79fbf25657941c5df3e9686ba351ce57801d6af95273a669f41', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: 'e76c46ba7ab824b9169a95fe48cd298fd48793f10094502ccbca53edfedca872', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '0630f125dd14eda5421db97e2bd2c36d5578a69b097be99045d1ef89615ba9c4', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 58419, hash: '00f267428f2f9d2b81c32320550c705d10a4ae190ac22c111b2c6d7b3d5b3698', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 59253, hash: '27c4d5c68d1e7aa16b6b97f4b15d93b985d3f2cd22893114b12dfd3e0bec6d37', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54648, hash: 'e7d2f8dd54b4579fadf38f4465c38bc2576a264b05505ec3cf2fbdcfffce75dd', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 69760, hash: '19a3669cab20cbd4ebcf4b69c7420f84c299815c9d6d013566a8db978edcd771', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 71199, hash: '9f0da58bcb300a350f2d9b27624e43f3a1e20b951ae08a724e574773fb0ec974', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 75837, hash: '3c0164027c8b8db6d793440b71727e4ed581f4b2aa2b0b034ea9b0040afd5453', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'cba36a5fd39f13d06131f259a4c3032b78ce911ef282ae0b08ee4cca7795e04f', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: 'b1d3584042b5f43209dbefe0f08146bf5e80cdeadf332baa84c931cd92217180', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65737, hash: '0e6fa612d2b02b8dfd711c5927c631f7bd612182978a64afd03993ba8218d843', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53297, hash: 'fa3a47ef29da1fa8b8fbe6f518841f6b15f4a23724bedc693fd076fc2dff5c65', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89259, hash: '7b0ea41186ae7b82bbd010bea55624061a9dcf2659a40dc5b3ecdaf6854aa45d', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'bf791e5fe1fa0835562ab8c47740aa0a4531312a83a0f61993598d90fb7f0fa1', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57687, hash: '9ced888f52a6123f638de0f2e1cd2699156ed134b4152b706615330ccc60e603', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 90878, hash: 'd7f27397fcb9a802e5f671923c2c8009cd64b80ddd05fd8b4807f69cccca6384', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 74554, hash: '23dde6d79d509326d5e99c2a50ce165beead01ffdc73522bd7f788d388f88a79', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58462, hash: '8216b57f493aacc8b2a1692b889a85bed6b974e65f3471f320d3bc0ad1989e37', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 61593, hash: 'cd1c28203b6d319179f427b7e5b04cbb735035bff2270d309541e1e96efae0ce', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 71987, hash: '519bbe13e0b10a486385e545b39b1ab93b22691975f23217e1e1e1e62682a2d3', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-L5WCCMJP.css': {size: 77303, hash: 'QYZNTIfQLg8', text: () => import('./assets-chunks/styles-L5WCCMJP_css.mjs').then(m => m.default)}
  },
};
