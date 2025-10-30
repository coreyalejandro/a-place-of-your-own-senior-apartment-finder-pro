import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-12 pt-24">
      <div className="max-w-md w-full bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
        <h1 className="font-serif text-3xl text-[#5C4A3C] mb-2 text-center">
          Create Your Account
        </h1>
        <p className="text-[#8B7355] mb-8 text-center">
          Let's get started on finding your perfect place
        </p>
        
        <RegisterForm />
        
        <p className="mt-6 text-center text-[#8B7355]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#8B7355] underline hover:text-[#5C4A3C]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
