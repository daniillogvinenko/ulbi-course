type Mods = Record<string, string | boolean>;

//эта функция нужна чтобы вешать какие-то классы, особенно если они идут по какому-либо условию
export function classNames(cls: string, mods: Mods, additional: string[]):string {
    return [
        cls,
        ...additional,
        Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className)
    ].join(' ');
}