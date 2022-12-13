import { Link, Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { changeCity } from '../../store/application-process/application-process';
import { isStatusAuthorised } from '../../store/user-process/selectors';
import AppRoute from '../../types/app-route';
import getRandomCity from '../../utils/get-random-city';
import LoginForm from '../../components/login-form/login-form';

function LoginScreen():JSX.Element{
  const isAuthorised = useAppSelector(isStatusAuthorised);
  const dispatch = useAppDispatch();
  const cityToChoose = getRandomCity().name;

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
            <LoginForm/>
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
