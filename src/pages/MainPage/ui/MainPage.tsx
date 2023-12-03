import React from "react";
import { useTranslation } from "react-i18next";
import { RatingCard } from "@/entities/Rating";
import { Page } from "@/widgets/Page";

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t("Главная")}
            <RatingCard title={t("Как Вам статья?")} feedbackTitle={t("Оставьте отзыв о статье")} hasFeedback />
        </Page>
    );
};

export default MainPage;
