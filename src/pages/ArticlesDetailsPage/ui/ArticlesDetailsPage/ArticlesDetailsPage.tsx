import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
    className?: string;
}

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div
            className={classNames(classes.ArticlesDetailsPage, {}, [className])}
        >
            {t("ArticlesDetailsPage")}
        </div>
    );
};

export default memo(ArticlesDetailsPage);
