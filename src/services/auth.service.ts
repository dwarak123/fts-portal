import axios from "axios";

const API_URL = "https://dtmrapp.azurewebsites.net/api/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "auth/signin", {
        email,
        password
      })
      .then(response => {
        console.log(JSON.stringify(response.data))
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(JSON.stringify(localStorage.getItem('user')));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.clear();
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "user/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    console.log(userStr)
    return null;
  }
}

export default new AuthService();