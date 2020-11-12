<template>
  <div class="flex-col">
    <span
      v-for="(scene, key) in scenesData"
      :key="key"
      :data-scene-name="`${scene.name}`"
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
      setTimeout(() => {
        document.querySelectorAll('[data-scene-name]').forEach(elem => {
          multipleScenes.init(elem)
        })
      }, 0)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
