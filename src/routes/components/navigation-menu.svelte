<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Home, ChevronDown, Menu, User, Settings, FileText, Bookmark, Search, Bell, LogOut, Plus, ShoppingCart, Heart, HelpCircle, Globe, Lock, Layers, Database, BarChart3, Calendar, Mail } from 'lucide-svelte';

    let horizontalActiveItem = 'home';
    let verticalActiveItem = 'dashboard';
    let mobileMenuOpen = false;
    let dropdownOpen = false;
    let megaMenuOpen = false;

    const installCommand = 'npx @nui/cli add navigation-menu';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<ul class="menu menu-horizontal bg-base-200">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</ul>`;

    const horizontalMenuCode = `<script>
  import { Home, User, Settings } from 'lucide-svelte';
  let activeItem = 'home';
<\/script>

<ul class="menu menu-horizontal bg-base-200 rounded-box">
  <li>
    <a 
      class:active={activeItem === 'home'}
      on:click={() => activeItem = 'home'}
    >
      <Home class="w-4 h-4" />
      Home
    </a>
  </li>
  <li>
    <a 
      class:active={activeItem === 'profile'}
      on:click={() => activeItem = 'profile'}
    >
      <User class="w-4 h-4" />
      Profile
    </a>
  </li>
  <li>
    <a 
      class:active={activeItem === 'settings'}
      on:click={() => activeItem = 'settings'}
    >
      <Settings class="w-4 h-4" />
      Settings
    </a>
  </li>
</ul>`;

    const verticalMenuCode = `<ul class="menu bg-base-200 w-56 rounded-box">
  <li class="menu-title">Navigation</li>
  <li><a><Home class="w-4 h-4" />Dashboard</a></li>
  <li><a><User class="w-4 h-4" />Profile</a></li>
  <li><a><Settings class="w-4 h-4" />Settings</a></li>
  <li class="menu-title">Other</li>
  <li><a><FileText class="w-4 h-4" />Documents</a></li>
  <li><a><Bookmark class="w-4 h-4" />Bookmarks</a></li>
</ul>`;

    const dropdownMenuCode = `<script>
  let dropdownOpen = false;
<\/script>

<ul class="menu menu-horizontal bg-base-200 rounded-box">
  <li><a>Home</a></li>
  <li>
    <details bind:open={dropdownOpen}>
      <summary>
        Services
        <ChevronDown class="w-4 h-4" />
      </summary>
      <ul class="p-2 bg-base-100 rounded-t-none">
        <li><a>Web Design</a></li>
        <li><a>Development</a></li>
        <li><a>Consulting</a></li>
      </ul>
    </details>
  </li>
  <li><a>Contact</a></li>
</ul>`;

    const mobileMenuCode = `<script>
  import { Menu, X } from 'lucide-svelte';
  let mobileMenuOpen = false;
<\/script>

<!-- Mobile Menu Button -->
<div class="navbar bg-base-200 lg:hidden">
  <div class="navbar-start">
    <button 
      class="btn btn-ghost"
      on:click={() => mobileMenuOpen = !mobileMenuOpen}
    >
      <Menu class="w-5 h-5" />
    </button>
  </div>
</div>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div class="drawer-side lg:hidden">
    <label class="drawer-overlay" on:click={() => mobileMenuOpen = false}></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <li><a>Home</a></li>
      <li><a>About</a></li>
      <li><a>Services</a></li>
      <li><a>Contact</a></li>
    </ul>
  </div>
{/if}`;

    const sidebarMenuCode = `<div class="drawer lg:drawer-open">
  <input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
  
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="drawer-toggle" class="btn btn-square btn-ghost">
          <Menu class="w-5 h-5" />
        </label>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Dashboard</a>
      </div>
    </div>
    
    <!-- Page content -->
    <div class="flex-1 p-6">
      <h2 class="text-2xl font-bold">Main Content</h2>
    </div>
  </div>
  
  <div class="drawer-side">
    <label for="drawer-toggle" class="drawer-overlay"></label>
    <aside class="min-h-full w-64 bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">Menu</h3>
        <ul class="menu">
          <li><a><Home class="w-4 h-4" />Dashboard</a></li>
          <li><a><User class="w-4 h-4" />Users</a></li>
          <li><a><Settings class="w-4 h-4" />Settings</a></li>
        </ul>
      </div>
    </aside>
  </div>
</div>`;

    const megaMenuCode = `<script>
  let megaMenuOpen = false;
<\/script>

<ul class="menu menu-horizontal bg-base-200 rounded-box">
  <li><a>Home</a></li>
  <li>
    <details bind:open={megaMenuOpen}>
      <summary>
        Products
        <ChevronDown class="w-4 h-4" />
      </summary>
      <div class="mega-menu bg-base-100 p-6 shadow-lg rounded-box w-96">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold mb-2">Design Tools</h4>
            <ul class="space-y-1">
              <li><a class="text-sm hover:text-primary">UI Kits</a></li>
              <li><a class="text-sm hover:text-primary">Icons</a></li>
              <li><a class="text-sm hover:text-primary">Templates</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Development</h4>
            <ul class="space-y-1">
              <li><a class="text-sm hover:text-primary">Components</a></li>
              <li><a class="text-sm hover:text-primary">Frameworks</a></li>
              <li><a class="text-sm hover:text-primary">Themes</a></li>
            </ul>
          </div>
        </div>
      </div>
    </details>
  </li>
  <li><a>About</a></li>
</ul>`;

    const breadcrumbMenuCode = `<div class="flex flex-col space-y-4">
  <!-- Breadcrumb Navigation -->
  <div class="breadcrumbs text-sm">
    <ul>
      <li><a>Home</a></li>
      <li><a>Products</a></li>
      <li><a>Electronics</a></li>
      <li>Laptops</li>
    </ul>
  </div>
  
  <!-- Sub Navigation -->
  <ul class="menu menu-horizontal bg-base-200 rounded-box">
    <li><a class="active">Overview</a></li>
    <li><a>Specifications</a></li>
    <li><a>Reviews</a></li>
    <li><a>Support</a></li>
  </ul>
</div>`;

    const apiProps = [
        {
            name: 'menu',
            type: 'class',
            default: 'false',
            description: 'Base menu component class'
        },
        {
            name: 'menu-horizontal',
            type: 'class',
            default: 'false',
            description: 'Horizontal menu layout'
        },
        {
            name: 'menu-vertical',
            type: 'class',
            default: 'true',
            description: 'Vertical menu layout (default)'
        },
        {
            name: 'menu-compact',
            type: 'class',
            default: 'false',
            description: 'Compact spacing for menu items'
        },
        {
            name: 'menu-lg',
            type: 'class',
            default: 'false',
            description: 'Large menu item size'
        },
        {
            name: 'menu-sm',
            type: 'class',
            default: 'false',
            description: 'Small menu item size'
        },
        {
            name: 'menu-xs',
            type: 'class',
            default: 'false',
            description: 'Extra small menu item size'
        },
        {
            name: 'menu-title',
            type: 'class',
            default: 'false',
            description: 'Styling for menu section titles'
        },
        {
            name: 'active',
            type: 'class',
            default: 'false',
            description: 'Active state for menu items'
        },
        {
            name: 'disabled',
            type: 'class',
            default: 'false',
            description: 'Disabled state for menu items'
        }
    ];
</script>

<svelte:head>
    <title>Navigation Menu - NUI Components</title>
    <meta name="description" content="Navigation Menu component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Navigation Menu</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Navigation Menu</h1>
                <p class="text-xl text-base-content/70">
                    Flexible navigation menus with horizontal, vertical, and dropdown support. Perfect for site navigation and app menus.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/navigation-menu"
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
            description="Simple horizontal navigation menu with basic styling"
            code={basicUsage}
        >
            <ul class="menu menu-horizontal bg-base-200 rounded-box">
                <li><a href="#" class="hover:bg-base-300">Item 1</a></li>
                <li><a href="#" class="hover:bg-base-300">Item 2</a></li>
                <li><a href="#" class="hover:bg-base-300">Item 3</a></li>
            </ul>
        </ComponentShowcase>
    </div>

    <!-- Horizontal Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Horizontal Menu with Icons" 
            description="Horizontal navigation with icons and active state management"
            code={horizontalMenuCode}
        >
            <ul class="menu menu-horizontal bg-base-200 rounded-box">
                <li>
                    <a 
                        href="#"
                        class:active={horizontalActiveItem === 'home'}
                        on:click={(e) => {e.preventDefault(); horizontalActiveItem = 'home'}}
                    >
                        <Home class="w-4 h-4" />
                        Home
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={horizontalActiveItem === 'profile'}
                        on:click={(e) => {e.preventDefault(); horizontalActiveItem = 'profile'}}
                    >
                        <User class="w-4 h-4" />
                        Profile
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={horizontalActiveItem === 'settings'}
                        on:click={(e) => {e.preventDefault(); horizontalActiveItem = 'settings'}}
                    >
                        <Settings class="w-4 h-4" />
                        Settings
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={horizontalActiveItem === 'help'}
                        on:click={(e) => {e.preventDefault(); horizontalActiveItem = 'help'}}
                    >
                        <HelpCircle class="w-4 h-4" />
                        Help
                    </a>
                </li>
            </ul>
        </ComponentShowcase>
    </div>

    <!-- Vertical Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Vertical Menu with Sections" 
            description="Vertical navigation with menu titles and grouped sections"
            code={verticalMenuCode}
        >
            <ul class="menu bg-base-200 w-56 rounded-box">
                <li class="menu-title">
                    <span>Navigation</span>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'dashboard'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'dashboard'}}
                    >
                        <BarChart3 class="w-4 h-4" />
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'profile'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'profile'}}
                    >
                        <User class="w-4 h-4" />
                        Profile
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'settings'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'settings'}}
                    >
                        <Settings class="w-4 h-4" />
                        Settings
                    </a>
                </li>
                <li class="menu-title">
                    <span>Content</span>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'documents'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'documents'}}
                    >
                        <FileText class="w-4 h-4" />
                        Documents
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'bookmarks'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'bookmarks'}}
                    >
                        <Bookmark class="w-4 h-4" />
                        Bookmarks
                    </a>
                </li>
                <li>
                    <a 
                        href="#"
                        class:active={verticalActiveItem === 'calendar'}
                        on:click={(e) => {e.preventDefault(); verticalActiveItem = 'calendar'}}
                    >
                        <Calendar class="w-4 h-4" />
                        Calendar
                    </a>
                </li>
            </ul>
        </ComponentShowcase>
    </div>

    <!-- Dropdown Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Dropdown Menu" 
            description="Horizontal menu with dropdown submenus for nested navigation"
            code={dropdownMenuCode}
        >
            <ul class="menu menu-horizontal bg-base-200 rounded-box">
                <li><a href="#" class="hover:bg-base-300">Home</a></li>
                <li>
                    <details bind:open={dropdownOpen}>
                        <summary class="hover:bg-base-300">
                            Services
                            <ChevronDown class="w-4 h-4" />
                        </summary>
                        <ul class="p-2 bg-base-100 rounded-t-none min-w-max">
                            <li><a href="#" class="hover:bg-base-200">Web Design</a></li>
                            <li><a href="#" class="hover:bg-base-200">Development</a></li>
                            <li><a href="#" class="hover:bg-base-200">Consulting</a></li>
                            <li><a href="#" class="hover:bg-base-200">Support</a></li>
                        </ul>
                    </details>
                </li>
                <li><a href="#" class="hover:bg-base-300">About</a></li>
                <li><a href="#" class="hover:bg-base-300">Contact</a></li>
            </ul>
        </ComponentShowcase>
    </div>

    <!-- Mobile Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Mobile Responsive Menu" 
            description="Mobile-friendly navigation with collapsible menu and drawer overlay"
            code={mobileMenuCode}
        >
            <div class="mockup-phone">
                <div class="camera"></div>
                <div class="display">
                    <div class="artboard artboard-demo phone-1">
                        <!-- Mobile Navbar -->
                        <div class="navbar bg-base-200">
                            <div class="navbar-start">
                                <button 
                                    class="btn btn-ghost"
                                    on:click={() => mobileMenuOpen = !mobileMenuOpen}
                                >
                                    <Menu class="w-5 h-5" />
                                </button>
                                <a class="btn btn-ghost text-xl">Brand</a>
                            </div>
                            <div class="navbar-end">
                                <button class="btn btn-ghost">
                                    <Search class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">Main Content</h3>
                            <p class="text-sm text-base-content/70">Click the menu button to open navigation</p>
                        </div>

                        <!-- Mobile Menu Overlay -->
                        {#if mobileMenuOpen}
                            <div class="fixed inset-0 z-50 flex">
                                <div class="bg-base-200 w-64 p-4">
                                    <div class="flex justify-between items-center mb-4">
                                        <h3 class="font-semibold">Menu</h3>
                                        <button 
                                            class="btn btn-ghost btn-sm"
                                            on:click={() => mobileMenuOpen = false}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <ul class="menu">
                                        <li><a href="#" on:click={() => mobileMenuOpen = false}>Home</a></li>
                                        <li><a href="#" on:click={() => mobileMenuOpen = false}>About</a></li>
                                        <li><a href="#" on:click={() => mobileMenuOpen = false}>Services</a></li>
                                        <li><a href="#" on:click={() => mobileMenuOpen = false}>Contact</a></li>
                                    </ul>
                                </div>
                                <div 
                                    class="flex-1 bg-black/20" 
                                    on:click={() => mobileMenuOpen = false}
                                    on:keydown={(e) => e.key === 'Enter' && (mobileMenuOpen = false)}
                                    role="button"
                                    tabindex="0"
                                ></div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sidebar Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sidebar Navigation" 
            description="Full-height sidebar with responsive drawer behavior"
            code={sidebarMenuCode}
        >
            <div class="mockup-browser border bg-base-300 h-96">
                <div class="mockup-browser-toolbar">
                    <div class="input">https://example.com/dashboard</div>
                </div>
                <div class="flex h-full">
                    <!-- Sidebar -->
                    <aside class="w-64 bg-base-200 p-4">
                        <div class="mb-4">
                            <h3 class="text-lg font-semibold">Dashboard</h3>
                            <p class="text-xs text-base-content/70">Admin Panel</p>
                        </div>
                        <ul class="menu">
                            <li><a href="#" class="active"><BarChart3 class="w-4 h-4" />Overview</a></li>
                            <li><a href="#"><User class="w-4 h-4" />Users</a></li>
                            <li><a href="#"><Database class="w-4 h-4" />Database</a></li>
                            <li><a href="#"><Settings class="w-4 h-4" />Settings</a></li>
                            <li class="menu-title"><span>Tools</span></li>
                            <li><a href="#"><Layers class="w-4 h-4" />Components</a></li>
                            <li><a href="#"><Globe class="w-4 h-4" />API</a></li>
                            <li><a href="#"><Lock class="w-4 h-4" />Security</a></li>
                        </ul>
                    </aside>
                    
                    <!-- Main Content -->
                    <div class="flex-1 p-6 bg-base-100">
                        <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="stat bg-primary text-primary-content rounded-box">
                                <div class="stat-title text-primary-content/70">Total Users</div>
                                <div class="stat-value text-2xl">89.4k</div>
                            </div>
                            <div class="stat bg-secondary text-secondary-content rounded-box">
                                <div class="stat-title text-secondary-content/70">Revenue</div>
                                <div class="stat-value text-2xl">$12.4k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Mega Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Mega Menu" 
            description="Large dropdown menu with multiple columns and rich content"
            code={megaMenuCode}
        >
            <ul class="menu menu-horizontal bg-base-200 rounded-box">
                <li><a href="#" class="hover:bg-base-300">Home</a></li>
                <li>
                    <details bind:open={megaMenuOpen}>
                        <summary class="hover:bg-base-300">
                            Products
                            <ChevronDown class="w-4 h-4" />
                        </summary>
                        <div class="absolute top-full left-0 mt-1 bg-base-100 p-6 shadow-lg rounded-box w-96 z-50">
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 class="font-semibold mb-3 text-primary">Design Tools</h4>
                                    <ul class="space-y-2">
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Layers class="w-3 h-3 mr-2" />UI Kits</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Heart class="w-3 h-3 mr-2" />Icons</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><FileText class="w-3 h-3 mr-2" />Templates</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Plus class="w-3 h-3 mr-2" />Plugins</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-semibold mb-3 text-secondary">Development</h4>
                                    <ul class="space-y-2">
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Database class="w-3 h-3 mr-2" />Components</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Globe class="w-3 h-3 mr-2" />Frameworks</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><Settings class="w-3 h-3 mr-2" />Themes</a></li>
                                        <li><a href="#" class="text-sm hover:text-primary flex items-center"><BarChart3 class="w-3 h-3 mr-2" />Analytics</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div class="flex justify-between items-center">
                                <a href="#" class="link link-primary text-sm">View All Products</a>
                                <div class="badge badge-secondary">New</div>
                            </div>
                        </div>
                    </details>
                </li>
                <li><a href="#" class="hover:bg-base-300">Solutions</a></li>
                <li><a href="#" class="hover:bg-base-300">About</a></li>
            </ul>
        </ComponentShowcase>
    </div>

    <!-- Breadcrumb + Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Breadcrumb with Sub Navigation" 
            description="Combined breadcrumb trail with contextual sub-navigation menu"
            code={breadcrumbMenuCode}
        >
            <div class="space-y-4">
                <!-- Breadcrumb Navigation -->
                <div class="breadcrumbs text-sm">
                    <ul>
                        <li><a href="#" class="hover:text-primary">Home</a></li>
                        <li><a href="#" class="hover:text-primary">Products</a></li>
                        <li><a href="#" class="hover:text-primary">Electronics</a></li>
                        <li>Laptops</li>
                    </ul>
                </div>
                
                <!-- Sub Navigation -->
                <ul class="menu menu-horizontal bg-base-200 rounded-box">
                    <li><a href="#" class="active">Overview</a></li>
                    <li><a href="#" class="hover:bg-base-300">Specifications</a></li>
                    <li><a href="#" class="hover:bg-base-300">Reviews</a></li>
                    <li><a href="#" class="hover:bg-base-300">Comparisons</a></li>
                    <li><a href="#" class="hover:bg-base-300">Support</a></li>
                </ul>
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
                <li>✅ Includes proper ARIA attributes for menu structure and states</li>
                <li>✅ Dropdown menus support <kbd class="kbd kbd-sm">Escape</kbd> key to close</li>
                <li>✅ Focus management for nested menu items and dropdowns</li>
                <li>✅ Screen reader compatible with semantic navigation markup</li>
                <li>✅ High contrast support with clear focus indicators</li>
                <li>✅ Mobile touch-friendly with appropriate touch targets</li>
                <li>✅ Respects reduced motion preferences for animations</li>
                <li>✅ Works with voice navigation and switch control</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- E-commerce Header -->
            <div>
                <h3 class="text-lg font-semibold mb-4">E-commerce Header Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <!-- Top Bar -->
                        <div class="flex justify-between items-center text-sm mb-4 pb-4 border-b border-base-300">
                            <div class="flex items-center space-x-4">
                                <a href="#" class="hover:text-primary">Customer Service</a>
                                <a href="#" class="hover:text-primary">Track Order</a>
                            </div>
                            <div class="flex items-center space-x-4">
                                <a href="#" class="hover:text-primary">Sign In</a>
                                <a href="#" class="hover:text-primary">Create Account</a>
                            </div>
                        </div>
                        
                        <!-- Main Navigation -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-8">
                                <h2 class="text-xl font-bold">ShopLogo</h2>
                                <ul class="menu menu-horizontal">
                                    <li><a href="#" class="hover:text-primary">Home</a></li>
                                    <li>
                                        <details>
                                            <summary class="hover:text-primary">
                                                Categories
                                                <ChevronDown class="w-4 h-4" />
                                            </summary>
                                            <ul class="p-2 bg-base-100 rounded-t-none min-w-max">
                                                <li><a href="#">Electronics</a></li>
                                                <li><a href="#">Fashion</a></li>
                                                <li><a href="#">Home & Garden</a></li>
                                                <li><a href="#">Sports</a></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li><a href="#" class="hover:text-primary">Deals</a></li>
                                    <li><a href="#" class="hover:text-primary">About</a></li>
                                </ul>
                            </div>
                            
                            <div class="flex items-center space-x-2">
                                <button class="btn btn-ghost btn-sm">
                                    <Search class="w-4 h-4" />
                                </button>
                                <button class="btn btn-ghost btn-sm">
                                    <Heart class="w-4 h-4" />
                                </button>
                                <button class="btn btn-ghost btn-sm">
                                    <ShoppingCart class="w-4 h-4" />
                                    <span class="badge badge-primary badge-sm">3</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Admin Dashboard -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Admin Dashboard Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body p-0">
                        <div class="flex h-64">
                            <!-- Sidebar -->
                            <div class="w-64 bg-base-200 p-4">
                                <div class="flex items-center space-x-2 mb-6">
                                    <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                        <span class="text-primary-content font-bold text-sm">A</span>
                                    </div>
                                    <span class="font-semibold">Admin Panel</span>
                                </div>
                                
                                <ul class="menu">
                                    <li><a href="#" class="active"><BarChart3 class="w-4 h-4" />Dashboard</a></li>
                                    <li><a href="#"><User class="w-4 h-4" />Users</a></li>
                                    <li><a href="#"><ShoppingCart class="w-4 h-4" />Orders</a></li>
                                    <li><a href="#"><Database class="w-4 h-4" />Products</a></li>
                                    <li class="menu-title"><span>System</span></li>
                                    <li><a href="#"><Settings class="w-4 h-4" />Settings</a></li>
                                    <li><a href="#"><Bell class="w-4 h-4" />Notifications</a></li>
                                    <li><a href="#"><HelpCircle class="w-4 h-4" />Support</a></li>
                                    <li class="mt-auto"><a href="#" class="text-error"><LogOut class="w-4 h-4" />Logout</a></li>
                                </ul>
                            </div>
                            
                            <!-- Header & Content -->
                            <div class="flex-1 flex flex-col">
                                <!-- Header -->
                                <div class="navbar bg-base-300 px-6">
                                    <div class="flex-1">
                                        <h2 class="text-lg font-semibold">Dashboard Overview</h2>
                                    </div>
                                    <div class="flex-none">
                                        <button class="btn btn-ghost btn-sm">
                                            <Bell class="w-4 h-4" />
                                        </button>
                                        <div class="dropdown dropdown-end">
                                            <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                                <User class="w-4 h-4" />
                                                Admin
                                                <ChevronDown class="w-4 h-4" />
                                            </div>
                                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a><User class="w-4 h-4" />Profile</a></li>
                                                <li><a><Settings class="w-4 h-4" />Settings</a></li>
                                                <li><a><LogOut class="w-4 h-4" />Logout</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Content -->
                                <div class="flex-1 p-6">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="stat bg-primary text-primary-content rounded-box">
                                            <div class="stat-title text-primary-content/70">Active Users</div>
                                            <div class="stat-value text-2xl">2,543</div>
                                            <div class="stat-desc text-primary-content/70">↗︎ 15% increase</div>
                                        </div>
                                        <div class="stat bg-secondary text-secondary-content rounded-box">
                                            <div class="stat-title text-secondary-content/70">Total Orders</div>
                                            <div class="stat-value text-2xl">1,234</div>
                                            <div class="stat-desc text-secondary-content/70">↗︎ 8% increase</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile App Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Mobile App Bottom Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="mockup-phone">
                            <div class="camera"></div>
                            <div class="display">
                                <div class="artboard artboard-demo phone-1 flex flex-col">
                                    <!-- Content Area -->
                                    <div class="flex-1 p-4 bg-base-100">
                                        <h3 class="text-lg font-semibold mb-2">Home Feed</h3>
                                        <p class="text-sm text-base-content/70">Your personalized content appears here</p>
                                        
                                        <div class="space-y-3 mt-4">
                                            {#each Array(3) as _, i}
                                                <div class="card bg-base-200 card-compact">
                                                    <div class="card-body">
                                                        <div class="flex items-center space-x-2 mb-2">
                                                            <div class="avatar placeholder">
                                                                <div class="bg-neutral text-neutral-content rounded-full w-8">
                                                                    <span class="text-xs">U{i + 1}</span>
                                                                </div>
                                                            </div>
                                                            <span class="text-sm font-medium">User {i + 1}</span>
                                                        </div>
                                                        <p class="text-xs">Sample post content here...</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                    
                                    <!-- Bottom Navigation -->
                                    <div class="btm-nav btm-nav-xs">
                                        <button class="active">
                                            <Home class="w-4 h-4" />
                                            <span class="btm-nav-label">Home</span>
                                        </button>
                                        <button>
                                            <Search class="w-4 h-4" />
                                            <span class="btm-nav-label">Search</span>
                                        </button>
                                        <button>
                                            <Plus class="w-4 h-4" />
                                            <span class="btm-nav-label">Create</span>
                                        </button>
                                        <button>
                                            <Bell class="w-4 h-4" />
                                            <span class="btm-nav-label">Alerts</span>
                                        </button>
                                        <button>
                                            <User class="w-4 h-4" />
                                            <span class="btm-nav-label">Profile</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Documentation Site Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Documentation Site Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body p-0">
                        <div class="flex h-80">
                            <!-- Sidebar TOC -->
                            <div class="w-64 bg-base-200 p-4 border-r border-base-300">
                                <div class="mb-4">
                                    <h3 class="font-semibold text-sm">Documentation</h3>
                                    <p class="text-xs text-base-content/70">v2.1.0</p>
                                </div>
                                
                                <ul class="menu menu-compact">
                                    <li class="menu-title"><span>Getting Started</span></li>
                                    <li><a href="#" class="active">Introduction</a></li>
                                    <li><a href="#">Installation</a></li>
                                    <li><a href="#">Quick Start</a></li>
                                    
                                    <li class="menu-title"><span>Components</span></li>
                                    <li><a href="#">Button</a></li>
                                    <li><a href="#">Card</a></li>
                                    <li><a href="#">Modal</a></li>
                                    <li><a href="#">Navigation</a></li>
                                    
                                    <li class="menu-title"><span>Advanced</span></li>
                                    <li><a href="#">Theming</a></li>
                                    <li><a href="#">Customization</a></li>
                                    <li><a href="#">Migration</a></li>
                                </ul>
                            </div>
                            
                            <!-- Main Content -->
                            <div class="flex-1 flex flex-col">
                                <!-- Header -->
                                <div class="navbar bg-base-300 px-6 border-b border-base-300">
                                    <div class="flex-1">
                                        <div class="breadcrumbs text-sm">
                                            <ul>
                                                <li><a href="#">Docs</a></li>
                                                <li><a href="#">Getting Started</a></li>
                                                <li>Introduction</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="flex-none">
                                        <button class="btn btn-ghost btn-sm">
                                            <Search class="w-4 h-4" />
                                        </button>
                                        <button class="btn btn-ghost btn-sm">
                                            <Github class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Article Content -->
                                <div class="flex-1 p-6">
                                    <h1 class="text-2xl font-bold mb-4">Introduction</h1>
                                    <p class="text-base-content/70 mb-4">Welcome to our component library documentation...</p>
                                    
                                    <!-- Page Navigation -->
                                    <div class="flex justify-between items-center mt-8 pt-4 border-t border-base-300">
                                        <a href="#" class="btn btn-ghost btn-sm">
                                            <ArrowLeft class="w-4 h-4 mr-1" />
                                            Previous
                                        </a>
                                        <a href="#" class="btn btn-primary btn-sm">
                                            Next
                                            <ChevronDown class="w-4 h-4 ml-1 rotate-[-90deg]" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>