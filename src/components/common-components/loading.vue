<template>
  <div v-if="flag" class="loading-wrapper">
    <div class='uil-default-css' style='transform:scale(0.3);-webkit-transform:scale(0.3);'>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      <div
        style='top:80px;left:50%;margin-left:-7px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    </div>
  </div>
</template>

<script>

  export default {
        data () {
            return {}
        },
        props:{
            flag:{
                type:Boolean
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  /*上拉刷新等待*/
  .loading-wrapper {
    position: absolute;
    left: 0;
    bottom: .5rem;
    width: 100%;
  }

  @-webkit-keyframes uil-default-anim {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  @keyframes uil-default-anim {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  .uil-default-css {
    position: relative;
    background: none;
    width: 100%;
    height: 100px;

  }

  .uil-default-css > div:nth-of-type(1) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .uil-default-css > div:nth-of-type(2) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.4166666666666667s;
    animation-delay: -0.4166666666666667s;
  }

  .uil-default-css > div:nth-of-type(3) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.33333333333333337s;
    animation-delay: -0.33333333333333337s;
  }

  .uil-default-css > div:nth-of-type(4) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
  }

  .uil-default-css > div:nth-of-type(5) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.16666666666666669s;
    animation-delay: -0.16666666666666669s;
  }

  .uil-default-css > div:nth-of-type(6) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.08333333333333331s;
    animation-delay: -0.08333333333333331s;
  }

  .uil-default-css > div:nth-of-type(7) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .uil-default-css > div:nth-of-type(8) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.08333333333333337s;
    animation-delay: 0.08333333333333337s;
  }

  .uil-default-css > div:nth-of-type(9) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.16666666666666663s;
    animation-delay: 0.16666666666666663s;
  }

  .uil-default-css > div:nth-of-type(10) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }

  .uil-default-css > div:nth-of-type(11) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.33333333333333337s;
    animation-delay: 0.33333333333333337s;
  }

  .uil-default-css > div:nth-of-type(12) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.41666666666666663s;
    animation-delay: 0.41666666666666663s;
  }

</style>
