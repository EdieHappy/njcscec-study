<template>
    <div class="study-page course-play">
        <navbar title="课程学习"></navbar>
        <div class="play-box">
             <video-player class="video-player vjs-custom-skin" v-if="courseDetail && courseDetail.courseFile"
                id ="videoPlayer"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @ready="playerReadied"
                >
            </video-player>
            <div class="course-item">
                <div class="course-title">{{courseDetail.courseName}}</div>
                <div class="course-info">
                    <div class="course-cell">讲师：{{courseDetail.teacherName}}</div>
                    <div class="course-cell">学习进度：{{Number(courseDetail.speedProgress)}}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
import VideoPlayer from 'vue-video-player'
import utils from '../../lib/utils'
import 'video.js/dist/video-js.css'
import Vue from 'vue'
Vue.use(VideoPlayer)
export default {
    name:'coursePlay',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {
            paused: true,
            timer: null,
            durations: null, // 学习的时间
            totalTime: null, // 视频总时长
            playerOptions: {
                //播放速度
                playbackRates: [0.5, 1.0, 1.5, 2.0], 
                //如果true,浏览器准备好时开始回放。
                autoplay: false, 
                // 默认情况下将会消除任何音频。
                muted: false, 
                // 导致视频一结束就重新开始。
                loop: false, 
                // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                preload: 'auto', 
                language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                fluid: true,
                sources: [{
                    //类型
                    type: "video/mp4",
                    //url地址 http://106.14.40.49:8080/uploadFile/%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%91%E4%B8%89.mp4
                    src: '' 
                    // 
                }],
                //你的封面地址 require("../../assets/img/tabbar-home-active.png")
                poster: '', 
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    //全屏按钮
                    fullscreenToggle: true  
                }
            },
            courseDetail: {}
        }
    },
    created() {
        this.getCourseDetail()
        // this.putLearningObj()
        this.timer = setInterval(this.putLearningObj, 10000)
        // this.$nextTick(()=> {
        //     console.log('视频时长', this.$refs.videoPlayer.player.cache_.duration)
        // })
    },
    destroyed () {
    // 如果定时器在运行则关闭
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
    methods: {
        async getCourseDetail() {
           try {
                const { code, list } = await this.$store.dispatch('getCourseDetailFun', {
                    courseId: this.$route.query.courseId
                })
                if(+code === 200) {
                    this.courseDetail = list
                    this.playerOptions['sources'][0]['src'] = list.courseFile.path
                }
           } catch (error) {
               console.log(error)
           }
        },
        playerReadied(player) {
            // console.log('ready')
            // player.currentTime()
        },
        onPlayerPlay (player) {
            this.paused = false
            // console.log('onPlayerPlay!', player)
        },
        onPlayerPause (player) {
            this.paused = true
            // console.log('onPlayerPause!', player)
        },
        //监听媒体是否已到达结尾，播放完
        onPlayerEnded (player) {
            this.paused = false
            // console.log('player ended!', player)
            this.saveStudy()
            clearInterval(this.timer)
        },
        //当前播放位置发生变化时触发
        onPlayerTimeupdate(player) {
            this.durations = player.cache_.currentTime
        },
        // 视频加载完之后获取整个视频的时长
        onPlayerLoadeddata(player) {
            // console.log('loaded')
            this.totalTime = player.cache_.duration
            let currentTime = utils.floatMul(Number(this.totalTime).toFixed(2), Number(this.courseDetail.speedProgress).toFixed(2))
            player.currentTime(utils.floatp(currentTime, 100))
        },
        // 保存视频观看进度
        putLearningObj () {
            if (!this.paused) {
                this.saveStudy()
            }
        },
        // 保存视频观看进度
        async saveStudy() {
            let durationNum = Number(this.durations).toFixed(2)
            // console.log('durations', durationNum)
            let totalNum = Number(this.totalTime).toFixed(2)
            // console.log('totalTime', totalNum)
            let progress = utils.floatMul(utils.floatp(durationNum, totalNum), 100).toFixed(2)
            
            console.log('progress', progress)
            console.log('course speedProgress', +this.courseDetail.speedProgress)
            if(+progress < +this.courseDetail.speedProgress || +this.courseDetail.speedProgress === 100) {
                return
            }
            // console.log('progress', progress)
            try {
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
        }
    }
}
</script>

<style lang="scss" scoped>
.course-play{
    min-height: 100%;
    background: #fff;
    .course-item{
        .course-title{
            height: rem(60);
            font-size: rem(15);
            line-height: rem(60);
            color:#262626;
            padding:0 rem(20);
            @include border(bottom, #e2e2e2);
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
</style>