<script lang="ts">
    import CodeBlock from './CodeBlock.svelte';
    import { cn } from '$lib/utils/index.js';

    export let title: string;
    export let description: string | undefined = undefined;
    export let code: string;
    export let language: string = 'svelte';
    let className: string = '';
    export { className as class };

    let showCode = false;
</script>

<div class={cn('space-y-4', className)}>
    <div>
        <h3 class="text-lg font-semibold mb-2">{title}</h3>
        {#if description}
            <p class="text-base-content/70 text-sm">{description}</p>
        {/if}
    </div>

    <!-- Preview -->
    <div class="rounded-lg border bg-base-100 p-6">
        <div class="flex items-center justify-center min-h-32">
            <slot />
        </div>
    </div>

    <!-- Code Toggle -->
    <div class="flex justify-between items-center">
        <button
            on:click={() => showCode = !showCode}
            class="btn btn-outline btn-sm"
        >
            {showCode ? 'Hide' : 'Show'} Code
        </button>
        
        <div class="flex items-center space-x-2 text-xs text-base-content/60">
            <span class="badge badge-outline badge-xs">{language}</span>
        </div>
    </div>

    <!-- Code Block -->
    {#if showCode}
        <CodeBlock {code} {language} title={`${title} Example`} />
    {/if}
</div>