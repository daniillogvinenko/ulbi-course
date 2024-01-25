import { useParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ArticleEditPage.module.scss";
import { Page } from "@/widgets/Page";

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    // если id есть, то это режим редактирования, иначе - создание новой статьи (используем одну страницу для двух маршрутов)
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(classes.ArticleEditPage, {}, [className])}>
            {isEdit ? `Редактирование статьи с ID = ${id}` : "Создание новой статьи"}
        </Page>
    );
};

export default ArticleEditPage;
