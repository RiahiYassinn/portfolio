import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  target?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  target,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg dark:bg-accent-500 dark:hover:bg-accent-600 dark:text-dark-500',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border border-accent-500 hover:bg-accent-500/10 text-accent-500',
  };

  // Disabled classes
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'transform hover:-translate-y-0.5 transition-transform';

  // Combined classes
  const buttonClasses = `rounded-md font-medium transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;