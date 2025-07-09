import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const carouselImages = [
    { src: '/assets/img/dashboard/men.jpg' },
    { src: '/assets/img/dashboard/men1.jpg' },
    { src: '/assets/img/dashboard/Brochure.jpg' },
    { src: '/assets/img/dashboard/Brochure2.jpg' },
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        setFade(false);
        timeoutRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
            setFade(true);
        }, 600); // slower for smoother fade
    };

    const prevSlide = () => {
        setFade(false);
        timeoutRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
            setFade(true);
        }, 600); // slower for smoother fade
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3500);
        return () => {
            clearInterval(interval);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentSlide]);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-violet-400 to-green-500 px-6 py-6 text-white lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="/assets/img/logos/bp_logo.png" alt="BP Logo" className="h-10 w-auto" />
                        <img src="/assets/img/logos/Department_of_Health.svg" alt="DOH Logo" className="h-10 w-auto" />
                        <span className="text-xl font-bold tracking-tight max-[512px]:hidden">Mental Health System</span>
                    </Link>
                    <div className="flex items-center gap-2 max-[611px]:grid max-[611px]:grid-cols-2 sm:flex-row sm:gap-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-md border border-white px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-indigo-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-gray-100"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-1 lg:grid-rows-5 gap-4 p-4 sm:p-6">
                {/* Main Card with Full Image */}
                <div className="lg:col-span-3 lg:row-span-5 col-span-1 row-span-1">
                    <Card className="w-full h-full aspect-square max-h-[600px] flex flex-col justify-center items-center  shadow-xl rounded-2xl overflow-hidden p-0">
                        <CardContent className="w-full h-full flex flex-col items-center justify-center p-0 relative">
                            {/* Low opacity background image */}
                            <img
                                src={carouselImages[currentSlide].src}
                                alt="Mental Health Slide"
                                className={`absolute top-0 left-0 w-full h-full object-cover z-0 opacity-10 transition-opacity duration-700 ${fade ? 'opacity-10' : 'opacity-0'}`}
                            />
                            <Card
                                className={`absolute inset-0 flex items-center justify-center rounded-[10px] shadow-2xl transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
                                style={{ margin: 'auto', pointerEvents: 'none', background: 'transparent', border: 'none' }}
                            >
                                <img
                                    src={carouselImages[currentSlide].src}
                                    alt="Mental Health Slide High"
                                    className="w-[90%] h-[90%] object-contain rounded-[10px] m-auto bg-transparent"
                                    draggable={false}
                                />
                            </Card>

                            {/* Carousel Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white z-20"
                                aria-label="Previous"
                                type="button"
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white z-20"
                                aria-label="Next"
                                type="button"
                            >
                                &#8594;
                            </button>
                        </CardContent>
                    </Card>
                </div>
                {/* Side Card */}
                <div className="lg:col-span-2 lg:row-span-5 col-span-1 row-span-1">
                    <Card className="h-[300px] sm:h-[400px] lg:h-full flex flex-col justify-center items-center shadow-xl rounded-2xl bg-gradient-to-br from-green-100 to-violet-100">
                        <CardContent className="w-full flex flex-col items-center p-8">
                            {/* <div className="w-full mb-4">
                                <div className="text-center bg-gradient-to-r from-violet-400 to-green-500 bg-opacity-90 rounded-xl px-4 py-3 shadow-lg max-w-xs mx-auto text-white">
                                    <h2 className="text-lg sm:text-2xl font-bold text-white">Welcome to the Mental Health System</h2>
                                    <p className="mt-2 text-white text-sm sm:text-base">
                                        Empowering communities for better mental health and well-being.
                                    </p>
                                </div>
                            </div> */}
                            <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-4">Did you know?</h3>
                            <p className="text-gray-700 text-center text-sm sm:text-base">
                                Mental health is just as important as physical health. Take a step today for a healthier mind!
                            </p>
                            <Link
                                href="/register"
                                className="mt-6 rounded-md bg-green-600 px-6 py-2 text-white font-semibold hover:bg-green-700 transition"
                            >
                                Get Started
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}