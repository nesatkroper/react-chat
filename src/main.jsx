import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//
import { Provider } from "react-redux";
import store from "@/app/store";

//
import { I18nextProvider } from "react-i18next";
import i18n from "@/lang/locale";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);
