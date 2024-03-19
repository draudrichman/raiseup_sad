'use client';

import qs from 'query-string';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from '../Heading';
import { types } from './CampaignModal';
import TypeInput from '../inputs/TypeInput';


enum STEPS {
    LOCATION = 0,
    TYPE = 1,
    INPUT = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [type, setType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INPUT) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            type: type,
            searchQuery: searchQuery
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [location?.value, onNext, params, router, searchModal, searchQuery, step, type]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INPUT) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.TYPE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What kind of campaigns would you like to support?"
                    subtitle=""
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {types.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <TypeInput
                                onClick={(type) => setType(item.label)}
                                selected={type === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    if (step === STEPS.INPUT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Enter your search"
                    subtitle=""
                />
                <input className='peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter your search query"
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;