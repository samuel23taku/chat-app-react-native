import axios from "axios";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import url from "../url";

const CreateAccount = ({ navigation }) => {
  const [emailAddress, setemailAddress] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const signUp = () => {
    if (
      emailAddress.length < 1 ||
      username.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      ToastAndroid.showWithGravity("Fill All Fileds", ToastAndroid.SHORT, 23);
    } else if (password != confirmPassword) {
      ToastAndroid.showWithGravity(
        "Passwords do not match",
        ToastAndroid.SHORT,
        23
      );
    } else {
      axios
        .post(url + "/createAccount", { emailAddress, username, password })
        .then((response) => {
          console.warn(response.data);
          if (response.data == "account created") {
            navigation.replace("HomeScreen");
          } else {
            ToastAndroid.show(response.data, 8);
          }
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputFieldsContainer}>
          <Input
            value={emailAddress}
            onChangeText={setemailAddress}
            placeholder="Email Address"
            textContentType="emailAddress"
          />
          <Input
            value={username}
            onChangeText={setusername}
            placeholder="User Name"
            textContentType="name"
          />
          <Input
            value={password}
            onChangeText={setpassword}
            placeholder="Create Password"
            secureTextEntry
          />
          <Input
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>
        <View>
          <Button
            onPress={() => {
              signUp();
            }}
            containerStyle={styles.buttons}
            title="Sign Up"
            type="outline"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: 300,
    margin: "4%",
  },
  inputFieldsContainer: {
    width: 300,
  },
});
