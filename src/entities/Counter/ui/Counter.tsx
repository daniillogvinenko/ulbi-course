import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/deprecated/Button";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useCounterActions } from "../model/slice/counterSlice";

export const Counter = () => {
    const { decrement, increment } = useCounterActions();
    const counterValue = useCounterValue();

    const incrementHandler = () => {
        increment();
    };

    const decrementHandler = () => {
        decrement();
    };

    const { t } = useTranslation();

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={incrementHandler}>
                {t("Инкремент")}
            </Button>
            <Button data-testid="decrement-btn" onClick={decrementHandler}>
                {t("Декремент")}
            </Button>
        </div>
    );
};
