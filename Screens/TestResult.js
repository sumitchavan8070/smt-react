import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import { AuthContext } from "../Context/authContext";
import { PieChart } from "react-native-gifted-charts";
import HeaderMenu from "../Components/Menus/HeaderMenu";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Color } from "../GlobalStyles";
import AssetPath from "../lib/utility/constants/asset_path";

const TestResult = ({ route }) => {
  const {
    testId,
    selectedOptions,
    questionData,
    correctAnsNo,
    incorrectAnsNo,
    unAttempt,
    score,
    scorePercentage,
    totalTime,
  } = route.params;

  // const [state] = useContext(AuthContext);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation])
  );

  useEffect(() => {
    // Automatically stop the animation after 3 seconds
    const timeout = setTimeout(() => {
      setIsAnimationPlaying(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const feedbackMessage =
    scorePercentage >= 70
      ? "Great job!"
      : scorePercentage >= 50
        ? "Good effort!"
        : "Keep practicing!";

  const handleViewSummary = () => {
    navigation.navigate("SummaryPage", {
      questionData,
      selectedOptions,
      testId,
      totalTime,
      correctAnsNo,
      incorrectAnsNo,
      unAttempt,
    });
  };

  const handleViewHistory = () => {
    navigation.navigate("History", {
      questionData,
      selectedOptions,
      totalTime,
    });
  };

  const pieData = [
    {
      value: correctAnsNo,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      label: `Correct: ${correctAnsNo}`,
    },
    {
      value: incorrectAnsNo,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
      label: `Incorrect: ${incorrectAnsNo}`,
    },
    {
      value: unAttempt,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
      label: `Unattempted: ${unAttempt}`,
    },
  ];

  const renderLegendComponent = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#232B5D" barStyle="light-content" />
      <HeaderMenu />
      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        {/* <FontAwesome5
          name={
            scorePercentage < 50
              ? "heart-broken"
              : scorePercentage <= 70
                ? "hippo"
                : "horse-head"
          }
          color={Color.primaryColor}
          style={styles.icon}
        /> */}
        <Text style={styles.usernameText}>
          Hello, <Text style={styles.usernameActual}>{state.user.name}</Text>
        </Text>
        <Text style={styles.details}>
          Your detailed results are now in! 🎉 Dive in to discover your
          performance 🚀
        </Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Performance Summary</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.scorePercentageText}>
                    {scorePercentage}%
                  </Text>
                  <Text style={styles.scoreText}>Score</Text>
                </View>
              )}
            />
          </View>
          {renderLegendComponent()}

          {/* <Text
            style={{
              alignSelf: "center",
              color: Color.colorWhite,
              fontSize: 18,
              fontWeight: "bold",
              padding: 20,
            }}
          >
            {feedbackMessage}
          </Text> */}
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity onPress={handleViewHistory}>
              <Text style={styles.buttonText}>View History</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#FF7E5F", "#FD3A69"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity onPress={handleViewSummary}>
              <Text style={styles.buttonText}>View Summary</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View
          style={{
            padding: 10,
            alignSelf: "center",
            backgroundColor: "#232B5D",
            width: "95%",
            marginBottom: "15%",
            borderRadius: 15,
          }}
        >
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              Test ID : {testId ? testId : "TEST"}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              Name : {state?.user?.name}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Time Taken : {totalTime} minutes
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Attempted Questions : {correctAnsNo + incorrectAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Coreect Answers : {correctAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Wrong Answers : {incorrectAnsNo}
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>  
                Unattempted Questions : {unAttempt}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {isAnimationPlaying && (
        <LottieView
          source={AssetPath.confettiAnimation}
          autoPlay
          loop={false}
          style={styles.lottie}
          pointerEvents="none" // This ensures the animation doesn't block touch events
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 30,
  },
  icon: {
    fontSize: 80,
    marginBottom: 15,
    alignSelf: "center",
  },
  usernameText: {
    fontSize: 18,
    color: "#333",
    alignSelf: "center",
  },
  usernameActual: {
    color: "#FF6F61",
    fontWeight: "bold",
  },
  details: {
    textAlign: "center",
    fontSize: 16,
    color: Color.darkGreen,
    marginVertical: 10,
  },
  summaryContainer: {
    backgroundColor: "#232B5D",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
  },
  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  scorePercentageText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 14,
    color: "#fff",
  },
  legendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  gradientButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  lottie: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});

export default TestResult;
