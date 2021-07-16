<template>
    <div class="search-form">
        <div class="search-box">
            <div class="search-input">
                <i class="search-icon"></i>
                <form action="javascript:void 0">
                    <input v-model="keyWords" type="search" @keyup.13="searchAction" ref="input1" placeholder="搜索" maxlength="11">
                </form>
                <i class="del" v-if="keyWords !== ''" @click="clearInput"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'searchForm',
    props: {

    },
    data() {
        return {
            keyWords: ''
        }
    },
    methods: {
        clearInput() {
            this.keyWords = ''
            this.$parent.getSearchDataList('search')
        },
        searchAction() {
            if (this.keyWords === '') {
                this.$toast('请输入关键词进行搜索！')
                return
            }
            this.$parent.getSearchDataList('search', this.keyWords)
            
        },
    }
}
</script>

<style lang="scss" scoped>
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
            background: url(../assets/img/data-center-search.png) no-repeat;
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
            background: url(../assets/img/search-close.png) no-repeat;
            background-size: rem(24) rem(24);
        }
    }
    .cancel{
    font-size: rem(30);
    color:#121212;
    }
}
</style>