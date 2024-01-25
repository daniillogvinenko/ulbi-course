declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";

declare module "*.svg" {
    // eslint-disable-next-line
    const content: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default content;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: "frontend" | "jest";

// хз что это (по моему из тридцать какого-то урока, где фиксили типы после strict mode)
type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
