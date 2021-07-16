<template>
    <div class="study-page retrieve-psd">
        <navbar :title="titles[step]"></navbar>
        <div class="retrieve-box">
            <div class="step-box" v-if="step === 1">
                <van-cell-group>
                    <van-field v-model="userName" label="账号" placeholder="请输入用户名" />
                </van-cell-group>
                <van-button class="opt-btn" round block type="info" native-type="submit" :disabled="userName === ''" @click="next">{{buttons[step]}}</van-button>
            </div>
            <!-- <div class="step-box" v-if="step === 2">
                <div class="input-tips">请填写出完整的邮箱账号136******.COM</div>
                <van-cell-group>
                    <van-field v-model="email" placeholder="请输入邮箱地址" />
                </van-cell-group>
                <van-button round block type="info" native-type="submit" @click="next" :disabled="disabled" >{{buttons[step]}}</van-button>
            </div> -->
            <div class="step-box" v-if="step === 2">
                <div class="input-tips">接收验证码的邮箱账号为<em>{{email}}</em></div>
                <van-cell-group>
                    <van-field v-model="verifyCode" label="验证码" placeholder="请输入验证码">
                         <template #button>
                            <van-button size="small" type="primary" color="#1989fa" :disabled="isSmsSend" @click="sendCode">{{ sendBtnText }}</van-button>
                        </template>
                    </van-field>
                     <van-field
                        v-model="newPsd"
                        type="password"
                        name="新密码"
                        label="新密码"
                        placeholder="请设置新密码"
                    />
                    <van-field
                        v-model="newPsdAgain"
                        type="password"
                        name="密码"
                        label="确认密码"
                        placeholder="请再次输入新密码"
                    />
                </van-cell-group>
                 <div class="form-tips">
                    <span>密码由8-10位数字、字母或符号组成</span>
                </div>
                <!-- <div class="input-tips">重新发送（<van-count-down :time="time" format="ss" />）</div> -->
                <van-button class="opt-btn" round block type="info" native-type="submit" @click="submitModify" :disabled="disabled" >{{buttons[step]}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'retrievePsd',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {
            step: 1,
            titles: ['','找回密码', '填写邮箱账号', '输入邮箱验证码'],
            buttons: ['', '下一步', '提交', '提交'],
            userName: '',
            email: '',
            disabled: false,
            time: 60000,
            isSmsSend: false,
            sendBtnText: '发送验证码',
            verifyCode: '',
            timer: null,
            counter: 60,
            newPsd: '',
            newPsdAgain: ''
        }
    },
    created() {
    },
    methods: {
        async getUserEmail() {
            try {
                const { success, message, list } = await this.$store.dispatch('getUserEmailFun', {
                    userName: this.userName
                })
                if(success) {
                    this.email = list
                    // this.sendCodeAction()
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        next() {
            if(this.step > 2) {
                return
            }
            this.step ++
            if(this.step === 2) {
                this.getUserEmail()
                // this.sendCodeAction()
            }
        },
        sendCode() {
            this.sendCodeAction()
        },
         // 发送验证码
        async sendCodeAction() {
            try {
                const { success, message } = await this.$store.dispatch('sendEmailFun', {
                    email:  this.email
                })
                if(success) {
                    this.$toast('验证码发送成功！')
                   
                    // 开始倒计时，60s之后才能再次点击
                    this.countDown()  // 这里实现倒计时的功能，文章下面开始介绍
                } else {
                    this.$toast(message || '验证码发送失败！')
                }
            } catch (error) {
                console.log(error)
            }
        },
        countDown () {
            // 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
            this.timer = setInterval(() => {
            // 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
            this.sendBtnText = `(${this.counter}秒)后重新发送`
            this.counter--
            if (this.counter < 0) {
                // 当计时小于零时，取消该计时器
                clearInterval(this.timer)
                this.reset()
            }
            }, 1000)
        },

        // 重置倒计时
        reset () {
            // 重置按钮可用
            this.isSmsSend = false
            // 重置文本内容
            this.sendBtnText = '点击发送验证码'
            if (this.timer) {
                // 存在计时器对象，则清除
                clearInterval(this.timer)
                // 重置秒数，防止下次混乱
                this.counter = 60
                // 计时器对象重置为空
                this.timer = null
            }
        },
        async submitModify() {
            try {
                const { success, message } = await this.$store.dispatch('forgetPasswordFun', {
                    password: this.newPsd,
                    confirmPassword: this.newPsdAgain,
                    accountNumber: this.userName,
                    verificationCode: this.verifyCode
                })
                if(success) {
                    this.$dialog.confirm({
                        message: '<p>密码修改成功！</p><p>请返回登录页面重新登录</p>',
                        confirmButtonText: '确定',
                        showCancelButton: false
                    }).then(() => {
                        this.$router.push('/login')
                    })
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .retrieve-box{
        margin-top: rem(8);
        .van-cell-group{
            /deep/ .van-cell{
                padding:rem(16) rem(20);
                align-items: center;
                .van-cell__title{
                    font-size: rem(18);
                    color:#262626;
                }
                .van-field__label{
                    width:auto;
                    margin-right: rem(18);
                }
                .van-field__control{
                    font-size: rem(18);
                }
            }
        }
        .step-box{
            .input-tips{
                color: rgba(0, 0, 0, 0.25);
                font-size: rem(14);
                padding:rem(10) rem(21);
                display: flex;
                align-items: center;
                em{
                    color:#FC9445;
                }
                /deep/ .van-count-down{
                    font-size: rem(14);
                    color:rgba(0, 0, 0, 0.25);
                }
            }
            .form-tips{
                    font-size: rem(14);
                    color:#000;
                    opacity: .25;
                    padding:rem(5) rem(20);
                }
            .opt-btn{
                width: rem(335);
                margin: rem(28) rem(20) 0;
                border-radius: rem(10);
                font-size: rem(18);
            }
        }
    }
</style>