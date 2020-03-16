import I18n from 'react-native-i18n'; // You can import i18n-js as well if you don't want the app to set default locale from the device locale.
import en from './en';
import pt from './pt';
import es from './es';

I18n.fallbacks = true; // If an English translation is not available in en.js, it will look inside hi.js
I18n.missingBehaviour = 'guess'; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = 'en'; // If the current locale in device is not en or hi
// I18n.locale = 'pt'; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
    en,
    pt,
    es
};

export const setLocale = (locale) => {
    I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale; // It will be used to define intial language state in reducer.

/* translateHeaderText:
 screenProps => coming from react-navigation (defined in app.container.js)
 langKey => will be passed from the routes file depending on the screen.(We will explain the usage later int the coming topics)
*/
export const translateHeaderText = (langKey) => ({ screenProps }) => {
    const title = I18n.translate(langKey, screenProps.language);
    return { title };
};

export default I18n.translate.bind(I18n);