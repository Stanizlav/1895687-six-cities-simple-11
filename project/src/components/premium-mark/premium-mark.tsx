type PremiumMarkProps = {
  isPremium: boolean;
  className?: string;
}

function PremiumMark({isPremium, className}:PremiumMarkProps):JSX.Element|null{
  if(!isPremium){
    return null;
  }

  return(
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
