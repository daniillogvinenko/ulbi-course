import { lazy } from "react";

// Когда Webpack сталкивается с таким синтаксисом, он
// автоматически начинает разделять код вашего приложения
export const AboutPageAsync = lazy(() => import("./AboutPage"));
