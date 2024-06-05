import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

export default function useToastLoader() {
  const toast = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (Object.entries(toast).length > 0) {
      setIsLoaded(true);
    }
  }, [toast]);

  return isLoaded;
}
