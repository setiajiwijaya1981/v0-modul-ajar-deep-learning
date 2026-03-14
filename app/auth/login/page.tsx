import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Masuk - ModulAjar',
  description: 'Masuk ke platform ModulAjar',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
