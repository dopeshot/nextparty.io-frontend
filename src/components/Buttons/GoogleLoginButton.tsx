import GoogleLogin from 'react-google-login';
import { useActions } from '../../overmind';
import { SecondaryButton } from './SecondaryButton';


export const GoogleLoginButton: React.FC = () => {

    const { loginWithGoogle } = useActions().profile

    return <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={loginWithGoogle}
        onFailure={loginWithGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => <SecondaryButton onClick={renderProps.onClick} disabled={renderProps.disabled} className="mb-4 w-full">Continue with Google</SecondaryButton>}
    />

}