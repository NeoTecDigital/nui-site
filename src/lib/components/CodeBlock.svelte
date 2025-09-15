<script lang="ts">
    import { highlighter } from '$lib/utils/index.js';
    import { Copy, Check } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    export let code: string;
    export let language: string = 'typescript';
    export let title: string | undefined = undefined;
    export let copyable: boolean = true;
    let className: string = '';
    export { className as class };

    let copied = false;

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    }

    $: highlightedCode = highlighter(code.trim(), language);
</script>

<div class={cn('rounded-lg border bg-base-200/50', className)}>
    {#if title || copyable}
        <div class="flex items-center justify-between border-b px-4 py-2 bg-base-300/50">
            {#if title}
                <span class="text-sm font-medium text-base-content/80">{title}</span>
            {:else}
                <span class="text-sm text-base-content/60 font-mono">{language}</span>
            {/if}
            
            {#if copyable}
                <button
                    on:click={copyToClipboard}
                    class="btn btn-ghost btn-xs"
                    aria-label="Copy code"
                >
                    {#if copied}
                        <Check class="h-3 w-3 text-success" />
                    {:else}
                        <Copy class="h-3 w-3" />
                    {/if}
                </button>
            {/if}
        </div>
    {/if}
    
    <div class="overflow-x-auto">
        <pre class="p-4 text-sm"><code class={`language-${language}`}>{@html highlightedCode}</code></pre>
    </div>
</div>

<style>
    pre {
        font-family: 'Fira Code', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        line-height: 1.5;
    }
    
    /* Override DaisyUI code styles for syntax highlighting */
    pre code {
        background: transparent !important;
        padding: 0 !important;
        border-radius: 0 !important;
        font-size: inherit !important;
        color: inherit !important;
    }
    
    /* Prism theme adjustments */
    :global(.token.comment),
    :global(.token.prolog),
    :global(.token.doctype),
    :global(.token.cdata) {
        color: oklch(var(--bc) / 0.5);
    }
    
    :global(.token.punctuation) {
        color: oklch(var(--bc) / 0.7);
    }
    
    :global(.token.property),
    :global(.token.tag),
    :global(.token.boolean),
    :global(.token.number),
    :global(.token.constant),
    :global(.token.symbol),
    :global(.token.deleted) {
        color: oklch(var(--er));
    }
    
    :global(.token.selector),
    :global(.token.attr-name),
    :global(.token.string),
    :global(.token.char),
    :global(.token.builtin),
    :global(.token.inserted) {
        color: oklch(var(--su));
    }
    
    :global(.token.operator),
    :global(.token.entity),
    :global(.token.url),
    :global(.language-css .token.string),
    :global(.style .token.string) {
        color: oklch(var(--wa));
    }
    
    :global(.token.atrule),
    :global(.token.attr-value),
    :global(.token.keyword) {
        color: oklch(var(--in));
    }
    
    :global(.token.function),
    :global(.token.class-name) {
        color: oklch(var(--pr));
    }
    
    :global(.token.regex),
    :global(.token.important),
    :global(.token.variable) {
        color: oklch(var(--ac));
    }
</style>