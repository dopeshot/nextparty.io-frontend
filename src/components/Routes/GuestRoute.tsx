import { Redirect, Route } from "react-router-dom"
import { useAppState } from "../../overmind"

export const GuestRoute = ({ component, redirectWhenLoggedIn, path, ...rest }: any) => {
    const { isLoggedIn } = useAppState().profile
    return isLoggedIn ? <Redirect from={path} to={redirectWhenLoggedIn || "/"} /> : <Route component={component} path={path} {...rest} />
}
