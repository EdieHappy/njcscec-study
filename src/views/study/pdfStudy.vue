<template>
    <div class="study-page pdf-study">
        <navbar title="课程学习"></navbar>
        <div class="pdf-box">
            <div class="loading-box" v-if="loading">
                <van-loading size="24px" vertical color="#0094ff">PDF加载中...</van-loading>
            </div>
            <template v-else>
                <div class="course-detail">
                    <div class="course-title">{{courseDetail.courseName}}</div>
                    <div class="course-info">
                        <div class="course-cell">讲师：{{courseDetail.teacherName}}</div>
                        <div class="course-cell">学习进度：{{Number(courseDetail.speedProgress)}}%</div>
                    </div>
                </div>
                <PDF 
                    class="pdf-viewer"
                    :src="src"
                    :page="currentPage"
                    @num-pages="numPages=$event"
                    @page-loaded="pageLoadedHandler($event)"
                    @loaded="loadPdfHandler($event)">
                >
                </PDF>
                <p class="arrow">
                    <span
                        @click="changePdfPage(0)"
                        class="turn"
                        :class="{ grey: currentPage == 1 }"
                        v-if="currentPage > 1"
                        >上一页</span
                    >
                    {{ currentPage }} / {{ numPages }}
                    <span
                        @click="changePdfPage(1)"
                        class="turn"
                        :class="{ grey: currentPage == numPages }"
                        v-if="currentPage < numPages"
                        >下一页</span
                    >
                </p>

            </template>
        </div>
    </div>
</template>

<script>
import utils from '../../lib/utils'
import PDF from "vue-pdf"
import CMapReaderFactory from "vue-pdf/src/CMapReaderFactory.js"
import studyNavbar from "../../components/studyNavbar"
export default {
    name: "pdfStudy",
    components: {
        navbar: studyNavbar,
        PDF,
    },
    data() {
        return {
            currentPage: 1, // pdf文件页码
            numPages: 0, // pdf文件总页数
            fileType: "pdf", // 文件类型
            src: "", // pdf文件地址
            // url: "http://106.14.40.49:8080/uploadFile/change-phone.pdf",
            url: "",
            courseDetail: {},
            loading: true, // 加载中
        }
    },
    mounted() {
        this.getCourseDetail(); 
    },
    created() {
    },
     destroyed () {
         this.saveStudy()
    },
    methods: {
        // 获取课程详情
        async getCourseDetail() {
            try {
                const { code, list } = await this.$store.dispatch('getCourseDetailFun', {
                    courseId: this.$route.query.courseId
                })
                if(+code === 200) {
                    this.courseDetail = list
                    // this.url = list.courseFile.path
                    this.url = "http://106.14.40.49:8080/uploadFile/change-phone.pdf"
                    this.getDetails()
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 保存pdf学习进度
        async saveStudy() {
            let progress = utils.floatMul(utils.floatp(this.currentPage, this.numPages), 100).toFixed(2)            
            if(+progress < +this.courseDetail.speedProgress || +this.courseDetail.speedProgress === 100) {
                return
            }
            // console.log('progress', progress)
            try {
                console.log('progress', progress)
                const { success, list } = await this.$store.dispatch('saveStudyActionFun', {
                    speedProgress: progress,
                    courseId: this.$route.query.courseId
                })
                if(success) {
                    this.courseDetail = {
                        ...this.courseDetail,
                        speedProgress: list.speedProgress
                    }
                }
            } catch (error) {
                console.log(error)  
            }
        },
        getDetails() {
            this.src = PDF.createLoadingTask({
                url: this.url,
                CMapReaderFactory,
            })
            // console.log('this.src',this.src)
            this.src.promise.then(pdf => {
                this.numPages = pdf.numPages
                this.loading = false
            })
            .catch(err => {
                console.error("pdf加载失败", err)
            }); 
        },
        // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
        changePdfPage(val) {
            // console.log(val)
            if (val === 0 && this.currentPage > 1) {
                this.currentPage--;
                // console.log(this.currentPage)
            }
            if (val === 1 && this.currentPage < this.numPages) {
                this.currentPage++;
                // console.log(this.currentPage)
            }
        },
        // pdf加载时
        loadPdfHandler(e) {
            console.log('current', e)
            this.currentPage = 1; // 加载的时候先加载第一页
            this.loading = false
        },
        pageLoadedHandler(e) {
            console.log('current pageloaded', e)
            this.currentPage = e
            this.loading = false
        }
    },
};
</script>

<style lang="scss" scoped>
.pdf-study {
    min-height: 100%;
    position: relative;
    background: #fff;
    .pdf-box{
        // position: relative;
        .course-detail{
            .course-title{
                height: rem(60);
                font-size: rem(15);
                line-height: rem(60);
                color:#262626;
                padding:0 rem(20);
                @include border(bottom, #e2e2e2);
                @include border(top, #e2e2e2);
            }
            .course-info{
                padding:rem(20);
            }
            .course-cell{
                font-size: rem(12);
                color:#8C8C8C;
                margin-top: rem(5);
            }
        }
    }
    .pdf-viewer{
        // height:rem(450);
        width:100%;
    }
    .arrow {
        position: absolute;
        bottom: 0;
        width:100%;
        display: flex;
        font-size: rem(18);
        color: #1d6fe9;
        align-items: center;
        justify-content: center;
        span {
            padding: rem(20);
        }
    }
}
</style>