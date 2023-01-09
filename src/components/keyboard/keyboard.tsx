import React, { useContext } from 'react';
import { GlobalContext } from '../../state/global.context';
import style from './keyboard.module.scss';

export const Keyboard: React.FC = () => {

    const globalCtx = useContext(GlobalContext);

    const g = globalCtx?.greenLetters;

    const y = globalCtx?.yellowLetters;

    const w = globalCtx?.wrongLetters;

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
        <div className={`${style.key} ${g?.includes('Q') && style.green} ${y?.includes('Q') && style.yellow} ${w?.includes('Q') && style.wrong}`} onClick={() => triggerKey('Q')}>Q</div>
        <div className={`${style.key} ${g?.includes('W') && style.green} ${y?.includes('W') && style.yellow} ${w?.includes('W') && style.wrong}`} onClick={() => triggerKey('W')}>W</div>
        <div className={`${style.key} ${g?.includes('E') && style.green} ${y?.includes('E') && style.yellow} ${w?.includes('E') && style.wrong}`} onClick={() => triggerKey('E')}>E</div>
        <div className={`${style.key} ${g?.includes('R') && style.green} ${y?.includes('R') && style.yellow} ${w?.includes('R') && style.wrong}`} onClick={() => triggerKey('R')}>R</div>
        <div className={`${style.key} ${g?.includes('T') && style.green} ${y?.includes('T') && style.yellow} ${w?.includes('T') && style.wrong}`} onClick={() => triggerKey('T')}>T</div>
        <div className={`${style.key} ${g?.includes('Y') && style.green} ${y?.includes('Y') && style.yellow} ${w?.includes('Y') && style.wrong}`} onClick={() => triggerKey('Y')}>Y</div>
        <div className={`${style.key} ${g?.includes('U') && style.green} ${y?.includes('U') && style.yellow} ${w?.includes('U') && style.wrong}`} onClick={() => triggerKey('U')}>U</div>
        <div className={`${style.key} ${g?.includes('I') && style.green} ${y?.includes('I') && style.yellow} ${w?.includes('I') && style.wrong}`} onClick={() => triggerKey('I')}>I</div>
        <div className={`${style.key} ${g?.includes('O') && style.green} ${y?.includes('O') && style.yellow} ${w?.includes('O') && style.wrong}`} onClick={() => triggerKey('O')}>O</div>
        <div className={`${style.key} ${g?.includes('P') && style.green} ${y?.includes('P') && style.yellow} ${w?.includes('P') && style.wrong}`} onClick={() => triggerKey('P')}>P</div>
    </>;

    const row2 = <>
        <div className={`${style.key} ${g?.includes('A') && style.green} ${y?.includes('A') && style.yellow} ${w?.includes('A') && style.wrong}`} onClick={() => triggerKey('A')}>A</div>
        <div className={`${style.key} ${g?.includes('S') && style.green} ${y?.includes('S') && style.yellow} ${w?.includes('S') && style.wrong}`} onClick={() => triggerKey('S')}>S</div>
        <div className={`${style.key} ${g?.includes('D') && style.green} ${y?.includes('D') && style.yellow} ${w?.includes('D') && style.wrong}`} onClick={() => triggerKey('D')}>D</div>
        <div className={`${style.key} ${g?.includes('F') && style.green} ${y?.includes('F') && style.yellow} ${w?.includes('F') && style.wrong}`} onClick={() => triggerKey('F')}>F</div>
        <div className={`${style.key} ${g?.includes('G') && style.green} ${y?.includes('G') && style.yellow} ${w?.includes('G') && style.wrong}`} onClick={() => triggerKey('G')}>G</div>
        <div className={`${style.key} ${g?.includes('H') && style.green} ${y?.includes('H') && style.yellow} ${w?.includes('H') && style.wrong}`} onClick={() => triggerKey('H')}>H</div>
        <div className={`${style.key} ${g?.includes('J') && style.green} ${y?.includes('J') && style.yellow} ${w?.includes('J') && style.wrong}`} onClick={() => triggerKey('J')}>J</div>
        <div className={`${style.key} ${g?.includes('K') && style.green} ${y?.includes('K') && style.yellow} ${w?.includes('K') && style.wrong}`} onClick={() => triggerKey('K')}>K</div>
        <div className={`${style.key} ${g?.includes('L') && style.green} ${y?.includes('L') && style.yellow} ${w?.includes('L') && style.wrong}`} onClick={() => triggerKey('L')}>L</div>
    </>;

    const row3 = <>
        <div className={style.key + ' text-bg-primary'} onClick={() => triggerKey('ENTER')}>
            <i className='bi bi-arrow-return-left'></i>
        </div>
        <div className={`${style.key} ${g?.includes('Z') && style.green} ${y?.includes('Z') && style.yellow} ${w?.includes('Z') && style.wrong}`} onClick={() => triggerKey('Z')}>Z</div>
        <div className={`${style.key} ${g?.includes('X') && style.green} ${y?.includes('X') && style.yellow} ${w?.includes('X') && style.wrong}`} onClick={() => triggerKey('X')}>X</div>
        <div className={`${style.key} ${g?.includes('C') && style.green} ${y?.includes('C') && style.yellow} ${w?.includes('C') && style.wrong}`} onClick={() => triggerKey('C')}>C</div>
        <div className={`${style.key} ${g?.includes('V') && style.green} ${y?.includes('V') && style.yellow} ${w?.includes('V') && style.wrong}`} onClick={() => triggerKey('V')}>V</div>
        <div className={`${style.key} ${g?.includes('B') && style.green} ${y?.includes('B') && style.yellow} ${w?.includes('B') && style.wrong}`} onClick={() => triggerKey('B')}>B</div>
        <div className={`${style.key} ${g?.includes('N') && style.green} ${y?.includes('N') && style.yellow} ${w?.includes('N') && style.wrong}`} onClick={() => triggerKey('N')}>N</div>
        <div className={`${style.key} ${g?.includes('M') && style.green} ${y?.includes('M') && style.yellow} ${w?.includes('M') && style.wrong}`} onClick={() => triggerKey('M')}>M</div>
        <div className={style.key} onClick={() => triggerKey('BACKSPACE')}>
            <i className='bi bi-backspace-fill'></i>
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
