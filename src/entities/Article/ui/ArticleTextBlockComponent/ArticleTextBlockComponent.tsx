import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
    className?: string;
}

export const ArticleTextBlockComponent = (
    props: ArticleTextBlockComponentProps
) => {
    const { className } = props;

    return (
        <div
            className={classNames(classes.ArticleTextBlockComponent, {}, [
                className,
            ])}
        >
            ArticleTextBlockComponent
        </div>
    );
};
