import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ToastAndroid,
} from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import url from "../url";


const Login = ({ navigation }) => {
  useLayoutEffect(() => {
    axios.get(url + "/isSessionExpired").then((response) => {
      if (response.data === "session active") {
        navigation.replace("HomeScreen");
      }
    });
  }, []);
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const login = () => {
    if (emailAddress.length < 1 || password.length < 1) {
      ToastAndroid.showWithGravityAndOffset(
        "Fill all fields",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    } else {
      axios
        .post(url + "/login", {
          emailAddress: emailAddress,
          password: password,
        })
        .then((response) => {
          if (response.data === "access granted") {
            navigation.replace("HomeScreen");
          } else {
            ToastAndroid.show(response.data, 5);
          }
        })
        .catch((e) => {
          console.warn("error ", e);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputFieldsContainer}>
          <Input
            onChangeText={setemailAddress}
            value={emailAddress}
            placeholder="Email Address"
            textContentType="emailAddress"
            focusable
          />
          <Input
            onChangeText={setpassword}
            value={password}
            placeholder="User Password"
            secureTextEntry
            textContentType="password"
          />
        </View>
        <View>
          <Button
            onPress={() => {
              login();
            }}
            containerStyle={styles.loginAndcreateButton}
            title="Login"
            type="outline"
          />
          <Button
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            containerStyle={styles.loginAndcreateButton}
            title="Sign Up"
            type="outline"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginAndcreateButton: {
    width: 300,
    margin: "2%",
  },
  inputFieldsContainer: {
    width: 300,
  },
});
export default Login;
