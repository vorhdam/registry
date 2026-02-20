import { Mime } from "./definitions";
import { messages } from "./messages";

type WorkflowProps = {
  file: File;
  maxSize: number;
  accept: Mime[];
};

type WorkflowResult =
  | {
      success: true;
      file: File;
    }
  | {
      success: false;
      message: string;
    };

/**
 * This workflow executes everytime a user adds a new file to your input (feel free to add other params you need)
 * @param file The file that the user uploaded
 * @param maxSize The max size you allowed in the file context provider
 * @param accept The mimes the user can upload you allowed in the file context provider
 */
function workflow({ file, maxSize, accept }: WorkflowProps): WorkflowResult {
  // Add your validation, compression or any other file logic here:
  if (file.size > maxSize)
    return { success: false, message: messages["sizeLarge"] };
  if (!accept.includes(file.type))
    return { success: false, message: messages["typeInvalid"] };

  return {
    success: true,
    file: file,
  };
}

export { workflow };
