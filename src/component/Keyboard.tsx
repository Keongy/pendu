import { useEffect, useState } from "react";
import { alphabet } from "../util/common";
import { IAlphabet } from "../util/interface";

interface Props {
    handleClick: (letter: string) => void;
    letterUsed: IAlphabet | null;
    alphabetDraft: IAlphabet[];
}

export const Keyboard: React.FC<Props> = ({ handleClick, alphabetDraft, }) => {

    return (
        <div className="keyboard">
            {alphabetDraft.map((letter: IAlphabet, i: number) => (
                <div
                    className={letter.used && letter.existOnWord
                        ? 'letter-used-and-in-word'
                        : letter.used && !letter.existOnWord
                            ? 'letter-used-and-not-word'
                            : 'letter'}
                    key={i}
                    onClick={() => !letter.used && handleClick(letter.letter)}
                >
                    {letter.letter}
                </div>
            ))}
        </div>
    )
}