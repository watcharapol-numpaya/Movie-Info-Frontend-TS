import axios from "axios";
import { checkTokenExpiration } from "./jwtTokenService";

export const userApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_USER,
});

	
// Interceptors
userApiInstance.interceptors.request.use(async (req: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem("access_token") || null;
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken) {
    return req;
  }

  const isAccessTokenExpire = checkTokenExpiration(accessToken);
  const isRefreshTokenExpire = checkTokenExpiration(refreshToken);

  if (isRefreshTokenExpire) {
    return (window.location.href = "/sign-in");
  }

  if (isAccessTokenExpire) {
    const refreshUrl = `${import.meta.env.VITE_API_USER}refresh_token`;

    try {
      const res = await axios.post(
        refreshUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token); // Update the refresh token as well
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh failure here
    }
  } else {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  const newAccessToken = localStorage.getItem("access_token");

	
  if (newAccessToken) {
    req.headers.Authorization = `Bearer ${newAccessToken}`;
  }
  return req;
});
