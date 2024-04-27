import axios from "axios";

const API_BASE_URL = "https://kid-care.onrender.com";

const authService = {
  login: async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login`,
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
};

export default authService;
