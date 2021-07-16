<template>
    <div class="study-page study-map">
        <navbar title="学习地图"></navbar>
        <div class="map-box">
            <van-tabs v-model="active">
                <van-tab :title="tab.desc" v-for="(tab, j) in tabs" :key="j">
                    <van-list class="study-list"
                      v-model="tabs[j].loading"
                    :finished="tabs[j].finished"
                    @load="getLearningCourseList(j)"
                    finished-text="没有更多了"
                    >
                        <div class="study-item" v-for="(item, index) in tabs[j].list" :key="index" @click="goDetail(item.id)">
                            <div class="study-title-status">
                                <div class="study-title">{{item.categoryName}}</div>
                                <div class="study-status" v-if="j === 0 ">未完成</div>
                                <div class="study-status status-done" v-if="j === 1 ">已完成</div>
                            </div>
                            <div class="study-info">
                                <!-- <em>总学分：43.50</em> -->
                                <div class="info"><em>学习阶段：4</em><em>总课时：40.50</em></div>
                                <div class="info"><em>学习进度：{{item.speedProgress}}%</em></div>
                                <div class="info" v-if="item.courses"><em>学习课程：{{item.courses && item.courses.length}} 节课</em></div>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import sutdyNavbar from '../../components/studyNavbar'
export default {
    name: 'studyMap',
    components: {
        navbar: sutdyNavbar
    },
    data() {
        return {
            active: 0,
            tabs: [
                { key: 'undone', desc: '未完成', count: ' ', loading: false, finished: false, pageNum: 1, list: [], status: 1 },
                { key: 'done', desc: '已完成', count: ' ', loading: false, finished: false, pageNum: 1, list: [], status: 2 }
            ],
        }
    },
    created() {
    },
    methods: {
        // 获取接口数据
        async getLearningCourseList(j) {
            const tab = this.tabs[j]
            try {
                const { code, data } = await this.$store.dispatch('getStudyCategoryMapFun', {
                    pageNum: tab.pageNum,
                    pageSize: 10,
                    learningStatus: tab.status,
                    userId: 1
                })
                if(+code === 200) {
                    const list = data || []
                    tab.list.push(...list)
                    if(list.length < 10) {
                        tab.finished = true
                        console.log(tab.finished)
                    } else {
                        tab.pageNum ++
                        tab.finished = false
                    }
                }
            } catch (error) {
                console.log(error)
                tab.finished = true
            } finally {
                tab.loading = false
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
    .study-map{
        min-height: 100%;
         background:#fff;
        .map-box{
            .van-tabs{
                /deep/ .van-tabs__content{
                    
                     background:#f5f5f5;
                padding-top: rem(10);
                }
                /deep/ .van-tabs__wrap{
                     padding-top: rem(20);
                height: rem(60);
                    .van-tabs__nav{
                        padding-left: rem(10);
                    }
                }
                /deep/ .van-tab{
                    flex:0 1 auto;
                    margin:0 rem(10);
                    font-size: rem(16);
                }
                /deep/ .van-tab--active{
                    .van-tab__text{
                        color:#1D6FE9;
                    }
                }
                /deep/ .van-tabs__line{
                    background-color:#1D6FE9;
                }
            }
            .study-list{
                // margin-top: rem(10);
                background:#fff;
                padding:0 rem(20);
                .study-item{
                    padding:rem(25) 0;
                    @include border(bottom, #e2e2e2);
                    .study-title-status{
                        display: flex;
                        justify-content: space-between;
                        .study-title{
                            font-size: rem(15);
                            color:#262626;
                        }
                        .study-status{
                            color:#F31616;
                            font-size: rem(12);
                        }
                        .status-done{
                            color:#5EC8B6;
                        }
                    }
                    .study-info{
                        .info{
                            display: flex;
                            justify-content: flex-start;
                            margin-top: rem(6);
                            em{
                                font-size: rem(12);
                                color:#8C8C8C;
                                margin-right: rem(20);
                            }
                        }
                    }
                }
            }
        }
    }
</style>