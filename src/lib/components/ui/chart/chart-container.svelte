<script lang="ts">
    import type { ChartConfig } from './types.js';
    import { setContext } from 'svelte';
    import { cn } from '$lib/utils/index.js';

    let className: string | undefined = undefined;
    export { className as class };
    export let config: ChartConfig;

    setContext('chart-config', config);
</script>

<div class={cn('aspect-auto relative', className)} style="min-height: 250px;" {...$$restProps}>
    <slot />
</div>