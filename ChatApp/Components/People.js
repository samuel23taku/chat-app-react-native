import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { ListItem } from "react-native-elements";

const People = ({ people ,navigation}) => {
  function renderPeople(person) {
    return (
      <ListItem
        style={{
          margin: "1%",
        }}
        onPress={()=>{
          navigation.navigate("Messaging",{personId:person.userid,personName:person.username,chatId:"none",chatName:person.username})
        }}
      >
        <Avatar
          rounded
          source={{
            uri: "https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1",
          }}
        />
        <ListItem.Title style={{ fontWeight: "bold" }}>{person.username}</ListItem.Title>
      </ListItem>
    );
  }
  return (
    <View>
      <FlatList
        data={people}
        renderItem={({ item }) => renderPeople(item)}
      />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({});
