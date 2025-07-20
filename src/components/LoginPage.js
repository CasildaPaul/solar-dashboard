import React, { useState } from 'react';
import { Sun, Eye, EyeOff, User, Lock } from 'lucide-react';

const LoginPage = ({ onLogin, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin1125') {
        onLogin();
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const theme = {
    backgroundColor: darkMode ? '#111827' : '#F9FAFB',
    cardBg: darkMode ? '#1F2937' : '#FFFFFF',
    textColor: darkMode ? '#E5E7EB' : '#111827',
    mutedTextColor: darkMode ? '#9CA3AF' : '#6B7280',
    inputBg: darkMode ? '#374151' : '#FFFFFF',
    inputBorder: darkMode ? '#4B5563' : '#D1D5DB',
    inputFocus: darkMode ? '#3B82F6' : '#3B82F6',
    buttonBg: '#3B82F6',
    buttonHover: '#2563EB',
    errorBg: darkMode ? '#7F1D1D' : '#FEE2E2',
    errorText: darkMode ? '#FECACA' : '#B91C1C',
    shadowColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: theme.cardBg,
        borderRadius: '0.75rem',
        boxShadow: `0 10px 25px ${theme.shadowColor}`,
        padding: '2rem',
        transition: 'all 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{
              backgroundColor: '#3B82F6',
              borderRadius: '50%',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sun style={{ width: '2rem', height: '2rem', color: 'white' }} />
            </div>
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: theme.textColor,
            marginBottom: '0.5rem'
          }}>
            Solar Dashboard
          </h1>
          <p style={{
            color: theme.mutedTextColor,
            fontSize: '0.875rem'
          }}>
            Sign in to access your solar energy management system
          </p>
        </div>

        {/* Demo Credentials */}
        <div style={{
          backgroundColor: darkMode ? '#1F2937' : '#F3F4F6',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: theme.mutedTextColor,
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            Demo Credentials:
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: theme.textColor,
            fontFamily: 'monospace'
          }}>
            Email: admin@gmail.com<br />
            Password: admin1125
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: theme.errorBg,
            color: theme.errorText,
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme.textColor,
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1rem',
                height: '1rem',
                color: theme.mutedTextColor
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  backgroundColor: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: '0.5rem',
                  color: theme.textColor,
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.inputFocus;
                  e.target.style.boxShadow = `0 0 0 3px ${theme.inputFocus}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.inputBorder;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme.textColor,
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1rem',
                height: '1rem',
                color: theme.mutedTextColor
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  backgroundColor: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: '0.5rem',
                  color: theme.textColor,
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.inputFocus;
                  e.target.style.boxShadow = `0 0 0 3px ${theme.inputFocus}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.inputBorder;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: theme.mutedTextColor,
                  padding: '0.25rem'
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '1rem', height: '1rem' }} />
                ) : (
                  <Eye style={{ width: '1rem', height: '1rem' }} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? theme.mutedTextColor : theme.buttonBg,
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = theme.buttonHover;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = theme.buttonBg;
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: theme.mutedTextColor
          }}>
            Secure solar energy management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;