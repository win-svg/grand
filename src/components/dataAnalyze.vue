<template>
    <div class="homePage_background">
        <Header></Header>
        <div style="display: flex">
            <Slider></Slider>
            <div class="dataAnalyze_content" v-show="dataAnalyze1">
                <div class="dataAnalyze_content_broken">
                    <div class="dataAnalyze_content_title">
                        <div class="dataAnalyze_content_left">
                            <div style="width: 50px;font-size:18px;font-weight:400;color:rgba(33,118,255,1);line-height:32px">温度</div>
                            <div style="margin-left: 10px;margin-right: 10px;font-size:18px;font-weight:400;color:rgba(34,34,34,1);line-height:32px;margin-top: 5px">
                                <a-collapse v-model="activeKey">
                                    <a-collapse-panel key="1">
                                        <p></p>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
<!--                            <a-select-->
<!--                                    mode="multiple"-->
<!--                                    :value="selectedItems"-->
<!--                                    @change="handleChange"-->
<!--                                    style="width: 90%"-->
<!--                            >-->
<!--                                <a-select-option v-for="item in filteredOptions" :key="item" :value="item">-->
<!--                                    {{ item }}-->
<!--                                </a-select-option>-->
<!--                            </a-select>-->
                            <div class="dataAnalyze_content_right" style="margin-left: 55%">
                                <a-config-provider :locale="locale"
                                >
                                    <a-date-picker style="text-indent: 0;border: none;height: 41px;line-height: 41px" @change="onChange1" />
                                </a-config-provider>
                                <a-button type="primary" style="margin-top: 5px;margin-left: 4%" @click="examine">
                                    查看折线图
                                </a-button>
                            </div>
                        </div>
                        <div class="dataAnalyze_content_right" style="padding-top: 4px">
                            <a-config-provider :locale="locale"
                            >
                                <a-range-picker
                                        format="YYYY-MM-DD"
                                        :placeholder="['开始日期', '结束日期']"
                                        @change="onChange"
                                        :value="createValue"
                                        :disabledDate="disabledDate"
                                        style="text-indent: 0;border: none;height: 41px;"
                                />
                            </a-config-provider>
                            <a-button type="primary" @click="deriveData">
                                数据查看
                            </a-button>
                        </div>
                    </div>
                    <div class="tree_select" v-if="tree">
                        <a-tree
                                v-model="checkedKeys"
                                checkable
                                :tree-data="treeData"
                                style="margin-left: 10px;margin-top: 14px"
                        />
                    </div>
                    <div class="brokenLine_map" ref="chart"></div>
               </div>
                <div class="dataAnalyze_content_broken">
                    <div class="dataAnalyze_content_title">
                        <div class="dataAnalyze_content_left">
<!--                            <div style="font-size:18px;font-weight:400;color:rgba(33,118,255,1);line-height:32px;border-bottom: 1px dashed #2176FF" @click="temperature1">湿度</div>-->
                            <div style="font-size:18px;font-weight:400;color:rgba(33,118,255,1);line-height:32px">湿度</div>
<!--                            <div style="margin-left: 10px;margin-right: 10px;font-size:18px;font-weight:400;color:rgba(34,34,34,1);line-height:32px;"> > </div>-->
<!--                            <a-select-->
<!--                                    mode="multiple"-->
<!--                                    :value="selectedItems1"-->
<!--                                    @change="handleChange1"-->
<!--                                    style="width: 90%"-->
<!--                            >-->
<!--                            <a-select-->
<!--                                    mode="multiple"-->
<!--                                    :value="selectedItems"-->
<!--                                    @change="handleChange"-->
<!--                                    style="width: 90%"-->
<!--                            >-->
<!--                                <a-select-option v-for="item in filteredOptions" :key="item" :value="item">-->
<!--                                    {{ item }}-->
<!--                                </a-select-option>-->
<!--                            </a-select>-->
                        </div>
                    </div>
<!--                    <div class="tree_select" v-if="tree1">-->
<!--                        <a-tree-->
<!--                                v-model="checkedKeys1"-->
<!--                                checkable-->
<!--                                :tree-data="treeData1"-->
<!--                                style="margin-left: 10px;margin-top: 14px"-->
<!--                        />-->
<!--                    </div>-->
                    <div class="brokenLine_map" ref="chart1"></div>
                </div>
            </div>
            <div class="dataAnalyze_content" v-show="dataAnalyze2">
                <div class="dataAnalyze_content_broken" style="height: 960px;">
                    <div class="deriveData_title1">
                        <div>时间日期</div>
                        <div>设备名称</div>
                        <div>温度(℃)</div>
                        <div>湿度(%)</div>
                        <div>电压(V)</div>
                    </div>
                    <div class="deriveData_content1" v-for="(item, key) in deriveData1" :key="key">
                        <div>{{item.dataTime}}</div>
<!--                        <div>{{item.sensorName}}</div>-->
                        <div>{{item.addrName}}</div>
                        <div>{{item.temperature}}</div>
                        <div>{{item.humidity}}</div>
                        <div>{{item.voltage}}</div>
                    </div>
                    <div class="deriveData_bottom1">
                        <div class="deriveData_bottom_left">
                            <a-button type="primary" style="margin-left: 24px" @click="derive">
                                导出
                            </a-button>
                            <a-button type="primary" style="background: #B5B5B5;border: none;margin-left: 32px" @click="dataAnalyze1 = true, dataAnalyze2 = false ">
                                返回
                            </a-button>
                        </div>
                        <div class="deriveData_bottom_right">
                            <a-pagination :default-current="1" :pageSize= '17' :total=total @change="cut"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import 'moment/locale/zh-cn';

    moment.locale('zh-cn')
    export default {
        name: "dataAnalyze",
        data() {
            return {
                locale: zhCN,
                // selectedItems: ['1号-1', '1号-2', '1号-3', '1号-4', '2号-5', '2号-6',
                //     '2号-7', '2号-8', '3号-9', '3号-10', '3号-11', '3号-12'],
                // selectedItems1: [
                //     "1号-01", "1号-02", "1号-03", "1号-04", "2号-01", "2号-02", "2号-03", "2号-04", "3号-01", "3号-02", "3号-03", "3号-04"
                // ],
                createValue: [],
                startTime: '',
                endTime: '',
                // createValue1: [],
                // 树结构
                tree: false, // 控制显示隐藏
                tree1: false,
                cache: 0, // 计数器
                // cache1:0,
                treeData: [
                    {
                        title: '全选',
                        key: '9',
                        children: [
                            {
                                title: '1号',
                                key: '0',
                                children: [
                                    {
                                        title: '01',
                                        key: '1号-1',
                                    },
                                    {
                                        title: '02',
                                        key: '1号-2',
                                    },
                                    {
                                        title: '03',
                                        key: '1号-3',
                                    },
                                    {
                                        title: '04',
                                        key: '1号-4',
                                    },
                                ],
                            },
                            {
                                title: '2号',
                                key: '1',
                                children: [
                                    {
                                        title: '05',
                                        key: '2号-5',
                                    },
                                    {
                                        title: '06',
                                        key: '2号-6',
                                    },
                                    {
                                        title: '07',
                                        key: '2号-7',
                                    },
                                    {
                                        title: '08',
                                        key: '2号-8',
                                    },
                                ],
                            },
                            {
                                title: '3号',
                                key: '3',
                                children: [
                                    {
                                        title: '09',
                                        key: '3号-9',
                                    },
                                    {
                                        title: '10',
                                        key: '3号-10',
                                    },
                                    {
                                        title: '11',
                                        key: '3号-11',
                                    },
                                    {
                                        title: '12',
                                        key: '3号-12',
                                    },
                                ],
                            },
                        ]
                    },
                ],
                // treeData1: [
                //     {
                //         title: '全选',
                //         key: '9',
                //         children: [
                //             {
                //                 title: '1号',
                //                 key: '0',
                //                 children: [
                //                     {
                //                         title: '01',
                //                         key: '1号-01',
                //                     },
                //                     {
                //                         title: '02',
                //                         key: '1号-02',
                //                     },
                //                     {
                //                         title: '03',
                //                         key: '1号-03',
                //                     },
                //                     {
                //                         title: '04',
                //                         key: '1号-04',
                //                     },
                //                 ],
                //             },
                //             {
                //                 title: '2号',
                //                 key: '1',
                //                 children: [
                //                     {
                //                         title: '01',
                //                         key: '2号-01',
                //                     },
                //                     {
                //                         title: '02',
                //                         key: '2号-02',
                //                     },
                //                     {
                //                         title: '03',
                //                         key: '2号-03',
                //                     },
                //                     {
                //                         title: '04',
                //                         key: '2号-04',
                //                     },
                //                 ],
                //             },
                //             {
                //                 title: '3号',
                //                 key: '2',
                //                 children: [
                //                     {
                //                         title: '01',
                //                         key: '3号-01',
                //                     },
                //                     {
                //                         title: '02',
                //                         key: '3号-02',
                //                     },
                //                     {
                //                         title: '03',
                //                         key: '3号-03',
                //                     },
                //                     {
                //                         title: '04',
                //                         key: '3号-04',
                //                     },
                //                 ],
                //             },
                //         ]
                //     },
                // ],
                time: [],
                checkedKeys:['1号-1', '1号-2', '1号-3', '1号-4', '2号-5', '2号-6',
                    '2号-7', '2号-8', '3号-9', '3号-10', '3号-11', '3号-12'],
                dataAnalyze1: true,
                dataAnalyze2: false,
                page: 1,
                pageSize: 17,
                total: null,
                deriveData1: '', // 导出数据预览
                // 折线图查看日期
                startTime1: '',
                endTime1: '',
                activeKey: [],
                sensorNames: '' // 线条数量
            }
        },
        created() {
            this.getEchartData()
            this.getEchartData1()
        },
        // computed: {
        //     filteredOptions() {
        //         return (o => !this.selectedItems.includes(o));
        //     },
        methods: {
            moment,
            handleChange(selectedItems) {
                // this.selectedItems = selectedItems;
                this.checkedKeys = selectedItems
            },
            // handleChange1(selectedItems) {
            //     this.selectedItems1 = selectedItems;
            //     this.checkedKeys1 = selectedItems
            // },
            // 限制选择日期
            disabledDate(current) {
                return current && current > moment().endOf('day')
            },
            onChange(date, dateString) {
                console.log(date, dateString);
                this.createValue = date;
                this.startTime = dateString[0]
                this.endTime = dateString[1]
            },
            onChange1(date, dateString) {
                console.log(date, dateString);
                this.startTime1 = dateString
                this.endTime1 = dateString
            },
            cut(current) {
                console.log(current);
                this.$api.Datapreview({startTime: this.startTime, endTime: this.endTime, sensorNames: this.sensorNames,
                // this.$api.DatapreviewTest({startTime: this.startTime, endTime: this.endTime, sensorNames: this.sensorNames,
                    pageSize: this.pageSize, page: current, type: 1})
                    .then(data => {
                        this.deriveData1 = data.data.data.devices
                        this.total = data.data.data.total
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            //折线图1
            getEchartData() {
                this.time = []
                this.$api.getEchartData({
                // this.$api.test({
                    endTime: this.startTime1,
                    sensorNames: "",
                    startTime: this.endTime1
                }).then(data => {
                    data.data.data.hours.forEach(v => {
                        this.time.push((v + '').substring(8) + ': 00')
                    })
                    console.log(data.data.data.temper.tem);
                    let series = []
                    data.data.data.temper.tem.forEach((v, index) => {
                        if (index < 4) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `1号-${index+1}`
                            a.data = v.temperData
                            a.stack = `总量${index}`
                            series.push(a)
                        } else if ((index >= 4) && (index < 8)) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `2号-${index+1}`
                            a.data = v.temperData
                            a.stack = `总量${index}`
                            series.push(a)
                        } else if (8 <= index < 12) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `3号-${index+1}`
                            a.data = v.temperData
                            a.stack = `总量${index}`
                            series.push(a)
                        }
                    })
                    const chart = this.$refs.chart
                    if (chart) {
                        const myChart = this.$echarts.init(chart)
                        const option = {
                            // 通过这个color修改两条线的颜色
                            color: ["#317FFC","#FB980B","#61E27F",'#F26EBA',
                                '#67C5E2', '#FB540B', '#3BB771', '#FB0B49',
                                '#6A67D9', '#F0C603', '#A8CC2F', '#F26EBA'],
                            tooltip: {
                                trigger: 'axis',
                                formatter: function(params) {
                                    let result = params[0].name + '    ' + new Date().toLocaleTimeString()
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
                                right: 'auto',
                                bottom: "3%",
                                borderWidth: 1,
                                borderColor: '#CCCCCC',
                                borderRadius: 2,
                                padding: [8,10],
                                selectedMode:false,//取消图例上的点击事件
                                data: ['1号-1', '1号-2', '1号-3', '1号-4', '2号-5', '2号-6',
                                    '2号-7', '2号-8', '3号-9', '3号-10', '3号-11', '3号-12'],
                                selected:{'1号-1':true,'1号-2':true,'1号-3':true,'1号-4':true, '2号-5':true,'2号-6':true,'2号-7':true,'2号-8':true,
                                    '3号-9':true,'3号-10':true,'3号-11':true,'3号-12':true}
                            },
                            grid: {
                                left: '3%',
                                top: '5%',
                                right: '4%',
                                bottom: '15%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                // data: ['2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01',
                                //     '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01'],
                                data: this.time,
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                                axisLabel: {
                                    height: 30,
                                    lineHeight: 30
                                }
                            },
                            yAxis: {
                                type: 'value',
                                // 刻度
                                // max: 50,
                                scale: true,
                                interval: 1,
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
                        // 复选框选中
                        const selected = myChart.getOption().legend[0].selected;//legend所有值
                        let valArray = []
                        this.checkedKeys.forEach((v) => {
                            if (v.length > 1) {
                                valArray.push(v)
                            }
                        })
                        // 1.全部为空
                        if (valArray.length === 0) {
                            Object.keys(selected).forEach((v) => {
                                selected[v] = false
                            })
                        } else {
                            let arr1 = Object.keys(selected)
                            let arr2 = valArray
                            if (arr2.length === 12) {
                                arr2.forEach(v => {
                                    selected[v] = true
                                })
                            } else {
                                let getArrDifference = function (arr1, arr2) {
                                    return arr1.concat(arr2).filter(function(v, i, arr) {
                                        return arr.indexOf(v) === arr.lastIndexOf(v);
                                    });
                                }
                                console.log(getArrDifference(arr1, arr2));
                                console.log(valArray);
                                    // 设置显示
                                valArray.forEach(v => {
                                        selected[v] = true
                                    })
                                // 设置隐藏
                                    getArrDifference(arr1, arr2).forEach(v => {
                                        selected[v] = false
                                    })
                            }
                        }
                        option.legend.selected = selected
                        myChart.setOption(option);
                        window.addEventListener("resize", function() {
                            myChart.resize()
                        })
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            },
            // 折线图2
            getEchartData1() {
                this.time1 = []
                this.$api.getEchartData({
                // this.$api.test({
                    endTime: this.startTime1,
                    sensorNames: "",
                    startTime: this.endTime1
                }).then(data => {
                    data.data.data.hours.forEach(v => {
                        this.time1.push((v + '').substring(8) + ': 00')
                    })
                    let series = []
                    data.data.data.hum.hum.forEach((v, index) => {
                        if (index < 4) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `1号-${index+1}`
                            a.data = v.humData
                            a.stack = `总量${index}`
                            series.push(a)
                        } else if ((index >= 4) && (index < 8)) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `2号-${index+1}`
                            a.data = v.humData
                            a.stack = `总量${index}`
                            series.push(a)
                        } else if (8 <= index < 12) {
                            let a = {
                                type: 'line',
                                showSymbol: false,
                                symbolSize: 3,
                                smooth:true
                            }
                            a.name = `3号-${index+1}`
                            a.data = v.humData
                            a.stack = `总量${index}`
                            series.push(a)
                        }
                    })
                    const chart = this.$refs.chart1
                    if (chart) {
                        const myChart = this.$echarts.init(chart)
                        const option = {
                            // 通过这个color修改两条线的颜色
                            color: ["#317FFC","#FB980B","#61E27F",'#F26EBA',
                                '#67C5E2', '#FB540B', '#3BB771', '#FB0B49',
                                '#6A67D9', '#F0C603', '#A8CC2F', '#F26EBA'],
                            tooltip: {
                                trigger: 'axis',
                                formatter: function(params) {
                                    let result = params[0].name + '    ' + new Date().toLocaleTimeString()
                                    params.forEach(function(item) {
                                        if (item.data) {
                                            result += '<br/><span style="background: ' + item.color + '; width: 11px; height: 11px; border-radius: 11px; float: left; margin: 5px 3px;"></span>' + item.seriesName + '：' + item.data + '%'
                                        }
                                    })
                                    return result
                                },
                                borderRadius: 8,//边框圆角// ）
                                padding: [
                                    10,  // 上
                                    20, // 右
                                    10,  // 下
                                    20, // 左
                                ],
                            },
                            legend: {
                                icon: "roundRect",
                                itemHeight: 5,
                                itemGap: 15,
                                right: 'auto',
                                bottom: "3%",
                                borderWidth: 1,
                                borderColor: '#CCCCCC',
                                borderRadius: 2,
                                padding: [8,10],
                                selectedMode:false,//取消图例上的点击事件
                                data: ['1号-1', '1号-2', '1号-3', '1号-4', '2号-5', '2号-6',
                                    '2号-7', '2号-8', '3号-9', '3号-10', '3号-11', '3号-12'],
                                selected:{'1号-1':true,'1号-2':true,'1号-3':true,'1号-4':true, '2号-5':true,'2号-6':true,'2号-7':true,'2号-8':true,
                                    '3号-9':true,'3号-10':true,'3号-11':true,'3号-12':true}
                            },
                            grid: {
                                left: '3%',
                                top: '5%',
                                right: '4%',
                                bottom: '15%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: this.time1,
                                axisLine: {
                                    show: false // 去除轴线
                                },
                                axisTick: {
                                    show: false // 去除刻度线
                                },
                                axisLabel: {
                                    height: 30,
                                    lineHeight: 30
                                }
                            },
                            yAxis: {
                                type: 'value',
                                // 刻度
                                // max: 100,
                                scale: true,
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
                        // 复选框选中
                        const selected = myChart.getOption().legend[0].selected;//legend所有值
                        let valArray = []
                        this.checkedKeys.forEach((v) => {
                            if (v.length > 1) {
                                valArray.push(v)
                            }
                        })
                        // 1.全部为空
                        if (valArray.length === 0) {
                            Object.keys(selected).forEach((v) => {
                                selected[v] = false
                            })
                        } else {
                            let arr1 = Object.keys(selected)
                            let arr2 = valArray
                            if (arr2.length === 12) {
                                arr2.forEach(v => {
                                    selected[v] = true
                                })
                            } else {
                                let getArrDifference = function (arr1, arr2) {
                                    return arr1.concat(arr2).filter(function(v, i, arr) {
                                        return arr.indexOf(v) === arr.lastIndexOf(v);
                                    });
                                }
                                // 设置显示
                                valArray.forEach(v => {
                                    selected[v] = true
                                })
                                // 设置隐藏
                                getArrDifference(arr1, arr2).forEach(v => {
                                    selected[v] = false
                                })
                            }
                        }
                        option.legend.selected = selected
                        myChart.setOption(option);
                        window.addEventListener("resize", function() {
                            myChart.resize()
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            },
            // 导出预览
            deriveData () {
              if (this.startTime && this.endTime) {
                    this.$api.Datapreview({startTime: this.startTime, endTime: this.endTime, sensorNames: this.sensorNames,
                  // this.$api.DatapreviewTest({startTime: this.startTime, endTime: this.endTime, sensorNames: this.sensorNames,
                        pageSize: this.pageSize, page: this.page, type: 1})
                        .then(data => {
                            console.log(data);
                            this.dataAnalyze1 = false
                            this.dataAnalyze2 = true
                            this.$message.success('查询导出数据成功')
                            this.deriveData1 = data.data.data.devices
                            this.total = data.data.data.total
                            console.log(data);
                            console.log(this.deriveData1);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    this.$message.warning('请选择时间')
                }
            },
            // 导出
            derive () {
                let url = `http://139.224.190.233:9012/user/getDeviceExport?startTime=${this.startTime}&endTime=${this.endTime}&sensorNames=${this.sensorNames}&type=2`
                // let url = `http://192.168.1.107:8701/user/getDeviceExport?startTime=${this.startTime}&endTime=${this.endTime}&sensorNames=${this.sensorNames}&type=2`
                const ele = document.createElement('a');
                ele.setAttribute('href',url); //设置下载文件的url地址
                ele.setAttribute('download','文件一');//用于设置下载文件的文件名
                ele.click();
                this.dataAnalyze1 = true
                this.dataAnalyze2 = false
            },
            // 查看折线图数据
            examine () {
                if (this.startTime1) {
                    this.getEchartData()
                    this.getEchartData1()
                } else {
                    this.$message.warning('请选择时间')
                }
            }
        },
        watch: {
            checkedKeys(val) {
                console.log(val);
                let valArray = []
                val.forEach((v) => {
                    if (v.length > 1) {
                        valArray.push(v)
                    }
                })
                // this.selectedItems = valArray
                // console.log(this.selectedItems);
                function getCaption(obj,state) {
                    var index=obj.lastIndexOf("-");
                    if(state==0){
                        obj=obj.substring(0,index);
                    }else {
                        obj=obj.substring(index+1,obj.length);
                    }
                    return obj;
                }
                let a = []
                valArray.forEach(v => {
                    a.push(getCaption(v, 1))
                })
                console.log(a);
                this.sensorNames = a.join(',')
                console.log(this.sensorNames);
                this.getEchartData()
                this.getEchartData1()
            },
            activeKey(key) {
                this.cache++
                if (this.cache % 2 === 1) {
                    this.tree = true
                } else {
                    this.tree = false
                }
                console.log(key);
            },
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
            height: 468px;
            margin-top: 24px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 5px 0px rgba(204,204,204,0.18);
            border-radius:4px;
            position: relative;
            .dataAnalyze_content_title{
                width: 94%;
                margin-left: 3%;
                position: absolute;
                top: 20px;
                height: 50px;
                display: flex;
                .dataAnalyze_content_left{
                    width: 65%;
                    height: 50px;
                    display: flex;
                    /deep/.ant-select-selection__rendered{
                        height: 36px;
                    }
                    /deep/.ant-select-selection{
                        border: none;
                    }
                }
                .dataAnalyze_content_right{
                    width: 35%;
                    height: 50px;
                    display: flex;
                    /deep/.ant-input{
                        width: 90%;
                        height: 36px ;
                        margin-left: 10px;
                    }
                }
            }
            .tree_select{
                width: 14%;
                height: 248px;
                position: absolute;
                left: 3%;
                top: 75px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(204,204,204,0.18);
                border-radius:4px;
                overflow-y: scroll;
                z-index: 99;
            }
            .brokenLine_map{
                width: 94%;
                margin-left: 3%;
                height: 391px;
                position: absolute;
                top: 77px;
            }
            .deriveData_title1{
                width: 100%;
                height:50px;
                background:rgba(220,224,237,1);
                border-radius:4px 4px 0px 0px;
                display: flex;
                div{
                    text-align: center;
                    width: 20%;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    line-height:50px;
                }
            }
            .deriveData_content1{
                width: 100%;
                height:50px;
                border-radius:4px 4px 0px 0px;
                display: flex;
                border-bottom: 1px solid #CCCCCC;
                div{
                    text-align: center;
                    width: 20%;
                    font-size:14px;
                    font-weight:400;
                    color:#222222;
                    line-height:50px;
                }
            }
            .deriveData_bottom1{
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
    ::-webkit-scrollbar {
        height: 70px !important;
        width: 18px !important;
        background-color: #fff;
    }

    /*滑块样式*/
    ::-webkit-scrollbar-thumb {
        width: 18px;
        height: 70px;
        border-style: dashed;
        border-color: #e2242400;
        border-width: 1.5px;
        background-clip: padding-box;
        background: rgba(187, 199, 249, 1);
    }
    /deep/.ant-collapse > .ant-collapse-item > .ant-collapse-header{
        padding-left: 25px;
    }
</style>