import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import axios from "axios";

const GoogleAuth = () => {
    
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const res = await axios.post("http://localhost:3000/api/auth/google", {
      token,
    });
    localStorage.setItem("smartbudget_token", res.data.jwt); 
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
    />
  );
};

export default GoogleAuth;
