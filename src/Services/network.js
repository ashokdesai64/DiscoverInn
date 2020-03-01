export async function callAPI(url, data, method = 'POST') {
  return new Promise(async (resolve, reject) => {
    let formData = new FormData();

    let apiSkeleton = {
      method,
      headers: {
        'Content-Type': 'multipart/form-data',
        header: 'a2309455-13c0-4b5a-b9c1-5e9e65dc0704',
      },
    };
    let keys = Object.keys(data);
    if (keys.length > 0) {
      keys.forEach(key => {
        if (Array.isArray(data[key])) {
          data[key].forEach(value => formData.append(key + '[]', value));
        } else {
          formData.append(key, data[key]);
        }
      });
      apiSkeleton['body'] = formData;
    }

    console.log('formdata => ', url,formData);
    let response = await fetch(url, apiSkeleton);
    console.log('response => ', response);
    let apiResponse = await response.json();
    console.log('url ' + url + ' => ', apiResponse);
    resolve(apiResponse);
  });
}
