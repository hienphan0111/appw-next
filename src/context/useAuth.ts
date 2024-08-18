import { useContext } from "react";
import AuthContext from "./authContext";

const useAuth = () => {
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  return { authStatus, setAuthStatus };
}

export default useAuth;
