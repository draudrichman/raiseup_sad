'use client';

import useCampaignModal from "@/app/hooks/useCampaignModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TypeInput from "../inputs/TypeInput";
import { PiHandshakeFill } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import CalendarPart from "../inputs/CalendarPart";
import { types } from "../navbar/Categories";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};


enum STEPS {
    TYPE = 0,
    CATEGORY = 1,
    LOCATION = 2,
    DESCRIPTION = 3,
    IMAGES = 5,
    DURATION = 4,
    GOAL = 6
}


const CampaignModal = () => {
    const router = useRouter();
    const campaignModal = useCampaignModal();

    const [step, setStep] = useState(STEPS.TYPE);
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            type: '',
            category: '',
            location: null,
            imageSrc: '',
            title: '',
            description: '',
            goalAmount: '',
            currentAmount: 0,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
        }
    });

    const type = watch('type');
    const category = watch('category');
    const location = watch('location');
    const imageSrc = watch('imageSrc');
    // const startDate = watch('dateRange')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data);
        if (step !== STEPS.GOAL) {
            return onNext();
        }


        setIsLoading(true);

        axios.post('/api/campaigns', {
            ...data,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
        })
            .then(() => {
                toast.success('Fundraiser launched!');
                setDateRange(initialDateRange);
                router.refresh();
                reset();
                setStep(STEPS.TYPE);
                campaignModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.GOAL) {
            return 'Launch';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.TYPE) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="What kind of fundraiser would you like to start?"
                subtitle=""
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {types.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <TypeInput
                            onClick={(type) => setCustomValue('type', type)}
                            selected={type === item.label}
                            label={item.label}
                            icon={item.icon}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.CATEGORY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What best describes why you're fundraising?"
                    subtitle="Pick a category"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where will the funds go?"
                    subtitle="Choose the location where you are running the campaign."
                />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo to your fundraiser"
                    subtitle="Upload an image that represents your fundraiser."
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your fundraiser?"
                    subtitle="Provide a short description that best describes your fundraiser to your audience."
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.DURATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Campaign Duration"
                    subtitle="How many days will you be running your fundraiser for?"
                />
                <CalendarPart
                    onChangeDate={(value) => setDateRange(value)}
                    dateRange={dateRange}
                // onSubmit={handleSubmit(onSubmit)}
                />
            </div>
        )
    }

    if (step === STEPS.GOAL) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your goal"
                    subtitle="How much would you like to raise?"
                />
                <Input
                    id="goalAmount"
                    label="Goal"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={campaignModal.isOpen}
            onClose={campaignModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.TYPE ? undefined : onBack}
            title="Start a fundraiser"
            body={bodyContent}
        />
    );
}

export default CampaignModal;