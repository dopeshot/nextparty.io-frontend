import { useActions } from '../../overmind';


export const GoogleLoginButton: React.FC = () => {
    const { loginWithGoogle } = useActions().profile

    return (
        <button type="button"  onClick={loginWithGoogle} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${ "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 mb-4 w-full`}>
            <span className="text-light-500 font-bold">Continue with Google</span>
        </button>
    )

}