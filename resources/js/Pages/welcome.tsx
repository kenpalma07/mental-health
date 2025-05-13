import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const carouselImages = [
    {
        src: '/assets/img/dashboard/men.jpg',
    },
    {
        src: '/assets/img/dashboard/men1.jpg',
    },
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // Set up automatic slide transition every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // 3000 ms = 3 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

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

            {/* Main Section with the carousel centered at the top with gap from header
            <div className="mt-6 flex min-h-screen flex-col items-center justify-start bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <div className="relative w-full max-w-4xl"> */}
                    {/* Carousel Card */}
                    {/* <div className="relative flex items-center justify-center">
                        <img
                            src={carouselImages[currentSlide].src}
                            alt="Mental Health Poster"
                            className="h-[60vh] w-full rounded-lg object-cover shadow-lg" // Added shadow effect here
                        /> */}
                    {/* Arrows */}
                    {/* <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 hover:bg-white dark:bg-black/50 dark:text-white"
                        > */}
                    ‹
                    {/* </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 hover:bg-white dark:bg-black/50 dark:text-white"
                        > */}
                    ›{/* </button> */}
                    {/* </div> */}
                {/* </div>
            </div> */}
        </>
    );
}
