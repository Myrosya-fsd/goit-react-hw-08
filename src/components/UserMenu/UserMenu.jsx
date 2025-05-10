import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout as logOutUser } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.form}>
      <p className={css.email}>{user?.email || "No user"}</p>
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(logOutUser())}
        aria-label="Log out"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
