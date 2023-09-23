type Mods = Record<string, string | boolean>;

// эта функция нужна чтобы вешать какие-то классы, особенно если они идут по какому-либо условию
export function classNames(
  cls: string,
  mods?: Mods,
  additional?: string[]
): string {
  return [
    cls,
    ...additional.filter(Boolean), // это нужно чтобы отчистить массив от falsy значений
    Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className, _]) => className),
  ].join(" ");
}
