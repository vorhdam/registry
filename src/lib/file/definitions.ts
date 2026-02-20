const Mimes = {
  application: [
    "pdf",
    "msword",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
    "vnd.ms-excel",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "vnd.ms-powerpoint",
    "vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  video: ["webm", "mp4", "mpeg", "ogg", "quicktime"],
  image: ["webp", "jpeg", "png", "gif", "heic", "heif"],
  text: ["plain", "csv", "xml"],
} as const satisfies Record<string, string[]>;

type MimeCategory = keyof typeof Mimes;

type Mime =
  | {
      [category in MimeCategory]: `${category}/${(typeof Mimes)[category][number]}`;
    }[MimeCategory]
  | (string & {});

type Metadata = Pick<File, "name" | "size" | "type">;

type FileContext = {
  providerId: string;
  maxFiles: number;
  maxSize: number;
  accept: Mime[];
  files: File[];
  metadatas: Metadata[];
  error: string | null;
  progress: number | null;
  addFiles: (files: FileList | null) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
};

type FileProviderProps = {
  providerId: string;
  maxFiles: number;
  maxSize: number;
  accept: Mime[];
  children: React.ReactNode;
};

const DefaultFileContext: FileContext = {
  providerId: "",
  maxFiles: 1, // 1 File
  maxSize: 1024 * 1024, // 1 MB
  accept: [],
  files: [],
  metadatas: [],
  error: null,
  progress: null,
  addFiles: () => {},
  removeFile: () => {},
  clearFiles: () => {},
};

function getFileSize(bytes: number) {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(size % 1 === 0 ? 0 : 2)} ${units[i]}`;
}

export {
  DefaultFileContext,
  getFileSize,
  Mimes,
  type FileContext,
  type FileProviderProps,
  type Metadata,
  type Mime,
  type MimeCategory,
};
