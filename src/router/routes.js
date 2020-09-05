
const routes = [
  {
    path: '/',
    component: () => import('layouts/loginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]    
  },
   {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/Home.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/users', component: () => import('pages/Users.vue') },
      { path: '/session/:id', component: () => import('components/ili/singleSesion.vue') ,name:'singleSession', props:true }
    ]
   },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
