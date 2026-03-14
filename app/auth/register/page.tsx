import { RegisterForm } from '@/components/auth/register-form';

export const metadata = {
  title: 'Daftar - ModulAjar',
  description: 'Daftar ke platform ModulAjar',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
