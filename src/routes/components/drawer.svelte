<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Menu, X, Settings, User, Bell, Search, Home, ShoppingCart, Navigation } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add drawer';

    const basicUsage = `<script>
  import { Drawer } from '@nui/core';
<\/script>

<!-- Toggle button -->
<label for="my-drawer" class="btn btn-primary drawer-button">Open Drawer</label>

<!-- Drawer -->
<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">This is the main content area.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-80 bg-base-200 text-base-content">
      <div class="p-4">
        <h2 class="text-lg font-bold">Sidebar Content</h2>
        <p>This is the drawer content.</p>
      </div>
    </aside>
  </div>
</div>`;

    const navigationDrawerCode = `<div class="drawer lg:drawer-open">
  <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="nav-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">NUI App</a>
      </div>
    </div>
    <!-- Page content -->
    <div class="p-6 flex-1">
      <h1 class="text-2xl font-bold mb-4">Main Content</h1>
      <p>Your page content goes here.</p>
    </div>
  </div>
  <div class="drawer-side">
    <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-64 bg-base-200 text-base-content">
      <ul class="menu p-4">
        <li><a><Home class="w-5 h-5" />Home</a></li>
        <li><a><User class="w-5 h-5" />Profile</a></li>
        <li><a><Settings class="w-5 h-5" />Settings</a></li>
        <li><a><Bell class="w-5 h-5" />Notifications</a></li>
      </ul>
    </aside>
  </div>
</div>`;

    const mobileDrawerCode = `<div class="drawer drawer-mobile">
  <input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Mobile header -->
    <div class="navbar bg-base-100 shadow-lg lg:hidden">
      <div class="flex-none">
        <label for="mobile-drawer" class="btn btn-square btn-ghost">
          <Menu class="w-6 h-6" />
        </label>
      </div>
      <div class="flex-1">
        <h1 class="text-xl font-bold">Mobile App</h1>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <Search class="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Card 1</h2>
            <p>Mobile-optimized content.</p>
          </div>
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Card 2</h2>
            <p>Responsive layout example.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="drawer-side">
    <label for="mobile-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-80 bg-base-200">
      <!-- Close button for mobile -->
      <div class="flex justify-between items-center p-4 lg:hidden">
        <h2 class="text-xl font-bold">Menu</h2>
        <label for="mobile-drawer" class="btn btn-square btn-sm btn-ghost">
          <X class="w-5 h-5" />
        </label>
      </div>
      
      <!-- Menu content -->
      <ul class="menu p-4 space-y-2">
        <li><a class="rounded-lg"><Home class="w-5 h-5" />Dashboard</a></li>
        <li><a class="rounded-lg"><ShoppingCart class="w-5 h-5" />Orders</a></li>
        <li><a class="rounded-lg"><User class="w-5 h-5" />Customers</a></li>
        <li><a class="rounded-lg"><Bell class="w-5 h-5" />Notifications</a></li>
        <li><a class="rounded-lg"><Settings class="w-5 h-5" />Settings</a></li>
      </ul>
    </aside>
  </div>
</div>`;

    const rightDrawerCode = `<div class="drawer drawer-end">
  <input id="right-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content -->
    <div class="min-h-screen bg-base-100 p-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Right Side Drawer</h1>
        <p class="mb-6">Click the button to open the drawer from the right side.</p>
        <label for="right-drawer" class="btn btn-primary">
          Open Right Drawer
        </label>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="right-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-80 bg-base-200 text-base-content">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Settings Panel</h2>
          <label for="right-drawer" class="btn btn-square btn-sm btn-ghost">
            <X class="w-5 h-5" />
          </label>
        </div>
        
        <div class="space-y-4">
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Dark mode</span>
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Notifications</span>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Auto-save</span>
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>
      </div>
    </aside>
  </div>
</div>`;

    const persistentDrawerCode = `<div class="drawer lg:drawer-open">
  <input id="persistent-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Always visible content when drawer is open -->
    <div class="min-h-screen">
      <!-- Header bar -->
      <div class="navbar bg-base-300 lg:hidden">
        <div class="flex-none">
          <label for="persistent-drawer" class="btn btn-square btn-ghost">
            <Menu class="w-6 h-6" />
          </label>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold">Dashboard</h1>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="p-6">
        <div class="mb-6">
          <h1 class="text-3xl font-bold mb-2">Persistent Drawer</h1>
          <p class="text-base-content/70">
            This drawer stays open on larger screens and slides in on mobile.
          </p>
        </div>
        
        <div class="stats shadow w-full">
          <div class="stat">
            <div class="stat-title">Total Users</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
          <div class="stat">
            <div class="stat-title">Page Views</div>
            <div class="stat-value">2.6M</div>
            <div class="stat-desc">5% more than last month</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="persistent-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-64 bg-base-200">
      <div class="p-4">
        <div class="mb-6">
          <h2 class="text-xl font-bold">Navigation</h2>
        </div>
        <ul class="menu space-y-2">
          <li><a class="rounded-lg bg-primary text-primary-content"><Home class="w-5 h-5" />Dashboard</a></li>
          <li><a class="rounded-lg"><User class="w-5 h-5" />Users</a></li>
          <li><a class="rounded-lg"><ShoppingCart class="w-5 h-5" />Orders</a></li>
          <li><a class="rounded-lg"><Bell class="w-5 h-5" />Notifications</a></li>
          <li><a class="rounded-lg"><Settings class="w-5 h-5" />Settings</a></li>
        </ul>
      </div>
    </aside>
  </div>
</div>`;

    const nestedDrawerCode = `<div class="drawer">
  <input id="main-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="min-h-screen p-6">
      <h1 class="text-2xl font-bold mb-4">Nested Drawer Example</h1>
      <label for="main-drawer" class="btn btn-primary mb-4">
        Open Main Drawer
      </label>
      <p>This demonstrates nested drawer functionality.</p>
    </div>
  </div>
  <div class="drawer-side">
    <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-80 bg-base-200">
      <div class="p-4">
        <h2 class="text-lg font-bold mb-4">Main Drawer</h2>
        
        <!-- Nested drawer toggle -->
        <label for="nested-drawer" class="btn btn-secondary btn-block mb-4">
          Open Sub Menu
        </label>
        
        <ul class="menu">
          <li><a><Home class="w-5 h-5" />Home</a></li>
          <li><a><User class="w-5 h-5" />Profile</a></li>
          <li><a><Settings class="w-5 h-5" />Settings</a></li>
        </ul>
      </div>
    </aside>
  </div>
</div>

<!-- Nested drawer -->
<div class="drawer drawer-end z-20">
  <input id="nested-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Content handled by main drawer -->
  </div>
  <div class="drawer-side">
    <label for="nested-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <aside class="min-h-full w-64 bg-base-300">
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Sub Menu</h3>
          <label for="nested-drawer" class="btn btn-square btn-sm btn-ghost">
            <X class="w-4 h-4" />
          </label>
        </div>
        <ul class="menu">
          <li><a>Sub Item 1</a></li>
          <li><a>Sub Item 2</a></li>
          <li><a>Sub Item 3</a></li>
        </ul>
      </div>
    </aside>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'drawer',
            type: 'string',
            default: "'drawer'",
            description: 'Main container class for the drawer component'
        },
        {
            name: 'drawer-toggle',
            type: 'string',
            default: "'drawer-toggle'",
            description: 'Hidden checkbox input that controls drawer state'
        },
        {
            name: 'drawer-content',
            type: 'string',
            default: "'drawer-content'",
            description: 'Container for main page content'
        },
        {
            name: 'drawer-side',
            type: 'string',
            default: "'drawer-side'",
            description: 'Container for drawer sidebar content'
        },
        {
            name: 'drawer-overlay',
            type: 'string',
            default: "'drawer-overlay'",
            description: 'Overlay that closes drawer when clicked'
        },
        {
            name: 'drawer-open',
            type: 'modifier',
            default: 'false',
            description: 'Keeps drawer open on larger screens'
        },
        {
            name: 'drawer-end',
            type: 'modifier',
            default: 'false',
            description: 'Positions drawer on the right side'
        },
        {
            name: 'drawer-mobile',
            type: 'modifier',
            default: 'false',
            description: 'Optimized behavior for mobile devices'
        }
    ];

    // Drawer state management
    let showBasicDrawer = false;
    let showNavigationDrawer = false;
    let showMobileDrawer = false;
    let showRightDrawer = false;
    let showPersistentDrawer = false;
    let showMainNestedDrawer = false;
    let showSubNestedDrawer = false;
</script>

<svelte:head>
    <title>Drawer - NUI Components</title>
    <meta name="description" content="Drawer component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Drawer</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Drawer</h1>
                <p class="text-xl text-base-content/70">
                    Sliding panel component for navigation, settings, and additional content that can be toggled from the side of the screen.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-warning">Beta</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/drawer"
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
            title="Basic Drawer" 
            description="Simple sliding drawer panel that can be toggled from the side"
            code={basicUsage}
        >
            <div class="space-y-4">
                <button class="btn btn-primary" on:click={() => showBasicDrawer = true}>
                    <Menu class="w-4 h-4 mr-2" />
                    Open Basic Drawer
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Navigation Drawer -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Navigation Drawer" 
            description="Responsive navigation drawer that stays open on larger screens and slides in on mobile"
            code={navigationDrawerCode}
        >
            <div class="space-y-4">
                <button class="btn btn-secondary" on:click={() => showNavigationDrawer = true}>
                    <Navigation class="w-4 h-4 mr-2" />
                    Open Navigation Drawer
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Mobile Optimized Drawer -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Mobile Drawer" 
            description="Mobile-optimized drawer with responsive header and touch-friendly controls"
            code={mobileDrawerCode}
        >
            <div class="space-y-4">
                <button class="btn btn-accent" on:click={() => showMobileDrawer = true}>
                    <Menu class="w-4 h-4 mr-2" />
                    Open Mobile Drawer
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Right Side Drawer -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Right Side Drawer" 
            description="Drawer that slides in from the right side, perfect for settings panels or additional actions"
            code={rightDrawerCode}
        >
            <div class="space-y-4">
                <button class="btn btn-info" on:click={() => showRightDrawer = true}>
                    <Settings class="w-4 h-4 mr-2" />
                    Open Right Drawer
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Persistent Drawer -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Persistent Drawer" 
            description="Drawer that remains visible on larger screens and becomes toggleable on mobile"
            code={persistentDrawerCode}
        >
            <div class="space-y-4">
                <button class="btn btn-success" on:click={() => showPersistentDrawer = true}>
                    <Home class="w-4 h-4 mr-2" />
                    Open Persistent Drawer
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Drawer -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Drawer" 
            description="Multiple drawer levels for complex navigation hierarchies"
            code={nestedDrawerCode}
        >
            <div class="space-y-4">
                <button class="btn btn-warning" on:click={() => showMainNestedDrawer = true}>
                    <Menu class="w-4 h-4 mr-2" />
                    Open Nested Drawer
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and <kbd class="kbd kbd-sm">Escape</kbd></li>
                <li>✅ Includes proper ARIA attributes for screen readers</li>
                <li>✅ Focus management when drawer opens and closes</li>
                <li>✅ Touch-friendly controls for mobile devices</li>
                <li>✅ Overlay click closes drawer for easy dismissal</li>
                <li>✅ Respects user motion preferences</li>
                <li>✅ High contrast mode compatible</li>
                <li>✅ Semantic HTML structure with proper landmarks</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- App Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">App Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Primary Navigation</h4>
                        <p>Use persistent drawers for main app navigation that should be easily accessible.</p>
                        <div class="card-actions justify-start">
                            <div class="flex items-center space-x-4 text-sm">
                                <span class="flex items-center"><Home class="w-4 h-4 mr-1" />Dashboard</span>
                                <span class="flex items-center"><User class="w-4 h-4 mr-1" />Users</span>
                                <span class="flex items-center"><Settings class="w-4 h-4 mr-1" />Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Mobile Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Responsive Mobile Navigation</h4>
                        <p>Toggle drawer for mobile devices while maintaining full navigation on desktop.</p>
                        <div class="card-actions justify-start">
                            <button class="btn btn-sm btn-primary">
                                <Menu class="w-4 h-4 mr-1" />
                                Menu
                            </button>
                            <button class="btn btn-sm btn-ghost">
                                <Search class="w-4 h-4 mr-1" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Panel -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Settings Panel</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Configuration Drawer</h4>
                        <p>Right-side drawer perfect for settings, filters, or secondary actions.</p>
                        <div class="card-actions justify-start">
                            <div class="form-control">
                                <label class="cursor-pointer label justify-start space-x-2">
                                    <input type="checkbox" class="toggle toggle-primary toggle-sm" />
                                    <span class="label-text text-sm">Dark mode</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Actual Drawer Components -->

<!-- Basic Drawer -->
{#if showBasicDrawer}
    <div class="drawer drawer-open fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Hello there</h1>
                        <p class="py-6">This is the main content area.</p>
                        <button class="btn btn-primary" on:click={() => showBasicDrawer = false}>
                            Close Drawer
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showBasicDrawer = false}></label>
            <aside class="min-h-full w-80 bg-base-200 text-base-content">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold">Sidebar Content</h2>
                        <button class="btn btn-square btn-sm btn-ghost" on:click={() => showBasicDrawer = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p class="mb-4">This is the drawer content.</p>
                    <ul class="menu">
                        <li><a><Home class="w-5 h-5" />Home</a></li>
                        <li><a><User class="w-5 h-5" />Profile</a></li>
                        <li><a><Settings class="w-5 h-5" />Settings</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Navigation Drawer -->
{#if showNavigationDrawer}
    <div class="drawer lg:drawer-open fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="navbar bg-base-300">
                <div class="flex-none lg:hidden">
                    <button class="btn btn-square btn-ghost" on:click={() => showNavigationDrawer = false}>
                        <Menu class="w-6 h-6" />
                    </button>
                </div>
                <div class="flex-1">
                    <a class="btn btn-ghost text-xl">NUI App</a>
                </div>
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost" on:click={() => showNavigationDrawer = false}>
                        <X class="w-5 h-5" />
                    </button>
                </div>
            </div>
            <!-- Page content -->
            <div class="p-6 flex-1">
                <h1 class="text-2xl font-bold mb-4">Main Content</h1>
                <p>Your page content goes here. The drawer will be persistent on larger screens.</p>
            </div>
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showNavigationDrawer = false}></label>
            <aside class="min-h-full w-64 bg-base-200 text-base-content">
                <ul class="menu p-4">
                    <li><a class="rounded-lg bg-primary text-primary-content"><Home class="w-5 h-5" />Home</a></li>
                    <li><a class="rounded-lg"><User class="w-5 h-5" />Profile</a></li>
                    <li><a class="rounded-lg"><Settings class="w-5 h-5" />Settings</a></li>
                    <li><a class="rounded-lg"><Bell class="w-5 h-5" />Notifications</a></li>
                </ul>
            </aside>
        </div>
    </div>
{/if}

<!-- Mobile Drawer -->
{#if showMobileDrawer}
    <div class="drawer drawer-mobile fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <!-- Mobile header -->
            <div class="navbar bg-base-100 shadow-lg">
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost" on:click={() => showMobileDrawer = false}>
                        <Menu class="w-6 h-6" />
                    </button>
                </div>
                <div class="flex-1">
                    <h1 class="text-xl font-bold">Mobile App</h1>
                </div>
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <Search class="w-6 h-6" />
                    </button>
                    <button class="btn btn-square btn-ghost" on:click={() => showMobileDrawer = false}>
                        <X class="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <!-- Content -->
            <div class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Card 1</h2>
                            <p>Mobile-optimized content.</p>
                        </div>
                    </div>
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Card 2</h2>
                            <p>Responsive layout example.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showMobileDrawer = false}></label>
            <aside class="min-h-full w-80 bg-base-200">
                <!-- Close button for mobile -->
                <div class="flex justify-between items-center p-4">
                    <h2 class="text-xl font-bold">Menu</h2>
                    <button class="btn btn-square btn-sm btn-ghost" on:click={() => showMobileDrawer = false}>
                        <X class="w-5 h-5" />
                    </button>
                </div>
                
                <!-- Menu content -->
                <ul class="menu p-4 space-y-2">
                    <li><a class="rounded-lg"><Home class="w-5 h-5" />Dashboard</a></li>
                    <li><a class="rounded-lg"><ShoppingCart class="w-5 h-5" />Orders</a></li>
                    <li><a class="rounded-lg"><User class="w-5 h-5" />Customers</a></li>
                    <li><a class="rounded-lg"><Bell class="w-5 h-5" />Notifications</a></li>
                    <li><a class="rounded-lg"><Settings class="w-5 h-5" />Settings</a></li>
                </ul>
            </aside>
        </div>
    </div>
{/if}

<!-- Right Drawer -->
{#if showRightDrawer}
    <div class="drawer drawer-end fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <!-- Page content -->
            <div class="min-h-screen bg-base-100 p-8">
                <div class="max-w-2xl mx-auto">
                    <h1 class="text-3xl font-bold mb-4">Right Side Drawer</h1>
                    <p class="mb-6">This drawer slides in from the right side.</p>
                    <button class="btn btn-primary" on:click={() => showRightDrawer = false}>
                        Close Drawer
                    </button>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showRightDrawer = false}></label>
            <aside class="min-h-full w-80 bg-base-200 text-base-content">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">Settings Panel</h2>
                        <button class="btn btn-square btn-sm btn-ghost" on:click={() => showRightDrawer = false}>
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Dark mode</span>
                                <input type="checkbox" class="toggle toggle-primary" />
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Notifications</span>
                                <input type="checkbox" class="toggle toggle-primary" checked />
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Auto-save</span>
                                <input type="checkbox" class="toggle toggle-primary" />
                            </label>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Persistent Drawer -->
{#if showPersistentDrawer}
    <div class="drawer lg:drawer-open fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <!-- Always visible content when drawer is open -->
            <div class="min-h-screen">
                <!-- Header bar -->
                <div class="navbar bg-base-300">
                    <div class="flex-none lg:hidden">
                        <button class="btn btn-square btn-ghost" on:click={() => showPersistentDrawer = false}>
                            <Menu class="w-6 h-6" />
                        </button>
                    </div>
                    <div class="flex-1">
                        <h1 class="text-xl font-bold">Dashboard</h1>
                    </div>
                    <div class="flex-none">
                        <button class="btn btn-square btn-ghost" on:click={() => showPersistentDrawer = false}>
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <!-- Main content -->
                <div class="p-6">
                    <div class="mb-6">
                        <h1 class="text-3xl font-bold mb-2">Persistent Drawer</h1>
                        <p class="text-base-content/70">
                            This drawer stays open on larger screens and slides in on mobile.
                        </p>
                    </div>
                    
                    <div class="stats shadow w-full">
                        <div class="stat">
                            <div class="stat-title">Total Users</div>
                            <div class="stat-value">89,400</div>
                            <div class="stat-desc">21% more than last month</div>
                        </div>
                        <div class="stat">
                            <div class="stat-title">Page Views</div>
                            <div class="stat-value">2.6M</div>
                            <div class="stat-desc">5% more than last month</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showPersistentDrawer = false}></label>
            <aside class="min-h-full w-64 bg-base-200">
                <div class="p-4">
                    <div class="mb-6">
                        <h2 class="text-xl font-bold">Navigation</h2>
                    </div>
                    <ul class="menu space-y-2">
                        <li><a class="rounded-lg bg-primary text-primary-content"><Home class="w-5 h-5" />Dashboard</a></li>
                        <li><a class="rounded-lg"><User class="w-5 h-5" />Users</a></li>
                        <li><a class="rounded-lg"><ShoppingCart class="w-5 h-5" />Orders</a></li>
                        <li><a class="rounded-lg"><Bell class="w-5 h-5" />Notifications</a></li>
                        <li><a class="rounded-lg"><Settings class="w-5 h-5" />Settings</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Main Nested Drawer -->
{#if showMainNestedDrawer}
    <div class="drawer fixed inset-0 z-50">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <div class="min-h-screen p-6">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-2xl font-bold">Nested Drawer Example</h1>
                    <button class="btn btn-square btn-ghost" on:click={() => showMainNestedDrawer = false}>
                        <X class="w-5 h-5" />
                    </button>
                </div>
                <p>This demonstrates nested drawer functionality.</p>
            </div>
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showMainNestedDrawer = false}></label>
            <aside class="min-h-full w-80 bg-base-200">
                <div class="p-4">
                    <h2 class="text-lg font-bold mb-4">Main Drawer</h2>
                    
                    <!-- Nested drawer toggle -->
                    <button 
                        class="btn btn-secondary btn-block mb-4"
                        on:click={() => showSubNestedDrawer = true}
                    >
                        Open Sub Menu
                    </button>
                    
                    <ul class="menu">
                        <li><a><Home class="w-5 h-5" />Home</a></li>
                        <li><a><User class="w-5 h-5" />Profile</a></li>
                        <li><a><Settings class="w-5 h-5" />Settings</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Sub Nested Drawer -->
{#if showSubNestedDrawer}
    <div class="drawer drawer-end fixed inset-0 z-60">
        <input type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <!-- Content handled by main drawer -->
        </div>
        <div class="drawer-side">
            <label class="drawer-overlay" on:click={() => showSubNestedDrawer = false}></label>
            <aside class="min-h-full w-64 bg-base-300">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold">Sub Menu</h3>
                        <button class="btn btn-square btn-sm btn-ghost" on:click={() => showSubNestedDrawer = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <ul class="menu">
                        <li><a>Sub Item 1</a></li>
                        <li><a>Sub Item 2</a></li>
                        <li><a>Sub Item 3</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
{/if}