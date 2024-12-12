import { NavLink } from 'react-router-dom';
import { useSelector,} from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { FaUserCircle } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { SiAirbnb } from "react-icons/si";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
        <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
      </>
    );
  }

  return (
    <header className="navigation">
      <NavLink to="/" className="logo">
        <SiAirbnb size={40} color="#FF5A5F"/>
        <span className="logo-text">airbnb</span>
      </NavLink>
      <div className="dropdown-container">
      {sessionUser ? (
     <div className="nav-actions">
     <NavLink to="/spots/new" className="create-spot-link">
       Create a New Spot
     </NavLink>
     <ProfileButton user={sessionUser} />
   </div>
      ) : (
        <>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <TfiMenu size={24} className="menu-icon" color="black" />
            <FaUserCircle size={24} color="black" />
          </button>
        {showDropdown && (
          <ul className="dropdown-menu">
            {isLoaded && sessionLinks}
          </ul>
        )}
         </>
      )}
      </div>
    </header>
  );
}

export default Navigation;