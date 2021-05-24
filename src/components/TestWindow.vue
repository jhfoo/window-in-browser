<template>
  <v-sheet :id="WindowId" class="MyWindow window" style="left: 100px; top: 200px; ">
    <v-system-bar dark color="blue">
      <v-icon @click="onCloseWindow">mdi-close</v-icon>
      <span>[{{this.info.index}}] TestWindow</span>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-toolbar dense flat color="blue" max-height="48">
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <div>
      <v-btn @click="onTest">Press me</v-btn>
      <v-btn icon><v-icon>mdi-battery</v-icon></v-btn>
    </div>
    <div class="ContentWrapper">
      <div class="content">
        first line<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        This is TestWindow<br/>
        last line<br/>
      </div>
    </div>
  </v-sheet>
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
    name: 'TestWindow',
    props: ['info'],
    mixins: [WindowMixin],
    data: () => ({
      WindowId: 'TestWindow',
    }),
    mounted() {
      console.log(`props: ${JSON.stringify(this.info)}`)
      console.log(this.info.zIndex)
      this.info.ParentApi.setWindowId(this.info.index, this.WindowId)
    },
    computed: {
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
      zIndex: function(NewVal) {
        this.$el.style.zIndex = NewVal
      }
    }
  }
</script>
