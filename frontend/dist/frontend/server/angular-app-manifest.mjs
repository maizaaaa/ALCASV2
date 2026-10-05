
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
    'index.csr.html': {size: 11359, hash: '90e352ebbc9e341d730eafe143ce74aacce960a6d6775fe8808d2cd12b5efd81', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'c9344ffbe75ab0f2bef563351b88631eda2f6019eae250613e6c7ab74272c559', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 32898, hash: '9e550761794a8dc1203e0b17ab06a5ff62587572e36f705c0b56cf02be27cd92', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 32243, hash: '4ccc5d4cc61e3f3a4add38dd8bb9d3786acdc24b50ba72e356392805c03e7eab', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34246, hash: '304a8586bb5db46c394af26b7bf21e1d96643713f92f59113fc7cf6f49e33d62', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 77408, hash: '1444f8b833179f5bd4de83a655294e8e1a67872d3b55200c263bb61ab0510ed0', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'lecturer/schedule/index.html': {size: 49104, hash: 'cfa0579e254913e07f16900ad5b6fd841ec2d39c99166eec9fba9a7a6205248d', text: () => import('./assets-chunks/lecturer_schedule_index_html.mjs').then(m => m.default)},
    'admin/analytics/index.html': {size: 54650, hash: '0d7ac1bdc951b7309fcfb904e0966643557a4fd958709f57e5c30286a8628f5b', text: () => import('./assets-chunks/admin_analytics_index_html.mjs').then(m => m.default)},
    'lecturer/history/index.html': {size: 54353, hash: '75f146ef2ebd18e65a118b9c84d764471ea43aaf681ed6f21e668d84be98e13d', text: () => import('./assets-chunks/lecturer_history_index_html.mjs').then(m => m.default)},
    'admin/settings/index.html': {size: 59248, hash: 'f3e00348e1e970ff99fed360a66c53db3d4aa36ee85d2db952aec6c50f7cf29c', text: () => import('./assets-chunks/admin_settings_index_html.mjs').then(m => m.default)},
    'student/index.html': {size: 71199, hash: 'd810536ab6bba88e0e3db462dc1ec69b192836a60e4ea51984e199c69a33b962', text: () => import('./assets-chunks/student_index_html.mjs').then(m => m.default)},
    'verification-code/index.html': {size: 33964, hash: '6d7702741611a064c52ae781269a2159f6ece2ceff388e17a7d6c67c566f11fc', text: () => import('./assets-chunks/verification-code_index_html.mjs').then(m => m.default)},
    'student/history/index.html': {size: 75837, hash: '677016413d6f454d61af4cee84102458bcb59a54e92a04a717f718a468254c5a', text: () => import('./assets-chunks/student_history_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 42819, hash: 'c9ccf74df2d839c36c456b00efb203a8bb7834af4f0deee3fda05c1bdfa61613', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'lecturer/appointments/index.html': {size: 61490, hash: '0628241a337afdf2dc4fee35a4c89ee8de3e658bc895ef3c9c4d61809d386591', text: () => import('./assets-chunks/lecturer_appointments_index_html.mjs').then(m => m.default)},
    'admin/logs/index.html': {size: 65737, hash: '72cdc4c2c6ec70d88f93f73367f570897721542bce911fa2fb87a28b556726cc', text: () => import('./assets-chunks/admin_logs_index_html.mjs').then(m => m.default)},
    'registration-success/index.html': {size: 35116, hash: 'd0d9ad40f26f17d4dcdd0c41de6dcd169b4c49d0db9238487300631308faea19', text: () => import('./assets-chunks/registration-success_index_html.mjs').then(m => m.default)},
    'admin/broadcasts/index.html': {size: 53294, hash: 'ff46076b06aa0259cdacbce3b84e69c34cca93a5db6946a3ab02f73fbc1c83eb', text: () => import('./assets-chunks/admin_broadcasts_index_html.mjs').then(m => m.default)},
    'admin/attendance/index.html': {size: 57691, hash: '0133cbbd49a06a869b88aafd06713421c213483022011cb9c156e2d3385e8fc1', text: () => import('./assets-chunks/admin_attendance_index_html.mjs').then(m => m.default)},
    'lecturer/profile/index.html': {size: 58075, hash: '0d36b5885516c6fcff5ca37f791d99f406c91ac04ed63141d5133187b7768d45', text: () => import('./assets-chunks/lecturer_profile_index_html.mjs').then(m => m.default)},
    'student/book/index.html': {size: 90878, hash: 'a305fe718ed1197e3a136e4c8b89273363c672dd80e6965645367d53096c34cb', text: () => import('./assets-chunks/student_book_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 58455, hash: '98414e0d815646e864cba4f34fb494bf089318947b73d7d8589070c52b05a88b', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'student/profile/index.html': {size: 61593, hash: '17527b3797ebc1dc1ecd505863ef0cfe26ba31c9b7c2bb8be760f1bec3513488', text: () => import('./assets-chunks/student_profile_index_html.mjs').then(m => m.default)},
    'lecturer/index.html': {size: 59655, hash: 'f4433c804575f7473c5908df8cf94bbbf0bd04b0d95a4a576e70593fc0f4669c', text: () => import('./assets-chunks/lecturer_index_html.mjs').then(m => m.default)},
    'styles-IHWLQUPJ.css': {size: 77680, hash: '6M7y/87V5Cg', text: () => import('./assets-chunks/styles-IHWLQUPJ_css.mjs').then(m => m.default)}
  },
};
