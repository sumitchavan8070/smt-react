import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../lib/dashboard_module/view/Home";
import Register from "../../lib/authentication_module/view/sign_in_view";
import Login from "../../lib/authentication_module/view/login_view";
import { AuthContext } from "../../Context/authContext";
import Blog from "../../lib/dashboard_module/view/Blog";
import History from "../../Screens/History";
import Profile from "../../lib/dashboard_module/view/Profile";
import ExamDetailPage from "../../Screens/ExamDetailPage";
import ViewAll from "../../Screens/ViewAll";
import ChooseExam from "../../Screens/ChooseExam";
import TestPage from "../../Screens/TestPage";
import TestResult from "../../Screens/TestResult";
import SummaryPage from "../../Screens/SummaryPage";
import CreateTestPage from "../../Screens/CreateTestPage";
import InstructionPage from "../../Screens/InstructionPage";
import GroupPage from "../../Screens/GroupPage";
import GroupChatPage from "../../Screens/GroupChatPage";
import CommonScreen from "../../Screens/CommonScreen";
import CustomTestPage from "../../Screens/CustomTest";
import YearCardsPage from "../QuestionPaperSection/YearCardsPage";
import QuestionPaperCardPage from "../QuestionPaperSection/QuestionPaperCardPage";
import FeedbackForm from "../Feedback/FeedbackForm";
import Test from "../../Screens/Test";
import FilterExam from "../../Screens/FilterExam";
import DonationScreen from "../Subscription/DonationScreen";
import SplashScreen from "../../lib/authentication_module/view/feture_view";
import ChooseExamUpdated from "../../Screens/examDropdown/ChooseExamUpdated";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();



  return (
    // <Stack.Navigator initialRouteName="Splash">
    <Stack.Navigator initialRouteName={authenticatedUser ? "Home" : "Splash"}>
      {/* conditions to access toute */}
      {/* {authenticatedUser ? (<>true condition</>) :(<>false condition</>)} */}

      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Blog"
            component={Blog}
            options={{ headerShown: false, headerTitle: "Blog" }}
          />

          <Stack.Screen
            name="History"
            component={History}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ExamDetail"
            component={ExamDetailPage}
            options={{ headerShown: false, headerTitle: "EXAM DETAIL" }}
          />

          <Stack.Screen
            name="ViewAll"
            component={ViewAll}
            options={{ headerShown: true, headerTitle: "View All" }}
          />

          <Stack.Screen
            name="ChooseExam"
            component={ChooseExam}
            options={{ headerShown: true, headerTitle: "CHOOSE EXAM" }}
          />

          <Stack.Screen
            name="ChooseExamUpdated"
            component={ChooseExamUpdated}
            options={{ headerShown: false, headerTitle: "CHOOSE EXAM" }}
          />

          <Stack.Screen
            name="FilterExam"
            component={FilterExam}
            options={{ headerShown: false, headerTitle: "CHOOSE EXAM" }}
          />

          <Stack.Screen
            name="TestPage"
            component={TestPage}
            options={{ headerShown: false, headerTitle: "Test Page" }}
          />

          <Stack.Screen
            name="TestResult"
            component={TestResult}
            options={{ headerShown: false, headerTitle: "Test Result" }}
          />

          <Stack.Screen
            name="SummaryPage"
            component={SummaryPage}
            options={{ headerShown: false, headerTitle: "Test Summary" }}
          />

          <Stack.Screen
            name="CreateTestPage"
            component={CreateTestPage}
            options={{ headerShown: true, headerTitle: "Create Test" }}
          />

          <Stack.Screen
            name="InstructionPage"
            component={InstructionPage}
            options={{ headerShown: true, headerTitle: "Instruction Page" }}
          />

          <Stack.Screen
            name="CommonScreen"
            component={CommonScreen}
            options={{ headerShown: false, headerTitle: "Explore" }}
          />

          <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={{ headerShown: true, headerTitle: "Community" }}
          />
          <Stack.Screen
            name="GroupChatPage"
            component={GroupChatPage}
            options={{ headerShown: false, headerTitle: "CommunityChatPage" }}
          />
          {/* <Stack.Screen
            name="GroupDetailPage"
            component={GroupDetailPage}
            options={{ headerShown: false, headerTitle: "Community" }}
          /> */}

          <Stack.Screen
            name="CustomTestPage"
            component={CustomTestPage}
            options={{ headerShown: false, headerTitle: "Own Test" }}
          />

          {/* <Stack.Screen
            name="LeaderboardPage"
            component={LeaderboardPage}
            options={{ headerShown: true, headerTitle: "Leaderboard" }}
          /> */}

          <Stack.Screen
            name="YearCardsPage"
            component={YearCardsPage}
            options={{ headerShown: true, headerTitle: "Papers" }}
          />
          <Stack.Screen
            name="QuestionPaperCardPage"
            component={QuestionPaperCardPage}
            options={{ headerShown: false, headerTitle: "Papers" }}
          />

          <Stack.Screen
            name="FeedbackForm"
            component={FeedbackForm}
            options={{ headerShown: false, headerTitle: "Feedback" }}
          />

          <Stack.Screen
            name="Test"
            component={Test}
            options={{ headerShown: true, headerTitle: "Feedback" }}
          />
          <Stack.Screen
            name="DonationScreen"
            component={DonationScreen}
            options={{ headerShown: false, headerTitle: "Donation" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            //This Component give us navigation option which can be decaterised in Login(naviagtion)
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
