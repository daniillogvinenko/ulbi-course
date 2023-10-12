type Mods = Record<string, string | boolean>;

// эта функция нужна чтобы вешать какие-то классы, особенно если они идут по какому-либо условию
export function classNames(
    cls: string,
    mods?: Mods,
    additional?: Array<string | undefined>
): string {
    let addClasses: Array<string | undefined> = [];
    let modsClasses: Mods = {};
    if (additional) {
        addClasses = [...additional.filter(Boolean)];
    }
    if (!mods) {
        modsClasses = {};
    } else {
        modsClasses = { ...mods };
    }
    return [
        cls,
        ...Object.entries(modsClasses)
            .filter(([_, value]) => Boolean(value))
            .map(([className, _]) => className),
        ...addClasses, // это нужно чтобы отчистить массив от falsy значений
    ]
        .join(" ")
        .trim();
}
