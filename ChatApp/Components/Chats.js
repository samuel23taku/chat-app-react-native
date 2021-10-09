import React from "react"
import { StyleSheet, Text, View, FlatList, ToastAndroid } from "react-native";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";

const Chats = ({ navigation, chatData,userId }) => {
  function chatCard(item) {
    const chatName = item.user1 == userId ? item.user2Name : item.user1Name;
    const chatId = item.chatId;
    return (
      <ListItem
        style={{
          margin: "1%",
        }}
        onPress={() => {
          navigation.navigate("Messaging", { chatName, chatId, myId: userId });
        }}
      >
        <Avatar
          rounded
          source={{
            uri: "https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1",
          }}
        />
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={chatData}
        renderItem={({ item }) => chatCard(item)}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
