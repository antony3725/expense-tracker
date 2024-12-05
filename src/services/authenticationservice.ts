import BaseURL from '../services/axios'

class APIAuthenticationService {
  
  Login(Email: string, Password: string) {
    debugger;
    return BaseURL.post(
      "Auth/Login?Email=" + Email + "&Password=" + Password + ""
    );
  }
}

export default new APIAuthenticationService();
