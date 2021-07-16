<template>
    <div class="study-page study-login">
        <div class="login-bg"></div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                left-icon="login-user"
                placeholder="请输入账号"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                left-icon="login-psd"
                placeholder="默认密码：888888"
            />
             <div class="psd-opt">
                <!-- <div @click="$router.push('/modifyPsd')">修改密码</div> -->
                <div @click="$router.push('/retrievePsd')">找回密码</div>
            </div>
            <div>
                <van-button round block type="info" native-type="submit" @click="loginSubmit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    name: 'studyLogin', 
    data() {
        return {
            username: '',
            password: ''
        }
    },
    created() {},
    methods: {
        onSubmit() {

        },
        loginSubmit() {
            //  this.$dialog.alert({
            //     message: '请立即修改密码',
            //     confirmButtonText: '确定'
            // })
            this.loginAction()
        },
        async loginAction() {
            const { code, userDetail, msg } = await this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            if(+code === 200) {
                this.$store.commit('setUserDetail', {
                    userDetail
                })
                localStorage.setItem('study_userDetail', JSON.stringify(userDetail)); // 登录用户的角色信息
                
                if(+userDetail.isFirst === 0) {
                    this.$router.push({
                        path: '/modifyPsd',
                        query: {
                            isFirst: 0
                        }
                    })
                } else {
                    this.$router.replace('/studyIndex')
                }
            } else {
                this.$toast(msg || '登录失败')
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .study-login{
        height:100%;
        background: #fff;
        padding-top: rem(86);
        .login-bg{
            margin:0 auto;
            width:rem(149);
            height: rem(126);
            background: url('../../assets/img/login.png') no-repeat;
            background-size: rem(149) rem(126);
        }
        .van-form{
            padding: rem(80) rem(38);
            /deep/ .van-field{
                border: 1px solid #1D6FE9;
                border-radius: rem(24);
                margin-bottom: rem(16);
            }
            /deep/ .van-cell::after{
                border: none;
            }
            /deep/ .van-cell{
                height: rem(50);
                align-items: center;
                padding-left: rem(36);
                .van-cell__value{
                    font-size: rem(18);
                }
                .van-field__left-icon{
                    margin-right: rem(18);
                }
                .van-icon-login-user{
                    display: inline-block;
                    width:rem(20);
                    height: rem(20);
                    background:url('../../assets/img/login-user.png') no-repeat;
                    background-size: rem(20) rem(20);

                }
                .van-icon-login-psd{
                    display: inline-block;
                    width:rem(20);
                    height: rem(20);
                    background:url('../../assets/img/login-psd.png') no-repeat;
                    background-size: rem(20) rem(20);

                }
            }
            /deep/ .van-button{
                height: rem(50);
                width:rem(219);
                margin:rem(20) auto;
                .van-button__text{
                    font-size: rem(14);
                }
            }
        }
        .psd-opt{
            display: flex;
            justify-content: flex-end;
            margin-top: rem(5);
            padding:rem(0) rem(16);
            div{
                color:#000;
                font-size: rem(14);
                opacity: .65;
            }
        }
    }
</style>