import axios from "axios";

const API_BASE_URL = "http://3.129.148.71:3000";

const authService = {
  login: async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/loginAll`,
      credentials
    );
    return response;
  },

  register: async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/register`,
      userData
    );
    return response;
  },
  forgotPassword: async (email) => {
    const response = await axios.post(
      `${API_BASE_URL}/password/forgot-password`,
      { email }
    );
    return response;
  },
  resetPassword: async (token, password) => {
    const response = await axios.post(
      `${API_BASE_URL}/password/reset-password/${token}`,

      { password }
    );
    return response;
  },

  sendDataFromBrofileToBackend: async (token, data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/updateprofile`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getDataFromBackendToBrofile: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/getprofile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  fetchUserStats: async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/owner/filterUser`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  fetchAdminCount: async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/owner/adminCount`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  fetchUserCount: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/owner/userCount`, {
      headers: { Authorization: token },
    });
    return response.data;
  },
  deleteAdmin: async (token, email) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/owner/deleteAdmin`,
      {
        headers: { Authorization: token },
        data: { email },
      }
    );
    return response.data;
  },

  updateAdmin: async (token, adminData) => {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/owner/updateAdmin`,
      adminData,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  addAdmin: async (token, adminData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/owner/addAdmin`,
      adminData,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  fetchAllAdmins: async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/owner/getAllAdmins`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data.admins;
  },

  addVaccination: async (id, name) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/Item/create_Item`,
        { name },
        {
          headers: {
            category: id,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getPhotosAdmin: async (token, id) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/getPhotosAdmin`, {
      headers: {
        Authorization: token,
        id: id,
      },
    });
    return response.data;
  },
  getPhotos: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/getPhotos`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },
  postPhoto: async (token, photo) => {
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/postPhoto`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  getUserData: async (token, id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/getUserData`, {
        headers: {
          Authorization: token,
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authService;
