import { StateSchema } from "app/providers/StoreProvider";

// здесь используем nullish оператор, так как если в инпут мы введем 0, то state.addCommentForm?.text будет
// восприниматься как falsy значение и в итоге все равно вернется пустая строка ''
export const getAddCommentFormText = (state: StateSchema) =>
    state.addCommentForm?.text ?? "";
export const getAddCommentFormError = (state: StateSchema) =>
    state.addCommentForm?.error;
