<template>
<div id="user" class="stageScreen">
  <div class="userInner">
    <div v-if="vip" class="userHeader">
      <div class="moneyNum">{{totalMoney}}</div>
      <p>{{totalMoneyText}}</p>
    </div>
    <ul class="userCenterList">
      <li class="invite userCenterItem userItemLine" v-if="wxApp" v-tap="{methods:invitNew}">
        <p class="text">邀请新用户</p>
      </li>
      <router-link to="/user/performance" v-if="vip" class="performance userCenterItem userItemLine">
        <p class="text">规模绩效</p>
      </router-link>
      <li class="userCenterItem">
        <div class="logs  userItemLine" :class="logsStatus" v-tap="{methods:toggleList}">
          <p class="text">投资记录</p>
        </div>
        <div class="logsList" v-show="logsStatus == 'up'">
          <a  v-for="item in logsList" :data-id="item.plateId"  href="javascript:void(0)" class="logsItem" v-tap="{methods:logHandler,item:item.plateId,item2:item.plateStatus}">{{item.plateName}}</a>
        </div>
      </li>
      <li class="manage userCenterItem userItemLine">
        <p class="text" v-tap="{methods:ckeckDetail}">账户管理</p>
      </li>
      <li class="erweicode userCenterItem userItemLine">
        <p class="text" v-tap="{methods:toErwei}">我的二维码</p>
      </li>
      <li v-if="wxApp" class="addInviter userCenterItem userItemLine">
        <p class="text" v-tap="{methods:addInvited}">添加邀请人</p>
      </li>
      <li v-if="notApp" class="download userCenterItem userItemLine">
        <p class="text" v-tap="{methods:downLoadApp}">点击下载信金融APP</p>
      </li>
    </ul>
    <div class="logout" v-tap="{methods:logout}">退出</div>
    <div class="zhezhao" v-if="shareTo"></div>
    <div class="share-arrow" :class="{shareArrow2:toBrower}" v-if="shareTo"><div class="close" v-tap="{methods:closeFn}"></div></div>
  </div>
  
  <foot-nav :active="active"></foot-nav>
  <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
  <v-confirm :msg="msg" @sure="confirmSure" @cancle="closeWindow" v-if="openConfirm"></v-confirm>
</div>
</template>

<script>
"barcode_2d.png"
  import footNav from 'components/common-components/footNav';
  import alert2 from '../common-components/alert.vue'
  import confirm from '../common-components/confirm.vue'
  import axios from 'axios';
  import qs from 'qs';
  import {wxShare} from '../../common/js/wxShare';
  export default {
    data () {
        return {
          vip:false,
          logsStatus:"down",
          logsList:[],
          option:{},
          active:"active",
          msg:'敬请期待',
          openWindow: false,
          openConfirm: false,
          pathUrl:'',
          shareTo:false,
          signFlag:null,
          userId:null,
          totalMoney:null,
          islogout:true,
          notApp:false,
          toBrower:false,
          wxApp:false,
          wx:false,
        }
    },
    components:{
      footNav,
      'v-alert': alert2,
      'v-confirm': confirm,
    },
    created(){
      var that = this
      window.shareByApp = function(bool){
        that.openWindow = true;
        if(bool){
          that.msg = '分享成功';
          
        }else{
          that.msg = '分享失败，请重新登录';
          setTimeout(() => {
            that.$router.push({name:'login',params:{topage:'user'}})
          },1500)
        }
        // return that;
      }
      if(this.browVersions.weixin){
        this.wx=true;
      }
      if(!this.deviceN()){
        // 不是app
        if(this.browVersions.android){
          this.notApp = true;
        }
      }else{
        this.wxApp = true;
      }
      if(this.browVersions.weixin){
        this.wxApp = true;
      }
      console.log(this.browVersions);
      this.pathUrl = window.location.origin + window.location.pathname;
      // this.signFlag = this.$cookie.get('signFlag');
      this.userId = this.$cookie.get('userId');
      // this.totalMoney = this.$cookie.get('totalMoney');
      // this.totalMoneyText = this.$cookie.get('totalMoneyText');
      this._person()
      window.toShareUrl=function(){
        // that._person(() => {
          if(that.userId){
            // console.log(that.$router)
            // that.$router.push({name:'login',params:{topage:'user'}});
            return that.pathUrl+'?userInviterId=' + that.userId + '#/register';
          }
            // that.$router.push({name:'login',params:{topage:'user'}});
            location.href = window.location.origin + window.location.pathname+'#/login';
            // return null;
          
        // })
      }
      window.appGiveUrl=function(url){
        that.bindUserInvitedId(url);
      }
     // toShareUrl()
      /*获取列表*/
      axios.post('/x-service/user/plate.htm',qs.stringify({userId:this.userId})).then((res) => {
        let data = res.data;
        if (data.status == 0) {
           this.logsList = data.result;
        } else {
          // var that =this;
          // this.msg = data.errorMsg;
          // this.openWindow = true;
          // setTimeout(function(){
          //   that.$router.push({ name: 'login',query:{topage:'user'}})
          // },1500)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // mounted(){
    //   console.log(window.shareByApp());
    // },
    methods:{
      _person(cb) {
        axios.get('/x-service/user/person.htm',qs.stringify({
          userId: this.userId
        })).then((res) => {
          let data = res.data;
          let that =this;
          if (data.status == 0) {
            this.islogout=false;
            this.signFlag = data.result.signFlag
            this.totalMoney = data.result.totalMoney
            this.totalMoneyText = data.result.totalMoneyText
             /*微信分享*/
             if(this.signFlag == '00'){
               this.vip=true;
             }
             this.option.userInviterId = this.userId;
             if(cb&& typeof cb =="function"){
              cb.apply(this);
             }
            
          }else{
            this.$router.push({name:'login',params:{topage:'user'}})
          }
        }).catch((error) => {
          this.islogout = true;
          this.$router.push({name:'login',params:{topage:'user'}});
        })
      },
      downLoadApp() {
        if(this.browVersions.weixin || this.browVersions.weibo){
          this.shareTo = true;
          this.toBrower = true;
        }else if(this.browVersions.android){
            // 安卓
            clearTimeout(timer);
            var state = null;
            try {
              // timer=window.location = 'jmwiki://';  
              setTimeout(function(){  
                window.location = "/file/app/android/xinjinrong.apk";
        
              },25);
            } catch(e) {
              console.log(e);
            }
            
        }else if(this.browVersions.ios){
            // ios
            // 方案一
            clearTimeout(timer);
            var loadDateTime = new Date();
            var timer=window.setTimeout(function() {
              var timeOutDateTime = new Date();
              if (timeOutDateTime - loadDateTime < 5000) {
                // window.location = "https://itunes.apple.com/cn/app/%E7%9D%80%E8%BF%B7wiki-%E6%BA%90%E8%87%AA%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E5%85%B4%E8%B6%A3wiki%E7%A4%BE%E7%BE%A4%E5%B9%B3%E5%8F%B0/id1214161152?ls=1&mt=8";
                window.location = 'itms-apps%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2F%E4%BF%A1%E9%87%91%E8%9E%8D-%E6%8F%90%E4%BE%9B%E5%89%8D%E6%B2%BF-%E4%B8%93%E4%B8%9A-%E9%AB%98%E6%95%88%E7%9A%84%E7%BB%BC%E5%90%88%E9%87%91%E8%9E%8D%E6%9C%8D%E5%8A%A1%E4%BF%A1%E6%81%AF%E5%B9%B3%E5%8F%B0%2Fid1238561217%3Fl%3Dzh%26ls%3D1%26mt%3D8';
              } else {
                window.close();
              }
            },25);
        }
      },
      invitNew() {
        if(this.browVersions.weixin){
          this.share();
        }else{
          this.shareTo = true;
        }
      },
      addInvited() {
        var that =this;
        axios.post('/x-service/user/inviter.htm').then((res) => {
          let data = res.data;
          switch(data.status){
            case "1":
              // 失败
              this.msg = data.errorMsg;
              this.openWindow = true;
              break;
            case "0":
              // 已绑定
              this.msg = "您已绑定邀请人信息";
              this.openWindow = true;
              break;
            case "3":
              // 未绑邀请人信息
              console.log(this.browVersions)
              if(this.browVersions.weixin){
                // 微信中；
                this.share(() => {
                  console.log(12212);
                  if(wx.scanQRCode){
                    // alert('you');
                  }
                  wx.scanQRCode({
                     needResult: 1,
                     scanType: ["qrCode"],
                     // desc: '清扫描二位码',
                     success: function (res) {
                       //扫码后获取结果参数:htpp://xxx.com/c/
                      var url = res.resultStr;
                      that.bindUserInvitedId(url);
                    }
                   });
                })
              }else{
               // APP中
               if(typeof android4js !=='undefined'){

                 android4js.opencarema();
               }else{
                window.webkit.messageHandlers.ViewController.postMessage({methodName:'openCarema'});
               }
              }
              
              break;
            case "-1":
            // 未登录
              this.$router.push({name:'login',params:{topage:'user'}})
              break;
          }
            
          

        }).catch((error) =>{
          if(this.islogout){
            this.$router.push({name:'login',params:{topage:'user'}})
          }
        });
      },
      bindUserInvitedId(url) {
        let userInviterId = url.split('?')[1].split('#')[0].split('=')[1];
        if(userInviterId != ''){
          axios.post('/x-service/user/bind.htm',qs.stringify({
            userInviterId: userInviterId
          })).then((res) => {
            let data = res.data;
            switch(data.status){
              case "1":
                // 失败
                this.msg = data.errorMsg;
                this.openWindow = true;
                break;
              case "0":
                // 已绑定
                this.msg = "绑定成功";
                this.openWindow = true;
                break;
              case "-1":
                // 未登录
                this.$router.push({name:'login',params:{topage:'user'}})
                break;
            }  
          })
        }else{
          this.msg = "二维码错误，未找到邀请人信息";
          this.openWindow = true;
        }
      },
      closeFn() {
        this.shareTo = !this.shareTo;
        this.toBrower = false;
      },
      toggleList(){
        if(this.islogout){
          this.$router.push({name:'login',params:{topage:'user'}})
        }
        //this.logsList = this.logsList == "down" ? "down" : "up";
        if(this.logsStatus == 'down'){
          this.logsStatus = 'up'
        }else{
          this.logsStatus = 'down'
        }
      },
      share(cb){
        // console.log(window.location)
        if(this.islogout){
          this.$router.push({name:'login',params:{topage:'user'}})
          return;
        }
        axios.post('/x-service/user/share.htm',qs.stringify({
          signUrl: location.href.split('#')[0]
        })).then((res) => {
          let data = res.data,url;
          if (data.status == 0) {
             this.option.appId = data.result.appId;
             this.option.timestamp = data.result.timestamp;
             this.option.nonceStr = data.result.nonceStr;
             this.option.signature = data.result.signature;
             url = this.pathUrl+'?userInviterId=' + this.userId + '#/register';
             this.option.desc="点击邀请注册"
             wxShare(this.option,url);
             if(cb && typeof cb == 'function'){
               wx.ready(() =>{
                cb.apply(this);
               });
               return;
             }
             this.shareTo = true;
          } else if (data.status == 1) {
            // 失败
            this.msg = data.errorMsg
            this.openWindow = true;
          }else if (data.status == -1) {
            // 失败未登录
            this.islogout=true;
            this.msg = "登录超时，请重新登录";
            this.openWindow = true;
            setTimeout(() =>{
              this.$router.push({ name: 'login',params:{topage:'user'}})
            },1500)
          }

        }).catch(function (error) {
          this.msg = "登录超时，请重新登录";
          this.openWindow = true;
          setTimeout(() =>{
            this.$router.push({ name: 'login',params:{topage:'user'}})
          },1500)
        });
        
      },
      toErwei() {
        if(this.islogout){
          this.$router.push({name:'login',params:{topage:'user'}})
          return;
        }
        let pathUrl = this.pathUrl+'?userInviterId=' + this.userId + '#/register'
        
        this.$router.push({name:'erwei',params:{shareurl:pathUrl}})
      },
      logout(){
         
         this.openConfirm = true;
         this.msg = '确定要退出了吗？'
      },
      ckeckDetail() {
        axios.post('/x-service/user/info.htm',qs.stringify({userId:this.userId})).then((res) => {
          let data = res.data;
          if (data.status == 0) {
            this.$router.push({
              name:'account',
              params:data.result
            })
          } else if(data.status == -1){
            var that =this;
            this.msg = data.errorMsg;
            this.openWindow = true;
            setTimeout(function(){
              that.$router.push({ name: 'login',query:{topage:'user'}})
            },1500)
          }else if(data.status == 2){
            var that =this;
            this.msg = "未绑定用户信息，请绑定";
            this.openWindow = true;
            setTimeout(function(){
              that.$router.push({ name: 'registernext',params:{topage:'user'}})
            },1500)
          }
        }).catch((error) =>{
          if(this.islogout){
            this.$router.push({name:'login',params:{topage:'user'}})
          }
        });
      },
      closeWindow(bool) {
        this.openWindow = bool;
        this.openConfirm = bool; 

      },
      confirmSure() {
        this.openConfirm=false;
        axios.post('/x-service/user/logout.htm',qs.stringify({userId:this.userId})).then((res) => {
           let data = res.data;
           if (data.status == 0) {
             this.$cookie.delete('userId');
             this.$cookie.delete('signFlag');
             this.$cookie.delete('totalMoney');
             this.$cookie.delete('totalMoneyText');
             this.$router.push({ name: 'login',query:{topage:'user'}});
             console.log("退出")
           }
        })
        console.log(1)
      },
      logHandler(params){
        if(params.item2 != 0){
          axios.post('/x-service/user/record.htm',qs.stringify({
            userId: this.userId,
            plateId:params.item
          })).then((res) => {
            let data = res.data;
            if (data.status == 0) {
               window.location.href = data.result.allRedirectUrl
            } else {
              console.log(data.errorMsg)
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else{
          this.openWindow = true;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #user{
    .userInner{
      height: 100%;
      position: relative;
      overflow-y: auto; 
      .zhezhao{
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8)
      }
      .share-arrow{
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        top: 0;
        background: url(../../../static/img/tip_content_01.png) 65% 18% no-repeat;
        background-size: 80%;
        &.shareArrow2{
          background: url(../../common/img/tip_content_01.png) 65% 18% no-repeat;
          background-size: 80%;
        }
        .close{
          width: 2.906667rem;
          height: 1.453333rem;
          background: url(../../common/img/button.png) left top no-repeat;
          background-size: 100%;
          position: absolute;
          top: 45%;
          left: 50%;
          margin-left: -1.453333rem;

        }
      }
      .userHeader{
        display: flex;
        align-items:center;
        justify-content:center;
        flex-flow: column;
        height: 5.12rem/* 384px */;
        margin-bottom: .26666667rem;
        background-image:-webkit-linear-gradient(-64deg, #f1660f, #f19d2b); 
        // {background-image:linear-gradient(left top, red 100px, yellow 200px);}
        color: #fff;
        font-size:.26666667rem;
        .moneyNum{
          font-size: .8rem;
          line-height: .90666667rem;
        }
        p{
          color: #fff;
        }
      }
      .userCenterList{
        background-color: #fff;
        font-size: .32rem;
        padding:0 .4rem;
        .userCenterItem{
          border-bottom: .01333333rem solid @lineGrayColor;
          .logsList{
            padding-left: 1.02666667rem/* 77px */;
            .logsItem{
              color: #818181;
              border-bottom: none;
              height: .9333333rem;
              line-height: 0.933333rem;
            }
          }
        }
        .userItemLine{
          line-height: 1.38666667rem/* 104px */;
          padding-left:1.02666667rem;
          &:last-child{
             border-bottom:none;
           }
          &.invite{
            background: url("../../common/img/invite.png") left center no-repeat;
            background-size: .42666667rem .58666667rem/* 44px */;
           }
           &.performance{
              background: url("../../common/img/performance.png") left center no-repeat;
              background-size: .57333333rem .58666667rem;
            }
           &.logs{
             background: url("../../common/img/logs.png") left center no-repeat;
             background-size: .61333333rem .61333333rem;
             position:relative;
              &.down,&.up{
                &:after{
                   display:block;
                   content:"";
                   position:absolute;
                   width: 0;
                   height: 0;
                   top:50%;
                   right:0;

                 }
               }
              &.down{
                &:after{
                   border-top: .13333333rem solid #000;
                   border-left: .13333333rem solid transparent;
                   border-right: .13333333rem solid transparent;
                 }
               }
              &.up{
                &:after{
                   border-bottom: .13333333rem solid #000;
                   border-left: .13333333rem solid transparent;
                   border-right: .13333333rem solid transparent;
                 }
              }
           }
           &.manage{
             background: url("../../common/img/manage.png") left center no-repeat;
             background-size: .58666667rem .58666667rem;
           }
           &.erweicode{
             background: url("../../common/img/barcode_2d.jpg") left center no-repeat;
             background-size: .58666667rem .58666667rem;
           }
           &.download{
             background: url("../../common/img/download.png") left center no-repeat;
             background-size: .58666667rem .58666667rem;
           }
           &.addInviter{
             background: url("../../common/img/sao.png") .05333333rem center no-repeat;
             background-size: .49rem .49rem;
           }


        }

      }
      .logout{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: .32rem;
        text-align: center;
        background-color: #fff;
        margin: 1.5rem auto;
      }
    }
    
  }


</style>
