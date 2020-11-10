<template>
  <div class="flex-col"><LgSvg :path="paper" /><canvas id="logo"></canvas></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  import { WaveMotion } from '@/gl/WaveMotion'

  import { load } from '@/services/Svg'

  import LgSvg from './gl/Svg'

  @Component({ components: { LgSvg } })
  export default class Home extends Vue {
    public paper: string = '/logo/paper.svg'

    mounted() {
      var wave = new WaveMotion()
      wave.init()
      wave.run()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
