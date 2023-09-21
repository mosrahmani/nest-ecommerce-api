import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

/** Add all file upload decorators at once
 *
 * Example: Upload product picture
 **/

export function FileUpload(): <TFunction>(
    target: object | TFunction,
    propertyKey?: string | symbol,
) => void {
    return applyDecorators(
        UseInterceptors(FileInterceptor('file')),
    );
}