<script lang="ts">
    import { theme, themes } from '$lib/stores/theme.js';
    import { Palette, Download, Sun, Moon, Sparkles } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import { cn } from '$lib/utils/index.js';

    let selectedTheme = $theme;

    function previewTheme(themeName: string) {
        selectedTheme = themeName;
    }

    function applyTheme(themeName: string) {
        theme.set(themeName as any);
        selectedTheme = themeName;
    }

    const themeCategories = [
        {
            name: 'Light Themes',
            icon: Sun,
            themes: ['light', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'garden', 'lofi', 'pastel', 'fantasy', 'wireframe', 'cmyk', 'autumn', 'acid', 'lemonade', 'winter']
        },
        {
            name: 'Dark Themes', 
            icon: Moon,
            themes: ['dark', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'forest', 'aqua', 'black', 'luxury', 'dracula', 'business', 'night', 'coffee']
        }
    ];

    const customThemeCode = `// tailwind.config.js
module.exports = {
  // ... other config
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#f6d860", 
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}`;

    const themeUsageCode = `<script>
  import { theme } from '@nui/core/stores';
  
  // Set theme programmatically
  theme.set('dark');
  
  // Or toggle between themes
  function toggleTheme() {
    theme.update(current => current === 'light' ? 'dark' : 'light');
  }
<\/script>

<!-- Theme will be applied automatically -->
<div data-theme={$theme}>
  <Button>Themed Button</Button>
</div>`;

    function getThemeColors(themeName: string) {
        // This would normally fetch actual theme colors
        // For demo purposes, returning mock data
        return {
            primary: '#0ea5e9',
            secondary: '#8b5cf6', 
            accent: '#06b6d4',
            neutral: '#374151',
            base: '#ffffff'
        };
    }
</script>

<svelte:head>
    <title>Themes - NUI</title>
    <meta name="description" content="Explore and customize DaisyUI themes for NUI components" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-12">
        <h1 class="text-4xl font-bold mb-4">Themes</h1>
        <p class="text-xl text-base-content/70">
            Customize the look and feel of your application with DaisyUI's comprehensive theming system.
        </p>
    </div>

    <!-- Current Theme Preview -->
    <div class="max-w-6xl mx-auto mb-12">
        <div class="card bg-base-100 shadow-lg" data-theme={selectedTheme}>
            <div class="card-body">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="card-title text-2xl">
                        <Palette class="w-6 h-6 mr-2" />
                        Current Theme: {selectedTheme}
                    </h2>
                    {#if selectedTheme !== $theme}
                        <button 
                            on:click={() => applyTheme(selectedTheme)}
                            class="btn btn-primary"
                        >
                            Apply Theme
                        </button>
                    {/if}
                </div>

                <!-- Theme Preview Components -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Buttons -->
                    <div class="space-y-3">
                        <h3 class="font-semibold">Buttons</h3>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn btn-primary btn-sm">Primary</button>
                            <button class="btn btn-secondary btn-sm">Secondary</button>
                            <button class="btn btn-accent btn-sm">Accent</button>
                        </div>
                    </div>

                    <!-- Form Elements -->
                    <div class="space-y-3">
                        <h3 class="font-semibold">Form Elements</h3>
                        <input type="text" placeholder="Input field" class="input input-bordered input-sm w-full" />
                        <select class="select select-bordered select-sm w-full">
                            <option>Select option</option>
                        </select>
                    </div>

                    <!-- Feedback -->
                    <div class="space-y-3">
                        <h3 class="font-semibold">Feedback</h3>
                        <div class="alert alert-info py-2">
                            <span class="text-sm">Info alert</span>
                        </div>
                        <div class="flex gap-2">
                            <span class="badge badge-success badge-sm">Success</span>
                            <span class="badge badge-warning badge-sm">Warning</span>
                            <span class="badge badge-error badge-sm">Error</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Theme Gallery -->
    <div class="max-w-6xl mx-auto mb-12">
        <h2 class="text-2xl font-bold mb-8">Theme Gallery</h2>
        
        {#each themeCategories as category}
            <div class="mb-12">
                <h3 class="text-xl font-semibold mb-6 flex items-center">
                    <svelte:component this={category.icon} class="w-5 h-5 mr-2" />
                    {category.name}
                </h3>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {#each category.themes as themeName}
                        <button 
                            class={cn(
                                'card bg-base-100 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md text-left w-full',
                                selectedTheme === themeName ? 'border-primary' : 'border-transparent'
                            )}
                            data-theme={themeName}
                            on:click={() => previewTheme(themeName)}
                        >
                            <div class="card-body p-4">
                                <h4 class="card-title text-sm capitalize">{themeName}</h4>
                                
                                <!-- Theme Color Palette -->
                                <div class="flex space-x-1 mt-2">
                                    <div class="w-4 h-4 rounded bg-primary"></div>
                                    <div class="w-4 h-4 rounded bg-secondary"></div>
                                    <div class="w-4 h-4 rounded bg-accent"></div>
                                    <div class="w-4 h-4 rounded bg-neutral"></div>
                                </div>

                                <!-- Mini Preview -->
                                <div class="mt-3 space-y-2">
                                    <button class="btn btn-primary btn-xs w-full">Button</button>
                                    <input type="text" class="input input-bordered input-xs w-full" placeholder="Input" readonly />
                                </div>

                                {#if themeName === $theme}
                                    <div class="badge badge-primary badge-sm mt-2">Current</div>
                                {/if}
                            </div>
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Theme Usage -->
    <div class="max-w-4xl mx-auto mb-12">
        <h2 class="text-2xl font-bold mb-6">Using Themes</h2>
        
        <div class="space-y-8">
            <!-- Programmatic Usage -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Programmatic Theme Switching</h3>
                <CodeBlock code={themeUsageCode} language="svelte" />
            </div>

            <!-- Custom Themes -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Creating Custom Themes</h3>
                <p class="text-base-content/70 mb-4">
                    You can create custom themes by extending the DaisyUI configuration in your Tailwind config:
                </p>
                <CodeBlock code={customThemeCode} language="javascript" />
            </div>
        </div>
    </div>

    <!-- Theme Customization -->
    <div class="max-w-4xl mx-auto mb-12">
        <h2 class="text-2xl font-bold mb-6">Theme Customization</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title">
                        <Sparkles class="w-5 h-5" />
                        CSS Variables
                    </h3>
                    <p class="text-sm text-base-content/70 mb-4">
                        All theme colors are available as CSS custom properties for easy customization.
                    </p>
                    <CodeBlock 
                        code={`:root {
  --p: 259 94% 51%; /* primary */
  --s: 314 100% 47%; /* secondary */
  --a: 174 60% 51%; /* accent */
}`}
                        language="css"
                        class="text-xs"
                    />
                </div>
            </div>

            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title">
                        <Download class="w-5 h-5" />
                        Theme Generator
                    </h3>
                    <p class="text-sm text-base-content/70 mb-4">
                        Use the DaisyUI theme generator to create custom themes visually.
                    </p>
                    <a 
                        href="https://daisyui.com/theme-generator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline btn-sm"
                    >
                        Open Generator
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Best Practices -->
    <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Best Practices</h2>
        
        <div class="space-y-4">
            <div class="alert">
                <div>
                    <h3 class="font-semibold mb-2">Theme Performance</h3>
                    <ul class="text-sm space-y-1">
                        <li>• Limit the number of themes to reduce bundle size</li>
                        <li>• Use theme switching sparingly to avoid layout shifts</li>
                        <li>• Test themes with your actual content and components</li>
                    </ul>
                </div>
            </div>

            <div class="alert alert-info">
                <div>
                    <h3 class="font-semibold mb-2">Accessibility</h3>
                    <ul class="text-sm space-y-1">
                        <li>• Ensure sufficient color contrast in custom themes</li>
                        <li>• Test with screen readers and keyboard navigation</li>
                        <li>• Respect user's system theme preferences when possible</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>