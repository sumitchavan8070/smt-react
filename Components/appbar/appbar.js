// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { SvgUri } from 'react-native-svg';
// import { useNavigation } from '@react-navigation/native';
// import { BlurView } from 'expo-blur';

// const GraddingAppBar = ({
//   openDrawer,
//   backButton = false,
//   title,
//   showActions = false,
//   showLeading = true,
//   centerTitle = false,
//   bgColor,
//   isBlur = false,
// }) => {
//   const navigation = useNavigation();

//   const handleBackPress = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   };

//   const appBarContent = (
//     <View style={[styles.appBar, { backgroundColor: bgColor || 'transparent' }]}>
//       {showLeading && (
//         <TouchableOpacity onPress={backButton ? handleBackPress : openDrawer} style={styles.iconWrapper}>
//           <SvgUri width="24" height="24" uri={require('../../assets/back.svg')} />
//         </TouchableOpacity>
//       )}
//       {title ? (
//         <Text style={styles.title}>{title}</Text>
//       ) : (
//         <SvgUri width="24" height="24" uri={require('../../assets/back.svg')} />
//       )}
//       {showActions && (
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconWrapper}>
//           <SvgUri width="24" height="24" uri={require('../../assets/back.svg')} />
          
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   if (isBlur) {
//     return (
//       <BlurView intensity={50} style={styles.blurContainer}>
//         {appBarContent}
//       </BlurView>
//     );
//   }

//   return appBarContent;
// };

// const styles = StyleSheet.create({
//   appBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     height: 56, // Default toolbar height
//   },
//   blurContainer: {
//     marginTop: 24,
//     borderRadius: 14,
//     overflow: 'hidden',
//     height: 56,
//   },
//   iconWrapper: {
//     padding: 8,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default GraddingAppBar;
