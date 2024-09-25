import { postRequest } from "../../../utils/request/api_call";
import ApiEndPoints from "../../../utils/request/api_end_points";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function clientLogin( email, password) {
    var status = 0; 
    var response ; 
    const apiEndPoint = ApiEndPoints.login;  

    const postData = {
      email: email,
      password: password,
    };
    

    try {
       response = await postRequest({
        apiEndPoint: apiEndPoint,
        postData: postData,
      });

      console.log('User l:', email, password,postData);
      

  
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('getting error while login', error);
    }

    var success = response.data["success"];  



    if (success == true ){
    console.log("user logged in successfully "); 
     await AsyncStorage.setItem("@auth", JSON.stringify(response.data));
    status = 1; 


    }

    return status ; 
  }
  
  // clientLogin();
  