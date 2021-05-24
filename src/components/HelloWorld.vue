<template>
  <div id="WindowContainer" ref="WindowContainer" class="DragParent">
    <template v-for="(win,idx) in windows">
      <component :is="win.instance" :info="win.props" v-bind:key="idx"></component>
    </template>
    <!--
    <div id="Window1" class="MyWindow" style="left: 100px; top: 200px">
      <v-system-bar dark color="blue">
        <v-spacer></v-spacer>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
      <v-btn @click="onLoadWindow">Press me</v-btn>
      <v-btn icon>
        <v-icon>mdi-battery</v-icon>
      </v-btn>
    </div>
    <TestWin2/>
    <component :is="win2"></component>
    -->
  </div>
</template>

<style>
.DragParent {
  position: absolute;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
}
.MyWindow {
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: #0ef;
}
.theme--light.v-sheet.MyWindow {
  position: absolute;
  width: 300px;
  height: 500px;
  background-color: #0ef;
}
</style>

<script>
// import Vue from 'vue'
import interact from 'interactjs'
const TestWindow = () => import ('./TestWindow.vue')
const TestWin2 = () => import ('./TestWin2.vue')

const GRID_SIZEPX = 20

  export default {
    name: 'HelloWorld',
    components: {
    },
    data: () => ({
      windows: [],
      win: TestWindow,
      win2: TestWin2,
      ShowWin: false,
    }),
    mounted() {
      // let WinClass = Vue.extend(TestWindow)
      // let instance = new WinClass({})
      // instance.$mount()
      
      // this.$refs.WindowContainer.appendChild(instance.$el)
      this.initDraggableWindows()
      this.appendWindow(TestWindow)
    },
    methods: {
      setWindowId(index, id) {
        this.windows[index].id = id
      },
      appendWindow(WinComponent) {
        const NewWindowIndex = this.windows.length
        this.windows.push({
          instance: WinComponent,
          id: null,
          props: {
            index: NewWindowIndex,
            zIndex: 10,
            ParentApi: {
              test: this.test,
              closeWindow: this.closeWindow,
              isTopWindow: this.isTopWindow,
              setWindowId: this.setWindowId,
            }
          }
        })

        this.isTopWindow(NewWindowIndex)
      },
      getIndexByWindowId(WinId) {
        for (let i = 0; i < this.windows.length; i++) {
          const win = this.windows[i]
          console.log(win.instance)
          if (win.id === WinId) {
            return i
          }
        }
        return -1
      },
      isTopWindow(idx) {
        // set window z-index
        // reset other window z-index
        this.windows.forEach((win, index) => {
          console.log(`Setting top window for index ${idx}`)
          if (index === idx) {
            win.props.zIndex = 10
          } else {
            win.props.zIndex = 1
          }
        })
      },
      closeWindow(idx) {
        this.windows.splice(idx,1)
        // renumber indexes in the windows
        this.windows.forEach((win,index) => {
          win.props.index = index
        })
      },  
      test() {
        this.appendWindow(TestWin2)
      },
      initDraggableWindows() {
        const self = this
        let grid = interact.snappers.grid({
          x: GRID_SIZEPX,
          y: GRID_SIZEPX,
        })

        interact('.MyWindow').draggable({
          // startAxis: 'xy',
          // lockAxis: 'start',
          modifiers: [
            interact.modifiers.snap({
              targets: [grid],
              relativePoints: [{ x: 0, y: 0}],
            }),
          ],
          listeners: {
            start(evt) {
              console.log(evt.target.id, evt.type, evt.target)
              let WinIndex = self.getIndexByWindowId(evt.target.id)
              if (WinIndex > -1) {
                self.isTopWindow(WinIndex)
              }
            },
            move(evt) {
              let tgt = document.getElementById(evt.target.id)
              let parent = document.getElementById('WindowContainer')
              let MaxLeft = parent.offsetWidth - tgt.offsetWidth
              let MaxTop = parent.offsetHeight - tgt.offsetHeight

              let NewTop = parseInt(tgt.style.top) + evt.dy
              if (NewTop > MaxTop ) {
                tgt.style.top = Math.floor(MaxTop / GRID_SIZEPX) * GRID_SIZEPX + 'px'
              } else if (NewTop > -1 && NewTop < MaxTop) {
                // console.log(`NewTop: ${NewTop}, MaxTop: ${MaxTop}`)
                tgt.style.top = NewTop + 'px'
              } 

              let NewLeft = parseInt(tgt.style.left) + evt.dx
              if (NewLeft > MaxLeft) {
                tgt.style.left = Math.floor(MaxLeft / GRID_SIZEPX) * GRID_SIZEPX + 'px'
              } else if (NewLeft > -1 && NewLeft < MaxLeft) {
                tgt.style.left = `${NewLeft}px`
              }
            },
          }
        }).resizable({
          edges: {
            top: false,
            left: false,
            bottom: true,
            right: true,
          },
          modifiers: [
            interact.modifiers.snap({
              targets: [grid],
              relativePoints: [{ x: 0, y: 0}],
            }),
          ],
          listeners: {
            move(evt) {
              let tgt = document.getElementById(evt.target.id)
              tgt.style.width = `${evt.rect.width}px`
              tgt.style.height = `${evt.rect.height}px`
              // console.log(`width: ${evt.rect.width}`)            
            },
          }
        })
      },
      onLoadWindow() {
        this.ShowWin = true
      }
    }
  }
</script>
