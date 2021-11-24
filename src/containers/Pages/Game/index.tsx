import React from "react";
import { View, StyleSheet, Text } from "react-native";
import GomokuTop from "../../../components/GomokuTop";

function Game() {
  return (
    <View style={styles.container}>
      <Text>
        <GomokuTop />
      </Text>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
