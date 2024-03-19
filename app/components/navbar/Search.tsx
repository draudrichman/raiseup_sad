'use client';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi'

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const type = params?.get('type');
    const searchQuery = params?.get('searchQuery');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return 'Anywhere';
    }, [locationValue, getByValue]);

    const typeLabel = useMemo(() => {
        if (type) {
            return type;
        }

        return 'Any type';
    }, [type]);

    const searchQueryLabel = useMemo(() => {
        if (searchQuery) {
            return searchQuery;
        }

        return 'Search';
    }, [searchQuery]);

    return (
        <div
            onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {typeLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{searchQueryLabel}</div>
                    <div className="p-2 bg-[#34ca96] rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;