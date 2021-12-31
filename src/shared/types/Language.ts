import de from '../../assets/languages/de.svg';
import en from '../../assets/languages/en.svg';


export enum Language {
    DE = "de",
    EN = "en"
}

export const languages: { [key in Language]: {
    name: Language
    text: string
    icon: string
} } = {
    [Language.DE]: {
        name: Language.DE,
        text: 'Deutsch',
        icon: de
    },
    [Language.EN]: {
        name: Language.EN,
        text: 'English',
        icon: en
    }
}

export const languagePickerOptions = [
    { text: languages[Language.DE].text, value: Language.DE },
    { text: languages[Language.EN].text, value: Language.EN }
]