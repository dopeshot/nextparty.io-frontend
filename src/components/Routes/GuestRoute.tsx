import { Redirect, Route } from 'react-router-dom';
import { useAppState } from "../../overmind";

export const GuestRoute = ({ component: Component, redirectWhenLoggedIn, ...props }: any) => {
    const { isLoggedIn } = useAppState().profile

    return (
        // restricted = false meaning guest route
        // restricted = true meaning restricted route
        <Route {...props} render={(props) => (isLoggedIn && redirectWhenLoggedIn) ? <Redirect to={redirectWhenLoggedIn} /> : <Component {...props} />} />
    );
}