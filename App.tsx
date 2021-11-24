import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Game from "./src/containers/Pages/Game";
import GameConfig from "./src/containers/Pages/GameConfig";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Game") {
              iconName = "gamepad";
            } else if (route.name === "Settings") {
              iconName = "gear";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Game" component={Game} />
        <Tab.Screen name="Settings" component={GameConfig} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
