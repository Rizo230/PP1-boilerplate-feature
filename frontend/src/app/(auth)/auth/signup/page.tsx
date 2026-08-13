'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/team')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '380px' }}>
        <div className="card-body p-4">
          <p className="text-uppercase text-primary small fw-semibold mb-1" style={{ letterSpacing: '0.05em' }}>
            Authentication
          </p>
          <h1 className="fw-bold mb-1">Create account</h1>
          <p className="text-muted small mb-4">Get started for free</p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="d-flex align-items-center gap-3 my-3">
            <hr className="flex-grow-1" />
            <span className="text-muted small text-uppercase">or</span>
            <hr className="flex-grow-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="displayName" className="form-label small fw-medium">
                Name
              </label>
              <input
                id="displayName"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.displayName}
                aria-describedby={errors.displayName ? 'display-name-error' : undefined}
                className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}
                placeholder="Your full name"
                {...register('displayName')}
              />
              {errors.displayName && (
                <div id="display-name-error" className="invalid-feedback">
                  {errors.displayName.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label small fw-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <div id="email-error" className="invalid-feedback">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label small fw-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Min. 8 characters, 1 uppercase, 1 number"
                {...register('password')}
              />
              {errors.password && (
                <div id="password-error" className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label small fw-medium">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <div id="confirm-password-error" className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              )}
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Already have an account?{' '}
            <Link href="/auth/signin" className="fw-medium text-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}