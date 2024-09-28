import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import PrimaryButton from "../Components/Forms/PrimaryButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Color } from "../GlobalStyles";
import CreateTestPage from "./CreateTestPage";
import LoadingAnimation from "../lib/utility/constants/loader";
import ChooseExamAlert from "../Components/Alert/ChooseExamAlert";
import ChooseExamAlertSuccess from "../Components/Alert/ChooseExamAlertSuccess";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseExam = ({}) => {
  const navigation = useNavigation();



  const route = useRoute(); 
  const { detailPageValue } = route.params || {}; 
  const [selectedExamCategory, setSelectedExamCategory] = useState(
    detailPageValue && detailPageValue._id ? detailPageValue._id : null );

  useEffect(() => {
    if (!detailPageValue || !detailPageValue._id) {
      setSelectedExamCategory(null); 
    }
  }, [detailPageValue]);

  const [questionData, setQuestionData] = useState([]);
  const [testId, setTestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showAlertTest, setShowAlertTest] = useState(false);
  const [alertMessageTest, setAlertMessageTest] = useState("");


  const [selectedSubExamType, setSelectedSubExamType] = useState("");
  const [selectedExamYear, setSelectedExamYear] = useState("");
  const [yearDropIsVisible, setYearDropIsVisible] = useState(true);
  const [distDropIsVisible, setDistDropIsVisible] = useState(true);
  const [selectedTimer, setSelectedTimer] = useState("1");

  const onSubmitChooseExam = async () => {

    if (!selectedExamCategory) {
      alert("Please select an exam category");
      return;
    }

    if (!selectedSubExamType) {
      alert("Please select an exam type");
      return;
    }

    if (yearDropIsVisible && !selectedExamYear) {
      alert("Please select an exam year");
      return;
    }

    loadQuestionPaper();
  };

  const handleOnClose = () => {
    setShowAlert(false);
  };

  const loadQuestionPaper = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/question-papers/getQuestionPapersByFilter",
        {
          catID: selectedExamCategory,
          subCatID: selectedSubExamType,
          QPYearID: selectedExamYear,
        }
      );
      const incomingData = response.data.data;

      // console.log("-----------res------" + JSON.stringify(response.data));

      const myTestData = incomingData.map(
        ({ _id, question, option1, option2, option3, option4, answer }) => ({
          _id,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
        })
      );


      const dataAuth = await AsyncStorage.getItem("@auth");
      const loginData = JSON.parse(dataAuth);
      const creatorId = loginData.user._id;
      const creatorName = loginData.user.name;

      const responseMainTest = await axios.post("/question-papers/main-test", {
        testName: selectedExamCategory,
        totalQuestions: myTestData.length,
        passingMarks: 0,  
        creatorId: creatorId,
        questions: myTestData,
      });



      setQuestionData(responseMainTest.data.data.questions);
      setTestId(responseMainTest.data.data.testId);
      setShowAlertTest(true);
      setAlertMessageTest("Quick Tips: There are no Tips. Best of luck!");
    } catch (error) {
      console.error("Error fetching question paper:", error);
      setShowAlert(true);
      setAlertMessage(
        "No question papers are available for the selected options. Please review your selections and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOnInstructions = () => {
    navigation.navigate("InstructionPage", {
      questionData,
      testId,
      selectedExamCategory,
      selectedSubExamType,
      selectedExamYear,
      selectedTimer,
    });
  };

  const handleOnSkipIntructions = () => {
    navigation.navigate("TestPage", {
      questionData,
      testId,
      selectedExamCategory,
      selectedSubExamType,
      selectedExamYear,
      selectedTimer,
    });
  };
  const onCloseChooseExamAlert = () => {
    setShowAlertTest(false);
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      {showAlert && (
        <ChooseExamAlert
          isVisible={showAlert}
          onClose={handleOnClose}
          message={alertMessage}
        />
      )}

      {showAlertTest && (
        <ChooseExamAlertSuccess
          isVisible={showAlertTest}
          onInstructions={handleOnInstructions}
          onSkipIntructions={handleOnSkipIntructions}
          message={alertMessageTest}
          onClose={onCloseChooseExamAlert}
        />
      )}
      <ScrollView
        style={styles.mainConatiner}
        showsVerticalScrollIndicator={false}
      >
        {/* <SecoundaryHeader pageName="Choose Exam" /> */}

        {/* <Text style={styles.txt}>Please Select Question Paper to Start Exam</Text> */}

        {/* <View style={styles.stepsContainer}>
          <Text style={styles.header}>Steps to Solve Test</Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>1. </Text>
            Select the Examination Type, such as which exam you want to take.
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>2. </Text>
            Choose the Exam Type wisely, like Pre, Mains, or Saral Seva.
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>3. </Text>
            Choose other dropdown values if applicable.
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>4. </Text>
            Select the timer you want in the exam or decide if you want a timer
            at all.
          </Text>
        </View> */}

        {/* <ChooseExamDropdown
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        selectedSubExam={selectedSubExam}
        setSelectedSubExam={setSelectedSubExam}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      /> */}
        <CreateTestPage
          selectedExamCategory={selectedExamCategory}
          selectedSubExamType={selectedSubExamType}
          selectedExamYear={selectedExamYear}
          setSelectedExamCategory={setSelectedExamCategory}
          setSelectedSubExamType={setSelectedSubExamType}
          setSelectedExamYear={setSelectedExamYear}
          yearDropIsVisible={yearDropIsVisible}
          setYearDropIsVisible={setYearDropIsVisible}
          // distDropIsVisible={distDropIsVisible}
          // setDistDropIsVisible={setDistDropIsVisible}
          detailPageValue={detailPageValue}
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
        />
        <PrimaryButton
          styles={styles.button}
          buttonTitle={loading ? "Loading..." : "Submit"}
          handleOnSubmit={onSubmitChooseExam}
          disabled={loading}
        />
        {/* {loading && <ActivityIndicator size="large" color={Color.primaryColor} />} */}

        {/* <CustomAlert
        showSingleButton
        visible={showAlert}
        onYes={() => setShowAlert(false)}
        alertText="Question Paper is not available"
      /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    // width: "100%",
    // height: "100%",
    backgroundColor: Color.colorWhite,
    // flexGrow: 1,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10,
    // paddingVertical: 10,
    color: "blue", // Color of the header
  },
  step: {
    marginBottom: 8,
    color: "green", // Color of the step text
  },
  stepNumber: {
    fontWeight: "bold",
    color: "red", // Color of the step number
  },
  stepsContainer: {
    paddingHorizontal: 20,
    backgroundColor: Color.secoundaryBtnColor,
    borderRadius: 20,
    top: "8%",
    marginHorizontal: 5,
    paddingVertical: 10,
  },

  txt: {
    textAlign: "center",
    marginTop: "20%",
    fontSize: 20,
    justifyContent: "center",
    color: Color.red,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    // marginTop: "5%",
    marginTop: 20,
  },
});

export default ChooseExam;
