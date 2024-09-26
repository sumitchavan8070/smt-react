import axios from 'axios';
import globalStrings from '../constants/globalStrings';
import crashlytics from '@react-native-firebase/crashlytics';

axios.defaults.baseURL = globalStrings.BASE_URL;

const updateCrashlytics = async (error, apiEndPoint, requestData = null) => {
  if (!__DEV__) {  
    try {

      await crashlytics().recordError(new Error(`API ERROR: ${apiEndPoint}`), error.stack);

      await crashlytics().setAttributes({
        api_end_point: apiEndPoint,
        request_method: requestData ? 'POST' : 'GET',
      });

      if (requestData) {
        await crashlytics().setCustomKey("request_data", JSON.stringify(requestData));
      }
    } catch (crashlyticsError) {
      console.error('Failed to log error in Crashlytics:', crashlyticsError);
    }
  }
};


async function getRequest({ apiEndPoint }) {
  console.log(`------------ ${apiEndPoint} getRequest Start ------------`);
  try {
    const response = await axios.get(apiEndPoint);

    console.log(`------------ ${apiEndPoint} getRequest End ------------`);

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error in getRequest:', error);
    
    await updateCrashlytics(error, apiEndPoint);

    throw error;  
  }
}



async function postRequest({ apiEndPoint, postData }) {
  console.log(`------------------------ ${apiEndPoint} postRequest Start  ${postData}  ------------------------`);
  try {
    const response = await axios.post(apiEndPoint, postData);

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    console.log(`~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest End ~~~~~~~~~~~~~~~~~~~~`);

    return response;
  } catch (error) {
    console.error('Error in postRequest:', error);

    await updateCrashlytics(error, apiEndPoint, postData);

    throw error;  
  }
}

export { getRequest, postRequest };
