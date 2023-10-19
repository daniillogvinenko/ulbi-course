import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = (
    props: ArticleCodeBlockComponentProps
) => {
    const { className } = props;

    return (
        <div
            className={classNames(classes.ArticleCodeBlockComponent, {}, [
                className,
            ])}
        >
            ArticleCodeBlockComponent
        </div>
    );
};
