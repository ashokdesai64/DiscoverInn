export async function callAPI(url, data, method = 'POST') {
  return new Promise(async (resolve, reject) => {
    let formdata = new FormData();

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
        formdata.append(key, data[key]);
      });
      apiSkeleton['body'] = formdata;
    }

    let response = await fetch(url, apiSkeleton);
    let apiResponse = await response.json();
    resolve(apiResponse);
  });
}
