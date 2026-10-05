'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase client auto-detects the session in the URL hash
        // (implicit flow). Give it a beat to process.
        await new Promise((resolve) => setTimeout(resolve, 300));

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setError(error.message);
          return;
        }

        if (data.session) {
          router.replace('/');
        } else {
          // Retry once after a longer wait
          setTimeout(async () => {
            const { data: retryData } = await supabase.auth.getSession();
            if (retryData.session) {
              router.replace('/');
            } else {
              setError('Could not establish session. Please try again.');
            }
          }, 1500);
        }
      } catch (e) {
        setError('Something went wrong during sign-in.');
        console.error(e);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {error ? (
          <>
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-5 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 py-2 rounded-full transition"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-10 h-10 animate-spin text-purple-700 mx-auto" />
            <p className="text-slate-500 mt-4">Signing you in...</p>
          </>
        )}
      </div>
    </div>
  );
}