import { AppRoute } from '../../consts';

function Logo():JSX.Element{
  return(
    <div className="header__left">
      <a className="header__logo-link" href={AppRoute.Main}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </a>
    </div>
  );
}

export default Logo;
