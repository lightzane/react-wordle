import React, { forwardRef } from 'react';
import style from './box.module.scss';

interface Props {
    value?: string;
}

export const Box = forwardRef<HTMLDivElement, Props>(({ value }, ref) => {
    return <>
        <div className={`
            ${style.box} wordle-font
        `} ref={ref}>
            {value}
        </div>
    </>;
});
