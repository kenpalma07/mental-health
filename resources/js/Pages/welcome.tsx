import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
// import AppLogo from '@/components/ui/app-logo'; // Adjust path as needed

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Header Section with Background */}
            <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6 px-6 lg:px-10">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        {/* <AppLogo className="h-10 w-auto" /> */}
                        <span className="text-xl font-bold tracking-tight">MindWell</span>
                    </Link>

                    {/* Auth Buttons */}
                    <div>
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-md bg-white text-indigo-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="mr-2 rounded-md border border-white px-4 py-2 text-sm font-medium hover:bg-white hover:text-indigo-700 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-md bg-white text-indigo-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] p-6 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* 60% Card */}
                    <div className="lg:w-[60%] bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold mb-4">12S Mental Wellness Steps</h2>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Self-awareness</li>
                            <li>Scheduling & Time Management</li>
                            <li>Siesta (Short Rest)</li>
                            <li>Sensible Diet & Exercise</li>
                            <li>Stress Debriefing</li>
                            <li>Sports</li>
                            <li>Social Connection</li>
                            <li>Sounds & Music</li>
                            <li>Speak to Someone</li>
                            <li>Smile</li>
                            <li>Sensation Techniques</li>
                            <li>Spirituality</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            Huwag mahiyang humingi ng tulong. Tumawag sa MHO Helpline: 0946-082-2161
                        </p>
                    </div>

                    {/* 40% Card */}
                    <div className="lg:w-[40%] bg-[#F0F4F8] dark:bg-[#2a2a2a] p-6 rounded-xl shadow text-center">
                        <h2 className="text-xl font-semibold mb-3">Mental Health Matters</h2>
                        <p className="italic mb-4 text-sm">
                            "You don’t have to control your thoughts. You just have to stop letting
                            them control you." — Dan Millman
                        </p>
                        <img
                            src="/images/mental_health.jpg"
                            alt="Mental Health Poster"
                            className="w-full rounded"
                        />
                        <p className="mt-4 text-sm">Need someone to talk to?</p>
                        <p className="text-sm">DOH Helpline: 0927-230-4885 / 0908-615-8754</p>
                    </div>
                </div>
            </div>
        </>
    );
}
