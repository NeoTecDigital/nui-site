<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Power, Eye, EyeOff, Volume2, VolumeX, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-svelte';

    // State for interactive examples
    let basicToggle = false;
    let primaryToggle = true;
    let secondaryToggle = false;
    let accentToggle = true;
    let successToggle = false;
    let warningToggle = true;
    let errorToggle = false;
    
    let powerMode = false;
    let visibility = true;
    let soundEnabled = false;
    let autoSave = true;
    
    // Toggle groups for exclusive selection
    let selectedAlignment = 'left';
    let selectedFormat = [];
    
    // Toolbar states
    let toolbarStates = {
        bold: false,
        italic: false,
        underline: false
    };

    const installCommand = 'npx @nui/cli add toggle';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  
  let pressed = false;
<\/script>

<Toggle bind:pressed>
  Toggle me
</Toggle>`;

    const variantsCode = `<Toggle variant="primary" bind:pressed>Primary</Toggle>
<Toggle variant="secondary" bind:pressed>Secondary</Toggle>
<Toggle variant="accent" bind:pressed>Accent</Toggle>
<Toggle variant="success" bind:pressed>Success</Toggle>
<Toggle variant="warning" bind:pressed>Warning</Toggle>
<Toggle variant="error" bind:pressed>Error</Toggle>`;

    const sizesCode = `<Toggle size="xs" bind:pressed>Extra Small</Toggle>
<Toggle size="sm" bind:pressed>Small</Toggle>
<Toggle size="md" bind:pressed>Medium</Toggle>
<Toggle size="lg" bind:pressed>Large</Toggle>`;

    const statesCode = `<Toggle bind:pressed>Normal</Toggle>
<Toggle bind:pressed disabled>Disabled Off</Toggle>
<Toggle bind:pressed={true} disabled>Disabled On</Toggle>`;

    const iconToggleCode = `<script>
  import { Eye, EyeOff, Volume2, VolumeX, Power } from 'lucide-svelte';
  
  let visibility = true;
  let sound = false;
  let power = false;
<\/script>

<Toggle bind:pressed={visibility}>
  {#if visibility}
    <Eye class="w-4 h-4" />
  {:else}
    <EyeOff class="w-4 h-4" />
  {/if}
  {visibility ? 'Visible' : 'Hidden'}
</Toggle>

<Toggle bind:pressed={sound} variant="accent">
  {#if sound}
    <Volume2 class="w-4 h-4" />
  {:else}
    <VolumeX class="w-4 h-4" />
  {/if}
</Toggle>

<Toggle bind:pressed={power} variant="success">
  <Power class="w-4 h-4" />
  Power
</Toggle>`;

    const toggleGroupCode = `<script>
  import { AlignLeft, AlignCenter, AlignRight } from 'lucide-svelte';
  
  let alignment = 'left';
<\/script>

<div class="btn-group">
  <button 
    class="btn {alignment === 'left' ? 'btn-active' : ''}"
    on:click={() => alignment = 'left'}
  >
    <AlignLeft class="w-4 h-4" />
  </button>
  <button 
    class="btn {alignment === 'center' ? 'btn-active' : ''}"
    on:click={() => alignment = 'center'}
  >
    <AlignCenter class="w-4 h-4" />
  </button>
  <button 
    class="btn {alignment === 'right' ? 'btn-active' : ''}"
    on:click={() => alignment = 'right'}
  >
    <AlignRight class="w-4 h-4" />
  </button>
</div>`;

    const toolbarCode = `<script>
  import { Bold, Italic, Underline } from 'lucide-svelte';
  
  let formatting = {
    bold: false,
    italic: false,
    underline: false
  };
<\/script>

<div class="btn-group">
  <button 
    class="btn btn-sm {formatting.bold ? 'btn-active' : ''}"
    on:click={() => formatting.bold = !formatting.bold}
  >
    <Bold class="w-4 h-4" />
  </button>
  <button 
    class="btn btn-sm {formatting.italic ? 'btn-active' : ''}"
    on:click={() => formatting.italic = !formatting.italic}
  >
    <Italic class="w-4 h-4" />
  </button>
  <button 
    class="btn btn-sm {formatting.underline ? 'btn-active' : ''}"
    on:click={() => formatting.underline = !formatting.underline}
  >
    <Underline class="w-4 h-4" />
  </button>
</div>`;

    const customStyleCode = `<!-- Custom colored toggle buttons -->
<Toggle class="btn-outline border-blue-500 hover:bg-blue-500 hover:border-blue-500" bind:pressed>
  Custom Blue
</Toggle>
<Toggle class="btn-outline border-purple-500 hover:bg-purple-500 hover:border-purple-500" bind:pressed>
  Custom Purple
</Toggle>
<Toggle class="btn-outline border-pink-500 hover:bg-pink-500 hover:border-pink-500" bind:pressed>
  Custom Pink
</Toggle>`;

    const apiProps = [
        {
            name: 'pressed',
            type: 'boolean',
            default: 'false',
            description: 'Whether the toggle button is pressed/active'
        },
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'ghost' | 'link' | 'outline'",
            default: "'primary'",
            description: 'Visual style variant of the toggle button'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the toggle button'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the toggle button interaction'
        },
        {
            name: 'circle',
            type: 'boolean',
            default: 'false',
            description: 'Makes the toggle button circular'
        },
        {
            name: 'square',
            type: 'boolean',
            default: 'false',
            description: 'Makes the toggle button square'
        },
        {
            name: 'wide',
            type: 'boolean',
            default: 'false',
            description: 'Makes the toggle button wider'
        },
        {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Makes the toggle button full width'
        }
    ];
</script>

<svelte:head>
    <title>Toggle - NUI Components</title>
    <meta name="description" content="Toggle component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Toggle</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Toggle</h1>
                <p class="text-xl text-base-content/70">
                    Toggle button component for on/off states with multiple variants, sizes, and interactive behaviors.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/toggle"
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
            description="Simple toggle button with default styling"
            code={basicUsage}
        >
            <button 
                class="btn {basicToggle ? 'btn-active' : ''}"
                on:click={() => basicToggle = !basicToggle}
            >
                Toggle me
            </button>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various contexts"
            code={variantsCode}
        >
            <div class="flex flex-wrap gap-4">
                <button 
                    class="btn btn-primary {primaryToggle ? 'btn-active' : ''}"
                    on:click={() => primaryToggle = !primaryToggle}
                >
                    Primary
                </button>
                <button 
                    class="btn btn-secondary {secondaryToggle ? 'btn-active' : ''}"
                    on:click={() => secondaryToggle = !secondaryToggle}
                >
                    Secondary
                </button>
                <button 
                    class="btn btn-accent {accentToggle ? 'btn-active' : ''}"
                    on:click={() => accentToggle = !accentToggle}
                >
                    Accent
                </button>
                <button 
                    class="btn btn-success {successToggle ? 'btn-active' : ''}"
                    on:click={() => successToggle = !successToggle}
                >
                    Success
                </button>
                <button 
                    class="btn btn-warning {warningToggle ? 'btn-active' : ''}"
                    on:click={() => warningToggle = !warningToggle}
                >
                    Warning
                </button>
                <button 
                    class="btn btn-error {errorToggle ? 'btn-active' : ''}"
                    on:click={() => errorToggle = !errorToggle}
                >
                    Error
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different toggle button sizes from extra small to large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <button class="btn btn-primary btn-xs btn-active">Extra Small</button>
                <button class="btn btn-primary btn-sm btn-active">Small</button>
                <button class="btn btn-primary btn-md btn-active">Medium</button>
                <button class="btn btn-primary btn-lg btn-active">Large</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Toggle button states including normal and disabled"
            code={statesCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-primary btn-active">Normal (Active)</button>
                <button class="btn btn-primary" disabled>Disabled Off</button>
                <button class="btn btn-primary btn-active" disabled>Disabled On</button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Icon Toggles -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Icon Toggles" 
            description="Toggle buttons with icons that change based on state"
            code={iconToggleCode}
        >
            <div class="flex flex-wrap gap-4">
                <button 
                    class="btn btn-ghost {visibility ? 'btn-active' : ''}"
                    on:click={() => visibility = !visibility}
                >
                    {#if visibility}
                        <Eye class="w-4 h-4 mr-2" />
                        Visible
                    {:else}
                        <EyeOff class="w-4 h-4 mr-2" />
                        Hidden
                    {/if}
                </button>
                
                <button 
                    class="btn btn-accent btn-circle {soundEnabled ? 'btn-active' : ''}"
                    on:click={() => soundEnabled = !soundEnabled}
                >
                    {#if soundEnabled}
                        <Volume2 class="w-4 h-4" />
                    {:else}
                        <VolumeX class="w-4 h-4" />
                    {/if}
                </button>
                
                <button 
                    class="btn btn-success {powerMode ? 'btn-active' : ''}"
                    on:click={() => powerMode = !powerMode}
                >
                    <Power class="w-4 h-4 mr-2" />
                    Power
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Toggle Groups -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Toggle Groups" 
            description="Exclusive selection with toggle button groups"
            code={toggleGroupCode}
        >
            <div class="space-y-6">
                <!-- Alignment Toggle Group -->
                <div>
                    <h4 class="font-medium mb-2">Text Alignment</h4>
                    <div class="btn-group">
                        <button 
                            class="btn btn-sm {selectedAlignment === 'left' ? 'btn-active' : ''}"
                            on:click={() => selectedAlignment = 'left'}
                        >
                            <AlignLeft class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm {selectedAlignment === 'center' ? 'btn-active' : ''}"
                            on:click={() => selectedAlignment = 'center'}
                        >
                            <AlignCenter class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm {selectedAlignment === 'right' ? 'btn-active' : ''}"
                            on:click={() => selectedAlignment = 'right'}
                        >
                            <AlignRight class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="text-sm text-base-content/70 mt-2">
                        Selected: {selectedAlignment}
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Toolbar Example -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Toolbar Toggles" 
            description="Multi-select toolbar with formatting toggle buttons"
            code={toolbarCode}
        >
            <div class="space-y-4">
                <div>
                    <h4 class="font-medium mb-2">Text Formatting</h4>
                    <div class="btn-group">
                        <button 
                            class="btn btn-sm {toolbarStates.bold ? 'btn-active' : ''}"
                            on:click={() => toolbarStates.bold = !toolbarStates.bold}
                        >
                            <Bold class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm {toolbarStates.italic ? 'btn-active' : ''}"
                            on:click={() => toolbarStates.italic = !toolbarStates.italic}
                        >
                            <Italic class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm {toolbarStates.underline ? 'btn-active' : ''}"
                            on:click={() => toolbarStates.underline = !toolbarStates.underline}
                        >
                            <Underline class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="text-sm text-base-content/70 mt-2">
                        Active formatting: {Object.entries(toolbarStates).filter(([_, active]) => active).map(([key]) => key).join(', ') || 'None'}
                    </div>
                </div>
                
                <!-- Sample text with applied formatting -->
                <div class="card bg-base-100 border p-4">
                    <div 
                        class="text-lg {toolbarStates.bold ? 'font-bold' : ''} {toolbarStates.italic ? 'italic' : ''} {toolbarStates.underline ? 'underline' : ''}"
                    >
                        Sample text with applied formatting
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Styling" 
            description="Custom colored toggle buttons with outline variants"
            code={customStyleCode}
        >
            <div class="flex flex-wrap gap-4">
                <button class="btn btn-outline border-blue-500 hover:bg-blue-500 hover:border-blue-500 btn-active">
                    Custom Blue
                </button>
                <button class="btn btn-outline border-purple-500 hover:bg-purple-500 hover:border-purple-500">
                    Custom Purple
                </button>
                <button class="btn btn-outline border-pink-500 hover:bg-pink-500 hover:border-pink-500 btn-active">
                    Custom Pink
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Space</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Includes proper ARIA attributes (aria-pressed for toggle state)</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Announces state changes to assistive technology</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Proper role semantics for toggle buttons</li>
                <li>✅ Clear visual distinction between pressed and unpressed states</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Settings Panel -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Application Settings</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">User Preferences</h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium">Auto-save documents</div>
                                    <div class="text-sm text-base-content/70">Automatically save changes every 5 minutes</div>
                                </div>
                                <button 
                                    class="btn btn-success btn-sm {autoSave ? 'btn-active' : ''}"
                                    on:click={() => autoSave = !autoSave}
                                >
                                    {autoSave ? 'Enabled' : 'Disabled'}
                                </button>
                            </div>
                            
                            <div class="divider"></div>
                            
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium">Dark Mode</div>
                                    <div class="text-sm text-base-content/70">Switch to dark theme</div>
                                </div>
                                <button 
                                    class="btn btn-ghost btn-sm {powerMode ? 'btn-active' : ''}"
                                    on:click={() => powerMode = !powerMode}
                                >
                                    <Power class="w-4 h-4 mr-2" />
                                    {powerMode ? 'On' : 'Off'}
                                </button>
                            </div>
                        </div>
                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rich Text Editor Toolbar -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Rich Text Editor Toolbar</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="border-b pb-4 mb-4">
                            <div class="flex items-center space-x-2">
                                <!-- Formatting Group -->
                                <div class="btn-group">
                                    <button 
                                        class="btn btn-sm btn-ghost {toolbarStates.bold ? 'btn-active' : ''}"
                                        on:click={() => toolbarStates.bold = !toolbarStates.bold}
                                        title="Bold"
                                    >
                                        <Bold class="w-4 h-4" />
                                    </button>
                                    <button 
                                        class="btn btn-sm btn-ghost {toolbarStates.italic ? 'btn-active' : ''}"
                                        on:click={() => toolbarStates.italic = !toolbarStates.italic}
                                        title="Italic"
                                    >
                                        <Italic class="w-4 h-4" />
                                    </button>
                                    <button 
                                        class="btn btn-sm btn-ghost {toolbarStates.underline ? 'btn-active' : ''}"
                                        on:click={() => toolbarStates.underline = !toolbarStates.underline}
                                        title="Underline"
                                    >
                                        <Underline class="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <div class="divider divider-horizontal"></div>
                                
                                <!-- Alignment Group -->
                                <div class="btn-group">
                                    <button 
                                        class="btn btn-sm btn-ghost {selectedAlignment === 'left' ? 'btn-active' : ''}"
                                        on:click={() => selectedAlignment = 'left'}
                                        title="Align Left"
                                    >
                                        <AlignLeft class="w-4 h-4" />
                                    </button>
                                    <button 
                                        class="btn btn-sm btn-ghost {selectedAlignment === 'center' ? 'btn-active' : ''}"
                                        on:click={() => selectedAlignment = 'center'}
                                        title="Align Center"
                                    >
                                        <AlignCenter class="w-4 h-4" />
                                    </button>
                                    <button 
                                        class="btn btn-sm btn-ghost {selectedAlignment === 'right' ? 'btn-active' : ''}"
                                        on:click={() => selectedAlignment = 'right'}
                                        title="Align Right"
                                    >
                                        <AlignRight class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Sample Content -->
                        <div class="min-h-32 p-4 border rounded">
                            <div 
                                class="text-lg {toolbarStates.bold ? 'font-bold' : ''} {toolbarStates.italic ? 'italic' : ''} {toolbarStates.underline ? 'underline' : ''}"
                                style="text-align: {selectedAlignment};"
                            >
                                Sample text content with applied formatting and alignment. Click the toolbar buttons above to see the changes applied in real-time.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Media Controls -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Media Player Controls</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Audio Settings</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="text-center">
                                <button 
                                    class="btn btn-circle btn-lg btn-ghost {soundEnabled ? 'btn-active' : ''}"
                                    on:click={() => soundEnabled = !soundEnabled}
                                >
                                    {#if soundEnabled}
                                        <Volume2 class="w-6 h-6" />
                                    {:else}
                                        <VolumeX class="w-6 h-6" />
                                    {/if}
                                </button>
                                <div class="text-sm mt-2">Sound</div>
                            </div>
                            
                            <div class="text-center">
                                <button 
                                    class="btn btn-circle btn-lg btn-ghost {visibility ? 'btn-active' : ''}"
                                    on:click={() => visibility = !visibility}
                                >
                                    {#if visibility}
                                        <Eye class="w-6 h-6" />
                                    {:else}
                                        <EyeOff class="w-6 h-6" />
                                    {/if}
                                </button>
                                <div class="text-sm mt-2">Subtitles</div>
                            </div>
                            
                            <div class="text-center">
                                <button 
                                    class="btn btn-circle btn-lg btn-success {powerMode ? 'btn-active' : ''}"
                                    on:click={() => powerMode = !powerMode}
                                >
                                    <Power class="w-6 h-6" />
                                </button>
                                <div class="text-sm mt-2">Power Save</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>