import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import {signOutUser} from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx';

const Navigation = () => {

  const{ currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const{ isCartOpen } = useContext(CartContext);


  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop Now
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>Sign-Out</NavLink>)
              :
              (<NavLink  to='/auth'>
                Sign-in
              </NavLink>
              )
          }
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
