export const URL_FILTER_PARAMS = {
    search: 'q',
    brand: 'brand',
    ram: 'ram',
    processor: 'processor',
    resolution: 'resolution',
    panel: 'panel',
    type: 'type',
    connectivity: 'connectivity',
    storage: 'storage',
    screen: 'screen',
    chip: 'chip',
    minPrice: 'min',
    maxPrice: 'max',
} as const;

export function parseArrayParam(value: string | null): string[] {
    if (!value) return [];
    return value
        .split(',')
        .map((item) => decodeURIComponent(item.trim()))
        .filter(Boolean);
}

export function parsePriceParam(value: string | null, fallback: number): number {
    if (!value) return fallback;
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function serializeArrayParam(values: string[]): string {
    return values.map(encodeURIComponent).join(',');
}

export type ArrayFilterBinding = {
    param: string;
    value: string[];
};

export function buildListingFilterQuery(
    filters: {
        searchQuery: string;
        selectedBrands: string[];
        priceRange: [number, number];
        arrayFilters: ArrayFilterBinding[];
    },
    defaultMaxPrice: number
): string {
    const params = new URLSearchParams();

    const trimmedSearch = filters.searchQuery.trim();
    if (trimmedSearch) {
        params.set(URL_FILTER_PARAMS.search, trimmedSearch);
    }

    if (filters.selectedBrands.length > 0) {
        params.set(URL_FILTER_PARAMS.brand, serializeArrayParam(filters.selectedBrands));
    }

    for (const { param, value } of filters.arrayFilters) {
        if (value.length > 0) {
            params.set(param, serializeArrayParam(value));
        }
    }

    const [minPrice, maxPrice] = filters.priceRange;
    if (minPrice > 0) {
        params.set(URL_FILTER_PARAMS.minPrice, String(minPrice));
    }
    if (defaultMaxPrice > 0 && maxPrice < defaultMaxPrice) {
        params.set(URL_FILTER_PARAMS.maxPrice, String(maxPrice));
    }

    return params.toString();
}

export function readListingFiltersFromUrl(
    searchParams: URLSearchParams,
    arrayParams: string[]
): {
    searchQuery: string;
    selectedBrands: string[];
    arrayValues: Record<string, string[]>;
    priceFromUrl: boolean;
    minPrice: number | null;
    maxPrice: number | null;
} {
    const arrayValues: Record<string, string[]> = {};
    for (const param of arrayParams) {
        arrayValues[param] = parseArrayParam(searchParams.get(param));
    }

    const priceFromUrl =
        searchParams.has(URL_FILTER_PARAMS.minPrice) ||
        searchParams.has(URL_FILTER_PARAMS.maxPrice);

    return {
        searchQuery: searchParams.get(URL_FILTER_PARAMS.search) ?? '',
        selectedBrands: parseArrayParam(searchParams.get(URL_FILTER_PARAMS.brand)),
        arrayValues,
        priceFromUrl,
        minPrice: searchParams.has(URL_FILTER_PARAMS.minPrice)
            ? parsePriceParam(searchParams.get(URL_FILTER_PARAMS.minPrice), 0)
            : null,
        maxPrice: searchParams.has(URL_FILTER_PARAMS.maxPrice)
            ? parsePriceParam(searchParams.get(URL_FILTER_PARAMS.maxPrice), 0)
            : null,
    };
}
