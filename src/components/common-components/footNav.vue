<template>
  <div ref="footNav" class="footNav">
    <router-link to="/home" class="home footNavItem"><i class="fa fa-home" aria-hidden="true"></i>首页</router-link>
    <router-link to="/invest" class="invest footNavItem"><i class="fa fa-bank" aria-hidden="true"></i>投资</router-link>
    <a class="user footNavItem" :class="{active:active=='active'}" v-tap="{methods:checkInfo}"><i class="fa fa-user-o" aria-hidden="true" ></i>我的</a>
  </div>
</template>

<script>
    export default {
        data () {
            return {
            userId:null,
            }
        },
        mounted() {
          this.userId = this.$cookie.get('userId');
          let footOffetTop = this.$refs.footNav.offsetTop;
          // this.$emit('footNavHeight',footOffetTop);

        },
        props: {
          
          active:String,
        },
        methods: {
          checkInfo() {
            console.log(this.userId);

            if(this.userId && this.userId !=''){
              // 
              this.$router.push('/user');
            }else{
              this.$router.push({path:"/login",query:{topage:"user"}});
            }
          },
        }


    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  .footNav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.30666667rem;
  background-color: #fff;
  display: flex;
  z-index: 100;
  .footNavItem{
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    i{
      height: .53333333rem;
      line-height: .53333333rem;
      &.fa-home{
        font-size: .4rem;
      }
    }
    &.home{
      &.active{
        color: @color;
       }
    }
    &.invest{
      &.active{
        color: @color;
      }
    }
    &.user{
      &.active{
        color: @color;
      }
    }
  }
}

</style>
