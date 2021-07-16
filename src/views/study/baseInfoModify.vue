<template>
    <div class="study-page base-info">
        <navbar title="基本信息"></navbar>
        <div class="base-info-box">
            <van-form>
                 <van-field
                    v-model="userBaseInfo.email"
                    name="邮箱"
                    label="邮箱"
                    placeholder="请输入邮箱"
                />
                 <van-field
                    v-model="userBaseInfo.mobile"
                    name="手机号码"
                    label="手机号码"
                    placeholder="请输入手机号码"
                />
                <van-field
                    v-model="userBaseInfo.post"
                    name="职位"
                    label="职位"
                    placeholder="请输入职位"
                />
                <van-field
                    v-model="userBaseInfo.professionalTitle"
                    name="手机号码"
                    label="手机号码"
                    placeholder="请输入职称"
                />
                <div>
                    <van-button round block type="info" native-type="submit" class="submit-btn" @click="confirmBaseInfo" loading-text="加载中..." :loading="loadingFlag">确定</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'baseInfo',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {
           userBaseInfo: {},
           loadingFlag: false,
        }
    },
    created() {
        this.userBaseInfo = JSON.parse(localStorage.getItem('study_userDetail'))
    },
    methods: {
        // 修改基本信息
        async confirmBaseInfo() {
            this.loadingFlag = true
            try {
                const { email, mobile, post, professionalTitle } = this.userBaseInfo
                const { success, message } = await this.$store.dispatch('updateUserInfoFun', {
                    email,
                    mobile,
                    post,
                    professionalTitle
                })
                if(success) {
                    this.$toast('修改成功！')
                    localStorage.setItem('study_userDetail', JSON.stringify(this.userBaseInfo)); // 登录用户的角色信息
                } else {
                    this.$toast(message || '修改失败！')
                }
            } catch (error) {
                console.log(error)   
            } finally {
                this.loadingFlag = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .base-info{
        min-height: 100%;
        background: #fff;
        .base-info-box{
            // padding:rem(20);
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