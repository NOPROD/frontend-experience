<template>
  <div class="home"><Main /></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Main from '@/components/Main.vue'
  @Component({
    components: {
      Main
    }
  })
  export default class Home extends Vue {}
</script>
