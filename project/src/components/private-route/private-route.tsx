import { Navigate } from 'react-router-dom';
import { AuthorisationStatus, AppRoute } from '../../consts';

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
