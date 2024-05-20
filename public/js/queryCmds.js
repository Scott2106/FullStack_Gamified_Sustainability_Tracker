// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
//=====================================================================================
// AXIOS METHOD
// This function uses the axios method to make a request to the server.
//=====================================================================================
async function axiosMethod(url, callback, method = "GET", data = null, token = null) {
  console.log("axiosMethod ", url, method, data, token);

  const headers = {};

  if (data) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const axiosConfig = {
    method: method.toUpperCase(),
    url: url,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(axiosConfig);
    callback(response.status, response.data);
  } catch (error) {
    console.error(`Error from ${method} ${url}:`, error);
    callback(error, error.response.data);
  }
}
