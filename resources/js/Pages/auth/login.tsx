import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, KeyRound } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogoIconBG from '@/components/app-logo-icon-bg';
import AppLogoDOH from '@/components/app-logo-assess_doh';
import AppLogoBP from '@/components/app-logo-assess_bp';
import AppLogoMental from '@/components/app-logo-assess_mental';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
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
        <div className="flex flex-col lg:flex-row bg-white/90 backdrop-blur-md rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">
          {/* Logo Side */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-between text-center">
            {/* Logos Row */}
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

          {/* Login Form Side */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
            <Head title="Log in" />

            {/* Heading with icons */}
            <div className="flex items-center justify-center gap-2 text-green-700 text-2xl font-bold mb-6">
              <Lock className="w-6 h-6" />
              <KeyRound className="w-6 h-6 -ml-2" />
              <span>LOGIN</span>
            </div>

            <p className="text-sm text-center text-gray-600 mb-6">
              Enter your email and password to access your account.
            </p>

            <form className="flex flex-col gap-6" onSubmit={submit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@example.com"
                  />
                  <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {canResetPassword && (
                      <TextLink href="/forgot-password" className="ml-auto text-sm" tabIndex={5}>
                        Forgot password?
                      </TextLink>
                    )}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    tabIndex={2}
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Password"
                  />
                  <InputError message={errors.password} />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={data.remember}
                    onClick={() => setData('remember', !data.remember)}
                    tabIndex={3}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>

                <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                  Log in
                </Button>
              </div>

              <div className="text-muted-foreground text-center text-sm mt-4">
                Don't have an account?{' '}
                <TextLink href="/register" tabIndex={5}>
                  Sign up
                </TextLink>
              </div>
            </form>

            {status && (
              <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
