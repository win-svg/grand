<template>
    <div class="homePage_background">
        <Header></Header>
        <div class="homePage_content" style="display: flex">
            <Slider></Slider>
            <div class="dataAnalyze_content">
                <div class="dataAnalyze_content_broken">
                    <div class="deriveData_title">
                        <div>时间日期</div>
                        <div>设备名称</div>
                        <div>状态</div>
                        <div>露点/霜点(℃)</div>
                        <div>温度(℃)</div>
                        <div>湿度(%)</div>
                    </div>
                    <div class="deriveData_content" v-for="(item, key) in 17" :key="key">
                        <div>2020-05-14</div>
                        <div>一号柜: 点位1</div>
                        <div>
                            <a-button type="primary" style="background: #05C231;border: none">
                                运行
                            </a-button>
                        </div>
                        <div>22.9</div>
                        <div>23</div>
                        <div>60</div>
                    </div>
                    <div class="deriveData_bottom">
                        <div class="deriveData_bottom_left">
                            <a-button type="primary" style="margin-left: 24px">
                                确认
                            </a-button>
                            <a-button type="primary" style="background: #B5B5B5;border: none;margin-left: 32px" @click="getreturn">
                                返回
                            </a-button>
                        </div>
                        <div class="deriveData_bottom_right">
                            <a-pagination :default-current="1" :pageSize= '12' :total="500" @change="cut"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
</template>

<script>
    export default {
        name: "deriveData",
        methods: {
            getreturn () {
                this.$router.push({name: 'dataAnalyze'})
            },
            cut(current) {
                console.log(current);
            }
        }
    }
</script>

<style scoped lang="scss">
    .dataAnalyze_content{
        width: 85.5%;
        height: 960px;
        .dataAnalyze_content_broken{
            width: 94%;
            margin-left: 3%;
            height: 960px;
            margin-top: 24px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 5px 0px rgba(204,204,204,0.18);
            border-radius:4px;
            .deriveData_title{
                width: 100%;
                height:50px;
                background:rgba(220,224,237,1);
                border-radius:4px 4px 0px 0px;
                display: flex;
                div{
                    text-align: center;
                    width: 16.666%;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    line-height:50px;
                }
            }
            .deriveData_content{
                width: 100%;
                height:50px;
                border-radius:4px 4px 0px 0px;
                display: flex;
                border-bottom: 1px solid #CCCCCC;
                div{
                    text-align: center;
                    width: 16.666%;
                    font-size:14px;
                    font-weight:400;
                    color:#222222;
                    line-height:50px;
                }
            }
            .deriveData_bottom{
                width: 100%;
                height: 80px;
                display: flex;
                .deriveData_bottom_left{
                    width: 40%;
                    height: 60px;
                    line-height: 60px;
                }
                .deriveData_bottom_right{
                    width: 60%;
                    height: 60px;
                    position: relative;
                    /deep/.ant-pagination{
                        position: absolute;
                        right: 24px;
                        top: 14px;
                    }
                }
            }
        }
    }
</style>