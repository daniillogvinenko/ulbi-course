import { useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./StarRating.module.scss";
import { Icon } from "../Icon/Icon";
import StarIcon from "@/shared/assets/icons/Star.svg";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * @deprecated
 */
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
        <div className={classNames(classes.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(classes.starIcon, { [classes.isSelected]: isSelected }, [
                        currentStarsCount >= starNumber ? classes.hovered : classes.normal,
                    ])}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onCLick(starNumber)}
                />
            ))}
        </div>
    );
};
