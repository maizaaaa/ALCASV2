
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
    'index.csr.html': {size: 11359, hash: '7a48bf893d8625aa9135d7b772ce89dd413a02db66681f0e23cebb7e12fa440e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '30fe6f484c677fb84b5f4ecd11c6d914ffa21a6853e621946e0bace02a156a4c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: 'd309956ac192a280bec37de6ec524ef7d6710c2fd935ac9badf0a6020e52d8af', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '9334acae28684e4955485b6a69a28afe28ce8d7fcc702db4b7585767511df9a3', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '36dfee69a1102e766860c8ad8f139e4533c8126b237e99bb46fc3ca2731ee851', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 88951, hash: '3e2237dc2d2f20fffbdb10a23c53f65d97cedcdc2469d2993f903a9087b25b23', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 59363, hash: '5aa45f1876f62b332886824b9a29194c474e7092a48e7f95bb0cef164c647a19', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 80541, hash: 'f0e8b1767b4df523c504de90aca0b1b6edec2f4364a65c4380e3777841458579', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 70081, hash: '634996069f8cea6c75011a2b476abae39a2349eca5cb2768df87773e3fd35470', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 54249, hash: '4d172868b926764a77936c9cb088c1a354f195d33b813ee9995ed775e1e1d1cb', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 57830, hash: 'd9cfa5518282857e46317d55a924243c3db6290128f809ab791617f6c6fa868b', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '4a0b92b9f10bcbfba2da23f288c799e789f249a4e8fc357d4a519d329b41ae22', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 46050, hash: '80c851f3790f55812fab618adb01408235da1abd28a1941f6005c4b18d35ccd9', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 135001, hash: 'c1e3c42a507cd848853db5a23985e9a3a541ceb972bdea2743b87a2978722d80', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 89562, hash: 'ac60c1251e844a78c29b44b71d443ae60e1edf3033d8d72c11bd7886c5df91b5', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 67302, hash: '66745c2abe78be0cbdf322f47c30de57e2929bb2a5eea5c86c7e1da46be3cb5b', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 133445, hash: '4c865bae4d1c8136f2b53dba7f0fd85cffdb4004cd488419e7397f59ec5b0351', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: '6f6c4fae13a324d447a62be8b2fcd02b43b6ca25d29935aa6353cb5237d11205', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 53310, hash: 'e52c827ecda6a3c5650c804f4d422852b7dbe778c5992bd28070b7898d002c59', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 63403, hash: '24f7349e4314a003c60b72414dd87abf2644f10c39f89ebeaa58e8f6be952e9e', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 71312, hash: 'e390a9a15c02affd800b849015c5fe0b568340853789c7a8113d732a9217e2eb', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 72691, hash: '8a924953d8d4a65b1e56200f8e2dad48e9fd54ed23cb47dcd4e2f5f276be0dc1', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 88501, hash: '0967a5f6288d18bbbd92d6c21ac71949e3efc5f8c766ca0e53545674c52fdfe6', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 91547, hash: '7c8e60dac4ccd31dc6a27f4b710ad8cb99af586d946870f0d4af30b9b48d8dba', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'styles-HGZY7IV5.css': {size: 91117, hash: 'pArdPvcfMkE', text: () => import('./assets-chunks/styles-HGZY7IV5_css.mjs').then(m => m.default)}
  },
};
