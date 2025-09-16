<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Menu, X, Settings, User, Bell, Search, ChevronRight, MessageSquare, FileText, Download } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add sheet';

    const basicUsage = `<script>
  import { Sheet } from '@nui/core';
<\/script>

<!-- Button to open sheet -->
<button class="btn btn-primary" onclick="my_drawer.showModal()">Open Sheet</button>

<!-- Sheet/Drawer -->
<div class="drawer">
  <input id="my_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
  </div>
  <div class="drawer-side">
    <label for="my_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200 text-base-content">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-4">Sheet Content</h3>
        <p>This is a side panel sheet component.</p>
      </div>
    </aside>
  </div>
</div>`;

    const positionsCode = `<!-- Left Sheet (Default) -->
<div class="drawer">
  <input id="left_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="left_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Left Sheet</h3>
        <p>Content slides in from the left side.</p>
      </div>
    </aside>
  </div>
</div>

<!-- Right Sheet -->
<div class="drawer drawer-end">
  <input id="right_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="right_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Right Sheet</h3>
        <p>Content slides in from the right side.</p>
      </div>
    </aside>
  </div>
</div>

<!-- Modal-based Top Sheet -->
<dialog id="top_sheet" class="modal">
  <div class="modal-box w-full max-w-none rounded-b-lg rounded-t-none top-0 transform translate-y-0">
    <h3 class="text-lg font-bold">Top Sheet</h3>
    <p class="py-4">Content slides down from the top.</p>
    <div class="modal-action">
      <button class="btn" onclick="top_sheet.close()">Close</button>
    </div>
  </div>
</dialog>

<!-- Modal-based Bottom Sheet -->
<dialog id="bottom_sheet" class="modal">
  <div class="modal-box w-full max-w-none rounded-t-lg rounded-b-none bottom-0 transform translate-y-0">
    <h3 class="text-lg font-bold">Bottom Sheet</h3>
    <p class="py-4">Content slides up from the bottom.</p>
    <div class="modal-action">
      <button class="btn" onclick="bottom_sheet.close()">Close</button>
    </div>
  </div>
</dialog>`;

    const sizesCode = `<!-- Small Sheet -->
<div class="drawer drawer-end">
  <input id="small_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="small_drawer" class="drawer-overlay"></label>
    <aside class="w-64 min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Small Sheet</h3>
        <p>256px width (w-64)</p>
      </div>
    </aside>
  </div>
</div>

<!-- Medium Sheet -->
<div class="drawer drawer-end">
  <input id="medium_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="medium_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Medium Sheet</h3>
        <p>320px width (w-80)</p>
      </div>
    </aside>
  </div>
</div>

<!-- Large Sheet -->
<div class="drawer drawer-end">
  <input id="large_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="large_drawer" class="drawer-overlay"></label>
    <aside class="w-96 min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Large Sheet</h3>
        <p>384px width (w-96)</p>
      </div>
    </aside>
  </div>
</div>

<!-- Extra Large Sheet -->
<div class="drawer drawer-end">
  <input id="xl_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="xl_drawer" class="drawer-overlay"></label>
    <aside class="w-[500px] min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">XL Sheet</h3>
        <p>500px width</p>
      </div>
    </aside>
  </div>
</div>

<!-- Full Width Sheet -->
<div class="drawer drawer-end">
  <input id="full_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="full_drawer" class="drawer-overlay"></label>
    <aside class="w-full min-h-full bg-base-200">
      <div class="p-4">
        <h3 class="text-lg font-bold">Full Width Sheet</h3>
        <p>Takes up the entire screen width</p>
      </div>
    </aside>
  </div>
</div>`;

    const navigationSheetCode = `<div class="drawer">
  <input id="nav_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="nav_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200">
      <div class="p-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Navigation</h3>
          <label for="nav_drawer" class="btn btn-ghost btn-sm btn-circle">
            <X class="w-4 h-4" />
          </label>
        </div>
        <nav class="space-y-2">
          <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
            <User class="w-5 h-5" />
            <span>Profile</span>
            <ChevronRight class="w-4 h-4 ml-auto" />
          </a>
          <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
            <Settings class="w-5 h-5" />
            <span>Settings</span>
            <ChevronRight class="w-4 h-4 ml-auto" />
          </a>
          <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
            <Bell class="w-5 h-5" />
            <span>Notifications</span>
            <ChevronRight class="w-4 h-4 ml-auto" />
          </a>
          <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
            <MessageSquare class="w-5 h-5" />
            <span>Messages</span>
            <ChevronRight class="w-4 h-4 ml-auto" />
          </a>
        </nav>
      </div>
    </aside>
  </div>
</div>`;

    const formSheetCode = `<div class="drawer drawer-end">
  <input id="form_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="form_drawer" class="drawer-overlay"></label>
    <aside class="w-96 min-h-full bg-base-200">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Create New Item</h3>
          <label for="form_drawer" class="btn btn-ghost btn-sm btn-circle">
            <X class="w-4 h-4" />
          </label>
        </div>
        <form class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input type="text" class="input input-bordered" placeholder="Enter title" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea class="textarea textarea-bordered" placeholder="Enter description"></textarea>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered">
              <option disabled selected>Choose category</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Important</option>
            </select>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Make public</span>
              <input type="checkbox" class="checkbox checkbox-primary" />
            </label>
          </div>
          <div class="flex gap-2 pt-4">
            <label for="form_drawer" class="btn btn-ghost flex-1">Cancel</label>
            <button type="submit" class="btn btn-primary flex-1">Create</button>
          </div>
        </form>
      </div>
    </aside>
  </div>
</div>`;

    const scrollableSheetCode = `<div class="drawer drawer-end">
  <input id="scroll_drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side">
    <label for="scroll_drawer" class="drawer-overlay"></label>
    <aside class="w-80 min-h-full bg-base-200">
      <div class="sticky top-0 bg-base-200 border-b border-base-300 p-4 z-10">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">Scrollable Content</h3>
          <label for="scroll_drawer" class="btn btn-ghost btn-sm btn-circle">
            <X class="w-4 h-4" />
          </label>
        </div>
      </div>
      <div class="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
        <!-- Lots of content to demonstrate scrolling -->
        {#each Array(20) as _, i}
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body p-4">
              <h4 class="card-title text-base">Item {i + 1}</h4>
              <p class="text-sm text-base-content/70">This is scrollable content item {i + 1}. The header stays fixed while this content scrolls.</p>
            </div>
          </div>
        {/each}
      </div>
    </aside>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'position',
            type: "'left' | 'right' | 'top' | 'bottom'",
            default: "'left'",
            description: 'Position from which the sheet slides in'
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
            default: "'md'",
            description: 'Size of the sheet panel'
        },
        {
            name: 'overlay',
            type: 'boolean',
            default: 'true',
            description: 'Whether to show backdrop overlay'
        },
        {
            name: 'closeOnOutsideClick',
            type: 'boolean',
            default: 'true',
            description: 'Close sheet when clicking outside'
        },
        {
            name: 'closeOnEscape',
            type: 'boolean',
            default: 'true',
            description: 'Close sheet when pressing escape key'
        },
        {
            name: 'scrollable',
            type: 'boolean',
            default: 'true',
            description: 'Allow content to scroll independently'
        },
        {
            name: 'class',
            type: 'string',
            default: "''",
            description: 'Additional CSS classes for the sheet container'
        },
        {
            name: 'headerClass',
            type: 'string',
            default: "''",
            description: 'CSS classes for the sheet header'
        },
        {
            name: 'contentClass',
            type: 'string',
            default: "''",
            description: 'CSS classes for the sheet content area'
        }
    ];

    // Sheet state management
    let showBasicSheet = false;
    let showLeftSheet = false;
    let showRightSheet = false;
    let showTopSheet = false;
    let showBottomSheet = false;
    let showSmallSheet = false;
    let showMediumSheet = false;
    let showLargeSheet = false;
    let showXLSheet = false;
    let showFullSheet = false;
    let showNavigationSheet = false;
    let showFormSheet = false;
    let showScrollableSheet = false;
    let showSettingsSheet = false;
    let showProfileSheet = false;

    // Form data
    let formData = {
        title: '',
        description: '',
        category: '',
        isPublic: false
    };

    function handleFormSubmit() {
        console.log('Form submitted:', formData);
        showFormSheet = false;
    }

    function resetForm() {
        formData = {
            title: '',
            description: '',
            category: '',
            isPublic: false
        };
    }
</script>

<svelte:head>
    <title>Sheet - NUI Components</title>
    <meta name="description" content="Sheet component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Sheet</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Sheet</h1>
                <p class="text-xl text-base-content/70">
                    Side panel component that slides in from the edges of the screen to display additional content, forms, or navigation.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/sheet"
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
            title="Basic Sheet" 
            description="Simple side panel sheet that slides in from the left"
            code={basicUsage}
        >
            <div class="space-y-4">
                <button class="btn btn-primary" on:click={() => showBasicSheet = true}>
                    <Menu class="w-4 h-4 mr-2" />
                    Open Basic Sheet
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sheet Positions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sheet Positions" 
            description="Sheets can slide in from any edge of the screen"
            code={positionsCode}
        >
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button class="btn btn-outline" on:click={() => showLeftSheet = true}>
                    Left Sheet
                </button>
                <button class="btn btn-outline" on:click={() => showRightSheet = true}>
                    Right Sheet
                </button>
                <button class="btn btn-outline" on:click={() => showTopSheet = true}>
                    Top Sheet
                </button>
                <button class="btn btn-outline" on:click={() => showBottomSheet = true}>
                    Bottom Sheet
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sheet Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sheet Sizes" 
            description="Different sheet sizes from small to full-screen"
            code={sizesCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-outline btn-sm" on:click={() => showSmallSheet = true}>
                    Small (256px)
                </button>
                <button class="btn btn-outline" on:click={() => showMediumSheet = true}>
                    Medium (320px)
                </button>
                <button class="btn btn-outline btn-lg" on:click={() => showLargeSheet = true}>
                    Large (384px)
                </button>
                <button class="btn btn-outline" on:click={() => showXLSheet = true}>
                    XL (500px)
                </button>
                <button class="btn btn-outline btn-wide" on:click={() => showFullSheet = true}>
                    Full Width
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Navigation Sheet -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Navigation Sheet" 
            description="Sheet used for navigation menus and app structure"
            code={navigationSheetCode}
        >
            <div class="space-y-4">
                <button class="btn btn-secondary" on:click={() => showNavigationSheet = true}>
                    <Menu class="w-4 h-4 mr-2" />
                    Open Navigation
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Form Sheet -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Form Sheet" 
            description="Sheet containing form elements for data input"
            code={formSheetCode}
        >
            <div class="space-y-4">
                <button class="btn btn-accent" on:click={() => showFormSheet = true}>
                    <FileText class="w-4 h-4 mr-2" />
                    Create New Item
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Scrollable Content -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Scrollable Content" 
            description="Sheet with fixed header and scrollable content area"
            code={scrollableSheetCode}
        >
            <div class="space-y-4">
                <button class="btn btn-info" on:click={() => showScrollableSheet = true}>
                    <Download class="w-4 h-4 mr-2" />
                    Long Content List
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Escape</kbd> to close</li>
                <li>✅ Includes proper ARIA attributes and landmark roles</li>
                <li>✅ Maintains focus management and traps focus within sheet</li>
                <li>✅ Returns focus to trigger element when closed</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Backdrop click closes the sheet by default</li>
                <li>✅ Proper semantic structure with headings and landmarks</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Mobile Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Mobile Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Navigation Menu</h4>
                        <p>Slide-out navigation perfect for mobile responsive designs where space is limited.</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-sm" on:click={() => showNavigationSheet = true}>
                                Try it
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
                        <h4 class="card-title">Configuration Options</h4>
                        <p>Side panel for application settings, user preferences, and configuration options.</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-secondary btn-sm" on:click={() => showSettingsSheet = true}>
                                <Settings class="w-4 h-4 mr-2" />
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Action Panel</h4>
                        <p>Contextual actions and shortcuts that slide in from the side for quick access.</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-accent btn-sm" on:click={() => showFormSheet = true}>
                                Quick Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Profile Details -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Profile Details</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">User Information</h4>
                        <p>Detailed user profile information and account management options in a side panel.</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-info btn-sm" on:click={() => showProfileSheet = true}>
                                <User class="w-4 h-4 mr-2" />
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Actual Sheet Components -->

<!-- Basic Sheet -->
{#if showBasicSheet}
    <div class="drawer drawer-open">
        <input id="basic_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <!-- Invisible content area -->
        </div>
        <div class="drawer-side">
            <label for="basic_drawer" class="drawer-overlay" on:click={() => showBasicSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200 text-base-content">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Basic Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showBasicSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p class="mb-4">This is a basic sheet component that slides in from the left side of the screen.</p>
                    <div class="space-y-2">
                        <div class="bg-base-100 p-3 rounded-lg">
                            <h4 class="font-semibold">Feature 1</h4>
                            <p class="text-sm text-base-content/70">Description of feature</p>
                        </div>
                        <div class="bg-base-100 p-3 rounded-lg">
                            <h4 class="font-semibold">Feature 2</h4>
                            <p class="text-sm text-base-content/70">Another feature description</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Left Sheet -->
{#if showLeftSheet}
    <div class="drawer drawer-open">
        <input id="left_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="left_drawer" class="drawer-overlay" on:click={() => showLeftSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Left Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showLeftSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p>Content slides in from the left side of the screen.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Right Sheet -->
{#if showRightSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="right_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="right_drawer" class="drawer-overlay" on:click={() => showRightSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Right Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showRightSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p>Content slides in from the right side of the screen.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Top Sheet -->
{#if showTopSheet}
    <dialog class="modal modal-open">
        <div class="modal-box w-full max-w-none rounded-b-lg rounded-t-none m-0 p-0" style="position: fixed; top: 0; transform: none;">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold">Top Sheet</h3>
                    <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showTopSheet = false}>
                        <X class="w-4 h-4" />
                    </button>
                </div>
                <p class="mb-4">Content slides down from the top of the screen.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-base-200 p-4 rounded-lg">
                        <h4 class="font-semibold">Section 1</h4>
                        <p class="text-sm">Content here</p>
                    </div>
                    <div class="bg-base-200 p-4 rounded-lg">
                        <h4 class="font-semibold">Section 2</h4>
                        <p class="text-sm">Content here</p>
                    </div>
                    <div class="bg-base-200 p-4 rounded-lg">
                        <h4 class="font-semibold">Section 3</h4>
                        <p class="text-sm">Content here</p>
                    </div>
                </div>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showTopSheet = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Bottom Sheet -->
{#if showBottomSheet}
    <dialog class="modal modal-open">
        <div class="modal-box w-full max-w-none rounded-t-lg rounded-b-none m-0 p-0" style="position: fixed; bottom: 0; transform: none;">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold">Bottom Sheet</h3>
                    <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showBottomSheet = false}>
                        <X class="w-4 h-4" />
                    </button>
                </div>
                <p class="mb-4">Content slides up from the bottom of the screen.</p>
                <div class="space-y-3">
                    <button class="btn btn-outline btn-block">Action 1</button>
                    <button class="btn btn-outline btn-block">Action 2</button>
                    <button class="btn btn-primary btn-block">Primary Action</button>
                </div>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showBottomSheet = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Small Sheet -->
{#if showSmallSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="small_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="small_drawer" class="drawer-overlay" on:click={() => showSmallSheet = false}></label>
            <aside class="w-64 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Small Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showSmallSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p class="text-sm">256px width (w-64). Perfect for simple actions or quick info.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Medium Sheet -->
{#if showMediumSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="medium_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="medium_drawer" class="drawer-overlay" on:click={() => showMediumSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Medium Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showMediumSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p>320px width (w-80). Good balance for most content and forms.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Large Sheet -->
{#if showLargeSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="large_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="large_drawer" class="drawer-overlay" on:click={() => showLargeSheet = false}></label>
            <aside class="w-96 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">Large Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showLargeSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p>384px width (w-96). Great for complex forms and detailed content.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- XL Sheet -->
{#if showXLSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="xl_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="xl_drawer" class="drawer-overlay" on:click={() => showXLSheet = false}></label>
            <aside class="w-[500px] min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">XL Sheet</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showXLSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <p>500px width. Perfect for dashboards and rich content layouts.</p>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Full Width Sheet -->
{#if showFullSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="full_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="full_drawer" class="drawer-overlay" on:click={() => showFullSheet = false}></label>
            <aside class="w-full min-h-full bg-base-200">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold">Full Width Sheet</h3>
                        <button class="btn btn-ghost btn-circle" on:click={() => showFullSheet = false}>
                            <X class="w-6 h-6" />
                        </button>
                    </div>
                    <p class="mb-6">Takes up the entire screen width. Perfect for immersive experiences.</p>
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title">Section 1</h4>
                                <p>Full width allows for complex layouts</p>
                            </div>
                        </div>
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title">Section 2</h4>
                                <p>Multiple columns and rich content</p>
                            </div>
                        </div>
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title">Section 3</h4>
                                <p>Dashboard-style layouts</p>
                            </div>
                        </div>
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title">Section 4</h4>
                                <p>Immersive experiences</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Navigation Sheet -->
{#if showNavigationSheet}
    <div class="drawer drawer-open">
        <input id="nav_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="nav_drawer" class="drawer-overlay" on:click={() => showNavigationSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold">Navigation</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showNavigationSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <nav class="space-y-2">
                        <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                            <User class="w-5 h-5" />
                            <span>Profile</span>
                            <ChevronRight class="w-4 h-4 ml-auto" />
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                            <Settings class="w-5 h-5" />
                            <span>Settings</span>
                            <ChevronRight class="w-4 h-4 ml-auto" />
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                            <Bell class="w-5 h-5" />
                            <span>Notifications</span>
                            <span class="badge badge-primary badge-sm ml-auto">3</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                            <MessageSquare class="w-5 h-5" />
                            <span>Messages</span>
                            <ChevronRight class="w-4 h-4 ml-auto" />
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                            <Search class="w-5 h-5" />
                            <span>Search</span>
                            <ChevronRight class="w-4 h-4 ml-auto" />
                        </a>
                    </nav>
                    <div class="divider"></div>
                    <div class="space-y-2">
                        <button class="btn btn-primary btn-block">Sign Out</button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Form Sheet -->
{#if showFormSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="form_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="form_drawer" class="drawer-overlay" on:click={() => showFormSheet = false}></label>
            <aside class="w-96 min-h-full bg-base-200">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold">Create New Item</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showFormSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <form class="space-y-4" on:submit|preventDefault={handleFormSubmit}>
                        <div class="form-control">
                            <label class="label" for="title">
                                <span class="label-text">Title</span>
                            </label>
                            <input 
                                id="title"
                                type="text" 
                                class="input input-bordered" 
                                placeholder="Enter title"
                                bind:value={formData.title}
                                required
                            />
                        </div>
                        <div class="form-control">
                            <label class="label" for="description">
                                <span class="label-text">Description</span>
                            </label>
                            <textarea 
                                id="description"
                                class="textarea textarea-bordered" 
                                placeholder="Enter description"
                                bind:value={formData.description}
                                rows="4"
                            ></textarea>
                        </div>
                        <div class="form-control">
                            <label class="label" for="category">
                                <span class="label-text">Category</span>
                            </label>
                            <select id="category" class="select select-bordered" bind:value={formData.category}>
                                <option disabled selected value="">Choose category</option>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="important">Important</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <span class="label-text">Make public</span>
                                <input 
                                    type="checkbox" 
                                    class="checkbox checkbox-primary" 
                                    bind:checked={formData.isPublic}
                                />
                            </label>
                        </div>
                        <div class="flex gap-2 pt-4">
                            <button type="button" class="btn btn-ghost flex-1" on:click={() => { showFormSheet = false; resetForm(); }}>
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary flex-1">
                                <FileText class="w-4 h-4 mr-2" />
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Scrollable Sheet -->
{#if showScrollableSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="scroll_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="scroll_drawer" class="drawer-overlay" on:click={() => showScrollableSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="sticky top-0 bg-base-200 border-b border-base-300 p-4 z-10">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-bold">Scrollable Content</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showScrollableSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div class="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {#each Array(20) as _, i}
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-4">
                                <h4 class="card-title text-base">Item {i + 1}</h4>
                                <p class="text-sm text-base-content/70">This is scrollable content item {i + 1}. The header stays fixed while this content scrolls smoothly.</p>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-xs btn-ghost">View</button>
                                    <button class="btn btn-xs btn-primary">Edit</button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Settings Sheet -->
{#if showSettingsSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="settings_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="settings_drawer" class="drawer-overlay" on:click={() => showSettingsSheet = false}></label>
            <aside class="w-96 min-h-full bg-base-200">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold">Settings</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showSettingsSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-semibold mb-3">Appearance</h4>
                            <div class="space-y-2">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Dark mode</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                                <label class="cursor-pointer label">
                                    <span class="label-text">High contrast</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div>
                            <h4 class="font-semibold mb-3">Notifications</h4>
                            <div class="space-y-2">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Email notifications</span>
                                    <input type="checkbox" class="toggle toggle-primary" checked />
                                </label>
                                <label class="cursor-pointer label">
                                    <span class="label-text">Push notifications</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div>
                            <h4 class="font-semibold mb-3">Privacy</h4>
                            <div class="space-y-2">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Analytics</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                                <label class="cursor-pointer label">
                                    <span class="label-text">Marketing emails</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}

<!-- Profile Sheet -->
{#if showProfileSheet}
    <div class="drawer drawer-end drawer-open">
        <input id="profile_drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content"></div>
        <div class="drawer-side">
            <label for="profile_drawer" class="drawer-overlay" on:click={() => showProfileSheet = false}></label>
            <aside class="w-80 min-h-full bg-base-200">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold">Profile</h3>
                        <button class="btn btn-ghost btn-sm btn-circle" on:click={() => showProfileSheet = false}>
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="text-center mb-6">
                        <div class="avatar">
                            <div class="w-20 h-20 rounded-full">
                                <div class="bg-primary flex items-center justify-center text-primary-content text-2xl font-bold">
                                    JD
                                </div>
                            </div>
                        </div>
                        <h4 class="text-lg font-semibold mt-3">John Doe</h4>
                        <p class="text-sm text-base-content/70">john.doe@example.com</p>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-base-100 p-4 rounded-lg">
                            <h5 class="font-semibold">Account Status</h5>
                            <p class="text-sm text-base-content/70">Premium Member</p>
                        </div>
                        <div class="bg-base-100 p-4 rounded-lg">
                            <h5 class="font-semibold">Last Login</h5>
                            <p class="text-sm text-base-content/70">2 hours ago</p>
                        </div>
                        <div class="bg-base-100 p-4 rounded-lg">
                            <h5 class="font-semibold">Location</h5>
                            <p class="text-sm text-base-content/70">San Francisco, CA</p>
                        </div>
                    </div>
                    <div class="mt-6 space-y-2">
                        <button class="btn btn-primary btn-block">Edit Profile</button>
                        <button class="btn btn-outline btn-block">Account Settings</button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
{/if}