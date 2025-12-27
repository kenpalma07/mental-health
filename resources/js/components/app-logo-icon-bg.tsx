import { ImgHTMLAttributes } from 'react';

export default function AppLogoIconBG(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/assets/img/background/doh_build_high.jpeg"
            alt="Department of Health"
            className="object-cover w-full h-full"
            {...props}
        />
    );
}
