import toast, { ToastOptions } from 'react-hot-toast';

// Cấu hình mặc định cho toast
const defaultOptions: ToastOptions = {
  duration: 4000,
  position: 'top-center',
  style: {
    borderRadius: '8px',
    background: '#363636',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    padding: '12px 16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
};

// Custom toast methods
export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#10B981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
      ...options,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#EF4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#EF4444',
      },
      ...options,
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultOptions,
      icon: '⚠️',
      style: {
        ...defaultOptions.style,
        background: '#F59E0B',
        color: '#fff',
      },
      ...options,
    }),

  info: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultOptions,
      icon: 'ℹ️',
      style: {
        ...defaultOptions.style,
        background: '#3B82F6',
        color: '#fff',
      },
      ...options,
    }),

  loading: (message: string, options?: ToastOptions) =>
    toast.loading(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#6B7280',
        color: '#fff',
      },
      ...options,
    }),

  custom: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultOptions,
      ...options,
    }),

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ToastOptions
  ) =>
    toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        ...defaultOptions,
        success: {
          ...defaultOptions,
          style: {
            ...defaultOptions.style,
            background: '#10B981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        },
        error: {
          ...defaultOptions,
          style: {
            ...defaultOptions.style,
            background: '#EF4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        },
        loading: {
          ...defaultOptions,
          style: {
            ...defaultOptions.style,
            background: '#6B7280',
            color: '#fff',
          },
        },
        ...options,
      }
    ),
};

// Export default toast for advanced usage
export { toast };
export default showToast; 