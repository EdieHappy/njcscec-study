<template>
    <div class="study-page modify-psd">
        <navbar :title="title"></navbar>
        <div class="modify-box">
            <van-form>
                <template v-if="!isFirst">
                    <van-field
                    v-model="oldPsd"
                     type="password"
                    name="旧密码"
                    label="旧密码"
                    placeholder="请输入旧密码"
                />
                </template>
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
                 <div class="form-tips">
                    <span>密码由8-10位数字、字母或符号组成</span>
                </div>
                <template v-if="isFirst">
                    <van-field
                        v-model="email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="请输入邮箱"
                        @input="onEmailChange"
                    />
                    <van-field
                        v-model="code"
                        name="验证码"
                        label="验证码"
                        placeholder="请输入验证码"
                    >
                    <template #button>
                        <van-button size="small" type="primary" color="#1989fa" :disabled="isSmsSend" @click="sendCode">{{ sendBtnText }}</van-button>
                    </template>
                    </van-field>
                </template>
                <div>
                    <van-button round block type="info" native-type="submit" class="submit-btn" @click="psdConfirm" :disabled="!btnAble">确定</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import sutdyNavbar from '../../components/studyNavbar'
export default {
    name:'modifyPsd',
    data() {
        return {
            oldPsd: '', // 旧密码
            newPsd: '',
            newPsdAgain: '',
            email: '',
            code: '',
            isFirst: +this.$route.query.isFirst === 0, // 是否第一次登录
            title: +this.$route.query.isFirst === 0 ? '修改初始密码' : '修改密码',
            // btnDisabled: true
            sendBtnText: '发送验证码',
            isSmsSend: false, // 是否发送了验证码
            timer: null,
            counter: 60
        }
    },
    components: {
        navbar: sutdyNavbar
    },
    computed: {
        btnAble() {
            if(this.isFirst) {
                return this.newPsd !== '' && this.newPsdAgain !== '' && this.email !== '' && this.code !== ''
            } else {
                return this.newPsd !== '' && this.newPsdAgain !== '' && this.oldPsd !== ''
            }
        }
    },
    methods: {
        // 确认修改
        psdConfirm() {
            if(this.isFirst) {
                // 修改初始密码
                this.psdModifyFirst()
            } else {
                // 普通修改密码
                this.padModifyNormal()
            }
        },
        sendCode() {
            if(this.email === '') {
                this.$toast('请输入邮箱！')
            } else {
                 this.isSmsSend = true
                this.sendCodeAction()
            }
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
        // 修改初始密码
        async psdModifyFirst() {
            try {
                const { success, message } = await this.$store.dispatch('firstEditPasswordFun', {
                    password: this.newPsd,
                    confirmPassword: this.newPsdAgain,
                    email: this.email,
                    verificationCode: this.code
                })
                if(success) {
                   await this.$store.dispatch('logout') // 退出登录
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
        },
        // 普通操作修改密码
        async padModifyNormal() {
            try {
                const { success, message } = await this.$store.dispatch('updatePasswordFun', {
                    password: this.newPsd,
                    confirmPassword: this.newPsdAgain,
                    oldPassWord: this.oldPsd
                })
                if(success) {
                    await this.$store.dispatch('logout') // 退出登录
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
        // 
        onEmailChange() {
            this.reset()
        }

    }

}
</script>

<style lang="scss" scoped>
    .modify-psd{
        .modify-box{
            margin-top: rem(8);
            /deep/ .van-form{
                .van-cell{
                    height: rem(56);
                    align-items: center;
                    padding: rem(15) rem(20);
                    .van-field__label{
                        font-size: rem(18);
                        color:#000;
                        opacity: .85;
                        width:rem(80);
                    }
                    .van-field__value{
                        .van-field__control{
                            font-size: rem(18);
                        }   
                    }
                }
                .form-tips{
                    font-size: rem(14);
                    color:#000;
                    opacity: .25;
                    padding:rem(5) rem(20);
                }
                .submit-btn{
                    margin:rem(28) rem(20);
                    width:rem(335);
                    height: rem(50);
                    border-radius: rem(10);
                    .van-button__text{
                        font-size: rem(18);
                    }
                }
            }
        }
    }
</style>