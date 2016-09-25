<template lang="html">
  <h2>注册</h2>
  <p>用户名：<input type='text' v-model="username" /></p>
  <p>　密码：<input type='password' v-model="password" /></p>
  <button type="button" name="button" @click="register">注册</button>
  <modal :show.sync='modal.show' :content="'注册成功！'" :sure-event="goindex | debounce 500"></modal>
</template>

<script>
import Modal from './components/Modal'

export default {
  data() {
    return {
      modal: {
        show: false
      },
      username: '',
      password: ''
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    register: function() {
      var self = this

      var options = {
        username: this.username,
        password: this.password,
        nickname: "",
        appKey: WebIM.config.appkey,
        success: function () {
          self.modal.show = true;
          console.log("注册成功");
        },
        error: function () {
          console.log("注册失败");
        },
        apiUrl: WebIM.config.apiURL
      };

      WebIM.utils.registerUser(options);
    },
    goindex: function() {
      this.$route.router.go({ name: 'index' })
    }
  },
  components: {
    Modal
  }
};
</script>

<style lang="css" scoped>

</style>
