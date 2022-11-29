import CircleLoader from 'react-spinners/CircleLoader';
import { CSSProperties } from 'react';


function LoadingSpinner():JSX.Element | null{
  const override: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
  };
  return <CircleLoader cssOverride={override} color="green" size={150} />;
}

export default LoadingSpinner;
