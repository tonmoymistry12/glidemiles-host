'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useListingStore } from '@/store/listingStore';
import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { updatePropertyData, setCurrentStep } = useListingStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: 'test.t@gmail.com',
    password: '',
    confirmPassword: '',
    keepSignedIn: false
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Since joining Glidemiles Holidays, my bookings increased by 40% and I keep 95% of my earnings. Best decision ever!",
      author: "Sarah & Mike, Hotel Owners"
    },
    {
      quote: "The dashboard is incredibly easy to use. I can manage all my bookings and see analytics in real-time.",
      author: "Rajesh Kumar, B&B Owner"
    },
    {
      quote: "Customer support is amazing! They helped me optimize my listing and now I'm getting bookings from all over the world.",
      author: "Maria Santos, Villa Owner"
    },
    {
      quote: "Low commission rates and instant payouts make this platform perfect for property owners like me.",
      author: "David Chen, Apartment Host"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    updatePropertyData({ email: formData.email });
    setCurrentStep('listing-options');
    router.push('/listing');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {/* Left Side - Blue Gradient Card */}
          <div className={styles.leftCard}>
            {/* Logo and Tagline */}
            <div className={styles.logoSection}>
              <div className={styles.logoContainer}>
                <img 
                  src="/images/logo/glidemiles_white.png" 
                  alt="Glidemiles Holidays" 
                  className={styles.logoImage}
                />
              </div>
              <h2 className={styles.tagline}>
              Your Space, Their Stay – Grow with Glidemiles Holidays
              </h2>
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Increase Bookings</h3>
                  <p className={styles.featureDescription}>Reach millions of travelers worldwide</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Boost Revenue</h3>
                  <p className={styles.featureDescription}>Competitive commission rates and instant payouts</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Easy Management</h3>
                  <p className={styles.featureDescription}>Complete dashboard to manage bookings and analytics</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>24/7 Support</h3>
                  <p className={styles.featureDescription}>Dedicated partner support team</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className={styles.testimonial}>
              <blockquote className={styles.testimonialQuote}>
                &quot;{testimonials[currentTestimonial].quote}&quot;
              </blockquote>
              <p className={styles.testimonialAuthor}>- {testimonials[currentTestimonial].author}</p>
              <div className={styles.testimonialDots}>
                {testimonials.map((_, index) => (
                  <div 
                    key={index}
                    className={`${styles.dot} ${index === currentTestimonial ? styles.dotActive : styles.dotInactive}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Bottom Text */}
            <div className={styles.bottomText}>
              <p className={styles.bottomTextContent}>Start earning more with Glidemiles Holidays today</p>
            </div>
          </div>

          {/* Right Side - Login/Signup Form Card */}
          <div className={styles.rightCard}>
            <div className={styles.formContainer}>
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerIconContainer}>
                  <div className={styles.userIcon}>
                    <svg className={styles.userIconSvg} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className={styles.headerTitle}>
                    {isSignUp ? 'Create Your Account' : 'Access Your Account'}
                  </h2>
                </div>
                <p className={styles.headerSubtitle}>
                  {isSignUp ? 'Join thousands of successful property partners' : 'Access your property dashboard and start earning more'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputIcon}>
                      <svg className={styles.inputIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={styles.input}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputIcon}>
                      <svg className={styles.inputIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`${styles.input} ${styles.passwordInput}`}
                      placeholder="Enter your password"
                      required
                    />
                    <div className={styles.passwordToggle}>
                      <button type="button">
                        <svg className={styles.passwordToggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {isSignUp && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <div className={styles.inputContainer}>
                      <div className={styles.inputIcon}>
                        <svg className={styles.inputIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={styles.input}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {!isSignUp && (
                  <div className={styles.forgotPassword}>
                    <a href="#" className={styles.forgotPasswordLink}>
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  {isSignUp ? 'Create Account' : 'Login'}
                </button>
              </form>

              {/* Bottom Links */}
              <div className={styles.bottomLinks}>
                <p className={styles.bottomLinksText}>
                  {isSignUp ? "Don't have an account? " : "Don't have an account? "}
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className={styles.bottomLinksButton}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}