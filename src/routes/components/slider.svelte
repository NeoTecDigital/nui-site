<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, RotateCcw, Volume2, VolumeX } from 'lucide-svelte';
    import { onMount } from 'svelte';

    const installCommand = 'npx @nui/cli add slider';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<Slider value={50} />`;

    const variantsCode = `<Slider value={50} variant="primary" />
<Slider value={50} variant="secondary" />
<Slider value={50} variant="accent" />
<Slider value={50} variant="success" />
<Slider value={50} variant="warning" />
<Slider value={50} variant="error" />`;

    const sizesCode = `<Slider value={50} size="xs" />
<Slider value={50} size="sm" />
<Slider value={50} size="md" />
<Slider value={50} size="lg" />`;

    const statesCode = `<Slider value={50} />
<Slider value={50} disabled />
<Slider value={25} variant="error" />
<Slider value={75} variant="success" />`;

    const rangeCode = `<script>
  let rangeValue = 50;
  let minValue = 0;
  let maxValue = 100;
  let stepValue = 5;
<\/script>

<Slider 
  bind:value={rangeValue} 
  min={minValue} 
  max={maxValue} 
  step={stepValue} 
/>
<p>Value: {rangeValue}</p>`;

    const dualRangeCode = `<script>
  let minRange = 25;
  let maxRange = 75;
<\/script>

<div class="space-y-4">
  <div class="relative">
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={minRange}
      on:input={(e) => handleMinRangeChange(parseInt(e.target.value))}
      class="range range-primary absolute w-full" 
    />
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={maxRange}
      on:input={(e) => handleMaxRangeChange(parseInt(e.target.value))}
      class="range range-primary absolute w-full opacity-75" 
    />
  </div>
  <div class="flex justify-between">
    <span>Min: {minRange}</span>
    <span>Max: {maxRange}</span>
  </div>
</div>`;

    const stepsCode = `<script>
  let stepValue = 50;
<\/script>

<div class="space-y-2">
  <input 
    type="range" 
    min="0" 
    max="100" 
    step="10"
    bind:value={stepValue}
    class="range range-primary w-full" 
  />
  <div class="w-full flex justify-between text-xs px-2">
    <span>0</span>
    <span>10</span>
    <span>20</span>
    <span>30</span>
    <span>40</span>
    <span>50</span>
    <span>60</span>
    <span>70</span>
    <span>80</span>
    <span>90</span>
    <span>100</span>
  </div>
</div>`;

    const customStylingCode = `<!-- Custom colors and styling -->
<div class="space-y-4">
  <input type="range" min="0" max="100" value="50" 
         class="range" 
         style="--range-shdw: #3b82f6;" />
         
  <input type="range" min="0" max="100" value="50" 
         class="range range-lg" 
         style="--range-shdw: #ef4444;" />
         
  <input type="range" min="0" max="100" value="50" 
         class="range range-xs" 
         style="--range-shdw: #10b981;" />
</div>`;

    const apiProps = [
        {
            name: 'value',
            type: 'number',
            default: '0',
            description: 'Current value of the slider'
        },
        {
            name: 'min',
            type: 'number',
            default: '0',
            description: 'Minimum value of the slider'
        },
        {
            name: 'max',
            type: 'number',
            default: '100',
            description: 'Maximum value of the slider'
        },
        {
            name: 'step',
            type: 'number',
            default: '1',
            description: 'Step increment for slider values'
        },
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
            default: "'primary'",
            description: 'Visual style variant of the slider'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the slider track and thumb'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the slider interaction'
        },
        {
            name: 'vertical',
            type: 'boolean',
            default: 'false',
            description: 'Renders slider in vertical orientation'
        },
        {
            name: 'showValue',
            type: 'boolean',
            default: 'false',
            description: 'Shows current value as tooltip or label'
        }
    ];

    // Demo state for interactive examples
    let basicValue = 50;
    let primaryValue = 60;
    let secondaryValue = 40;
    let accentValue = 70;
    let successValue = 85;
    let warningValue = 30;
    let errorValue = 15;

    let xsValue = 50;
    let smValue = 50;
    let mdValue = 50;
    let lgValue = 50;

    let rangeValue = 50;
    let minRange = 25;
    let maxRange = 75;
    let stepValue = 50;

    let volumeValue = 75;
    let brightnessValue = 60;
    let temperatureValue = 22;

    // Dual range example - constraint handling
    function handleMinRangeChange(value) {
        minRange = Math.min(value, maxRange);
    }
    
    function handleMaxRangeChange(value) {
        maxRange = Math.max(value, minRange);
    }

    const resetValues = () => {
        basicValue = 50;
        primaryValue = 60;
        secondaryValue = 40;
        accentValue = 70;
        successValue = 85;
        warningValue = 30;
        errorValue = 15;
        xsValue = 50;
        smValue = 50;
        mdValue = 50;
        lgValue = 50;
        rangeValue = 50;
        minRange = 25;
        maxRange = 75;
        stepValue = 50;
        volumeValue = 75;
        brightnessValue = 60;
        temperatureValue = 22;
    };
</script>

<svelte:head>
    <title>Slider - NUI Components</title>
    <meta name="description" content="Slider component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Slider</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Slider</h1>
                <p class="text-xl text-base-content/70">
                    Interactive range sliders for selecting values from a continuous range.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/slider"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-ghost btn-sm"
                >
                    <Github class="w-4 h-4 mr-2" />
                    Source
                </a>
            </div>
        </div>

        <!-- Installation -->
        <div class="alert mb-8">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Installation</h3>
                <CodeBlock code={installCommand} language="bash" copyable={true} />
            </div>
        </div>
    </div>

    <!-- Basic Usage -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Basic Usage" 
            description="Simple range slider with default settings"
            code={basicUsage}
        >
            <div class="w-full max-w-md space-y-2">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    bind:value={basicValue}
                    class="range range-primary w-full" 
                />
                <div class="text-center text-sm text-base-content/70">
                    Value: {basicValue}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different color variants for various contexts"
            code={variantsCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <div>
                    <label class="text-sm font-medium">Primary</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={primaryValue}
                        class="range range-primary w-full" 
                    />
                    <span class="text-xs text-base-content/70">{primaryValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Secondary</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={secondaryValue}
                        class="range range-secondary w-full" 
                    />
                    <span class="text-xs text-base-content/70">{secondaryValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Accent</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={accentValue}
                        class="range range-accent w-full" 
                    />
                    <span class="text-xs text-base-content/70">{accentValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Success</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={successValue}
                        class="range range-success w-full" 
                    />
                    <span class="text-xs text-base-content/70">{successValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Warning</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={warningValue}
                        class="range range-warning w-full" 
                    />
                    <span class="text-xs text-base-content/70">{warningValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Error</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={errorValue}
                        class="range range-error w-full" 
                    />
                    <span class="text-xs text-base-content/70">{errorValue}</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different slider sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-6 w-full max-w-md">
                <div>
                    <label class="text-sm font-medium">Extra Small</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={xsValue}
                        class="range range-primary range-xs w-full" 
                    />
                    <span class="text-xs text-base-content/70">{xsValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Small</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={smValue}
                        class="range range-primary range-sm w-full" 
                    />
                    <span class="text-xs text-base-content/70">{smValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Medium (Default)</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={mdValue}
                        class="range range-primary w-full" 
                    />
                    <span class="text-xs text-base-content/70">{mdValue}</span>
                </div>
                <div>
                    <label class="text-sm font-medium">Large</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={lgValue}
                        class="range range-primary range-lg w-full" 
                    />
                    <span class="text-xs text-base-content/70">{lgValue}</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Slider states including disabled and validation states"
            code={statesCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <div>
                    <label class="text-sm font-medium">Normal</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="50"
                        class="range range-primary w-full" 
                    />
                </div>
                <div>
                    <label class="text-sm font-medium text-base-content/50">Disabled</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="50"
                        class="range range-primary w-full" 
                        disabled
                    />
                </div>
                <div>
                    <label class="text-sm font-medium">Error State</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="25"
                        class="range range-error w-full" 
                    />
                </div>
                <div>
                    <label class="text-sm font-medium">Success State</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="75"
                        class="range range-success w-full" 
                    />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Range Controls -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Range Controls" 
            description="Slider with customizable min, max, and step values"
            code={rangeCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <div>
                    <label class="text-sm font-medium">Value: {rangeValue}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="5"
                        bind:value={rangeValue}
                        class="range range-primary w-full" 
                    />
                </div>
                <div class="grid grid-cols-3 gap-2 text-xs">
                    <div>
                        <label>Min: 0</label>
                    </div>
                    <div class="text-center">
                        <label>Step: 5</label>
                    </div>
                    <div class="text-right">
                        <label>Max: 100</label>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Dual Range -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Dual Range Slider" 
            description="Two-thumb slider for selecting a range of values"
            code={dualRangeCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <div class="relative">
                    <!-- Background track -->
                    <div class="absolute inset-0 bg-base-300 rounded-lg h-2 mt-2"></div>
                    <!-- Active range -->
                    <div 
                        class="absolute bg-primary rounded-lg h-2 mt-2"
                        style="left: {minRange}%; width: {maxRange - minRange}%"
                    ></div>
                    <!-- Min range slider -->
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={minRange}
                        class="range range-primary absolute w-full opacity-0" 
                    />
                    <!-- Max range slider -->
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        bind:value={maxRange}
                        class="range range-primary absolute w-full opacity-0" 
                    />
                </div>
                <div class="flex justify-between text-sm">
                    <span>Min: {minRange}</span>
                    <span>Range: {maxRange - minRange}</span>
                    <span>Max: {maxRange}</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Steps with Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Steps with Labels" 
            description="Slider with visible step markers and labels"
            code={stepsCode}
        >
            <div class="space-y-2 w-full max-w-md">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="10"
                    bind:value={stepValue}
                    class="range range-primary w-full" 
                />
                <div class="w-full flex justify-between text-xs px-2">
                    <span class="cursor-pointer" on:click={() => stepValue = 0}>0</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 10}>10</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 20}>20</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 30}>30</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 40}>40</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 50}>50</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 60}>60</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 70}>70</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 80}>80</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 90}>90</span>
                    <span class="cursor-pointer" on:click={() => stepValue = 100}>100</span>
                </div>
                <div class="text-center text-sm font-medium">
                    Selected: {stepValue}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Styling" 
            description="Sliders with custom colors and styling options"
            code={customStylingCode}
        >
            <div class="space-y-6 w-full max-w-md">
                <div>
                    <label class="text-sm font-medium">Custom Blue</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="50"
                        class="range w-full" 
                        style="--range-shdw: #3b82f6;" 
                    />
                </div>
                <div>
                    <label class="text-sm font-medium">Custom Red (Large)</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="50"
                        class="range range-lg w-full" 
                        style="--range-shdw: #ef4444;" 
                    />
                </div>
                <div>
                    <label class="text-sm font-medium">Custom Green (Small)</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="50"
                        class="range range-xs w-full" 
                        style="--range-shdw: #10b981;" 
                    />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Reset Controls -->
    <div class="max-w-4xl mb-12">
        <div class="flex justify-center">
            <button class="btn btn-outline btn-sm" on:click={resetValues}>
                <RotateCcw class="w-4 h-4 mr-2" />
                Reset All Values
            </button>
        </div>
    </div>

    <!-- API Reference -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">API Reference</h2>
        
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each apiProps as prop}
                        <tr>
                            <td>
                                <code class="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                                    {prop.name}
                                </code>
                            </td>
                            <td>
                                <code class="text-sm text-base-content/70">
                                    {prop.type}
                                </code>
                            </td>
                            <td>
                                <code class="text-sm text-base-content/70">
                                    {prop.default}
                                </code>
                            </td>
                            <td class="text-sm">
                                {prop.description}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Accessibility -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
        <div class="prose prose-sm max-w-none">
            <ul class="space-y-2">
                <li>✅ Uses semantic <code>&lt;input type="range"&gt;</code> element with proper ARIA attributes</li>
                <li>✅ Supports keyboard navigation (arrow keys, home, end, page up/down)</li>
                <li>✅ Provides accessible value announcements for screen readers</li>
                <li>✅ Includes proper focus indicators and visual feedback</li>
                <li>✅ Supports <code>aria-label</code>, <code>aria-labelledby</code>, and <code>aria-describedby</code></li>
                <li>✅ Compatible with high contrast mode and reduced motion preferences</li>
                <li>✅ Maintains proper color contrast ratios for all variants</li>
                <li>✅ Respects user's preferred reduced motion settings</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Volume Control -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Volume Control</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                {#if volumeValue === 0}
                                    <VolumeX class="w-5 h-5 text-base-content/70" />
                                {:else}
                                    <Volume2 class="w-5 h-5 text-base-content/70" />
                                {/if}
                            </div>
                            <div class="flex-1">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    bind:value={volumeValue}
                                    class="range range-primary w-full" 
                                />
                            </div>
                            <div class="w-12 text-right text-sm">
                                {volumeValue}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Panel -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Settings Panel</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="font-medium mb-4">Display Settings</h4>
                        <div class="space-y-6">
                            <!-- Brightness -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <label class="text-sm font-medium">Brightness</label>
                                    <span class="text-sm text-base-content/70">{brightnessValue}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    bind:value={brightnessValue}
                                    class="range range-accent w-full" 
                                />
                            </div>
                            
                            <!-- Temperature -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <label class="text-sm font-medium">Temperature</label>
                                    <span class="text-sm text-base-content/70">{temperatureValue}°C</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="16" 
                                    max="30" 
                                    bind:value={temperatureValue}
                                    class="range range-warning w-full" 
                                />
                                <div class="flex justify-between text-xs text-base-content/70 mt-1">
                                    <span>Cool</span>
                                    <span>Warm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Price Range Filter -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Price Range Filter</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="font-medium mb-4">Filter by Price</h4>
                        <div class="space-y-4">
                            <div class="relative">
                                <!-- Background track -->
                                <div class="absolute inset-0 bg-base-300 rounded-lg h-2 mt-2"></div>
                                <!-- Active range -->
                                <div 
                                    class="absolute bg-success rounded-lg h-2 mt-2"
                                    style="left: {(minRange/100)*100}%; width: {((maxRange-minRange)/100)*100}%"
                                ></div>
                                <!-- Min range slider -->
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    bind:value={minRange}
                                    class="range range-success absolute w-full opacity-0" 
                                />
                                <!-- Max range slider -->
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    bind:value={maxRange}
                                    class="range range-success absolute w-full opacity-0" 
                                />
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="text-sm">
                                    <span class="font-medium">${minRange * 10}</span>
                                </div>
                                <div class="text-sm text-base-content/70">
                                    {maxRange - minRange > 0 ? `${maxRange - minRange} products` : 'No range selected'}
                                </div>
                                <div class="text-sm">
                                    <span class="font-medium">${maxRange * 10}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rating Selector -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Rating Selector</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="font-medium mb-4">Minimum Rating</h4>
                        <div class="space-y-4">
                            <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                step="1"
                                bind:value={stepValue}
                                class="range range-warning w-full" 
                            />
                            <div class="w-full flex justify-between text-xs px-2">
                                <span class="cursor-pointer" on:click={() => stepValue = 1}>⭐</span>
                                <span class="cursor-pointer" on:click={() => stepValue = 2}>⭐⭐</span>
                                <span class="cursor-pointer" on:click={() => stepValue = 3}>⭐⭐⭐</span>
                                <span class="cursor-pointer" on:click={() => stepValue = 4}>⭐⭐⭐⭐</span>
                                <span class="cursor-pointer" on:click={() => stepValue = 5}>⭐⭐⭐⭐⭐</span>
                            </div>
                            <div class="text-center">
                                <span class="text-sm font-medium">
                                    {Math.min(Math.max(Math.floor(stepValue/20*5), 1), 5)} stars and above
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>