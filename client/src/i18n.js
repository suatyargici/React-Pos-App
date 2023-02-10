import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// const resources = {
//   tr: {
//     translation: {
//       "Welcome to React": "React'e Hoşgeldiniz",
//       "To get started, edit <1>src/App.js</1> and save to reload.":
//         "Başlamak için, <1>src/App.js</1> dosyasını düzenleyin ve yeniden yüklemek için kaydedin.",
//       "Learn React": "React Öğren",
//     },
//   },
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React",
//       "To get started, edit <1>src/App.js</1> and save to reload.":
//         "To get started, edit <1>src/App.js</1> and save to reload.",
//       "Learn React": "Learn React",
//     },
//   },
// };


i18n.use(initReactI18next)
.use(Backend)
.use(LanguageDetector)
.init({
//   resources,
  fallbackLng: "tr",

});


export default i18n;