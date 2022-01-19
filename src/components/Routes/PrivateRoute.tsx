import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../../overmind';

export const PrivateRoute = ({ component, path, ...rest }: any) => {
    const { isLoggedIn } = useAppState().profile
    return isLoggedIn ? <Route path={path} component={component} {...rest} /> : <Redirect from={path} to="/account" />
}