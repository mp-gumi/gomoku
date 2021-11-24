import React from "react";
import { View, Text, StyleSheet } from "react-native";

type GomokuGameStatusType = {
  isFirstMove: boolean;
  judgeWinnerMessage: () =>
    | "〇の勝利です"
    | "✕の勝利です"
    | "引き分けです"
    | undefined;
  turnNumber: number;
};

function GomokuGameStatusText({
  isFirstMove,
  judgeWinnerMessage,
  turnNumber,
}: GomokuGameStatusType) {
  return (
    <View style={styles.statusText}>
      <Text style={styles.statusText}>Next:{isFirstMove ? "〇" : "✕"}</Text>
      <Text style={styles.statusText}>{judgeWinnerMessage()}</Text>
      <Text style={styles.statusText}>{turnNumber}手目</Text>
    </View>
  );
}

export default GomokuGameStatusText;

const styles = StyleSheet.create({
  statusText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 30,
  },
});
