import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NewsApi from "../api/NewsApi";

export default function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.header}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
