
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
    'index.csr.html': {size: 11359, hash: '7a6b8d2854b92d8b692fc885d3e42e7561c414a1a71a7a95233f83cc2a958d82', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '7245b5544c054bcb4fed1428f473a9a8cb06c1e893f97e74a51975d3257700b9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '23ce064648fd9295f2d41838213bf14f6f9c6ff6d60e02131acaa7fba8a36890', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: 'dde3358955d2bda1cbe6669fd9ecbbb9e58350ebbac58f5310c981497b9b655c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '097cc66acd716f135a0fa8ac871b956bcebe983d56ddadd2b898cc333ec006cb', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59361, hash: '114210ec5aabed97594d85753ab1b13c5ae89b019d4fc9d3a56a1c3bb04a3b98', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77726, hash: '963ec0d913e637c3f5080d94e0a0eef2294c387150f985828ce53c2771c4065c', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 73786, hash: '3e88e7a4ad9f5636796de5231885bc73ed28a12edf2932f60561f4c5428abf02', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 70075, hash: 'd014c634cf60ec18a81a156ef6983bb22c1f2d04a88731d7ad037b46b0e984bd', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: 'dd18c10826e8dff0dec864bb17c590715a5618664ae626bef38cf3d69c160aa6', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: '2c2d5468b6fa9e00065443a0a4651b247d3634611d13881b2968b29e54e3ce10', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'e3a0edf711b029aa8b7b15268cc70801277b960ca088a3f2cd3df0e9bf8e3b66', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 123727, hash: '3eef74290d331ffedc62373438b9e6b4c2abed3a1a5af2fc4d8be79fad30bdcf', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: 'd85e9ff226f91a06d527b1aa21cdaf6e16f1213c433f5c22a797d40ce3c1930c', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53615, hash: '6cc3164d99669b800b5534d1a2f472976064648739fef406719ad3b7c48fd596', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89562, hash: '67b4776d108b528095e9463106a731e784860e49b24b9ebdad0d94361c2cf52d', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'a031ea0e0a8ce6606012bb852cbca1a3d241dd5ac27e3c60b66b21ee0125b6c4', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53285, hash: '3f5293a63a1526c86aba164194bd06386f0d01c7450a089ddd7cf949a3d08811', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 121301, hash: 'd7a0d5e7ff1e3738c493b7a559e01464fb2019f7f8b30619455625e95bb234e8', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 71312, hash: 'fb6c9236655a960ab1a80d651643964b6c08d974e472c5f0c4204d1ef55e90a5', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 80968, hash: '84cf9b3540e339f63b8b3bde812b150ff3d4607c0ce74a8392cebb18248530f7', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: '4bdfeef944ba14fc7b87b4f168281767e2b0912d9b7b184931d830d882718c7e', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72691, hash: '3ae6b03db969a695841a26813660de29ed84f691a28559b83640d96b0395e459', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 74042, hash: '241e91166869724a7a3140c1aecc242bb7fb46b4497ab277763f853091fbb96a', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'styles-3KNDRR5U.css': {size: 90671, hash: '+JO65iMdjRE', text: () => import('./assets-chunks/styles-3KNDRR5U_css.mjs').then(m => m.default)}
  },
};
