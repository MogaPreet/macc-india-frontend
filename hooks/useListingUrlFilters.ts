'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    ArrayFilterBinding,
    buildListingFilterQuery,
    readListingFiltersFromUrl,
} from '@/lib/url-filters';

type ArrayFilterSetter = {
    param: string;
    setter: (values: string[]) => void;
};

type UseListingUrlFiltersOptions = {
    maxPrice: number;
    productsLoaded: boolean;
    searchQuery: string;
    selectedBrands: string[];
    priceRange: [number, number];
    arrayFilters: ArrayFilterBinding[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    arraySetters: ArrayFilterSetter[];
};

export function useListingUrlFilters({
    maxPrice,
    productsLoaded,
    searchQuery,
    selectedBrands,
    priceRange,
    arrayFilters,
    setSearchQuery,
    setSelectedBrands,
    setPriceRange,
    arraySetters,
}: UseListingUrlFiltersOptions) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [initialized, setInitialized] = useState(false);
    const priceFromUrlRef = useRef(false);
    const pendingPriceRef = useRef<{ min: number; max: number | null } | null>(null);
    const hasAppliedDefaultPriceRef = useRef(false);
    const lastSyncedQueryRef = useRef<string | null>(null);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const arrayParams = arrayFilters.map((filter) => filter.param);

    const applyUrlToState = (params: URLSearchParams) => {
        const parsed = readListingFiltersFromUrl(params, arrayParams);

        setSearchQuery(parsed.searchQuery);
        setSelectedBrands(parsed.selectedBrands);

        for (const { param, setter } of arraySetters) {
            setter(parsed.arrayValues[param] ?? []);
        }

        priceFromUrlRef.current = parsed.priceFromUrl;
        if (parsed.priceFromUrl) {
            pendingPriceRef.current = {
                min: parsed.minPrice ?? 0,
                max: parsed.maxPrice,
            };
            hasAppliedDefaultPriceRef.current = true;
        } else {
            pendingPriceRef.current = null;
            hasAppliedDefaultPriceRef.current = false;
        }
    };

    useEffect(() => {
        applyUrlToState(searchParams);
        lastSyncedQueryRef.current = searchParams.toString();
        setInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentQuery = searchParams.toString();
        if (!initialized || currentQuery === lastSyncedQueryRef.current) {
            return;
        }

        applyUrlToState(searchParams);
        lastSyncedQueryRef.current = currentQuery;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, initialized]);

    useEffect(() => {
        if (!productsLoaded || maxPrice <= 0) return;

        if (pendingPriceRef.current) {
            setPriceRange([
                pendingPriceRef.current.min,
                pendingPriceRef.current.max ?? maxPrice,
            ]);
            pendingPriceRef.current = null;
            return;
        }

        if (!hasAppliedDefaultPriceRef.current) {
            setPriceRange([0, maxPrice]);
            hasAppliedDefaultPriceRef.current = true;
        } else if (!priceFromUrlRef.current) {
            setPriceRange((prev) => [prev[0], maxPrice]);
        }
    }, [productsLoaded, maxPrice, setPriceRange]);

    useEffect(() => {
        if (!initialized || !productsLoaded || maxPrice <= 0) return;

        const syncToUrl = () => {
            const nextQuery = buildListingFilterQuery(
                {
                    searchQuery,
                    selectedBrands,
                    priceRange,
                    arrayFilters,
                },
                maxPrice
            );

            if (nextQuery === lastSyncedQueryRef.current) return;

            lastSyncedQueryRef.current = nextQuery;
            const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
            router.replace(nextUrl, { scroll: false });
        };

        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }

        searchDebounceRef.current = setTimeout(syncToUrl, 300);

        return () => {
            if (searchDebounceRef.current) {
                clearTimeout(searchDebounceRef.current);
            }
        };
    }, [
        initialized,
        productsLoaded,
        maxPrice,
        searchQuery,
        selectedBrands,
        priceRange,
        arrayFilters,
        pathname,
        router,
    ]);
}
