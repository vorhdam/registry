import { bindContext } from "@/components/ui/file";
import { useContext } from "react";

export default function useFiles(providerId: string) {
  const Context = bindContext(providerId);
  const context = useContext(Context);
  if (!context)
    throw new Error(
      `The useFiles() hook must be used within the boundaries of a FileProvider with id: "${providerId}".`,
    );
  return context;
}
