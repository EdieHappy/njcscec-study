<template>
    <div class="study-page my-credit">
         <navbar title="我的积分"></navbar>
         <div class="credit-box">
             <div class="credit-total credit-cell">
                 总积分：<em v-if="creditObj && +creditObj.totalCredits > 0">{{creditObj && creditObj.totalCredits}}分</em>
                 <em v-else>暂无积分</em>
             </div>
             <div class="credit-item credit-cell" v-for="(item, index) in creditObj.records" :key="index">
                 <div class="course-title">{{item.courseName}}</div>
                 <div class="credit-num">{{item.credit}}分</div>
             </div>
         </div>
    </div>
</template>

<script>
import sutdyNavbar from '../../components/studyNavbar'
export default {
    name: 'myCredit',
    components: {
        navbar: sutdyNavbar
    },
    data() {
        return {
            creditObj: {}
        }
    },
    created() {
        this.getMyCreditList()
    },
    methods: {
        async getMyCreditList() {
            try {
                const { success, message, list } = await this.$store.dispatch('getMyCreditFun', {
                    userId: 3
                })
                if(success) {
                    this.creditObj = list
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .my-credit{
        min-height: 100%;
        background: #fff;
        .credit-box{
            margin-top: rem(30);
            padding:0 rem(20);
            .credit-cell{
                @include border(bottom, #e2e2e2);
            }
            .credit-total{
                height: rem(66);
                font-size: rem(26);
                color:#262626;
                em{
                    color:#1D6FE9;
                }
            }
            .credit-item{
                height: rem(66);
                align-items: center;
                display: flex;
                justify-content: space-between;
                .course-title{
                    font-size: rem(14);
                    color:#262626;
                    max-width: rem(220);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .credit-num{
                    font-size: rem(14);
                    color:#1D6FE9;
                }
            }
        }
    }
</style>