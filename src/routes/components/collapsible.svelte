<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronDown, ChevronRight, Plus, Minus, Settings, FileText, Users, Bell, Lock, Key, Star, Heart, Eye, EyeOff } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add collapsible';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<div class="collapse bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Click me to show/hide content
  </div>
  <div class="collapse-content">
    <p>Hidden content that can be toggled</p>
  </div>
</div>`;

    const arrowIndicatorCode = `<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Collapsible with arrow
  </div>
  <div class="collapse-content">
    <p>This collapsible uses an arrow indicator to show its state.</p>
  </div>
</div>`;

    const plusIndicatorCode = `<div class="collapse collapse-plus bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Collapsible with plus/minus
  </div>
  <div class="collapse-content">
    <p>This collapsible uses a plus/minus indicator.</p>
  </div>
</div>`;

    const customTriggerCode = `<script>
  import { ChevronDown, ChevronRight, Settings } from 'lucide-svelte';
  
  let expanded = false;
<\/script>

<div class="collapse bg-base-200">
  <input type="checkbox" bind:checked={expanded} />
  <div class="collapse-title text-xl font-medium flex items-center">
    <Settings class="w-5 h-5 mr-2" />
    <span>Settings Panel</span>
    {#if expanded}
      <ChevronDown class="w-5 h-5 ml-auto" />
    {:else}
      <ChevronRight class="w-5 h-5 ml-auto" />
    {/if}
  </div>
  <div class="collapse-content">
    <div class="space-y-4">
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Enable notifications</span>
          <input type="checkbox" class="toggle" checked />
        </label>
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Dark mode</span>
          <input type="checkbox" class="toggle toggle-primary" />
        </label>
      </div>
    </div>
  </div>
</div>`;

    const controlledStateCode = `<script>
  let panelOpen = false;
  let settingsOpen = true;
  let accountOpen = false;
<\/script>

<div class="space-y-4">
  <div class="flex space-x-2 mb-4">
    <button class="btn btn-sm" on:click={() => panelOpen = !panelOpen}>
      Toggle Panel
    </button>
    <button class="btn btn-sm" on:click={() => settingsOpen = !settingsOpen}>
      Toggle Settings
    </button>
    <button class="btn btn-sm" on:click={() => accountOpen = !accountOpen}>
      Toggle Account
    </button>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" bind:checked={panelOpen} />
    <div class="collapse-title">Information Panel</div>
    <div class="collapse-content">
      <p>This panel is controlled programmatically.</p>
    </div>
  </div>
</div>`;

    const nestedCollapsibleCode = `<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    <FileText class="w-5 h-5 mr-2 inline" />
    Document Categories
  </div>
  <div class="collapse-content">
    <div class="space-y-2">
      <div class="collapse collapse-arrow bg-base-300">
        <input type="checkbox" />
        <div class="collapse-title font-medium">Reports</div>
        <div class="collapse-content">
          <ul class="menu menu-compact">
            <li><a>Monthly Report</a></li>
            <li><a>Quarterly Report</a></li>
            <li><a>Annual Report</a></li>
          </ul>
        </div>
      </div>
      
      <div class="collapse collapse-arrow bg-base-300">
        <input type="checkbox" />
        <div class="collapse-title font-medium">Templates</div>
        <div class="collapse-content">
          <ul class="menu menu-compact">
            <li><a>Invoice Template</a></li>
            <li><a>Letter Template</a></li>
            <li><a>Proposal Template</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`;

    const accordionCode = `<script>
  let openPanel = 0; // Only one panel open at a time
<\/script>

<div class="space-y-1">
  <div class="collapse collapse-arrow bg-base-200">
    <input 
      type="radio" 
      name="accordion" 
      checked={openPanel === 0}
      on:change={() => openPanel = 0}
    />
    <div class="collapse-title text-xl font-medium">
      <Users class="w-5 h-5 mr-2 inline" />
      User Management
    </div>
    <div class="collapse-content">
      <p>Manage users, roles, and permissions for your organization.</p>
      <div class="mt-4 space-x-2">
        <button class="btn btn-primary btn-sm">Add User</button>
        <button class="btn btn-outline btn-sm">Import Users</button>
      </div>
    </div>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input 
      type="radio" 
      name="accordion" 
      checked={openPanel === 1}
      on:change={() => openPanel = 1}
    />
    <div class="collapse-title text-xl font-medium">
      <Lock class="w-5 h-5 mr-2 inline" />
      Security Settings
    </div>
    <div class="collapse-content">
      <p>Configure security policies and authentication methods.</p>
      <div class="mt-4 space-x-2">
        <button class="btn btn-secondary btn-sm">2FA Settings</button>
        <button class="btn btn-outline btn-sm">Password Policy</button>
      </div>
    </div>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input 
      type="radio" 
      name="accordion" 
      checked={openPanel === 2}
      on:change={() => openPanel = 2}
    />
    <div class="collapse-title text-xl font-medium">
      <Bell class="w-5 h-5 mr-2 inline" />
      Notifications
    </div>
    <div class="collapse-content">
      <p>Customize notification preferences and delivery methods.</p>
      <div class="mt-4 space-x-2">
        <button class="btn btn-accent btn-sm">Email Settings</button>
        <button class="btn btn-outline btn-sm">Push Notifications</button>
      </div>
    </div>
  </div>
</div>`;

    // Component state for examples
    let basicExpanded = false;
    let arrowExpanded = false;
    let plusExpanded = false;
    let customExpanded = false;
    let settingsExpanded = false;
    let panelOpen = false;
    let settingsOpen = true;
    let accountOpen = false;
    let openPanel = 0;

    const apiProps = [
        {
            name: 'open',
            type: 'boolean',
            default: 'false',
            description: 'Controls whether the collapsible is expanded or collapsed'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables interaction with the collapsible'
        },
        {
            name: 'variant',
            type: "'default' | 'arrow' | 'plus'",
            default: "'default'",
            description: 'Visual style variant with different indicators'
        },
        {
            name: 'trigger',
            type: 'string',
            default: 'undefined',
            description: 'Custom trigger text or content'
        },
        {
            name: 'animated',
            type: 'boolean',
            default: 'true',
            description: 'Enables smooth expand/collapse animations'
        },
        {
            name: 'class',
            type: 'string',
            default: "''",
            description: 'Additional CSS classes to apply'
        }
    ];
</script>

<svelte:head>
    <title>Collapsible - NUI Components</title>
    <meta name="description" content="Collapsible component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Collapsible</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Collapsible</h1>
                <p class="text-xl text-base-content/70">
                    Create expandable content sections with smooth animations and various trigger styles.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/collapsible"
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
            description="Simple collapsible with basic show/hide functionality"
            code={basicUsage}
        >
            <div class="w-full max-w-md">
                <div class="collapse bg-base-200">
                    <input type="checkbox" bind:checked={basicExpanded} />
                    <div class="collapse-title text-xl font-medium">
                        Click me to show/hide content
                    </div>
                    <div class="collapse-content">
                        <p>Hidden content that can be toggled by clicking the title above.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Arrow Indicator -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Arrow Indicator" 
            description="Collapsible with arrow indicator showing expand/collapse state"
            code={arrowIndicatorCode}
        >
            <div class="w-full max-w-md">
                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" bind:checked={arrowExpanded} />
                    <div class="collapse-title text-xl font-medium">
                        Collapsible with arrow
                    </div>
                    <div class="collapse-content">
                        <p>This collapsible uses an arrow indicator to show its state.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Plus/Minus Indicator -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Plus/Minus Indicator" 
            description="Collapsible with plus/minus indicator for clear expand/collapse states"
            code={plusIndicatorCode}
        >
            <div class="w-full max-w-md">
                <div class="collapse collapse-plus bg-base-200">
                    <input type="checkbox" bind:checked={plusExpanded} />
                    <div class="collapse-title text-xl font-medium">
                        Collapsible with plus/minus
                    </div>
                    <div class="collapse-content">
                        <p>This collapsible uses a plus/minus indicator to show expand/collapse state.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Trigger -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Trigger" 
            description="Collapsible with custom trigger content including icons and controlled state"
            code={customTriggerCode}
        >
            <div class="w-full max-w-md">
                <div class="collapse bg-base-200">
                    <input type="checkbox" bind:checked={customExpanded} />
                    <div class="collapse-title text-xl font-medium flex items-center">
                        <Settings class="w-5 h-5 mr-2" />
                        <span>Settings Panel</span>
                        {#if customExpanded}
                            <ChevronDown class="w-5 h-5 ml-auto" />
                        {:else}
                            <ChevronRight class="w-5 h-5 ml-auto" />
                        {/if}
                    </div>
                    <div class="collapse-content">
                        <div class="space-y-4">
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Enable notifications</span>
                                    <input type="checkbox" class="toggle" checked />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Dark mode</span>
                                    <input type="checkbox" class="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Controlled State -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Controlled State" 
            description="Programmatically control collapsible state with external buttons"
            code={controlledStateCode}
        >
            <div class="w-full max-w-md space-y-4">
                <div class="flex flex-wrap gap-2">
                    <button class="btn btn-sm" on:click={() => panelOpen = !panelOpen}>
                        Toggle Panel
                    </button>
                    <button class="btn btn-sm" on:click={() => settingsOpen = !settingsOpen}>
                        Toggle Settings
                    </button>
                    <button class="btn btn-sm" on:click={() => accountOpen = !accountOpen}>
                        Toggle Account
                    </button>
                </div>

                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" bind:checked={panelOpen} />
                    <div class="collapse-title">Information Panel</div>
                    <div class="collapse-content">
                        <p>This panel is controlled programmatically.</p>
                    </div>
                </div>

                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" bind:checked={settingsOpen} />
                    <div class="collapse-title">Settings Panel</div>
                    <div class="collapse-content">
                        <p>Control this panel's state using the toggle button above.</p>
                    </div>
                </div>

                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" bind:checked={accountOpen} />
                    <div class="collapse-title">Account Panel</div>
                    <div class="collapse-content">
                        <p>This account panel can be toggled externally.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Collapsibles -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Collapsibles" 
            description="Create hierarchical content with nested collapsible sections"
            code={nestedCollapsibleCode}
        >
            <div class="w-full max-w-md">
                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        <FileText class="w-5 h-5 mr-2 inline" />
                        Document Categories
                    </div>
                    <div class="collapse-content">
                        <div class="space-y-2">
                            <div class="collapse collapse-arrow bg-base-300">
                                <input type="checkbox" />
                                <div class="collapse-title font-medium">Reports</div>
                                <div class="collapse-content">
                                    <ul class="menu menu-compact">
                                        <li><a>Monthly Report</a></li>
                                        <li><a>Quarterly Report</a></li>
                                        <li><a>Annual Report</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="collapse collapse-arrow bg-base-300">
                                <input type="checkbox" />
                                <div class="collapse-title font-medium">Templates</div>
                                <div class="collapse-content">
                                    <ul class="menu menu-compact">
                                        <li><a>Invoice Template</a></li>
                                        <li><a>Letter Template</a></li>
                                        <li><a>Proposal Template</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Accordion Pattern -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Accordion Pattern" 
            description="Create an accordion where only one panel can be open at a time"
            code={accordionCode}
        >
            <div class="w-full max-w-md">
                <div class="space-y-1">
                    <div class="collapse collapse-arrow bg-base-200">
                        <input 
                            type="radio" 
                            name="accordion-example" 
                            checked={openPanel === 0}
                            on:change={() => openPanel = 0}
                        />
                        <div class="collapse-title text-xl font-medium">
                            <Users class="w-5 h-5 mr-2 inline" />
                            User Management
                        </div>
                        <div class="collapse-content">
                            <p>Manage users, roles, and permissions for your organization.</p>
                            <div class="mt-4 space-x-2">
                                <button class="btn btn-primary btn-sm">Add User</button>
                                <button class="btn btn-outline btn-sm">Import Users</button>
                            </div>
                        </div>
                    </div>

                    <div class="collapse collapse-arrow bg-base-200">
                        <input 
                            type="radio" 
                            name="accordion-example" 
                            checked={openPanel === 1}
                            on:change={() => openPanel = 1}
                        />
                        <div class="collapse-title text-xl font-medium">
                            <Lock class="w-5 h-5 mr-2 inline" />
                            Security Settings
                        </div>
                        <div class="collapse-content">
                            <p>Configure security policies and authentication methods.</p>
                            <div class="mt-4 space-x-2">
                                <button class="btn btn-secondary btn-sm">2FA Settings</button>
                                <button class="btn btn-outline btn-sm">Password Policy</button>
                            </div>
                        </div>
                    </div>

                    <div class="collapse collapse-arrow bg-base-200">
                        <input 
                            type="radio" 
                            name="accordion-example" 
                            checked={openPanel === 2}
                            on:change={() => openPanel = 2}
                        />
                        <div class="collapse-title text-xl font-medium">
                            <Bell class="w-5 h-5 mr-2 inline" />
                            Notifications
                        </div>
                        <div class="collapse-content">
                            <p>Customize notification preferences and delivery methods.</p>
                            <div class="mt-4 space-x-2">
                                <button class="btn btn-accent btn-sm">Email Settings</button>
                                <button class="btn btn-outline btn-sm">Push Notifications</button>
                            </div>
                        </div>
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
                <li>✅ Uses semantic HTML with proper heading structure</li>
                <li>✅ Keyboard accessible with Enter and Space key support</li>
                <li>✅ Screen reader compatible with proper ARIA attributes</li>
                <li>✅ Focus management maintains keyboard navigation flow</li>
                <li>✅ Clear visual indicators for expanded/collapsed states</li>
                <li>✅ Smooth animations respect reduced motion preferences</li>
                <li>✅ Proper color contrast for all interactive elements</li>
                <li>✅ Touch-friendly tap targets on mobile devices</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- FAQ Section -->
            <div>
                <h3 class="text-lg font-semibold mb-4">FAQ Section</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body space-y-2">
                        <div class="collapse collapse-plus bg-base-200">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">
                                How do I reset my password?
                            </div>
                            <div class="collapse-content">
                                <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email address.</p>
                            </div>
                        </div>
                        
                        <div class="collapse collapse-plus bg-base-200">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">
                                Can I change my username?
                            </div>
                            <div class="collapse-content">
                                <p>Yes, you can change your username in your account settings. Go to Profile > Edit Profile > Username.</p>
                            </div>
                        </div>
                        
                        <div class="collapse collapse-plus bg-base-200">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">
                                How do I delete my account?
                            </div>
                            <div class="collapse-content">
                                <p>Account deletion is permanent and cannot be undone. Contact support if you're sure you want to proceed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Menu -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Navigation Menu</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="collapse collapse-arrow bg-base-200">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">
                                <Star class="w-4 h-4 mr-2 inline" />
                                Favorites
                            </div>
                            <div class="collapse-content">
                                <ul class="menu menu-compact">
                                    <li><a><Heart class="w-4 h-4" />Liked Posts</a></li>
                                    <li><a><Star class="w-4 h-4" />Starred Items</a></li>
                                    <li><a><Eye class="w-4 h-4" />Watch Later</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Organization -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Content Organization</h3>
                <div class="space-y-2">
                    <div class="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" />
                        <div class="collapse-title font-medium">
                            <FileText class="w-4 h-4 mr-2 inline" />
                            Project Details
                        </div>
                        <div class="collapse-content">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="font-medium">Status:</span> In Progress
                                </div>
                                <div>
                                    <span class="font-medium">Due Date:</span> Dec 15, 2024
                                </div>
                                <div>
                                    <span class="font-medium">Team:</span> 5 members
                                </div>
                                <div>
                                    <span class="font-medium">Priority:</span> High
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" />
                        <div class="collapse-title font-medium">
                            <Users class="w-4 h-4 mr-2 inline" />
                            Team Members
                        </div>
                        <div class="collapse-content">
                            <div class="space-y-2">
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div class="w-8 rounded-full bg-primary text-primary-content text-xs flex items-center justify-center">
                                            JD
                                        </div>
                                    </div>
                                    <span class="text-sm">John Doe - Project Lead</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div class="w-8 rounded-full bg-secondary text-secondary-content text-xs flex items-center justify-center">
                                            AS
                                        </div>
                                    </div>
                                    <span class="text-sm">Alice Smith - Developer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-arrow bg-base-200">
                        <input type="checkbox" />
                        <div class="collapse-title font-medium">
                            <Key class="w-4 h-4 mr-2 inline" />
                            Advanced Options
                        </div>
                        <div class="collapse-content">
                            <div class="form-control space-y-2">
                                <label class="cursor-pointer label">
                                    <span class="label-text">Enable debug mode</span>
                                    <input type="checkbox" class="toggle toggle-sm" />
                                </label>
                                <label class="cursor-pointer label">
                                    <span class="label-text">Auto-save changes</span>
                                    <input type="checkbox" class="toggle toggle-sm" checked />
                                </label>
                                <label class="cursor-pointer label">
                                    <span class="label-text">Send notifications</span>
                                    <input type="checkbox" class="toggle toggle-sm" checked />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>