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

    gameRound: number;
    incrementGameRound: () => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {

    const [currentWord, setCurrentWord] = useState<string | null>(null);

    const [currentBox, setCurrentBox] = useState(0);

    const [currentLetter, setCurrentLetter] = useState<string | null>(null);

    const [gameRound, setGameRound] = useState(1);

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
        incrementGameRound
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
};
