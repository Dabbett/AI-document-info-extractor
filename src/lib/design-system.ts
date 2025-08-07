// Design System - Centralized colors and styles
export const colors = {
  // Primary gradients
  primary: {
    from: 'from-purple-600',
    to: 'to-pink-600',
    hoverFrom: 'hover:from-purple-700',
    hoverTo: 'hover:to-pink-700',
    overlay: 'from-purple-400 to-pink-400',
  },
  
  // Secondary gradients
  secondary: {
    from: 'from-blue-600',
    to: 'to-purple-600',
    hoverFrom: 'hover:from-blue-700',
    hoverTo: 'hover:to-purple-700',
    overlay: 'from-blue-400 to-purple-400',
  },
  
  // Success gradients
  success: {
    from: 'from-green-600',
    to: 'to-emerald-600',
    hoverFrom: 'hover:from-green-700',
    hoverTo: 'hover:to-emerald-700',
    overlay: 'from-green-400 to-emerald-400',
  },
  
  // Background gradients
  background: {
    from: 'from-indigo-900',
    via: 'via-purple-900',
    to: 'to-pink-900',
  },
  
  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-purple-200',
    muted: 'text-purple-300',
    accent: 'text-purple-400',
  },
  
  // Glassmorphism
  glass: {
    bg: 'bg-white/10',
    border: 'border-white/20',
    hover: 'hover:bg-white/15',
  },
  
  // Status colors
  status: {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-400',
      text: 'text-green-100',
      icon: 'text-green-400',
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-400',
      text: 'text-red-100',
      icon: 'text-red-400',
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400',
      text: 'text-yellow-100',
      icon: 'text-yellow-400',
    },
  },
};

// Button variants with the signature effect
export const buttonVariants = {
  primary: {
    base: `group relative overflow-hidden bg-gradient-to-r ${colors.primary.from} ${colors.primary.to} ${colors.primary.hoverFrom} ${colors.primary.hoverTo} font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0`,
    content: 'relative z-10 text-white',
    overlay: `absolute inset-0 bg-gradient-to-r ${colors.primary.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`,
    shine: 'absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700',
  },
  
  secondary: {
    base: `group relative overflow-hidden bg-gradient-to-r ${colors.secondary.from} ${colors.secondary.to} ${colors.secondary.hoverFrom} ${colors.secondary.hoverTo} font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0`,
    content: 'relative z-10 text-white',
    overlay: `absolute inset-0 bg-gradient-to-r ${colors.secondary.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`,
    shine: 'absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700',
  },
  
  success: {
    base: `group relative overflow-hidden bg-gradient-to-r ${colors.success.from} ${colors.success.to} ${colors.success.hoverFrom} ${colors.success.hoverTo} font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0`,
    content: 'relative z-10 text-white',
    overlay: `absolute inset-0 bg-gradient-to-r ${colors.success.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`,
    shine: 'absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700',
  },
  
  glass: {
    base: `group relative overflow-hidden backdrop-blur-lg ${colors.glass.bg} ${colors.glass.border} hover:${colors.glass.hover} font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border`,
    content: 'relative z-10 text-white',
    overlay: 'absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    shine: 'absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700',
  },
};

// Helper function to get button classes
export const getButtonClasses = (variant: keyof typeof buttonVariants, disabled?: boolean) => {
  const styles = buttonVariants[variant];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return `${styles.base} ${disabledClasses}`;
};

// Background classes
export const backgrounds = {
  main: `min-h-screen bg-gradient-to-br ${colors.background.from} ${colors.background.via} ${colors.background.to} relative overflow-hidden`,
  glass: `backdrop-blur-xl ${colors.glass.bg} rounded-3xl ${colors.glass.border} shadow-2xl`,
  glassHover: `backdrop-blur-xl py-10 ${colors.glass.bg} rounded-3xl ${colors.glass.border} shadow-2xl ${colors.glass.hover} transition-all duration-500 hover:scale-105 hover:shadow-3xl`,
};

// Animation delays for staggered animations
export const animationDelays = {
  delay100: 'animation-delay-100',
  delay200: 'animation-delay-200',
  delay300: 'animation-delay-300',
  delay400: 'animation-delay-400',
  delay500: 'animation-delay-500',
  delay600: 'animation-delay-600',
  delay700: 'animation-delay-700',
  delay800: 'animation-delay-800',
  delay900: 'animation-delay-900',
  delay1000: 'animation-delay-1000',
}; 