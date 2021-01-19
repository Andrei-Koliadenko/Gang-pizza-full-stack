import React from "react";
import {DropzoneArea} from "material-ui-dropzone";

type Props = {
    setFile: any,
}

const DropFiles: React.FC<Props> = (props: Props) => {
    async function HandleChange(files: File[]) {
        props.setFile(files[0])
    }

    return (
        <DropzoneArea
            onChange={HandleChange}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            maxFileSize={5000000}
            filesLimit={1}
        />
    )
}
export default DropFiles;