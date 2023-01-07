import React from "react";
import { CustomWord } from "./custom-word";

interface Props {
    isModalCustomWordOpened: (value: boolean) => void;
}

export const Header: React.FC<Props> = ({ isModalCustomWordOpened }) => {
    return (
        <div className="mt-3">
            <div className="d-flex">
                <CustomWord isModalCustomWordOpened={isModalCustomWordOpened} />
            </div>
        </div>
    );
};
