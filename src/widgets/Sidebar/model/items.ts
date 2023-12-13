import React from "react";
import MainIcon from "@/shared/assets/icons/homeItem.svg";
import AboutIcon from "@/shared/assets/icons/aboutItem.svg";
import ProfileIcon from "@/shared/assets/icons/profileItem.svg";
import ArticlesIcon from "@/shared/assets/icons/articleItem.svg";
import { getRouteAdmin, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
    {
        path: getRouteMain(),
        Icon: MainIcon,
        text: "Главная",
    },
    {
        path: getRouteAdmin(),
        Icon: AboutIcon,
        text: "О сайте",
    },
    {
        path: getRouteProfile(":id"),
        Icon: ProfileIcon,
        text: "Профиль",
        authOnly: true,
    },
    {
        path: getRouteArticles(),
        Icon: ArticlesIcon,
        text: "Статьи",
        authOnly: true,
    },
];
