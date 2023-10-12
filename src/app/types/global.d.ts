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
