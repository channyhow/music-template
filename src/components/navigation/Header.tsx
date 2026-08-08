import { Link } from "react-router-dom";
import { BurgerButton } from "@/components/navigation/BurgerButton";
import navigationData from "@/data/navigation.json";
import siteData from "@/data/site.json";
type HeaderNavigationMode = "drawer" | "inline";
type NavigationUiConfig = { navigation?: { desktop?: HeaderNavigationMode } };
export function Header() { const home = navigationData.primary.find((item) => item.id === "home"); const primaryItems = navigationData.primary.filter((item) => item.enabled && item.id !== "home"); const navigationMode = (siteData.ui as typeof siteData.ui & NavigationUiConfig).navigation?.desktop ?? "drawer"; return <header className="header" data-navigation={navigationMode}><Link className="header__logo" to={home?.href ?? "/"} aria-label={`${siteData.site.name} | ${home?.label ?? siteData.site.name}`}>{siteData.site.name}</Link><nav className="header__nav" aria-label={siteData.ui.copy.navigation.mainLabel}>{primaryItems.map((item) => <Link key={item.id} to={item.href}>{item.label}</Link>)}</nav><BurgerButton /></header>; }
