import axios from 'axios';
import globalStrings from '../constants/globalStrings';


axios.defaults.baseURL = globalStrings.BASE_URL;


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
    throw error;
  }
}

async function postRequest({ apiEndPoint, postData }) {
  try {
    console.log(`~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest Start  ${postData}  ~~~~~~~~~~~~~~~~~~~~`);

    const response = await axios.post(apiEndPoint, postData);

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    console.log(`~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest End ~~~~~~~~~~~~~~~~~~~~`);

    return response;
  } catch (error) {
    console.error('Error in postRequest:', error);
    throw error;
  }
}

export { getRequest, postRequest };
