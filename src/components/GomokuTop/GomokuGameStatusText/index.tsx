import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FirstPlayerContext, SecondPlayerContext } from "../../../context";

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
  const { firstPlayer } = useContext(FirstPlayerContext);
  const { secondPlayer } = useContext(SecondPlayerContext);

  return (
    <View>
      <View style={styles.statusText}>
        <Text>{firstPlayer}</Text>
        <Text>{secondPlayer}</Text>
      </View>
      <View style={styles.statusText}>
        <Text style={styles.textStyle}>
          Next: {isFirstMove ? firstPlayer : secondPlayer}
        </Text>
        <Text style={styles.textStyle}>{judgeWinnerMessage()}</Text>
        <Text style={styles.textStyle}>
          {judgeWinnerMessage()
            ? `${turnNumber - 1}手で決着`
            : `${turnNumber}手目`}
        </Text>
      </View>
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
    fontSize: 20,
  },
});
