import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Game from "./src/containers/Pages/Game";
import GameConfig from "./src/containers/Pages/GameConfig";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Game" component={Game} />
        <Tab.Screen name="設定" component={GameConfig} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
