import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { SiteShell } from "@/app/SiteShell";
import { PageRenderer } from "@/components/page/PageRenderer";
import { Seo } from "@/components/page/Seo";
import pages from "@/data/pages.json";
import type { PageData } from "@/types/content";

const BrandingPage = lazy(() =>
  import("@/app/BrandingPage").then((module) => ({ default: module.BrandingPage })),
);
const SystemPage = lazy(() =>
  import("@/app/SystemPage").then((module) => ({ default: module.SystemPage })),
);
const SystemReference = lazy(() =>
  import("@/app/SystemReference").then((module) => ({ default: module.SystemReference })),
);

const pageData = pages as PageData[];
const internalRobots = { index: false, follow: false } as const;

function RoutedPage() {
  const location = useLocation();
  const page = pageData.find((item) => item.slug === location.pathname) ?? pageData[0];

  return (
    <>
      <Seo seo={page.seo} slug={page.slug} />
      <PageRenderer page={page} />
    </>
  );
}

export function App() {
  return (
    <SiteShell>
      <Routes>
        <Route
          path="/system"
          element={(
            <Suspense fallback={null}>
              <Seo seo={{ title: "System", robots: internalRobots }} slug="/system" />
              <SystemPage />
              <SystemReference />
            </Suspense>
          )}
        />
        <Route
          path="/branding"
          element={(
            <Suspense fallback={null}>
              <Seo seo={{ title: "Branding", robots: internalRobots }} slug="/branding" />
              <BrandingPage />
            </Suspense>
          )}
        />
        <Route path="*" element={<RoutedPage />} />
      </Routes>
    </SiteShell>
  );
}
