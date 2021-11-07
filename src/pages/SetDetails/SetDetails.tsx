import { useParams } from "react-router"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    return (<>
        <h3>Test</h3>    
        <p>{setId}</p>
    </>)
}