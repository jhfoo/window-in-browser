<template>
  <KfWindow :WinId="WindowId" :info="info">
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
  </KfWindow>
</template>

<style scoped>
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
import KfWindow from './KfWindow'

  export default {
    name: 'TestWin2',
    components: {
      KfWindow,
    },
    props: ['info'],
    data: () => ({
      WindowId: 'TestWin2',
    }),
    mounted() {
      this.info.ParentApi.setWindowId(this.info.index, this.WindowId)
    }
  }
</script>
