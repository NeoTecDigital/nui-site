<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Star, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add badge';

    const basicUsage = `<script>
  import { Badge } from '@nui/core';
<\/script>

<span class="badge">Default</span>`;

    const variantsCode = `<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-ghost">Ghost</span>
<span class="badge badge-outline">Outline</span>`;

    const sizesCode = `<span class="badge badge-xs">Extra Small</span>
<span class="badge badge-sm">Small</span>
<span class="badge badge-md">Medium</span>
<span class="badge badge-lg">Large</span>`;

    const colorsCode = `<span class="badge badge-neutral">Neutral</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>`;

    const withDotsCode = `<span class="badge">
  <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
    <circle cx="4" cy="4" r="3"/>
  </svg>
  Online
</span>
<span class="badge badge-success">
  <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
    <circle cx="4" cy="4" r="3"/>
  </svg>
  Active
</span>
<span class="badge badge-warning">
  <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
    <circle cx="4" cy="4" r="3"/>
  </svg>
  Pending
</span>`;

    const withIconsCode = `<script>
  import { Star, AlertCircle, CheckCircle, XCircle } from 'lucide-svelte';
<\/script>

<span class="badge badge-primary">
  <Star class="w-3 h-3 mr-1" />
  Featured
</span>
<span class="badge badge-success">
  <CheckCircle class="w-3 h-3 mr-1" />
  Verified
</span>
<span class="badge badge-warning">
  <AlertCircle class="w-3 h-3 mr-1" />
  Warning
</span>
<span class="badge badge-error">
  <XCircle class="w-3 h-3 mr-1" />
  Error
</span>`;

    const onButtonsCode = `<button class="btn btn-primary">
  Messages
  <span class="badge badge-neutral ml-2">4</span>
</button>
<button class="btn btn-outline">
  Notifications
  <span class="badge badge-accent ml-2">12</span>
</button>
<button class="btn btn-ghost">
  Cart
  <span class="badge badge-success ml-2">2</span>
</button>`;

    const apiProps = [
        {
            name: 'variant',
            type: "'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'",
            default: "'default'",
            description: 'Visual style variant of the badge'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the badge'
        },
        {
            name: 'color',
            type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
            default: "'neutral'",
            description: 'Color scheme of the badge'
        },
        {
            name: 'dot',
            type: 'boolean',
            default: 'false',
            description: 'Shows a small dot indicator'
        },
        {
            name: 'outline',
            type: 'boolean',
            default: 'false',
            description: 'Shows outline style badge'
        }
    ];
</script>

<svelte:head>
    <title>Badge - NUI Components</title>
    <meta name="description" content="Badge component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Badge</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Badge</h1>
                <p class="text-xl text-base-content/70">
                    Small status descriptors for UI elements with support for colors, sizes, and indicators.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/badge"
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
            description="Simple badge with default styling"
            code={basicUsage}
        >
            <span class="badge">Default</span>
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
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-secondary">Secondary</span>
                <span class="badge badge-accent">Accent</span>
                <span class="badge badge-ghost">Ghost</span>
                <span class="badge badge-outline">Outline</span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different badge sizes from extra small to large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <span class="badge badge-primary badge-xs">Extra Small</span>
                <span class="badge badge-primary badge-sm">Small</span>
                <span class="badge badge-primary badge-md">Medium</span>
                <span class="badge badge-primary badge-lg">Large</span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Colors -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Colors" 
            description="Various color schemes for different meanings and contexts"
            code={colorsCode}
        >
            <div class="flex flex-wrap gap-4">
                <span class="badge badge-neutral">Neutral</span>
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-secondary">Secondary</span>
                <span class="badge badge-accent">Accent</span>
                <span class="badge badge-info">Info</span>
                <span class="badge badge-success">Success</span>
                <span class="badge badge-warning">Warning</span>
                <span class="badge badge-error">Error</span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Dots -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Indicators" 
            description="Badges with dot indicators for status representation"
            code={withDotsCode}
        >
            <div class="flex flex-wrap gap-4">
                <span class="badge">
                    <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                    </svg>
                    Online
                </span>
                <span class="badge badge-success">
                    <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                    </svg>
                    Active
                </span>
                <span class="badge badge-warning">
                    <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                    </svg>
                    Pending
                </span>
                <span class="badge badge-error">
                    <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                    </svg>
                    Offline
                </span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Badges with Lucide icons for enhanced visual communication"
            code={withIconsCode}
        >
            <div class="flex flex-wrap gap-4">
                <span class="badge badge-primary">
                    <Star class="w-3 h-3 mr-1" />
                    Featured
                </span>
                <span class="badge badge-success">
                    <CheckCircle class="w-3 h-3 mr-1" />
                    Verified
                </span>
                <span class="badge badge-warning">
                    <AlertCircle class="w-3 h-3 mr-1" />
                    Warning
                </span>
                <span class="badge badge-error">
                    <XCircle class="w-3 h-3 mr-1" />
                    Error
                </span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- On Buttons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="On Buttons and Components" 
            description="Badges used with buttons and other components for counts and status"
            code={onButtonsCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-primary">
                    Messages
                    <span class="badge badge-neutral ml-2">4</span>
                </button>
                <button class="btn btn-outline">
                    Notifications
                    <span class="badge badge-accent ml-2">12</span>
                </button>
                <button class="btn btn-ghost">
                    Cart
                    <span class="badge badge-success ml-2">2</span>
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
                <li>✅ Uses semantic HTML with appropriate ARIA labels when needed</li>
                <li>✅ Color information is supplemented with text or icons</li>
                <li>✅ Maintains sufficient color contrast ratios</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Text content is readable and descriptive</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Status Indicators -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Status Indicators</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-semibold">User Account</h4>
                                <p class="text-sm text-base-content/70">john.doe@example.com</p>
                            </div>
                            <div class="flex gap-2">
                                <span class="badge badge-success">
                                    <CheckCircle class="w-3 h-3 mr-1" />
                                    Verified
                                </span>
                                <span class="badge badge-info">Pro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notification Badges -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Navigation with Badges</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-center">
                            <div class="btm-nav btm-nav-xs max-w-md">
                                <button class="text-primary">
                                    <Info class="w-5 h-5" />
                                    <span class="btm-nav-label">Home</span>
                                </button>
                                <button class="relative">
                                    <Info class="w-5 h-5" />
                                    <span class="btm-nav-label">Messages</span>
                                    <span class="badge badge-error badge-xs absolute -top-1 -right-1">3</span>
                                </button>
                                <button class="relative">
                                    <Info class="w-5 h-5" />
                                    <span class="btm-nav-label">Notifications</span>
                                    <span class="badge badge-warning badge-xs absolute -top-1 -right-1">9+</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Categories -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Product Categories</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">MacBook Pro</h4>
                        <p class="text-sm text-base-content/70 mb-4">Apple M3 chip with 8-core CPU and 10-core GPU</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="badge badge-primary">Electronics</span>
                            <span class="badge badge-secondary">Computers</span>
                            <span class="badge badge-accent">Apple</span>
                            <span class="badge badge-success">In Stock</span>
                            <span class="badge badge-warning">
                                <Star class="w-3 h-3 mr-1" />
                                Featured
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>