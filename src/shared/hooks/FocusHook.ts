import { useRef } from "react"

export const useFocus = (): [React.RefObject<HTMLIonTextareaElement>, () => void] => {
    const htmlElementReference = useRef<HTMLIonTextareaElement>(null)
    const setFocus = () => { htmlElementReference.current && htmlElementReference.current.setFocus() }

    return [htmlElementReference, setFocus]
}