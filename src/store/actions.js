/*
 * @Author: caomin 
 * @Desc: 接口
 * @Date: 2021-01-19 11:04:12 
 * @Last Modified by: caomin
 * @Last Modified time: 2021-07-14 09:43:26
 */
import _ from 'lodash'
import request from '../lib/request'
import api from './api'
import qs from 'qs'
import queryString from 'query-string'
import utils from '../lib/utils'

const checkLogin = (res) => {
    if (+res.code === 1024 || res.needLogin) return utils.login()
    return res
  }

const resolveGet = async (url, params = null ) => {
    try {
        const query = params ? `?${queryString.stringify(params)}` : ''
        const res = await request(`${url}${query}`)
        return checkLogin(res)
    } catch (error) {
        console.error(error)
        return {
          code: 500,
          msg: '服务出错'
        }
    }
}
export default {
    /**
     * 资料中心数据列表
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getDocCenterListFun({commit}, params) {
        return await resolveGet(api.docCenterListApi, params)
    },
    /**
     * 全部专题
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getSpecialListFun({commit}, params) {
        return await resolveGet(api.specialListApi, params)
    },
    /**
     * 获取专题下的课程
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getSpecialCourseListFun({commit}, params) {
        return await resolveGet(api.getCourseInSpecialApi, params)
    },

    /**
     * 获取学习地图
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getStudyMapListFun({commit}, params) {
        return await resolveGet(api.getStudyMapApi, params)
    },

    /**
     * 获取学习地图专题
     * @param {*} param0 
     * @param {*} params 
     */
    async getStudyCategoryMapFun({commit}, params) {
        return await resolveGet(api.getStudyCategoryMapListApi, params)
    },

    /**
     * 加入学习
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async joinStudyFun({commit}, params) {
        return await resolveGet(api.joinStudyActionApi, params)
    },

    /**
     * 登录
     * @param {*} param0 
     * @param {*} params 
     */
     async login({ commit }, params) {
        return await request(`${api.loginApi}`, {
            method: 'POST',
            // mode:"cors",
            body: qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        }, {
            shouldLogin: json => +_.get(json, 'code') === 10000
        })
    },
    /**
     * 退出登录
     * @param  param0 
     */
    async logout({commit}) {
        return await request(`${api.logoutApi}`)
    },

    /**
     * 修改初始密码
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async firstEditPasswordFun({commit}, params) {
        return await request(`${api.firstEditPasswordApi}`, {
            method:'POST', 
            mode: 'cors',
            body:qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
    },

    /**
     * 忘记密码
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
     async forgetPasswordFun({commit}, params) {
        return await request(`${api.forgetPasswordApi}`, {
            method:'POST', 
            mode: 'cors',
            body:qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
    },
     /**
     * 发送邮箱，接收验证码
     * @param {*} param0 
     * @param {*} params 
     * @returns
     */
    async sendEmailFun({commit}, params) {
        return await request(`${api.sendEmailApi}`, {
            method:'POST', 
            mode: 'cors',
            body:qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
    },

    /**
     * 修改密码
     * @param {*} param0 
     * @param {*} params 
     * @returns
     */
     async updatePasswordFun({commit}, params) {
        return await request(`${api.updatePasswordApi}`, {
            method:'POST', 
            mode: 'cors',
            body:qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
    },

    /**
     * 根据账号查邮箱
     * @param {*} param0 
     * @param {*} params 
     * @returns
     */
     async getUserEmailFun({commit}, params) {
        return await resolveGet(api.getUserEmailApi, params)
    },
    /**
     * 设置--学员自行修改用户信息
     * @param {*} param0 
     * @param {*} params 
     */
     async updateUserInfoFun({commit}, params) {
        return await request(`${api.updateUserInfoApi}`, {
            method:'POST', 
            mode: 'cors',
            body: JSON.stringify(params)
        })
    },
    /**
     * 获取我的下载
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getMyDownloadsFun({commit}, params) {
        return await resolveGet(api.getMyDownloadsApi, params)
    },
    /**
     * 获取可用的下载链接
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getDownloadFileUrlFun({commit}, params) {
        return await request(`${api.downloadFileUrlApi}`, {
            method: 'POST',
            body:qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })  
    },
    /**
     * 获取我的考试列表
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getMyExamListFun({commit}, params) {
        return await resolveGet(api.getMyExamListApi, params)
    },

    /**
     * 获取考试试题
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getExamDetailFun({commit}, params) {
        return await resolveGet(api.getExamDetailApi, params)
    },

    /**
     * 考试中心--试卷提交
     * @param {*} param0 
     * @param {*} params 
     */
    async submitExaminationFun({commit}, params) {
        return await request(`${api.submitExaminationApi}`, {
            method:'POST', 
            mode: 'cors',
            body: JSON.stringify(params)
        })
    },
    /**
     * 获取我的积分
     * @param {*} param0 
     * @param {*} params 
     */
    async getMyCreditFun({commit}, params) {
        return await resolveGet(api.getMyCreditApi, params)
    },

    /**
     * 根据专题id获取专题基本信息
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getCategoryDetailInfoFun({commit}, params) {
        return await resolveGet(api.getCategoryDetailApi, params)
    },

    /**
     * 根据专题id获取专题下的课程列表
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getCategoryCourseListFun({commit}, params) {
        return await resolveGet(api.getCategoryCourseListApi, params)
    },

    /**
     * 获取课程详情
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getCourseDetailFun({commit}, params) {
        return await resolveGet(api.getCourseDetailApi, params)
    },

    /**
     *  保存学习进度
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async saveStudyActionFun({commit}, params) {
        return await resolveGet(api.saveStudyActionApi, params)
    }
    // async getDocCenterListFun({commit}, params) {
    //     const { pageNum, pageSize, draw, subject } = params
    //     return await request(`${api.docCenterListApi}?pageNum=${pageNum}&pageSize=${pageSize}&draw=${draw}&subject=${subject}`)
    // }
}