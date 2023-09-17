import jwtDecode from "jwt-decode";

type TokenProps = {
  exp: number;
  iat: number;
  user_id: number;
  username: string;
};

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: TokenProps = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const decodeUser = (token: string): TokenProps | null => {
  try {
    return jwtDecode<TokenProps>(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};
