import React from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

const About = () => {
    const { t } = useTranslation("about");

    return <Page>{t("О сайте")}</Page>;
};

export default About;
