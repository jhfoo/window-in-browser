export default {
  methods: {
    closeWindow() {
      this.info.ParentApi.closeWindow(this.info.index)
    },
    isTopWindow() {
      this.info.ParentApi.isTopWindow(this.info.index)
    }
  }
}