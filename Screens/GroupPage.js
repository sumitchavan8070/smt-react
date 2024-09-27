import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList, // Added FlatList import
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
import CreateGroupModel from "../Components/Group/CreateGroupModel";
import { Color } from "../GlobalStyles";
import LoadingAnimation from "../Components/Loader/loader";
import LottieView from "lottie-react-native";
import AssetPath from "../lib/utility/constants/asset_path";

const GroupPage = ({
  groups,
  setGroups,
  loading,
  setLoading,
  fetchGroup,
  currentUser,
}) => {
  // const [currentUser, setCurrentUser] = useState("");
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState("");
  const [isCreateGroupModalVisible, setCreateGroupModalVisible] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const colorTray = [Color.primaryColor, Color.green, Color.red, Color.yellow];
  const [showMenu, setShowMenu] = useState(false);

  const handleJoinGroup = (groupId) => {
    // Implement join group functionality
  };

  const handleCreateGroupPress = () => {
    setCreateGroupModalVisible(true);
  };

  const handleCloseModal = () => {
    setCreateGroupModalVisible(false);
    fetchGroup();
  };

  const handleGroupPress = (group, index) => {
    navigation.navigate("GroupChatPage", {
      groupId: group._id,
      groupName: group.name,
      groupIcon: group.profilePic,
      groupIndex: index,
      groupMembers: group.members,
      groupInfo: group,
      currentUser,
    });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowMenu(!showMenu)}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleCreateGroupPress}
          >
            <FontAwesome5 name="plus" size={20} color="black" />
            <Text style={styles.menuText}>Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Join Group pressed")}
          >
            <MaterialIcons name="group-add" size={25} color="black" />
            <Text style={styles.menuText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      )}

     
      {groups.length === 0 ? (
        <View style={styles.noGroupCard}>
          <LottieView
            source={AssetPath.group} // Replace with your animation JSON file
            autoPlay
            loop={true}
            style={styles.animation}
          />
          <Text style={styles.noGroupsText}>No Groups Found</Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item._id}
              style={styles.groupItem}
              onPress={() => handleGroupPress(item, index)}
            >
              <FontAwesome5
                name="users"
                size={24}
                style={[
                  styles.groupIcon,
                  { color: colorTray[index % colorTray.length] },
                ]}
              />
              <View style={styles.groupTextContainer}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupDescription}>
                  {item.latestMessage &&
                    item.latestMessage.length > 15 &&
                    item.latestMessage.slice(0, 15) + "..."}
                </Text>
              </View>
              <Text style={styles.memberCount}>
                Members: {item.members.length}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}

      <Modal
        visible={isCreateGroupModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <CreateGroupModel onClose={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  noGroupCard: {
    // backgroundColor: Color.primaryColor,
    // flexGrow: 1,
  },
  animation: {
    width: "100%",
    height: "90%",
    alignSelf: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: "10%",
    right: 20,
    backgroundColor: "#6949ff",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    bottom: "20%",
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    zIndex: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  menuText: {
    marginLeft: 10,
  },
  container: {
    // flex: 1,
    // padding: 20,
    paddingVertical: 5,
    backgroundColor: Color.colorWhite,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignSelf: "center",
    gap: 50,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  groupItem: {
    // backgroundColor: "#f0f0f0",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  groupIcon: {
    marginRight: 20,
  },
  groupTextContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupDescription: {
    fontSize: 14,
    color: "#666",
  },
  memberCount: {
    fontSize: 14,
    color: "#666",
  },
  noGroupsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default GroupPage;
