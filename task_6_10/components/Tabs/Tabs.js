// components/Tabs.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    tabs: {
      type: Array, //判断数据类型
      value: [] //默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {


  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      // console.log(e);
      console.log(e.currentTarget.dataset);
      let {
        index
      } = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange", {
        index
      })
    }
  }
})