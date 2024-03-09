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
};

export default authService;
