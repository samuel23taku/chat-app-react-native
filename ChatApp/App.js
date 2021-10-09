import  React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";
import HomeScreen from "./HomeScreen";
import MessagingScreen from "./Components/MessagingScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen
          name="Messaging"
          component={MessagingScreen}
          options={({ route }) => ({ title: route.params.chatName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
