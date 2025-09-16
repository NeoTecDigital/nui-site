<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronDown } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add select';

    const basicUsage = `<script>
  import { Select } from '@nui/core';
<\/script>

<select class="select select-bordered">
  <option disabled selected>Choose option</option>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>`;

    const variantsCode = `<select class="select">Default</select>
<select class="select select-bordered">Bordered</select>
<select class="select select-ghost">Ghost</select>
<select class="select select-primary">Primary</select>
<select class="select select-secondary">Secondary</select>
<select class="select select-accent">Accent</select>`;

    const sizesCode = `<select class="select select-bordered select-xs">Extra Small</select>
<select class="select select-bordered select-sm">Small</select>
<select class="select select-bordered select-md">Medium</select>
<select class="select select-bordered select-lg">Large</select>`;

    const statesCode = `<select class="select select-bordered">Normal</select>
<select class="select select-bordered" disabled>Disabled</select>
<select class="select select-bordered select-error">Error</select>
<select class="select select-bordered select-success">Success</select>
<select class="select select-bordered select-warning">Warning</select>`;

    const multiSelectCode = `<select class="select select-bordered" multiple size="4">
  <option>React</option>
  <option>Vue</option>
  <option>Angular</option>
  <option>Svelte</option>
  <option>Solid</option>
</select>`;

    const optgroupCode = `<select class="select select-bordered">
  <option disabled selected>Choose framework</option>
  <optgroup label="Frontend">
    <option>React</option>
    <option>Vue</option>
    <option>Angular</option>
    <option>Svelte</option>
  </optgroup>
  <optgroup label="Backend">
    <option>Node.js</option>
    <option>Django</option>
    <option>Rails</option>
    <option>Laravel</option>
  </optgroup>
</select>`;

    const apiProps = [
        {
            name: 'multiple',
            type: 'boolean',
            default: 'false',
            description: 'Allows multiple option selection'
        },
        {
            name: 'size',
            type: 'number',
            default: 'undefined',
            description: 'Number of visible options (for multiple selects)'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the select input'
        },
        {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Makes the select required in forms'
        },
        {
            name: 'class',
            type: 'string',
            default: 'undefined',
            description: 'Additional CSS classes (select-bordered, select-ghost, etc.)'
        },
        {
            name: 'value',
            type: 'string | string[]',
            default: 'undefined',
            description: 'Selected value(s) for the select'
        }
    ];

    // State for interactive examples
    let selectedFramework = '';
    let selectedLanguages: string[] = [];
    let selectedCategory = '';
</script>

<svelte:head>
    <title>Select - NUI Components</title>
    <meta name="description" content="Select component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Select</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Select</h1>
                <p class="text-xl text-base-content/70">
                    Dropdown selection component with multiple variants, sizes, and states.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/select"
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
            description="Simple select dropdown with default styling"
            code={basicUsage}
        >
            <select class="select select-bordered w-full max-w-xs">
                <option disabled selected>Choose option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various use cases"
            code={variantsCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <select class="select w-full">
                    <option disabled selected>Default</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered w-full">
                    <option disabled selected>Bordered</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-ghost w-full">
                    <option disabled selected>Ghost</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-primary w-full">
                    <option disabled selected>Primary</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-secondary w-full">
                    <option disabled selected>Secondary</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-accent w-full">
                    <option disabled selected>Accent</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different select sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <select class="select select-bordered select-xs w-full">
                    <option disabled selected>Extra Small</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-sm w-full">
                    <option disabled selected>Small</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-md w-full">
                    <option disabled selected>Medium</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-lg w-full">
                    <option disabled selected>Large</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Select states including disabled and validation states"
            code={statesCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <select class="select select-bordered w-full">
                    <option disabled selected>Normal</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered w-full" disabled>
                    <option disabled selected>Disabled</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-error w-full">
                    <option disabled selected>Error</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-success w-full">
                    <option disabled selected>Success</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <select class="select select-bordered select-warning w-full">
                    <option disabled selected>Warning</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Multi-Select -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Multi-Select" 
            description="Allow users to select multiple options"
            code={multiSelectCode}
        >
            <select class="select select-bordered w-full max-w-xs" multiple size="4" bind:value={selectedLanguages}>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="angular">Angular</option>
                <option value="svelte">Svelte</option>
                <option value="solid">Solid</option>
            </select>
            {#if selectedLanguages.length > 0}
                <div class="mt-2 text-sm text-base-content/70">
                    Selected: {selectedLanguages.join(', ')}
                </div>
            {/if}
        </ComponentShowcase>
    </div>

    <!-- With Optgroups -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Option Groups" 
            description="Organize options into logical groups"
            code={optgroupCode}
        >
            <select class="select select-bordered w-full max-w-xs" bind:value={selectedCategory}>
                <option disabled selected>Choose framework</option>
                <optgroup label="Frontend">
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                    <option value="svelte">Svelte</option>
                </optgroup>
                <optgroup label="Backend">
                    <option value="nodejs">Node.js</option>
                    <option value="django">Django</option>
                    <option value="rails">Rails</option>
                    <option value="laravel">Laravel</option>
                </optgroup>
            </select>
            {#if selectedCategory}
                <div class="mt-2 text-sm text-base-content/70">
                    Selected: {selectedCategory}
                </div>
            {/if}
        </ComponentShowcase>
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

    <!-- CSS Classes -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">CSS Classes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-semibold mb-3">Variants</h3>
                <ul class="space-y-1 text-sm">
                    <li><code class="bg-base-200 px-2 py-1 rounded">select</code> - Base select class</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-bordered</code> - Adds border</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-ghost</code> - Ghost style</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-primary</code> - Primary color</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-secondary</code> - Secondary color</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-accent</code> - Accent color</li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-3">Sizes & States</h3>
                <ul class="space-y-1 text-sm">
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-xs</code> - Extra small</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-sm</code> - Small</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-md</code> - Medium</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-lg</code> - Large</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-error</code> - Error state</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-success</code> - Success state</li>
                    <li><code class="bg-base-200 px-2 py-1 rounded">select-warning</code> - Warning state</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Accessibility -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
        <div class="prose prose-sm max-w-none">
            <ul class="space-y-2">
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">↑</kbd> <kbd class="kbd kbd-sm">↓</kbd> <kbd class="kbd kbd-sm">Enter</kbd> and <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes and labels</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports form validation and error states</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Supports optgroup labeling for better organization</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Form Select with Label -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Select with Label</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Choose your country</span>
                            </label>
                            <select class="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select country</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Germany</option>
                                <option>France</option>
                                <option>Japan</option>
                            </select>
                            <label class="label">
                                <span class="label-text-alt">Required for shipping</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Dropdown -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Filter Dropdown</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <span class="text-sm font-medium">Sort by:</span>
                            <select class="select select-bordered select-sm">
                                <option>Date created</option>
                                <option>Name A-Z</option>
                                <option>Name Z-A</option>
                                <option>Price low to high</option>
                                <option>Price high to low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Multi-Select with Tags -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Multi-Select Skills</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Select your skills</span>
                            </label>
                            <select class="select select-bordered w-full" multiple size="5">
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="react">React</option>
                                <option value="svelte">Svelte</option>
                                <option value="nodejs">Node.js</option>
                                <option value="python">Python</option>
                                <option value="design">UI/UX Design</option>
                                <option value="testing">Testing</option>
                            </select>
                            <label class="label">
                                <span class="label-text-alt">Hold Ctrl/Cmd to select multiple</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>