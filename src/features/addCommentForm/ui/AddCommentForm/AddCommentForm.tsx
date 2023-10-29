import {
    getAddCommentFormError,
    getAddCommentFormText,
} from "features/addCommentForm/model/selectors/addCommentFormSelectors";
import {
    addCommentFormActions,
    addCommentFormReducer,
} from "features/addCommentForm/model/slices/addCommentFormSlice";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import classes from "./addCommentForm.module.scss";

export interface addCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: addCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch]
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || "");
        onCommentTextChange("");
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(classes.AddCommentForm, {}, [className])}
            >
                <Input
                    className={classes.input}
                    value={text}
                    onChange={onCommentTextChange}
                    placeholder={t("Введите комментарий")}
                />
                <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
                    {t("Отправить")}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

// асинхронные lazy функции (в .async.tsx файлах) работают только с дефолтными импортами
export default AddCommentForm;