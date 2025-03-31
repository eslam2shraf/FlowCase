'use client'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setLoading, setError, setUser } from '@/redux/slices/authSlice'

const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error: reduxError } = useAppSelector(state => state.auth);
  
  const [
    createUserWithEmailAndPassword,
    user,
    firebaseLoading,
    firebaseError
  ] = useCreateUserWithEmailAndPassword(auth);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const res = await createUserWithEmailAndPassword(data.email, data.password);
      if (res && res.user) {
        dispatch(setUser({
          uid: res.user.uid,
          email: res.user.email,
            }));
        sessionStorage.setItem('user', true);
        reset(); // Clear form
        router.push('/');
      } else {
        console.log('No response from signup');
      }
    } catch(e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
<div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Create Account</h1>
        
        {reduxError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-6">
            {reduxError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email" 
              className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password" 
              className="w-full p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link 
            href="/sign-in" 
            className="text-indigo-500 hover:text-indigo-400 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;