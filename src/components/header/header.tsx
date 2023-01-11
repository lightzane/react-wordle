import React from "react";
import { CustomWord } from "./custom-word";

interface Props {
    isModalCustomWordOpened: (value: boolean) => void;
    triggerNextWord: number;
}

export const Header: React.FC<Props> = ({ isModalCustomWordOpened, triggerNextWord }) => {
    return (
        <div className="mt-3">
            <div className="d-flex">
                <CustomWord triggerNextWord={triggerNextWord} isModalCustomWordOpened={isModalCustomWordOpened} />
            </div>
        </div>
    );
};
