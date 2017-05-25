import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/page-components/login'
import home from 'components/page-components/home'
import invest from 'components/page-components/invest'
import user from 'components/page-components/user'
import regularProduct from 'components/page-components/regularProduct'
import currentProduct from 'components/page-components/currentProduct'
import performance from 'components/page-components/performance'
import myPerformance from 'components/page-components/myPerformance'
import lowerPerformance from 'components/page-components/lowerPerformance'
import lostpassword from 'components/page-components/lostpassword'
import register from 'components/page-components/register'
import registernext from 'components/page-components/registernext'
import account from 'components/page-components/account'
import changePassword from 'components/page-components/changePassword'
import erwei from 'components/page-components/erwei'
import agreement from 'components/page-components/agreement'
import axios from 'axios';
import qs from 'qs';
import {wxShare} from '../common/js/wxShare';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path:'/lostpassword',
      name:'lostpassword',
      meta: {
        title: '忘记密码'
      },
      component:lostpassword
    },
    {
      path:'/register',
      name:'register',
      meta: {
        title: '注册账号'
      },
      component:register

    },{
      path:'/next',
      name:'registernext',
      meta: {
        title: '完善用户信息'
      },
      component:registernext
    },
    {
      path:'/home',
      name:'home',
      meta: {
        title: '首页'
      },
      component:home

    },
    {
      path:'/',
      meta: {
        title: '首页'
      },
      redirect:'/home'
    },
    {
      path:'/invest',
      component:invest,
      meta: {
        title: '投资'
      },
      children:[
        {
          path:'/',
          redirect:'/invest/regular',
          meta: {
            title: '活期'
          },
        },
        {
          path:'/invest/regular',
          name:'regular',
          meta: {
            title: '定期'
          },
          component:regularProduct
        },
        {
          path:'/invest/current',
          name:'current',
          meta: {
            title: '活期'
          },
          component:currentProduct
        }
      ]
    },

    {
      path:'/user',
      name:'user',
      meta: {
        title: '个人中心'
      },
      component:user
    },
    {
      path:'/user/performance',
      meta: {
        title: '规模绩效'
      },
      component:performance,
      children:[
        {
          path:'/',
          meta: {
            title: '我的绩效'
          },
          redirect:'/user/myPerformance'
        },
        {
          path:'/user/myPerformance',
          meta: {
            title: '我的绩效'
          },
          component:myPerformance
        },
        {
          path:'/user/lowerPerformance',
          meta: {
            title: '下级推广人绩效'
          },
          component:lowerPerformance
        }
      ]
    },{
      path: '/account',
      name: 'account',
      meta: {
        title: '账户管理'
      },
      component: account
    },{
      path: '/changePassword',
      name: 'changePassword',
      meta: {
        title: '修改密码'
      },
      component: changePassword
    }
    ,{
      path: '/erwei',
      name: 'erwei',
      meta: {
        title: '我的二维码'
      },
      component: erwei
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: {
        title: '平台协议'
      },
      component: agreement
    }
  ],
  linkActiveClass: 'active'
});
// 路由导航钩子，beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  let titleStr = ''
  console.log(to)
  // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
  for (let i = to.matched.length - 1; i >= 0; i--) {
    titleStr += `${to.matched[i].meta.title}`
  }
  // 更新title
  document.title = titleStr;
  

    axios.post('/x-service/user/share.htm',qs.stringify({
      signUrl: location.href.split('#')[0]
    })).then((res) => {
      let data = res.data,option={};
      if (data.status == 0) {
         option.appId = data.result.appId;
         option.timestamp = data.result.timestamp;
         option.nonceStr = data.result.nonceStr;
         option.signature = data.result.signature;
         
         wxShare(option);
         
      }else{
       
        
      }
    }).catch(function (error) {
     
      
    });
  
  // 继续路由导航
  next()
})
export default router