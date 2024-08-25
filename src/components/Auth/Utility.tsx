import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    // console.log("this is decode", decodedToken);
    
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; 
  }
};
