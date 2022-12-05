import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-hooks';
import AppRoute from '../../types/app-route';
import { isStatusAuthorised } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element{
  const isAuthorised = useAppSelector(isStatusAuthorised);
  return(
    isAuthorised
      ? children
      : <Navigate to = { AppRoute.Login }/>
  );
}

export default PrivateRoute;
