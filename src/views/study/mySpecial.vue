<template>
    <div class="study-page my-special">
         <navbar title="全部专题"></navbar>
         <div class="special-box">
             <search-form></search-form>
            <!-- <div class="loading-box" v-if="loading">
                <van-loading size="24px" vertical color="#0094ff">加载中...</van-loading>
            </div>
            <template v-else> -->
                 <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getSearchDataList"
                    finished-text="没有更多了"
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
            <!-- </template> -->
         </div>
         <tabbar v-bind:activeIndex=1 ></tabbar>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
import searchForm from '../../components/searchForm'
import studyTabbar from '../../components/studyTabbar'
export default {
    name: 'mySpecial',
    components: {
        navbar: studyNavbar,
        searchForm,
        tabbar: studyTabbar
    },
    data() {
        return {
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            dataList: [],
            specialTitle: ''
        }
    },
    created() {
        this.getSearchDataList()
    },
    methods: {
        // 获取专题列表
       async getSearchDataList(type, keyWords) {
            if(type === 'search') {
                this.specialTitle = keyWords
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
    .my-special{
        min-height: 100%;
        background: #fff;
        padding-bottom: rem(40);
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