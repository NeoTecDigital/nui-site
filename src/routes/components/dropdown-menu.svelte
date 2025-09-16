<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronDown, Settings, User, LogOut, Edit, Trash2, Copy, Share, MoreVertical, Check, Heart, Star, FileText, Download, ExternalLink, Plus, Filter, SortAsc, Eye } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add dropdown-menu';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<div class="dropdown">
  <label tabindex="0" class="btn">
    Options
    <ChevronDown class="w-4 h-4 ml-2" />
  </label>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>`;

    const withIconsCode = `<script>
  import { User, Settings, LogOut, ChevronDown } from 'lucide-svelte';
<\/script>

<div class="dropdown">
  <label tabindex="0" class="btn">
    User Menu
    <ChevronDown class="w-4 h-4 ml-2" />
  </label>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li>
      <a>
        <User class="w-4 h-4" />
        Profile
      </a>
    </li>
    <li>
      <a>
        <Settings class="w-4 h-4" />
        Settings
      </a>
    </li>
    <li><hr class="my-1" /></li>
    <li>
      <a class="text-error">
        <LogOut class="w-4 h-4" />
        Logout
      </a>
    </li>
  </ul>
</div>`;

    const positionsCode = `<div class="flex flex-wrap gap-4">
  <!-- Dropdown End -->
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-outline">End</label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>

  <!-- Dropdown Top -->
  <div class="dropdown dropdown-top">
    <label tabindex="0" class="btn btn-outline">Top</label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>

  <!-- Dropdown Bottom -->
  <div class="dropdown dropdown-bottom">
    <label tabindex="0" class="btn btn-outline">Bottom</label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
</div>`;

    const disabledItemsCode = `<div class="dropdown">
  <label tabindex="0" class="btn">
    Actions
    <ChevronDown class="w-4 h-4 ml-2" />
  </label>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Available Action</a></li>
    <li class="disabled"><a>Disabled Action</a></li>
    <li><a>Another Action</a></li>
    <li class="disabled"><a>Also Disabled</a></li>
  </ul>
</div>`;

    const checkableItemsCode = `<script>
  let selectedOptions = ['option1'];
  
  function toggleOption(option) {
    if (selectedOptions.includes(option)) {
      selectedOptions = selectedOptions.filter(o => o !== option);
    } else {
      selectedOptions = [...selectedOptions, option];
    }
  }
<\/script>

<div class="dropdown">
  <label tabindex="0" class="btn">
    Filters ({selectedOptions.length})
    <ChevronDown class="w-4 h-4 ml-2" />
  </label>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li>
      <label class="label cursor-pointer">
        <span class="label-text">Option 1</span>
        <input 
          type="checkbox" 
          class="checkbox checkbox-sm" 
          checked={selectedOptions.includes('option1')}
          on:change={() => toggleOption('option1')}
        />
      </label>
    </li>
    <li>
      <label class="label cursor-pointer">
        <span class="label-text">Option 2</span>
        <input 
          type="checkbox" 
          class="checkbox checkbox-sm" 
          checked={selectedOptions.includes('option2')}
          on:change={() => toggleOption('option2')}
        />
      </label>
    </li>
    <li>
      <label class="label cursor-pointer">
        <span class="label-text">Option 3</span>
        <input 
          type="checkbox" 
          class="checkbox checkbox-sm" 
          checked={selectedOptions.includes('option3')}
          on:change={() => toggleOption('option3')}
        />
      </label>
    </li>
  </ul>
</div>`;

    const submenuCode = `<div class="dropdown">
  <label tabindex="0" class="btn">
    File Menu
    <ChevronDown class="w-4 h-4 ml-2" />
  </label>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>New File</a></li>
    <li><a>Open</a></li>
    <li>
      <details>
        <summary>Recent Files</summary>
        <ul class="p-2">
          <li><a>project.txt</a></li>
          <li><a>notes.md</a></li>
          <li><a>README.md</a></li>
        </ul>
      </details>
    </li>
    <li><hr class="my-1" /></li>
    <li><a>Exit</a></li>
  </ul>
</div>`;

    const triggerVariantsCode = `<div class="flex flex-wrap gap-4">
  <!-- Icon Button -->
  <div class="dropdown">
    <label tabindex="0" class="btn btn-square btn-ghost">
      <MoreVertical class="w-5 h-5" />
    </label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Edit</a></li>
      <li><a>Delete</a></li>
    </ul>
  </div>

  <!-- Avatar Trigger -->
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content font-semibold">
          JD
        </div>
      </div>
    </label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Profile</a></li>
      <li><a>Settings</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>

  <!-- Custom Trigger -->
  <div class="dropdown">
    <label tabindex="0" class="btn btn-outline">
      <Filter class="w-4 h-4" />
      Filter Options
    </label>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
      <li><a>Show All</a></li>
      <li><a>Active Only</a></li>
      <li><a>Inactive Only</a></li>
    </ul>
  </div>
</div>`;

    // Component state for interactive examples
    let selectedFilters = ['active'];
    
    function toggleFilter(filter) {
        if (selectedFilters.includes(filter)) {
            selectedFilters = selectedFilters.filter(f => f !== filter);
        } else {
            selectedFilters = [...selectedFilters, filter];
        }
    }

    const apiProps = [
        {
            name: 'dropdown',
            type: 'class',
            default: "''",
            description: 'Base dropdown container class'
        },
        {
            name: 'dropdown-end',
            type: 'class',
            default: "''",
            description: 'Positions dropdown to the right'
        },
        {
            name: 'dropdown-top',
            type: 'class',
            default: "''",
            description: 'Opens dropdown upward'
        },
        {
            name: 'dropdown-bottom',
            type: 'class',
            default: "''",
            description: 'Opens dropdown downward'
        },
        {
            name: 'dropdown-left',
            type: 'class',
            default: "''",
            description: 'Positions dropdown to the left'
        },
        {
            name: 'dropdown-right',
            type: 'class',
            default: "''",
            description: 'Positions dropdown to the right'
        },
        {
            name: 'dropdown-open',
            type: 'class',
            default: "''",
            description: 'Forces dropdown to stay open'
        },
        {
            name: 'dropdown-hover',
            type: 'class',
            default: "''",
            description: 'Opens dropdown on hover'
        }
    ];
</script>

<svelte:head>
    <title>Dropdown Menu - NUI Components</title>
    <meta name="description" content="Dropdown Menu component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Dropdown Menu</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Dropdown Menu</h1>
                <p class="text-xl text-base-content/70">
                    Display a list of actions or options in a floating menu triggered by a button or other element.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/dropdown-menu"
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
            description="Simple dropdown menu with basic items"
            code={basicUsage}
        >
            <div class="dropdown">
                <label tabindex="0" class="btn">
                    Options
                    <ChevronDown class="w-4 h-4 ml-2" />
                </label>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Dropdown menu items with Lucide icons and dividers"
            code={withIconsCode}
        >
            <div class="dropdown">
                <label tabindex="0" class="btn">
                    User Menu
                    <ChevronDown class="w-4 h-4 ml-2" />
                </label>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <a>
                            <User class="w-4 h-4" />
                            Profile
                        </a>
                    </li>
                    <li>
                        <a>
                            <Settings class="w-4 h-4" />
                            Settings
                        </a>
                    </li>
                    <li><hr class="my-1" /></li>
                    <li>
                        <a class="text-error">
                            <LogOut class="w-4 h-4" />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Positioning -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Positioning" 
            description="Different dropdown positioning options"
            code={positionsCode}
        >
            <div class="flex flex-wrap gap-4">
                <!-- Dropdown End -->
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-outline">End</label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                <!-- Dropdown Top -->
                <div class="dropdown dropdown-top">
                    <label tabindex="0" class="btn btn-outline">Top</label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                <!-- Dropdown Bottom -->
                <div class="dropdown dropdown-bottom">
                    <label tabindex="0" class="btn btn-outline">Bottom</label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Disabled Items -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Disabled Items" 
            description="Dropdown menu with disabled items that cannot be interacted with"
            code={disabledItemsCode}
        >
            <div class="dropdown">
                <label tabindex="0" class="btn">
                    Actions
                    <ChevronDown class="w-4 h-4 ml-2" />
                </label>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>Available Action</a></li>
                    <li class="disabled"><a>Disabled Action</a></li>
                    <li><a>Another Action</a></li>
                    <li class="disabled"><a>Also Disabled</a></li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Checkable Items -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Checkable Items" 
            description="Dropdown menu with checkboxes for multi-select functionality"
            code={checkableItemsCode}
        >
            <div class="dropdown">
                <label tabindex="0" class="btn">
                    Filters ({selectedFilters.length})
                    <ChevronDown class="w-4 h-4 ml-2" />
                </label>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <label class="label cursor-pointer">
                            <span class="label-text">Active Items</span>
                            <input 
                                type="checkbox" 
                                class="checkbox checkbox-sm" 
                                checked={selectedFilters.includes('active')}
                                on:change={() => toggleFilter('active')}
                            />
                        </label>
                    </li>
                    <li>
                        <label class="label cursor-pointer">
                            <span class="label-text">Pending Items</span>
                            <input 
                                type="checkbox" 
                                class="checkbox checkbox-sm" 
                                checked={selectedFilters.includes('pending')}
                                on:change={() => toggleFilter('pending')}
                            />
                        </label>
                    </li>
                    <li>
                        <label class="label cursor-pointer">
                            <span class="label-text">Completed Items</span>
                            <input 
                                type="checkbox" 
                                class="checkbox checkbox-sm" 
                                checked={selectedFilters.includes('completed')}
                                on:change={() => toggleFilter('completed')}
                            />
                        </label>
                    </li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Submenus -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Submenus" 
            description="Nested dropdown menus with collapsible sections"
            code={submenuCode}
        >
            <div class="dropdown">
                <label tabindex="0" class="btn">
                    File Menu
                    <ChevronDown class="w-4 h-4 ml-2" />
                </label>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>New File</a></li>
                    <li><a>Open</a></li>
                    <li>
                        <details>
                            <summary>Recent Files</summary>
                            <ul class="p-2">
                                <li><a>project.txt</a></li>
                                <li><a>notes.md</a></li>
                                <li><a>README.md</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><hr class="my-1" /></li>
                    <li><a>Exit</a></li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Trigger Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Trigger Variants" 
            description="Different button styles and triggers for dropdown menus"
            code={triggerVariantsCode}
        >
            <div class="flex flex-wrap gap-4">
                <!-- Icon Button -->
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-square btn-ghost">
                        <MoreVertical class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a><Edit class="w-4 h-4" />Edit</a></li>
                        <li><a><Trash2 class="w-4 h-4" />Delete</a></li>
                    </ul>
                </div>

                <!-- Avatar Trigger -->
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content font-semibold">
                                JD
                            </div>
                        </div>
                    </label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a><User class="w-4 h-4" />Profile</a></li>
                        <li><a><Settings class="w-4 h-4" />Settings</a></li>
                        <li><a><LogOut class="w-4 h-4" />Logout</a></li>
                    </ul>
                </div>

                <!-- Custom Trigger -->
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-outline">
                        <Filter class="w-4 h-4" />
                        Filter Options
                    </label>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                        <li><a><Eye class="w-4 h-4" />Show All</a></li>
                        <li><a><Check class="w-4 h-4" />Active Only</a></li>
                        <li><a>Inactive Only</a></li>
                    </ul>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd>, <kbd class="kbd kbd-sm">Enter</kbd>, and <kbd class="kbd kbd-sm">Escape</kbd></li>
                <li>✅ Uses proper ARIA attributes and roles for menu behavior</li>
                <li>✅ Maintains focus management when opening and closing</li>
                <li>✅ Supports screen reader announcements</li>
                <li>✅ Arrow key navigation within menu items</li>
                <li>✅ Automatic focus trapping when dropdown is open</li>
                <li>✅ Compatible with high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Action Menu -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Action Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-semibold">Document.pdf</h4>
                                <p class="text-sm text-base-content/70">Last modified 2 hours ago</p>
                            </div>
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-sm">
                                    <MoreVertical class="w-4 h-4" />
                                </label>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li>
                                        <a>
                                            <Download class="w-4 h-4" />
                                            Download
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Share class="w-4 h-4" />
                                            Share
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Copy class="w-4 h-4" />
                                            Copy Link
                                        </a>
                                    </li>
                                    <li><hr class="my-1" /></li>
                                    <li>
                                        <a>
                                            <Edit class="w-4 h-4" />
                                            Rename
                                        </a>
                                    </li>
                                    <li>
                                        <a class="text-error">
                                            <Trash2 class="w-4 h-4" />
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Context Menu -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Context Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-semibold">Task List</h4>
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-outline btn-sm">
                                    <Plus class="w-4 h-4 mr-2" />
                                    Add Task
                                </label>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><a><FileText class="w-4 h-4" />New Task</a></li>
                                    <li><a><Copy class="w-4 h-4" />Duplicate Task</a></li>
                                    <li><a><Plus class="w-4 h-4" />Add Subtask</a></li>
                                    <li><hr class="my-1" /></li>
                                    <li><a><Star class="w-4 h-4" />Add to Favorites</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center space-x-3">
                                <input type="checkbox" class="checkbox checkbox-sm" checked />
                                <span class="line-through text-base-content/70">Complete project setup</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <input type="checkbox" class="checkbox checkbox-sm" />
                                <span>Write documentation</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <input type="checkbox" class="checkbox checkbox-sm" />
                                <span>Deploy to production</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Dropdown -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Filter and Sort Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-semibold">Product List</h4>
                            <div class="flex space-x-2">
                                <div class="dropdown">
                                    <label tabindex="0" class="btn btn-outline btn-sm">
                                        <Filter class="w-4 h-4 mr-2" />
                                        Filter
                                    </label>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a><Check class="w-4 h-4" />All Products</a></li>
                                        <li><a>In Stock Only</a></li>
                                        <li><a>On Sale</a></li>
                                        <li><a>New Arrivals</a></li>
                                        <li><hr class="my-1" /></li>
                                        <li><a>Clear Filters</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <label tabindex="0" class="btn btn-outline btn-sm">
                                        <SortAsc class="w-4 h-4 mr-2" />
                                        Sort
                                    </label>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a><Check class="w-4 h-4" />Name A-Z</a></li>
                                        <li><a>Name Z-A</a></li>
                                        <li><a>Price Low to High</a></li>
                                        <li><a>Price High to Low</a></li>
                                        <li><a>Newest First</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="text-sm text-base-content/70">
                            Showing 12 of 48 products
                        </div>
                    </div>
                </div>
            </div>

            <!-- User Profile Menu -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Profile Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="w-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">
                                        JS
                                    </div>
                                </div>
                                <div>
                                    <h4 class="font-semibold">John Smith</h4>
                                    <p class="text-sm text-base-content/70">john@example.com</p>
                                </div>
                            </div>
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-sm">
                                    <MoreVertical class="w-4 h-4" />
                                </label>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li>
                                        <a>
                                            <User class="w-4 h-4" />
                                            View Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Edit class="w-4 h-4" />
                                            Edit Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Settings class="w-4 h-4" />
                                            Account Settings
                                        </a>
                                    </li>
                                    <li><hr class="my-1" /></li>
                                    <li>
                                        <a>
                                            <Heart class="w-4 h-4" />
                                            Favorites
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <ExternalLink class="w-4 h-4" />
                                            Help Center
                                        </a>
                                    </li>
                                    <li><hr class="my-1" /></li>
                                    <li>
                                        <a class="text-error">
                                            <LogOut class="w-4 h-4" />
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>