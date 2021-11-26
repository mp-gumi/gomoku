import React, { useContext } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import {
  SquareNumberContext,
  QuoteContext,
  FirstPlayerContext,
  SecondPlayerContext,
} from "../../context";

function ConfigTop() {
  const { firstPlayer, setFirstPlayer } = useContext(FirstPlayerContext);
  const { secondPlayer, setSecondPlayer } = useContext(SecondPlayerContext);
  const { squareNumber, setSquareNumber } = useContext(SquareNumberContext);
  const { quote, setQuote } = useContext(QuoteContext);
  const checkPositiveNumber = (value: string): JSX.Element | null => {
    if (parseInt(value, 10) > 1) return null;
    return (
      <Text style={styles.warnText}>※1より大きい数字を入力してください</Text>
    );
  };
  const checkWinNumber = (
    squareNumber: string,
    quote: string
  ): JSX.Element | null => {
    if (parseInt(squareNumber, 10) < parseInt(quote, 10)) {
      return (
        <Text style={styles.warnText}>
          ※勝利個数は盤面サイズより小さくしてください
        </Text>
      );
    }
    return null;
  };

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={{ width: windowWidth }}>
      <View style={styles.name}>
        <Text style={styles.settingTitle}>プレイヤー名（先手：〇）</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstPlayer}
          value={firstPlayer}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.settingTitle}>プレイヤー名（後手：✕）</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSecondPlayer}
          value={secondPlayer}
        />
      </View>
      <View style={styles.number}>
        <View style={[styles.numberInner, { width: windowWidth }]}>
          <Text style={styles.settingTitle}>盤面サイズ</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="数値のみ入力"
            onChangeText={setSquareNumber}
            value={squareNumber}
          />
        </View>
        <Text>{checkPositiveNumber(squareNumber)}</Text>
      </View>
      <View style={styles.number}>
        <View style={[styles.numberInner, { width: windowWidth }]}>
          <Text style={styles.settingTitle}>勝利個数</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="数値のみ入力"
            onChangeText={setQuote}
            value={quote}
          />
        </View>
        <Text>{checkPositiveNumber(quote)}</Text>
        <Text>{checkWinNumber(squareNumber, quote)}</Text>
      </View>
    </View>
  );
}

export default ConfigTop;

const styles = StyleSheet.create({
  input: {
    height: 36,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  settingTitle: {
    paddingLeft: 10,
  },
  name: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  number: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  numberInner: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  warnText: {
    paddingLeft: 10,
    color: "#f00",
  },
});
