import React from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/header/Header";

const App = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Header/>
      {t("welcome")}
      <button onClick={() => i18n.changeLanguage("en")}>
        {t("change-locale")}
      </button>
    </div>
  );
};

export default App;

