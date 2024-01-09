import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert, Platform } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import RNFS from 'react-native-fs';

export const genericWidth = (ratio) => scale(ratio);
export const genericHeight = (ratio) => verticalScale(ratio);
export const genericRatio = (ratio) => moderateScale(ratio);

// export const dispatch = useDispatch()

export const screenNavigation = (navigation, path = "", data = {}) => {
  // console.log("navigation", navigation)
  navigation.navigate(path, data);
};
export const hardScreenNavigation = (navigaiton, name = "", params = {}) =>
  navigaiton.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    })
  );
export const HttpToastMsg = (msg = "") => showToastMsg("info", msg);

export function showToastMsg(type = "success", msg = "", position = "bottom") {
  // success, error, info
  return Toast.show({
    type, //'success' | 'error' | 'info'
    text1: msg,
    position,
  });
}
export function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
export const CANCEL_INDEX = 0;
export const DESTRUCTIVE_INDEX = 4;
export const BOTTOMSHEET_BUTTON = ["Cancel", "Camera", "Gallery"];

export const openCamera = (cb) => {
  const _platform =
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  request(_platform).then((result) => {
    console.log(result);
    if (result === "granted") {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          Alert(response.customButton);
        } else {
          const image = response.assets[0];
          cb(image);
        }
      });
    }
  });
};
export const pickImageFromGallery = (cb) => {
  let options = {
    mediaType: "photo",
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
  };
  launchImageLibrary(options, (response) => {
    console.log("Response = ", response);

    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
      Alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log("response", JSON.stringify(response));
      const image = response.assets[0];
      cb(image);
    }
  });
};

export function textDotDot(mytextvar, maxlimit) {
  return mytextvar.length > maxlimit
    ? mytextvar.substring(0, maxlimit - 3) + "..."
    : mytextvar;
}
export function getRandomValueRange(min, max) {
  return Math.random() * (max - min) + min;
}


export function isIOSPlateform() {
  return Platform.OS === 'ios'
}


// `Insert a string here: ${string}`

export const LocalFilePath = () => {
  let localDirectoryPath;
  if (Platform.OS === "android") {
    localDirectoryPath = Platform.constants['Release'] >= 13 ? '/storage/emulated/0/Android/media' : RNFS.ExternalStorageDirectoryPath
  } else {
    localDirectoryPath = RNFS.LibraryDirectoryPath
  }
  return localDirectoryPath
}

export const checkExistFolderCreate = (initialFolder = '', childrenFolder = '') => {
  let path_name;
  let localDirectoryPath = LocalFilePath()
  if (!childrenFolder) {
    path_name = localDirectoryPath + '/' + initialFolder + '/' + childrenFolder;
  } else {
    path_name = localDirectoryPath + '/' + initialFolder;
  }
  return RNFS.exists(path_name).then((exist) => {
    if (!exist) {
      RNFS.mkdir(path_name)
    }
  })
}

export function getFileNameFromPath (str) {
  return str.substring(str.lastIndexOf('/')+1);
}



https://withfra.me/react-native-tutorials/face-id-authentication-in-react-native

const getDevicePublicKey = async () => {
    const { available } = await rnBiometrics.isSensorAvailable();

    if (available) {
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      if (keysExist) {
        await rnBiometrics.deleteKeys();
      }
      const { publicKey } = await rnBiometrics.createKeys();
      console.log("getDevicePublicKey => data => ", { publicKey });
      setPublicKey(publicKey)
    }
  }
const login = async () => {
    const timestamp = Math.round(new Date().getTime() / 1000,).toString();
    const payload = `${'77445511231321321213'}__${timestamp}`;
    try {

      const { success, signature } = await rnBiometrics.createSignature({ promptMessage: 'Sign in', payload, })
      console.log("login => ", { success, signature })
      if (!success) return console.warn('skip by user')

      console.log('------------------------------------------------------------')
      console.log('login => isVerified => ', {signature, payload})
      console.log('------------------------------------------------------------')
      

    } catch (err) {
      console.log('login => error => ', JSON.stringify(err))
    }
  }
