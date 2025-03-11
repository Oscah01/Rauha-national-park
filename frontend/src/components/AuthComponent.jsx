import { useState } from 'react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../firebase';

const AuthComponent = ({ setIsLoginMode, setIsModalOpen }) => {
  const [isLoginModeInternal, setIsLoginModeInternal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Sign In/Sign Up with Email
  const handleEmailSignIn = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      if (isLoginModeInternal) {
        await signInWithEmail(email, password); // Call signInWithEmail
      } else {
        await signUpWithEmail(email, password); // Call signUpWithEmail
        setIsLoginMode(true); // Switch to login mode after successful signup
      }
      setIsModalOpen(false); // Close modal after successful authentication
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); // Call signInWithGoogle
      setIsModalOpen(false); // Close modal after successful Google sign-in
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  // Toggle between Login and Signup modes
  const toggleMode = () => {
    setIsLoginModeInternal((prevMode) => !prevMode);
    setIsLoginMode((prevMode) => !prevMode); // Sync with parent component
  };

  return (
    <div className="auth-modal">
      <h2>{isLoginModeInternal ? 'Login' : 'Sign Up'}</h2>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="email-signin-btn">
          {isLoginModeInternal ? 'Sign in with Email' : 'Sign up with Email'}
        </button>
      </form>

      {/* Separator */}
      <div className="auth-separator">or</div>

      {/* Google Sign-In Button */}
      <button onClick={handleGoogleSignIn} className="google-signin-btn">
        <img
          src="/google-logo-NePEveMl.svg" // Path to the SVG file in the public folder
          alt="Google Logo"
          className="google-logo"
        />
        Continue with Google
      </button>

      {/* Toggle Between Login and Signup */}
      <div className="auth-toggle-mode">
        {isLoginModeInternal ? (
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={toggleMode}>
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button type="button" onClick={toggleMode}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;