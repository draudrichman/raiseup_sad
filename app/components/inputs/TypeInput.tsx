'use client';

import { IconType } from "react-icons";

interface TypeInputProps {
    icon: IconType,
    label: string;
    description: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const TypeInput: React.FC<TypeInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick,
    description
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer h-25
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {label}
            </div>
            <div className="text-gray-500 text-sm">
                {description}
            </div>
        </div>
    );
}

export default TypeInput;