const utils = {
  getHost: function () {
    const hn = location.hostname
    return `//${hn}`
  },
  login: function () {
    // return window.location.href = `http://test.foo.com:8080/pc/smartsite/login?redirect=${encodeURIComponent(window.location.href)}`
    let domain = document.domain
    return window.location.href = `//${domain}:8080/m/njcscec/study/login?redirect=${encodeURIComponent(window.location.href)}`
  },
  _isMobile() {
    let ua = window.navigator.userAgent.toLowerCase();
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag || ua.indexOf('micromessenger') > -1;
  },
  /**
   * 设置页面标题
   * @param {String} title
   */
  setTitle(title) {
    document.title = title
  },
  /**
* 乘法运算
* @param {*} arg1
* @param {*} arg2
*/
  floatMul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      if (s1.split('.').length > 1) {
        m += s1.split('.')[1].length
      }
    } catch (e) {
      console.log(e)
    }
    try {
      if (s2.split('.').length > 1) {
        m += s2.split('.')[1].length
      }
    } catch (e) {
      console.log(e)
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },

  /**
   * 除法运算
   * @param {*} arg1
   * @param {*} arg2
   */
  floatp(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
      let temp1 = arg1.toString().split(".")
      if (temp1.length > 1) {
        t1 = temp1[1].length
      }
    } catch (e) {
      console.log(e)
    }
    try {
      let temp2 = arg2.toString().split(".")
      if (temp2.length > 1) {
        t2 = temp2[1].length
      }
    } catch (e) {
      console.log(e)
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }

}

export default utils