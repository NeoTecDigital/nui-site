<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, HelpCircle, Settings, User, Bell, Search, ChevronDown, Calendar, MapPin, Star, Info, MessageCircle, Link, Edit3, Share, Heart, Bookmark, MoreHorizontal } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add popover';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<!-- Basic Popover -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Click me</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>`;

    const positioningCode = `<!-- Top Positioning -->
<div class="dropdown dropdown-top">
  <div tabindex="0" role="button" class="btn">Top</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

<!-- Bottom Positioning (Default) -->
<div class="dropdown dropdown-bottom">
  <div tabindex="0" role="button" class="btn">Bottom</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

<!-- Left Positioning -->
<div class="dropdown dropdown-left">
  <div tabindex="0" role="button" class="btn">Left</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

<!-- Right Positioning -->
<div class="dropdown dropdown-right">
  <div tabindex="0" role="button" class="btn">Right</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>`;

    const richContentCode = `<!-- Rich Content Popover -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn btn-outline">
    <User class="w-4 h-4 mr-2" />
    Profile
  </div>
  <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-80 p-4 shadow-lg">
    <div class="flex items-center space-x-3 mb-4">
      <div class="avatar">
        <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <User class="w-6 h-6 text-primary" />
        </div>
      </div>
      <div>
        <h4 class="font-semibold">John Doe</h4>
        <p class="text-sm text-base-content/70">Software Engineer</p>
      </div>
    </div>
    <div class="stats shadow w-full">
      <div class="stat px-4 py-2">
        <div class="stat-title text-xs">Projects</div>
        <div class="stat-value text-lg">12</div>
      </div>
      <div class="stat px-4 py-2">
        <div class="stat-title text-xs">Commits</div>
        <div class="stat-value text-lg">1.2K</div>
      </div>
    </div>
    <div class="mt-4 flex space-x-2">
      <button class="btn btn-primary btn-sm flex-1">View Profile</button>
      <button class="btn btn-ghost btn-sm">Message</button>
    </div>
  </div>
</div>`;

    const formContentCode = `<!-- Form Content Popover -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn btn-secondary">
    <Settings class="w-4 h-4 mr-2" />
    Quick Settings
  </div>
  <form tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-4 shadow-lg space-y-4">
    <h4 class="font-semibold mb-3">Notification Settings</h4>
    
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text">Email notifications</span>
        <input type="checkbox" class="checkbox checkbox-primary" checked />
      </label>
    </div>
    
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text">Push notifications</span>
        <input type="checkbox" class="checkbox checkbox-primary" />
      </label>
    </div>
    
    <div class="form-control">
      <label class="label">
        <span class="label-text">Frequency</span>
      </label>
      <select class="select select-bordered select-sm">
        <option>Immediate</option>
        <option>Daily</option>
        <option>Weekly</option>
      </select>
    </div>
    
    <div class="flex space-x-2 pt-2">
      <button type="submit" class="btn btn-primary btn-sm">Save</button>
      <button type="button" class="btn btn-ghost btn-sm">Cancel</button>
    </div>
  </form>
</div>`;

    const triggerMethodsCode = `<!-- Click Trigger (Default) -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn">Click Trigger</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Opens on click</a></li>
    <li><a>Closes on outside click</a></li>
  </ul>
</div>

<!-- Hover Trigger -->
<div class="dropdown dropdown-hover">
  <div tabindex="0" role="button" class="btn">Hover Trigger</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Opens on hover</a></li>
    <li><a>Closes when mouse leaves</a></li>
  </ul>
</div>

<!-- Focus Trigger -->
<div class="dropdown">
  <input 
    type="text" 
    placeholder="Focus me" 
    class="input input-bordered" 
    tabindex="0"
  />
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-1">
    <li><a>Search suggestion 1</a></li>
    <li><a>Search suggestion 2</a></li>
    <li><a>Search suggestion 3</a></li>
  </ul>
</div>`;

    const contextMenuCode = `<!-- Context Menu Popover -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
    <MoreHorizontal class="w-4 h-4" />
  </div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow">
    <li>
      <a class="flex items-center">
        <Edit3 class="w-4 h-4" />
        Edit
      </a>
    </li>
    <li>
      <a class="flex items-center">
        <Share class="w-4 h-4" />
        Share
      </a>
    </li>
    <li>
      <a class="flex items-center">
        <Bookmark class="w-4 h-4" />
        Bookmark
      </a>
    </li>
    <div class="divider my-1"></div>
    <li>
      <a class="flex items-center text-error">
        <span class="w-4 h-4">🗑️</span>
        Delete
      </a>
    </li>
  </ul>
</div>`;

    const apiProps = [
        {
            name: 'dropdown',
            type: 'string',
            default: "'dropdown'",
            description: 'Base CSS class for the dropdown container'
        },
        {
            name: 'dropdown-content',
            type: 'string',
            default: "'dropdown-content'",
            description: 'CSS class for the popover content container'
        },
        {
            name: 'dropdown-top',
            type: 'modifier',
            default: 'false',
            description: 'Positions popover above the trigger element'
        },
        {
            name: 'dropdown-bottom',
            type: 'modifier',
            default: 'true',
            description: 'Positions popover below the trigger element'
        },
        {
            name: 'dropdown-left',
            type: 'modifier',
            default: 'false',
            description: 'Positions popover to the left of trigger element'
        },
        {
            name: 'dropdown-right',
            type: 'modifier',
            default: 'false',
            description: 'Positions popover to the right of trigger element'
        },
        {
            name: 'dropdown-hover',
            type: 'modifier',
            default: 'false',
            description: 'Opens popover on hover instead of click'
        },
        {
            name: 'dropdown-open',
            type: 'modifier',
            default: 'false',
            description: 'Forces popover to stay open'
        },
        {
            name: 'dropdown-end',
            type: 'modifier',
            default: 'false',
            description: 'Aligns popover to the end of trigger element'
        },
        {
            name: 'z-index',
            type: 'number',
            default: '1',
            description: 'Controls stacking order of the popover'
        }
    ];

    // Popover state management
    let showProfilePopover = false;
    let showSettingsPopover = false;
    let showInfoPopover = false;
    let showNotificationPopover = false;
    let showSearchSuggestions = false;
    let searchQuery = '';

    const searchSuggestions = [
        'JavaScript frameworks',
        'React components',
        'Svelte tutorials',
        'Vue.js best practices',
        'TypeScript guide'
    ];

    function handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        searchQuery = target.value;
        showSearchSuggestions = searchQuery.length > 0;
    }
</script>

<svelte:head>
    <title>Popover - NUI Components</title>
    <meta name="description" content="Popover component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Popover</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Popover</h1>
                <p class="text-xl text-base-content/70">
                    Floating content containers that display rich information, forms, or actions relative to trigger elements.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/popover"
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
            title="Basic Popover" 
            description="Simple floating content container with click trigger"
            code={basicUsage}
        >
            <div class="space-y-4">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-primary">
                        Click me
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Profile Settings</a></li>
                        <li><a>Account Info</a></li>
                        <li><a>Preferences</a></li>
                        <li><a>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Positioning -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Positioning" 
            description="Control popover placement relative to trigger elements"
            code={positioningCode}
        >
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Top -->
                <div class="dropdown dropdown-top">
                    <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                        Top
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li><a>Appears above</a></li>
                        <li><a>trigger element</a></li>
                    </ul>
                </div>

                <!-- Bottom -->
                <div class="dropdown dropdown-bottom">
                    <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                        Bottom
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li><a>Appears below</a></li>
                        <li><a>trigger element</a></li>
                    </ul>
                </div>

                <!-- Left -->
                <div class="dropdown dropdown-left">
                    <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                        Left
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li><a>Appears left</a></li>
                        <li><a>of trigger element</a></li>
                    </ul>
                </div>

                <!-- Right -->
                <div class="dropdown dropdown-right">
                    <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                        Right
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li><a>Appears right</a></li>
                        <li><a>of trigger element</a></li>
                    </ul>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Rich Content -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Rich Content" 
            description="Popovers with complex layouts, images, and interactive elements"
            code={richContentCode}
        >
            <div class="flex flex-wrap gap-4">
                <!-- User Profile Popover -->
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-outline">
                        <User class="w-4 h-4 mr-2" />
                        Profile
                    </div>
                    <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-80 p-4 shadow-lg">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="avatar">
                                <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User class="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold">John Doe</h4>
                                <p class="text-sm text-base-content/70">Software Engineer</p>
                            </div>
                        </div>
                        <div class="stats shadow w-full">
                            <div class="stat px-4 py-2">
                                <div class="stat-title text-xs">Projects</div>
                                <div class="stat-value text-lg">12</div>
                            </div>
                            <div class="stat px-4 py-2">
                                <div class="stat-title text-xs">Commits</div>
                                <div class="stat-value text-lg">1.2K</div>
                            </div>
                        </div>
                        <div class="mt-4 flex space-x-2">
                            <button class="btn btn-primary btn-sm flex-1">View Profile</button>
                            <button class="btn btn-ghost btn-sm">
                                <MessageCircle class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Notification Popover -->
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost relative">
                        <Bell class="w-5 h-5" />
                        <div class="badge badge-error badge-sm absolute -top-2 -right-2">3</div>
                    </div>
                    <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-80 p-4 shadow-lg">
                        <h4 class="font-semibold mb-3">Recent Notifications</h4>
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3 p-2 rounded hover:bg-base-200">
                                <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">New message received</p>
                                    <p class="text-xs text-base-content/70">2 minutes ago</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-2 rounded hover:bg-base-200">
                                <div class="w-2 h-2 bg-success rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">Task completed</p>
                                    <p class="text-xs text-base-content/70">1 hour ago</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-2 rounded hover:bg-base-200">
                                <div class="w-2 h-2 bg-warning rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">System maintenance</p>
                                    <p class="text-xs text-base-content/70">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t">
                            <button class="btn btn-ghost btn-sm w-full">View All Notifications</button>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Form Content -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Form Content" 
            description="Interactive forms and controls inside popovers"
            code={formContentCode}
        >
            <div class="space-y-4">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-secondary">
                        <Settings class="w-4 h-4 mr-2" />
                        Quick Settings
                    </div>
                    <form tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-4 shadow-lg space-y-4" on:submit|preventDefault>
                        <h4 class="font-semibold mb-3">Notification Settings</h4>
                        
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Email notifications</span>
                                <input type="checkbox" class="checkbox checkbox-primary" checked />
                            </label>
                        </div>
                        
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Push notifications</span>
                                <input type="checkbox" class="checkbox checkbox-primary" />
                            </label>
                        </div>
                        
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Frequency</span>
                            </label>
                            <select class="select select-bordered select-sm">
                                <option>Immediate</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                            </select>
                        </div>
                        
                        <div class="flex space-x-2 pt-2">
                            <button type="submit" class="btn btn-primary btn-sm">Save</button>
                            <button type="button" class="btn btn-ghost btn-sm">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Trigger Methods -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Trigger Methods" 
            description="Different ways to open and close popovers"
            code={triggerMethodsCode}
        >
            <div class="flex flex-wrap gap-4">
                <!-- Click Trigger -->
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-outline">
                        Click Trigger
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Opens on click</a></li>
                        <li><a>Closes on outside click</a></li>
                    </ul>
                </div>

                <!-- Hover Trigger -->
                <div class="dropdown dropdown-hover">
                    <div tabindex="0" role="button" class="btn btn-outline">
                        Hover Trigger
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Opens on hover</a></li>
                        <li><a>Closes when mouse leaves</a></li>
                    </ul>
                </div>

                <!-- Focus/Search Input -->
                <div class="dropdown" class:dropdown-open={showSearchSuggestions}>
                    <input 
                        type="text" 
                        placeholder="Focus me (type to search)" 
                        class="input input-bordered w-64" 
                        bind:value={searchQuery}
                        on:input={handleSearch}
                        on:focus={() => showSearchSuggestions = searchQuery.length > 0}
                        on:blur={() => setTimeout(() => showSearchSuggestions = false, 200)}
                    />
                    {#if showSearchSuggestions}
                        <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow mt-1">
                            {#each searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())) as suggestion}
                                <li>
                                    <a on:click={() => {
                                        searchQuery = suggestion;
                                        showSearchSuggestions = false;
                                    }}>
                                        <Search class="w-4 h-4" />
                                        {suggestion}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Context Menu" 
            description="Action menus and contextual options"
            code={contextMenuCode}
        >
            <div class="flex items-center space-x-4">
                <div class="card bg-base-200 w-64">
                    <div class="card-body p-4">
                        <div class="flex items-center justify-between">
                            <h4 class="card-title text-base">Sample Document</h4>
                            <div class="dropdown">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    <MoreHorizontal class="w-4 h-4" />
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow">
                                    <li>
                                        <a class="flex items-center">
                                            <Edit3 class="w-4 h-4" />
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Share class="w-4 h-4" />
                                            Share
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Bookmark class="w-4 h-4" />
                                            Bookmark
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Link class="w-4 h-4" />
                                            Copy Link
                                        </a>
                                    </li>
                                    <div class="divider my-1"></div>
                                    <li>
                                        <a class="flex items-center text-error">
                                            <span class="w-4 h-4">🗑️</span>
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="text-sm text-base-content/70">Click the menu button to see contextual actions</p>
                    </div>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles</li>
                <li>✅ Maintains focus management and returns focus to trigger</li>
                <li>✅ Closes on <kbd class="kbd kbd-sm">Escape</kbd> key press</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Outside click automatically closes popover</li>
                <li>✅ Focus trap within popover content when using forms</li>
                <li>✅ Semantic HTML structure with proper tabindex</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- User Actions -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Actions & Menus</h3>
                <div class="flex flex-wrap gap-4">
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-primary">
                            <User class="w-4 h-4 mr-2" />
                            Account
                            <ChevronDown class="w-4 h-4 ml-2" />
                        </div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a><User class="w-4 h-4" />Profile</a></li>
                            <li><a><Settings class="w-4 h-4" />Settings</a></li>
                            <li><a><Bell class="w-4 h-4" />Notifications</a></li>
                            <div class="divider my-1"></div>
                            <li><a>Sign Out</a></li>
                        </ul>
                    </div>

                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-secondary">
                            <Star class="w-4 h-4 mr-2" />
                            Favorites
                        </div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                            <li><a><Calendar class="w-4 h-4" />Calendar App</a></li>
                            <li><a><MessageCircle class="w-4 h-4" />Messages</a></li>
                            <li><a><MapPin class="w-4 h-4" />Maps</a></li>
                            <li><a><Search class="w-4 h-4" />Search</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Information Display -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Information Display</h3>
                <div class="flex flex-wrap gap-4">
                    <!-- Tooltip-style Information -->
                    <div class="dropdown dropdown-hover dropdown-top">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <HelpCircle class="w-5 h-5" />
                        </div>
                        <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-4 shadow-lg">
                            <div class="flex items-start space-x-3">
                                <Info class="w-5 h-5 text-info mt-0.5" />
                                <div>
                                    <h4 class="font-semibold text-sm mb-1">Need Help?</h4>
                                    <p class="text-xs text-base-content/70">
                                        This feature allows you to quickly access your most important tools and settings. 
                                        Hover or click to see what's available.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Status Information -->
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost">
                            Status: Online
                            <div class="w-2 h-2 bg-success rounded-full ml-2"></div>
                        </div>
                        <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-64 p-4 shadow-lg">
                            <h4 class="font-semibold mb-3">System Status</h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">API Server</span>
                                    <div class="badge badge-success badge-sm">Online</div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">Database</span>
                                    <div class="badge badge-success badge-sm">Online</div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">CDN</span>
                                    <div class="badge badge-warning badge-sm">Slow</div>
                                </div>
                            </div>
                            <div class="mt-3 pt-3 border-t">
                                <p class="text-xs text-base-content/70">
                                    Last updated: 2 minutes ago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="card-title">Project Dashboard</h4>
                                <p class="text-sm text-base-content/70">Manage your project settings and team</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <!-- Quick Share -->
                                <div class="dropdown dropdown-left">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        <Share class="w-4 h-4" />
                                    </div>
                                    <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-[1] w-64 p-4 shadow-lg">
                                        <h4 class="font-semibold mb-3">Share Project</h4>
                                        <div class="space-y-3">
                                            <div class="flex items-center space-x-2">
                                                <input type="text" value="https://example.com/project/123" class="input input-bordered input-sm flex-1" readonly />
                                                <button class="btn btn-ghost btn-sm">Copy</button>
                                            </div>
                                            <div class="flex space-x-2">
                                                <button class="btn btn-outline btn-sm flex-1">Email</button>
                                                <button class="btn btn-outline btn-sm flex-1">Slack</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Actions Menu -->
                                <div class="dropdown dropdown-left">
                                    <div tabindex="0" role="button" class="btn btn-primary btn-sm">
                                        Actions
                                        <ChevronDown class="w-4 h-4 ml-1" />
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow">
                                        <li><a><Edit3 class="w-4 h-4" />Edit Project</a></li>
                                        <li><a><User class="w-4 h-4" />Manage Team</a></li>
                                        <li><a><Settings class="w-4 h-4" />Settings</a></li>
                                        <div class="divider my-1"></div>
                                        <li><a><span class="w-4 h-4">📊</span>Analytics</a></li>
                                        <li><a><span class="w-4 h-4">💾</span>Export Data</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>