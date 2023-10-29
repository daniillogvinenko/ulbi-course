// адрес страницы и позиция скролла, например: /articles/1: 800
export type ScrollSchema = Record<string, number>;

export interface UISchema {
    scroll: ScrollSchema;
}
