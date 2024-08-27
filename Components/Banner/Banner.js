

// import React, { useEffect, useLayoutEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import Carousel, { PaginationLight } from "react-native-x-carousel";
// import axios from "axios";

// const { width } = Dimensions.get("window");

// const Banner = ({ banners = [], bannerLoading = false }) => {

//   const renderItem = (data) => (
//     <View key={data._id} style={styles.cardContainer}>
//       <Pressable onPress={() => alert(`Banner ID: ${data._id}`)}>
//         <View style={styles.cardWrapper}>
//           <Image style={styles.card} source={{ uri: data.coverImageUri }} />
//           {data.cornerLabelText && (
//             <View
//               style={[
//                 styles.cornerLabel,
//                 { backgroundColor: data.cornerLabelColor || "#000" },
//               ]}
//             >
//               <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
//             </View>
//           )}
//         </View>
//       </Pressable>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Carousel
//         pagination={PaginationLight}
//         renderItem={renderItem}
//         data={banners}
//         loop
//         autoplay
//         autoplayInterval={3000}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 5,
//     alignSelf: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   cardContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   cardWrapper: {
//     overflow: "hidden",
//     borderRadius: 12,
//   },
//   card: {
//     width: width * 0.9,
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 12,
//   },
//   cornerLabel: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: "#000",
//   },
//   cornerLabelText: {
//     fontSize: 14,
//     color: "#fff",
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

// export default Banner;
