import HomePage from '@/pages/homepage/HomePage'
import CompanyPage from '@/pages/companypage/CompanyPage'
import Professor from '@/pages/productpage/Professor'
import News from '@/pages/news/news'
import Detail from '@/pages/common/Detail2'
import AlliancePage from '@/pages/alliancepage/AlliancePage'
import AboutPage from '@/pages/aboutpage/AboutPage'
import Consultation from '@/pages/consultation/ConsulationPage'
import ForumHome from '@/pages/forum/ForumHome'
import ForumDetail from '@/pages/forum/ForumDetail'
import Login from '@/pages/common/Login'
import Register from '@/pages/common/Register'

const routes = [
  { path: '/', redirect: '/website' },
  {
    path: '/website',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '中地基勘官网首页',
      navShow: true
    }
  },
  {
    path: '/website/company',
    name: 'Company',
    component: CompanyPage,
    meta: {
      title: '企业概况',
      navShow: true
    }
  },
  {
    path: '/website/professor',
    name: 'Professor',
    component: Professor,
    meta: {
      title: '专家列表',
      navShow: true
    }
  },
  {
    path: '/website/news',
    name: 'News',
    component: News,
    meta: {
      title: '新闻中心',
      navShow: true
    }
  },
  {
    path: '/website/Detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '详情页',
      navShow: true,
      navType: 'enterprise_details'
    }
  },
  {
    path: '/website/companypage',
    name: 'Companypage',
    component: AlliancePage,
    meta: {
      title: 'This is Alliance page',
      navShow: true
    }
  },
  {
    path: '/website/about',
    name: 'AboutUs',
    component: AboutPage,
    meta: {
      title: 'This is AboutUs page',
      navShow: true
    }
  },
  {
    path: '/website/consultation',
    name: 'Consultation',
    component: Consultation,
    meta: {
      title: '全过程咨询',
      navShow: true
    }
  },
  {
    path: '/website/forumHome',
    name: 'ForumHome',
    component: ForumHome,
    meta: {
      title: '中地论坛',
      navShow: true,
      isNotLogin: true
    }
  },
  {
    path: '/website/forumDetail',
    name: 'ForumDetail',
    component: ForumDetail,
    meta: {
      title: '中地论坛详情页',
      navShow: true,
      isNotLogin: true
    }
  },
  {
    path: '/website/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '中地基勘登录',
      navShow: false,
      isNotLogin: false
    }
  },
  {
    path: '/website/Register',
    name: 'Register',
    component: Register,
    meta: {
      title: '中地基勘注册',
      navShow: false,
      isNotLogin: false
    }
  }
]

export default routes
