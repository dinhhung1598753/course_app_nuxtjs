<template >
  <v-container style="height: 83vh">
    <v-row style="height: 100%">
      <v-col cols="3" style="height: 100%">
        <div class="chat-bar">
          <span>Chat</span>
          <v-icon class="new-chat">mdi-square-edit-outline </v-icon>
        </div>
        <v-list nav dense style="height: 100%; overflow: auto">
          <v-list-item-group v-model="selectedUser" color="primary">
            <v-list-item v-for="(item, i) in users" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.userName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="9">
        <v-toolbar dense>
          <v-toolbar-title>Hoàng Đình Hùng</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container id="chat-box"
          style="height: 64vh; border: 1px solid #272727; overflow-y: auto"
        >
          <div class="message-left">
            <div class="message">
              <span>Xin chào Hùng</span>
            </div>
          </div>
          <div class=" message-right">
            <div class="message">
              <span>Hello world</span>
            </div>
          </div>
          
          
        </v-container>
        <v-row style="margin: unset; border: 1px solid #272727">
          <v-text-field hide-details="auto"></v-text-field>
          <v-btn large style="margin-top: 6px"><v-icon>mdi-send</v-icon></v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ChatPage',
  // middleware: ['isAuthenticated'],
  data() {
    return {
      selectedUser: 0,
      users: [
        { id: 123, userName: 'Hoàng Đình Hùng' },
        { id: 234, userName: 'Hoàng Đình Tùng ' },
        { id: 345, userName: 'Nguyễn Văn A ' },
        
      ],
    }
  },
  created() {
    try {
      this.$axios.get('/users/course').then((res) => {
        // console.log("data: ",res.data[0])
        this.items = res.data
      })
    } catch (err) {
      return err
    }
  },
  mounted() {
    const container = this.$el.querySelector("#chat-box");
    container.scrollTop = container.scrollHeight;
  },
}
</script>
<style scoped>
.message {
  margin-top: 5px;
  border-radius: 20px;
  padding: 10px;
  background-color: #272727;
  display: inline-block;
}

/* .message-left {
  
} */

.message-left div {
  margin-right: 100px;
}

.message-right {
  text-align: -webkit-right;
}

.message-right div {
  margin-left: 100px;
}

.chat-bar{
  margin-bottom: 5px;
  padding-left: 10px;
}

.chat-bar span {
  font-weight: bold;
  font-size: 20px;
}

.chat-bar .new-chat {
  float: right;
}

.chat-bar .new-chat:hover {
  cursor: pointer;
}
</style>