import axios from "axios";
const baseURL = "http://3.129.148.71:3000/api/v1/";

export const postData = async (url, data, token, category, user) => {
  let result = [];
  await axios
    .post(baseURL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        category: category,
        user: user,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const getData = async (url, token, category, user) => {
  let result = [];
  await axios
    .get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        category: category,
        user: user,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const putData = async (url, data, token) => {
  let result = [];
  await axios
    .put(baseURL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

export const deleteData = async (url, token) => {
  let result = [];
  await axios
    .delete(baseURL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};
