import { MouseEvent } from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks/store-hooks';
import AppRoute from '../../types/app-route';
import AuthorisationStatus from '../../types/authorisation-status';

function LoginScreen():JSX.Element{
  const {authorisationStatus} = useAppSelector((state) => state);
  return(
    authorisationStatus === AuthorisationStatus.Auth
      ? <Navigate to={AppRoute.Main}/>
      :
      <>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <Logo/>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a
                  className="locations__item-link"
                  href={AppRoute.Main}
                  onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
                    evt.preventDefault();
                  }}
                >
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </>
  );
}

export default LoginScreen;
