import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://dtmrapp.azurewebsites.net/api/user/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  upload(file: File | undefined, email: any) {
    let formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("email", email);

    return axios
      .put(API_URL + "uploadphoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        /*if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }*/
        return response.data;
      });
  }
}
export default new UserService();
