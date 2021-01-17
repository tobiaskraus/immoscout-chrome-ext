export function parseStringToFloat(value: string): number {
    return parseFloat(value);
}

export function parsePrice(value: string): number {
    return parseFloat(
        replaceAll(value, {
            "€": "",
            " ": "",
            ",": ".",
            ".": "",
        })
    );
}

/**
 * WAITFOR https://github.com/tobiaskraus/tk-utils to be released as an npm package,
 * as the function is also there - maintained with unit tests.
 *
 * Replace multiple values inside a string.
 * @param mapObj key: string search, value: string to replace with
 */
export function replaceAll(input: string, mapObj: { [key: string]: string }) {
    const replaceKeys = Object.keys(mapObj).map((key) =>
        // escape characters which are special regex characters: . / \ ( ) | { } ? ^ $ - +
        key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    );
    const replacePattern = replaceKeys.join("|");
    var re = new RegExp(replacePattern, "gi");

    return input.replace(re, (matched) => mapObj[matched]);
}
