<template>
    <div class="study-navbar">
        <!-- 
            :title="title" -->
        <van-nav-bar
            :left-text="title"
            right-text=""
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            >
            <template #right v-if="timeLeft">
                <div class="time-left">
                    <div class="time-icon"></div>
                    <!-- 3600000  -->
                    <van-count-down  ref="countDown" format="mm:ss" :auto-start="false" :time="time"  @finish="finish" />
                </div>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
    name:'studyNavbar',
    props: {
        title: {
            type: String,
            default: '',
        },
        timeLeft: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Number,
            default: 0
        },
        searchText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            
        }
    },
    components: {
        vanNavBar: NavBar
    },
    methods: {
        onClickLeft() {
            console.log('click left')
            let path = this.$route.path
            console.log(path)
            if(path === '/examination' && !this.$parent.submitFlag) {
                this.$dialog.confirm({
                    message: '当前考试正在进行中，点击回退将提交试卷',
                    cancelButtonText:'取消',
                    confirmButtonText: '确定回退'
                })
                .then(() => {
                    // on confirm
                    this.$parent.submitFlag = true
                    history.go(-1)
                })
                .catch(() => {
                    // on cancel
                });
            } else {
                history.go(-1)
            }

        },
        onClickRight() {
            console.log('click right')
        },
        finish() {
            this.$dialog.alert({
                message: '考试时间已到',
            }).then(() => {
                this.$parent.submitSubject()
            });
        },
        startCountDown() {
            this.$refs.countDown.start()
        },
        pauseCountDown() {
            this.$refs.countDown.pause()
        }
    }
}
</script>

<style lang="scss" scoped>
    .study-navbar{
       .van-nav-bar{
            /deep/ .van-nav-bar__content{
                height:rem(60);
                .van-icon-arrow-left{
                    color:#000;
                }
                .van-icon-arrow-left::before{
                    content: '';
                    display: inline-block;
                    width:rem(24);
                    height: rem(24);
                    background:url(../assets/img/navbar-left.png) no-repeat;
                    background-size: rem(24) rem(24);
                }
                .van-nav-bar__left{
                    .van-nav-bar__text{
                        font-size: rem(24);
                        color:#262626;
                    }
                }   
                .van-nav-bar__right{
                    .time-left{
                        display: flex;
                        align-items: center;
                    }
                    .time-icon{
                        width:rem(18);
                        height: rem(18);
                        background: url(../assets/img/time-left.png) no-repeat;
                        background-size: rem(18) rem(18);
                        margin-right: rem(8);
                    }
                    .van-count-down{
                        color:#707070;
                        font-size: rem(14);
                    }
                }
            }
        }
        /deep/ .van-hairline--bottom::after{
                    border-bottom-width:0;
                }
    }
</style>