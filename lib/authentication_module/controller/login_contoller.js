import { postRequest } from "../../utility/requests/api_call";
import ApiEndPoints from "../../utility/requests/api_end_points";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function clientLogin( email, password) {
    var status = 0; 
    var response ; 
    let isLoading = false; 


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

      console.log(`------------ response : ${response} ------------`);
      

    } catch (error) {
      console.error('getting error while login', error);
     isLoading = false ; 

    }finally{
    isLoading = false ; 

    }

    var success = response.data["success"];  



    let apiResponse = JSON.stringify(response); 
    console.log(`apiResponse: ${apiResponse}`);


    if (success == true ){
      await AsyncStorage.setItem("@auth", apiResponse);
      status = 1; 
    }

    return status ; 
  }
  
  // clientLogin();
  