import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import ListIcon from "shared/assets/icons/bigIcon.svg";
import TilesIcon from "shared/assets/icons/smallIcon.svg";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import classes from "./ArticleViewSwitcher.module.scss";
import { ArticleView } from "../../model/consts/consts";

interface ArticleViewSwitcherProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TilesIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onViewClick } = props;

    // урок 55 16:00
    const onClickHandler = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div
            className={classNames(classes.ArticleViewSwitcher, {}, [className])}
        >
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    // урок 55 16:00
                    onClick={onClickHandler(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        Svg={viewType.icon}
                        // если viewType не равен тому, который мы передали пропсом, то будет вешаться notSelected
                        className={classNames(
                            "",
                            { [classes.notSelected]: viewType.view !== view },
                            []
                        )}
                    />
                </Button>
            ))}
        </div>
    );
});
