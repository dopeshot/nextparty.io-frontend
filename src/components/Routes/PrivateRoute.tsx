import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../../overmind';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const { isLoggedIn } = useAppState().profile

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />} />
    )
}