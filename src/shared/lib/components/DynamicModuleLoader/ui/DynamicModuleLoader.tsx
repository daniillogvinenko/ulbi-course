import { Reducer } from "@reduxjs/toolkit";
import { FC, ReactNode, useEffect } from "react";
import { useStore } from "react-redux";
import { ReduxStoreWithManager } from "@/app/providers/StoreProvider";
import { StateSchema, StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { useAppDispatch } from "../../../hooks/useAppDispatch/useAppDispatch";

// это для того, чтобы можно было передавать много редюсеров
export type ReducerList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    removeReducersAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { children, reducers, removeReducersAfterUnmount = true } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();
        // добавляется каждый редюсер
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            // Добавляем новый редюсер только если его нету
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: "add reducer" });
            }
        });

        return () => {
            // removeAfterUnmount - флаг, который отвечает за то, будет ли удален редюсер, после демонтирования элемента из ДОМ дерева
            if (removeReducersAfterUnmount) {
                Object.entries(reducers).forEach(([name, _]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: "remove reducer" });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
