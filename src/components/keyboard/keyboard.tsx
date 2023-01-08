import React, { useContext } from 'react';
import { GlobalContext } from '../../state/global.context';
import style from './keyboard.module.scss';

export const Keyboard: React.FC = () => {

    const globalCtx = useContext(GlobalContext);

    function triggerKey(key: string): void {
        if (!globalCtx) return;
        // * Add letter
        if (key !== 'BACKSPACE' && key !== 'ENTER') {
            globalCtx.incrementBox();
        }

        // * Delete letter
        else if (key === 'BACKSPACE') {
            globalCtx.decrementBox();
        }

        // * Enter and Submit word
        else {
            // Word not completed, do not proceed on entering letter "Enter" key
            if (globalCtx.currentWord && globalCtx.currentWord.length > globalCtx.currentBox) {
                return;
            }
        }

        globalCtx.enterLetter(key);
    }

    const row1 = <>
        <div className={style.key} onClick={() => triggerKey('Q')}>Q</div>
        <div className={style.key} onClick={() => triggerKey('W')}>W</div>
        <div className={style.key} onClick={() => triggerKey('E')}>E</div>
        <div className={style.key} onClick={() => triggerKey('R')}>R</div>
        <div className={style.key} onClick={() => triggerKey('T')}>T</div>
        <div className={style.key} onClick={() => triggerKey('Y')}>Y</div>
        <div className={style.key} onClick={() => triggerKey('U')}>U</div>
        <div className={style.key} onClick={() => triggerKey('I')}>I</div>
        <div className={style.key} onClick={() => triggerKey('O')}>O</div>
        <div className={style.key} onClick={() => triggerKey('P')}>P</div>
    </>;

    const row2 = <>
        <div className={style.key} onClick={() => triggerKey('A')}>A</div>
        <div className={style.key} onClick={() => triggerKey('S')}>S</div>
        <div className={style.key} onClick={() => triggerKey('D')}>D</div>
        <div className={style.key} onClick={() => triggerKey('F')}>F</div>
        <div className={style.key} onClick={() => triggerKey('G')}>G</div>
        <div className={style.key} onClick={() => triggerKey('H')}>H</div>
        <div className={style.key} onClick={() => triggerKey('J')}>J</div>
        <div className={style.key} onClick={() => triggerKey('K')}>K</div>
        <div className={style.key} onClick={() => triggerKey('L')}>L</div>
    </>;

    const row3 = <>
        <div className={style.key} onClick={() => triggerKey('BACKSPACE')}>
            <i className='bi bi-backspace-fill'></i>
        </div>
        <div className={style.key} onClick={() => triggerKey('Z')}>Z</div>
        <div className={style.key} onClick={() => triggerKey('X')}>X</div>
        <div className={style.key} onClick={() => triggerKey('C')}>C</div>
        <div className={style.key} onClick={() => triggerKey('V')}>V</div>
        <div className={style.key} onClick={() => triggerKey('B')}>B</div>
        <div className={style.key} onClick={() => triggerKey('N')}>N</div>
        <div className={style.key} onClick={() => triggerKey('M')}>M</div>
        <div className={style.key} onClick={() => triggerKey('ENTER')}>
            <i className='bi bi-arrow-return-left'></i>
        </div>
    </>;

    return (
        <div className='container d-flex align-items-center flex-column mt-3'>
            <div className={style.keyboard_row}>{row1}</div>
            <div className={style.keyboard_row}>{row2}</div>
            <div className={style.keyboard_row}>{row3}</div>
        </div>
    );
};
