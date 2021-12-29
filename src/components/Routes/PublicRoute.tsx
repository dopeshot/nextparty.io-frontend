import { Redirect, Route } from 'react-router-dom';
import { useAppState } from "../../overmind";

export const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
    const { isLoggedIn } = useAppState().profile

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={(props) => (isLoggedIn && restricted) ? <Redirect to="/" /> : <Component {...props} />} />
    );
}