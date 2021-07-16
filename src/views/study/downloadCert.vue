<template>
    <div class="study-page download-cert">
         <navbar title="我的考试"></navbar>
        <div class="cert-display" >
            <div class="cert-wrap">
                <div class="certificate-box" id="cerMain">
                    <img src="../../assets/img/cert-bg.png" alt="">
                    <div class="cert-info">
                        <div class="cert-title">结课证书</div>
                        <div class="cert-user">
                            {{name}}
                        </div>
                        <div class="cert-detail">在2018年度中，顺利完成科技质量规定课程</div>
                        <div class="cert-detail detail-2">特发此证，以兹鼓励！</div>
                        <div class="cert-stamp">
                            <img src="../../assets/img/stamp.png" alt="">
                        </div>
                        <div class="cert-time">
                            <div class="time">2021年2月18日</div>
                            <div class="cert-depart">科技质量部</div>
                        </div>
                    </div>
                </div>
            </div>
             <img :src="cerImg" alt="" class="cert-img" v-if="!loading">
        </div>
        <div class="download-btn" @click="imgDown">
            <div class="download-icon"></div>
            点击下载
        </div>
    </div>
</template> 

<script>
import studyNavbar from '../../components/studyNavbar'
import html2canvas from 'html2canvas'
import utils from '../../lib/utils'
export default {
    name: 'downloadCert',  
    components: {
        navbar: studyNavbar
    },
    data() {
        return{
            cerImg: '',
            loading: true,
            name: this.$store.state.userDetail.name
        }
    },
    created() {
         this.createCer()
    },
    methods: {
        createCer() {
            this.$nextTick(async() => {
            setTimeout(async()=>{
                let domPosterWrap = document.getElementById("cerMain");
                try {
                    let canvas = await html2canvas(domPosterWrap, {
                        useCORS: true,
                        scale: 2,
                        dpi: 96 * 3
                    });
                    this.cerImg = canvas.toDataURL();
                    this.loading = false
                } catch (e) {
                    console.log(e);
                }
            },500)
            });
        },
         // 保存图片到本地
        imgDown () {
            var alink = document.createElement('a')
            alink.href = this.cerImg
            // alink.download = this.userInfo.name // 图片名
            alink.download = 'a' // 图片名
            alink.click()
        },
    }
}
</script>

<style lang="scss" scoped>
.download-cert{
    min-height: 100%;
    background:#fff;
    .cert-display{
        margin:rem(30) auto 0;
        position: relative;
        height:rem(460.35);
    }
    .cert-wrap{
        position: absolute;
        left: -100%;
        // top:100px;
        opacity: 0;
        // left:50%;
        // margin-left:rem(-172.8);
        width:rem(345.6);
        height:rem(460.35);
        // margin-top: 50px;
        // opacity: 0;
        .certificate-box{
            width:rem(345.6);
            height:rem(460.35);
            margin: 0 auto;
            img{
                display: block;
                width: 100%;
                height:100%;
            }
            .cert-info{
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                display: flex;
                flex-direction: column;
                .cert-title{
                    position: absolute;
                    top:rem(78);
                    font-size: rem(15);
                    text-align: center;
                    width:100%;
                }
                .cert-user{
                    position: absolute;
                    top:rem(130);
                    width:100%;
                     text-align: center;
                    font-size: rem(22);
                }
                .cert-detail{
                    position: absolute;
                    width:100%;
                    text-align: center;
                    top:rem(200);
                    font-size: rem(8);
                    line-height: rem(15);
                }
                .detail-2{
                    top:rem(225);
                }
                .cert-stamp{
                    position: absolute;
                    right:rem(82);
                    bottom:rem(97);
                    z-index: 10;
                    img{
                        width:rem(75);
                        height:rem(75);
                    }
                }
                .cert-time{
                    position: absolute;
                    top:rem(330);
                    width:100%;
                    padding:0 rem(70);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    div{
                        background:#A4BDE2;
                        color:#fff;
                        font-size: rem(6);
                        display: inline-flex;
                        padding:0 rem(5);
                        align-items: center;
                        height:rem(10);
                    }
                }
            }
        }
    }
    .cert-img{
         display: block;
        margin:0 auto;
       width:rem(345.6);
            height:rem(460.35);
    }
    .download-btn{
        margin-top: rem(30);
        display: flex;
        width:100%;
        justify-content: center;
        align-items: center;
        .download-icon{
            width:rem(24);
            height: rem(24);
            background:url(../../assets/img/data-download.png) no-repeat;
            background-size: rem(24) rem(24);
            margin-right: rem(8);
        }
        font-size: rem(16);
        color:#1D6FE9;
    }
}
</style>