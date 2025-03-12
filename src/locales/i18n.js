import { Platform, NativeModules } from 'react-native'
import { I18n } from 'i18n-js'

import en from './en'
import pt from './pt'
import es from './es'

const i18n = new I18n({ en, pt, es });

const defaultLocale = 'pt'
i18n.defaultLocale = defaultLocale

const normalizeTranslate = {
    en_US: 'en',
    en_GB: 'en',
    pt_BR: 'pt',
    pt_PT: 'pt',
    es_CO: 'es',
    es_ES: 'es',
    es_MX: 'es',
    es_AR: 'es',
    en: 'en',
    pt: 'pt',
    es: 'es',
}

const getDeviceLanguage = () => {
    return Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || defaultLocale
        : NativeModules.I18nManager.localeIdentifier || defaultLocale
}

const language = getDeviceLanguage()
i18n.locale = normalizeTranslate[language] || defaultLocale

const translate = (key) => i18n.t(key)
export default translate
