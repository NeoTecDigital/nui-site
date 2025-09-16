<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, AlertTriangle, Info, CheckCircle, X, Save, Trash2, Settings } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add dialog';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<!-- Button to open dialog -->
<button class="btn btn-primary" onclick="my_modal_1.showModal()">Open Dialog</button>

<!-- Dialog -->
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>`;

    const withFormCode = `<dialog id="form_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Create Account</h3>
    <form class="space-y-4 mt-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input type="text" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="email" class="input input-bordered" />
      </div>
      <div class="modal-action">
        <button type="button" class="btn btn-ghost" onclick="form_modal.close()">Cancel</button>
        <button type="submit" class="btn btn-primary">Create Account</button>
      </div>
    </form>
  </div>
</dialog>`;

    const confirmationCode = `<dialog id="confirm_modal" class="modal">
  <div class="modal-box">
    <div class="flex items-center space-x-3 mb-4">
      <div class="text-warning">
        <AlertTriangle class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold">Confirm Action</h3>
    </div>
    <p class="py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
    <div class="modal-action">
      <button class="btn btn-ghost" onclick="confirm_modal.close()">Cancel</button>
      <button class="btn btn-error">Delete</button>
    </div>
  </div>
</dialog>`;

    const sizesCode = `<!-- Small Dialog -->
<dialog id="small_modal" class="modal">
  <div class="modal-box w-11/12 max-w-md">
    <h3 class="text-lg font-bold">Small Dialog</h3>
    <p class="py-4">This is a small dialog.</p>
  </div>
</dialog>

<!-- Large Dialog -->
<dialog id="large_modal" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-lg font-bold">Large Dialog</h3>
    <p class="py-4">This is a large dialog with more content space.</p>
  </div>
</dialog>

<!-- Full Screen Dialog -->
<dialog id="fullscreen_modal" class="modal">
  <div class="modal-box w-full h-full max-w-none max-h-none rounded-none">
    <h3 class="text-lg font-bold">Full Screen Dialog</h3>
    <p class="py-4">This dialog takes up the entire screen.</p>
  </div>
</dialog>`;

    const customActionsCode = `<dialog id="custom_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Document Settings</h3>
    <p class="py-4">Configure your document preferences.</p>
    <div class="modal-action">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-secondary">Save Draft</button>
      <button class="btn btn-primary">Save & Publish</button>
    </div>
  </div>
</dialog>`;

    const alertDialogsCode = `<!-- Success Alert -->
<dialog id="success_modal" class="modal">
  <div class="modal-box">
    <div class="flex items-center space-x-3 mb-4">
      <div class="text-success">
        <CheckCircle class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-success">Success!</h3>
    </div>
    <p class="py-4">Your changes have been saved successfully.</p>
    <div class="modal-action">
      <button class="btn btn-success" onclick="success_modal.close()">OK</button>
    </div>
  </div>
</dialog>

<!-- Error Alert -->
<dialog id="error_modal" class="modal">
  <div class="modal-box">
    <div class="flex items-center space-x-3 mb-4">
      <div class="text-error">
        <X class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-error">Error</h3>
    </div>
    <p class="py-4">Something went wrong. Please try again.</p>
    <div class="modal-action">
      <button class="btn btn-error" onclick="error_modal.close()">OK</button>
    </div>
  </div>
</dialog>`;

    const apiProps = [
        {
            name: 'id',
            type: 'string',
            default: 'required',
            description: 'Unique identifier for the dialog element'
        },
        {
            name: 'class',
            type: 'string',
            default: "'modal'",
            description: 'CSS classes for the dialog container'
        },
        {
            name: 'modal-box',
            type: 'string',
            default: "'modal-box'",
            description: 'CSS class for the dialog content container'
        },
        {
            name: 'modal-action',
            type: 'string',
            default: "'modal-action'",
            description: 'CSS class for the action buttons container'
        },
        {
            name: 'backdrop',
            type: 'boolean',
            default: 'true',
            description: 'Whether clicking backdrop closes the dialog'
        },
        {
            name: 'responsive',
            type: 'boolean',
            default: 'true',
            description: 'Responsive behavior on different screen sizes'
        }
    ];

    // Dialog state management
    let showBasicDialog = false;
    let showFormDialog = false;
    let showConfirmDialog = false;
    let showSmallDialog = false;
    let showMediumDialog = false;
    let showLargeDialog = false;
    let showFullscreenDialog = false;
    let showCustomDialog = false;
    let showSuccessDialog = false;
    let showErrorDialog = false;
    let showInfoDialog = false;

    // Form data
    let formData = {
        name: '',
        email: ''
    };

    function handleFormSubmit() {
        console.log('Form submitted:', formData);
        showFormDialog = false;
        showSuccessDialog = true;
    }

    function handleDelete() {
        console.log('Item deleted');
        showConfirmDialog = false;
        showSuccessDialog = true;
    }
</script>

<svelte:head>
    <title>Dialog - NUI Components</title>
    <meta name="description" content="Dialog component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Dialog</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Dialog</h1>
                <p class="text-xl text-base-content/70">
                    Modal dialog component for displaying content, forms, and confirmations above the main page content.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/dialog"
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
            title="Basic Dialog" 
            description="Simple modal dialog with basic content and close functionality"
            code={basicUsage}
        >
            <div class="space-y-4">
                <button class="btn btn-primary" on:click={() => showBasicDialog = true}>
                    Open Basic Dialog
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Dialog with Forms -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Dialog with Form" 
            description="Dialog containing form elements for user input"
            code={withFormCode}
        >
            <div class="space-y-4">
                <button class="btn btn-secondary" on:click={() => showFormDialog = true}>
                    Create Account
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Confirmation Dialogs -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Confirmation Dialog" 
            description="Dialog for confirming destructive or important actions"
            code={confirmationCode}
        >
            <div class="space-y-4">
                <button class="btn btn-error btn-outline" on:click={() => showConfirmDialog = true}>
                    <Trash2 class="w-4 h-4 mr-2" />
                    Delete Item
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Different Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Dialog Sizes" 
            description="Different dialog sizes from small to full-screen"
            code={sizesCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-outline btn-sm" on:click={() => showSmallDialog = true}>
                    Small Dialog
                </button>
                <button class="btn btn-outline" on:click={() => showMediumDialog = true}>
                    Medium Dialog
                </button>
                <button class="btn btn-outline btn-lg" on:click={() => showLargeDialog = true}>
                    Large Dialog
                </button>
                <button class="btn btn-outline btn-wide" on:click={() => showFullscreenDialog = true}>
                    Full Screen
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Actions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Actions" 
            description="Dialog with multiple custom action buttons"
            code={customActionsCode}
        >
            <div class="space-y-4">
                <button class="btn btn-accent" on:click={() => showCustomDialog = true}>
                    <Settings class="w-4 h-4 mr-2" />
                    Document Settings
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Alert Dialogs -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Alert Dialogs" 
            description="Specialized dialogs for success, error, and info messages"
            code={alertDialogsCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-success" on:click={() => showSuccessDialog = true}>
                    <CheckCircle class="w-4 h-4 mr-2" />
                    Success Alert
                </button>
                <button class="btn btn-error" on:click={() => showErrorDialog = true}>
                    <X class="w-4 h-4 mr-2" />
                    Error Alert
                </button>
                <button class="btn btn-info" on:click={() => showInfoDialog = true}>
                    <Info class="w-4 h-4 mr-2" />
                    Info Alert
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
                <li>✅ Includes proper ARIA attributes and dialog role</li>
                <li>✅ Maintains focus management and traps focus within dialog</li>
                <li>✅ Returns focus to trigger element when closed</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Backdrop click and ESC key close the dialog</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- User Onboarding -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Onboarding</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Welcome to NUI!</h4>
                        <p>Get started with our component library in just a few steps.</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-ghost">Skip</button>
                            <button class="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Confirmation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Data Confirmation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Save Changes?</h4>
                        <p>You have unsaved changes. What would you like to do?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-ghost">Discard</button>
                            <button class="btn btn-secondary">Save Draft</button>
                            <button class="btn btn-primary">Save & Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Actual Dialog Components -->

<!-- Basic Dialog -->
{#if showBasicDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Hello!</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
                <button class="btn" on:click={() => showBasicDialog = false}>Close</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showBasicDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Form Dialog -->
{#if showFormDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Create Account</h3>
            <form class="space-y-4 mt-4" on:submit|preventDefault={handleFormSubmit}>
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">Name</span>
                    </label>
                    <input 
                        id="name"
                        type="text" 
                        class="input input-bordered" 
                        bind:value={formData.name}
                        required 
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        class="input input-bordered" 
                        bind:value={formData.email}
                        required 
                    />
                </div>
                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" on:click={() => showFormDialog = false}>
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <Save class="w-4 h-4 mr-2" />
                        Create Account
                    </button>
                </div>
            </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showFormDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Confirmation Dialog -->
{#if showConfirmDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <div class="flex items-center space-x-3 mb-4">
                <div class="text-warning">
                    <AlertTriangle class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold">Confirm Action</h3>
            </div>
            <p class="py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div class="modal-action">
                <button class="btn btn-ghost" on:click={() => showConfirmDialog = false}>Cancel</button>
                <button class="btn btn-error" on:click={handleDelete}>
                    <Trash2 class="w-4 h-4 mr-2" />
                    Delete
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showConfirmDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Small Dialog -->
{#if showSmallDialog}
    <dialog class="modal modal-open">
        <div class="modal-box w-11/12 max-w-md">
            <h3 class="text-lg font-bold">Small Dialog</h3>
            <p class="py-4">This is a small dialog with limited content space.</p>
            <div class="modal-action">
                <button class="btn" on:click={() => showSmallDialog = false}>Close</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showSmallDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Medium Dialog -->
{#if showMediumDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Medium Dialog</h3>
            <p class="py-4">This is a medium-sized dialog with standard content space. It provides a good balance between content area and screen real estate.</p>
            <div class="modal-action">
                <button class="btn" on:click={() => showMediumDialog = false}>Close</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showMediumDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Large Dialog -->
{#if showLargeDialog}
    <dialog class="modal modal-open">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="text-lg font-bold">Large Dialog</h3>
            <p class="py-4">This is a large dialog with extensive content space. Perfect for complex forms, detailed information, or rich content that needs more room to breathe.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="card bg-base-200">
                    <div class="card-body">
                        <h4 class="card-title text-base">Feature 1</h4>
                        <p class="text-sm">Description of feature 1</p>
                    </div>
                </div>
                <div class="card bg-base-200">
                    <div class="card-body">
                        <h4 class="card-title text-base">Feature 2</h4>
                        <p class="text-sm">Description of feature 2</p>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button class="btn" on:click={() => showLargeDialog = false}>Close</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showLargeDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Full Screen Dialog -->
{#if showFullscreenDialog}
    <dialog class="modal modal-open">
        <div class="modal-box w-full h-full max-w-none max-h-none rounded-none">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">Full Screen Dialog</h3>
                <button class="btn btn-ghost btn-circle" on:click={() => showFullscreenDialog = false}>
                    <X class="w-6 h-6" />
                </button>
            </div>
            <div class="space-y-6">
                <p>This dialog takes up the entire screen, perfect for immersive experiences or complex workflows.</p>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="card bg-base-200">
                        <div class="card-body">
                            <h4 class="card-title">Section 1</h4>
                            <p>Content for section 1</p>
                        </div>
                    </div>
                    <div class="card bg-base-200">
                        <div class="card-body">
                            <h4 class="card-title">Section 2</h4>
                            <p>Content for section 2</p>
                        </div>
                    </div>
                    <div class="card bg-base-200">
                        <div class="card-body">
                            <h4 class="card-title">Section 3</h4>
                            <p>Content for section 3</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button class="btn btn-primary" on:click={() => showFullscreenDialog = false}>Done</button>
            </div>
        </div>
    </dialog>
{/if}

<!-- Custom Actions Dialog -->
{#if showCustomDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Document Settings</h3>
            <p class="py-4">Configure your document preferences and publishing options.</p>
            <div class="form-control space-y-2">
                <label class="cursor-pointer label">
                    <span class="label-text">Make document public</span>
                    <input type="checkbox" class="checkbox checkbox-primary" />
                </label>
                <label class="cursor-pointer label">
                    <span class="label-text">Allow comments</span>
                    <input type="checkbox" class="checkbox checkbox-primary" checked />
                </label>
            </div>
            <div class="modal-action">
                <button class="btn btn-ghost" on:click={() => showCustomDialog = false}>Cancel</button>
                <button class="btn btn-secondary" on:click={() => showCustomDialog = false}>
                    <Save class="w-4 h-4 mr-2" />
                    Save Draft
                </button>
                <button class="btn btn-primary" on:click={() => showCustomDialog = false}>
                    Save & Publish
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showCustomDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Success Alert Dialog -->
{#if showSuccessDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <div class="flex items-center space-x-3 mb-4">
                <div class="text-success">
                    <CheckCircle class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-success">Success!</h3>
            </div>
            <p class="py-4">Your changes have been saved successfully.</p>
            <div class="modal-action">
                <button class="btn btn-success" on:click={() => showSuccessDialog = false}>OK</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showSuccessDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Error Alert Dialog -->
{#if showErrorDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <div class="flex items-center space-x-3 mb-4">
                <div class="text-error">
                    <X class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-error">Error</h3>
            </div>
            <p class="py-4">Something went wrong. Please try again later or contact support if the problem persists.</p>
            <div class="modal-action">
                <button class="btn btn-error" on:click={() => showErrorDialog = false}>OK</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showErrorDialog = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Info Alert Dialog -->
{#if showInfoDialog}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <div class="flex items-center space-x-3 mb-4">
                <div class="text-info">
                    <Info class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-info">Information</h3>
            </div>
            <p class="py-4">This is an informational message to help guide you through the process.</p>
            <div class="modal-action">
                <button class="btn btn-info" on:click={() => showInfoDialog = false}>Got it</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showInfoDialog = false}>close</button>
        </form>
    </dialog>
{/if}