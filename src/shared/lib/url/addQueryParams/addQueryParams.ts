export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

// функция добавления параметров строки запроса в URL
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, "", getQueryParams(params));
}
