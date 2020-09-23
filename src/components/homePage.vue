<template>
    <div class="homePage_background">
        <Header></Header>
        <div class="homePage_content">
            <Slider></Slider>
          <div class="china_map">
              <div style="width: 100%;height: 100px;font-size:24px;font-weight:400;color:rgba(255,255,255,1);line-height:100px;text-align: center"> 中国大剧院分布图</div>
              <div ref="chart" style="width: 100%;height: 860px;"></div>
          </div>
          <div class="show_data">
              <div class="show_message">
                  <div class="show_title">
                     <span>
                          <img src="../assets/place.png" alt="#">
                          上海大剧院
                     </span>
                  </div>
                  <div class="show_bg"></div>
                  <div class="show_synopsis">
                      上海大剧院是上海的标志性建筑物，它的建成使得人民广 场成为上海名副其实的政治文化中心。正日益成为上海重 要的中外文化交流窗口和艺术沟通的桥梁。
                  </div>
              </div>
              <div class="show_brokenline" ref="chart1"></div>
              <div class="show_brokenline" ref="chart2"></div>
          </div>
        </div>
    </div>
</template>

<script>
    require('../../public/china')  //引入china.js地图文件
    export default {
        name: "homePage",
        data () {
            return {
                number: 1,
                leftNav: '',
                time: [],
            }
        },
        created() {
            this.leftNav = JSON.parse(sessionStorage.getItem('leftNav'))
        },
        mounted() {
            this.getEchartData()
            this.getEchartData1()
            this.getEchartData2()
        },
        methods: {
            getEchartData() {
                const chart = this.$refs.chart
                if (chart) {
                    const myChart = this.$echarts.init(chart)
                    var geoCoordMap0 = {
                        上海: [121.4648, 31.2891],
                        深圳: [114.066112, 22.548515],
                        北京: [116.4551, 40.2539],
                        宁波: [121.556686, 29.880177]
                        // 四川:[103.36 , 30.65],
                        // 杭州: [119.5313, 29.8773],
                        // 西安: [108.946306, 34.347436],
                        // 南昌: [115.864528, 28.687675],
                        // 广州: [113.270793, 23.135308],
                    };
                    var XAData0 = [
                        [ { name: "上海", value: 100 }],
                        [ { name: "深圳", value: 100 }],
                        [ { name: "北京", value: 100 }],
                        [ { name: "宁波", value: 100 }],
                        // [ { name: "四川", value: 100 }],
                        // [ { name: "杭州", value: 100 }],
                        // [ { name: "西安", value: 100 }],
                        // [ { name: "南昌", value: 100 }],
                        // [ { name: "广州", value: 100 }],
                    ];
                    var geoCoordMap = {
                    };
                    var XAData = [
                    ];
                    this.leftNav.forEach(v => {
                        geoCoordMap[(v.name).substring(0, 2)] = geoCoordMap0[(v.name).substring(0, 2)]
                        if ((v.name).substring(0, 2) === '中展') {
                            geoCoordMap['北京'] = geoCoordMap0['北京']
                        }
                    })
                    for (let i = 0; i < XAData0.length; i++) {
                        for(var p1 in geoCoordMap) {
                           if (XAData0[i][0].name === p1) {
                               XAData.push(XAData0[i])
                            }
                        }
                    }
                    var series = [];
                    [
                        [XAData]
                    ].forEach(function(item) {
                        series.push(
                            {
                                type: "effectScatter",
                                coordinateSystem: "geo",
                                zlevel: 2,
                                rippleEffect: {
                                    brushType: "stroke",
                                    period: 2.5, //波纹秒数
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        color: "#fff",
                                        position: "top",
                                        borderWidth: 1,
                                        borderColor: '#29b5c6',
                                        borderRadius: 3,
                                        padding: 7,
                                        formatter: function(params) {
                                            // return params.data.name + "大剧院"
                                            // console.log(params.data.name);
                                            if (params.data.name === '上海') {
                                                return params.data.name + "大剧院"
                                            } else if (params.data.name === '北京') {
                                                return '中展丹青藏'
                                            } else if (params.data.name === '深圳') {
                                                return '深圳两馆'
                                            } else if (params.data.name === '宁波') {
                                                return '宁波美术馆'
                                            }
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#30b0bf",
                                    },
                                    emphasis: {
                                        areaColor: "#0AFCF3"
                                    }
                                },
                                data: item[0].map(function(dataItem) {
                                    return {
                                        name: dataItem[0].name,
                                        value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                                    };
                                })
                            }
                        );
                    });
                    const option = {
                        tooltip: {
                            trigger: "item",
                            formatter: function(params) {
                                return params.data.name

                            },
                        },
                        legend: {
                            orient: "vertical",
                            top: "bottom",
                            left: "right",
                            selectedMode: "multiple"
                        },
                        geo: {
                            map: "china",
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#18A2C5'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    color: "#fff"
                                }
                            },
                            // 把中国地图放大了1.2倍
                            zoom: 1.2,
                            roam: true,
                            itemStyle: {
                                normal: {
                                    // 地图省份的背景颜色
                                    areaColor: "#3A3F54",
                                    borderWidth: 2, //设置外层边框
                                    borderColor:'#4286c2',
                                },
                                emphasis: {
                                    areaColor: "#2B91B7"
                                }
                            }
                        },
                        series: series
                    };
                    myChart.setOption(option);
                    window.addEventListener("resize", function() {
                        myChart.resize()
                    })
                    myChart.on('click', function (params) {
                        var city = params.name;
                        alert(city);
                    });
                }

            },
            getEchartData1() {
                this.$api.homePagetData({params: {sensorNames: ''}}).then(data => {
                    data.data.data.hours.forEach(v => {
                        this.time.push((v + '').substring(8) + ': 00')
                    })
                        let series = []
                        data.data.data.temper.tem.forEach((v, index) => {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3
                            }
                            let remainder = []
                            v.temperData.forEach(v => {
                                remainder.push(v.substring(0,v.indexOf(".")+2))
                            })
                            a.name = `${v.sensorName}号柜`
                            a.data = remainder
                            a.stack = `总量${index}`
                            series.push(a)
                        })
                    const chart = this.$refs.chart1
                    if (chart) {
                        const myChart = this.$echarts.init(chart)
                        const option = {
                            title: {
                                text: '温度',
                                left: "5%",
                                top: "5%"
                            },
                            // 通过这个color修改两条线的颜色
                            color: ["#317FFC","#FB980B","#61E27F"],
                            tooltip: {
                                trigger: 'axis',
                                formatter: function(params) {
                                    let result = params[0].name
                                    params.forEach(function(item) {
                                        if (item.data) {
                                            result += '<br/><span style="background: ' + item.color + '; width: 11px; height: 11px; border-radius: 11px; float: left; margin: 5px 3px;"></span>' + item.seriesName + '：' + item.data + '℃'
                                        }
                                    })
                                    return result
                                },
                                // backgroundColor: '#fff',//背景颜色（此时为默认色
                                // borderColor: '#4F5050',
                                // borderWidth: 1,
                                borderRadius: 8,//边框圆角// ）
                                padding: [
                                    10,  // 上
                                    20, // 右
                                    10,  // 下
                                    20, // 左
                                ],
                                // textStyle:{
                                //     color: '#000',
                                //     height: 50
                                // }
                            },
                            legend: {
                                icon: "roundRect",
                                itemHeight: 5,
                                itemGap: 15,
                                right: "5%",
                                top: "5%"
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: this.time,
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                            },
                            yAxis: {
                                type: 'value',
                                // 刻度
                                // max: 45,
                                interval: 5,
                                axisLabel: {
                                    formatter: '{value} ℃'
                                },
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                                // splitLine: {
                                //     lineStyle: {
                                //         type: 'dashed'
                                //     }
                                // }
                            },
                            series: series
                        };
                        myChart.setOption(option)
                        window.addEventListener("resize", function() {
                            myChart.resize()
                        })
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            },
            getEchartData2() {
                this.$api.homePagetData({params: {sensorNames: ''}}).then(data => {
                    this.time = []
                    data.data.data.hours.forEach(v => {
                        this.time.push((v + '').substring(8) + ': 00')
                    })
                    let series = []
                    data.data.data.hum.hum.forEach((v, index) => {
                        let a = {
                            type: 'line',
                            showSymbol: false,
                            symbolSize: 3
                        }
                        let remainder = []
                        v.humData.forEach(v => {
                            remainder.push(v.substring(0,v.indexOf(".")+2))
                        })
                        a.name = `${v.sensorName}号柜`
                        a.data = remainder
                        a.stack = `总量${index}`
                        series.push(a)
                    })
                    const chart = this.$refs.chart2
                    if (chart) {
                        const myChart = this.$echarts.init(chart)
                        const option = {
                            title: {
                                text: '湿度',
                                left: "5%",
                                top: "5%"
                            },
                            // 通过这个color修改两条线的颜色
                            color: ["#317FFC","#FB980B","#61E27F"],
                            tooltip: {
                                trigger: 'axis',
                                formatter: function(params) {
                                    let result = params[0].name
                                    params.forEach(function(item) {
                                        if (item.data) {
                                            result += '<br/><span style="background: ' + item.color + '; width: 11px; height: 11px; border-radius: 11px; float: left; margin: 5px 3px;"></span>' + item.seriesName + '：' + item.data + '%'
                                        }
                                    })
                                    return result
                                },
                                // backgroundColor: '#fff',//背景颜色（此时为默认色
                                // borderColor: '#4F5050',
                                // borderWidth: 1,
                                borderRadius: 8,//边框圆角// ）
                                padding: [
                                    10,  // 上
                                    20, // 右
                                    10,  // 下
                                    20, // 左
                                ],
                                // textStyle:{
                                //     color: '#000',
                                //     height: 50
                                // }
                            },
                            legend: {
                                icon: "roundRect",
                                itemHeight: 5,
                                itemGap: 15,
                                right: "5%",
                                top: "5%"
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: this.time,
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                            },
                            yAxis: {
                                type: 'value',
                                // 刻度
                                // max: 90,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value}%'
                                },
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                                // splitLine: {
                                //     lineStyle: {
                                //         type: 'dashed'
                                //     }
                                // }
                            },
                            series: series
                        };
                        myChart.setOption(option)
                        window.addEventListener("resize", function() {
                            myChart.resize()
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            },
        }
    }
</script>

<style scoped lang="scss">
.homePage_background{
    width: 100vw;
    height: 1080px;
    overflow-x: hidden;
    background:rgba(241,241,241,1);
    .homePage_content{
        width: 100%;
        height: 1007px;
        display: flex;
        .china_map{
            width: 60%;
            height: 960px;
            background: #3A3F54;
            margin-top: 23px;
            margin-left: 1%;
            border-radius:4px;
        }
        .show_data{
            width: 23.5%;
            height: 960px;
            margin-top: 23px;
            margin-left: 1%;
            border-radius:4px;
            .show_message{
                width: 92%;
                height: 420px;
                background: #fff;
                border-radius:4px;
                .show_title{
                    width: 80%;
                    margin-left: 10%;
                    height: 54px;
                    border-bottom: 1px solid #363A45;
                    position: relative;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    span{
                        position: absolute;
                        top: 15px;
                    }
                }
                .show_bg{
                    width: 80%;
                    margin-left: 10%;
                    height: 240px;
                    background: url("../assets/show_bg.png") no-repeat center;
                    background-size: 100% 100%;
                    margin-top: 18px;
                }
                .show_synopsis{
                    width: 80%;
                    margin-left: 10%;
                    height: 63px;
                    margin-top: 19px;
                }
            }
            .show_brokenline{
                width: 92%;
                height: 250px;
                border-radius:4px;
                background: #fff;
                margin-top: 20px;
            }
        }
    }
}
</style>