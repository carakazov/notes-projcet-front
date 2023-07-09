const LANGUAGE = "language"

export class LanguageHolder {
    getLanguage() {
        let language = sessionStorage.getItem(LANGUAGE)
        if(language === null) {
            sessionStorage.setItem(LANGUAGE, 'en')
            return 'en'
        }
        return language
    }

    setLanguage(language) {
        sessionStorage.setItem(LANGUAGE, language)
    }
}

const languageHolder = new LanguageHolder()
export default languageHolder