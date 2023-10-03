import React from 'react';
import { useAppSelector } from "../../../hooks/redux-hooks";
import { Link } from "react-router-dom";

interface RouterProps {
  routes?: string[];
}

const NavigationMiniBar: React.FC<RouterProps> = ({ routes }) => {
  const key = useAppSelector((state) => state.goods.filterKey);

  const updatedRoutes = key !== null && routes ? [...routes, key] : routes;

  return (
    <div className='navigation-mini-bar'>
      {updatedRoutes &&
        updatedRoutes.map((route, index) => (
          <span key={route}>
            {index > 0 && ' > '}
            {index === 0 ? (
              <Link to="/">Main</Link> 
            ) : (
              route
            )}
          </span>
        ))}
    </div>
  );
};

export default NavigationMiniBar;
