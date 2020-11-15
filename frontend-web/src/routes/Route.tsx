import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as RouteDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { mappedUser } = useAuth();

  return (
    <RouteDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!mappedUser ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
