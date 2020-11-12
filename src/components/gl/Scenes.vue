<template>
  <div class="flex-col">
    <span
      v-for="(scene, key) in scenesData"
      :key="key"
      :data-sceneName="`${scene.name}`"
    ></span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Scenes } from '@/models'

  import { multipleScenes } from '@/gl/MultipleScenes'

  @Component
  export default class SvgComponent extends Vue {
    @Prop()
    public scenesData!: Scenes[]

    mounted() {
      document.querySelectorAll('[data-sceneName]').forEach(elem => {
        multipleScenes.init(elem)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
