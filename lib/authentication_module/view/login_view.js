import React, { useState } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import LoadingAnimation from "../../utility/constants/loader";
import IosAlertWithImage from "../../../Components/Alert/IosAlertWithImage";
import clientLogin from "../controller/login_contoller";
import { Color } from "../../../GlobalStyles";
import { AuthContext } from "../../Context/authContext";

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
  });
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const { colors } = useTheme();

  const handleInputChange = (field, value) => {
    if (field === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setData((prev) => ({ ...prev, email: value, isValidEmail }));
    } else if (field === "password") {
      const isValidPassword = value.trim().length >= 8;
      setData((prev) => ({ ...prev, password: value, isValidPassword }));
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

  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const { email, password } = data;

    if (!email || !password) {
      showAlert("All fields are required", false);
      setLoading(false);
      return;
    }

    const loginStatus = await clientLogin(email, password);
    setLoading(false);
    if (loginStatus === 1) {
      console.log('loginStatus:', loginStatus);
      setLoading(false); 
 
      navigation.navigate("Home");
     
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
        <View style={styles.action}>
          <FontAwesome name="envelope" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={COLORS.textSecondary}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(val) => handleInputChange("email", val)}
          />
          {data.isValidEmail && data.email && (
            <Feather name="check-circle" color={COLORS.success} size={20} />
          )}
        </View>
        {!data.isValidEmail && (
          <Text style={styles.errorMsg}>Invalid email format.</Text>
        )}

        <Text style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handleInputChange("password", val)}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {!data.isValidPassword && (
          <Text style={styles.errorMsg}>
            Password must be at least 8 characters long.
          </Text>
        )}

        <TouchableOpacity>
          <Text style={{ color: COLORS.primary, marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={[COLORS.buttonStart, COLORS.buttonEnd]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={[styles.signIn, { borderColor: COLORS.primary, borderWidth: 1, marginTop: 15 }]}
          >
            <Text style={[styles.textSign, { color: COLORS.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
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
