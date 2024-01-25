import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { ArticleTextBlock } from "../../model/types/article";
import classes from "./ArticleTextBlockComponent.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(classes.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={<TextDeprecated title={block.title} className={classes.title} />}
                    on={<Text title={block.title} className={classes.title} />}
                />
            )}
            {block.paragraphs.map((paragraph) => (
                <ToggleFeatures
                    key={paragraph}
                    feature="isAppRedesigned"
                    off={<TextDeprecated text={paragraph} className={classes.paragraph} key={paragraph} />}
                    on={<Text text={paragraph} className={classes.paragraph} key={paragraph} />}
                />
            ))}
        </div>
    );
});
