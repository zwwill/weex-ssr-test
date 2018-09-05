<template>
  <div class="wrapper" id="app">
    <!--<image :src="logo" class="logo" />-->
    <text class="greeting">The environment is ready!</text>
    <HelloWorld/>
    <div ref="test" @click="move" class="box">
      <text>click</text>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
let modal, animation;

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    }
  },
    mounted(){
        modal = weex.requireModule('modal')
        animation = weex.requireModule('animation')

        modal.toast({
            message: 'This is a toast',
            duration: 2
        })
    },
    methods: {
        move () {
            var testEl = this.$refs.test;
            animation.transition(testEl, {
                styles: {
                    backgroundColor: '#FF0000',
                    transform: 'translate(0px, 100px) scale(2)',
                    transformOrigin: 'center center'
                },
                duration: 800, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            }, function () {
                modal.toast({ message: 'animation finished.' })
            })
        }
    }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
  }

  .box {
    width: 50px;
    height: 50px;
    background-color: #DDD;
  }
</style>
