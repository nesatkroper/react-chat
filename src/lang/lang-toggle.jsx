import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
//
import { Languages } from "lucide-react";
import en_flag from "@/assets/images/en.png";
import kh_flag from "@/assets/images/kh.png";
import { useTranslation } from "react-i18next";
//

const LanguageToggle = () => {
  const [lang, i18n] = useTranslation("global");

  const hangleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          {/* icon */}
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => hangleChangeLanguage("en")}>
          <img
            src={en_flag}
            alt="flag"
            className="h-[20px] rounded-sm shadow-sm"
          />
          English
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => hangleChangeLanguage("kh")}>
          <img
            src={kh_flag}
            alt="flag"
            className="h-[20px] rounded-sm shadow-sm"
          />
          Khmer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
