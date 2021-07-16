import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/studyIndex'
    },
    {
        path: '/studyIndex',
        name: 'studyIndex',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/studyIndex.vue'),
        meta: {
            title: '首页',
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/login.vue'),
        meta: {
            title: '首页',
        }
    },
    {
        path: '/modifyPsd',
        name: 'modifyPsd',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/modifyPsd.vue'),
        meta: {
            title: '修改密码',
        }
    },
    {
        path: '/retrievePsd',
        name: 'retrievePsd',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/retrievePsd.vue'),
        meta: {
            title: '找回密码',
        }
    },
    {
        path: '/myCenter',
        name: 'myCenter',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/myCenter.vue'),
        meta: {
            title: '我的中心',
        }
    },
    {
        path: '/studyMap',
        name: 'studyMap',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/studyMap.vue'),
        meta: {
            title: '学习地图',
        }
    },
    {
        path: '/dataCenter',
        name: 'dataCenter',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/dataCenter.vue'),
        meta: {
            title: '资料中心',
        }
    },
    {
        path: '/myDownload',
        name: 'myDownload',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/myDownload.vue'),
        meta: {
            title: '我的下载',
        }
    },
    {
        path: '/mySpecial',
        name: 'mySpecial',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/mySpecial.vue'),
        meta: {
            title: '我的专题',
        }
    },
    {
        path: '/specialDetail',
        name: 'specialDetail',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/specialDetail.vue'),
        meta: {
            title: '专题详情',
        }
    },
    {
        path: '/courseCenter',
        name: 'courseCenter',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/courseCenter.vue'),
        meta: {
            title: '课程中心',
        }
    },
    {
        path: '/specialCourseList',
        name: 'specialCourseList',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/specialCourseList.vue'),
        meta: {
            title: '专题详情',
        }
    },
    {
        path: '/myExam',
        name: 'myExam',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/myExam.vue'),
        meta: {
            title: '我的考试',
        }
    },
    {
        path: '/myCredit',
        name: 'myCredit',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/myCredit.vue'),
        meta: {
            title: '我的积分',
        }
    },
    {
        path: '/examination',
        name: 'examination',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/examination.vue'),
        meta: {
            title: '考试中心',
        }
    },
    {
        path: '/downloadCert',
        name: 'downloadCert',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/downloadCert.vue'),
        meta: {
            title: '证书下载',
        }
    },
    {
        path: '/coursePlay',
        name: 'coursePlay',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/coursePlay.vue'),
        meta: {
            title: '课程播放',
        }
    },
    {
        path: '/pdfStudy',
        name: 'pdfStudy',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/pdfStudy.vue'),
        meta: {
            title: '课程播放',
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/settings.vue'),
        meta: {
            title: '设置',
        }
    },
    {
        path: '/baseInfo',
        name: 'baseInfo',
        component: () => import( /* webpackChunkName: "score" */ '../views/study/baseInfoModify.vue'),
        meta: {
            title: '基本信息',
        }
    },
]

const router = new Router({
    mode: 'history',
    base: '/m/njcscec/study/',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
        return savedPosition
        } else {
        return { x: 0, y: 0 }
        }
    }
    })

export default router