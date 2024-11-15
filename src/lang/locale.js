import i18next from "i18next";
import global_en from "@/lang/en/global.json";
import global_kh from "@/lang/kh/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    kh: {
      global: global_kh,
    },
  },
});

export default i18next;
