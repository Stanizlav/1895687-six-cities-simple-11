import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-hooks';
import AppRoute from '../../types/app-route';
import AuthorisationStatus from '../../types/authorisation-status';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element{
  const {authorisationStatus} = useAppSelector((state)=>state);
  return(
    authorisationStatus === AuthorisationStatus.Auth
      ? children
      : <Navigate to = { AppRoute.Login }/>
  );
}

export default PrivateRoute;
