import React, {ChangeEvent, useRef} from 'react';
import style from './FileUpload.module.scss'

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children?: string | JSX.Element | JSX.Element[];
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const inputRef = useRef<HTMLInputElement | any>()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        setFile(e.target.files[0])
    }

    return (
        <div onClick={() => inputRef.current.click()}>
            <input
                type={"file"}
                accept={accept}
                className={style.input}
                ref={inputRef}
                onChange={handleOnChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;