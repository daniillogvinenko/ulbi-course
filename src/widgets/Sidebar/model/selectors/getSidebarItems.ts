import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import MainIconDeprecated from "@/shared/assets/icons/homeItem.svg";
import AboutIconDeprecated from "@/shared/assets/icons/aboutItem.svg";
import ProfileIconDeprecated from "@/shared/assets/icons/profileItem.svg";
import ArticlesIconDeprecated from "@/shared/assets/icons/articleItem.svg";

import MainIcon from "@/shared/assets/icons/home.svg";
import ArticlesIcon from "@/shared/assets/icons/article.svg";
import AboutIcon from "@/shared/assets/icons/Info.svg";
import ProfileIcon from "@/shared/assets/icons/avatar.svg";

import { SidebarItemType } from "../types/sidebar";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";
import { toggleFeatures } from "@/shared/lib/features";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: "isAppRedesigned",
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: "Главная",
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: "isAppRedesigned",
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: "О сайте",
        },
    ];

    // для авторизованных пользователей
    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: "Профиль",
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => ArticlesIconDeprecated,
                    on: () => ArticlesIcon,
                }),
                text: "Статьи",
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});
