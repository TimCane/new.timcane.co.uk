import { useEffect, useState } from 'react';

export function ThemeSwitcherFallback() {
    return (
        <div className="relative flex items-center gap-2">
            <div className="p-2 rounded-lg">
                <div className="relative w-5 h-5">
                    {/* Sun icon with fade animation */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute animate-fade-out"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                    {/* Moon icon with fade animation */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute animate-fade-in"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    useEffect(() => {
        // Initialize theme state from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        // Update document class and localStorage when theme changes
        if (theme === 'system') {
            localStorage.removeItem('theme');
            document.documentElement.classList.toggle(
                'dark',
                window.matchMedia('(prefers-color-scheme: dark)').matches
            );
        } else {
            localStorage.theme = theme;
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme]);

    return (
        <div className="relative flex items-center gap-2">
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {/* Sun icon - shown in light mode */}
                {theme == 'light' && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                )}
                {/* Moon icon - shown in dark mode */}
                {theme == 'dark' && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
