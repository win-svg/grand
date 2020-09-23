<template>
    <div class="homePage_background">
        <Header></Header>
        <div style="display: flex">
        <Slider></Slider>
         <div class="monitoring_content">
             <div class="monitoring_data">
                 <div class="monitoring_state">
                     <div class="monitoring_operation">
                         <div class="monitoring_operation1" v-for="(item, key) in 2" :key="key"
                              :class="{'pitch1' :leftColorDisplay1 ===key}" @click="leftIndex1(key)">{{key+1}}号除湿机</div>
                     </div>
                     <div class="monitoring_state_show" style="font-size:30px;">
                        <div style="width: 100%;display: flex" v-if="oneDehumidifier">
                            <div style="width: 33%;">
                                <img src="../assets/stateless.png" alt="#" v-if="operationimg1">
                                <img src="../assets/succeed.png" alt="#" v-if="operationimg2">
                                运行
                            </div>
                            <div style="width: 33%;">
                                <img src="../assets/stateless.png" alt="#" v-if="malfunctionimg1">
                                <img src="../assets/malfunction.png" alt="#" v-if="malfunctionimg2">
                                故障
                            </div>
                            <div style="width: 33%;">
                                <img src="../assets/stateless.png" alt="#" v-if="stopimg1">
                                <img src="../assets/stop.png" alt="#" v-if="stopimg2">
                                停止
                            </div>
                        </div>
                         <div style="width: 100%;display: flex" v-if="twoDehumidifier">
                             <div style="width: 33%;">
                                 <img src="../assets/stateless.png" alt="#" v-if="Toperationimg1">
                                 <img src="../assets/succeed.png" alt="#" v-if="Toperationimg2">
                                 运行
                             </div>
                             <div style="width: 33%;">
                                 <img src="../assets/stateless.png" alt="#" v-if="Tmalfunctionimg1">
                                 <img src="../assets/malfunction.png" alt="#" v-if="Tmalfunctionimg2">
                                 故障
                             </div>
                             <div style="width: 33%;">
                                 <img src="../assets/stateless.png" alt="#" v-if="Tstopimg1">
                                 <img src="../assets/stop.png" alt="#" v-if="Tstopimg2">
                                 停止
                             </div>
                         </div>
                     </div>
                 </div>
<!--                 <div class="monitoring_show">-->
<!--                     <div class="monitoring_operation">-->
<!--                         送风状态-->
<!--                     </div>-->
<!--                     <div class="monitoring_state_show">-->
<!--                         <div class="temperature" style="display: flex">-->
<!--                            <div>-->
<!--                                <img src="../assets/temperature1.png" alt="#">-->
<!--                            </div>-->
<!--                             <div style="height: 112px;margin-left: 20px">-->
<!--                                  <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">-->
<!--                                 温度-->
<!--                             </div>-->
<!--                                 <div style="width: 100%;height: 56px;line-height: 32px;font-size:30px;font-weight:400;color:rgba(34,34,34,1);">-->
<!--                                 20°C-->
<!--                             </div>-->
<!--                             </div>-->
<!--                         </div>-->
<!--                         <div class="temperature" style="display: flex">-->
<!--                             <div>-->
<!--                                 <img src="../assets/humidity.png" alt="#">-->
<!--                             </div>-->
<!--                             <div style="height: 112px;margin-left: 20px">-->
<!--                                 <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">-->
<!--                                     湿度-->
<!--                                 </div>-->
<!--                                 <div style="width: 100%;height: 56px;line-height: 32px;font-size:30px;font-weight:400;color:rgba(34,34,34,1);">-->
<!--                                     20%-->
<!--                                 </div>-->
<!--                             </div>-->
<!--                         </div>-->
<!--                     </div>-->
<!--                 </div>-->
                 <div class="monitoring_show">
                     <div class="monitoring_operation">
                         回风状态
                     </div>
                     <div class="monitoring_state_show">
                        <div  v-if="oneDehumidifier" style="display: flex;width: 100%;">
                            <div class="temperature" style="display: flex">
                                <div>
                                    <img src="../assets/temperature1.png" alt="#">
                                </div>
                                <div style="height: 112px;margin-left: 20px">
                                    <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">
                                        温度
                                    </div>
                                    <div style="width: 100%;height: 56px;line-height: 32px;font-size:25px;font-weight:400;color:rgba(34,34,34,1);">
                                        {{RT1}}°C
                                    </div>
                                </div>
                            </div>
                            <div class="temperature" style="display: flex">
                                <div>
                                    <img src="../assets/humidity.png" alt="#">
                                </div>
                                <div style="height: 112px;margin-left: 20px">
                                    <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">
                                        湿度
                                    </div>
                                    <div style="width: 100%;height: 56px;line-height: 32px;font-size:25px;font-weight:400;color:rgba(34,34,34,1);">
                                        {{RH1}}%
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div v-if="twoDehumidifier" style="display: flex">
                             <div class="temperature" style="display: flex">
                                 <div>
                                     <img src="../assets/temperature1.png" alt="#">
                                 </div>
                                 <div style="height: 112px;margin-left: 20px">
                                     <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">
                                         温度
                                     </div>
                                     <div style="width: 100%;height: 56px;line-height: 32px;font-size:25px;font-weight:400;color:rgba(34,34,34,1);">
                                         {{RT2}}°C
                                     </div>
                                 </div>
                             </div>
                             <div class="temperature" style="display: flex">
                                 <div>
                                     <img src="../assets/humidity.png" alt="#">
                                 </div>
                                 <div style="height: 112px;margin-left: 20px">
                                     <div style="width: 100%;height: 56px;line-height: 80px;font-size: 16px;font-weight:400;color:rgba(153,153,153,1);">
                                         湿度
                                     </div>
                                     <div style="width: 100%;height: 56px;line-height: 32px;font-size:25px;font-weight:400;color:rgba(34,34,34,1);">
                                         {{RH2}}%
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="monitoring_show">
                     <div class="monitoring_operation" style="height: 30px;">
                         系统设定
                     </div>
                     <div class="set_monitoring" style="margin-top: 20px">
                     <div class="set_monitoring_left">
                         1号除湿机
                         <a-switch  style="margin-left: 10px" @change="onChange" checked-children="开" un-checked-children="关" default-un-checked />
                     </div>
                     <div class="set_monitoring_right">
                         温度设定:
                         <input type="text" placeholder="请设置温度">
                         <span>℃</span>
                         <a-button type="primary" style="margin-left: 2%">
                             确认
                         </a-button>
                     </div>
                     </div>
                     <div class="set_monitoring" style="margin-top: 10px">
                         <div class="set_monitoring_left">
                             2号除湿机
                             <a-switch  style="margin-left: 10px" @change="onChange1" checked-children="开" un-checked-children="关" default-un-checked />
                         </div>
                         <div class="set_monitoring_right">
                             湿度设定:
                             <input type="text" placeholder="请设置湿度">
                             <span>%</span>
                             <a-button type="primary" style="margin-left: 2.5%">
                                 确认
                             </a-button>
                         </div>
                     </div>
<!--                     <div class="set_monitoring">-->
<!--                         温度设定:-->
<!--                         <input type="text" placeholder="请设置温度">-->
<!--                         <span>℃</span>-->
<!--                         <a-button type="primary" style="margin-left: 2%">-->
<!--                             确认-->
<!--                         </a-button>-->
<!--                     </div>-->
<!--                     <div class="set_monitoring" style="margin-top: 5px">-->
<!--                         湿度设定:-->
<!--                         <input type="text" placeholder="请设置湿度">-->
<!--                         <span style="margin-left: 0.5%">%</span>-->
<!--                         <a-button type="primary" style="margin-left: 2%">-->
<!--                             确认-->
<!--                         </a-button>-->
<!--                     </div>-->
                 </div>
             </div>
             <div class="monitoring_exhibition">
<!--              <div class="monitoring_exhibition_left">-->
<!--                  <div style="text-align: center;margin-left: 30px" v-for="(item, key) in 3" :key="key"-->
<!--                       :class="{'pitch' :leftColorDisplay ===key}" @click="leftIndex(key)"-->
<!--                  >-->
<!--                      <img src="../assets/warehouse.png" alt="#" style="margin-top: -7px;margin-right: 2px">-->
<!--                      库房{{key+1}}-->
<!--                  </div>-->
<!--&lt;!&ndash;                  <div style="margin-top: 20px;margin-left: 30px"></div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div style="margin-top: 20px;margin-left: 30px"></div>&ndash;&gt;-->
<!--              </div>-->
              <div class="monitoring_exhibition_right">
                  <div class="map_left">
                      <div class="painting" style="top: 120px;">
                          <img src="../assets/painting.png" alt="#" @click="show1 = !show1,title1=!title1">
                          <div style="padding-top: 21px" v-show="title1">1 - 1</div>
                        <div>
                            <div v-show="show1" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                            <div>
                                1 - 1
                            </div>
                               <div>
                                   温度：{{monitoring[0].temperature}}℃
                               </div>
                               <div>
                                   湿度：{{monitoring[0].humidity}} %
                               </div>
                               <div style="padding-bottom: 10px">
                                   电压：{{monitoring[0].voltage}}  V
                               </div>
                           </div>
                        </div>
                      </div>
                      <div class="painting" style="top: 475px;">
                          <img src="../assets/painting.png" alt="#" @click="show4 = !show4,title4=!title4">
                          <div style="padding-top: 21px" v-show="title4">1 - 2</div>
                          <div>
                              <div v-show="show4" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  1 - 2
                              </div>
                                <div>
                                    温度：{{monitoring[1].temperature}}℃
                                </div>
                                <div>
                                    湿度：{{monitoring[1].humidity}} %
                                </div>
                                <div style="padding-bottom: 10px">
                                    电压：{{monitoring[1].voltage}}  V
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="map_left" style="width: 8%;">
                      <div class="painting" style="top: 160px;">
                          <img src="../assets/painting.png" alt="#" @click="show2 = !show2,title2=!title2">
                          <div style="padding-top: 21px" v-show="title2">1 - 3</div>
                          <div>
                              <div v-show="show2" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  1 - 3
                              </div>
                                 <div>
                                     温度：{{monitoring[2].temperature}}℃
                                 </div>
                                 <div>
                                     湿度：{{monitoring[2].humidity}} %
                                 </div>
                                 <div style="padding-bottom: 10px">
                                     电压：{{monitoring[2].voltage}}  V
                                 </div>
                             </div>
                          </div>
                      </div>
                      <div class="painting" style="top: 425px;">
                          <img src="../assets/painting.png" alt="#" @click="show3 = !show3,title3=!title3">
                          <div style="padding-top: 21px" v-show="title3">1 - 4</div>
                          <div>
                              <div v-show="show3" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  1 - 4
                              </div>
                                <div>
                                    温度：{{monitoring[3].temperature}}℃
                                </div>
                                <div>
                                    湿度：{{monitoring[3].humidity}} %
                                </div>
                                <div style="padding-bottom: 10px">
                                    电压：{{monitoring[3].voltage}}  V
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="map_middle">
                      <div class="map_left" style="width: 12.5%;">
                          <div class="painting" style="top: 200px;">
                              <img src="../assets/painting.png" alt="#" @click="show5 = !show5,title5=!title5">
                              <div style="padding-top: 21px" v-show="title5">2 - 5</div>
                              <div>
                                  <div v-show="show5" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                                  <div>
                                      2 - 5
                                  </div>
                                      <div>
                                          温度：{{monitoring[4].temperature}}℃
                                      </div>
                                      <div>
                                          湿度：{{monitoring[4].humidity}} %
                                      </div>
                                      <div style="padding-bottom: 10px">
                                          电压：{{monitoring[4].voltage}}  V
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="painting" style="top: 334px;">
                              <img src="../assets/painting.png" alt="#" @click="show8 = !show8,title8=!title8">
                              <div style="padding-top: 21px" v-show="title8">2 - 6</div>
                              <div>
                                  <div v-show="show8" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                                  <div>
                                      2 - 6
                                  </div>
                                    <div>
                                        温度：{{monitoring[5].temperature}}℃
                                    </div>
                                    <div>
                                        湿度：{{monitoring[5].humidity}} %
                                    </div>
                                    <div style="padding-bottom: 10px">
                                        电压：{{monitoring[5].voltage}}  V
                                    </div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div class="map_left" style="width: 12.5%;margin-left: 71%">
                          <div class="painting" style="top: 200px;">
                              <img src="../assets/painting.png" alt="#" @click="show6 = !show6,title6=!title6">
                              <div style="padding-top: 21px" v-show="title6">2 - 7</div>
                              <div>
                                  <div v-show="show6" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                                  <div>
                                      2 - 7
                                  </div>
                                     <div>
                                         温度：{{monitoring[6].temperature}}℃
                                     </div>
                                     <div>
                                         湿度：{{monitoring[6].humidity}} %
                                     </div>
                                     <div style="padding-bottom: 10px">
                                         电压：{{monitoring[6].voltage}}  V
                                     </div>
                                 </div>
                              </div>
                          </div>
                          <div class="painting" style="top: 334px;">
                              <img src="../assets/painting.png" alt="#" @click="show7 = !show7,title7=!title7">
                              <div style="padding-top: 21px" v-show="title7">2 - 8</div>
                              <div>
                                  <div v-show="show7" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                                  <div>
                                      2 - 8
                                  </div>
                                     <div>
                                         温度：{{monitoring[7].temperature}}℃
                                     </div>
                                     <div>
                                         湿度：{{monitoring[7].humidity}} %
                                     </div>
                                     <div style="padding-bottom: 10px">
                                         电压：{{monitoring[7].voltage}}  V
                                     </div>
                                 </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="map_left" style="width: 8%;">
                      <div class="painting" style="top: 160px;margin-left: 4%">
                          <img src="../assets/painting.png" alt="#" @click="show9 = !show9,title9=!title9">
                          <div style="padding-top: 21px" v-show="title9">3 - 9</div>
                          <div>
                              <div v-show="show9" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  3 - 9
                              </div>
                                <div>
                                    温度：{{monitoring[8].temperature}}℃
                                </div>
                                <div>
                                    湿度：{{monitoring[8].humidity}} %
                                </div>
                                <div style="padding-bottom: 10px">
                                    电压：{{monitoring[8].voltage}}  V
                                </div>
                            </div>
                          </div>
                      </div>
                      <div class="painting" style="top: 420px;">
                          <img src="../assets/painting.png" alt="#" @click="show12 = !show12,title12=!title12">
                          <div style="padding-top: 21px" v-show="title12">3 - 10</div>
                          <div>
                              <div v-show="show12" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  3 - 10
                              </div>
                                <div>
                                    温度：{{monitoring[9].temperature}}℃
                                </div>
                                <div>
                                    湿度：{{monitoring[9].humidity}} %
                                </div>
                                <div style="padding-bottom: 10px">
                                    电压：{{monitoring[9].voltage}}  V
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="map_left" style="width: 8%;">
                      <div class="painting" style="top: 120px;margin-left: 7%">
                          <img src="../assets/painting.png" alt="#" @click="show10 = !show10,title10=!title10">
                          <div style="padding-top: 21px" v-show="title10">3 - 11</div>
                          <div>
                              <div v-show="show10" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  3 - 11
                              </div>
                                <div>
                                    温度：{{monitoring[10].temperature}}℃
                                </div>
                                <div>
                                    湿度：{{monitoring[10].humidity}} %
                                </div>
                                <div style="padding-bottom: 10px">
                                    电压：{{monitoring[10].voltage}}  V
                                </div>
                            </div>
                          </div>
                      </div>
                      <div class="painting" style="top: 475px;">
                          <img src="../assets/painting.png" alt="#" @click="show11 = !show11,title11=!title11">
                          <div style="padding-top: 21px" v-show="title11">3 - 12</div>
                          <div>
                              <div v-show="show11" style="padding-top: 21px;background:rgba(255,255,255,.5); border-radius:4px;">
                              <div>
                                  3 - 12
                              </div>
                               <div>
                                   温度：{{monitoring[11].temperature}}℃
                               </div>
                               <div>
                                   湿度：{{monitoring[11].humidity}} %
                               </div>
                               <div style="padding-bottom: 10px">
                                   电压：{{monitoring[11].voltage}}  V
                               </div>
                           </div>
                          </div>
                      </div>
                  </div>
              </div>
             </div>
         </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "monitoring",
        data () {
            return {
                leftColorDisplay1: 0,
                monitoring: '',
                timer1: null,
                // 点击显示隐藏
                show1: false,
                title1: true,
                show2: false,
                title2: true,
                show3: false,
                title3: true,
                show4: false,
                title4: true,
                show5: false,
                title5: true,
                show6: false,
                title6: true,
                show7: false,
                title7: true,
                show8: false,
                title8: true,
                show9: false,
                title9: true,
                show10: false,
                title10: true,
                show11: false,
                title11: true,
                show12: false,
                title12: true,
                // 1号除湿机
                oneDehumidifier: true,
                operationimg1: true,
                operationimg2: false,
                malfunctionimg1: true,
                malfunctionimg2: false,
                stopimg1: true,
                stopimg2: false,
                // 温度
                RT1:'',
                // 湿度
                RH1:'',
                // 2号除湿机
                twoDehumidifier: false,
                ToneDehumidifier: true,
                Toperationimg1: true,
                Toperationimg2: false,
                Tmalfunctionimg1: true,
                Tmalfunctionimg2: false,
                Tstopimg1: true,
                Tstopimg2: false,
                // 温度
                RT2:'',
                // 湿度
                RH2:'',

                websock: null,//建立的连接
                lockReconnect: false,//是否真正建立连接
                timeout: 28*1000,//30秒一次心跳
                timeoutObj: null,//心跳心跳倒计时
                serverTimeoutObj: null,//心跳倒计时
                timeoutnum: null,//断开 重连倒计时
                A: ''
            }
        },
        created() {
            this.initWebSocket();
        },
        mounted() {
            this.$api.monitoring().then(data => {
                this.monitoring = data.data
            })
                .catch(error => {
                    console.log(error);
                })
            clearInterval(this.timer1)
            this.timer()
        },
        methods: {
            onChange(checked) {
                if (checked === true) {
                    this.operationimg1 = false
                    this.operationimg2 = true
                    this.stopimg1 = true
                    this.stopimg2 = false
                } else {
                    this.stopimg1 = false
                    this.stopimg2 = true
                    this.operationimg1 = true
                    this.operationimg2 = false
                }
            },
            onChange1(checked) {
                if (checked === true) {
                    this.Toperationimg1 = false
                    this.Toperationimg2 = true
                    this.Tstopimg1 = true
                    this.Tstopimg2 = false
                } else {
                    this.Tstopimg1 = false
                    this.Tstopimg2 = true
                    this.Toperationimg1 = true
                    this.Toperationimg2 = false
                }
            },
            timer () {
                let that = this
            this.timer1 = setInterval(function () {
                  that.$api.monitoring().then(data => {
                      that.monitoring = data.data
                  })
                      .catch(error => {
                          console.log(error);
                      })
              }, 1000*60)
            },
            leftIndex1 (key) {
                this.leftColorDisplay1 = key
                if (key === 0) {
                    this.oneDehumidifier = true
                    this.twoDehumidifier = false
                } else {
                    this.twoDehumidifier = true
                    this.oneDehumidifier = false
                }
            },

            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://139.224.190.233:8701/ws/shdjy";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            reconnect() {//重新连接
                var that = this;
                if(that.lockReconnect) {
                    return;
                }
                that.lockReconnect = true;
                //没连接上会一直重连，设置延迟避免请求过多
                that.timeoutnum && clearTimeout(that.timeoutnum);
                that.timeoutnum = setTimeout(function () {
                    //新连接
                    that.initWebSocket();
                    that.lockReconnect = false;
                },5000);
            },
            reset(){//重置心跳
                var that = this;
                //清除时间
                clearTimeout(that.timeoutObj);
                clearTimeout(that.serverTimeoutObj);
                //重启心跳
                that.start();
            },
            start(){//开启心跳
                var self = this;
                self.timeoutObj && clearTimeout(self.timeoutObj);
                self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
                self.timeoutObj = setTimeout(function(){
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    if (self.websock.readyState === 1) {//如果连接正常
                        self.websock.send("heartCheck");
                        self.reset()
                    }else{//否则重连
                        self.reconnect();
                    }
                    self.serverTimeoutObj = setTimeout(function() {
                        //超时关闭
                        self.websock.close();
                    }, self.timeout);

                }, self.timeout)
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                console.log("llws连接成功!"+new Date().toLocaleString());
                this.start()
            },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
                this.reconnect();
            },
            websocketonmessage(e){ //数据接收
                console.log(JSON.parse(e.data))
                JSON.parse(e.data).forEach(v => {
                    console.log(v);
                    if (v.dev === 'Dev_10') {
                        v.d.forEach(v1 => {
                            // 温度
                            if (v1.m === 'RT') {
                                this.RT1 = v1.v
                            } else if (v1.m === 'RH') {
                                // 湿度
                                this.RH1 = v1.v
                            } else if (v1.m === 'Dev_On' && v1.v === 1) {
                                // 运行
                                this.operationimg1 = false
                                this.operationimg2 = true
                                this.stopimg1 = true
                                this.stopimg2 = false
                                this.malfunctionimg1 = true
                                this.malfunctionimg2 = false

                            } else if (v1.m === 'Alarm' && v1.v === 1) {
                                // 报警
                                this.malfunctionimg1 = false
                                this.malfunctionimg2 = true
                            } else if (v1.m === 'Dev_Off' && v1.v === 1) {
                                // 停止
                                this.stopimg1 = false
                                this.stopimg2 = true
                                this.operationimg1 = true
                                this.operationimg2 = false
                            }
                        })
                    } else {
                        v.d.forEach(v1 => {
                            // 温度
                            if (v1.m === 'RT') {
                                this.RT2 = v1.v
                            } else if (v1.m === 'RH') {
                                // 湿度
                                this.RH2 = v1.v
                            } else if (v1.m === 'Dev_On' && v1.v === 1) {
                                // 运行
                                this.Toperationimg1 = false
                                this.Toperationimg2 = true
                                this.Tstopimg1 = true
                                this.Tstopimg2 = false
                                this.Tmalfunctionimg1 = true
                                this.Tmalfunctionimg2 = false
                            } else if (v1.m === 'Alarm' && v1.v === 1) {
                                // 报警
                                this.Tmalfunctionimg1 = false
                                this.Tmalfunctionimg2 = true
                            }
                            else if (v1.m === 'Dev_Off' && v1.v === 1) {
                                // 停止
                                this.Tstopimg1 = false
                                this.Tstopimg2 = true
                                this.Toperationimg1 = true
                                this.Toperationimg2 = false
                            }
                        })
                    }
                })
                this.reset();
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                this.reconnect();
            }
        }
    }
</script>

<style scoped lang="scss">
    .monitoring_content{
        width: 85.5%;
        height: 960px;
        .monitoring_data{
            width: 94%;
            height: 248px;
            margin-left: 3%;
            display: flex;
            .monitoring_state{
                width: 32%;
                min-height: 180px;
                margin-top: 24px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(204,204,204,0.26);
                border-radius:4px;
                .monitoring_operation{
                    width: 50%;
                    height: 50px;
                    margin-left: 36px;
                    margin-top: 18px;
                    box-shadow:0px 2px 5px 0px rgba(204,204,204,0.26);
                    border-radius:4px;
                    display: flex;
                .monitoring_operation1{
                    width: 50%;
                    height: 50px;
                    background: #CCCCCC;
                    text-align: center;
                    line-height: 50px;
                    font-size:18px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                }
                }
            }
            .monitoring_show{
                width: 32%;
                /*min-height: 180px;*/
                margin-left: 2%;
                margin-top: 24px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(204,204,204,0.26);
                border-radius:4px;
                .monitoring_operation{
                    width: 50%;
                    height: 50px;
                    margin-left: 36px;
                    margin-top: 18px;
                    font-size:18px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                }
                .set_monitoring{
                    width: 100%;
                    min-height: 30px;
                    line-height: 30px;
                    padding-left: 36px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #222222;
                    display: flex;
                    .set_monitoring_left{
                        width: 35%;
                        min-height: 30px;
                    }
                    .set_monitoring_right{
                        width: 65%;
                        min-height: 30px;
                    }
                    input{
                        outline-style: none ;
                        border: 1px solid #ccc;
                        border-radius: 3px;
                        padding: 13px 14px;
                        width: 40%;
                        height: 30px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    input:focus{
                        border-color: #66afe9;
                        outline: 0;
                        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
                        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
                    }
                }
            }
        }
        .monitoring_exhibition{
            width: 94%;
            height: 756px;
            margin-left: 3%;
            display: flex;
            .monitoring_exhibition_left{
                width: 13%;
                height: 756px;
                div{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 6px 0px rgba(13,14,15,0.2);
                    border-radius:25px 0 0 25px;
                    font-size:18px;
                    font-weight:400;
                    transition:margin-left 0.5s;
                }
            }
            .monitoring_exhibition_right{
                width: 100%;
                height: 756px;
                box-shadow:0px 5px 9px 0px rgba(211,221,240,0.28);
                border-radius:4px;
                background: url("../assets/bg-2.png") no-repeat center;
                background-size: 101% 100%;
                display: flex;
                margin-top: 20px;
                .map_left{
                    width: 9%;
                    height: 756px;
                    background: transparent;
                    .painting{
                        width: 96%;
                        margin-left: 2%;
                        min-height: 110px;
                        border-radius:4px;
                        position: relative;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(33,118,255,1);
                        img{
                            position: absolute;
                            left: 40%;
                            top: -10px;
                        }
                        div{
                            text-align: center;
                        }
                    }
                }
                .map_middle{
                    width: 66%;
                    height:756px;
                    display: flex;
                    .map_left{
                        width: 12%;
                        height: 756px;
                        margin-left: 2.5%;
                        background: transparent;
                        .painting{
                            width: 96%;
                            margin-left: 2%;
                            min-height: 120px;
                            border-radius:4px;
                            position: relative;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(33,118,255,1);
                            img{
                                position: absolute;
                                left: 40%;
                                top: -10px;
                            }
                            div{
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
    /*公共样式*/
    .monitoring_exhibition_left{
        div:nth-child(1){margin-top: 5px !important;}
        div:nth-child(2){margin-top: 15px !important;}
        div:nth-child(3){margin-top: 15px !important;}
    }
    .monitoring_state_show{
        width: 90%;
        margin-left: 7%;
        height: 112px;
        display: flex;
        line-height: 112px;
        font-weight:400;
        .temperature{
            width: 50%;
            height: 112px;
        }
    }
    .pitch{
        color: #2176FF;
        font-weight: 400;
        margin-left: 0 !important;
        img{
            content: url(../assets/warehouse-select.png);
        }
    }
    .pitch1{
        background: #2176FF !important;
        color: #fff !important;
    }

</style>