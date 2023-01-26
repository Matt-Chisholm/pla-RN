import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

export default function Header({ goHome, currentScreen }) {
  const _goBack = () => goHome();

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={currentScreen} />
      </Appbar.Header>
    </View>
  );
}
