import { Redirect, Route } from 'react-router-dom';
import { useAppState } from "../../overmind";

export const GuestRoute = ({ component: Component, redirectWhenLoggedIn, ...props }: any) => {
    const { isLoggedIn } = useAppState().profile

    return (
        <Route {...props} render={(props) => (isLoggedIn && redirectWhenLoggedIn) ? <Redirect to={redirectWhenLoggedIn} /> : <Component {...props} />} />
    );
}