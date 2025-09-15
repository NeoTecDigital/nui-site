import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';

export function highlighter(code: string, language: string = 'typescript'): string {
    // Map svelte to javascript for syntax highlighting
    if (language === 'svelte') {
        language = 'javascript';
    }
    
    if (!Prism.languages[language]) {
        console.warn(`Language ${language} not found, falling back to typescript`);
        language = 'typescript';
    }
    
    return Prism.highlight(code, Prism.languages[language], language);
}