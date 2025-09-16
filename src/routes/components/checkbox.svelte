<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Check, X } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add checkbox';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<Checkbox />`;

    const variantsCode = `<Checkbox variant="primary" />
<Checkbox variant="secondary" />
<Checkbox variant="accent" />
<Checkbox variant="success" />
<Checkbox variant="warning" />
<Checkbox variant="error" />`;

    const sizesCode = `<Checkbox size="xs" />
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />`;

    const statesCode = `<Checkbox checked />
<Checkbox disabled />
<Checkbox indeterminate />
<Checkbox checked disabled />`;

    const withLabelsCode = `<label class="label cursor-pointer">
  <span class="label-text">Remember me</span>
  <Checkbox />
</label>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Enable notifications</span>
    <Checkbox checked />
  </label>
</div>`;

    const checkboxGroupCode = `<script>
  let selectedItems = ['item1', 'item3'];
<\/script>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Option 1</span>
    <Checkbox bind:group={selectedItems} value="item1" />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Option 2</span>
    <Checkbox bind:group={selectedItems} value="item2" />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Option 3</span>
    <Checkbox bind:group={selectedItems} value="item3" />
  </label>
</div>`;

    const customStyleCode = `<!-- Custom colored checkboxes -->
<Checkbox class="border-blue-500 [--chkbg:blue] [--chkfg:white]" />
<Checkbox class="border-purple-500 [--chkbg:purple] [--chkfg:white]" />
<Checkbox class="border-pink-500 [--chkbg:pink] [--chkfg:white]" />`;

    const apiProps = [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
            default: "'primary'",
            description: 'Visual style variant of the checkbox'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the checkbox'
        },
        {
            name: 'checked',
            type: 'boolean',
            default: 'false',
            description: 'Whether the checkbox is checked'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the checkbox interaction'
        },
        {
            name: 'indeterminate',
            type: 'boolean',
            default: 'false',
            description: 'Shows indeterminate state (partially checked)'
        },
        {
            name: 'value',
            type: 'string',
            default: 'undefined',
            description: 'Value for checkbox groups'
        },
        {
            name: 'group',
            type: 'string[]',
            default: 'undefined',
            description: 'Array of selected values for checkbox groups'
        }
    ];

    // State management for interactive examples
    let basicChecked = false;
    let notificationChecked = true;
    let rememberChecked = false;
    let selectedItems = ['item1', 'item3'];
    let customChecked = [false, true, false];
</script>

<svelte:head>
    <title>Checkbox - NUI Components</title>
    <meta name="description" content="Checkbox component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Checkbox</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Checkbox</h1>
                <p class="text-xl text-base-content/70">
                    Binary input component for selecting options with multiple variants and states.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/checkbox"
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
            description="Simple checkbox with default styling"
            code={basicUsage}
        >
            <input type="checkbox" class="checkbox" bind:checked={basicChecked} />
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various use cases"
            code={variantsCode}
        >
            <div class="flex flex-wrap gap-4">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <input type="checkbox" class="checkbox checkbox-secondary" checked />
                <input type="checkbox" class="checkbox checkbox-accent" checked />
                <input type="checkbox" class="checkbox checkbox-success" checked />
                <input type="checkbox" class="checkbox checkbox-warning" checked />
                <input type="checkbox" class="checkbox checkbox-error" checked />
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different checkbox sizes from extra small to large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <input type="checkbox" class="checkbox checkbox-primary checkbox-xs" checked />
                <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" checked />
                <input type="checkbox" class="checkbox checkbox-primary checkbox-md" checked />
                <input type="checkbox" class="checkbox checkbox-primary checkbox-lg" checked />
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Checkbox states including checked, disabled, and indeterminate"
            code={statesCode}
        >
            <div class="flex flex-wrap gap-4">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <input type="checkbox" class="checkbox checkbox-primary" disabled />
                <input type="checkbox" class="checkbox checkbox-primary" indeterminate />
                <input type="checkbox" class="checkbox checkbox-primary" checked disabled />
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Labels" 
            description="Checkboxes with proper labels for better accessibility"
            code={withLabelsCode}
        >
            <div class="space-y-4">
                <label class="label cursor-pointer max-w-xs">
                    <span class="label-text">Remember me</span>
                    <input type="checkbox" class="checkbox" bind:checked={rememberChecked} />
                </label>

                <div class="form-control max-w-xs">
                    <label class="label cursor-pointer">
                        <span class="label-text">Enable notifications</span>
                        <input type="checkbox" class="checkbox checkbox-primary" bind:checked={notificationChecked} />
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Checkbox Groups -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Checkbox Groups" 
            description="Multiple checkboxes working together as a group"
            code={checkboxGroupCode}
        >
            <div class="form-control max-w-xs">
                <label class="label cursor-pointer">
                    <span class="label-text">Option 1</span>
                    <input 
                        type="checkbox" 
                        class="checkbox checkbox-primary" 
                        value="item1"
                        checked={selectedItems.includes('item1')}
                        on:change={(e) => {
                            if (e.target.checked) {
                                selectedItems = [...selectedItems, 'item1'];
                            } else {
                                selectedItems = selectedItems.filter(item => item !== 'item1');
                            }
                        }}
                    />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Option 2</span>
                    <input 
                        type="checkbox" 
                        class="checkbox checkbox-primary" 
                        value="item2"
                        checked={selectedItems.includes('item2')}
                        on:change={(e) => {
                            if (e.target.checked) {
                                selectedItems = [...selectedItems, 'item2'];
                            } else {
                                selectedItems = selectedItems.filter(item => item !== 'item2');
                            }
                        }}
                    />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Option 3</span>
                    <input 
                        type="checkbox" 
                        class="checkbox checkbox-primary" 
                        value="item3"
                        checked={selectedItems.includes('item3')}
                        on:change={(e) => {
                            if (e.target.checked) {
                                selectedItems = [...selectedItems, 'item3'];
                            } else {
                                selectedItems = selectedItems.filter(item => item !== 'item3');
                            }
                        }}
                    />
                </label>
                <div class="mt-4 text-sm text-base-content/70">
                    Selected: {selectedItems.join(', ') || 'None'}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Styling" 
            description="Custom colored checkboxes using CSS variables"
            code={customStyleCode}
        >
            <div class="flex flex-wrap gap-4">
                <input 
                    type="checkbox" 
                    class="checkbox border-blue-500 [--chkbg:theme(colors.blue.500)] [--chkfg:white]" 
                    bind:checked={customChecked[0]}
                />
                <input 
                    type="checkbox" 
                    class="checkbox border-purple-500 [--chkbg:theme(colors.purple.500)] [--chkfg:white]" 
                    bind:checked={customChecked[1]}
                />
                <input 
                    type="checkbox" 
                    class="checkbox border-pink-500 [--chkbg:theme(colors.pink.500)] [--chkfg:white]" 
                    bind:checked={customChecked[2]}
                />
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Proper label association for form controls</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Terms and Conditions -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Terms and Conditions</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text">
                                    I agree to the <a href="#" class="link link-primary">Terms and Conditions</a>
                                </span>
                                <input type="checkbox" class="checkbox checkbox-primary" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">
                                    Subscribe to newsletter (optional)
                                </span>
                                <input type="checkbox" class="checkbox checkbox-secondary" />
                            </label>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Panel -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Settings Panel</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Notification Preferences</h4>
                        <div class="form-control space-y-2">
                            <label class="label cursor-pointer">
                                <span class="label-text">Email notifications</span>
                                <input type="checkbox" class="checkbox checkbox-primary" checked />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Push notifications</span>
                                <input type="checkbox" class="checkbox checkbox-primary" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">SMS notifications</span>
                                <input type="checkbox" class="checkbox checkbox-primary" disabled />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Marketing emails</span>
                                <input type="checkbox" class="checkbox checkbox-secondary" />
                            </label>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-ghost">Reset</button>
                            <button class="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Task List -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Task List</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Today's Tasks</h4>
                        <div class="form-control space-y-2">
                            <label class="label cursor-pointer">
                                <span class="label-text line-through opacity-60">Review pull requests</span>
                                <input type="checkbox" class="checkbox checkbox-success" checked />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text line-through opacity-60">Update documentation</span>
                                <input type="checkbox" class="checkbox checkbox-success" checked />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Implement new feature</span>
                                <input type="checkbox" class="checkbox checkbox-warning" indeterminate />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Test deployment</span>
                                <input type="checkbox" class="checkbox checkbox-primary" />
                            </label>
                        </div>
                        <div class="mt-4 text-sm text-base-content/70">
                            2 of 4 tasks completed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>