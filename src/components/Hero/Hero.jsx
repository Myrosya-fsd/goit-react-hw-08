import css from "./Hero.module.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className={css.hero}>
      <div>
        <div>
          <h1 className={css.title}>
            Welcome to <br /> the <span className={css.span}>Phone Book</span>
          </h1>
          <h2 className={css.subtitle}>
            Securely store and manage your contacts
          </h2>
          <NavLink to="/login" className={css.navlink}>
            Get started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
