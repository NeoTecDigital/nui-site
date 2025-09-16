<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Info, CheckCircle, AlertTriangle, XCircle, X, Settings, ExternalLink } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add alert';

    const basicUsage = `<script>
  import { Alert } from '@nui/core';
<\/script>

<Alert>This is a basic alert message</Alert>`;

    const variantsCode = `<Alert variant="info">Information alert</Alert>
<Alert variant="success">Success alert</Alert>
<Alert variant="warning">Warning alert</Alert>
<Alert variant="error">Error alert</Alert>`;

    const withIconsCode = `<script>
  import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-svelte';
<\/script>

<Alert variant="info">
  <Info class="w-5 h-5" />
  <span>Information with custom icon</span>
</Alert>

<Alert variant="success">
  <CheckCircle class="w-5 h-5" />
  <span>Success with custom icon</span>
</Alert>

<Alert variant="warning">
  <AlertTriangle class="w-5 h-5" />
  <span>Warning with custom icon</span>
</Alert>

<Alert variant="error">
  <XCircle class="w-5 h-5" />
  <span>Error with custom icon</span>
</Alert>`;

    const dismissibleCode = `<script>
  import { X } from 'lucide-svelte';
  
  let showAlert = true;
<\/script>

{#if showAlert}
  <Alert variant="warning">
    <AlertTriangle class="w-5 h-5" />
    <span>This alert can be dismissed</span>
    <button 
      class="btn btn-ghost btn-xs ml-auto" 
      on:click={() => showAlert = false}
    >
      <X class="w-4 h-4" />
    </button>
  </Alert>
{/if}`;

    const withActionsCode = `<Alert variant="info">
  <Info class="w-5 h-5" />
  <div class="flex-1">
    <h3 class="font-semibold">Update Available</h3>
    <p class="text-sm">A new version of the application is available.</p>
  </div>
  <div class="flex space-x-2">
    <button class="btn btn-primary btn-sm">Update</button>
    <button class="btn btn-ghost btn-sm">Later</button>
  </div>
</Alert>`;

    const complexContentCode = `<Alert variant="warning">
  <AlertTriangle class="w-5 h-5" />
  <div class="flex-1">
    <h3 class="font-semibold">Storage Almost Full</h3>
    <p class="text-sm mb-3">
      You have used 90% of your storage space. Consider upgrading your plan or 
      removing unused files to free up space.
    </p>
    <div class="flex items-center space-x-4 text-xs">
      <div class="flex items-center space-x-1">
        <div class="w-2 h-2 bg-warning rounded-full"></div>
        <span>450 MB used</span>
      </div>
      <div class="flex items-center space-x-1">
        <div class="w-2 h-2 bg-base-300 rounded-full"></div>
        <span>50 MB available</span>
      </div>
    </div>
  </div>
  <div class="flex flex-col space-y-1">
    <button class="btn btn-warning btn-xs">Upgrade Plan</button>
    <button class="btn btn-ghost btn-xs">Manage Files</button>
  </div>
</Alert>`;

    // Component state for dismissible examples
    let showDismissibleAlert = true;
    let showInfoAlert = true;
    let showSuccessAlert = true;
    let showWarningAlert = true;
    let showErrorAlert = true;

    const apiProps = [
        {
            name: 'variant',
            type: "'info' | 'success' | 'warning' | 'error'",
            default: "'info'",
            description: 'Visual style variant of the alert'
        },
        {
            name: 'dismissible',
            type: 'boolean',
            default: 'false',
            description: 'Shows a dismiss button to close the alert'
        },
        {
            name: 'icon',
            type: 'boolean',
            default: 'true',
            description: 'Shows the default icon for the variant'
        },
        {
            name: 'title',
            type: 'string',
            default: 'undefined',
            description: 'Optional title text for the alert'
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
    <title>Alert - NUI Components</title>
    <meta name="description" content="Alert component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Alert</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Alert</h1>
                <p class="text-xl text-base-content/70">
                    Display important messages and notifications with contextual styling and actions.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/alert"
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
            description="Simple alert with default info styling"
            code={basicUsage}
        >
            <div class="alert alert-info">
                <Info class="w-5 h-5" />
                <span>This is a basic alert message</span>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different alert types for various contexts and severity levels"
            code={variantsCode}
        >
            <div class="space-y-4 w-full">
                <div class="alert alert-info">
                    <Info class="w-5 h-5" />
                    <span>Information alert</span>
                </div>
                <div class="alert alert-success">
                    <CheckCircle class="w-5 h-5" />
                    <span>Success alert</span>
                </div>
                <div class="alert alert-warning">
                    <AlertTriangle class="w-5 h-5" />
                    <span>Warning alert</span>
                </div>
                <div class="alert alert-error">
                    <XCircle class="w-5 h-5" />
                    <span>Error alert</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Icons" 
            description="Alerts with Lucide icons for enhanced visual communication"
            code={withIconsCode}
        >
            <div class="space-y-4 w-full">
                <div class="alert alert-info">
                    <Info class="w-5 h-5" />
                    <span>Information with custom icon</span>
                </div>
                <div class="alert alert-success">
                    <CheckCircle class="w-5 h-5" />
                    <span>Success with custom icon</span>
                </div>
                <div class="alert alert-warning">
                    <AlertTriangle class="w-5 h-5" />
                    <span>Warning with custom icon</span>
                </div>
                <div class="alert alert-error">
                    <XCircle class="w-5 h-5" />
                    <span>Error with custom icon</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Dismissible Alerts -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Dismissible Alerts" 
            description="Alerts that can be closed by the user with a dismiss button"
            code={dismissibleCode}
        >
            <div class="space-y-4 w-full">
                {#if showDismissibleAlert}
                    <div class="alert alert-warning">
                        <AlertTriangle class="w-5 h-5" />
                        <span>This alert can be dismissed</span>
                        <button 
                            class="btn btn-ghost btn-xs ml-auto" 
                            on:click={() => showDismissibleAlert = false}
                        >
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                {:else}
                    <button 
                        class="btn btn-outline btn-sm"
                        on:click={() => showDismissibleAlert = true}
                    >
                        Show Dismissible Alert
                    </button>
                {/if}
            </div>
        </ComponentShowcase>
    </div>

    <!-- Alert with Actions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Alert with Actions" 
            description="Alerts with action buttons for user interaction"
            code={withActionsCode}
        >
            <div class="alert alert-info">
                <Info class="w-5 h-5" />
                <div class="flex-1">
                    <h3 class="font-semibold">Update Available</h3>
                    <p class="text-sm">A new version of the application is available.</p>
                </div>
                <div class="flex space-x-2">
                    <button class="btn btn-primary btn-sm">Update</button>
                    <button class="btn btn-ghost btn-sm">Later</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Complex Alert Content -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Complex Content" 
            description="Rich alert with detailed content, progress indicators, and multiple actions"
            code={complexContentCode}
        >
            <div class="alert alert-warning">
                <AlertTriangle class="w-5 h-5" />
                <div class="flex-1">
                    <h3 class="font-semibold">Storage Almost Full</h3>
                    <p class="text-sm mb-3">
                        You have used 90% of your storage space. Consider upgrading your plan or 
                        removing unused files to free up space.
                    </p>
                    <div class="flex items-center space-x-4 text-xs">
                        <div class="flex items-center space-x-1">
                            <div class="w-2 h-2 bg-warning rounded-full"></div>
                            <span>450 MB used</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <div class="w-2 h-2 bg-base-300 rounded-full"></div>
                            <span>50 MB available</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-1">
                    <button class="btn btn-warning btn-xs">Upgrade Plan</button>
                    <button class="btn btn-ghost btn-xs">Manage Files</button>
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
                <li>✅ Uses semantic <code>role="alert"</code> for important messages</li>
                <li>✅ Supports screen reader announcements for dynamic alerts</li>
                <li>✅ Maintains proper color contrast ratios for all variants</li>
                <li>✅ Keyboard accessible dismiss buttons with proper focus management</li>
                <li>✅ Icons include appropriate aria-labels when needed</li>
                <li>✅ Respects reduced motion preferences for animations</li>
                <li>✅ Compatible with high contrast mode</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Form Validation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Validation Messages</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body space-y-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" class="input input-bordered input-error" />
                        </div>
                        
                        <div class="alert alert-error">
                            <XCircle class="w-5 h-5" />
                            <span>Please enter a valid email address</span>
                        </div>
                        
                        <button class="btn btn-primary" disabled>Submit</button>
                    </div>
                </div>
            </div>

            <!-- System Status -->
            <div>
                <h3 class="text-lg font-semibold mb-4">System Status Notifications</h3>
                <div class="space-y-4">
                    {#if showInfoAlert}
                        <div class="alert alert-info">
                            <Settings class="w-5 h-5" />
                            <div class="flex-1">
                                <span class="font-semibold">Maintenance Scheduled</span>
                                <p class="text-sm">System maintenance will occur tonight from 11 PM to 1 AM EST.</p>
                            </div>
                            <button 
                                class="btn btn-ghost btn-xs"
                                on:click={() => showInfoAlert = false}
                            >
                                <X class="w-4 h-4" />
                            </button>
                        </div>
                    {/if}

                    {#if showSuccessAlert}
                        <div class="alert alert-success">
                            <CheckCircle class="w-5 h-5" />
                            <div class="flex-1">
                                <span class="font-semibold">Backup Complete</span>
                                <p class="text-sm">Your data has been successfully backed up to the cloud.</p>
                            </div>
                            <div class="flex space-x-2">
                                <button class="btn btn-ghost btn-xs">
                                    <ExternalLink class="w-3 h-3 mr-1" />
                                    View
                                </button>
                                <button 
                                    class="btn btn-ghost btn-xs"
                                    on:click={() => showSuccessAlert = false}
                                >
                                    <X class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    {/if}

                    {#if showErrorAlert}
                        <div class="alert alert-error">
                            <XCircle class="w-5 h-5" />
                            <div class="flex-1">
                                <span class="font-semibold">Connection Failed</span>
                                <p class="text-sm">Unable to connect to the server. Please check your internet connection.</p>
                            </div>
                            <div class="flex space-x-2">
                                <button class="btn btn-error btn-xs">Retry</button>
                                <button 
                                    class="btn btn-ghost btn-xs"
                                    on:click={() => showErrorAlert = false}
                                >
                                    <X class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Feature Announcements -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Feature Announcements</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="alert">
                            <Info class="w-5 h-5" />
                            <div class="flex-1">
                                <h4 class="font-semibold">New Feature: Dark Mode</h4>
                                <p class="text-sm">
                                    Experience our new dark mode theme! Toggle between light and dark themes 
                                    in your profile settings.
                                </p>
                            </div>
                            <div class="flex space-x-2">
                                <button class="btn btn-primary btn-sm">Try Now</button>
                                <button class="btn btn-ghost btn-sm">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>