<template>
      <h2>登录</h2>
      <p>用户名：<input type='text' v-model="username" /></p>
      <p>　密码：<input type='password' v-model="password" /></p>
      <button type="button" name="button" @click="login">登录</button>
      <p>还没有帐号？去
        <a v-link="{ name: 'signup' }">注册</a>
      </p>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      conn: '',
      username: '',
      password: ''
    }
  },
  ready: function() {
    var self = this;
    this.conn = new WebIM.connection({
        https: WebIM.config.https,
        url: WebIM.config.xmppURL,
        isAutoLogin: WebIM.config.isAutoLogin,
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions
    });
    console.log(this.conn);
    this.conn.listen({
      onOpened: function(){
        self.setCookie('user', this.context.userId);
        self.setCookie('token', this.context.accessToken);
        console.log(this.context.userId + "登陆成功");
        self.$route.router.go({name: 'user',params: {userId: this.context.userId}})
      },
      onClosed: function() {
        self.$route.$router.go({name: 'index'})
        console.log("关闭");
      }
    });
  },
  methods: {
    login: function() {
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: this.username,
        pwd: this.password,
        appKey: WebIM.config.appkey
      };

      this.conn.open(options);
    },
    setCookie: function(name,value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
  }
}
</script>

<style>
html,body,h1,h2,p,div,ul,li {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  width: 80%;
  color: #F43530;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #F43530;
  text-decoration: none;
}

.logo {
  width: 48px;
  height: 48px
}

.wraper {
  height: 480px;
  display: flex;
  flex-direction: column;
  border: 1px solid #F43530;
  border-radius: 10px;
  padding: 20px;
}

.wraper p {
  color: black;
}
</style>
