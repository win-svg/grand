<template>
    <div class="sidebar">
        <div class="introduce">项目列表</div>
        <div>
            <a-layout-sider style="background: black;width: inherit;min-width: inherit;max-width: inherit"
            >
                <a-menu
                        mode="inline"
                        :default-selected-keys="[number]"
                        :default-open-keys="[title]"
                        :style="{ height: '100%', borderRight: 0 }"
                >
                    <a-sub-menu  v-for="(item, key ) in leftNav" :key='`sub${key + 1}`'>
                        <span slot="title" @click="skip(0,`sub${key + 1}`,'homePage',key)"><img src="../assets/slider_icon.png" alt="#">{{item.name}}</span>
                        <a-menu-item :key="`sub${key + '0'}`" @click="skip(`sub${key + '0'}`,`sub${key + 1}`,'monitoring', key)">
                            设备监控
                        </a-menu-item>
                        <a-menu-item :key="`sub${key + '1'}`" @click="skip(`sub${key + '1'}`,`sub${key + 1}`,'dataAnalyze', key)">
                            数据分析
                        </a-menu-item>
                    </a-sub-menu>
<!--                    <a-sub-menu key="sub1">-->
<!--                        <span slot="title" @click="skip(0,'sub1','homePage')"><img src="../assets/slider_icon.png" alt="#">上海大剧院</span>-->
<!--                        <a-menu-item key="1" @click="skip(1,'sub1','monitoring')">-->
<!--                            设备监控-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="2" @click="skip(2,'sub1','dataAnalyze')">-->
<!--                            数据分析-->
<!--                        </a-menu-item>-->
<!--                    </a-sub-menu>-->
<!--                    <a-sub-menu key="sub2">-->
<!--                        <span slot="title"><img src="../assets/slider_icon.png" alt="#">北京大剧院</span>-->
<!--                        <a-menu-item key="3">-->
<!--                            设备监控-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="4">-->
<!--                            数据分析-->
<!--                        </a-menu-item>-->
<!--                    </a-sub-menu>-->
<!--                    <a-sub-menu key="sub3">-->
<!--                        <span slot="title"><img src="../assets/slider_icon.png" alt="#">深圳大剧院</span>-->
<!--                        <a-menu-item key="5">-->
<!--                            设备监控-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="6">-->
<!--                            数据分析-->
<!--                        </a-menu-item>-->
<!--                    </a-sub-menu>-->
<!--                    <a-sub-menu key="sub4">-->
<!--                        <span slot="title"><img src="../assets/slider_icon.png" alt="#">四川大剧院</span>-->
<!--                        <a-menu-item key="7">-->
<!--                            设备监控-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="8">-->
<!--                            数据分析-->
<!--                        </a-menu-item>-->
<!--                    </a-sub-menu>-->
<!--                    <a-sub-menu key="sub5">-->
<!--                        <span slot="title"><img src="../assets/slider_icon.png" alt="#">重庆大剧院</span>-->
<!--                        <a-menu-item key="9">-->
<!--                            设备监控-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="10">-->
<!--                            数据分析-->
<!--                        </a-menu-item>-->
<!--                    </a-sub-menu>-->
                </a-menu>
            </a-layout-sider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        data () {
            return {
                number: '1',
                title: 'sub1',
                leftNav: ''
            }
        },
        created() {
         if (sessionStorage.getItem('number')) {
             this.number = sessionStorage.getItem('number')
             this.title = sessionStorage.getItem('title')
         }
         this.leftNav = JSON.parse(sessionStorage.getItem('leftNav'))
        },
        methods: {
            skip (key, title, value, key1) {
                console.log(key,title,value, key1);
                console.log(this.leftNav[key1].name);
                sessionStorage.setItem('number',key)
                sessionStorage.setItem('title',title)
                if (this.$route.path !== `/${value}`) {
                        this.$router.push({name: value})
                    }
            },
        }
    }
</script>

<style scoped lang="scss">
    .sidebar{
        width: 14.5%;
        height: 1007px;
        background:rgba(43,46,58,1);
        .introduce{
            width: 100%;
            height: 67px;
            line-height: 67px;
            font-size:18px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            padding-left: 8%;
        }
        /deep/.ant-menu{
            background: rgba(43,46,58,1);
            color:rgba(255,255,255,1);
        }
        /deep/.ant-menu-submenu-arrow::before{
            background: #fff;
        }
        /deep/.ant-menu-submenu-arrow::after{
            background: #fff;
        }
        /deep/.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
            background:#2176FF;
            color: #fff;
        }
        /deep/.ant-menu:not(.ant-menu-horizontal) .ant-menu-submenu-title:hover{
            background:#2176FF;
        }
        img {
            position: relative;
            left: -3%;
            top: -2px;
        }
    }
</style>