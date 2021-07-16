<template>
    <div class="study-page data-center">
         <navbar title="资料中心"></navbar>
         <div class="center-box">
                <search-form></search-form>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getSearchDataList"
                    finished-text="没有更多了"
                     :immediate-check="false"
                    class="data-list">
                    <div class="data-item" v-for="(item, index) in dataList" :key="index">
                         <div class="data-name">
                             <div class="title">{{item.title}}</div>
                             <div class="suffix">{{item.filename}}</div>
                         </div>
                        <div class="icon-right">
                            <div class="data-icon data-download" v-if="!item.dloadIng && !item.dloadDone" @click="getDownloadUrl(item)"></div>
                            <div class="data-icon data-download-done" v-if="item.dloadDone" @click="getDownloadUrl(item)"></div>
                            <div class="data-icon data-download-ing" v-if="item.dloadIng" @click="getDownloadUrl(item)"></div>
                            <div class="icon-text" v-if="item.dloadDone">
                                下载完成
                            </div>
                            <div class="icon-text" v-if="item.dloadIng">
                                下载中
                            </div>
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
            // keyWords: '',
            parentName: 'dataCenter',
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            dataList: [],
            subject: ''
        }
    },
    created() {
        this.getSearchDataList()
    },
    methods: {
        /**
         * 获取资料中心列表
         */
        async getSearchDataList(type, keyWords) {
            if(type === 'search') {
                this.subject = keyWords
                this.pageNum = 1
                this.dataList = []
            }
            try {
                const { data } = await this.$store.dispatch('getDocCenterListFun', {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    draw: '',
                    subject: this.subject || ''
                })
                this.dataList.push(...data.map(item => {
                    return {
                        ...item,
                        dloadIng: false, // 下载中
                        dloadDone: false, // 是否下载成功
                    }
                }))
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
        // 先获取可下载的链接，再进行下载文件
        async getDownloadUrl(item) {
            item.dloadIng = true
            try {
                const { success, message, list } = await this.$store.dispatch('getDownloadFileUrlFun', {
                    uri: item.filepath
                })
                if(success) {
                   window.location.href = list
                   item.dloadIng = false
                   item.dloadDone = true
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .data-center{
        min-height: 100%;
        background-color:#fff;
        .center-box{
            .search-box{
                display:flex;
                justify-content: space-between;
                padding:rem(14) rem(20) 0;
                align-items: center;
                .search-input{
                    position: relative;
                    width:rem(335);
                    height: rem(48);
                    background: #f4f4f4;
                    border-radius: rem(10);
                    display: flex;
                    overflow: hidden;
                    padding:0 rem(20);
                    align-items: center;
                    // justify-items: center;
                    // justify-content: center;
                    .search-icon{
                        display: inline-block;
                        height: rem(24);
                        width:rem(24);
                        background: url(../../assets/img/data-center-search.png) no-repeat;
                        background-size: rem(24) rem(24);
                    }
                    form{
                        width:rem(300);
                        height: rem(40);
                    }
                    input{
                        height: rem(40);
                        width:100%;
                        line-height: rem(40);
                        background: #f4f4f4;
                        font-size: rem(18);
                        color:#121212;
                        margin-left: rem(16);
                        caret-color:#FF5747;
                    }
                    .del{
                        position: absolute;
                        right:rem(20);
                        top:50%;
                        margin-top: rem(-12);
                        width:rem(24);
                        height: rem(24);
                        background: url(../../assets/img/search-close.png) no-repeat;
                        background-size: rem(24) rem(24);
                    }
                }
                .cancel{
                font-size: rem(30);
                color:#121212;
                }
            }
            .data-list{
                margin-top: rem(20);
                .data-item{
                    position: relative;
                    padding:rem(20) rem(20);
                    @include border(bottom, #e2e2e2);
                    display: flex;
                    justify-content: space-between;
                    .data-name{
                       .title{
                            font-size: rem(15);
                            color:#262626;
                       }
                       .suffix{
                           color:#8c8c8c;
                           font-size: rem(10);
                           margin-top: rem(5);
                       }
                    }
                    .icon-right{
                        width:rem(44);
                        .data-icon{
                            margin:0 auto;
                            width:rem(24);
                            height: rem(24);
                        }
                        .data-download{
                            width:rem(24);
                            height: rem(24);
                            background:url(../../assets/img/data-download.png) no-repeat;
                            background-size: rem(24) rem(24);
                        }
                        .data-download-ing{
                            width:rem(24);
                            height: rem(24);
                            background:url(../../assets/img/data-download-ing.png) no-repeat;
                            background-size: rem(24) rem(24);
                        }
                        .data-download-done{
                            width:rem(24);
                            height: rem(24);
                            background:url(../../assets/img/data-download-done.png) no-repeat;
                            background-size: rem(24) rem(24);
                        }
                        .icon-text{
                            font-size: rem(10);
                            color:#1D6FE9;
                            margin-top: rem(3);
                            white-space: nowrap;
                        }
                    }
                    .data-status{
                        position: absolute;
                        left:rem(20);
                        bottom:rem(5);
                        font-size: rem(10);
                        color:#1D6FE9;
                    }
                }
            }
        }
    }
</style>