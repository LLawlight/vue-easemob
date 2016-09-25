<template lang="html">
  <div class="z-supernatant" v-show="show" transition="z-modal-expand">
    <div class="z-modal-wrapper">
      <div class="z-modal">
        <div class="z-modal-title">
          {{title}}
        </div>
        <div class="z-modal-content">
          {{content}}
        </div>
        <div class="z-modal-footer">
          <a class="z-btn-modal" @click="sureFunc">{{sure}}</a>
          <a class="z-btn-modal" @click="cancelFunc" v-if="type=='confirm'">{{cancel}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    sure: {
      type: String,
      default: "确定"
    },
    cancel: {
      type: String,
      default: "取消"
    },
    show: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    content: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "alert"
    },
    sureEvent: {
      type: Function,
      default: function() {
        console.log("点击了确定")
      }
    },
    cancelEvent: {
      type: Function,
      default: function() {
        console.log("点击了取消")
      }
    }
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    sureFunc: function() {
      this.show = false
      this.sureEvent()
    },
    cancelFunc: function() {
      this.show = false
      this.cancelEvent()
    }
  },
  components: {}
};
</script>

<style lang="css">
  .z-supernatant {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .z-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .z-modal {
    width: 300px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .z-modal-expand-enter, .z-modal-expand-leave {
    opacity: 0;
  }

  .z-modal-expand-enter .z-modal, .z-modal-expand-leave .z-modal {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  .z-modal-title {
    line-height: 44px;
    text-align: center;
  }

  .z-modal-content {
    padding: 0 12px 12px;
    text-align: left;
  }

  .z-modal-footer {
    border-top: 1px solid #ccc;
    display: table;
    width: 100%;
  }

  .z-btn-modal {
    display: table-cell;
    text-align: center;
    cursor: pointer;
    line-height: 44px;
  }

  .z-btn-modal:nth-child(2) {
    border-left: 1px solid #ccc;
  }

  .z-btn-modal:active {
    background-color: #ccc;
  }
</style>
