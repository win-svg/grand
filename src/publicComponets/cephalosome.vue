<template>
    <div class="header_title">
        <div class="header_titleContent">环境智慧管理云平台</div>
        <div class="header_message">
             <span style="position: absolute;right: 45px;" @click="show = !show">
                 <img src="../assets/login_me1.png" alt="#">
                 {{username}}
             </span>
        </div>
        <div class="quit" v-if="show" @click="quit">
         退出登录
        </div>
    </div>
</template>

<script>
    export default {
        name: "cephalosome",
        data () {
            return {
                show: false,
                username: ''
            }
        },
        created() {
            this.username = JSON.parse(sessionStorage.getItem('username'))
        },
        methods: {
            quit () {
                this.$message.success('退出登录成功')
                setTimeout(function () {
                    sessionStorage.clear()
                    window.location.reload()
                }, 200)
            }
        }
    }
</script>

<style scoped lang="scss">
    .header_title{
        width: 100%;
        height:73px;
        background:rgba(49,53,64,1);
        box-shadow:0px 4px 6px 0px rgba(3,8,16,0.18);
        position: relative;
        display: flex;
        .header_titleContent{
            height: 73px;
            line-height: 73px;
            padding-left: 24px;
            font-size:26px;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
        .header_message{
            width: 30%;
            height: 73px;
            position: absolute;
            right: 0;
            line-height: 73px;
            font-size:16px;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
        .quit{
            width: 90px;
            height: 30px;
            border-radius: 3px;
            line-height: 30px;
            text-align: center;
            background: #fff;
            position: absolute;
            right: 30px;
            top: 60px;
            font-size: 14px;
        }
        .quit:hover{
            color: #2176FF;
        }
    }
</style>