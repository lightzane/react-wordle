import React from "react";

interface Props {
    id: string;
    message: string;
    className?: string;
}

export const GameToast: React.FC<Props> = ({ id, message, className }) => {
    return (
        <div className="toast-container position-fixed start-50 translate-middle-x" style={{ top: '20%' }}>
            <div id={id} className={`toast align-items-center border-0 ${className}`}>
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        </div>
    );
};
