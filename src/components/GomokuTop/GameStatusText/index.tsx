import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FirstPlayerContext, SecondPlayerContext } from "../../../context";

type GameStatusTextType = {
  isFirstMove: boolean;
  judgeWinnerMessage: () =>
    | "〇の勝利です"
    | "✕の勝利です"
    | "引き分けです"
    | undefined;
  turnNumber: number;
  parsedQuote: number;
};

function GameStatusTextText({
  isFirstMove,
  judgeWinnerMessage,
  turnNumber,
  parsedQuote,
}: GameStatusTextType) {
  const { firstPlayer } = useContext(FirstPlayerContext);
  const { secondPlayer } = useContext(SecondPlayerContext);

  return (
    <View>
      <View style={styles.statusText}>
        <Text style={styles.textStyle}>
          {judgeWinnerMessage()
            ? judgeWinnerMessage()
            : `${parsedQuote}個並べたら勝利`}
        </Text>
        <Text style={styles.textStyle}>
          {judgeWinnerMessage()
            ? `${turnNumber - 1}手で決着`
            : `${turnNumber}手目`}
        </Text>
      </View>
      <View style={styles.statusText}>
        <Text
          style={[
            styles.playerNameStyle,
            {
              borderBottomColor:
                !judgeWinnerMessage() && isFirstMove ? "#28f" : "#00000000",
            },
          ]}
        >
          {firstPlayer}さん
        </Text>
        <Text
          style={[
            styles.playerNameStyle,
            {
              borderBottomColor:
                judgeWinnerMessage() || isFirstMove ? "#00000000" : "#d31",
            },
          ]}
        >
          {secondPlayer}さん
        </Text>
      </View>
    </View>
  );
}

export default GameStatusTextText;

const styles = StyleSheet.create({
  statusText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
  },
  playerNameStyle: {
    fontSize: 20,
    paddingBottom: 1,
    borderBottomWidth: 3,
  },
});
