
/* Used when the user inputs an invalid file type */

export class FileTypeError extends Error {
    constructor(fileTypes: RegExp) {
        super(`File upload only supports the following filetypes : ${fileTypes}`);
    }
}