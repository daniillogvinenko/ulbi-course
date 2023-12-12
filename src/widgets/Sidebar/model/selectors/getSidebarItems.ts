import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import MainIcon from "@/shared/assets/icons/homeItem.svg";
import AboutIcon from "@/shared/assets/icons/aboutItem.svg";
import ProfileIcon from "@/shared/assets/icons/profileItem.svg";
import ArticlesIcon from "@/shared/assets/icons/articleItem.svg";
import { SidebarItemType } from "../types/sidebar";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: "Главная",
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: "О сайте",
        },
    ];

    // для авторизованных пользователей
    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: "Профиль",
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticlesIcon,
                text: "Статьи",
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});
