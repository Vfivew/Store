import React from 'react';

interface RouterProps {
  routes?: string[];
}

const NavigationMiniBar: React.FC<RouterProps> = ({ routes }) => {
  return (
    <div>
      {routes && routes.map((route, index) => (
        <span key={route}>
          {index > 0 && ' > '}
          {route}
        </span>
      ))}
    </div>
  );
};

export default NavigationMiniBar;
