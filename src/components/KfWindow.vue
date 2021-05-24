<template>
  <v-card :id="WindowId" class="MyWindow window" style="left: 100px; top: 200px; ">
    <v-system-bar dark color="black">
      <v-icon @click="onCloseWindow">mdi-close</v-icon>
      <span>[{{this.info.index}}] {{this.WinId}}</span>
      <v-spacer></v-spacer>
    </v-system-bar>
    <slot/>
  </v-card>
</template>

<style scoped>
  .window {
    display: flex; 
    flex-direction: column;
  }
  .ContentWrapper {
    display: flex;
    overflow: hidden;
    flex: 1 1 auto;
  }
  .content {
    overflow: scroll;
    width: 100%;
  }
</style>

<script>
import WindowMixin from '../mixins/WindowMixin'

  export default {
    name: 'KfWindow',
    props: ['info', 'WinId'],
    mixins: [WindowMixin],
    data: () => ({
    }),
    mounted() {
      console.log(`props: ${JSON.stringify(this.info)}`)
      console.log(this.$el.style.zIndex = this.info.zIndex)
    },
    computed: {
      WindowId() {
        if (!this.WinId) {
          throw new Error('KfWindow: Missing prop WinId')
        }
        return this.WinId
      },
      zIndex() {
        return this.info.zIndex
      }
    },
    methods: {
      onTest() {
        this.info.ParentApi.test()
      },
      onCloseWindow() {
        console.log('onCloseWindow')
        this.closeWindow()
      }
    },
    watch: {
      zIndex(NewVal) {
        this.$el.style.zIndex = NewVal
      }
    }
  }
</script>
