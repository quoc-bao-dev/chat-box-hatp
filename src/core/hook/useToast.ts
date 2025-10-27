import showToast from "../utils/toast";

// Custom hook để sử dụng toast
export const useToast = () => {
  return {
    success: showToast.success,
    error: showToast.error,
    warning: showToast.warning,
    info: showToast.info,
    loading: showToast.loading,
    custom: showToast.custom,
    promise: showToast.promise,
  };
};

export default useToast; 