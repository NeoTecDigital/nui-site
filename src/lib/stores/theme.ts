import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'cupcake' | 'bumblebee' | 'emerald' | 'corporate' | 'synthwave' | 'retro' | 'cyberpunk' | 'valentine' | 'halloween' | 'garden' | 'forest' | 'aqua' | 'lofi' | 'pastel' | 'fantasy' | 'wireframe' | 'black' | 'luxury' | 'dracula' | 'cmyk' | 'autumn' | 'business' | 'acid' | 'lemonade' | 'night' | 'coffee' | 'winter';

const defaultTheme: Theme = 'light';

const browser = typeof window !== 'undefined';

const initialTheme = browser ? 
    (localStorage.getItem('theme') as Theme) || defaultTheme : 
    defaultTheme;

export const theme = writable<Theme>(initialTheme);

theme.subscribe((value) => {
    if (browser) {
        localStorage.setItem('theme', value);
        document.documentElement.setAttribute('data-theme', value);
    }
});

export const themes: Theme[] = [
    'light',
    'dark', 
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
];