<template>
    <div class="study-page course-overview">
         <navbar title="专题详情"></navbar>
         <div class="overview-box">
             <div class="category-img">
                 <img :src="specialDetail.pictureUrl" alt="">
             </div>
             <div class="category-title">
                 {{specialDetail.categoryName}}
             </div>
             <van-list class="category-course-list"
                v-model="loading"
                :finished="finished"
                @load="getCategoryCourseList"
             >
                <div class="course-item" v-for="(course, index) in courseList" :key="index" @click="courseStudy(course)">
                    <div class="course-title">{{course.courseName}}</div>
                    <div class="course-status course-done" v-if="+course.speedProgress === 100">已完成</div>
                    <div class="course-status" v-else>未完成</div>
                </div>
             </van-list>
         </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'courseOverview',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {
            specialDetail: {},
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            courseList: []
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
        // 获取课程列表
        async getCategoryCourseList() {
            try {
                const { code, data } = await this.$store.dispatch('getCategoryCourseListFun', {
                    categoryId: this.$route.query.categoryId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    entry: 0
                })
                const list = data || []
                this.courseList.push(...list)
                if(list.length < this.pageSize) {
                    this.finished = true
                } else {
                    this.finished = false
                    this.pageNum ++
                }
            } catch (error) {
                console.log(error)
                this.finished = true
            } finally {
                this.loading = false
            }
        },
        // 判断是视频学习还是pdf学习
        courseStudy(item) {
            let courseFile = item.courseFile
            if(courseFile && courseFile.fileSuffix === 'pdf') {
                this.$router.push({
                    path: '/pdfStudy',
                    query: {
                        courseId: item.id
                    }
                })
            } else if(courseFile && (courseFile.fileSuffix === 'mp4' || courseFile.fileSuffix === 'MP4')) {
                this.$router.push({
                    path: '/coursePlay',
                    query: {
                        courseId: item.id
                    }
                })
            } else {
                this.$toast('该课程下暂无学习资料！')
            }
        }
    }

}
</script>

<style lang="scss" scoped>
    .course-overview{
        min-height: 100%;
        background:#fff;
        .overview-box{
            .category-img{
               img{
                    width:rem(375);
                height: rem(210);
               }
            }
            .category-title{
                height: rem(60);
                line-height: rem(60);
                padding:0 rem(20);
                @include border(bottom, #e2e2e2);
                font-size: rem(15);
                color:#262626;
            }
            .category-course-list{
                padding:0 rem(20);
                .course-item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: rem(42);
                    .course-title{
                        max-width: rem(240);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: rem(13);
                        color:#262626;
                    }
                    .course-status{
                        font-size: rem(12);
                        color:#F31616;
                    }
                    .course-done{
                        color:#5EC8B6;
                    }
                }
            }
        }
    }
</style>