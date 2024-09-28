import { View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Color } from "../GlobalStyles";
import SubjectFilter from "../Components/FilterExam/SubjectFilter";
import TopicFilter from "../Components/FilterExam/TopicFilter";
import ChooseExamUpdated from "./examDropdown/ChooseExamUpdated";
import HeaderMenu from "../Components/Menus/HeaderMenu";

const FilterExam = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1 }}>
      <HeaderMenu></HeaderMenu>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Color.primaryColor, // Active tab text color
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIndicatorStyle: {
            backgroundColor: Color.primaryColor, // Color of the indicator
            height: 2, // Height of the indicator
          },
        }}
      >
        <Tab.Screen name="Exam" component={ChooseExamUpdated} />
        <Tab.Screen name="Subject" component={SubjectFilter} />
        <Tab.Screen name="Topic" component={TopicFilter} />
      </Tab.Navigator>
    </View>
  );
};

export default FilterExam;
