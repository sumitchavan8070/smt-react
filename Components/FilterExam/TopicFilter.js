import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import AssetPath from "../../lib/utility/constants/asset_path";


const TopicFilter = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={AssetPath.yogaboy}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  animation: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});

export default TopicFilter;
