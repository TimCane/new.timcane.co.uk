import { useEffect, useState } from 'react';

export function FontSizeSwitcherFallback() {
    return (
        <button>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.25rem"
                height="1.25rem"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <text x="6" y="20" fontSize="18" fontWeight="bold">A</text>
            </svg>
        </button>
    );
}

type FontSize = 'small' | 'medium' | 'large';

export default function FontSizeSwitcher() {
    const [fontSize, setFontSize] = useState<FontSize>('medium');

    const fontSizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };

    useEffect(() => {
        // Initialize font size state from localStorage
        const savedFontSize = localStorage.getItem('fontSize') as FontSize;
        if (savedFontSize && fontSizes[savedFontSize]) {
            setFontSize(savedFontSize);
            document.documentElement.style.setProperty('--font-size-root', fontSizes[savedFontSize]);
        }
    }, []);

    const cycleFontSize = () => {
        const sizes: FontSize[] = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(fontSize);
        const nextSize = sizes[(currentIndex + 1) % sizes.length];

        setFontSize(nextSize);
        document.documentElement.style.setProperty('--font-size-root', fontSizes[nextSize]);
        localStorage.setItem('fontSize', nextSize);
    };

    const getFontSizeIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.25rem"
                height="1.25rem"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Main A */}
                <path d="M6 18L12 6L18 18" />
                <path d="M8 14h8" />

                {/* Direction indicator */}
                {fontSize === 'small' && (
                    <path d="M17 4l3 3l3-3" strokeWidth="1.5" />
                )}
                {fontSize === 'large' && (
                    <path d="M23 7l-3-3l-3 3" strokeWidth="1.5" />
                )}
            </svg>
        );
    };

    return (
        <button
            onClick={cycleFontSize}
            style={{
                fontSize: fontSize === 'small' ? '0.9rem' :
                    fontSize === 'large' ? '1.1rem' : '1rem'
            }}
            aria-label={`Change font size (currently ${fontSize})`}
            title={`Current font size: ${fontSize}. Click to change.`}
            className="font-size-button"
        >
            <span className="sr-only">Change font size (currently {fontSize})</span>
            {getFontSizeIcon()}
        </button>
    );
}
