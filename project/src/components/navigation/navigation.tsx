import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { logOut } from '../../store/thunk-actions';
import AppRoute from '../../types/app-route';
import AuthorisationStatus from '../../types/authorisation-status';

function Navigation():JSX.Element{
  const {authorisationStatus} = useAppSelector((state)=>state);
  const isAuthorised = authorisationStatus === AuthorisationStatus.Auth;
  const {user} = useAppSelector((state)=>state);
  const dispatch = useAppDispatch();
  const {avatarUrl, email} = user ?? {avatarUrl:'', email:''};
  const linkText = isAuthorised ? 'Sign out' : 'Sign in';

  const handleLinkClick = () => {
    if (isAuthorised){
      dispatch(logOut());
    }
  };

  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthorised ?
          <li className="header__nav-item user">
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img className="user__avatar" src={avatarUrl} width="54" height="54" alt="User avatar"/>
              </div>
              <span className="header__user-name user__name">{email}</span>
            </div>
          </li>
          : null }
        <li className="header__nav-item">
          <Link className="header__nav-link" onClick={handleLinkClick} to={AppRoute.Login}>
            <span className="header__signout">{linkText}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
