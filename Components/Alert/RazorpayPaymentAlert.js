// import React from "react";
// import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

// const RazorpayPaymentAlert = ({ visible, message, onClose }) => {
//   return (
//     <Modal
//       transparent={true}
//       animationType="fade"
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.alertBox}>
//           <Text style={styles.alertMessage}>{message}</Text>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   alertBox: {
//     width: 300,
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   alertMessage: {
//     marginBottom: 20,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   closeButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#09518e",
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default RazorpayPaymentAlert;

import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AssetPath from "../../lib/utility/constants/asset_path";

const RazorpayPaymentAlert = ({ visible, message, onClose, isSuccess }) => {
  // Set the image based on success or failure
  const imageSource = isSuccess
    ? AssetPath.success // Path to your success image
    : AssetPath.cancel; // Path to your failed image

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          <Image source={imageSource} style={styles.alertImage} />
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertImage: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  alertMessage: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#09518e",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RazorpayPaymentAlert;
