import ConfigTop from "../../../components/ConfigTop";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function GameConfig() {
  return (
    <View>
      <Text>
        <ConfigTop />
      </Text>
    </View>
  );
}

export default GameConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
