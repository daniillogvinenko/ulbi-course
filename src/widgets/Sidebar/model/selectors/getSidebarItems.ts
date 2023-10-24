import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/homeItem.svg";
import AboutIcon from "shared/assets/icons/aboutItem.svg";
import ProfileIcon from "shared/assets/icons/profileItem.svg";
import ArticlesIcon from "shared/assets/icons/articleItem.svg";
import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            Icon: MainIcon,
            text: "Главная",
        },
        {
            path: RoutePath.about,
            Icon: AboutIcon,
            text: "О сайте",
        },
    ];

    // для авторизованных пользователей
    if (userData) {
        sidebarItemList.push(
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                text: "Профиль",
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                Icon: ArticlesIcon,
                text: "Статьи",
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});
