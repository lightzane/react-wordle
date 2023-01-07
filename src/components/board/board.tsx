import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
        if (!currentWord || submittedLetters.length === 0) return;

        /** Can be used as indicator if all letters are correct */
        let correctLetters = 0;

        currentWord.forEach((v, i) => {
            // * Correct Letter on Position
            if (submittedLetters[i] === v) {
                boxRefs.current[i].classList.add('green');
                correctLetters++;
            }

            // * Letter exist but incorrect position
            else if (currentWord.includes(submittedLetters[i])) {
                boxRefs.current[i].classList.add('yellow');
            }

            // * Letter does not exist
            else {
                boxRefs.current[i].classList.add('letter');
            }
        });

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

    }, [currentWord, submittedLetters, attempts]);

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
                globalCtx.setCurrentBox(0);
                validateAnswer();
            }

        }

    }, [globalCtx, currentWord, submittedLetters, validateAnswer, gameOver]);

    // * RESET
    useEffect(() => {
        if (!globalCtx?.gameRound) return;
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
        // eslint-disable-next-line
    }, [globalCtx?.gameRound]);

    const success = () => (
        <div className="alert alert-success">
            🎉 Congratulations!
        </div>
    );

    const reveal = () => (
        <div className="alert alert-warning">
            👌 Correct word: <b>{currentWord}</b>
        </div>
    );

    return (
        <div className="container mt-3">
            {winner && success()}
            {!winner && gameOver && reveal()}
            <div className="d-flex flex-column align-items-center">
                {list()}
            </div>
        </div>
    );
};
