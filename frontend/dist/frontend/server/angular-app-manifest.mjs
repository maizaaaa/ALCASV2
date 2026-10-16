
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
    'index.csr.html': {size: 11359, hash: '6dec9e0d4833726a248a3f93876d486835fb4d39356f8f743696513dd7084a32', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'd47060419910ff14f9f2ac52558af2536b2eca13f4724f44792714b90b403eef', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '55f4d2b203c5bc212916cf1273a35f9f810cce337656b937c9e53c2db9a24ec7', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '9cc98d82696ee4c8600db2096a0ca05c94d5c8ececc99204c4f8ad8d2fdc39c9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '012883e883cebad815829d71abbda6f820e2f0c221368d2f2f987949189d8fff', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: 'b827a78856de61ee5f1155f82a5ed895ea4943e5cc9dc60b43e9a1e6334c54ea', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80541, hash: '4780525b79770ed849e2d655348ae2bddb3098b9c9835de23d0848cb0e4916ca', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59364, hash: '69054f98a13128ac83700a932574a9021d1e4e8aa3da10ba17d3ce1592d13d5d', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 72307, hash: 'ffe5a04597c441b327b495a4cd4564f4e435ac7230b3486b2e1b183097c75094', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54895, hash: '32832033b58ca32a7d0ad5dc1de8db5f9063790b5abb640b000573c1375822ad', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 67557, hash: '72fe0c8c5c6d7c6802868989a28649e2ee4b6ffea4244938eb95ee30f0a01b34', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: 'cfc4199fd32023b2a4b2e694b1aeafc98e391f299fe140e23ff5f3c745bde01f', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 136953, hash: '619a38877c3891ddda21f5a554c10c98ac12026cb80413c66e5c25e6a2634036', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'a92cde17f1e5ef2f35cd679648d24145965933b304a7b712dfdd2f67108e91cf', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 71312, hash: '70cb9ad0d00c802c024fc0cb5a0657f25800b8aee11434c1ec473fe404739e75', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 74395, hash: 'c4c61de370b60e68434fd705594210238992d56fdd8cf72231f5fa488839c37a', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88896, hash: '41872bdb998e4ad53ad727a1dc3c78c58accd686b8f4b09210dca0de617e3660', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 91534, hash: '696320cf3aac6c62733dc6c0ae9bb4f3e904c025ec731f66f6c1040c618042f4', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '6d2b7549539b4ed7b8da9e4a436492f408c98426d54122bc108b7667c84ca3ed', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'student/appointments/index.html': {size: 67550, hash: '1a39d8e66458f642c86da5ca7970bd50694e70ca650a12916e098afc7cbb217b', text: () => import('./assets-chunks/student_appointments_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67965, hash: '82107a5ffa37b45a286cf5d032e1d51285ab3a5e4143803806641c5a20bbe10f', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53310, hash: '5dc957f90d6a6a9e4d1eebb10be121cafa79a96365b4aa803a0d2d8aa15e4150', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: 'a30208fbdfb34b73bbd778650784c3ed37a8ff8e642ff1de4a92c16cbf894d7a', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 91580, hash: 'c881ba886b42bbea56126adc330aefe2a58ea7f751d25b4f65c3becdd2870667', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 133477, hash: 'd301d240f5a69d9eb0290c191fb5d065f5636e99a068bab99dd3b1cd00adb5b1', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'styles-IO5RH77B.css': {size: 99115, hash: 'B+VmUBbkG5s', text: () => import('./assets-chunks/styles-IO5RH77B_css.mjs').then(m => m.default)}
  },
};
