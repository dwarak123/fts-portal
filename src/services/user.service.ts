import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://dtmrapp.azurewebsites.net/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  upload(file: string | Blob, onUploadProgress: any, email: any) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("email", email);

    return axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
}
}
export default new UserService();
