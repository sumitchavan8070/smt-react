import {postRequest} from '../../utility/requests/api_call';
import ApiEndPoints from '../../utility/requests/api_end_points';

export default async function appUpdateApi({appName, appType}) {
  let response;

  const apiEndPoint = ApiEndPoints.appUpdate;

  const postData = {
    app_name: appName,
    app_type: appType,
  };

  isLoading = true;

  try {
    response = await postRequest({
      apiEndPoint: apiEndPoint,
      postData: postData,
    });

    console.log(`------------ postData : ${postData} ------------`);
  } catch (error) {
    console.error('appUpdateApi error : ', error);
    isLoading = false;
  }

  return response;
}
