import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { ArticleImageBlock } from "../../model/types/article";
import classes from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(classes.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <img src={block.src} alt="" className={classes.img} />
                {block.title && (
                    <Text text={block.title} align={TextAlign.CENTER} />
                )}
            </div>
        );
    }
);
