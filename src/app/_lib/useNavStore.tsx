"use client";

import { useState } from "react";

export type NavStore = {
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
};

export function useNavStore() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return {
        open: isOpen,
        onToggle: toggleNav,
        onClose: () => setIsOpen(false),

    };  
}
