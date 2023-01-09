import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { EXCEPTIONAL_WORDS, WORDS } from "../../shared";
import { GlobalContext } from "../../state/global.context";
import { Box } from "../box/box";
import style from './board.module.scss';

export const Board: React.FC = () => {

    const TRIES = 6;

    const globalCtx = useContext(GlobalContext);

    const currentWord = globalCtx?.currentWord?.split('');

    const [attempts, setAttempts] = useState(1);

    /** List of boxes of letters to be consumed or populated with letter */
    let boxRefs = useRef<HTMLDivElement[]>([]);

    /** List Submitted boxes that was populated by letters */
    let removedBoxRefs = useRef<HTMLDivElement[]>([]);

    /** List of submitted letters for each round/tries */
    const submittedLetters = useMemo<string[]>(() => [], []); // added `useMemo` as per eslint-react warnings when being used inside `useEffect`

    /** List of submitted words for later use on stats summary which contains green, yellow square emojis with the word */
    const [submittedWords, setSubmittedWords] = useState<string[]>([]);

    /** Same list as above but consists only of square emojis without the word */
    const [statsOnly, setStatsOnly] = useState<string[]>([]);

    const [gameOver, setGameOver] = useState(false);

    const [winner, setWinner] = useState(false);

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !boxRefs.current.includes(el) && !removedBoxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    const genRow = () => {
        if (!currentWord?.length) return;
        return <>
            {
                currentWord.map((v, i) => (
                    <Box key={i} ref={addToRefs} />
                ))
            }
        </>;
    };

    /** Generates the list of rows of boxes */
    const list = () => {
        return [...Array(TRIES)].map((v, i) => (
            <div className={style.boxrow} key={i}>
                {genRow()}
            </div>
        ));
    };

    /** Validate answer and clean up used boxes */
    const validateAnswer = useCallback(() => {
        if (!currentWord || submittedLetters.length === 0 || globalCtx?.currentLetter !== 'ENTER') return;

        globalCtx.enterLetter(null);

        const submittedAnswer = submittedLetters.join('');

        const wordNotInList = !WORDS.includes(submittedAnswer.toLowerCase())
            && !EXCEPTIONAL_WORDS.includes(submittedAnswer.toLowerCase());

        if (globalCtx?.strict && wordNotInList) {
            const toast = document.getElementById('toast-word-not-in-list');
            // @ts-expect-error
            new bootstrap.Toast(toast).show();
            return;
        }

        globalCtx?.setCurrentBox(0);

        /** Can be used as indicator if all letters are correct */
        let correctLetters = 0;

        let stats = '';

        const greenLetters: string[] = [];
        const yellowLetters: string[] = [];
        const wrongLetters: string[] = [];

        currentWord.forEach((v, i) => {
            // * Correct Letter on Position
            if (submittedLetters[i] === v) {
                boxRefs.current[i].classList.add('green');
                correctLetters++;
                stats += '🟩';
                greenLetters.push(submittedLetters[i]);
            }

            // * Letter exist but incorrect position
            else if (currentWord.includes(submittedLetters[i])) {
                boxRefs.current[i].classList.add('yellow');
                stats += '🟨';
                yellowLetters.push(submittedLetters[i]);
            }

            // * Letter does not exist
            else {
                boxRefs.current[i].classList.add('letter');
                stats += '⬛';
                wrongLetters.push(submittedLetters[i]);
            }
        });

        setSubmittedWords((currentValue) => currentValue.concat(`${stats} ${submittedAnswer}`));
        setStatsOnly((currentValue) => currentValue.concat(stats));
        globalCtx.setGreenLetters(greenLetters);
        globalCtx.setYellowLetters(yellowLetters);
        globalCtx.setWrongLetters(wrongLetters);

        // Clean up used boxes
        const usedBoxes = boxRefs.current.splice(0, currentWord.length);
        removedBoxRefs.current.push(...usedBoxes);
        submittedLetters.length = 0;

        // * Winner
        if (correctLetters >= currentWord.length) {
            setGameOver(true);
            setWinner(true);
        }

        // * Lost
        else if (attempts === TRIES) {
            setGameOver(true);
        }

        // * Continue playing... still have attempts
        else {
            setAttempts(currentValue => currentValue + 1);
        }

    }, [currentWord, submittedLetters, attempts, globalCtx]);

    useEffect(() => {
        if (!currentWord?.length || gameOver) return;

        const currentBox = globalCtx?.currentBox;

        const currentLetter = globalCtx?.currentLetter;

        if (currentBox !== undefined && currentLetter && boxRefs.current.length !== 0) {
            // * Add a letter to the Box
            if (currentLetter !== 'BACKSPACE' && currentLetter !== 'ENTER') {
                // Populate only if Box is blank
                if (!boxRefs.current[currentBox - 1].textContent) {
                    boxRefs.current[currentBox - 1].textContent = currentLetter;
                    submittedLetters.push(currentLetter);
                }
            }

            // * Delete a letter from the box
            else if (currentLetter === 'BACKSPACE') {
                boxRefs.current[currentBox].textContent = null;
                submittedLetters.pop();
            }

            // * Enter and Submit the word
            else if (currentLetter === 'ENTER' && globalCtx.currentBox !== 0) {
                validateAnswer();
            }

        }

    }, [globalCtx, currentWord, submittedLetters, validateAnswer, gameOver]);

    // * RESET
    useEffect(() => {
        if (!globalCtx?.gameRound) return;
        // reset submitted words for stats
        setSubmittedWords([]);
        setStatsOnly([]);
        // reset winner
        setWinner(false);
        // reset attempts
        setAttempts(1);
        // reset submitted letters
        submittedLetters.length = 0;
        // reset values and styles
        boxRefs.current.forEach(v => { v.textContent = null; v.classList.remove('green', 'yellow', 'letter'); });
        removedBoxRefs.current.forEach(v => { v.textContent = null; v.classList.remove('green', 'yellow', 'letter'); });
        // reset useRefs
        boxRefs.current.length = 0;
        removedBoxRefs.current.length = 0;
        // reset states
        globalCtx.setCurrentBox(0);
        globalCtx.enterLetter(null);
        // reset game
        setGameOver(false);
        // reset letter containers for keyboard highlighting
        globalCtx.clearGreenLetters();
        globalCtx.clearYellowLetters();
        globalCtx.clearWrongLetters();
        // eslint-disable-next-line
    }, [globalCtx?.gameRound]);

    const success = () => (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
            🎉 Congratulations!
            <div
                className={`bi bi-card-text ${style.openstats}`}
                data-bs-toggle="modal"
                data-bs-target="#modalStats"
            ></div>
        </div>
    );

    const reveal = () => (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
            <div>👌 Correct word: <b>{currentWord}</b></div>
            <div
                className={`bi bi-card-text ${style.openstats}`}
                data-bs-toggle="modal"
                data-bs-target="#modalStats"
            ></div>
        </div>
    );

    return (
        <div className="container mt-3">

            {winner && success()}
            {!winner && gameOver && reveal()}

            <div className="d-flex flex-column align-items-center">
                {list()}
            </div>

            {/* Modal for Stats */}
            <div className="modal" id="modalStats" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Stats</h1>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div> */}
                        <div className={`modal-body ${style.stats}`}>
                            <p>
                                {
                                    submittedWords.map((v, i) => (
                                        <span key={i}>{v}</span>
                                    ))
                                }
                            </p>
                            <hr />
                            <p className="mt-3">
                                {
                                    statsOnly.map((v, i) => (
                                        <span key={i}>{v}</span>
                                    ))
                                }
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
