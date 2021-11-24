import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function ConfigTop() {
  const [playerName1, setPlayerName1] = useState("先手番");
  const [playerName2, setPlayerName2] = useState("後手番");
  const [squareNumber, setSquareNumber] = useState("9");
  const [quote, setQuote] = useState("5");

  return (
    <View>
      <Text>プレイヤー名（先手：〇）</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlayerName1}
        value={playerName1}
      />
      <Text>プレイヤー名（後手：✕）</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlayerName2}
        value={playerName2}
      />
      <Text>盤面サイズ</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="値のみ入力"
        onChangeText={setSquareNumber}
        value={squareNumber}
      />
      <Text>勝利個数</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="値のみ入力"
        onChangeText={setQuote}
        value={quote}
      />
    </View>
  );
}

export default ConfigTop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    height: 32,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
