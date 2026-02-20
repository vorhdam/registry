"use client";

import * as React from "react";

import useFileContext from "@/hooks/use-files";
import {
  DefaultFileContext,
  FileContext,
  FileProviderProps,
  getFileSize,
  Metadata,
} from "@/lib/file/definitions";
import { messages } from "@/lib/file/messages";
import { workflow } from "@/lib/file/workflow";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Alert, AlertDescription } from "./alert";
import { Button } from "./button";
import { Progress } from "./progress";

const contextMap = new Map<string, React.Context<FileContext>>();

export function bindContext(providerId: string): React.Context<FileContext> {
  if (!contextMap.has(providerId))
    contextMap.set(
      providerId,
      React.createContext<FileContext>(DefaultFileContext),
    );
  return contextMap.get(providerId)!;
}

function FileProvider({
  providerId,
  maxFiles,
  maxSize,
  accept,
  children,
}: FileProviderProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [metadatas, setMetadatas] = React.useState<Metadata[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<number | null>(null);

  const addFiles = (fileList: FileList | null) => {
    setError(null);

    if (!fileList || fileList.length === 0)
      return setError(messages["noFiles"]);
    const newFiles: File[] = Array.from(fileList);

    if (files.length + newFiles.length > maxFiles)
      return setError(messages["tooManyFiles"]);

    setProgress(0);

    try {
      for (let file of newFiles) {
        const result = workflow({ file, maxSize, accept });
        if (!result.success) return setError(result.message);

        const metadata: Metadata = {
          name: file.name,
          size: file.size,
          type: file.type,
        };

        setFiles((prev) => [...prev, file]);
        setMetadatas((prev) => [...prev, metadata]);

        setProgress(
          (prev) => Number(prev) + Number((100 / newFiles.length).toFixed(0)),
        );
      }
    } catch (error) {
      setError(messages["unexpected"]);
      console.error("An error occured while validating files", error);
    } finally {
      setProgress(null);
    }
  };

  const removeFile = (index: number) => {
    if (index >= 0 && index < files.length) {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setMetadatas((prev) => prev.filter((_, i) => i !== index));
      setError(null);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setMetadatas([]);
    setError(null);
  };

  const values: FileContext = {
    providerId,
    maxFiles,
    maxSize,
    accept,
    files,
    metadatas,
    error,
    progress,
    addFiles,
    removeFile,
    clearFiles,
  };

  const Context = bindContext(providerId);

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

const preventDefault = (e: React.DragEvent) => e.preventDefault();
const FileInputContext = React.createContext<string | null>(null);

const useFiles = () => {
  const id = React.useContext(FileInputContext);
  if (!id) throw new Error("useFiles should be in a file provider");
  return useFileContext(id);
};

function FileInput({
  providerId,
  className,
  children,
  ...props
}: React.ComponentProps<"form"> & {
  providerId: string;
}) {
  const context = useFileContext(providerId);

  return (
    <FileInputContext.Provider value={providerId}>
      <form data-slot="file-input" className={className} {...props}>
        {children}
      </form>
    </FileInputContext.Provider>
  );
}

function FileField({
  className,
  children,
  ...props
}: React.ComponentProps<"input">) {
  const { providerId, metadatas, maxFiles, accept, addFiles } = useFiles();

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleFileDrop = (event: React.DragEvent<HTMLInputElement>) => {
    preventDefault(event);
    addFiles(event.dataTransfer.files);
  };

  const handleClick = () => {
    document.getElementById(`file-input-${providerId}`)?.click();
  };

  return (
    <div hidden={metadatas.length > 0}>
      <input
        id={`file-input-${providerId}`}
        type="file"
        name={metadatas.length === 0 ? "files" : undefined}
        hidden
        accept={accept.join(", ")}
        multiple={maxFiles > 1}
        onChange={handleFileAdd}
        onDrop={handleFileDrop}
        {...props}
      />
      {metadatas.length > 0 && (
        <input
          type="hidden"
          name="files"
          value={JSON.stringify(metadatas)}
          readOnly
        />
      )}
      <div
        data-slot="file-input-field"
        className={cn(
          "flex flex-col justify-center items-center gap-4 bg-card text-card-foreground border border-dashed border-border min-h-48 max-h-60 rounded-2xl py-6 shadow-sm cursor-pointer",
          className,
        )}
        onClick={handleClick}
        onDrop={handleFileDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
      >
        {children}
      </div>
    </div>
  );
}

function FileList({ className, ...props }: React.ComponentProps<"div">) {
  const { files, removeFile } = useFiles();

  return (
    <div
      hidden={files.length === 0}
      data-slot="file-input-list"
      className={cn(
        "flex flex-col h-fit max-h-60 p-2 rounded-3xl border-border border bg-card",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2 overflow-auto w-full h-full rounded-2xl">
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            onRemove={() => removeFile(index)}
          />
        ))}
      </div>
    </div>
  );
}

function FileItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <div
      data-slot="file-input-item"
      className="flex flex-row justify-between items-center gap-2 p-2 pl-4 bg-muted/75 text-card-foreground w-full rounded-2xl"
    >
      <div className="flex flex-col">
        <span className="truncate">{file.name}</span>
        <span className="text-xs text-muted-foreground">
          {getFileSize(file.size)}
        </span>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="rounded-full cursor-pointer bg-muted-foreground/15"
        onClick={onRemove}
      >
        <X />
      </Button>
    </div>
  );
}

function FileError({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { error } = useFiles();

  return (
    <Alert hidden={!error} className="mt-2">
      <AlertDescription
        data-slot="file-input-error"
        className={cn("leading-none text-sm text-destructive", className)}
        {...props}
      >
        {error ? error : children}
      </AlertDescription>
    </Alert>
  );
}

function FileSubmit({ className, ...props }: React.ComponentProps<"button">) {
  const { progress, metadatas } = useFiles();

  return (
    <Button
      type="submit"
      variant="default"
      className={cn("mt-4 w-full", className)}
      disabled={Boolean(progress) || metadatas.length === 0}
      {...props}
    />
  );
}

function FileContent({ className, ...props }: React.ComponentProps<"div">) {
  const { progress } = useFiles();

  return (
    <div
      hidden={Boolean(progress)}
      data-slot="file-input-content"
      className={cn(
        "flex flex-col justify-center items-center text-center gap-2 px-6",
        className,
      )}
      {...props}
    />
  );
}

function FileIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-input-icon"
      className={cn("size-8 text-primary", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function FileTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-input-title"
      className={cn("leading-none text-lg font-semibold", className)}
      {...props}
    />
  );
}

function FileDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-input-description"
      className={cn("leading-none text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function FileLoader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { progress } = useFiles();

  if (!Boolean(progress)) return null;

  return (
    <div
      data-slot="file-input-loader"
      {...props}
      className="flex flex-col gap-4 min-w-56 text-center items-center justify-center"
    >
      <div className={cn("leading-none text-lg font-semibold", className)}>
        {children}
      </div>
      <div>{progress}%</div>
      <Progress value={progress} />
    </div>
  );
}

export {
  FileContent,
  FileDescription,
  FileError,
  FileField,
  FileIcon,
  FileInput,
  FileList,
  FileLoader,
  FileProvider,
  FileSubmit,
  FileTitle,
};
