import { AppRoute } from '../../consts';

function NavigationBlock():JSX.Element{
  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <div className="header__nav-profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </div>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href={AppRoute.Login}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBlock;
