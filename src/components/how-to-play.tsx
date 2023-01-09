import React from "react";

export const HowToPlay: React.FC = () => {
    return (
        <div className="container-fluid mt-3">

            <h5>How to Play</h5>

            <p>Guess the word in <b>6</b> tries</p>

            <ul>
                <li>(Strict) Each guess must be a valid word</li>
                <li>The color of box shows how close your guess is</li>
            </ul>

            <p><b>Examples</b></p>

            <p>Word to guess: CLOCK</p>

            <p>
                <span className="example-letter">P</span>
                <span className="example-letter yellow">O</span>
                <span className="example-letter">W</span>
                <span className="example-letter">E</span>
                <span className="example-letter">R</span>
            </p>

            <p><b>O</b> is in the word but in wrong spot</p>

            <hr />

            <p>
                <span className="example-letter">A</span>
                <span className="example-letter">B</span>
                <span className="example-letter green">O</span>
                <span className="example-letter">V</span>
                <span className="example-letter">E</span>
            </p>

            <p><b>O</b> is in the word and correct spot</p>

            <hr />

            <p>
                <span className="example-letter">T</span>
                <span className="example-letter letter">R</span>
                <span className="example-letter">U</span>
                <span className="example-letter">T</span>
                <span className="example-letter">H</span>
            </p>

            <p><b>R</b> is not in the word</p>

        </div>
    );
};
