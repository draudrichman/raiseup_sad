'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { FaPaw, FaFirstAid } from 'react-icons/fa';
import { MdEvent, MdOutlineBiotech, MdOutlineSportsSoccer } from 'react-icons/md';
import { RiCommunityLine } from "react-icons/ri";
import { IoEarthSharp, IoBrushOutline } from "react-icons/io5";
import { GiEarthCrack } from "react-icons/gi";
import { CgSmartphoneRam } from "react-icons/cg";
import { FaSchool, FaMosque } from "react-icons/fa6";
import { BiPlusMedical } from "react-icons/bi";


import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
    {
        label: 'Animals',
        icon: FaPaw,
        description: 'Championing the welfare and protection of animals, both domestic and wild, for a more compassionate world.',
    },
    {
        label: 'Medical',
        icon: BiPlusMedical,
        description: 'Supporting individuals facing medical challenges by funding treatment, care, and recovery efforts.',
    },
    {
        label: 'Environment',
        icon: IoEarthSharp,
        description: 'Preserving natural habitats and promoting sustainability to safeguard our planet for future generations.',
    },
    {
        label: 'Education',
        icon: FaSchool,
        description: 'Empowering minds and shaping futures through access to quality education and lifelong learning opportunities.'
    },
    {
        label: 'Community',
        icon: RiCommunityLine,
        description: 'Fostering connections and strengthening local communities through collaborative efforts and civic engagement.'
    },
    {
        label: 'Faith',
        icon: FaMosque,
        description: 'Nurturing spiritual growth and community bonds through religious and faith-based initiatives.'
    },
    {
        label: 'Sports',
        icon: MdOutlineSportsSoccer,
        description: 'Supporting athletic endeavors and promoting physical well-being through sports and recreation.'
    },
    {
        label: 'Tech',
        icon: CgSmartphoneRam,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Science',
        icon: MdOutlineBiotech,
        description: 'Fueling groundbreaking research and exploration to unravel the mysteries of our world and beyond.'
    },
    {
        label: 'Creative',
        icon: IoBrushOutline,
        description: 'Empowering artistic endeavors and innovative projects that inspire creativity and imagination.'
    },
    {
        label: 'Humanitarian Aid',
        icon: FaFirstAid,
        description: 'Supporting crucial aid and relief efforts in crisis-stricken regions worldwide.'
    },
    {
        label: 'Event',
        icon: MdEvent,
        description: 'Funding memorable experiences and gatherings that bring people together for a cause or celebration.'
    },
    {
        label: 'Disaster Relief',
        icon: GiEarthCrack,
        description: 'Providing urgent assistance to communities affected by natural disasters.'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;