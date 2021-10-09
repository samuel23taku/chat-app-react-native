import axios from "axios";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import url from "../url";

const MessagingScreen = ({ route,navigation }) => {
  let { chatId, myId} = route.params;
  const isNewChat = route.params
  let [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  function getMessages() {
    axios
      .post(url + "/getMessages", { chatId })
      .then((response) => {
        setmessages(response.data);
      })
      .catch((e) => {
        console.warn(e);
      });
  }
  useLayoutEffect(() => {
    getMessages();
  }, []);
  const socket = io(url,{withCredentials: true,});
  socket.on("send_message", (data) => {
    if(chatId == "none"){
      for(item in data){
        chatId == data[item].chatId
      }
    }
    setmessages(data)
  });
  socket.on("disconnect",function(){
    console.warn("server offline")
  })
  const sendMessage = () => {
  if(chatId === "none"){
    socket.emit("new_chat",{personName:isNewChat.personName,personId:isNewChat.personId,message})
  }
  else{
    socket.emit("send_message", {message,chatId});
  }
  setmessage("")
  };
  const renderMessage = (message) => {
    const sendBy = message.sendBy;
    return (
      <ListItem
        style={{
          padding: 6,
          alignSelf: sendBy == myId || sendBy != isNewChat.personId ? "flex-end"   : "flex-start",
          borderRadius: 23,
          maxWidth: "80%",
          margin: 12,
          borderColor: "red",
          borderWidth: 2,
          position: "relative",
        }}
      >
        <Text>{message.message}</Text>
      </ListItem>
    );
  };
  return (
    <View style={{ flex: 1 }} key={1}>
      <FlatList
        data={messages}
        renderItem={({ item }) => renderMessage(item)}
      />

      <View style={styles.sendMessageView}>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TextInput
              value={message}
              onChangeText={(e) => setmessage(e.toString())}
              placeholder="send message"
              style={{
                flex: 1,
                padding: 5,
                borderColor: "red",
                borderWidth: 2,
                borderRadius: 12,
                marginStart: 9,
              }}
            />
            <Icon
              name="send"
              size = {35}
              style={{
                fontSize:32,
                marginTop: 15,
                marginStart: 5,
              }}
              onPress={() => sendMessage()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  sendMessageView: {
    marginBottom: 6,
    padding: 4,
  },
});

export default MessagingScreen;