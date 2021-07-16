<template>
    <div class="study-page my-special">
         <navbar title="课程中心"></navbar>
         <div class="special-box">
             <search-form></search-form>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getSpecialCourseList"
                    finished-text="没有更多了"
                     :immediate-check="false"
                    class="study-project-list">
                    <div class="project-item" v-for="(item, index) in dataList" :key="index">
                        <div class="project-img">
                            <img :src="item.pictureUrl" alt="">
                        </div>
                        <div class="project-detail">
                            <div class="project-title">{{item.courseName}}</div>
                            <div class="project-num">共{{item.courses.length}}门</div>
                        </div>
                    </div>
                </van-list>
         </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
import searchForm from '../../components/searchForm'
export default {
    name: 'dataCenter',
    components: {
        navbar: studyNavbar,
        searchForm
    },
    data() {
        return {
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            dataList: [],
            categoryId: this.$route.query.categoryId
        }
    },
    methods: {
        async getSpecialCourseList(keyWords) {
            this.subject = keyWords
            if(keyWords !== '' && typeof(keyWords) !== 'undefined') {
                this.pageNum = 1
                this.dataList = []
            }
            try {
                const { data } = await this.$store.dispatch('getSpecialListFun', {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    categoryName: this.specialTitle || '',
                    userId: '',
                    entry: 0
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
    }
}
</script>

<style lang="scss" scoped>
    .my-special{
        min-height: 100%;
        background: #fff;
        .study-project-list{
            margin:rem(30) rem(20) 0;
            .list-title{
                font-size: rem(20);
                color:#000;
                margin-bottom: rem(16);
            }
            .project-item{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #efefef;
                padding: rem(15) 0;
                .project-img{
                    flex:0 0 auto;
                    margin-right: rem(15);
                    img{
                        width:rem(161);
                        height: rem(91);
                    }
                }
                .project-detail{
                    display: flex;
                    padding: rem(5) 0 rem(5) 0;
                    flex-direction: column;
                    justify-content: space-between;
                    flex-grow: 1;
                    .project-title{
                        font-size: rem(14);   
                        color:#000;
                        opacity: .85;
                    }
                    .project-num{
                        color:#000;
                        opacity: .45;
                        font-size: rem(12);
                    }
                }
            }
        }
    }
</style>