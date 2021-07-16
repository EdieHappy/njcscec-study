<template>
    <div class="study-page my-exam">
        <navbar title="我的考试"></navbar>
         <div class="exam-box">
                <!-- <search-form></search-form> -->
                <template v-if="dataList.length > 0">
                    <van-list class="exam-list"
                    :finished="finished"
                    @load="getMyExamList"
                    finished-text="没有更多了"
                        :immediate-check="false"
                    >
                    <div class="exam-item" @click="examOpt(item)" v-for="(item, index) in dataList" :key="index">
                        <div class="exam-title-score">
                            <div class="title">{{item.title}}</div>
                            <div class="exam-status" v-if="item.studentScore">成绩查询</div>
                            <div class="exam-status join-exam" v-else>参加考试</div>
                        </div>
                        <div class="exam-extra">
                            考试有效期：{{item.startTime}}-{{item.endTime}}               
                        </div>
                        <div class="exam-extra">
                            <em>试卷总分：{{item.score}} 分</em>
                            <em>考试时间：{{item.minute}}分钟</em>
                        </div>
                         <div class="exam-extra" v-if="item.studentScore">
                            证书奖励：<div class="view" @click="viewCert">查看证书</div>
                        </div>
                        <div class="exam-extra" v-else>
                            证书奖励：暂无
                        </div>
                    </div>
                </van-list>
                </template>
                <div class="no-data" v-else>
                    <div class="no-data-bg"></div>
                    <div class="no-data-message">暂无考试列表</div>
                </div>
         </div>
         <van-popup v-model="show">
             <div class="points-box">
                <div>我的分数</div>
                <div>{{score}}分</div>
                <div class="close" @click="show = false"></div>
              </div>
         </van-popup>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
// import searchForm from '../../components/searchForm'
export default {
  name: 'myExam',
    components: {
        navbar: studyNavbar,
        // searchForm
    },
    data() {
        return{
            show: false,
            score: '',
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            dataList: [],
        }
    },
    created() {
        this.getMyExamList()
    },
    methods: {
        // 获取考试列表
        async getMyExamList() {
            try {
                const { data } = await this.$store.dispatch('getMyExamListFun', {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                })
                this.dataList.push(...data)
                this.pageNum ++
                if(data.length < this.pageSize) {
                    this.finished = true
                } else {
                    this.finished = false
                }
            } catch (error) {
                this.finished = true
            } finally {
                this.loading = false
            }
        },
        // 查看成绩
        viewScore() {
            this.show = true
        },
        // 查看证书
        viewCert() {
            this.$router.push('/downloadCert')
        },
        // 查看试卷成绩或者考试
        examOpt(item) {
            if(item.studentScore) {
                 this.show = true
                 this.score = item.studentScore
            } else {
                this.$dialog.confirm({
                    message: '考试期间不可刷新网页，否则会影响考试成绩',
                    cancelButtonText:'返回'
                })
                .then(() => {
                    // on confirm
                     this.$router.push({
                        path: '/examination',
                        query: {
                            examinationId: item.id
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                });
               
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.my-exam{
    min-height: 100%;
    background: #fff;
    .exam-box{
        .exam-item{
            padding:rem(24) rem(20);
            @include border(bottom, #e2e2e2);
            .exam-title-score{
                display: flex;
                height: rem(30);
                justify-content: space-between;
                align-items: center;
                .title{
                    font-size: rem(15);
                    color:#262626;
                }
                .exam-status{
                    font-size: rem(14);   
                    color:#1D6FE9;
                }
                .join-exam{
                    color:#E9971D;
                }
            }
            .exam-extra{
                display: flex;
                line-height: rem(24);
                align-items: center;
                font-size: rem(12);
                color:#8C8C8C;
                .view{
                    color:#1D6FE9;
                    font-size: rem(14);
                }
                em{
                    margin-right: rem(20);
                }
            }
        }
    }
     .van-popup{
        border-radius: rem(10);
        overflow: visible;
    }
    .points-box{
        position: relative;
        width:rem(335);
         height:rem(231);
         padding-top: rem(30);
        border-radius: rem(10);
        background-color:#adadad;
        div{
            font-size: rem(33);
            color:#fff;
            text-align: center;
            padding-top: rem(20);
        }
        .close{
            position: absolute;
            right:rem(27);
            top:rem(-43);
            width:rem(31);
            height: rem(31);
            background:url(../../assets/img/dialog-close.png) no-repeat;
            background-size: rem(31) rem(31);
        }
    }
}
</style>