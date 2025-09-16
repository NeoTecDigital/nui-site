<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Home, ChevronRight, Slash, Dot, FolderOpen, File, Settings, User } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add breadcrumb';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>`;

    const separatorsCode = `<!-- Default (>) -->
<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>

<!-- Custom separators -->
<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Library</a></li>
    <li>Books</li>
  </ul>
</div>`;

    const withIconsCode = `<script>
  import { Home, FolderOpen, File, Settings } from 'lucide-svelte';
<\/script>

<div class="breadcrumbs text-sm">
  <ul>
    <li>
      <a class="flex items-center">
        <Home class="w-4 h-4 mr-1" />
        Home
      </a>
    </li>
    <li>
      <a class="flex items-center">
        <FolderOpen class="w-4 h-4 mr-1" />
        Documents
      </a>
    </li>
    <li class="flex items-center">
      <File class="w-4 h-4 mr-1" />
      Report.pdf
    </li>
  </ul>
</div>`;

    const interactiveCode = `<script>
  let currentPath = ['Home', 'Documents', 'Projects', 'Current File'];
  
  function navigateTo(index) {
    currentPath = currentPath.slice(0, index + 1);
  }
<\/script>

<div class="breadcrumbs text-sm">
  <ul>
    {#each currentPath as item, index}
      <li>
        {#if index < currentPath.length - 1}
          <button 
            class="hover:text-primary"
            on:click={() => navigateTo(index)}
          >
            {item}
          </button>
        {:else}
          <span class="text-base-content font-medium">{item}</span>
        {/if}
      </li>
    {/each}
  </ul>
</div>`;

    const sizesCode = `<!-- Small -->
<div class="breadcrumbs text-xs">
  <ul>
    <li><a>Home</a></li>
    <li><a>Products</a></li>
    <li>MacBook Pro</li>
  </ul>
</div>

<!-- Medium (Default) -->
<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Products</a></li>
    <li>MacBook Pro</li>
  </ul>
</div>

<!-- Large -->
<div class="breadcrumbs text-base">
  <ul>
    <li><a>Home</a></li>
    <li><a>Products</a></li>
    <li>MacBook Pro</li>
  </ul>
</div>`;

    const overflowCode = `<script>
  const longPath = [
    'Home',
    'Documents',
    'Projects',
    'Web Development',
    'Client Projects',
    'Company XYZ',
    'Dashboard',
    'Components',
    'Current File.tsx'
  ];
<\/script>

<!-- Responsive with ellipsis -->
<div class="breadcrumbs text-sm max-w-md">
  <ul class="flex-nowrap">
    <li><a>{longPath[0]}</a></li>
    <li class="hidden sm:block"><a>{longPath[1]}</a></li>
    <li class="hidden md:block">...</li>
    <li class="hidden lg:block"><a>{longPath[longPath.length - 3]}</a></li>
    <li><a>{longPath[longPath.length - 2]}</a></li>
    <li>{longPath[longPath.length - 1]}</li>
  </ul>
</div>`;

    const apiProps = [
        {
            name: 'items',
            type: 'Array<BreadcrumbItem>',
            default: '[]',
            description: 'Array of breadcrumb items with label and optional href'
        },
        {
            name: 'separator',
            type: "'chevron' | 'slash' | 'dot' | ReactNode",
            default: "'chevron'",
            description: 'Type of separator between breadcrumb items'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'sm'",
            description: 'Size of the breadcrumb text and spacing'
        },
        {
            name: 'maxItems',
            type: 'number',
            default: 'undefined',
            description: 'Maximum number of items to show before collapsing'
        },
        {
            name: 'className',
            type: 'string',
            default: "''",
            description: 'Additional CSS classes to apply'
        },
        {
            name: 'onItemClick',
            type: '(item: BreadcrumbItem, index: number) => void',
            default: 'undefined',
            description: 'Callback fired when a breadcrumb item is clicked'
        }
    ];
</script>

<svelte:head>
    <title>Breadcrumb - NUI Components</title>
    <meta name="description" content="Breadcrumb navigation component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Breadcrumb</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Breadcrumb</h1>
                <p class="text-xl text-base-content/70">
                    Navigation breadcrumb trail showing the user's current location in the application hierarchy.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/breadcrumb"
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
            description="Simple breadcrumb navigation with default styling"
            code={basicUsage}
        >
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="#" class="hover:text-primary">Home</a></li>
                    <li><a href="#" class="hover:text-primary">Documents</a></li>
                    <li>Add Document</li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Separators -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Different Separators" 
            description="Various separator styles for different design preferences"
            code={separatorsCode}
        >
            <div class="space-y-4">
                <!-- Default chevron -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Default (Chevron)</p>
                    <div class="breadcrumbs text-sm">
                        <ul>
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li><a href="#" class="hover:text-primary">Documents</a></li>
                            <li>Add Document</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Slash separator -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Slash separator</p>
                    <div class="flex items-center text-sm space-x-2">
                        <a href="#" class="hover:text-primary">Home</a>
                        <Slash class="w-3 h-3 text-base-content/50" />
                        <a href="#" class="hover:text-primary">Library</a>
                        <Slash class="w-3 h-3 text-base-content/50" />
                        <span>Books</span>
                    </div>
                </div>
                
                <!-- Dot separator -->
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Dot separator</p>
                    <div class="flex items-center text-sm space-x-2">
                        <a href="#" class="hover:text-primary">Home</a>
                        <Dot class="w-3 h-3 text-base-content/50" />
                        <a href="#" class="hover:text-primary">Settings</a>
                        <Dot class="w-3 h-3 text-base-content/50" />
                        <span>Profile</span>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Breadcrumbs enhanced with Lucide icons for better visual context"
            code={withIconsCode}
        >
            <div class="breadcrumbs text-sm">
                <ul>
                    <li>
                        <a href="#" class="flex items-center hover:text-primary">
                            <Home class="w-4 h-4 mr-1" />
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center hover:text-primary">
                            <FolderOpen class="w-4 h-4 mr-1" />
                            Documents
                        </a>
                    </li>
                    <li class="flex items-center">
                        <File class="w-4 h-4 mr-1" />
                        Report.pdf
                    </li>
                </ul>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Interactive -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Interactive Navigation" 
            description="Clickable breadcrumb items that update the navigation path"
            code={interactiveCode}
        >
            <div class="space-y-4">
                <div class="breadcrumbs text-sm">
                    <ul>
                        <li>
                            <button class="hover:text-primary" on:click={() => {}}>
                                Home
                            </button>
                        </li>
                        <li>
                            <button class="hover:text-primary" on:click={() => {}}>
                                Documents
                            </button>
                        </li>
                        <li>
                            <button class="hover:text-primary" on:click={() => {}}>
                                Projects
                            </button>
                        </li>
                        <li>
                            <span class="text-base-content font-medium">Current File</span>
                        </li>
                    </ul>
                </div>
                <p class="text-xs text-base-content/70">Click on any breadcrumb item to navigate back</p>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different breadcrumb sizes for various UI contexts"
            code={sizesCode}
        >
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Small (text-xs)</p>
                    <div class="breadcrumbs text-xs">
                        <ul>
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li><a href="#" class="hover:text-primary">Products</a></li>
                            <li>MacBook Pro</li>
                        </ul>
                    </div>
                </div>
                
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Medium (text-sm) - Default</p>
                    <div class="breadcrumbs text-sm">
                        <ul>
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li><a href="#" class="hover:text-primary">Products</a></li>
                            <li>MacBook Pro</li>
                        </ul>
                    </div>
                </div>
                
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Large (text-base)</p>
                    <div class="breadcrumbs text-base">
                        <ul>
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li><a href="#" class="hover:text-primary">Products</a></li>
                            <li>MacBook Pro</li>
                        </ul>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Overflow Handling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Overflow Handling" 
            description="Responsive breadcrumbs with ellipsis for long navigation paths"
            code={overflowCode}
        >
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Responsive with mobile truncation</p>
                    <div class="breadcrumbs text-sm max-w-md border rounded-lg p-3">
                        <ul class="flex-nowrap">
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li class="hidden sm:block"><a href="#" class="hover:text-primary">Documents</a></li>
                            <li class="hidden md:block"><span class="text-base-content/50">...</span></li>
                            <li class="hidden lg:block"><a href="#" class="hover:text-primary">Dashboard</a></li>
                            <li><a href="#" class="hover:text-primary">Components</a></li>
                            <li class="truncate">Very Long File Name.tsx</li>
                        </ul>
                    </div>
                    <p class="text-xs text-base-content/70 mt-2">Resize window to see responsive behavior</p>
                </div>
                
                <div>
                    <p class="text-sm text-base-content/70 mb-2">Collapsed with ellipsis</p>
                    <div class="breadcrumbs text-sm">
                        <ul>
                            <li><a href="#" class="hover:text-primary">Home</a></li>
                            <li><span class="text-base-content/50">...</span></li>
                            <li><a href="#" class="hover:text-primary">Components</a></li>
                            <li>Breadcrumb.svelte</li>
                        </ul>
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
                <li>✅ Uses semantic navigation markup with <code>nav</code> and <code>ol</code> elements</li>
                <li>✅ Includes ARIA labels for screen reader context</li>
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Links have proper focus indicators and hover states</li>
                <li>✅ Current page is marked as non-interactive text</li>
                <li>✅ Separators are decorative and ignored by screen readers</li>
                <li>✅ Maintains logical tab order and navigation flow</li>
                <li>✅ Compatible with voice navigation software</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- File System Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">File System Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="breadcrumbs text-sm mb-4">
                            <ul>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <Home class="w-4 h-4 mr-1" />
                                        Root
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <FolderOpen class="w-4 h-4 mr-1" />
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <FolderOpen class="w-4 h-4 mr-1" />
                                        nui-site
                                    </a>
                                </li>
                                <li class="flex items-center">
                                    <File class="w-4 h-4 mr-1" />
                                    breadcrumb.svelte
                                </li>
                            </ul>
                        </div>
                        <div class="text-sm text-base-content/70">
                            <p>File size: 2.3 KB • Modified: 2 minutes ago</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- E-commerce Category Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">E-commerce Category Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="breadcrumbs text-sm mb-4">
                            <ul>
                                <li><a href="#" class="hover:text-primary">Store</a></li>
                                <li><a href="#" class="hover:text-primary">Electronics</a></li>
                                <li><a href="#" class="hover:text-primary">Computers</a></li>
                                <li><a href="#" class="hover:text-primary">Laptops</a></li>
                                <li>MacBook Pro 16"</li>
                            </ul>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-lg font-semibold">MacBook Pro 16-inch</h4>
                                <p class="text-2xl font-bold text-primary">$2,499</p>
                            </div>
                            <span class="badge badge-success">In Stock</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Admin Dashboard Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Admin Dashboard Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="breadcrumbs text-sm mb-4">
                            <ul>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <Home class="w-4 h-4 mr-1" />
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <User class="w-4 h-4 mr-1" />
                                        Users
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center hover:text-primary">
                                        <Settings class="w-4 h-4 mr-1" />
                                        Permissions
                                    </a>
                                </li>
                                <li>Edit Role</li>
                            </ul>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-lg font-semibold">Edit User Role</h4>
                                <p class="text-sm text-base-content/70">Modify permissions for user: john.doe@example.com</p>
                            </div>
                            <div class="flex gap-2">
                                <button class="btn btn-ghost btn-sm">Cancel</button>
                                <button class="btn btn-primary btn-sm">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Multi-step Form Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Multi-step Form Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="breadcrumbs text-sm mb-4">
                            <ul>
                                <li><a href="#" class="hover:text-primary text-success">Personal Info ✓</a></li>
                                <li><a href="#" class="hover:text-primary text-success">Contact Details ✓</a></li>
                                <li><span class="text-primary font-medium">Payment Method</span></li>
                                <li><span class="text-base-content/50">Review & Submit</span></li>
                            </ul>
                        </div>
                        <div class="space-y-4">
                            <h4 class="text-lg font-semibold">Payment Information</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Card Number</span>
                                    </label>
                                    <input type="text" placeholder="•••• •••• •••• ••••" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Expiry Date</span>
                                    </label>
                                    <input type="text" placeholder="MM/YY" class="input input-bordered" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>