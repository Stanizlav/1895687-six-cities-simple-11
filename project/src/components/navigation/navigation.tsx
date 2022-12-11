import { Link } from 'react-router-dom';
import { MouseEvent, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { logOut } from '../../store/thunk-actions';
import AppRoute from '../../types/app-route';
import { isStatusAuthorised, getUser } from '../../store/user-process/selectors';

function Navigation():JSX.Element{
  const user = useAppSelector(getUser);
  const isAuthorised = useAppSelector(isStatusAuthorised);
  const dispatch = useAppDispatch();
  const avatarUrl = user?.avatarUrl;
  const email = user?.email;
  const linkText = isAuthorised ? 'Sign out' : 'Sign in';
  const linkClassList = isAuthorised ? 'header__signout' : 'header__login';

  const handleLinkClick = (evt:MouseEvent<HTMLAnchorElement>) => {
    if (isAuthorised){
      evt.preventDefault();
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
            <span className={linkClassList}>{linkText}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default memo(Navigation);
