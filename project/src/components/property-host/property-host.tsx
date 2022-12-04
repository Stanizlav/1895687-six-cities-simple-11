import { memo } from 'react';

import Person from '../../types/person';

type PropertyHostProps = {
  host: Person;
}

function PropertyHost({host}:PropertyHostProps):JSX.Element{
  const {avatarUrl, name, isPro} = host;
  const avatarWrapperClassList = `property__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro ' : ''}user__avatar-wrapper`;
  return(
    <div className="property__host-user user">
      <div className={avatarWrapperClassList}>
        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="property__user-name">{name}</span>
      {isPro ?
        <span className="property__user-status">Pro</span>
        : null}
    </div>
  );
}

export default memo(PropertyHost, (previous, current)=> previous.host.id === current.host.id);
