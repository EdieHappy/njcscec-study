<template>
    <div class="study-page settings">
        <navbar title="设置"></navbar>
        <div class="settings-box">
            <van-cell title="基本信息" is-link value="" @click="$router.push('/baseInfo')"/>
            <van-cell title="修改密码" is-link value="" @click="$router.push('/modifyPsd')"/>
            <van-button class="submit-btn" type="info" @click="logoutOpt">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'settings',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {

        }
    },
    methods: {
        logoutOpt() {
            this.$dialog.confirm({
                message: '确定退出登录',
                cancelButtonText:'取消'
            })
            .then(() => {
                // 退出
                this.logoutAction()
            })
            .catch(() => {
                // on cancel
            });
        },
        // 退出登录
        async logoutAction() {
            try {
                const { code, msg } = await this.$store.dispatch('logout')
                if(+code === 200) {
                    this.$router.push('/login')
                } else {
                    this.$toast(msg || '退出失败')
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .settings{
        min-height: 100%;
        background:#fff;
        .settings-box{
             padding:rem(20);
        }
        /deep/ .van-cell{
             height:rem(66);
             display: flex;
             align-items: center;
             padding:rem(10) 0;
            .van-cell__title{
                font-size: rem(16);
                color:#262626;
            }
        }
        .submit-btn{
            // margin:rem(28) rem(20);
            margin-top: rem(30);
            width:rem(335);
            height: rem(50);
            border-radius: rem(10);
            .van-button__text{
                font-size: rem(18);
            }
        }
    }
</style>