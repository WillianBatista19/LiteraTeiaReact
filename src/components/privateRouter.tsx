import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        router.replace('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return null;
  }

  return <>{children}</>;
};