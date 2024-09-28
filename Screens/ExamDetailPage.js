import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import getExamCatList from "../lib/dashboard_module/controller/get_exam_cat_list_controller";
import SecoundaryHeader from "../Components/Menus/SecoundaryHeader";
import PDFViewer from "../Components/PDF/PDFViewer";
import { useNavigation } from "@react-navigation/native";
import RNFS from "react-native-fs";
import IosAlertWithImage from "../Components/Alert/IosAlertWithImage";
import LoadingAnimation from "../lib/utility/constants/loader";
import { Color } from "../GlobalStyles";
import LottieView from "lottie-react-native";
import AssetPath from "../lib/utility/constants/asset_path";

const getDrivePdfUrl = (url) => {
  const match = url.match(/drive.google.com\/file\/d\/(.+?)\/view/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  console.log("url" + url);
  return url;
};

const ExamDetailPage = ({ route }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [eDetails, setEDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params } = route;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExamCatList();
        setCategoriesData(data);
        const getExam = data.find((item) => item._id === params?._id);
        setEDetails(getExam);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    };

    if (categoriesData.length === 0) {
      fetchData();
    }
  }, [params?._id, categoriesData]);

  const handleSolveBtn = () => {
    const examDetailCatName = eDetails.catName;
    const examDetailId = eDetails._id;

    const detailPageValue = {
      _id: examDetailId,
      catName: examDetailCatName,
    };

    // navigation.navigate("ChooseExamUpdated", {
    //   detailPageValue: detailPageValue,
    // });

    navigation.navigate("FilterExam", {
      detailPageValue: detailPageValue,
    });
  };

  const { width } = useWindowDimensions();

  const getCurrentDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const pdfFiles = (eDetails.pdfFiles || []).map((file, index) => ({
    heading: file.heading,
    source: getDrivePdfUrl(file.source),
    filename: `pdf_${getCurrentDateTimeString()}_${index}.pdf`,
  }));

  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handlePdfDownloadSuccess = () => {
    setIsSuccess(true);
    setAlertMessage("File downloaded successfully");
    setAlertVisible(true);
    setLoading(false); // Stop loader
  };

  const handlePdfDownloadFailure = (error) => {
    setIsSuccess(false);
    setAlertMessage("Something went wrong, Please try again.");
    setAlertVisible(true);
    setLoading(false); // Stop loader
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to save files.",
            // buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; 
    }
  };

  const handleDownlaodPdf = async (url, filename) => {
    const hasPermission = await requestStoragePermission();
    // console.log("Im here" + hasPermission);

    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "Please grant storage permission to download files.",
        [{ text: "OK" }]
      );
      setLoading(false); // Stop loader
      return;
    }
    setLoading(true); // Start loader

    try {
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${filename}`;
      const options = {
        fromUrl: url,
        toFile: downloadDest,
        background: true,
      };

      await RNFS.downloadFile(options).promise;
      handlePdfDownloadSuccess(); // Show success message
      // alert(`File downloaded to: ${downloadDest}`);
    } catch (error) {
      console.log(error);
      handlePdfDownloadFailure(error); // Handle errors
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <View style={styles.main}>
      <IosAlertWithImage
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
        isSuccess={isSuccess}
      />
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <SecoundaryHeader pageName="Exam Details" />
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={styles.title}>{eDetails?.catName}</Text>
        {pdfFiles.length == 0 ? (
          <>
            <LottieView
              source={AssetPath.yogaboy}
              autoPlay
              loop={true}
              style={styles.animation}
            />
          </>
        ) : (
          <PDFViewer
            pdfFiles={pdfFiles}
            handleDownlaodPdf={handleDownlaodPdf}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fabContainer} onPress={handleSolveBtn}>
        <LinearGradient colors={["#007BFF", "#00BFFF"]} style={styles.fab}>
          <Icon name="arrow-right" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#fff" },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: Color.primaryColor,
  },

  animation: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});

export default ExamDetailPage;
