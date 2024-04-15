import { useDispatch } from "react-redux";

import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/slice/userSlice";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return isAuth ? (
    <div>
      <button className="button-auth" onClick={handleLogout}>
        Log out
      </button>
    </div>
  ) : (
    <button className="button-auth">Login</button>
  );
};

export default Auth;
