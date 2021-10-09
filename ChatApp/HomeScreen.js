import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./Components/Chats";
import People from "./Components/People";
import axios from "axios";
import url from "./url";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  const [people, setpeople] = useState([]);
  const [chatData, setchatData] = useState([]);
  const [userId, setuserId] = useState()
  const getPeople = () => {
    axios
      .get(url + "/getPeople")
      .then((response) => {
        setpeople(response.data);
      })
      .catch((e) => {
        ToastAndroid.show(e,12)
      });
  };

    const getChats = () => {
      axios
        .get(url + "/getChats")
        .then((response) => {
          setuserId(response.data.userId)
          setchatData(response.data.chats)
        })
        .catch((e) => {
          console.warn("error ", e);
        });
    };
  useLayoutEffect(() => {
    getChats();
    getPeople();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Chats">
        {(props) => <Chats {...props} chatData={chatData} userId={userId}/>}
      </Tab.Screen>
      <Tab.Screen name="People">
        {(props) => <People {...props} people={people} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeScreen;