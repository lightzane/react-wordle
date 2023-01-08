import React, { FormEvent, useCallback, useContext, useEffect, useRef } from "react";
import { WORDS } from "../../shared/words";
import { GlobalContext } from "../../state/global.context";
import style from './header.module.scss';

interface Props {
    isModalCustomWordOpened: (value: boolean) => void;
}

/** Custom method to be called only once */
const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
};

let availableWords = [...WORDS];

export const CustomWord: React.FC<Props> = ({ isModalCustomWordOpened }) => {
    const globalCtx = useContext(GlobalContext);

    const inputCustomWord = useRef<HTMLInputElement>(null);

    const btnCancel = useRef<HTMLButtonElement>(null);

    const btnCustomWord = useRef<HTMLButtonElement>(null);

    const btnPlay = useRef<HTMLButtonElement>(null);

    const modal = useRef<HTMLDivElement>(null);

    const handleHiddenBsModal = useCallback(() => {
        isModalCustomWordOpened(false);
    }, [isModalCustomWordOpened]);

    useEffect(() => {
        const m = modal.current;

        if (!m) return;

        if (m) {
            m.addEventListener('hidden.bs.modal', handleHiddenBsModal);
        }

        return () => {
            m.removeEventListener('hidden.bs.modal', handleHiddenBsModal);
        };
    }, [modal, handleHiddenBsModal]);

    function handleFocus() {
        inputCustomWord?.current && inputCustomWord?.current.focus();
        isModalCustomWordOpened(true);
    }

    function submitWord(event: FormEvent) {
        const input = inputCustomWord?.current?.value;

        setTimeout(() => { btnCustomWord.current?.blur(); });

        event.preventDefault();

        if (!input) return;

        // Set Custom Word
        globalCtx?.setCurrentWord(input);
        // Reset input
        inputCustomWord.current.value = '';
        // Close the modal
        btnCancel.current?.click();

        globalCtx?.incrementGameRound();
        globalCtx?.setStrict(false);
    }

    function randomWord(): void {
        setTimeout(() => { btnCustomWord.current?.blur(); });

        btnPlay.current?.blur();

        const word = loadWord();

        // Set Custom Word
        globalCtx?.setCurrentWord(word);

        // Reset input
        if (inputCustomWord?.current) {
            inputCustomWord.current.value = '';
        }
        globalCtx?.incrementGameRound();
        globalCtx?.setStrict(true);
    }

    /** Consume the item in the array */
    function loadWord(): string {

        // reset the list if nothing left
        if (availableWords.length <= 0) {
            availableWords = [...WORDS];
        }

        const random = Math.floor(Math.random() * availableWords.length);
        const result = availableWords[random].toUpperCase();

        // remove the word in the array
        if (availableWords.includes(result.toLowerCase())) {
            const index = availableWords.indexOf(result.toLowerCase());
            availableWords.splice(index, 1);
        }

        return result;
    }

    // Custom method to be called only once regardless of deps
    useConstructor(() => {
        // Set Custom Word
        setTimeout(() => {
            globalCtx?.setCurrentWord(loadWord());
            globalCtx?.incrementGameRound();
            isModalCustomWordOpened(false);
        }, 1);
    });

    // * ==============================================================
    return <>

        <div className="d-flex justify-content-between w-100">

            <button
                className={`btn btn-outline-primary`}
                data-bs-toggle="modal"
                data-bs-target="#modalAddCustomWord"
                onClick={handleFocus}
                ref={btnCustomWord}
            >
                Custom Word
            </button>

            <button onClick={randomWord} ref={btnPlay} className='btn btn-outline-success'>Play</button>

        </div>

        <div ref={modal} className="modal" id="modalAddCustomWord" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Play with Custom Word</h1>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-floating" onSubmit={(event) => { submitWord(event); }}>
                            <input ref={inputCustomWord} type="text" className={`form-control ${style.uppercase}`} id="customWord" placeholder="Enter word here" maxLength={10} />
                            <label htmlFor="customWord">Enter word here</label>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={btnCancel} className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={randomWord} className="btn btn-primary" data-bs-dismiss="modal">Random</button>
                    </div>
                </div>
            </div>
        </div>

    </>;
};
