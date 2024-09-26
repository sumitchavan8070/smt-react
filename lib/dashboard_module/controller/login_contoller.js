import { postRequest } from "../../../utils/request/api_call";
import ApiEndPoints from "../../../utils/request/api_end_points";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function clientLogin( email, password) {
    var status = 0; 
    var response ; 
    let isLoading = false; // Correctly initialize the boolean

    const apiEndPoint = ApiEndPoints.login;  

    const postData = {
      email: email,
      password: password,
    };
    
    isLoading = true ; 

    try {
       response = await postRequest({
        apiEndPoint: apiEndPoint,
        postData: postData,
      });

      console.log(`------------ postData : ${postData} ------------`);
      

    } catch (error) {
      console.error('getting error while login', error);
    isLoading = false ; 

    }finally{
    isLoading = false ; 

    }

    var success = response.data["success"];  



    if (success == true ){
     
      await AsyncStorage.setItem("@auth", JSON.stringify(response.data));
      status = 1; 

    }

    return status ; 
  }
  
  // clientLogin();
  