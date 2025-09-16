<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Eye, EyeOff } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add input';

    const basicUsage = `<script>
  import { Input } from '@nui/core';
<\/script>

<Input placeholder="Enter text" />`;

    const variantsCode = `<Input placeholder="Default input" />
<Input placeholder="Bordered input" class="input-bordered" />
<Input placeholder="Ghost input" class="input-ghost" />
<Input placeholder="Primary input" class="input-primary" />
<Input placeholder="Secondary input" class="input-secondary" />
<Input placeholder="Accent input" class="input-accent" />`;

    const sizesCode = `<Input placeholder="Extra small" class="input-xs" />
<Input placeholder="Small" class="input-sm" />
<Input placeholder="Medium" class="input-md" />
<Input placeholder="Large" class="input-lg" />`;

    const statesCode = `<Input placeholder="Normal" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Error" class="input-error" />
<Input placeholder="Success" class="input-success" />
<Input placeholder="Warning" class="input-warning" />`;

    const typesCode = `<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="search" placeholder="Search input" />
<Input type="url" placeholder="URL input" />
<Input type="tel" placeholder="Phone input" />`;

    const apiProps = [
        {
            name: 'type',
            type: "'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel'",
            default: "'text'",
            description: 'The input type'
        },
        {
            name: 'placeholder',
            type: 'string',
            default: 'undefined',
            description: 'Placeholder text for the input'
        },
        {
            name: 'value',
            type: 'string',
            default: "''",
            description: 'The input value'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the input'
        },
        {
            name: 'readonly',
            type: 'boolean',
            default: 'false',
            description: 'Makes the input read-only'
        },
        {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Makes the input required'
        },
        {
            name: 'class',
            type: 'string',
            default: 'undefined',
            description: 'Additional CSS classes (input-bordered, input-ghost, etc.)'
        }
    ];
</script>

<svelte:head>
    <title>Input - NUI Components</title>
    <meta name="description" content="Input component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Input</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Input</h1>
                <p class="text-xl text-base-content/70">
                    Text input field with validation support and multiple variants.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/input"
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
            description="Simple input with default styling"
            code={basicUsage}
        >
            <input type="text" placeholder="Enter text" class="input input-bordered w-full max-w-xs" />
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
                <input type="text" placeholder="Default input" class="input w-full" />
                <input type="text" placeholder="Bordered input" class="input input-bordered w-full" />
                <input type="text" placeholder="Ghost input" class="input input-ghost w-full" />
                <input type="text" placeholder="Primary input" class="input input-bordered input-primary w-full" />
                <input type="text" placeholder="Secondary input" class="input input-bordered input-secondary w-full" />
                <input type="text" placeholder="Accent input" class="input input-bordered input-accent w-full" />
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different input sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <input type="text" placeholder="Extra small" class="input input-bordered input-xs w-full" />
                <input type="text" placeholder="Small" class="input input-bordered input-sm w-full" />
                <input type="text" placeholder="Medium" class="input input-bordered input-md w-full" />
                <input type="text" placeholder="Large" class="input input-bordered input-lg w-full" />
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Input states including disabled and validation states"
            code={statesCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <input type="text" placeholder="Normal" class="input input-bordered w-full" />
                <input type="text" placeholder="Disabled" class="input input-bordered w-full" disabled />
                <input type="text" placeholder="Error" class="input input-bordered input-error w-full" />
                <input type="text" placeholder="Success" class="input input-bordered input-success w-full" />
                <input type="text" placeholder="Warning" class="input input-bordered input-warning w-full" />
            </div>
        </ComponentShowcase>
    </div>

    <!-- Input Types -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Input Types" 
            description="Different input types for various data formats"
            code={typesCode}
        >
            <div class="space-y-4 w-full max-w-xs">
                <input type="text" placeholder="Text input" class="input input-bordered w-full" />
                <input type="email" placeholder="Email input" class="input input-bordered w-full" />
                <input type="password" placeholder="Password input" class="input input-bordered w-full" />
                <input type="number" placeholder="Number input" class="input input-bordered w-full" />
                <input type="search" placeholder="Search input" class="input input-bordered w-full" />
                <input type="url" placeholder="URL input" class="input input-bordered w-full" />
                <input type="tel" placeholder="Phone input" class="input input-bordered w-full" />
            </div>
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

    <!-- Accessibility -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
        <div class="prose prose-sm max-w-none">
            <ul class="space-y-2">
                <li>✅ Supports keyboard navigation and standard input interactions</li>
                <li>✅ Includes proper ARIA attributes and labels</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports form validation and error states</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Respects reduced motion preferences</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Search Input -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Search Input</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control">
                            <div class="input-group">
                                <input type="search" placeholder="Search..." class="input input-bordered flex-1" />
                                <button class="btn btn-square btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Input with Label -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Input with Label</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email address</span>
                            </label>
                            <input type="email" placeholder="Enter your email" class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                <span class="label-text-alt">We'll never share your email</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>