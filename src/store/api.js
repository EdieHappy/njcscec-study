// 接口地址
// const domain = process.env.NODE_ENV === 'production' ? 'http://47.102.121.177:8080' : 'http://api.foo.com'
// const domain = process.env.NODE_ENV === 'production' ? 'http://zjaznj.com:8080' : 'http://101.132.146.53:9903'
const domain = process.env.NODE_ENV === 'production' ? 'http://zjaznj.com:8080' : 'http://api.foo.com:9903'
export default {
    domain: `${domain}`,
    docCenterListApi: `${domain}/web/documentation`, // 资料中心
    
    specialListApi: `${domain}/web/categorys`, // 专题中心
    getCourseDetailApi:`${domain}/web/courseDetail`, // 获取课程详情
    getCourseInSpecialApi: `${domain}/web/categoryCourses`, // 查看专题下的课程
    getMyDownloadsApi: `${domain}/web/getDocDownloadRecords`, // 查看我的下载
    getStudyMapApi: `${domain}/web/learningCourseList`, // 学习地图，查询课程列表
    getStudyCategoryMapListApi: `${domain}/web/learningCategoryList`, // 学习地图，查看专题列表
    getCategoryDetailApi: `${domain}/web/categoryDetail`, // 查看专题基本信息
    getCategoryCourseListApi: `${domain}/web/categoryCourseList`, // 查看专题下的课程列表信息
    joinStudyActionApi: `${domain}/web/joinLearning`, // 专题 加入学习
    saveStudyActionApi: `${domain}/web/saveLearning`, // 保存学习进度
    downloadFileUrlApi: `${domain}/web/downloadFile`, // 获取可用的下载链接

    getMyExamListApi: `${domain}/web/getExaminationList`, // 考试中心，试卷列表
    getExamDetailApi: `${domain}/web/getExaminationQuestionList`, // 获取考试试题
    submitExaminationApi: `${domain}/web/submitExamination.do`, // 考试中心--试卷提交
    getMyCreditApi: `${domain}/web/getMyCredit`, // 获取我的积分

    loginApi: `${domain}/login`, // 登录
    logoutApi: `${domain}/logout`, // 退出登录
    firstEditPasswordApi: `${domain}/web/firstEditPassword.do`, // 修改初始密码
    forgetPasswordApi: `${domain}/web/forgetPassword.do`, // 忘记密码
    sendEmailApi: `${domain}/web/sendEmail.do`, // 发送邮箱，接收验证码
    updateUserInfoApi: `${domain}/web/updateStudentInfo.do`, // 用户自行修改信息
    updatePasswordApi: `${domain}/web/updatePassword.do`, // 用户修改密码
    getUserEmailApi: `${domain}/web/getUserEmail`, // 根据用户名获取邮箱

}   