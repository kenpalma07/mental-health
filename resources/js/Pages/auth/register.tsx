import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, UserPlus } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogoIconBG from '@/components/app-logo-icon-bg';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoMental from '@/components/app-logo-assess_mental';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background */}
            <AppLogoIconBG className="absolute inset-0 w-full h-full object-cover opacity-100 z-0" />
            <div className="absolute inset-0 bg-black/60 z-[1]" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                {/* Combined Card */}
                <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">

                    {/* Logo Side */}
                    <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-between text-center">
                        {/* Logos */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <AppLogoDOH />
                            <AppLogoBP />
                        </div>

                        {/* Text */}
                        <div>
                            <h3 className="text-xl font-bold text-green-700">DEPARTMENT OF HEALTH</h3>
                            <p className="text-lg text-gray-700 font-bold">eMental Health System</p>
                            <div className="mt-4">
                                <AppLogoMental />
                            </div>
                        </div>

                        {/* Version */}
                        <div className="text-xs text-gray-500 italic mt-4">Version 1.0</div>
                    </div>

                    {/* Separator */}
                    <div className="hidden lg:block w-px bg-black/20" />

                    {/* Register Form Side */}
                    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                        <Head title="Register" />

                        {/* Header */}
                        <div className="flex items-center justify-center gap-2 text-green-700 text-2xl font-bold mb-6">
                            <UserPlus className="w-10 h-10" />
                            <span>REGISTER ACCOUNT</span>
                        </div>

                        <p className="text-sm text-center text-gray-600 mb-6">
                            Enter your details below to create your account
                        </p>

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Full name"
                                        className="bg-white text-black placeholder-gray-400"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                        className="bg-white text-black placeholder-gray-400"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Password"
                                        className="bg-white text-black placeholder-gray-400"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm password"
                                        className="bg-white text-black placeholder-gray-400"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Create account
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-center text-sm mt-4">
                                Already have an account?{' '}
                                <TextLink href="/login" tabIndex={6}>
                                    Log in
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
