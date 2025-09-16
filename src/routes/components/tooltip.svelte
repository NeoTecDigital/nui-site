<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Info, HelpCircle, User, Settings, Heart, ShoppingCart, Download, Eye, Lock, Clock, AlertTriangle } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add tooltip';

    const basicUsage = `<div class="tooltip" data-tip="This is a tooltip">
  <button class="btn">Hover me</button>
</div>`;

    const positionsCode = `<div class="tooltip tooltip-top" data-tip="Top tooltip">
  <button class="btn">Top</button>
</div>
<div class="tooltip tooltip-bottom" data-tip="Bottom tooltip">
  <button class="btn">Bottom</button>
</div>
<div class="tooltip tooltip-left" data-tip="Left tooltip">
  <button class="btn">Left</button>
</div>
<div class="tooltip tooltip-right" data-tip="Right tooltip">
  <button class="btn">Right</button>
</div>`;

    const colorsCode = `<div class="tooltip tooltip-primary" data-tip="Primary tooltip">
  <button class="btn btn-primary">Primary</button>
</div>
<div class="tooltip tooltip-secondary" data-tip="Secondary tooltip">
  <button class="btn btn-secondary">Secondary</button>
</div>
<div class="tooltip tooltip-accent" data-tip="Accent tooltip">
  <button class="btn btn-accent">Accent</button>
</div>
<div class="tooltip tooltip-info" data-tip="Info tooltip">
  <button class="btn btn-info">Info</button>
</div>
<div class="tooltip tooltip-success" data-tip="Success tooltip">
  <button class="btn btn-success">Success</button>
</div>
<div class="tooltip tooltip-warning" data-tip="Warning tooltip">
  <button class="btn btn-warning">Warning</button>
</div>
<div class="tooltip tooltip-error" data-tip="Error tooltip">
  <button class="btn btn-error">Error</button>
</div>`;

    const richContentCode = `<div class="tooltip" data-tip="💡 This is a helpful tip with an emoji!">
  <button class="btn btn-outline">
    <HelpCircle class="w-4 h-4" />
    Help
  </button>
</div>

<div class="tooltip tooltip-right" data-tip="User: John Doe&#10;Email: john@example.com&#10;Status: Active">
  <div class="avatar">
    <div class="w-10 rounded-full bg-primary/20 flex items-center justify-center">
      <User class="w-5 h-5" />
    </div>
  </div>
</div>`;

    const triggersCode = `<!-- Hover trigger (default) -->
<div class="tooltip" data-tip="Appears on hover">
  <button class="btn">Hover me</button>
</div>

<!-- Focus trigger -->
<div class="tooltip" data-tip="Appears on focus">
  <input type="text" placeholder="Focus me" class="input input-bordered" />
</div>

<!-- Always visible -->
<div class="tooltip tooltip-open" data-tip="Always visible">
  <button class="btn btn-ghost">Always visible</button>
</div>`;

    const delayCode = `<!-- Custom delay using CSS -->
<style>
  .tooltip-slow:before {
    transition-delay: 800ms;
  }
  .tooltip-fast:before {
    transition-delay: 100ms;
  }
</style>

<div class="tooltip tooltip-slow" data-tip="Slow tooltip (800ms delay)">
  <button class="btn">Slow</button>
</div>
<div class="tooltip tooltip-fast" data-tip="Fast tooltip (100ms delay)">
  <button class="btn">Fast</button>
</div>`;

    const responsiveCode = `<!-- Responsive positioning -->
<div class="tooltip tooltip-bottom sm:tooltip-right" data-tip="Bottom on mobile, right on desktop">
  <button class="btn">Responsive</button>
</div>

<!-- Hide on mobile -->
<div class="tooltip hidden sm:block" data-tip="Only visible on larger screens">
  <button class="btn">Desktop only</button>
</div>`;

    const iconButtonsCode = `<script>
  import { Heart, ShoppingCart, Download, Eye, Lock } from 'lucide-svelte';
<\/script>

<div class="tooltip tooltip-bottom" data-tip="Add to favorites">
  <button class="btn btn-circle btn-outline">
    <Heart class="w-5 h-5" />
  </button>
</div>

<div class="tooltip tooltip-bottom" data-tip="Add to cart">
  <button class="btn btn-circle btn-primary">
    <ShoppingCart class="w-5 h-5" />
  </button>
</div>

<div class="tooltip tooltip-bottom" data-tip="Download file">
  <button class="btn btn-circle btn-success">
    <Download class="w-5 h-5" />
  </button>
</div>

<div class="tooltip tooltip-bottom" data-tip="Preview item">
  <button class="btn btn-circle btn-info">
    <Eye class="w-5 h-5" />
  </button>
</div>`;

    const formHelpCode = `<div class="form-control">
  <label class="label">
    <span class="label-text flex items-center gap-2">
      Password
      <div class="tooltip tooltip-right" data-tip="Password must be at least 8 characters with uppercase, lowercase, and numbers">
        <HelpCircle class="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help" />
      </div>
    </span>
  </label>
  <input type="password" placeholder="Enter password" class="input input-bordered" />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text flex items-center gap-2">
      API Key
      <div class="tooltip tooltip-right" data-tip="Your API key is used to authenticate requests. Keep it secret!">
        <Lock class="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help" />
      </div>
    </span>
  </label>
  <input type="text" placeholder="Enter API key" class="input input-bordered" />
</div>`;

    // Component state
    let showDelayExample = false;

    const apiProps = [
        {
            name: 'data-tip',
            type: 'string',
            default: '""',
            description: 'The text content displayed in the tooltip'
        },
        {
            name: 'position',
            type: "'top' | 'bottom' | 'left' | 'right'",
            default: "'top'",
            description: 'Position of the tooltip relative to the element'
        },
        {
            name: 'color',
            type: "'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
            default: 'undefined',
            description: 'Color theme of the tooltip'
        },
        {
            name: 'open',
            type: 'boolean',
            default: 'false',
            description: 'When true, tooltip is always visible (tooltip-open class)'
        },
        {
            name: 'responsive',
            type: 'boolean',
            default: 'false',
            description: 'Enable responsive positioning with breakpoint classes'
        }
    ];

    const tooltipClasses = [
        {
            class: 'tooltip',
            description: 'Base tooltip class'
        },
        {
            class: 'tooltip-top',
            description: 'Position tooltip above the element'
        },
        {
            class: 'tooltip-bottom',
            description: 'Position tooltip below the element'
        },
        {
            class: 'tooltip-left',
            description: 'Position tooltip to the left of the element'
        },
        {
            class: 'tooltip-right',
            description: 'Position tooltip to the right of the element'
        },
        {
            class: 'tooltip-open',
            description: 'Keep tooltip always visible'
        },
        {
            class: 'tooltip-primary',
            description: 'Primary color theme'
        },
        {
            class: 'tooltip-secondary',
            description: 'Secondary color theme'
        },
        {
            class: 'tooltip-accent',
            description: 'Accent color theme'
        },
        {
            class: 'tooltip-info',
            description: 'Info color theme'
        },
        {
            class: 'tooltip-success',
            description: 'Success color theme'
        },
        {
            class: 'tooltip-warning',
            description: 'Warning color theme'
        },
        {
            class: 'tooltip-error',
            description: 'Error color theme'
        }
    ];
</script>

<svelte:head>
    <title>Tooltip - NUI Components</title>
    <meta name="description" content="Tooltip component documentation and examples for NUI - Display helpful information on hover with customizable positioning and styling." />
</svelte:head>

<style>
    .tooltip-slow:before {
        transition-delay: 800ms;
    }
    .tooltip-fast:before {
        transition-delay: 100ms;
    }
</style>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Tooltip</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Tooltip</h1>
                <p class="text-xl text-base-content/70">
                    Display helpful information on hover with customizable positioning, colors, and content.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/tooltip"
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
            description="Simple tooltip that appears on hover using the data-tip attribute"
            code={basicUsage}
        >
            <div class="tooltip" data-tip="This is a tooltip">
                <button class="btn">Hover me</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Positions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Positions" 
            description="Tooltips can be positioned in four directions around the target element"
            code={positionsCode}
        >
            <div class="grid grid-cols-2 gap-4 place-items-center w-full max-w-md mx-auto">
                <div class="tooltip tooltip-top" data-tip="Top tooltip">
                    <button class="btn">Top</button>
                </div>
                <div class="tooltip tooltip-right" data-tip="Right tooltip">
                    <button class="btn">Right</button>
                </div>
                <div class="tooltip tooltip-left" data-tip="Left tooltip">
                    <button class="btn">Left</button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Bottom tooltip">
                    <button class="btn">Bottom</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Colors -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Colors" 
            description="Different color themes to match your design system and provide semantic meaning"
            code={colorsCode}
        >
            <div class="flex flex-wrap gap-3 justify-center">
                <div class="tooltip tooltip-primary" data-tip="Primary tooltip">
                    <button class="btn btn-primary btn-sm">Primary</button>
                </div>
                <div class="tooltip tooltip-secondary" data-tip="Secondary tooltip">
                    <button class="btn btn-secondary btn-sm">Secondary</button>
                </div>
                <div class="tooltip tooltip-accent" data-tip="Accent tooltip">
                    <button class="btn btn-accent btn-sm">Accent</button>
                </div>
                <div class="tooltip tooltip-info" data-tip="Info tooltip">
                    <button class="btn btn-info btn-sm">Info</button>
                </div>
                <div class="tooltip tooltip-success" data-tip="Success tooltip">
                    <button class="btn btn-success btn-sm">Success</button>
                </div>
                <div class="tooltip tooltip-warning" data-tip="Warning tooltip">
                    <button class="btn btn-warning btn-sm">Warning</button>
                </div>
                <div class="tooltip tooltip-error" data-tip="Error tooltip">
                    <button class="btn btn-error btn-sm">Error</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Rich Content -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Rich Content" 
            description="Tooltips can contain emojis, line breaks, and more complex text content"
            code={richContentCode}
        >
            <div class="flex flex-wrap gap-6 justify-center items-center">
                <div class="tooltip" data-tip="💡 This is a helpful tip with an emoji!">
                    <button class="btn btn-outline">
                        <HelpCircle class="w-4 h-4 mr-2" />
                        Help
                    </button>
                </div>

                <div class="tooltip tooltip-right" data-tip="User: John Doe&#10;Email: john@example.com&#10;Status: Active">
                    <div class="avatar">
                        <div class="w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <User class="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div class="tooltip tooltip-bottom" data-tip="🔒 This feature requires authentication">
                    <button class="btn btn-outline" disabled>
                        <Lock class="w-4 h-4 mr-2" />
                        Protected
                    </button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Triggers -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Trigger Methods" 
            description="Different ways to show tooltips: hover, focus, or always visible"
            code={triggersCode}
        >
            <div class="flex flex-wrap gap-6 justify-center items-center">
                <div class="tooltip" data-tip="Appears on hover">
                    <button class="btn">Hover me</button>
                </div>

                <div class="tooltip" data-tip="Appears on focus">
                    <input type="text" placeholder="Focus me" class="input input-bordered w-32" />
                </div>

                <div class="tooltip tooltip-open" data-tip="Always visible">
                    <button class="btn btn-ghost">Always visible</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Delay -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Timing" 
            description="Control tooltip appearance timing with CSS transition delays"
            code={delayCode}
        >
            <div class="flex flex-wrap gap-4 justify-center">
                <div class="tooltip tooltip-slow" data-tip="Slow tooltip (800ms delay)">
                    <button class="btn">Slow</button>
                </div>
                <div class="tooltip" data-tip="Normal tooltip (default timing)">
                    <button class="btn">Normal</button>
                </div>
                <div class="tooltip tooltip-fast" data-tip="Fast tooltip (100ms delay)">
                    <button class="btn">Fast</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Responsive -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Responsive Design" 
            description="Responsive positioning and visibility for different screen sizes"
            code={responsiveCode}
        >
            <div class="flex flex-wrap gap-4 justify-center">
                <div class="tooltip tooltip-bottom sm:tooltip-right" data-tip="Bottom on mobile, right on desktop">
                    <button class="btn">Responsive</button>
                </div>

                <div class="tooltip hidden sm:flex" data-tip="Only visible on larger screens">
                    <button class="btn btn-outline">Desktop only</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- API Reference -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">API Reference</h2>
        
        <div class="overflow-x-auto mb-8">
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

        <h3 class="text-lg font-semibold mb-4">CSS Classes</h3>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each tooltipClasses as item}
                        <tr>
                            <td>
                                <code class="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                                    {item.class}
                                </code>
                            </td>
                            <td class="text-sm">
                                {item.description}
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
                <li>✅ Tooltips are announced by screen readers as supplementary information</li>
                <li>✅ Content is accessible via keyboard focus for interactive elements</li>
                <li>✅ Maintains proper color contrast ratios for all color variants</li>
                <li>✅ Tooltips don't block interaction with underlying content</li>
                <li>✅ Content is discoverable without requiring hover interaction</li>
                <li>✅ Respects reduced motion preferences for animations</li>
                <li>✅ Uses semantic HTML attributes where appropriate</li>
                <li>⚠️ Avoid placing critical information only in tooltips</li>
                <li>⚠️ Ensure tooltip content is brief and descriptive</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Icon Button Tooltips -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Icon Button Tooltips</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">Provide context for icon-only buttons</p>
                        <div class="flex gap-3 justify-center">
                            <div class="tooltip tooltip-bottom" data-tip="Add to favorites">
                                <button class="btn btn-circle btn-outline">
                                    <Heart class="w-5 h-5" />
                                </button>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Add to cart">
                                <button class="btn btn-circle btn-primary">
                                    <ShoppingCart class="w-5 h-5" />
                                </button>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Download file">
                                <button class="btn btn-circle btn-success">
                                    <Download class="w-5 h-5" />
                                </button>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Preview item">
                                <button class="btn btn-circle btn-info">
                                    <Eye class="w-5 h-5" />
                                </button>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Settings">
                                <button class="btn btn-circle btn-ghost">
                                    <Settings class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Field Help -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Field Help</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body space-y-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text flex items-center gap-2">
                                    Password
                                    <div class="tooltip tooltip-right" data-tip="Password must be at least 8 characters with uppercase, lowercase, and numbers">
                                        <HelpCircle class="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help" />
                                    </div>
                                </span>
                            </label>
                            <input type="password" placeholder="Enter password" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text flex items-center gap-2">
                                    API Key
                                    <div class="tooltip tooltip-right" data-tip="Your API key is used to authenticate requests. Keep it secret!">
                                        <Lock class="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help" />
                                    </div>
                                </span>
                            </label>
                            <input type="text" placeholder="Enter API key" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text flex items-center gap-2">
                                    Timeout (seconds)
                                    <div class="tooltip tooltip-right" data-tip="Request timeout in seconds. Higher values allow for slower networks but may delay error detection.">
                                        <Clock class="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help" />
                                    </div>
                                </span>
                            </label>
                            <input type="number" value="30" class="input input-bordered" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Indicators -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Status Indicators</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="font-semibold">Database Connection</h4>
                                    <p class="text-sm text-base-content/70">Primary database server</p>
                                </div>
                                <div class="tooltip tooltip-left tooltip-success" data-tip="Connection established ✓&#10;Last checked: 2 minutes ago">
                                    <div class="badge badge-success gap-2">
                                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        Online
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="font-semibold">API Service</h4>
                                    <p class="text-sm text-base-content/70">External API endpoint</p>
                                </div>
                                <div class="tooltip tooltip-left tooltip-warning" data-tip="High response times detected ⚠️&#10;Average: 2.1s (should be < 1s)">
                                    <div class="badge badge-warning gap-2">
                                        <AlertTriangle class="w-3 h-3" />
                                        Slow
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="font-semibold">Cache Server</h4>
                                    <p class="text-sm text-base-content/70">Redis cache instance</p>
                                </div>
                                <div class="tooltip tooltip-left tooltip-error" data-tip="Connection failed ✗&#10;Last attempt: 30 seconds ago&#10;Retry in: 1 minute">
                                    <div class="badge badge-error gap-2">
                                        <div class="w-2 h-2 bg-white rounded-full"></div>
                                        Offline
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Elements -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Interactive Dashboard</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="tooltip tooltip-bottom" data-tip="Total users registered this month">
                                <div class="stat bg-primary/10 rounded-lg p-4 cursor-help">
                                    <div class="stat-title text-xs">Users</div>
                                    <div class="stat-value text-lg">1,243</div>
                                    <div class="stat-desc">+12% from last month</div>
                                </div>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Revenue generated this quarter">
                                <div class="stat bg-success/10 rounded-lg p-4 cursor-help">
                                    <div class="stat-title text-xs">Revenue</div>
                                    <div class="stat-value text-lg">$12.4K</div>
                                    <div class="stat-desc">+8% from last quarter</div>
                                </div>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Active sessions in the last 24 hours">
                                <div class="stat bg-info/10 rounded-lg p-4 cursor-help">
                                    <div class="stat-title text-xs">Sessions</div>
                                    <div class="stat-value text-lg">432</div>
                                    <div class="stat-desc">+5% from yesterday</div>
                                </div>
                            </div>

                            <div class="tooltip tooltip-bottom" data-tip="Server uptime percentage this week">
                                <div class="stat bg-warning/10 rounded-lg p-4 cursor-help">
                                    <div class="stat-title text-xs">Uptime</div>
                                    <div class="stat-value text-lg">99.2%</div>
                                    <div class="stat-desc">-0.3% from last week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>