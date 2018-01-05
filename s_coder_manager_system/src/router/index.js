import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// 笔记管理
import noteView from "../components/notemanager/notemanager"
const NOTELIST = resolve =>require(['../components/notemanager/notelist'],resolve);
// banner管理
import bannerView from "../components/bannermanager/bannermanager"
const PICMANAGER = resolve =>require(['../components/bannermanager/picmanager'],resolve);
// 提问管理
import questionView from "../components/questionmanager/questionmanager"
const QUESTIONLIST = resolve =>require(['../components/questionmanager/questionlist'],resolve);
// 评论管理
import commentView from "../components/commentmanager/commentmanager"
const COMMENTLIST = resolve => require(['../components/commentmanager/commentlist'],resolve);
// 用户管理
import userView from "@/components/usermanager/usermanager"
const USERLIST = resolve => require(['@/components/usermanager/userlist'], resolve);
// 签到管理
import signinView from "@/components/signinmanager/signinmanager"
const SIGNINCOUNT = resolve => require(['@/components/signinmanager/signincount'], resolve);
// 问题回复管理
import nestedreView from "@/components/nestedreviewmanager/nestedreviewmanager"
const NESTEDRELIST = resolve => require(["@/components/nestedreviewmanager/nestedreviewlist"], resolve);
// 管理员列表
import pageRouterView from "@/components/managermessage/managermessage"
const MANAGERLIST = resolve => require(["@/components/managermessage/managerlist"], resolve);
const SYSTEMLOG = resolve => require(["@/components/managermessage/systemlog"], resolve);
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    meta: {
      breadcrumbName: "首页"
    },
    // redirect: '/notemanager/notelist',
    children: [{
      path: '/notemanager',
      component:noteView,
      meta: {
        breadcrumbName: "笔记管理"
      },
      children: [{
          path: '/notemanager/notelist',
          component: NOTELIST,
          meta: {
            breadcrumbName: "笔记列表"
          }
        }

      ]
    },{
      path: '/bannermanager',
      component:bannerView,
      meta: {
        breadcrumbName: "banner管理"
      },
      children: [{
          path: '/bannermanager/picmanager',
          component: PICMANAGER,
          meta: {
            breadcrumbName: "图片管理"
          }
        }

      ]
    },{
      path: '/questionmanager',
      component: questionView,
      meta: {
        breadcrumbName: "提问管理"
      },
      children: [{
          path: '/questionmanager/questionlist',
          component: QUESTIONLIST,
          meta: {
            breadcrumbName: "问题列表"
          }
        }

      ]
    },{
      path: '/commentmanager',
      component: commentView,
      meta: {
        breadcrumbName: "评论管理"
      },
      children: [{
          path: '/commentmanager/commentlist',
          component: COMMENTLIST,
          meta: {
            breadcrumbName: "评论列表"
          }
        }

      ]
    },{
      path: '/usermanager',
      component: userView,
      meta: {
        breadcrumbName: "用户管理"
      },
      children: [{
          path: '/usermanager/userlist',
          component: USERLIST,
          meta: {
            breadcrumbName: "用户列表"
          }
        }

      ]
    },{
      path: '/signinmanager',
      component: signinView,
      meta: {
        breadcrumbName: "签到管理"
      },
      children: [{
          path: '/signinmanager/signincount',
          component: SIGNINCOUNT,
          meta: {
            breadcrumbName: "签到统计"
          }
        }

      ]
    }, {
      path: '/nestedreviewmanager',
      component: nestedreView,
      meta: {
        breadcrumbName: "问题回复管理"
      },
      children: [{
          path: '/nestedreviewmanager/nestedreviewlist',
          component: NESTEDRELIST,
          meta: {
            breadcrumbName: "问题评论列表"
          }
        }

      ]
    }, {
      path: '/managermessage',
      component: pageRouterView,
      meta: {
        breadcrumbName: "管理员信息"
      },
      children: [{
          path: '/managermessage/managerlist',
          component: MANAGERLIST,
          meta: {
            breadcrumbName: "管理员列表"
          }
        },
        {
          path: '/managermessage/systemlog',
          component: SYSTEMLOG,
          meta: {
            breadcrumbName: "系统日志"
          }
        }

      ]
    }]
  }, ]
})
