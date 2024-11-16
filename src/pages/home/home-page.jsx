import Layout from "../../components/app/layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [lng, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Layout>
      <p>{lng("home.body")}</p>
      <Button onClick={() => handleChangeLanguage("en")}>English</Button>
      <Button onClick={() => handleChangeLanguage("kh")}>Khmer</Button>
    </Layout>
  );
};

export default HomePage;
