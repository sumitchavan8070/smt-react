import React, { useState } from "react";
import { EmailSVG , SvgComponent , ShowPassSVG } from "../../../assets/svg_image/app_support_svg";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import LoadingAnimation from "../../utility/constants/loader";
import IosAlertWithImage from "../../../Components/Alert/IosAlertWithImage";
import clientLogin from "../controller/login_contoller";
import { Color } from "../../../GlobalStyles";
import { AppColors } from "../../utility/constants/app_colors";
import { CustonElevatedButton , OutlinedButton} from "../../utility/constants/custom_button";

const COLORS = {
  primary: Color.primaryColor,
  background: "#fff",
  textPrimary: "#05375a",
  textSecondary: "#666666",
  buttonStart: "#8f94fb",
  buttonEnd: "#4e54c8",
  error: "#FF0000",
  success: "green",
};

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
    secureTextEntry: true,
    formKey: 'loginForm', 
  });

  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const { colors } = useTheme();

  const handleInputChange = (field, value, formKey) => {
    if (formKey === data.formKey) {
      if (field === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setData((prev) => ({ ...prev, email: value, isValidEmail }));
      } else if (field === "password") {
        const isValidPassword = value.trim().length >= 8;
        setData((prev) => ({ ...prev, password: value, isValidPassword }));
      }
    }
  };

  const toggleSecureTextEntry = () => {
    setData((prev) => ({ ...prev, secureTextEntry: !prev.secureTextEntry }));
  };

  const showAlert = (message, isSuccess) => {
    setAlertMessage(message);
    setAlertSuccess(isSuccess);
    setAlertVisible(true);
  };

  const validateForm = (formKey) => {
    if (formKey === data.formKey) {
      const { email, password } = data;

      if (!email) {
        showAlert("Email is required", false);
        return false;
      } else if (!password) {
        showAlert("Password is required", false);
        return false;
      } else if (!data.isValidEmail) {
        showAlert("Invalid email format", false);
        return false;
      } else if (!data.isValidPassword) {
        showAlert("Password must be at least 8 characters long", false);
        return false;
      }
      return true;
    }
    return false;
  };

  const _clientLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);

    // Validate form before proceeding
    if (!validateForm(data.formKey)) {
      setLoading(false);
      return;
    }

    const { email, password } = data;
    const loginStatus = await clientLogin(email, password);
    setLoading(false);

    if (loginStatus === 1) {
      console.log('loginStatus:', loginStatus);
      setLoading(false); 
      navigation.navigate("Do");
    } else {
      showAlert("Login failed. Please check your credentials.", false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading && <LoadingAnimation visible={loading} loop={true} />}
      <IosAlertWithImage
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        isSuccess={alertSuccess}
      />

      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={[styles.action, { flexDirection: 'row', alignItems: 'center' }]}>
          <EmailSVG  width={20} height={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={COLORS.textSecondary}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(val) => handleInputChange("email", val, data.formKey)}
          />
        </View>
        {!data.isValidEmail && (
          <Text style={styles.errorMsg}>Invalid email format.</Text>
        )}

        <Text style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handleInputChange("password", val, data.formKey)}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            {data.secureTextEntry ? (
              <ShowPassSVG width={20} height={20} />
            ) : (
              <SvgComponent width={20} height={20} />
            )}  
          </TouchableOpacity>
        </View>
        {!data.isValidPassword && (
          <Text style={styles.errorMsg}>
            Password must be at least 8 characters long.
          </Text>
        )}


          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity>
              <Text style={{ color: AppColors.toryBlue, marginTop: 15 }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

        
          <View style={{ flex: 0, flexDirection: 'column', marginTop: 50 }}>
            <CustonElevatedButton
              title={loading ? "Loading..." : "Login"}
              onPress={_clientLogin}
              backgroundColor={AppColors.toryBlue}
              textColor="#FFFFFF"
              style={{ flex: 0, width: '100%' }} 
              width={400}
            />
    
          </View>

          <View style={{  flexDirection: 'column',  marginTop: 20 }}>
                 
          <OutlinedButton
              title="Register"
              onPress={() => navigation.navigate("Register")}
              borderColor={AppColors.toryBlue}
              textColor={AppColors.toryBlue}
              style={{  width: '100%' }} // Full width
            />
    
          </View>



       

      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 20, paddingBottom: 20 },
  footer: { flex: 3, backgroundColor: COLORS.background, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30 },
  text_header: { color: "#fff", fontWeight: "bold", fontSize: 30 },
  text_footer: { color: COLORS.textPrimary, fontSize: 18 },
  action: { flexDirection: "row", marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#f2f2f2", paddingBottom: 5 },
  textInput: { flex: 1, marginTop: Platform.OS === "ios" ? 0 : -5, paddingLeft: 10 },
  errorMsg: { color: COLORS.error, fontSize: 14, marginTop: 5 },
  button: { alignItems: "center", marginTop: 50 },
  signIn: { width: "100%", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 },
  textSign: { fontSize: 18, fontWeight: "bold" },
});

export default Login;
