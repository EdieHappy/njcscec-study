<template>
    <div class="study-page my-center">
          <navbar title="我的中心"></navbar>
          <div class="user-info">
              <div class="user-img"></div>
              <div class="user-name">{{ userDetail && userDetail.name}}</div>
              <div class="user-depart">{{userDetail && userDetail.businessName}}</div>
          </div>
          <div class="module-list">
              <div class="module-item" @click="$router.push('/myCredit')">
                  <div class="module-icon icon-jifen"></div>
                  <div class="module-name">我的积分</div>
              </div>
              <div class="module-item">
                  <div class="module-icon icon-kecheng"></div>
                  <div class="module-name">我的课程</div>
              </div>
              <div class="module-item" @click="$router.push('/myDownload')">
                  <div class="module-icon icon-xiazai"></div>
                  <div class="module-name">我的下载</div>
              </div>
              <div class="module-item" @click="$router.push('/myExam')">
                  <div class="module-icon icon-kaoshi"></div>
                  <div class="module-name">我的考试</div>
              </div>
              <div class="module-item" @click="$router.push('/settings')">
                  <div class="module-icon icon-logout"></div>
                  <div class="module-name">设置</div>
              </div>
          </div>
           <tabbar v-bind:activeIndex=2></tabbar>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
import studyTabbar from '../../components/studyTabbar'
export default {
    name:'myCenter',
    data() {
        return {
            show: false,
            userDetail: {}
        }
    },
    components: {
        navbar: studyNavbar,
        tabbar: studyTabbar
    },
    created() {
        this.userDetail = JSON.parse(localStorage.getItem('study_userDetail'))
    },
    methods: {
       
    }
}
</script>

<style lang="scss" scoped>
.my-center{
    min-height:100%;
    background:#fff;
    .user-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:rem(20);
        .user-img{
            display: inline-block;
            width:rem(48);
            height: rem(48);
            background:url(../../assets/img/user-img.png) no-repeat;
            background-size: rem(48) rem(48);
            margin-right: rem(20);
        }
        .user-name{
            font-size: rem(25);
            color:#262626;
            margin-right: rem(14);
        }
        .user-depart{
            font-size: rem(13);
            color:#8C8C8C;
        }
    }
    .module-list{
        .module-item{
            display: flex;
            justify-content: flex-start;
            height:rem(66);
            margin:0 rem(23);
            align-items: center;
            @include border(bottom, #e2e2e2);
            .module-icon{
                display: inline-block;
                width:rem(24);
                height: rem(24);
                margin-right: rem(24);
            }
            .icon-jifen{
                background:url(../../assets/img/my-jifen.png) no-repeat;
                background-size: rem(24) rem(24);
            }
            .icon-kecheng{
                background:url(../../assets/img/my-kecheng.png) no-repeat;
                background-size: rem(24) rem(24);
            }
            .icon-xiazai{
                background:url(../../assets/img/my-xiazai.png) no-repeat;
                background-size: rem(24) rem(24);
            }
            .icon-kaoshi{
                background:url(../../assets/img/my-kaoshi.png) no-repeat;
                background-size: rem(24) rem(24);
            }
            .icon-logout{
                background:url(../../assets/img/my-logout.png) no-repeat;
                background-size: rem(24) rem(24);
            }
            .module-name{
                font-size: rem(16);
                color:#262626;
            }
        }
    }
    .points-view{
        position: fixed;
        width:rem(335);
        left:rem(20);
        top:50%;
        z-index: 10;
        margin-top: rem(-115);
        height:rem(231);
        border-radius: rem(10);
        background-color:#adadad;
        // transform: translate3d(-50%,-50%,0);
        transition-property: transform,opacity,-webkit-transform;
        backface-visibility: hidden;
        transition: .3s;
         padding-top: rem(40);
        div{
            font-size: rem(33);
            color:#fff;
            text-align: center;
            padding-top: rem(20);
        }
        .close{
            position: absolute;
            right:rem(27);
            top:rem(-43);
            width:rem(31);
            height: rem(31);
            background:url(../../assets/img/dialog-close.png) no-repeat;
            background-size: rem(31) rem(31);
        }
    }
    .van-popup{
        border-radius: rem(10);
        overflow: visible;
    }
    .points-box{
        position: relative;
        width:rem(335);
         height:rem(231);
         padding-top: rem(30);
        border-radius: rem(10);
        background-color:#adadad;
        div{
            font-size: rem(33);
            color:#fff;
            text-align: center;
            padding-top: rem(20);
        }
        .close{
            position: absolute;
            right:rem(27);
            top:rem(-43);
            width:rem(31);
            height: rem(31);
            background:url(../../assets/img/dialog-close.png) no-repeat;
            background-size: rem(31) rem(31);
        }
    }
    .van-overlay{
        z-index: 10;
    }
}

</style>