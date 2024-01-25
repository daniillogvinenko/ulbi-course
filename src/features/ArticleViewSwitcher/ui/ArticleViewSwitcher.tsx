import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import ListIconDeprecated from "@/shared/assets/icons/bigIcon.svg";
import TilesIconDeprecated from "@/shared/assets/icons/smallIcon.svg";

import ListIcon from "@/shared/assets/icons/burger.svg";
import TilesIcon from "@/shared/assets/icons/tile.svg";

import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import classes from "./ArticleViewSwitcher.module.scss";
import { ArticleView } from "../../../entities/Article/model/consts/consts";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Card } from "@/shared/ui/redesigned/Card";
import { HStack } from "@/shared/ui/redesigned/Stack";

interface ArticleViewSwitcherProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({ name: "isAppRedesigned", off: () => TilesIconDeprecated, on: () => TilesIcon }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({ name: "isAppRedesigned", off: () => ListIconDeprecated, on: () => ListIcon }),
    },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { className, view, onViewClick } = props;

    // урок 55 16:00
    const onClickHandler = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames(classes.ArticleViewSwitcher, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            // урок 55 16:00
                            onClick={onClickHandler(viewType.view)}
                            key={viewType.view}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                Svg={viewType.icon}
                                // если viewType не равен тому, который мы передали пропсом, то будет вешаться notSelected
                                className={classNames("", { [classes.notSelected]: viewType.view !== view }, [])}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
            on={
                <Card
                    border="roundBorder"
                    className={classNames(classes.ArticleViewSwitcherRedesigned, {}, [className])}
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType) => (
                            <Icon
                                key={viewType.view}
                                clickable
                                onClick={onClickHandler(viewType.view)}
                                Svg={viewType.icon}
                                // если viewType не равен тому, который мы передали пропсом, то будет вешаться notSelected
                                className={classNames("", { [classes.notSelected]: viewType.view !== view }, [])}
                            />
                        ))}
                    </HStack>
                </Card>
            }
        />
    );
});
