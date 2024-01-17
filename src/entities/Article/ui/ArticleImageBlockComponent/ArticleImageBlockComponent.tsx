import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleImageBlock } from "../../model/types/article";
import { TextAlign, Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import classes from "./ArticleImageBlockComponent.module.scss";
import { Text } from "@/shared/ui/redesigned/Text";
import { ToggleFeatures } from "@/shared/lib/features";

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={classes.img} />
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text text={block.title} align="center" />}
                    off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
                />
            )}
        </div>
    );
});
