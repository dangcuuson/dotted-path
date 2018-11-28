type ObjectKeys<T> = T extends Array<any> ? keyof T & number : T extends object ? keyof T : never;

type Maybe<T> = T | null | undefined;

type MappedObject<T> = {
    [K in keyof T]-?: T[K] extends Maybe<Array<infer U>> ? U[] : T[K] extends Maybe<object> ? NonNullable<T[K]> : T[K];
};

export interface GoToOption {
    ignore?: boolean;
}

export type DottedPathNagivator<T> = {
    append: (segment: string) => DottedPathNagivator<T>;
    goTo: <K extends ObjectKeys<T>>(fieldName: K, options?: GoToOption) => DottedPathNagivator<MappedObject<T>[K]>;
    end: () => string;
    toSegs: () => (string | number)[];
};

export interface PathOptions {
    skipIndex?: boolean;
}

export function DottedPath<T extends object>(pathOptions: PathOptions = {}): DottedPathNagivator<T> {
    function _dottedPath(segments: (string | number)[]): DottedPathNagivator<T> {
        return {
            append: (segment: string) => _dottedPath([...segments, segment]),
            goTo: (fieldName, goToOptions) => {
                const shouldIgnore = (goToOptions || {}).ignore || (typeof fieldName === 'number' && pathOptions.skipIndex);
                const nextSegments = shouldIgnore ? [...segments] : [...segments, fieldName + ''];
                return _dottedPath(nextSegments);
            },
            end: () => segments.join('.'),
            toSegs: () => segments
        };
    }
    return _dottedPath([]);
}