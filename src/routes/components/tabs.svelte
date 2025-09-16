<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Home, Settings, User, Bell, FileText, Star } from 'lucide-svelte';

    let activeTab = 0;
    let verticalActiveTab = 0;
    let iconActiveTab = 0;
    let contentActiveTab = 0;

    const installCommand = 'npx @nui/cli add tabs';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  let activeTab = 0;
<\/script>

<div class="tabs">
  <button 
    class="tab tab-lifted" 
    class:tab-active={activeTab === 0}
    on:click={() => activeTab = 0}
  >
    Tab 1
  </button>
  <button 
    class="tab tab-lifted" 
    class:tab-active={activeTab === 1}
    on:click={() => activeTab = 1}
  >
    Tab 2
  </button>
  <button 
    class="tab tab-lifted" 
    class:tab-active={activeTab === 2}
    on:click={() => activeTab = 2}
  >
    Tab 3
  </button>
</div>`;

    const variantsCode = `<!-- Bordered Tabs -->
<div class="tabs tabs-bordered">
  <button class="tab tab-active">Bordered</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>

<!-- Lifted Tabs -->
<div class="tabs tabs-lifted">
  <button class="tab tab-active">Lifted</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>

<!-- Boxed Tabs -->
<div class="tabs tabs-boxed">
  <button class="tab tab-active">Boxed</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>`;

    const sizesCode = `<!-- Extra Small -->
<div class="tabs tabs-xs">
  <button class="tab tab-active">XS</button>
  <button class="tab">Tab 2</button>
</div>

<!-- Small -->
<div class="tabs tabs-sm">
  <button class="tab tab-active">SM</button>
  <button class="tab">Tab 2</button>
</div>

<!-- Medium (Default) -->
<div class="tabs">
  <button class="tab tab-active">MD</button>
  <button class="tab">Tab 2</button>
</div>

<!-- Large -->
<div class="tabs tabs-lg">
  <button class="tab tab-active">LG</button>
  <button class="tab">Tab 2</button>
</div>`;

    const withIconsCode = `<script>
  import { Home, User, Settings } from 'lucide-svelte';
<\/script>

<div class="tabs tabs-lifted">
  <button class="tab tab-active">
    <Home class="w-4 h-4 mr-2" />
    Home
  </button>
  <button class="tab">
    <User class="w-4 h-4 mr-2" />
    Profile
  </button>
  <button class="tab">
    <Settings class="w-4 h-4 mr-2" />
    Settings
  </button>
</div>`;

    const verticalTabsCode = `<div class="flex">
  <div class="tabs tabs-lifted tabs-vertical">
    <button class="tab tab-active">Tab 1</button>
    <button class="tab">Tab 2</button>
    <button class="tab">Tab 3</button>
    <button class="tab">Tab 4</button>
  </div>
  <div class="flex-1 p-4">
    Content goes here
  </div>
</div>`;

    const tabPanelsCode = `<script>
  let activeTab = 0;
<\/script>

<div class="tabs tabs-lifted">
  <button 
    class="tab" 
    class:tab-active={activeTab === 0}
    on:click={() => activeTab = 0}
  >
    Dashboard
  </button>
  <button 
    class="tab" 
    class:tab-active={activeTab === 1}
    on:click={() => activeTab = 1}
  >
    Analytics
  </button>
  <button 
    class="tab" 
    class:tab-active={activeTab === 2}
    on:click={() => activeTab = 2}
  >
    Reports
  </button>
</div>

<div class="tab-content p-6 bg-base-100 border border-base-300 rounded-b-box">
  {#if activeTab === 0}
    <h3 class="text-lg font-semibold mb-2">Dashboard</h3>
    <p>Welcome to your dashboard overview.</p>
  {:else if activeTab === 1}
    <h3 class="text-lg font-semibold mb-2">Analytics</h3>
    <p>View your detailed analytics and metrics.</p>
  {:else if activeTab === 2}
    <h3 class="text-lg font-semibold mb-2">Reports</h3>
    <p>Generate and download your reports.</p>
  {/if}
</div>`;

    const apiProps = [
        {
            name: 'tabs-bordered',
            type: 'class',
            default: 'false',
            description: 'Adds border style to tabs'
        },
        {
            name: 'tabs-lifted',
            type: 'class',
            default: 'false',
            description: 'Adds lifted/elevated style to tabs'
        },
        {
            name: 'tabs-boxed',
            type: 'class',
            default: 'false',
            description: 'Adds boxed background style to tabs'
        },
        {
            name: 'tabs-xs',
            type: 'class',
            default: 'false',
            description: 'Extra small tab size'
        },
        {
            name: 'tabs-sm',
            type: 'class',
            default: 'false',
            description: 'Small tab size'
        },
        {
            name: 'tabs-lg',
            type: 'class',
            default: 'false',
            description: 'Large tab size'
        },
        {
            name: 'tab-active',
            type: 'class',
            default: 'false',
            description: 'Marks a tab as currently active'
        },
        {
            name: 'tab-disabled',
            type: 'class',
            default: 'false',
            description: 'Disables tab interaction'
        }
    ];
</script>

<svelte:head>
    <title>Tabs - NUI Components</title>
    <meta name="description" content="Tabs component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Tabs</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Tabs</h1>
                <p class="text-xl text-base-content/70">
                    Organize content into multiple panels with tab navigation. Supports various styles and orientations.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/tabs"
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
            description="Simple tab navigation with state management"
            code={basicUsage}
        >
            <div class="tabs">
                <button 
                    class="tab tab-lifted" 
                    class:tab-active={activeTab === 0}
                    on:click={() => activeTab = 0}
                >
                    Tab 1
                </button>
                <button 
                    class="tab tab-lifted" 
                    class:tab-active={activeTab === 1}
                    on:click={() => activeTab = 1}
                >
                    Tab 2
                </button>
                <button 
                    class="tab tab-lifted" 
                    class:tab-active={activeTab === 2}
                    on:click={() => activeTab = 2}
                >
                    Tab 3
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various design needs"
            code={variantsCode}
        >
            <div class="space-y-6">
                <!-- Bordered -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Bordered</p>
                    <div class="tabs tabs-bordered">
                        <button class="tab tab-active">Bordered</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
                
                <!-- Lifted -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Lifted</p>
                    <div class="tabs tabs-lifted">
                        <button class="tab tab-active">Lifted</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
                
                <!-- Boxed -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Boxed</p>
                    <div class="tabs tabs-boxed">
                        <button class="tab tab-active">Boxed</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different tab sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-6">
                <!-- Extra Small -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Extra Small</p>
                    <div class="tabs tabs-xs tabs-boxed">
                        <button class="tab tab-active">XS</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
                
                <!-- Small -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Small</p>
                    <div class="tabs tabs-sm tabs-boxed">
                        <button class="tab tab-active">SM</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
                
                <!-- Medium -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Medium (Default)</p>
                    <div class="tabs tabs-boxed">
                        <button class="tab tab-active">MD</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
                
                <!-- Large -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Large</p>
                    <div class="tabs tabs-lg tabs-boxed">
                        <button class="tab tab-active">LG</button>
                        <button class="tab">Tab 2</button>
                        <button class="tab">Tab 3</button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Tabs with Lucide icons for enhanced visual navigation"
            code={withIconsCode}
        >
            <div class="tabs tabs-lifted">
                <button 
                    class="tab" 
                    class:tab-active={iconActiveTab === 0}
                    on:click={() => iconActiveTab = 0}
                >
                    <Home class="w-4 h-4 mr-2" />
                    Home
                </button>
                <button 
                    class="tab" 
                    class:tab-active={iconActiveTab === 1}
                    on:click={() => iconActiveTab = 1}
                >
                    <User class="w-4 h-4 mr-2" />
                    Profile
                </button>
                <button 
                    class="tab" 
                    class:tab-active={iconActiveTab === 2}
                    on:click={() => iconActiveTab = 2}
                >
                    <Settings class="w-4 h-4 mr-2" />
                    Settings
                </button>
                <button 
                    class="tab" 
                    class:tab-active={iconActiveTab === 3}
                    on:click={() => iconActiveTab = 3}
                >
                    <Bell class="w-4 h-4 mr-2" />
                    Notifications
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Vertical Tabs -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Vertical Tabs" 
            description="Tabs arranged vertically for sidebar-style navigation"
            code={verticalTabsCode}
        >
            <div class="flex">
                <div class="tabs tabs-lifted flex-col">
                    <button 
                        class="tab" 
                        class:tab-active={verticalActiveTab === 0}
                        on:click={() => verticalActiveTab = 0}
                    >
                        <FileText class="w-4 h-4 mr-2" />
                        Documents
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={verticalActiveTab === 1}
                        on:click={() => verticalActiveTab = 1}
                    >
                        <Star class="w-4 h-4 mr-2" />
                        Favorites
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={verticalActiveTab === 2}
                        on:click={() => verticalActiveTab = 2}
                    >
                        <Settings class="w-4 h-4 mr-2" />
                        Settings
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={verticalActiveTab === 3}
                        on:click={() => verticalActiveTab = 3}
                    >
                        <User class="w-4 h-4 mr-2" />
                        Account
                    </button>
                </div>
                <div class="flex-1 p-6 bg-base-100 border border-base-300 rounded-r-box">
                    {#if verticalActiveTab === 0}
                        <h3 class="text-lg font-semibold mb-2">Documents</h3>
                        <p class="text-base-content/70">Manage your documents and files here.</p>
                    {:else if verticalActiveTab === 1}
                        <h3 class="text-lg font-semibold mb-2">Favorites</h3>
                        <p class="text-base-content/70">View your starred and favorite items.</p>
                    {:else if verticalActiveTab === 2}
                        <h3 class="text-lg font-semibold mb-2">Settings</h3>
                        <p class="text-base-content/70">Configure your application preferences.</p>
                    {:else if verticalActiveTab === 3}
                        <h3 class="text-lg font-semibold mb-2">Account</h3>
                        <p class="text-base-content/70">Manage your account settings and profile.</p>
                    {/if}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Tab Panels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Tab Panels with Content" 
            description="Complete tab implementation with content switching"
            code={tabPanelsCode}
        >
            <div>
                <div class="tabs tabs-lifted">
                    <button 
                        class="tab" 
                        class:tab-active={contentActiveTab === 0}
                        on:click={() => contentActiveTab = 0}
                    >
                        Dashboard
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={contentActiveTab === 1}
                        on:click={() => contentActiveTab = 1}
                    >
                        Analytics
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={contentActiveTab === 2}
                        on:click={() => contentActiveTab = 2}
                    >
                        Reports
                    </button>
                    <button 
                        class="tab" 
                        class:tab-active={contentActiveTab === 3}
                        on:click={() => contentActiveTab = 3}
                    >
                        Settings
                    </button>
                </div>

                <div class="tab-content p-6 bg-base-100 border border-base-300 rounded-b-box">
                    {#if contentActiveTab === 0}
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold">Dashboard Overview</h3>
                            <p class="text-base-content/70">Welcome to your main dashboard. Here you can see an overview of your account activity.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="stat bg-base-200 rounded-box">
                                    <div class="stat-title">Total Users</div>
                                    <div class="stat-value text-primary">25.6K</div>
                                    <div class="stat-desc">↗︎ 400 (22%)</div>
                                </div>
                                <div class="stat bg-base-200 rounded-box">
                                    <div class="stat-title">Page Views</div>
                                    <div class="stat-value text-secondary">2.6M</div>
                                    <div class="stat-desc">↗︎ 2100 (14%)</div>
                                </div>
                                <div class="stat bg-base-200 rounded-box">
                                    <div class="stat-title">Downloads</div>
                                    <div class="stat-value">1,040</div>
                                    <div class="stat-desc">↘︎ 90 (14%)</div>
                                </div>
                            </div>
                        </div>
                    {:else if contentActiveTab === 1}
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold">Analytics & Metrics</h3>
                            <p class="text-base-content/70">Detailed analytics and performance metrics for your application.</p>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center p-3 bg-base-200 rounded-box">
                                    <span>User Engagement</span>
                                    <div class="text-right">
                                        <div class="text-sm font-semibold">87%</div>
                                        <div class="text-xs text-base-content/70">+5% from last month</div>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-base-200 rounded-box">
                                    <span>Bounce Rate</span>
                                    <div class="text-right">
                                        <div class="text-sm font-semibold">23%</div>
                                        <div class="text-xs text-base-content/70">-3% from last month</div>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-base-200 rounded-box">
                                    <span>Session Duration</span>
                                    <div class="text-right">
                                        <div class="text-sm font-semibold">4m 32s</div>
                                        <div class="text-xs text-base-content/70">+12s from last month</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else if contentActiveTab === 2}
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold">Reports & Downloads</h3>
                            <p class="text-base-content/70">Generate and download comprehensive reports for your data.</p>
                            <div class="space-y-3">
                                <div class="card bg-base-200">
                                    <div class="card-body">
                                        <h4 class="card-title text-sm">Monthly Performance Report</h4>
                                        <p class="text-xs text-base-content/70">Comprehensive overview of this month's metrics</p>
                                        <div class="card-actions justify-end">
                                            <button class="btn btn-primary btn-sm">Download PDF</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card bg-base-200">
                                    <div class="card-body">
                                        <h4 class="card-title text-sm">User Analytics Report</h4>
                                        <p class="text-xs text-base-content/70">Detailed user behavior and engagement data</p>
                                        <div class="card-actions justify-end">
                                            <button class="btn btn-secondary btn-sm">Download CSV</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card bg-base-200">
                                    <div class="card-body">
                                        <h4 class="card-title text-sm">Financial Summary</h4>
                                        <p class="text-xs text-base-content/70">Revenue and financial performance overview</p>
                                        <div class="card-actions justify-end">
                                            <button class="btn btn-accent btn-sm">Download Excel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else if contentActiveTab === 3}
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold">Application Settings</h3>
                            <p class="text-base-content/70">Configure your application preferences and settings.</p>
                            <div class="space-y-4">
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">Enable notifications</span>
                                        <input type="checkbox" class="toggle toggle-primary" checked />
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">Auto-save drafts</span>
                                        <input type="checkbox" class="toggle toggle-secondary" checked />
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">Dark mode</span>
                                        <input type="checkbox" class="toggle toggle-accent" />
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Default language</span>
                                    </label>
                                    <select class="select select-bordered select-sm">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                    </select>
                                </div>
                                <div class="pt-4">
                                    <button class="btn btn-primary">Save Settings</button>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
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
                        <th>Class</th>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd>, <kbd class="kbd kbd-sm">Enter</kbd>, and <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles for tab navigation</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers using semantic tab structure</li>
                <li>✅ Supports high contrast mode with clear visual distinctions</li>
                <li>✅ Respects reduced motion preferences for transitions</li>
                <li>✅ Provides clear visual feedback for active and inactive states</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Settings Panel -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Settings Panel</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="tabs tabs-bordered">
                            <button class="tab tab-active">
                                <User class="w-4 h-4 mr-2" />
                                Account
                            </button>
                            <button class="tab">
                                <Bell class="w-4 h-4 mr-2" />
                                Notifications
                            </button>
                            <button class="tab">
                                <Settings class="w-4 h-4 mr-2" />
                                Preferences
                            </button>
                        </div>
                        <div class="pt-4">
                            <h4 class="font-semibold mb-2">Account Settings</h4>
                            <div class="space-y-3">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Display Name</span>
                                    </label>
                                    <input type="text" value="John Doe" class="input input-bordered input-sm" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input type="email" value="john@example.com" class="input input-bordered input-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Visualization -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Data Visualization Dashboard</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="tabs tabs-boxed">
                            <button class="tab tab-active">Overview</button>
                            <button class="tab">Sales</button>
                            <button class="tab">Traffic</button>
                            <button class="tab">Conversion</button>
                        </div>
                        <div class="pt-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="stat bg-primary text-primary-content rounded-box">
                                    <div class="stat-title text-primary-content/70">Revenue</div>
                                    <div class="stat-value">$89,400</div>
                                    <div class="stat-desc text-primary-content/70">↗︎ 15% increase</div>
                                </div>
                                <div class="stat bg-secondary text-secondary-content rounded-box">
                                    <div class="stat-title text-secondary-content/70">Orders</div>
                                    <div class="stat-value">12,345</div>
                                    <div class="stat-desc text-secondary-content/70">↗︎ 8% increase</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>