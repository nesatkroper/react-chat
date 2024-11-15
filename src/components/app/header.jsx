import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme/mode-toggle";
import LanguageToggle from "@/lang/lang-toggle";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [lng, i18n] = useTranslation("global");
  return (
    <div className="flex flex-row justify-between w-full shadow-md  py-1">
      <SidebarTrigger />
      <div className="">
        <p className="font-bold p-1 text-lg">{lng("header.app_name")}</p>
      </div>
      <div className="flex gap-2">
        <LanguageToggle />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
