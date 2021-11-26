import ConfigTop from "../../components/ConfigTop";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function GameConfig() {
  return (
    <View style={styles.container}>
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
    backgroundColor: "#eee",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
