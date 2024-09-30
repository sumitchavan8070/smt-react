import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../dashboard_module/view/home_view";
import Register from "../../authentication_module/view/sign_in_view";
import Login from "../../authentication_module/view/login_view";
import { AuthContext } from "../../../Context/authContext";
import Blog from "../../dashboard_module/view/blog_view";
import History from "../../dashboard_module/view/history_view";
import Profile from "../../dashboard_module/view/profile_view";
import ExamDetailPage from "../../../Screens/ExamDetailPage";
import ViewAll from "../../../Screens/ViewAll";
import ChooseExam from "../../../Screens/ChooseExam";
import TestPage from "../../../Screens/TestPage";
import TestResult from "../../../Screens/TestResult";
import SummaryPage from "../../../Screens/SummaryPage";
import CreateTestPage from "../../../Screens/CreateTestPage";
import InstructionPage from "../../../Screens/InstructionPage";
import GroupPage from "../../../Screens/GroupPage";
import GroupChatPage from "../../conversation_module/view/group_chat_view";
import CommonScreen from "../../../Screens/CommonScreen";

import YearCardsPage from "../../../Components/QuestionPaperSection/YearCardsPage";
import QuestionPaperCardPage from "../../../Components/QuestionPaperSection/QuestionPaperCardPage";
import FeedbackForm from "../../../Components/Feedback/FeedbackForm";

import Test from "../../../Screens/Test";

import FilterExam from "../../../Screens/FilterExam";
import DonationScreen from "../../../Components/Subscription/DonationScreen";
import SplashScreen from "../../authentication_module/view/feture_view";
import ChooseExamUpdated from "../../../Screens/examDropdown/ChooseExamUpdated";
import ProtectedRoute from "./ProtectedRoute"; 
import RoutePaths from "./route_paths";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
//   const authenticatedUser = true ??  state?.user && state?.token;
  const authenticatedUser = true  ;
  console.log(`authenticatedUser : ${authenticatedUser}`); 

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={authenticatedUser ? "home" : "home"}>
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name={RoutePaths.home}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RoutePaths.blogView}
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Blog" }}
            // Pass component and authentication status
            getComponentonent={props => <ProtectedRoute component={Blog} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name={RoutePaths.historyView}
            component={ProtectedRoute}
            options={{ headerShown: false }}
            getComponentnent={props => <ProtectedRoute component={History} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name={RoutePaths.useProfile}
            component={ProtectedRoute}
            options={{ headerShown: false }}
            getComponentonent={props => <ProtectedRoute component={Profile} authenticated={authenticatedUser} {...props} />}
          />
          {/* Repeat the same pattern for other screens */}
          <Stack.Screen
            name="ExamDetail"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "EXAM DETAIL" }}
            getComponentonent={props => <ProtectedRoute component={ExamDetailPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="ViewAll"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "View All" }}
            getComponentonent={props => <ProtectedRoute component={ViewAll} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="ChooseExam"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "CHOOSE EXAM" }}
            getComponentonent={props => <ProtectedRoute component={ChooseExam} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="ChooseExamUpdated"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "CHOOSE EXAM" }}
            getComponentonent={props => <ProtectedRoute component={ChooseExamUpdated} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="FilterExam"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "CHOOSE EXAM" }}
            getComponentonent={props => <ProtectedRoute component={FilterExam} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="TestPage"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Test Page" }}
            getComponentonent={props => <ProtectedRoute component={TestPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="TestResult"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Test Result" }}
            getComponentonent={props => <ProtectedRoute component={TestResult} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="SummaryPage"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Test Summary" }}
            getComponentonent={props => <ProtectedRoute component={SummaryPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="CreateTestPage"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "Create Test" }}
            getComponentonent={props => <ProtectedRoute component={CreateTestPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="InstructionPage"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "Instruction Page" }}
            getComponentonent={props => <ProtectedRoute component={InstructionPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="CommonScreen"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Explore" }}
            getComponentonent={props => <ProtectedRoute component={CommonScreen} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="GroupPage"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "Community" }}
            getComponentonent={props => <ProtectedRoute component={GroupPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="GroupChatPage"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "CommunityChatPage" }}
            getComponentonent={props => <ProtectedRoute component={GroupChatPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="CustomTestPage"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Own Test" }}
            getComponentonent={props => <ProtectedRoute component={CustomTestPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="YearCardsPage"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "Papers" }}
            getComponentonent={props => <ProtectedRoute component={YearCardsPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="QuestionPaperCardPage"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Papers" }}
            getComponentonent={props => <ProtectedRoute component={QuestionPaperCardPage} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="FeedbackForm"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Feedback" }}
            getComponentonent={props => <ProtectedRoute component={FeedbackForm} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="Test"
            component={ProtectedRoute}
            options={{ headerShown: true, headerTitle: "Feedback" }}
            getComponentonent={props => <ProtectedRoute component={Test} authenticated={authenticatedUser} {...props} />}
          />
          <Stack.Screen
            name="DonationScreen"
            component={ProtectedRoute}
            options={{ headerShown: false, headerTitle: "Donation" }}
            getComponentonent={props => <ProtectedRoute component={DonationScreen} authenticated={authenticatedUser} {...props} />}
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
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
