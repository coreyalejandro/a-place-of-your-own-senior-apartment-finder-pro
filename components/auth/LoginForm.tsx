'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement Supabase auth when configured
      console.log('Login:', formData);
      router.push('/dashboard');
    } catch (error: any) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block font-serif text-lg text-[#5C4A3C] mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 text-lg border-2 border-[#D4C4B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-serif text-lg text-[#5C4A3C] mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 text-lg border-2 border-[#D4C4B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
        />
      </div>

      {errors.submit && (
        <p className="text-red-600 text-sm" role="alert">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-4 bg-[#8B7355] text-[#FAF8F5] rounded-md hover:bg-[#5C4A3C] transition-colors text-lg font-medium min-h-[48px] disabled:opacity-50"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
