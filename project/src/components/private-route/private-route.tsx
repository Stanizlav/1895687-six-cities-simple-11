import { Navigate } from 'react-router-dom';
import AppRoute from '../../types/app-route';
import AuthorisationStatus from '../../types/authorisation-status';

type PrivateRouteProps = {
  children: JSX.Element;
  authorisationStatus: AuthorisationStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element{
  const {children, authorisationStatus} = props;
  return(
    authorisationStatus === AuthorisationStatus.Auth
      ? children
      : <Navigate to = { AppRoute.Login }/>
  );
}

export default PrivateRoute;
