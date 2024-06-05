import { ToastOptions, useToast } from "react-native-toast-notifications";

type NotificationProps = {
  message: string | JSX.Element;
  options?: ToastOptions | {};
};

const useNotification = () => {
  const toast = useToast();

  const showNotification = ({ message, options = {} }: NotificationProps) => {
    toast.hideAll();
    toast.show(message, {
      placement: "top",
      duration: 3000,
      type: "success",
      ...options,
    });
  };

  return showNotification;
};

export default useNotification;
