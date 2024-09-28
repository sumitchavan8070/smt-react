import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  StyleSheet,
} from "react-native";
import { Color } from "../GlobalStyles";
import GroupPage from "./GroupPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomTest from "./CustomTest";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../Context/authContext";
import HeaderMenu from "../Components/Menus/HeaderMenu";

const Tab = createMaterialTopTabNavigator();

const CommonScreen = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [refreshing, setRefreshing] = useState(false);

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  // const [state] = useContext(AuthContext);
  // //auth condition true false
  // const authenticatedUser = state?.user && state?.token;

  // console.log("=====user=====" + JSON.stringify());

  // useEffect(() => {
  //   fetchGroups();
  // }, []);

  // const fetchGroups = async () => {
  //   const data = await AsyncStorage.getItem("@auth");
  //   let loginData = JSON.parse(data);
  //   let userId = loginData.user._id;
  //   setCurrentUser(loginData);

  //   await axios
  //     .get(`/groups/group/user/${userId}`)
  //     .then((response) => {
  //       setGroups(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching groups:", error);
  //       setLoading(false);
  //     });
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchGroups();
  //   }, [])
  // );

  // const getUserId = async () => {
  //   const data = await AsyncStorage.getItem("@auth");
  //   let loginData = JSON.parse(data);
  //   let userId = loginData.user._id;
  //   // console.log("======nkjsnkj====" + JSON.stringify(loginData.user._id));
  //   return loginData.user._id;
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // const id = getUserId();
  //     // console.log("======id===" + JSON.stringify(id));

  //     socketServices.emit("join_chat", state?.user._id);

  //     socketServices.on("new_chat", (values) => {
  //       console.log("======values===" + JSON.stringify(values));

  //       setGroups((previousMessages) => {
  //         let cloneArry = JSON.parse(JSON.stringify(previousMessages));
  //         console.log("======cloneArray===" + JSON.stringify(cloneArry));
  //         const index = cloneArry.findIndex((item) => item._id == values._id);
  //         if (index !== -1) {
  //           cloneArry.splice(index, 1);
  //         }
  //         cloneArry.unshift(values);
  //         return cloneArry;
  //       });
  //     });
  //     return () => removerListerns();
  //   }, [])
  // );

  // const removerListerns = () => {
  //   // const id = getUserId();
  //   socketServices.removeListener("new_chat");
  //   socketServices.emit("leave_chat", state?.user._id);
  // };

  // const fetchGroups = async () => {
  //   const data = await AsyncStorage.getItem("@auth");
  //   let loginData = JSON.parse(data);
  //   let userId = loginData.user._id;
  //   setCurrentUser(loginData);

  //   await axios
  //     .get(`/groups/group/user/${userId}`)
  //     .then((response) => {
  //       setGroups(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching groups:", error);
  //       setLoading(false);
  //     });
  // };

  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
      // console.log("im here");
    }, [])
  );

  const fetchGroups = async () => {
    const data = await AsyncStorage.getItem("@auth");
    let loginData = JSON.parse(data);
    let userId = loginData.user._id;
    setCurrentUser(loginData);

    try {
      const response = await axios.get(`/groups/group/user/${userId}`);
      let sortedGroups = response.data.sort((a, b) => {
        if (!a.lastMessageAt && !b.lastMessageAt) return 0;
        if (!a.lastMessageAt) return 1;
        if (!b.lastMessageAt) return -1;
        return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
      });
      setGroups(sortedGroups);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setLoading(false);
    }
  };

  return (
    // <NavigationContainer>
    <View style={styles.container}>
      <HeaderMenu />

      <Tab.Navigator
        // tabBarOptions={{
        //   labelStyle: styles.tabText,
        //   activeTintColor: Color.primaryColor,
        //   indicatorStyle: styles.activeTabIndicator,
        // }}
        screenOptions={{
          tabBarActiveTintColor: Color.primaryColor, // Active tab text color
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          }, 
          tabBarIndicatorStyle: {
            backgroundColor: Color.primaryColor, // Color of the indicator
            height: 2, // Height of the indicator
          }, // Style for active tab indicator
        }}
      >
        <Tab.Screen name="Groups">
          {() => (
            <GroupPage
              groups={groups}
              setGroups={setGroups}
              loading={loading}
              setLoading={setLoading}
              currentUser={currentUser}
              fetchGroup={fetchGroups}
            />
          )}
        </Tab.Screen>
        {/* <Tab.Screen name="Leaderboard" component={LeaderboardPage} /> */}
        <Tab.Screen name="Create Test" component={CustomTest} />

        {/* Add more screens as needed */}
      </Tab.Navigator>
    </View>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  selectedTabText: {
    color: Color.primaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabIndicator: {
    backgroundColor: Color.primaryColor,
    height: 2,
  },
});

export default CommonScreen;
