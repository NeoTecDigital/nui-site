<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Settings, Moon, Sun, Bell, Volume2 } from 'lucide-svelte';

    // State for interactive examples
    let basicToggle = false;
    let primaryToggle = true;
    let secondaryToggle = false;
    let accentToggle = true;
    let successToggle = false;
    let warningToggle = true;
    let errorToggle = false;
    
    let darkMode = false;
    let notifications = true;
    let emailAlerts = false;
    let soundEnabled = true;
    let autoSave = true;
    let marketing = false;

    const installCommand = 'npx @nui/cli add switch';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  
  let checked = false;
<\/script>

<Switch bind:checked>
  Enable feature
</Switch>`;

    const variantsCode = `<Switch variant="primary" bind:checked>Primary</Switch>
<Switch variant="secondary" bind:checked>Secondary</Switch>
<Switch variant="accent" bind:checked>Accent</Switch>
<Switch variant="success" bind:checked>Success</Switch>
<Switch variant="warning" bind:checked>Warning</Switch>
<Switch variant="error" bind:checked>Error</Switch>`;

    const sizesCode = `<Switch size="xs" bind:checked>Extra Small</Switch>
<Switch size="sm" bind:checked>Small</Switch>
<Switch size="md" bind:checked>Medium</Switch>
<Switch size="lg" bind:checked>Large</Switch>`;

    const statesCode = `<Switch bind:checked>Normal</Switch>
<Switch bind:checked disabled>Disabled Off</Switch>
<Switch bind:checked={true} disabled>Disabled On</Switch>`;

    const withLabelsCode = `<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Dark Mode</span>
    <Switch bind:checked />
  </label>
</div>

<div class="form-control">
  <label class="label cursor-pointer">
    <div>
      <div class="label-text">Notifications</div>
      <div class="label-text-alt">Receive push notifications</div>
    </div>
    <Switch bind:checked />
  </label>
</div>`;

    const settingsGroupCode = `<script>
  let settings = {
    darkMode: false,
    notifications: true,
    autoSave: true,
    marketing: false
  };
<\/script>

<div class="space-y-4">
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Dark Mode</span>
      <Switch bind:checked={settings.darkMode} />
    </label>
  </div>
  
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Push Notifications</span>
      <Switch bind:checked={settings.notifications} />
    </label>
  </div>
  
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Auto Save</span>
      <Switch bind:checked={settings.autoSave} />
    </label>
  </div>
  
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Marketing Emails</span>
      <Switch bind:checked={settings.marketing} />
    </label>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'checked',
            type: 'boolean',
            default: 'false',
            description: 'Whether the switch is checked/enabled'
        },
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
            default: "'primary'",
            description: 'Visual style variant of the switch'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the switch'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the switch interaction'
        },
        {
            name: 'name',
            type: 'string',
            default: 'undefined',
            description: 'Name attribute for form handling'
        },
        {
            name: 'value',
            type: 'string',
            default: 'undefined',
            description: 'Value attribute for form handling'
        }
    ];
</script>

<svelte:head>
    <title>Switch - NUI Components</title>
    <meta name="description" content="Switch component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Switch</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Switch</h1>
                <p class="text-xl text-base-content/70">
                    Toggle switch component for binary choices with multiple variants and states.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/switch"
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
            description="Simple toggle switch with default styling"
            code={basicUsage}
        >
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">Enable feature</span>
                    <input type="checkbox" class="toggle" bind:checked={basicToggle} />
                </label>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various contexts"
            code={variantsCode}
        >
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Primary</span>
                        <input type="checkbox" class="toggle toggle-primary" bind:checked={primaryToggle} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Secondary</span>
                        <input type="checkbox" class="toggle toggle-secondary" bind:checked={secondaryToggle} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Accent</span>
                        <input type="checkbox" class="toggle toggle-accent" bind:checked={accentToggle} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Success</span>
                        <input type="checkbox" class="toggle toggle-success" bind:checked={successToggle} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Warning</span>
                        <input type="checkbox" class="toggle toggle-warning" bind:checked={warningToggle} />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Error</span>
                        <input type="checkbox" class="toggle toggle-error" bind:checked={errorToggle} />
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different switch sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Extra Small</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Small</span>
                        <input type="checkbox" class="toggle toggle-sm toggle-primary" checked />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Medium</span>
                        <input type="checkbox" class="toggle toggle-md toggle-primary" checked />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Large</span>
                        <input type="checkbox" class="toggle toggle-lg toggle-primary" checked />
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Switch states including normal and disabled"
            code={statesCode}
        >
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Normal</span>
                        <input type="checkbox" class="toggle toggle-primary" checked />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Disabled Off</span>
                        <input type="checkbox" class="toggle toggle-primary" disabled />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Disabled On</span>
                        <input type="checkbox" class="toggle toggle-primary" disabled checked />
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Labels and Descriptions" 
            description="Switches with descriptive labels and helper text"
            code={withLabelsCode}
        >
            <div class="space-y-4 w-full max-w-sm">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div class="flex items-center">
                            <Moon class="w-4 h-4 mr-2" />
                            <span class="label-text">Dark Mode</span>
                        </div>
                        <input type="checkbox" class="toggle toggle-primary" bind:checked={darkMode} />
                    </label>
                </div>
                
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div>
                            <div class="flex items-center">
                                <Bell class="w-4 h-4 mr-2" />
                                <div class="label-text">Notifications</div>
                            </div>
                            <div class="label-text-alt">Receive push notifications</div>
                        </div>
                        <input type="checkbox" class="toggle toggle-primary" bind:checked={notifications} />
                    </label>
                </div>
                
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div>
                            <div class="flex items-center">
                                <Volume2 class="w-4 h-4 mr-2" />
                                <div class="label-text">Sound Effects</div>
                            </div>
                            <div class="label-text-alt">Play sounds for actions</div>
                        </div>
                        <input type="checkbox" class="toggle toggle-accent" bind:checked={soundEnabled} />
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Settings Group -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Settings Panel" 
            description="Group of switches for application settings"
            code={settingsGroupCode}
        >
            <div class="card bg-base-100 border w-full max-w-md">
                <div class="card-body">
                    <div class="flex items-center mb-4">
                        <Settings class="w-5 h-5 mr-2" />
                        <h3 class="card-title text-lg">Settings</h3>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="flex items-center">
                                    <Moon class="w-4 h-4 mr-2" />
                                    <span class="label-text">Dark Mode</span>
                                </div>
                                <input type="checkbox" class="toggle toggle-primary" bind:checked={darkMode} />
                            </label>
                        </div>
                        
                        <div class="divider my-2"></div>
                        
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="flex items-center">
                                    <Bell class="w-4 h-4 mr-2" />
                                    <span class="label-text">Push Notifications</span>
                                </div>
                                <input type="checkbox" class="toggle toggle-success" bind:checked={notifications} />
                            </label>
                        </div>
                        
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text">Email Alerts</span>
                                <input type="checkbox" class="toggle toggle-info" bind:checked={emailAlerts} />
                            </label>
                        </div>
                        
                        <div class="divider my-2"></div>
                        
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text">Auto Save</span>
                                <input type="checkbox" class="toggle toggle-accent" bind:checked={autoSave} />
                            </label>
                        </div>
                        
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text">Marketing Emails</span>
                                <input type="checkbox" class="toggle toggle-warning" bind:checked={marketing} />
                            </label>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Space</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles (role="switch")</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Announces state changes to assistive technology</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Proper labeling through associated label elements</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Preferences Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Preferences Form</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Account Preferences</h4>
                        <div class="space-y-4">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Two-factor authentication</span>
                                    <input type="checkbox" class="toggle toggle-success" checked />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Email notifications</span>
                                    <input type="checkbox" class="toggle toggle-primary" checked />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text">Marketing communications</span>
                                    <input type="checkbox" class="toggle toggle-warning" />
                                </label>
                            </div>
                        </div>
                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-primary">Save Preferences</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Feature Toggles -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Feature Toggles</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Beta Features</h4>
                        <div class="space-y-4">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <div>
                                        <div class="label-text">New Dashboard</div>
                                        <div class="label-text-alt">Try our redesigned dashboard interface</div>
                                    </div>
                                    <input type="checkbox" class="toggle toggle-accent" />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <div>
                                        <div class="label-text">Advanced Analytics</div>
                                        <div class="label-text-alt">Enable detailed usage analytics</div>
                                    </div>
                                    <input type="checkbox" class="toggle toggle-info" checked />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <div>
                                        <div class="label-text">AI Assistant</div>
                                        <div class="label-text-alt">Experimental AI-powered help</div>
                                    </div>
                                    <input type="checkbox" class="toggle toggle-secondary" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>