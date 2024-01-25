import { ReactElement } from "react";
import { AppRoutes } from "@/shared/const/router";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { useRouteChange } from "@/shared/lib/router/useRouteChange";

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        // eslint-disable-next-line i18next/no-literal-string
        [AppRoutes.MAIN]: <div>TEST useAppToolbar</div>,
    };

    return toolbarByAppRoute[appRoute];
}
