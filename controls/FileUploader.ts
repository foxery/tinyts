import {TextView} from '../core/TextView';

/**
 * FileUploader 文件上传
 * 此控件不支持ie8
 */
export class FileUploader extends TextView {

    GetFile(): any {
        var files = this.target.prop("files");
        if (files.length != 0) {
            return files[0];
        }
        return null;
    }

    OnChange(handler: () => void) {
        this.target.change(handler);
    }
}