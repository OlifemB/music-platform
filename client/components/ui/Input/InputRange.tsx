import React, {useState} from 'react';
import style from './InputRange.module.scss'

const InputRange = (props:React.ProviderProps<any>) => {
    const [value, setValue] = useState(0)

    return (
        <div className={style.root}>
            <input
                {...props}
                type={'range'}
                max={100}
                value={value}
                onChange={(e) => setValue(0)}
            />
        </div>

    );
};

export default InputRange;