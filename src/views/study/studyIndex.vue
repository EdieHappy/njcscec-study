<template>
    <div class="study-page study-index">
        <div class="study-content">
            <div class="index-title">首页</div>
            <div class="img-show">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1D6FE9">
                    <van-swipe-item><img class="swipe-img" src="../../assets/img/index-img.png" alt=""></van-swipe-item>
                    <van-swipe-item><img class="swipe-img" src="../../assets/img/index-img.png" alt=""></van-swipe-item>
                    <van-swipe-item><img class="swipe-img" src="../../assets/img/index-img.png" alt=""></van-swipe-item>
                    <van-swipe-item><img class="swipe-img" src="../../assets/img/index-img.png" alt=""></van-swipe-item>
                </van-swipe>
            </div> 
            <div class="icons">
                <div class="icon-item" @click="$router.push('/studyMap')">
                    <div class="icon-show icon-xxdt"></div>
                    <div class="icon-name">学习地图</div>
                </div>
                <div class="icon-item" @click="$router.push('/mySpecial')">
                    <div class="icon-show icon-kczx"></div>
                    <div class="icon-name">课程中心</div>
                </div>
                <div class="icon-item"  @click="$router.push('/myExam')">
                    <div class="icon-show icon-kszx"></div>
                    <div class="icon-name">考试中心</div>
                </div>
                <div class="icon-item" @click="$router.push('/dataCenter')">
                    <div class="icon-show icon-zlzx"></div>
                    <div class="icon-name">资料中心</div>
                </div>
            </div> 
            <div class="study-project-box" v-if="dataList.length > 0 ">
                <div class="list-title">学习专题</div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getSpecialList"
                    :immediate-check="false"
                    class="study-project-list">
                    <div class="project-item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
                        <div class="project-img">
                            <img :src="item.pictureUrl" alt="">
                        </div>
                        <div class="project-detail">
                            <div class="project-title">{{item.categoryName}}</div>
                            <div class="project-num">共{{item.courses.length}}门</div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div> 
        <tabbar v-bind:activeIndex=0 ></tabbar>
    </div>
</template>

<script>
import studyTabbar from '../../components/studyTabbar'
export default {
    name:'studyIndex',
    components: {
        tabbar: studyTabbar
    },
    data() {
        return {
            active: 0,
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            dataList: [],
        }
    },
    created() {
        this.getSpecialList()
    },
    methods: {
        // 获取专题列表
        async getSpecialList() {
            try {
                const { data } = await this.$store.dispatch('getSpecialListFun', {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    categoryName: this.specialTitle || '',
                    userId: '',
                    entry: 2
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
         // 专题详情页
        goDetail(id) {
            this.$router.push({
                path: '/specialDetail',
                query: {
                    categoryId: id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.study-index{
    background:#fff;
    // height: 100%;
    min-height: 100%;
    padding-top: rem(40);
    .study-content{
        padding:rem(20) rem(20) rem(100);
    }
    .index-title{
        font-size: rem(38);
        color:#262626;
        font-weight: bold;
    }
    .img-show{
        margin-top: rem(28);
        /deep/ .van-swipe{
            margin:0 auto;
            .swipe-img{
                width:rem(335);
                height: rem(195);
            }
            .van-swipe__indicators{
                .van-swipe__indicator{
                    width:rem(8);
                    height: rem(8);
                    background:#fff;
                }
            }
        }
    }
    .icons{
        display: flex;
        margin-top: rem(22);
        .icon-item{
            width:100%;
            .icon-show{
                margin:0 auto;
                width:rem(57);
                height: rem(57);
            }
            .icon-xxdt{
                background:url(../../assets/img/xxdt.png) no-repeat;
                background-size: rem(57) rem(57);
            }
            .icon-kczx{
                background:url(../../assets/img/kczx.png) no-repeat;
                background-size: rem(57) rem(57);
            }
            .icon-kszx{
                background:url(../../assets/img/kszx.png) no-repeat;
                background-size: rem(57) rem(57);
            }
            .icon-zlzx{
                background:url(../../assets/img/zlzx.png) no-repeat;
                background-size: rem(57) rem(57);
            }
            .icon-name{
                width:100%;
                text-align: center;
                font-size: rem(12);
                color:#000;
                opacity: .85;
                margin-top: rem(10);
            }
        }
    }
    .study-project-box{
        margin-top: rem(50);
        .list-title{
            font-size: rem(20);
            color:#000;
            margin-bottom: rem(16);
        }
    }
    .study-project-list{
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