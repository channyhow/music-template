import { Link } from "react-router-dom";

import { BurgerButton } from "@/components/navigation/BurgerButton";
import navigationData from "@/data/navigation.json";
import siteData from "@/data/site.json";

export function Header() {
  const home = navigationData.primary.find((item) => item.id === "home");

  return (
    <header className="header">
      <Link
        className="header__logo"
        to={home?.href ?? "/"}
        aria-label={`${siteData.site.name} | ${home?.label ?? siteData.site.name}`}
      >
        {siteData.site.name}
      </Link>

      <BurgerButton />
    </header>
  );
}
