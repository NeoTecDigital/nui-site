<script lang="ts">
    import { getContext } from 'svelte';
    import type { ChartConfig } from './types.js';
    import { cn } from '$lib/utils/index.js';

    let className: string | undefined = undefined;
    export { className as class };
    export let label: string | undefined = undefined;
    export let labelKey: string | undefined = undefined;
    export let nameKey: string | undefined = undefined;
    export let indicator: 'dot' | 'line' | 'dashed' = 'dot';
    export let hideLabel = false;
    export let hideIndicator = false;
    export let payload: any[] = [];
    export let active = false;
    export let labelFormatter: ((label: any) => string) | undefined = undefined;

    const chartConfig = getContext<ChartConfig>('chart-config') || {};

    $: formattedLabel = labelFormatter 
        ? labelFormatter(label) 
        : labelKey && chartConfig[labelKey]?.label 
        ? chartConfig[labelKey].label 
        : label;
</script>

{#if active && payload?.length}
    <div class={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className
    )} {...$$restProps}>
        {#if !hideLabel && formattedLabel}
            <p class="font-medium text-foreground">{formattedLabel}</p>
        {/if}
        
        <div class="grid gap-1.5">
            {#each payload as item}
                {@const itemConfig = nameKey 
                    ? chartConfig?.[item[nameKey]] 
                    : chartConfig?.[item.dataKey] || chartConfig?.[item.name?.toLowerCase()]
                }
                {@const indicatorColor = item.color || itemConfig?.color}
                {@const itemName = itemConfig?.label || item.name}
                
                <div class="flex w-full items-center text-xs">
                    {#if !hideIndicator && indicatorColor}
                        <div class="flex items-center gap-1.5">
                            {#if indicator === 'dot'}
                                <div 
                                    class="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]" 
                                    style="--color-bg: {indicatorColor}">
                                </div>
                            {:else if indicator === 'line'}
                                <div 
                                    class="h-[1px] w-2.5 shrink-0 bg-[--color-bg]" 
                                    style="--color-bg: {indicatorColor}">
                                </div>
                            {:else if indicator === 'dashed'}
                                <div 
                                    class="h-[1px] w-2.5 shrink-0 bg-[--color-bg] opacity-50" 
                                    style="--color-bg: {indicatorColor}; background-image: linear-gradient(90deg, transparent 0%, transparent 50%, {indicatorColor} 50%, {indicatorColor} 100%); background-size: 2px 1px;">
                                </div>
                            {/if}
                        </div>
                    {/if}
                    
                    <div class="flex w-full items-center justify-between leading-none">
                        <span class="text-muted-foreground">{itemName}</span>
                        <span class="font-mono font-medium text-foreground tabular-nums">
                            {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}