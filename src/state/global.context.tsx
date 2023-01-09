import React, { createContext, useEffect, useState } from "react";

export interface GlobalContextType {
    /** The current word to guess. This is the word given through `setCurrentWord` */
    currentWord: string | null;
    setCurrentWord: (word: string) => void;

    /** The current box index in which the letter should appear */
    currentBox: number;
    /** Increments the current box `index` */
    incrementBox: () => void;
    /** Decrements the current box `index` */
    decrementBox: () => void;
    /** Sets the current box `index` */
    setCurrentBox: (value: number) => void;

    /** The current letter or key that was pressed */
    currentLetter: string | null;
    enterLetter: (value: string | null) => void;

    /** Just for state handling and retriggering for react `useEffect` and resets the game */
    gameRound: number;
    incrementGameRound: () => void;

    /** Restricts words that are not in the list */
    strict: boolean;
    setStrict: (value: boolean) => void;

    /** Used as a list for `incorrect` letters to highlight them on the keyboard */
    yellowLetters: string[];
    setYellowLetters: (value: string[]) => void;
    clearYellowLetters: () => void;

    /** Used as a list for `correct` letters to highlight them on the keyboard */
    greenLetters: string[];
    setGreenLetters: (value: string[]) => void;
    clearGreenLetters: () => void;

    /** Used as a list for letters not included in the list to highlight them on the keyboard */
    wrongLetters: string[];
    setWrongLetters: (value: string[]) => void;
    clearWrongLetters: () => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {

    const [currentWord, setCurrentWord] = useState<string | null>(null);

    const [currentBox, setCurrentBox] = useState(0);

    const [currentLetter, setCurrentLetter] = useState<string | null>(null);

    const [gameRound, setGameRound] = useState(1);

    const [strict, setStrict] = useState(true);

    /** Used as a list for `incorrect` letters to highlight them on the keyboard */
    const [yellowLetters, setYellowLetters] = useState<string[]>([]);

    /** Used as a list for `correct` letters to highlight them on the keyboard */
    const [greenLetters, setGreenLetters] = useState<string[]>([]);

    /** Used as a list for letters not included in the list to highlight them on the keyboard */
    const [wrongLetters, setWrongLetters] = useState<string[]>([]);

    useEffect(() => {
        setCurrentWord(null);
        setCurrentBox(0);
    }, []);

    function cleanUpWord(word: string): void {
        word = word.replace(/[^A-Za-z]/gi, '').toUpperCase();
        setCurrentWord(word);
    }

    function incrementBox(): void {
        setCurrentBox((currentValue) => {
            if (currentWord && currentWord.length <= currentValue) {
                return currentWord.length;
            }
            return currentValue + 1;
        });
    }

    function decrementBox(): void {
        setCurrentBox((currentValue) => {
            if (currentValue <= 0) {
                return 0;
            }
            return currentValue - 1;
        });
    }

    function incrementGameRound(): void {
        setGameRound(currentValue => currentValue + 1);
    }

    function updateGreenLetters(letters: string[]): void {
        for (const letter of letters) {
            if (!greenLetters.includes(letter)) {
                setGreenLetters(v => v.concat(letter));
            }
        }
    }

    function updateYellowLetters(letters: string[]): void {
        for (const letter of letters) {
            if (!yellowLetters.includes(letter)) {
                setYellowLetters(v => v.concat(letter));
            }
        }
    }

    function updateWrongsLetters(letters: string[]): void {
        for (const letter of letters) {
            if (!wrongLetters.includes(letter)) {
                setWrongLetters(v => v.concat(letter));
            }
        }
    }

    function clearGreenLetters(): void {
        setGreenLetters([]);
    }

    function clearYellowLetters(): void {
        setYellowLetters([]);
    }

    function clearWrongLetters(): void {
        setWrongLetters([]);
    }

    const context: GlobalContextType = {
        currentWord,
        setCurrentWord: cleanUpWord,
        currentBox,
        incrementBox,
        decrementBox,
        setCurrentBox,
        currentLetter,
        enterLetter: setCurrentLetter,
        gameRound,
        incrementGameRound,
        strict,
        setStrict,
        yellowLetters,
        setYellowLetters: updateYellowLetters,
        clearYellowLetters,
        greenLetters,
        setGreenLetters: updateGreenLetters,
        clearGreenLetters,
        wrongLetters,
        setWrongLetters: updateWrongsLetters,
        clearWrongLetters
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
};
