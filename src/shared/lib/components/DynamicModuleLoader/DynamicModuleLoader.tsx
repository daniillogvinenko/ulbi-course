import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

// это для того, чтобы можно было передавать много редюсеров
export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    removeReducersAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeReducersAfterUnmount } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        // добавляется каждый редюсер
        Object.entries(reducers).forEach(
            ([name, reducer]: ReducersListEntry) => {
                store.reducerManager.add(name, reducer);
                dispatch({ type: "add reducer" });
            }
        );

        return () => {
            // removeAfterUnmount - флаг, который отвечает за то, будет ли удален редюсер, после демонтирования элемента из ДОМ дерева
            if (removeReducersAfterUnmount) {
                Object.entries(reducers).forEach(
                    ([name, _]: ReducersListEntry) => {
                        store.reducerManager.remove(name);
                        dispatch({ type: "remove reducer" });
                    }
                );
            }
        };
        // eslint-disable-next-line
    }, []);

    return <div>{children}</div>;
};
