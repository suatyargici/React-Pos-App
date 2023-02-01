import React from 'react'
import { useTranslation } from 'react-i18next'; 
const App = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
{t("welcome")}
      <button
      
        onClick={() => i18n.changeLanguage('en')}
      >
        {t("change-locale")}
      </button>
    </div>
  )
}

export default App