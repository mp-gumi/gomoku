import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TebNavigator";

function Routes() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Routes;
