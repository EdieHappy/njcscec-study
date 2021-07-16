<template>
    <div class="study-page special-detail">
        <navbar title="专题详情"></navbar>
        <div class="detail-box">
            <div class="special-img">
                <img src="../../assets/img/join-study.png" alt="">
                <div class="join-btn" v-if="specialDetail.learning" @click="joinStudy">继续学习</div>
                <div class="join-btn" v-else @click="joinStudy">加入学习</div>
            </div>
            <div class="detail-h2">专题简介</div>
            <div class="detail-info" v-if="specialDetail">
                <div class="title">{{specialDetail.categoryName}}</div>
                <div class="info-desc">{{specialDetail.summary}}</div>
                <div class="info-desc">学习进度：未完成</div>
                <div class="info-desc">课程创建时间：{{specialDetail.createTime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import sutdyNavbar from '../../components/studyNavbar'
export default {
    name:'specialDetail',
    components: {
        navbar: sutdyNavbar
    },
    data() {
        return {
            // 专题详情
            specialDetail: {}
        }
    },
    created() {
        this.getCategoryDetaiInfo()
    },
    methods: {
        // 获取专题基本信息
        async getCategoryDetaiInfo() {
            try {
                const { code, list } = await this.$store.dispatch('getCategoryDetailInfoFun', {
                    categoryId: this.$route.query.categoryId
                })
                if(+code === 200) {
                    this.specialDetail = list
                }
            } catch (error) {
                console.log(error)
            }
        },
        async joinStudy() {
            if(!this.specialDetail.learning) {
                try {
                    const { code } = await this.$store.dispatch('joinStudyFun', {
                        categoryId: this.$route.query.categoryId
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            this.$router.push({
                path:'/specialCourseList',
                query: {
                    categoryId: this.$route.query.categoryId
                }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .special-detail{
        min-height: 100%;
        background: #fff;
        .detail-box{
            .special-img{
                position: relative;
                img{
                    width:100%;
                    height: rem(210);
                }
                .join-btn{
                    position: absolute;
                    width:rem(96);
                    height: rem(40);
                    background: #1D6FE9;
                    border-radius: rem(20);
                    font-size: rem(16);
                    color:#fff;
                    line-height: rem(40);
                    text-align: center;
                    right:rem(56);
                    bottom:rem(76);
                }
            }
            .detail-h2{
                height:rem(60);
                font-size: rem(15);
                @include border(bottom, #e2e2e2);
                padding:0 rem(20);
                line-height: rem(60);
            }
            .detail-info{
                padding:rem(20);
                .title{
                    font-size: rem(16);
                    color:#262626;
                    font-weight: bold;
                    margin-bottom: rem(15);
                }
                .info-desc{
                    font-size: rem(12);
                    color:#8C8C8C;
                    margin-bottom: rem(6);
                }
            }
        }
    }
</style>