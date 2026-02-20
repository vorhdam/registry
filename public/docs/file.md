# Password

This component enables you to upload files to the browser and add them to a react context and integrate them in your workflow.

### Installation

`bunx --bun shadcn@latest add https://vorhdam-registry.vercel.app/r/file.json`

## Usage

```
    <FileProvider
        providerId={providerId}
        accept={[
            "image/webp",
            "image/jpeg",
            "image/png",
            "image/heic",
            "image/heif",
        ]}
        maxFiles={1} // the max files the user can upload
        maxSize={1024 * 1024} // the max size of a file in bytes
    >
        <FileInput className="w-full" providerId={providerId}>
            <FileField>
                <FileContent>
                    <FileIcon>
                        <ArrowUpFromLine />
                    </FileIcon>
                    <FileTitle>Upload your files here</FileTitle>
                    <FileDescription>Image files that are smaller than 1 MB</FileDescription>
                </FileContent>
                <FileLoader>Uploading...</FileLoader>
            </FileField>
            <FileList />
            <FileError className="w-full text-left" />
            <FileSubmit>Upload</FileSubmit>
        </FileInput>
    </FileProvider>
```

## Components

### File Provider

- This is a wrapper that hold the context of the file inputs current state.

### File Input

- The body of the whole upload component that wraps the whole input.

### File Field

- The area you can upload your files by clicking or dragging.

### File Content

- The layer that holds elements in place in the FileField.

### File Icon

- An icon placeholder you can use to make your component look better.

### File Title

- A title so that the user knows its a file upload field.

### File Description

- A title so that guides the user what he can upload.

### File Loader

- A loading state display (text + progress bar)

### File List

- The list of files the user uploaded.

### File Error

- If there are errors they are displayed here.

### File Submit

- Submits the file input form.

## Customizability

### Workflow

If you want to limit file uploads by the file type first check out the `@/lib/file/definitions.ts` file.
It stores the acceptable file types in the Mimes variable and other important typescript types. If you want to add a usable type choose one from here: [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)

You can modify the validation process of the files by editing the `@/lib/file/workflow.ts` file.
If your file changes during the workflow returned the modified file like this:

`return { success: true, file: modifiedFile };`

This can be very useful if you want to compress image or video files to webp or webm format.

If a user runs into an error during the workflow use this:

`return { success: false, message: "Some error you ran into."};`

The message will automatically become an error that is shown to the user and the file upload will result in faliure and no files will be uploaded and the ones stored will be removed from the array.

### Custom logic

If you need to add a custom logic you can try editing the `@/components/ui/file.tsx` file which initiates the workflow and stores the react components.

### Translation

There are a few default messages I included. These can be found at: `@/lib/file/messages.ts` file.
If you want to translate your app to another language add your translation logic to this file (good if you work with one language) or search for messages in the installed files and replace messages with your own translations (recommended).
