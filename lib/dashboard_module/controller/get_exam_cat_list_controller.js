import { getRequest } from "../../utility/requests/api_call";
import ApiEndPoints from "../../utility/requests/api_end_points";


export default async function getExamCatList() {
    var status = 0; 
    var response ; 
    let isLoading = false; // Correctly initialize the boolean

    const apiEndPoint = ApiEndPoints.getExamCatList;  


    
    isLoading = true ; 

    try {
       response = await getRequest({ apiEndPoint });

    } catch (error) {
      console.error('getting error while login', error);
      isLoading = false ; 

    }finally{
      isLoading = false ; 

    }





    return status ; 
  }
  
  // clientLogin();
  