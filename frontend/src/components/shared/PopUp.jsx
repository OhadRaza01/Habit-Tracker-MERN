import React from "react";

export default function PopUp({
    isOpen,
    onClose,
    icon,
    title,
    message,
    buttonText = "Continue",
    onButtonClick,
}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl"
            >
                {icon && (
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5a36]/10">
                        {icon}
                    </div>
                )}

                {title && (
                    <h2 className="text-xl font-extrabold text-[#14151a]">{title}</h2>
                )}

                {message && (
                    <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    onClick={onButtonClick}
                    className="mt-6 w-full rounded-xl cursor-pointer bg-[#ff5a36] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#ff5a36]/90"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
