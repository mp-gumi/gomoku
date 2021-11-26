import React, { useCallback } from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import o from "../../../../assets/o.png";
import x from "../../../../assets/x.png";
import { BoardValueType } from "..";

type GomokuBoxProps = {
  squareWidth: number;
  Xcoordinate: number;
  Ycoordinate: number;
  boardValuesArray: BoardValueType[][];
  handlePressSquare: (Xcoordinate: number, Ycoordinate: number) => void;
};

function GomokuBox({
  squareWidth,
  Xcoordinate,
  Ycoordinate,
  boardValuesArray,
  handlePressSquare,
}: GomokuBoxProps) {
  const squareImage = useCallback((): JSX.Element | undefined => {
    if (boardValuesArray[Ycoordinate][Xcoordinate] === 1) {
      return (
        <Image
          source={o}
          style={[{ width: squareWidth * 0.8, height: squareWidth * 0.8 }]}
        />
      );
    }
    if (boardValuesArray[Ycoordinate][Xcoordinate] === -1) {
      return (
        <Image
          source={x}
          style={[{ width: squareWidth * 0.8, height: squareWidth * 0.8 }]}
        />
      );
    }
    return;
  }, [boardValuesArray, Xcoordinate, Ycoordinate, squareWidth]);

  return (
    <Pressable
      onPress={() => handlePressSquare(Xcoordinate, Ycoordinate)}
      style={[styles.container, { width: squareWidth, height: squareWidth }]}
    >
      {squareImage()}
    </Pressable>
  );
}

export default GomokuBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
  },
});
