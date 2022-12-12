import { FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { changeCity } from '../../store/application-process/application-process';
import { logIn } from '../../store/thunk-actions';
import { isStatusAuthorised } from '../../store/user-process/selectors';
import AppRoute from '../../types/app-route';
import AuthData from '../../types/auth-data';
import { getRandomCity } from '../../utils/mocks';
import { toast } from 'react-toastify';
import { isEmail, isPassword } from '../../utils/validation-utils';

function LoginScreen():JSX.Element{
  const isAuthorised = useAppSelector(isStatusAuthorised);
  const dispatch = useAppDispatch();
  const cityToChoose = getRandomCity().name;

  const emailRef = useRef<HTMLInputElement|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(emailRef.current !== null && passwordRef.current !== null){
      const email = emailRef.current.value;
      if(!isEmail(email)){
        toast.warn('Please type a correct email');
        return;
      }
      const password = passwordRef.current.value;
      if(!isPassword(password)){
        toast.warn('Password must contain at least a letter and a digit');
        return;
      }
      const data: AuthData = {email, password};
      dispatch(logIn(data));
    }
  };

  const handleCityButtonClick = ()=>{
    dispatch(changeCity(cityToChoose));
  };

  if(isAuthorised){
    return <Navigate to={AppRoute.Main}/>;
  }

  return(
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
            <form className="login__form form" onSubmit={handleFormSubmit} action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input id="email" className="login__input form__input" type="email" name="email" data-testid="email" placeholder="Email" ref={emailRef} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input id="password" className="login__input form__input" type="password" name="password" data-testid="password" placeholder="Password" ref={passwordRef} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleCityButtonClick}
                data-testid="changing-city-link"
              >
                <span>{cityToChoose}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginScreen;
