import React from "react";
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../../overmind';

export interface PrivateRouteProps extends RouteProps { }

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...props }) => {
    const { isLoggedIn } = useAppState().profile

    if (props.path === "/account/login" || props.path === "/account/register") {
        return isLoggedIn ? <Redirect to="/account/profile" /> : <Route {...props} component={component} />
    }

    return !isLoggedIn ? <Redirect to="/account/profile" /> : <Route {...props} component={component} />
}