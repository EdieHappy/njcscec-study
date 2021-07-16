<template>
    <div class="study-page data-center">
         <navbar title="我的下载"></navbar>
         <div class="center-box">
                <div class="data-list" v-if="dataList.length > 0">
                    <div class="data-item" v-for="(item, index) in dataList" :key="index">
                         <div class="data-name">
                             <div class="title">{{item.docTitle}}</div>
                             <div class="suffix">{{item.filename}}</div>
                         </div>
                    </div>
                </div>
                <div class="no-data" v-else>
                    <div class="no-data-bg"></div>
                    <div class="no-data-message">暂无下载</div>
                </div>
         </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'dataCenter',
    components: {
        navbar: studyNavbar
    },
    data() {
        return {
            dataList: [],
        }
    },
    created() {
        this.getDownloadData()
    },
    methods: {
        async getDownloadData() {
            try {
                const { success, message, list } = await this.$store.dispatch('getMyDownloadsFun', {
                    userId: 2
                })
                if(success) {
                    this.dataList = list
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
            }
        },
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
                }
            }
        }
    }
</style>