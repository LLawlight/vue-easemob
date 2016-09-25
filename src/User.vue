<template lang="html">
  <h2>当前用户：{{username}}</h2>
  <div class="window">
    <div class="friends">
      好友列表
      <ul>
        <li v-for="friend in friends" @click="selectedEvt" class="friendName">{{friend.name}}</li>
      </ul>
    </div>
    <div class="char">
      <div class="message">
        <p v-show="selected!==''">正在和 {{selected}} 聊天</p>
        <div v-for="message in messages" class="newMessage">
          {{message.from}}: {{message.data}}
        </div>
      </div>
      <div class="messageInput">
        <textarea id="msg" @keydown.enter.prevent="sendMessage"></textarea>
      </div>
    </div>
  </div>
  <button @click="logout">退出登录</div>
</template>

<script>
export default {
  data() {
    return {
      conn: '',
      username: '',
      friends: '',
      messages: [],
      selected: ''
    };
  },
  computed: {},
  ready() {
    var self = this;
    this.conn = new WebIM.connection({
        https: WebIM.config.https,
        url: WebIM.config.xmppURL,
        isAutoLogin: WebIM.config.isAutoLogin,
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions
    });
    this.login();
    this.conn.listen({
      onOpened: function(){
        self.conn.setPresence();
        console.log(this.context.userId + "登陆成功");
        this.getRoster({
          success: function ( roster ) {
            self.friends = roster;
          },
          error: function() {

          }
        });
      },
      onClosed: function() {
        console.log("onClosed");
        self.$route.$router.go({name: 'index'})
      },
      onTextMessage: function(message) {
        self.conn.setPresence();
        console.log(message);
        self.messages.push(message);
      },
      // onEmojiMessage: function ( message ) {console.log("当前关闭");},   //收到表情消息
      // onPictureMessage: function ( message ) {console.log("当前关闭");}, //收到图片消息
      // onCmdMessage: function ( message ) {console.log("当前关闭");},     //收到命令消息
      // onAudioMessage: function ( message ) {console.log("当前关闭");},   //收到音频消息
      // onLocationMessage: function ( message ) {console.log("当前关闭");},//收到位置消息
      // onFileMessage: function ( message ) {console.log("当前关闭");},    //收到文件消息
      // onVideoMessage: function ( message ) {console.log("当前关闭");},   //收到视频消息
      // onPresence: function ( message ) {console.log("当前关闭");},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
      // onRoster: function ( message ) {console.log("当前关闭");},         //处理好友申请
      // onInviteMessage: function ( message ) {console.log("当前关闭");},  //处理群组邀请
      // onOnline: function () {console.log("当前关闭");},                  //本机网络连接成功
      // onOffline: function () {console.log("当前关闭");},                 //本机网络掉线
      onError: function(message) {
        console.log("回调失败", message);
      }
    });
  },
  attached() {},
  methods: {
    login: function() {
      this.username = document.cookie.split(';')[1].split('=')[1]
      var auth = document.cookie.split(';')[2].split('=')[1]
      var options = {
        apiUrl: WebIM.config.apiURL,
        accessToken : auth,
        user: this.username,
        pwd: auth,
        appKey: WebIM.config.appkey
      };

      this.conn.open(options);
    },
    logout: function() {
      this.conn.close();
      this.$route.router.go({name: 'index'});
    },
    sendMessage: function() {
      var self = this;
      var messageContext = document.getElementById('msg').value;
      var id = this.conn.getUniqueId();//生成本地消息id
      var msg = new WebIM.message('txt', id);//创建文本消息
      msg.set({
        msg: messageContext,
        to: self.selected,
        type: "chat",
        success: function ( id, serverMsgId ) {
          console.log("发送成功");
          self.messages.push({from: self.username, data: messageContext});
        }//消息发送成功回调
      });
      this.conn.send(msg.body);
      document.getElementById('msg').value = '';
    },
    selectedEvt: function(event) {
      var friendNames = document.getElementsByClassName('friendName');
      for (var i = 0; i < friendNames.length; i++) {
        friendNames[i].style.backgroundColor = "white";
        friendNames[i].style.color = "red";
      }
      event.target.style.backgroundColor = "red";
      event.target.style.color = "white";
      this.selected = event.target.innerText;
    }
  },
  components: {}
};
</script>

<style lang="css">
.window {
  display: flex;
  flex-grow: 2;
  align-items: stretch;
  margin: 10px 0;
}

.window>div {
  float: left;
  border: 1px solid #F43530;
  border-radius: 10px;
}

.friends {
  width: 20%;
  margin-right: 5px;
}
.friendName {
  cursor: pointer;
  margin: 5px 0;
}

.char {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
}

.message {
  flex-grow: 2;
  border-bottom: 1px solid #F43530;
}

.newMessage {
  text-align: left;
}

.messageInput {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: space-between;
  overflow: hidden;
}

.messageInput textarea{
  width: 100%;
  resize: none;
  border-radius: 0 0 10px 10px;
}
</style>
