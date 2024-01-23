import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

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
export function textDotDot(mytextvar, maxlimit) {
  return mytextvar.length > maxlimit
    ? mytextvar.substring(0, maxlimit - 3) + "..."
    : mytextvar;
}
export function getRandomValueRange(min, max) {
  return Math.random() * (max - min) + min;
}
