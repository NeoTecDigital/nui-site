<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, AlertCircle, CheckCircle, Info, Star } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add label';

    const basicUsage = `<script>
  import { Label } from '@nui/core';
<\/script>

<div class="form-control">
  <label class="label">
    <span class="label-text">Email address</span>
  </label>
  <input type="email" placeholder="Enter your email" class="input input-bordered" />
</div>`;

    const withInputCode = `<div class="form-control">
  <label class="label">
    <span class="label-text">Username</span>
  </label>
  <input type="text" placeholder="Enter username" class="input input-bordered" />
  <label class="label">
    <span class="label-text-alt">Username must be unique</span>
  </label>
</div>`;

    const sizesCode = `<div class="form-control">
  <label class="label">
    <span class="label-text text-xs">Extra small label</span>
  </label>
  <input type="text" class="input input-bordered input-xs" />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text text-sm">Small label</span>
  </label>
  <input type="text" class="input input-bordered input-sm" />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text">Medium label</span>
  </label>
  <input type="text" class="input input-bordered input-md" />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text text-lg">Large label</span>
  </label>
  <input type="text" class="input input-bordered input-lg" />
</div>`;

    const statesCode = `<!-- Success state -->
<div class="form-control">
  <label class="label">
    <span class="label-text text-success">Valid email</span>
  </label>
  <input type="email" value="user@example.com" class="input input-bordered input-success" />
</div>

<!-- Error state -->
<div class="form-control">
  <label class="label">
    <span class="label-text text-error">Invalid email</span>
  </label>
  <input type="email" value="invalid-email" class="input input-bordered input-error" />
  <label class="label">
    <span class="label-text-alt text-error">Please enter a valid email address</span>
  </label>
</div>

<!-- Warning state -->
<div class="form-control">
  <label class="label">
    <span class="label-text text-warning">Password strength</span>
  </label>
  <input type="password" value="123" class="input input-bordered input-warning" />
  <label class="label">
    <span class="label-text-alt text-warning">Password is too weak</span>
  </label>
</div>`;

    const requiredCode = `<div class="form-control">
  <label class="label">
    <span class="label-text">
      Full name
      <span class="text-error">*</span>
    </span>
  </label>
  <input type="text" placeholder="Enter your full name" class="input input-bordered" required />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text">
      Email address
      <span class="badge badge-error badge-xs">Required</span>
    </span>
  </label>
  <input type="email" placeholder="Enter your email" class="input input-bordered" required />
</div>`;

    const positionsCode = `<!-- Label above input -->
<div class="form-control">
  <label class="label">
    <span class="label-text">Above input</span>
  </label>
  <input type="text" class="input input-bordered" />
</div>

<!-- Label beside input -->
<label class="label cursor-pointer">
  <span class="label-text">Beside input</span>
  <input type="checkbox" class="checkbox" />
</label>

<!-- Label inside input group -->
<label class="input input-bordered flex items-center gap-2">
  <span class="label-text">https://</span>
  <input type="text" placeholder="domain.com" class="grow" />
</label>`;

    const floatingCode = `<label class="floating-label">
  <span>Your Email</span>
  <input type="text" placeholder="[email protected]" class="input input-md input-bordered" />
</label>

<label class="floating-label">
  <span>Password</span>
  <input type="password" placeholder="••••••••" class="input input-md input-bordered" />
</label>`;

    const withIconsCode = `<div class="form-control">
  <label class="label">
    <span class="label-text flex items-center gap-2">
      <AlertCircle class="w-4 h-4 text-error" />
      Critical information
    </span>
  </label>
  <textarea class="textarea textarea-bordered textarea-error" placeholder="Enter details"></textarea>
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text flex items-center gap-2">
      <CheckCircle class="w-4 h-4 text-success" />
      Verified account
    </span>
  </label>
  <input type="text" value="@verified_user" class="input input-bordered input-success" readonly />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text flex items-center gap-2">
      <Star class="w-4 h-4 text-warning" />
      Premium feature
    </span>
  </label>
  <select class="select select-bordered">
    <option>Basic plan</option>
    <option>Premium plan</option>
  </select>
</div>`;

    const apiProps = [
        {
            name: 'class',
            type: 'string',
            default: "'label'",
            description: 'CSS classes for the label element'
        },
        {
            name: 'for',
            type: 'string',
            default: 'undefined',
            description: 'Associates the label with a form control by ID'
        },
        {
            name: 'label-text',
            type: 'class',
            default: 'N/A',
            description: 'Primary label text styling'
        },
        {
            name: 'label-text-alt',
            type: 'class',
            default: 'N/A',
            description: 'Alternative label text (helper text, smaller)'
        },
        {
            name: 'floating-label',
            type: 'class',
            default: 'N/A',
            description: 'Container for floating label functionality'
        },
        {
            name: 'cursor-pointer',
            type: 'modifier',
            default: 'N/A',
            description: 'Makes the label clickable (cursor pointer)'
        }
    ];

    // State management for interactive examples
    let username = '';
    let email = '';
    let password = '';
    let isSubscribed = false;
    let agreedToTerms = false;
    let floatingEmail = '';
    let floatingPassword = '';
</script>

<svelte:head>
    <title>Label - NUI Components</title>
    <meta name="description" content="Label component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Label</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Label</h1>
                <p class="text-xl text-base-content/70">
                    Accessible labels for form controls with support for helper text, states, and floating labels.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/label"
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
            description="Simple label with form control styling"
            code={basicUsage}
        >
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Email address</span>
                </label>
                <input type="email" placeholder="Enter your email" class="input input-bordered w-full" bind:value={email} />
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Helper Text -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Helper Text" 
            description="Labels with additional helper text below the input"
            code={withInputCode}
        >
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" class="input input-bordered w-full" bind:value={username} />
                <label class="label">
                    <span class="label-text-alt">Username must be unique</span>
                </label>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Label Sizes" 
            description="Different label text sizes to match input sizes"
            code={sizesCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-xs">Extra small label</span>
                    </label>
                    <input type="text" placeholder="XS input" class="input input-bordered input-xs w-full" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-sm">Small label</span>
                    </label>
                    <input type="text" placeholder="Small input" class="input input-bordered input-sm w-full" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Medium label</span>
                    </label>
                    <input type="text" placeholder="Medium input" class="input input-bordered input-md w-full" />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-lg">Large label</span>
                    </label>
                    <input type="text" placeholder="Large input" class="input input-bordered input-lg w-full" />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Label States" 
            description="Labels with different validation states and colors"
            code={statesCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <!-- Success state -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-success">Valid email</span>
                    </label>
                    <input type="email" value="user@example.com" class="input input-bordered input-success w-full" readonly />
                </div>

                <!-- Error state -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-error">Invalid email</span>
                    </label>
                    <input type="email" value="invalid-email" class="input input-bordered input-error w-full" readonly />
                    <label class="label">
                        <span class="label-text-alt text-error">Please enter a valid email address</span>
                    </label>
                </div>

                <!-- Warning state -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-warning">Password strength</span>
                    </label>
                    <input type="password" value="123" class="input input-bordered input-warning w-full" readonly />
                    <label class="label">
                        <span class="label-text-alt text-warning">Password is too weak</span>
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Required Fields -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Required Fields" 
            description="Labels with required field indicators"
            code={requiredCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">
                            Full name
                            <span class="text-error">*</span>
                        </span>
                    </label>
                    <input type="text" placeholder="Enter your full name" class="input input-bordered w-full" required />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">
                            Email address
                            <span class="badge badge-error badge-xs ml-2">Required</span>
                        </span>
                    </label>
                    <input type="email" placeholder="Enter your email" class="input input-bordered w-full" required />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Label Positions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Label Positions" 
            description="Different label positioning options"
            code={positionsCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <!-- Label above input -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Above input</span>
                    </label>
                    <input type="text" placeholder="Standard positioning" class="input input-bordered w-full" />
                </div>

                <!-- Label beside input -->
                <label class="label cursor-pointer">
                    <span class="label-text">Beside input</span>
                    <input type="checkbox" class="checkbox" bind:checked={isSubscribed} />
                </label>

                <!-- Label inside input group -->
                <label class="input input-bordered flex items-center gap-2">
                    <span class="label-text">https://</span>
                    <input type="text" placeholder="domain.com" class="grow" />
                </label>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Floating Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Floating Labels" 
            description="Modern floating label animation for enhanced UX"
            code={floatingCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <label class="floating-label">
                    <span>Your Email</span>
                    <input type="text" placeholder="[email protected]" class="input input-md input-bordered w-full" bind:value={floatingEmail} />
                </label>

                <label class="floating-label">
                    <span>Password</span>
                    <input type="password" placeholder="••••••••" class="input input-md input-bordered w-full" bind:value={floatingPassword} />
                </label>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Icons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Labels with Icons" 
            description="Enhanced labels with contextual icons"
            code={withIconsCode}
        >
            <div class="space-y-6 w-full max-w-xs">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text flex items-center gap-2">
                            <AlertCircle class="w-4 h-4 text-error" />
                            Critical information
                        </span>
                    </label>
                    <textarea class="textarea textarea-bordered textarea-error w-full" placeholder="Enter details"></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text flex items-center gap-2">
                            <CheckCircle class="w-4 h-4 text-success" />
                            Verified account
                        </span>
                    </label>
                    <input type="text" value="@verified_user" class="input input-bordered input-success w-full" readonly />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text flex items-center gap-2">
                            <Star class="w-4 h-4 text-warning" />
                            Premium feature
                        </span>
                    </label>
                    <select class="select select-bordered w-full">
                        <option>Basic plan</option>
                        <option>Premium plan</option>
                    </select>
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
                        <th>Class/Prop</th>
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
                <li>✅ Properly associates labels with form controls using <kbd class="kbd kbd-sm">for</kbd> attribute</li>
                <li>✅ Supports screen readers and assistive technologies</li>
                <li>✅ Maintains semantic HTML structure for form accessibility</li>
                <li>✅ Includes ARIA labels and descriptions when needed</li>
                <li>✅ Supports keyboard navigation and focus management</li>
                <li>✅ Provides clear visual hierarchy and contrast</li>
                <li>✅ Respects reduced motion preferences for floating labels</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Registration Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Registration Form</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Create Account</h4>
                        <div class="form-control space-y-4">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">
                                        Full Name
                                        <span class="text-error">*</span>
                                    </span>
                                </label>
                                <input type="text" placeholder="Enter your full name" class="input input-bordered" required />
                            </div>
                            
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">
                                        Email Address
                                        <span class="text-error">*</span>
                                    </span>
                                </label>
                                <input type="email" placeholder="Enter your email" class="input input-bordered" required />
                                <label class="label">
                                    <span class="label-text-alt">We'll never share your email with anyone</span>
                                </label>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">
                                        Password
                                        <span class="text-error">*</span>
                                    </span>
                                </label>
                                <input type="password" placeholder="Create a strong password" class="input input-bordered" required />
                                <label class="label">
                                    <span class="label-text-alt">Must be at least 8 characters long</span>
                                </label>
                            </div>

                            <label class="label cursor-pointer justify-start gap-3">
                                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={agreedToTerms} />
                                <span class="label-text">
                                    I agree to the <a href="#" class="link link-primary">Terms and Conditions</a>
                                </span>
                            </label>
                        </div>
                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-ghost">Cancel</button>
                            <button class="btn btn-primary" disabled={!agreedToTerms}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Contact Form</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Get in Touch</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">First Name</span>
                                </label>
                                <input type="text" placeholder="John" class="input input-bordered" />
                            </div>
                            
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="Doe" class="input input-bordered" />
                            </div>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Subject</span>
                            </label>
                            <select class="select select-bordered">
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Billing Question</option>
                                <option>Feature Request</option>
                            </select>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Message</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24" placeholder="Tell us how we can help..."></textarea>
                            <label class="label">
                                <span class="label-text-alt">Maximum 500 characters</span>
                            </label>
                        </div>

                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Settings Form</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Account Settings</h4>
                        <div class="form-control space-y-4">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text flex items-center gap-2">
                                        <Info class="w-4 h-4 text-info" />
                                        Display Name
                                    </span>
                                </label>
                                <input type="text" value="John Doe" class="input input-bordered" />
                                <label class="label">
                                    <span class="label-text-alt">This name will be visible to other users</span>
                                </label>
                            </div>

                            <div class="divider">Notifications</div>

                            <label class="label cursor-pointer">
                                <span class="label-text">Email notifications</span>
                                <input type="checkbox" class="toggle toggle-primary" checked />
                            </label>

                            <label class="label cursor-pointer">
                                <span class="label-text">Push notifications</span>
                                <input type="checkbox" class="toggle toggle-primary" />
                            </label>

                            <label class="label cursor-pointer">
                                <span class="label-text">Marketing emails</span>
                                <input type="checkbox" class="toggle toggle-secondary" />
                            </label>
                        </div>

                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-ghost">Reset</button>
                            <button class="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>