import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element{
  return(
    <div className="container">
      <div className='header__wrapper'>
        <Logo/>
      </div>
      <h1>404 Not Found</h1>
    </div>
  );
}

export default NotFoundScreen;
