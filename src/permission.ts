// import router from './router'
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// import useUserStore from './store/modules/user'


// router.beforeEach((to, _from, next) => {
//     nprogress.start()
//     const userStore = useUserStore()
//     const token=userStore.token;

//     if(token && token !== 'undefined'){
//         if(to.path==='/login'){
//             next({path:'/'})
//         }else{
//             next()
//         }
//     }else{
//         if(to.path === '/login'){
//             next()
//         }else{
//             next({path:'/login',query:{redirect:to.path}})
//         }
//     }

// })

// router.afterEach((_to, _from) => {
//     nprogress.done()
// })