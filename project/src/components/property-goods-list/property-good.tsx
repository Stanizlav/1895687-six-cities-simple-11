import { memo } from 'react';

type PropertyGoodProps = {
  good:string;
}

function PropertyGood({good}:PropertyGoodProps):JSX.Element{
  return(<li className="property__inside-item">{good}</li>);
}

export default memo(PropertyGood);
