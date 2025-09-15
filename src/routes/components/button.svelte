<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Copy } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add button';

    const basicUsage = `<script>
  import { Button } from '@nui/core';
<\/script>

<Button>Click me</Button>`;

    const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="outline">Outline</Button>`;

    const sizesCode = `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

    const statesCode = `<Button>Normal</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`;

    const withIconsCode = `<script>
  import { Plus, Download, ArrowRight } from 'lucide-svelte';
<\/script>

<Button>
  <Plus class="w-4 h-4 mr-2" />
  Add Item
</Button>

<Button variant="outline">
  Download
  <Download class="w-4 h-4 ml-2" />
</Button>

<Button variant="ghost">
  Continue
  <ArrowRight class="w-4 h-4 ml-2" />
</Button>`;

    const apiProps = [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline'",
            default: "'primary'",
            description: 'Visual style variant of the button'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the button'
        },
        {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Shows loading spinner and disables the button'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the button interaction'
        },
        {
            name: 'wide',
            type: 'boolean',
            default: 'false',
            description: 'Makes the button wider'
        },
        {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Makes the button full width'
        },
        {
            name: 'circle',
            type: 'boolean',
            default: 'false',
            description: 'Makes the button circular'
        },
        {
            name: 'square',
            type: 'boolean',
            default: 'false',
            description: 'Makes the button square'
        }
    ];
</script>

<svelte:head>
    <title>Button - NUI Components</title>
    <meta name="description" content="Button component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Button</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Button</h1>
                <p class="text-xl text-base-content/70">
                    Clickable button component with multiple variants, sizes, and states.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/button"
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
            description="Simple button with default styling"
            code={basicUsage}
        >
            <button class="btn btn-primary">Click me</button>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various use cases"
            code={variantsCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-primary">Primary</button>
                <button class="btn btn-secondary">Secondary</button>
                <button class="btn btn-accent">Accent</button>
                <button class="btn btn-ghost">Ghost</button>
                <button class="btn btn-link">Link</button>
                <button class="btn btn-outline">Outline</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different button sizes from extra small to large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <button class="btn btn-primary btn-xs">Extra Small</button>
                <button class="btn btn-primary btn-sm">Small</button>
                <button class="btn btn-primary btn-md">Medium</button>
                <button class="btn btn-primary btn-lg">Large</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Button states including loading and disabled"
            code={statesCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-primary">Normal</button>
                <button class="btn btn-primary">
                    <span class="loading loading-spinner loading-sm"></span>
                    Loading
                </button>
                <button class="btn btn-primary" disabled>Disabled</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Buttons with Lucide icons for enhanced visual appeal"
            code={withIconsCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-primary">
                    <Copy class="w-4 h-4 mr-2" />
                    Copy
                </button>
                <button class="btn btn-outline">
                    Download
                    <Github class="w-4 h-4 ml-2" />
                </button>
                <button class="btn btn-ghost">
                    Continue
                    <ArrowLeft class="w-4 h-4 ml-2" />
                </button>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Enter</kbd> and <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Form Submit -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Submit Button</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control space-y-4">
                            <input type="text" placeholder="Enter your email" class="input input-bordered" />
                            <button class="btn btn-primary">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Action Button Group</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Confirm Action</h4>
                        <p>Are you sure you want to delete this item?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-ghost">Cancel</button>
                            <button class="btn btn-error">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>