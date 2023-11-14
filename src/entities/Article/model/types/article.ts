import { User } from "entities/User";
import { ArticleBlockType, ArticleType } from "../consts/consts";

// базовый тип, общие поля для всех типов блоков (code, image, text)
export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

// уникальные поля для каждого из блоков
export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

// объединяем три типа блоков в один
export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleTextBlock
    | ArticleImageBlock;

export interface Article {
    id: string;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}
