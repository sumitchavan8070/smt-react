import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const App = () => {
  const [courseProgress, setCourseProgress] = useState(60);
  const [selectedTab, setSelectedTab] = useState('Today');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };


cardData = [

  {
    "title" : "", 
    "decreption" : "", 
    "asset" : "", 
  }
]; 




  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} />
        <Text style={styles.heading}>Gradding</Text>
        <TouchableOpacity style={styles.notificationIcon} />
      </View>
      <View style={styles.liveClass}>
        <Text style={styles.liveClassText}>Your IELTS Class is Now LIVE!</Text>
        <View style={styles.liveClassButton}>
          <Text style={styles.liveClassTime}>10 AM - 11 AM</Text>
          <View style={styles.playIcon} />
        </View>
      </View>
      <View style={styles.courseProgress}>
        <Text style={styles.courseProgressTitle}>My Course Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${courseProgress}%` },
            ]}
          />
        </View>
        <Text style={styles.courseProgressPercentage}>{courseProgress}%</Text>
        <View style={styles.trophyIcon} />
      </View>
      <View style={styles.sections}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mock Tests</Text>
          <Text style={styles.sectionSubtitle}>
            Practice Makes a Man Perfect!
          </Text>
          <Image
            source={require('./assets/home/image1.png')}
            style={styles.sectionImage}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Tests</Text>
          <Text style={styles.sectionSubtitle}>
            Practice Makes a Man Perfect!
          </Text>
          <Image
            source={require('./assets/home/image2.png')}
            style={styles.sectionImage}
          />
        </View>
      </View>

      <View style={styles.tasks}>
        <Text style={styles.tasksTitle}>My Tasks</Text>
        <View style={styles.tasksTabs}>
          <TouchableOpacity
            style={[
              styles.tasksTab,
              selectedTab === 'Today' && styles.tasksTabActive,
            ]}
            onPress={() => handleTabPress('Today')}
          >
            <Text
              style={[
                styles.tasksTabText,
                selectedTab === 'Today' && styles.tasksTabTextActive,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tasksTab,
              selectedTab === 'Missed' && styles.tasksTabActive,
            ]}
            onPress={() => handleTabPress('Missed')}
          >
            <Text
              style={[
                styles.tasksTabText,
                selectedTab === 'Missed' && styles.tasksTabTextActive,
              ]}
            >
              Missed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tasksList}>
          <View style={styles.taskList}>
            <Text style={styles.taskListTitle}>Mock Test 2</Text>
            <Text style={styles.taskListTime}>30 Min</Text>
          </View>
          <View style={styles.taskList}>
            <Text style={styles.taskListTitle}>Mock Test 2</Text>
            <Text style={styles.taskListTime}>30 Min</Text>
          </View>
          <View style={styles.taskList}>
            <Text style={styles.taskListTitle}>Mock Test 2</Text>
            <Text style={styles.taskListTime}>30 Min</Text>
          </View>
        </View>
      </View>
      <View style={styles.shortlistCourses}>
        <Text style={styles.shortlistCoursesTitle}>Shortlist Courses</Text>
        <Text style={styles.shortlistCoursesText}>
          While you pay attention to your IELTS
          preparation, we will shortlist courses
          and universities for you!
        </Text>
        <TouchableOpacity style={styles.shortlistCoursesButton}>
          <Text style={styles.shortlistCoursesButtonText}>
            Help Me Study Abroad
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gift}>
        <View style={styles.giftIcon} />
        <Text style={styles.giftText}>Free Gift Awaits You!</Text>
        <TouchableOpacity style={styles.giftButton}>
          <Text style={styles.giftButtonText}>
            Upgrade your account 
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  notificationIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  liveClass: {
    backgroundColor: '#007bff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  liveClassText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  liveClassButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  liveClassTime: {
    fontSize: 16,
    color: '#007bff',
  },
  playIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#f00',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseProgress: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  courseProgressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  courseProgressPercentage: {
    fontSize: 16,
    marginBottom: 10,
  },
  trophyIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#ffdd00',
    borderRadius: 5,
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  sectionImage: {
    width: 80,
    height: 80,
  },
  sectionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionButton: {
    width: 30,
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  sectionButtonActive: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  tasks: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tasksTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tasksTab: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  tasksTabActive: {
    backgroundColor: '#007bff',
  },
  tasksTabText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  tasksTabTextActive: {
    color: '#fff',
  },
  tasksList: {
    marginTop: 10,
  },
  taskList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskListTitle: {
    fontSize: 16,
  },
  taskListTime: {
    fontSize: 14,
    color: '#999',
  },
  shortlistCourses: {
    backgroundColor: '#000',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  shortlistCoursesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffdd00',
    marginBottom: 10,
  },
  shortlistCoursesText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  shortlistCoursesButton: {
    backgroundColor: '#ffdd00',
    padding: 10,
    borderRadius: 5,
  },
  shortlistCoursesButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  gift: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  giftIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#ffdd00',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftText: {
    fontSize: 16,
    marginBottom: 10,
  },
  giftButton: {
    backgroundColor: '#ffdd00',
    padding: 10,
    borderRadius: 5,
  },
  giftButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default App;
