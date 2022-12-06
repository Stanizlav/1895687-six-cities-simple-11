import PropertyGood from './property-good';

type PropertyGoodsProps = {
  goods: string[];
}

function PropertyGoodsList({goods}:PropertyGoodsProps):JSX.Element{
  return(
    <ul className="property__inside-list">
      {goods.map((item)=>(<PropertyGood key={item} good={item}/>))}
    </ul>
  );
}

export default PropertyGoodsList;
