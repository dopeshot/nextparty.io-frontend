import { useHistory } from 'react-router';
import { useActions } from '../../overmind';


export const GoogleLoginButton: React.FC = () => {
    const { loginWithGoogle } = useActions().profile
    let disabled = false
    const history = useHistory()
    const login = async () => {
        if (await loginWithGoogle()) {
            history.replace('/account/profile')
            return
        }
        disabled = true;
    }

    return (
        <button type="button" onClick={login} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${disabled ? "cursor-default bg-opacity-75 text-opacity-75" : "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 mb-4 w-full`}>
            <span className="text-light-500 font-bold">Continue with Google</span>
        </button>
    )

}