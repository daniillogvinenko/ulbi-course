import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import { useParams } from "react-router-dom";
import classes from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    // если id есть, то это режим редактирования, иначе - создание новой статьи (используем одну страницу для двух маршрутов)
    const isEdit = Boolean(id);

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <Page className={classNames(classes.ArticleEditPage, {}, [className])}>
            {isEdit
                ? `Редактирование статьи с ID = ${id}`
                : "Создание новой статьи"}
        </Page>
    );
};

export default ArticleEditPage;
