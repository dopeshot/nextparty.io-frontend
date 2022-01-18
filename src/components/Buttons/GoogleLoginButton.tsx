import GoogleLogin from 'react-google-login';
import { useActions } from '../../overmind';


export const GoogleLoginButton: React.FC = () => {
    const { loginWithGoogle } = useActions().profile

    return <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={loginWithGoogle}
        onFailure={loginWithGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps =>
            <button type="button" disabled={renderProps.disabled} onClick={renderProps.onClick} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${renderProps.disabled ? "cursor-default bg-opacity-75 text-opacity-75" : "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 mb-4 w-full`}>
                <span className="text-light-500 font-bold">Continue with Google</span>
            </button>
        } />

}