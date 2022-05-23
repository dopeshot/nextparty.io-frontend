import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Truth or Dare": "Truth or Dare",
            "nextparty.io": "nextparty.io",
            "Add players": "Add players",
            "Pick a set to play": "Pick a set to play",
            "N players added": "{{count}} players added",
            "set picked": "{{name}} picked",
            "play": "Play"
        }
    },
    de: {
        translation: {
            "Truth or Dare": "Wahrheit oder Pflicht",
            "nextparty.io": "nextparty.io",
            "Add players": "Spieler hinzufügen",
            "Pick a set to play": "Wähle ein Aufgabendeck aus",
            "N players added": "{{count}} Spieler hinzugefügt",
            "set picked": "{{name}} ausgewählt",
            "play": "Spielen"
        }
    }
};

export default i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });