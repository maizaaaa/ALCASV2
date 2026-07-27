
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
    'index.csr.html': {size: 11359, hash: 'd9eae21ee5ffd7970663dd20c3bbc3bfe4216f25fc996a889b665dd7d4dd1bde', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '92a9724f82bf76b61a15c46bc236e892a7cb6545716fdaee51b810fba2a4f173', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: 'e031f6292917a3b3f8a8a549d1178178fe5246ceb8df2498b476fb505b957164', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: 'da84ca2520a46d5153a52fb6fc18cd1aa6d5364e5afd8b7ea34d0b3eea455863', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '1892bf18b7f97c264b91d51b5c849b3d8c8998712a0a75ae1b504511b81d65b2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 67156, hash: '03eaae710a4a7dbd9051ba00df9a32a2f502f150d06158d295c12958fdfb3322', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 44399, hash: '893cfa70a28642af1f6b2166721a210f0a8a54fc9f4c213f8a86ef0c0d6a3f3b', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 48995, hash: 'cb921c78939f196203ce0c7d7440b9c05dafa911cb9796acfa76ef38e7753cd9', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 47760, hash: '9a1323e97f6fbe0dab1e294a5f5a664400b4b67d7a76d99e41f9a5fdb90a8b04', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 46886, hash: 'f29d2a5c90a04631f1713ebf1efcfc7c2e85ccec488767cde4d21ac82222c20c', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 37954, hash: 'e07d81046c3c7e6149c9855320031327b4c77d44a6566f2a1d8978fbd4b5f0a1', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: '6a453995d7c9d74f1e07496027ab52f04ce3fa0cacf55abbc28e07baa11e0e67', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 31111, hash: 'b08e33224db7bd008246a26358a93dd0a5ca4228983dea5c806210344ebcc7df', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: 'b15b47eee4a08df9be217012eaf42eaa7003c419d2f1445af60fa9ca055a38fa', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 55483, hash: '7a38e8623c6e7194d14f70da2b8a8bbb68bdbc9ab3e28f4a8adbe6749d41d554', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 43050, hash: '9b853a0d4767daf1643d0ad775bcb60ac591b7cfe155933ed990be95f2d5c565', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 53832, hash: 'f245c90fbf07ae2edfd2a9edc3e3ac0742b660fbb768bb87a0f16bfea171c5b7', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'ecdfb1d7e2dac79dcc4bf9acfa0fed1377645367816674b59dc3a652bf064137', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 43731, hash: '8f994715f34362f6e01be98b8725a61f4f4b7eb10f6d1f0e6be5bc9da2fcd679', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 47068, hash: '83ff1a433ac9255589d680fc9bb0d187214d14934ba2dbc8c7b4a7c2e4e1636c', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 31196, hash: '5cab22e997277a7dd5293a204470478a4714e434b634a23d1d7ad1808df29946', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 47440, hash: '26594af77745014185b22edd1d7b570cf6adb5db72d3101d8df4a807ce90efdc', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 51257, hash: '0c2ca048a669d3123a11f17ce52bc646575ae908c888fcaa0c11c6b3311f8f94', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 46315, hash: 'cd2a2b3ca699ce0b8e9853b741d43e2c35fcb37b87f09ada0083ec149719d90e', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-INGC7PXQ.css': {size: 65474, hash: '7FUisizMXzQ', text: () => import('./assets-chunks/styles-INGC7PXQ_css.mjs').then(m => m.default)}
  },
};
