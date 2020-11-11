<template>
  <div class="flex-col">
    <SvgObject :path="paper" /><canvas id="logo"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  import { WaveMotion } from '@/gl/WaveMotion'

  import { load } from '@/services/Svg'

  import SvgObject from './gl/SvgObject.vue'

  @Component({ components: { SvgObject } })
  export default class Home extends Vue {
    public paper: string = '/logo/paper.svg'

    mounted() {
      // var wave = new WaveMotion()
      // wave.init()
      // wave.run()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
