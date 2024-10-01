import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import globalStrings from '../lib/utility/constants/globalStrings';
//context
const AuthContext = createContext();

//provider
const AuthProvider = ({children}) => {
  //golbal state
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  // initial local storage data
  // useEffect(() => {
  //   const loadLoaclStorageData = async () => {
  //     let data = await AsyncStorage.getItem('@auth');

  //     let rawData = JSON.stringify(data);
  //     let loginData = JSON.parse(rawData);

  //     console.log(`loginData : ${loginData}`);
  //     // console.error(`appUser : ${loginData?.data.user}`);
  //     // console.error(`appUser : ${loginData?.user}`);

  //     console.log('--> user -->', loginData.token);

  //     setState({...state, user: loginData?.user, token: loginData?.token});
  //   };
  //   loadLoaclStorageData();
  // }, []);

  useEffect(() => {
    const loadLoaclStorageData = async () => {
      let data = await AsyncStorage.getItem('@auth');
      if (data) {
        let loginData = JSON.parse(data); // Correctly parse the string data into an object

        console.log(`loginData : ${loginData}`);

        setState({...state, user: loginData?.user, token: loginData?.token});
      } else {
        console.error('No data found in AsyncStorage');
      }
    };
    loadLoaclStorageData();
  }, []);

  let token = state && state.token;

  //default axios setting
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.baseURL = globalStrings.BASE_URL;
  // utils >> globalstring

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};

/*
 Error Solution for 
 The issue lies in how you're processing the data retrieved from `AsyncStorage`. Specifically, 
 you're using `JSON.stringify` on `data` which is already a JSON string, and then parsing it back into an object. 
 This creates an incorrect structure and leads to `undefined` values for `loginData`.

### Problem:
You're doing:
```javascript
let rawData = JSON.stringify(data); // Incorrect: data is already a string
let loginData = JSON.parse(rawData); // This parses the stringified version of a string, which breaks the structure
```

### Solution:
You should directly parse `data` since it's already in JSON format. Here's the correct way:

### Fixed code:
```javascript
useEffect(() => {
  const loadLoaclStorageData = async () => {
    let data = await AsyncStorage.getItem('@auth');
    if (data) {
      let loginData = JSON.parse(data); // Correctly parse the string data into an object

      console.log(`loginData : ${loginData}`);

      setState({...state, user: loginData?.user, token: loginData?.token});
    } else {
      console.error('No data found in AsyncStorage');
    }
  };
  loadLoaclStorageData();
}, []);
```

### Explanation:
1. `AsyncStorage.getItem('@auth')` returns a string, not an object.
2. You should parse the string directly using `JSON.parse(data)` to convert it into a valid JavaScript object.
3. By removing `JSON.stringify`, this correctly handles the `loginData` structure, allowing access to `user` and `token`.

Now, `loginData?.user` and `loginData?.token` should be correctly populated. 
 */
