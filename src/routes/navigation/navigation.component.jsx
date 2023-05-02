import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-contanier" to="/">
          <CrwnLogo className='logo'/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop Now
          </Link>
          <Link className="nav-link" to="/auth">
             Sign-in
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
