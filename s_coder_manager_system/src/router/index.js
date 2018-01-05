import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import notemanager from '@/components/notemanager/notemanager'
import bannermanager from '@/components/bannermanager/bannermanager'
import questionmanager from '@/components/questionmanager/questionmanager'
import commentmanager from '@/components/commentmanager/commentmanager'
import usermanager from '@/components/usermanager/usermanager'
import signinmanager from '@/components/signinmanager/signinmanager'
import nestedreviewmanager from '@/components/nestedreviewmanager/nestedreviewmanager'
import managerlist from '@/components/managermessage/managerlist'
import systemlog from '@/components/managermessage/systemlog'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/notemanager',
      components:notemanager
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
      		{path:'/notemanager',name:'notemanager',component:notemanager},
      		{path:'/bannermanager',name:'bannermanager',component:bannermanager},
      		{path:'/questionmanager',name:'questionmanager',component:questionmanager},
      		{path:'/commentmanager',name:'commentmanager',component:commentmanager},
      		{path:'/usermanager',name:'usermanager',component:usermanager},
      		{path:'/signinmanager',name:'signinmanager',component:signinmanager},
      		{path:'/nestedreviewmanager',name:'nestedreviewmanager',component:nestedreviewmanager},
      		{path:'/managerlist',name:'managerlist',component:managerlist},
          {path:'/systemlog',name:'systemlog',component:systemlog},
      ]
    }
  ]
})
