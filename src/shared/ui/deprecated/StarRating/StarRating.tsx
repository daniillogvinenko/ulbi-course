import { useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./StarRating.module.scss";
import { Icon as IconDeprecated } from "../Icon/Icon";
import StarIcon from "@/shared/assets/icons/Star.svg";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Icon } from "../../redesigned/Icon";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const { className, size = 30, onSelect, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState<number>(selectedStars);
    const [isSelected, setIsSelected] = useState<boolean>(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onCLick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => classes.StarRating,
                    on: () => classes.StarRatingRedesigned,
                }),
                {},
                [className]
            )}
        >
            {stars.map((starNumber) => {
                const commonProps = {
                    className: classNames(classes.starIcon, { [classes.isSelected]: isSelected }, [
                        currentStarsCount >= starNumber ? classes.hovered : classes.normal,
                    ]),
                    Svg: StarIcon,
                    key: starNumber,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onCLick(starNumber),
                };

                return (
                    <ToggleFeatures
                        key={starNumber}
                        feature="isAppRedesigned"
                        off={<IconDeprecated {...commonProps} />}
                        on={<Icon {...commonProps} clickable={!isSelected} />}
                    />
                );
            })}
        </div>
    );
};
