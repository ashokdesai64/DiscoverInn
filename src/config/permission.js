import {PermissionsAndroid} from 'react-native';
export async function askForPermissions() {
  return new Promise(async(resolve, reject) => {
    
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ]).then(result => {
      console.log("permission result => ",JSON.stringify(result))
      if (
        result['android.permission.ACCESS_COARSE_LOCATION'] &&
        result['android.permission.CAMERA'] &&
        result['android.permission.ACCESS_FINE_LOCATION'] &&
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        resolve(true);
      } else if (
        result['android.permission.ACCESS_COARSE_LOCATION'] ||
        result['android.permission.CAMERA'] ||
        result['android.permission.ACCESS_FINE_LOCATION'] ||
        result['android.permission.READ_EXTERNAL_STORAGE'] ||
        result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          'never_ask_again'
      ) {
        reject(false);
      }
    });
  });
}

export async function checkIfHasPermission(permissionType) {
  let permissions = {
    location: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    write_storage: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  };
  return await PermissionsAndroid.check(permissions[permissionType]);
}
