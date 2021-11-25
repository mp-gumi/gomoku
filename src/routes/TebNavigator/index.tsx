import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Game from "../Game";
import GameConfig from "../GameConfig";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
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
        tabBarActiveTintColor: "#28f",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Settings" component={GameConfig} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
