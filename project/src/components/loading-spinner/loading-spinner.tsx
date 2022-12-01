import CircleLoader from 'react-spinners/CircleLoader';
import { CSSProperties } from 'react';

const SIZE = 150;

function LoadingSpinner():JSX.Element | null{
  const override: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
  };
  return <CircleLoader cssOverride={override} color="green" size={SIZE} />;
}

export default LoadingSpinner;
