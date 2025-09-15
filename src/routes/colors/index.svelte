<script lang="ts">
    import { Palette, Copy, Check, Eye, Lightbulb } from 'lucide-svelte';
    import { theme, themes } from '$lib/stores/theme.js';
    import CodeBlock from '$lib/components/CodeBlock.svelte';

    let copiedColor = '';

    async function copyToClipboard(color: string) {
        try {
            await navigator.clipboard.writeText(color);
            copiedColor = color;
            setTimeout(() => {
                copiedColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    const colorCategories = [
        {
            name: 'Primary Colors',
            description: 'Main brand colors used for primary actions and emphasis',
            colors: [
                { name: 'primary', class: 'bg-primary text-primary-content', description: 'Main brand color' },
                { name: 'primary-content', class: 'bg-primary-content text-primary', description: 'Text on primary background' },
                { name: 'primary-focus', class: 'bg-primary-focus text-primary-content', description: 'Primary color for hover/focus states' },
            ]
        },
        {
            name: 'Secondary Colors',
            description: 'Supporting colors for secondary actions and accents',
            colors: [
                { name: 'secondary', class: 'bg-secondary text-secondary-content', description: 'Secondary brand color' },
                { name: 'secondary-content', class: 'bg-secondary-content text-secondary', description: 'Text on secondary background' },
                { name: 'secondary-focus', class: 'bg-secondary-focus text-secondary-content', description: 'Secondary color for hover/focus states' },
            ]
        },
        {
            name: 'Accent Colors',
            description: 'Accent colors for highlights and special elements',
            colors: [
                { name: 'accent', class: 'bg-accent text-accent-content', description: 'Accent color' },
                { name: 'accent-content', class: 'bg-accent-content text-accent', description: 'Text on accent background' },
                { name: 'accent-focus', class: 'bg-accent-focus text-accent-content', description: 'Accent color for hover/focus states' },
            ]
        },
        {
            name: 'Neutral Colors',
            description: 'Base colors for backgrounds, borders, and general UI elements',
            colors: [
                { name: 'neutral', class: 'bg-neutral text-neutral-content', description: 'Neutral color' },
                { name: 'neutral-content', class: 'bg-neutral-content text-neutral', description: 'Text on neutral background' },
                { name: 'neutral-focus', class: 'bg-neutral-focus text-neutral-content', description: 'Neutral color for hover/focus states' },
            ]
        },
        {
            name: 'Base Colors',
            description: 'Background and surface colors',
            colors: [
                { name: 'base-100', class: 'bg-base-100 text-base-content border', description: 'Lightest background' },
                { name: 'base-200', class: 'bg-base-200 text-base-content', description: 'Light background' },
                { name: 'base-300', class: 'bg-base-300 text-base-content', description: 'Medium background' },
                { name: 'base-content', class: 'bg-base-content text-base-100', description: 'Main text color' },
            ]
        },
        {
            name: 'State Colors',
            description: 'Colors for indicating different states and feedback',
            colors: [
                { name: 'info', class: 'bg-info text-info-content', description: 'Informational messages' },
                { name: 'success', class: 'bg-success text-success-content', description: 'Success states' },
                { name: 'warning', class: 'bg-warning text-warning-content', description: 'Warning states' },
                { name: 'error', class: 'bg-error text-error-content', description: 'Error states' },
            ]
        }
    ];

    const usageExample = `<!-- Using CSS variables -->
<div style="background-color: oklch(var(--p));">
  Primary color background
</div>

<!-- Using Tailwind classes -->
<div class="bg-primary text-primary-content">
  Primary color with content text
</div>

<!-- Using DaisyUI color modifiers -->
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>`;

    const customThemeExample = `/* Custom theme with CSS variables */
[data-theme="custom"] {
  --p: 259 94% 51%;           /* primary */
  --pc: 259 96% 91%;          /* primary-content */
  --s: 314 100% 47%;          /* secondary */
  --sc: 314 100% 91%;         /* secondary-content */
  --a: 174 60% 51%;           /* accent */
  --ac: 174 60% 15%;          /* accent-content */
  --n: 219 14% 28%;           /* neutral */
  --nc: 220 13% 69%;          /* neutral-content */
  --b1: 0 0% 100%;            /* base-100 */
  --b2: 0 0% 95%;             /* base-200 */
  --b3: 0 0% 90%;             /* base-300 */
  --bc: 215 28% 17%;          /* base-content */
}`;
</script>

<svelte:head>
    <title>Colors - NUI Components</title>
    <meta name="description" content="Complete color system and theming guide for NUI components" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Colors & Theming</h1>
                <p class="text-xl text-base-content/70">
                    Complete color system and theming guide for building consistent UIs.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <Palette class="w-6 h-6 text-primary" />
            </div>
        </div>

        <!-- Current Theme Display -->
        <div class="alert mb-8">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Current Theme: <span class="capitalize">{$theme}</span></h3>
                <p class="text-sm text-base-content/70">
                    Switch themes using the toggle in the header to see how colors adapt across different themes.
                </p>
            </div>
        </div>
    </div>

    <!-- Color Palette -->
    <div class="max-w-6xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Color Palette</h2>
        
        <div class="space-y-12">
            {#each colorCategories as category}
                <div>
                    <h3 class="text-xl font-semibold mb-2">{category.name}</h3>
                    <p class="text-base-content/70 mb-6">{category.description}</p>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {#each category.colors as color}
                            <div class="card bg-base-100 shadow-sm border">
                                <div class="card-body p-4">
                                    <!-- Color Preview -->
                                    <button class="w-full h-16 rounded-lg {color.class} mb-3 flex items-center justify-center group cursor-pointer"
                                         on:click={() => copyToClipboard(`oklch(var(--${color.name.replace('-', '')}))`)}
                                         aria-label="Copy color value">
                                        <span class="opacity-0 group-hover:opacity-100 transition-opacity btn btn-ghost btn-sm">
                                            {#if copiedColor === `oklch(var(--${color.name.replace('-', '')}))`}
                                                <Check class="w-4 h-4" />
                                            {:else}
                                                <Copy class="w-4 h-4" />
                                            {/if}
                                        </span>
                                    </button>
                                    
                                    <!-- Color Info -->
                                    <div>
                                        <h4 class="font-semibold text-sm">{color.name}</h4>
                                        <p class="text-xs text-base-content/60 mb-2">{color.description}</p>
                                        <code class="text-xs bg-base-200 px-2 py-1 rounded">
                                            --{color.name.replace('-', '')}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Theme Showcase -->
    <div class="max-w-6xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Available Themes</h2>
        <p class="text-base-content/70 mb-6">
            NUI supports {themes.length} built-in themes. Click any theme below to preview it:
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {#each themes as themeName}
                <button 
                    class="card bg-base-100 shadow-sm border hover:shadow-md transition-shadow cursor-pointer {$theme === themeName ? 'ring-2 ring-primary' : ''}"
                    on:click={() => theme.set(themeName)}
                >
                    <div class="card-body p-4 text-center">
                        <div class="w-full h-8 rounded mb-2 flex" data-theme={themeName}>
                            <div class="flex-1 bg-primary rounded-l"></div>
                            <div class="flex-1 bg-secondary"></div>
                            <div class="flex-1 bg-accent rounded-r"></div>
                        </div>
                        <h4 class="text-sm font-medium capitalize">{themeName}</h4>
                    </div>
                </button>
            {/each}
        </div>
    </div>

    <!-- Usage Examples -->
    <div class="max-w-4xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Usage Examples</h2>
        
        <div class="space-y-8">
            <!-- CSS Variables -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Using Colors in Your Components</h3>
                <CodeBlock code={usageExample} language="html" />
            </div>

            <!-- Custom Themes -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Creating Custom Themes</h3>
                <CodeBlock code={customThemeExample} language="css" />
            </div>
        </div>
    </div>

    <!-- Best Practices -->
    <div class="max-w-4xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Best Practices</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check class="w-3 h-3 text-success" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Use semantic color names</h4>
                        <p class="text-sm text-base-content/70">Use primary, secondary, accent instead of specific color values</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check class="w-3 h-3 text-success" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Pair colors with their content variants</h4>
                        <p class="text-sm text-base-content/70">Always use primary-content for text on primary backgrounds</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check class="w-3 h-3 text-success" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Test across different themes</h4>
                        <p class="text-sm text-base-content/70">Ensure your design works with both light and dark themes</p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb class="w-3 h-3 text-warning" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Consider accessibility</h4>
                        <p class="text-sm text-base-content/70">Ensure sufficient contrast ratios for readability</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-info/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Eye class="w-3 h-3 text-info" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Use state colors appropriately</h4>
                        <p class="text-sm text-base-content/70">Reserve error, success, warning for their intended purposes</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Palette class="w-3 h-3 text-primary" />
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm mb-1">Maintain brand consistency</h4>
                        <p class="text-sm text-base-content/70">Create custom themes that align with your brand guidelines</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Accessibility -->
    <div class="max-w-4xl">
        <div class="alert alert-info">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Accessibility Note</h3>
                <p class="text-sm">
                    All NUI themes are designed with accessibility in mind, providing sufficient contrast ratios 
                    and supporting high contrast mode preferences. When creating custom themes, ensure proper 
                    contrast ratios for WCAG compliance.
                </p>
            </div>
        </div>
    </div>
</div>