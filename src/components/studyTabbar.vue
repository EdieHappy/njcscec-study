<template>
    <div class="study-tabbar">
         <van-tabbar v-model="tabbarTempValue" @change="onChange">
            <van-tabbar-item icon="home-o" >
                 <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? icon[0].active : icon[0].inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search">
                 <span>专题</span>
                <template #icon="props">
                     <img :src="props.active ? icon[1].active : icon[1].inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" >
             <span>我的</span>
                <template #icon="props">
                     <img :src="props.active ? icon[2].active : icon[2].inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'studyTabbar',
    props: {
        activeIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
           tabbarTempValue: 0,
           icon: [
               {
                   active: require("../assets/img/tabbar-home-active.png"),
                   inactive: require("../assets/img/tabbar-home.png"),
               },
                {
                   active: require("../assets/img/tabbar-special-active.png"),
                   inactive: require("../assets/img/tabbar-special.png"),
               },
                {
                   active: require("../assets/img/tabbar-my-active.png"),
                   inactive: require("../assets/img/tabbar-my.png"),
               }
           ]
        }
    },
     watch: {
        activeIndex(val) {
            this.tabbarTempValue = val
        }
    },
    created() {
        this.tabbarTempValue = this.activeIndex
    },
    methods: {
        onChange(index) {
            this.active = index
            let currentUrl = this.$route.path
            const paths = ['/studyIndex', '/mySpecial', '/myCenter']
            if(currentUrl !== paths[index]) {
                this.$router.push({
                    path: paths[index]
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>