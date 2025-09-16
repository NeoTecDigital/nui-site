<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, MessageSquare, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add textarea';

    const basicUsage = `<script>
  import { Textarea } from '@nui/core';
<\/script>

<Textarea placeholder="Enter your message..." />`;

    const variantsCode = `<Textarea variant="bordered" placeholder="Bordered textarea" />
<Textarea variant="ghost" placeholder="Ghost textarea" />
<Textarea variant="primary" placeholder="Primary textarea" />
<Textarea variant="secondary" placeholder="Secondary textarea" />
<Textarea variant="accent" placeholder="Accent textarea" />`;

    const sizesCode = `<Textarea size="xs" placeholder="Extra Small" />
<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`;

    const statesCode = `<Textarea placeholder="Normal state" />
<Textarea placeholder="Disabled state" disabled />
<Textarea placeholder="Error state" class="textarea-error" />
<Textarea placeholder="Success state" class="textarea-success" />
<Textarea placeholder="Warning state" class="textarea-warning" />`;

    const withLabelsCode = `<div class="form-control">
  <label class="label">
    <span class="label-text">Your message</span>
  </label>
  <textarea class="textarea textarea-bordered" placeholder="Enter your message..."></textarea>
  <label class="label">
    <span class="label-text-alt">Helper text goes here</span>
  </label>
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text">Required field</span>
    <span class="label-text-alt text-error">*</span>
  </label>
  <textarea class="textarea textarea-bordered textarea-error" placeholder="This field is required"></textarea>
  <label class="label">
    <span class="label-text-alt text-error">This field is required</span>
  </label>
</div>`;

    const autoResizeCode = `<script>
  let value = '';
  
  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
<\/script>

<textarea 
  bind:value
  class="textarea textarea-bordered resize-none"
  placeholder="Type something and watch me grow..."
  on:input={(e) => autoResize(e.target)}
  rows="2"
></textarea>`;

    const apiProps = [
        {
            name: 'variant',
            type: "'bordered' | 'ghost' | 'primary' | 'secondary' | 'accent'",
            default: "'bordered'",
            description: 'Visual style variant of the textarea'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the textarea'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the textarea interaction'
        },
        {
            name: 'placeholder',
            type: 'string',
            default: 'undefined',
            description: 'Placeholder text shown when textarea is empty'
        },
        {
            name: 'rows',
            type: 'number',
            default: '3',
            description: 'Number of visible text lines'
        },
        {
            name: 'cols',
            type: 'number',
            default: 'undefined',
            description: 'Visible width of the textarea'
        },
        {
            name: 'maxlength',
            type: 'number',
            default: 'undefined',
            description: 'Maximum number of characters allowed'
        },
        {
            name: 'readonly',
            type: 'boolean',
            default: 'false',
            description: 'Makes the textarea read-only'
        },
        {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Makes the textarea required for form validation'
        }
    ];

    // Auto-resize functionality
    let autoResizeValue = '';
    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
</script>

<svelte:head>
    <title>Textarea - NUI Components</title>
    <meta name="description" content="Textarea component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Textarea</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Textarea</h1>
                <p class="text-xl text-base-content/70">
                    Multi-line text input component with various styles, sizes, and validation states.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/textarea"
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
            description="Simple textarea with default styling"
            code={basicUsage}
        >
            <textarea class="textarea textarea-bordered" placeholder="Enter your message..."></textarea>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for various use cases"
            code={variantsCode}
        >
            <div class="space-y-4">
                <textarea class="textarea textarea-bordered w-full" placeholder="Bordered textarea"></textarea>
                <textarea class="textarea textarea-ghost w-full" placeholder="Ghost textarea"></textarea>
                <textarea class="textarea textarea-primary w-full" placeholder="Primary textarea"></textarea>
                <textarea class="textarea textarea-secondary w-full" placeholder="Secondary textarea"></textarea>
                <textarea class="textarea textarea-accent w-full" placeholder="Accent textarea"></textarea>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different textarea sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-4">
                <textarea class="textarea textarea-bordered textarea-xs w-full" placeholder="Extra Small" rows="2"></textarea>
                <textarea class="textarea textarea-bordered textarea-sm w-full" placeholder="Small" rows="2"></textarea>
                <textarea class="textarea textarea-bordered textarea-md w-full" placeholder="Medium"></textarea>
                <textarea class="textarea textarea-bordered textarea-lg w-full" placeholder="Large"></textarea>
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Textarea states including disabled, error, success, and warning"
            code={statesCode}
        >
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <textarea class="textarea textarea-bordered w-full" placeholder="Normal state"></textarea>
                    <div class="text-sm text-base-content/70">Normal</div>
                </div>
                <div class="flex items-center gap-2">
                    <textarea class="textarea textarea-bordered w-full" placeholder="Disabled state" disabled></textarea>
                    <div class="text-sm text-base-content/70">Disabled</div>
                </div>
                <div class="flex items-center gap-2">
                    <textarea class="textarea textarea-bordered textarea-error w-full" placeholder="Error state"></textarea>
                    <AlertCircle class="w-5 h-5 text-error" />
                </div>
                <div class="flex items-center gap-2">
                    <textarea class="textarea textarea-bordered textarea-success w-full" placeholder="Success state"></textarea>
                    <CheckCircle class="w-5 h-5 text-success" />
                </div>
                <div class="flex items-center gap-2">
                    <textarea class="textarea textarea-bordered textarea-warning w-full" placeholder="Warning state"></textarea>
                    <AlertTriangle class="w-5 h-5 text-warning" />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Labels and Helper Text" 
            description="Textarea with labels, helper text, and validation messages"
            code={withLabelsCode}
        >
            <div class="space-y-6">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Your message</span>
                    </label>
                    <textarea class="textarea textarea-bordered" placeholder="Enter your message..."></textarea>
                    <label class="label">
                        <span class="label-text-alt">Helper text goes here</span>
                    </label>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Required field</span>
                        <span class="label-text-alt text-error">*</span>
                    </label>
                    <textarea class="textarea textarea-bordered textarea-error" placeholder="This field is required"></textarea>
                    <label class="label">
                        <span class="label-text-alt text-error">
                            <AlertCircle class="w-4 h-4 inline mr-1" />
                            This field is required
                        </span>
                    </label>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Auto-resize -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Auto-resize Textarea" 
            description="Textarea that automatically adjusts its height based on content"
            code={autoResizeCode}
        >
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Auto-resizing textarea</span>
                </label>
                <textarea 
                    bind:value={autoResizeValue}
                    class="textarea textarea-bordered resize-none w-full"
                    placeholder="Type something and watch me grow..."
                    on:input={(e) => autoResize(e.target)}
                    rows="2"
                ></textarea>
                <label class="label">
                    <span class="label-text-alt">This textarea expands as you type</span>
                </label>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and arrow keys</li>
                <li>✅ Includes proper ARIA attributes and roles</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Proper labeling with <code>label</code> elements</li>
                <li>✅ Error states announced to assistive technologies</li>
                <li>✅ Respects reduced motion preferences</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Contact Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Contact Form</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Send us a message</h4>
                        <div class="form-control space-y-4">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Subject</span>
                                </label>
                                <input type="text" placeholder="Enter subject" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Message</span>
                                </label>
                                <textarea class="textarea textarea-bordered" placeholder="Enter your message..." rows="4"></textarea>
                            </div>
                            <button class="btn btn-primary">
                                <MessageSquare class="w-4 h-4 mr-2" />
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Feedback Form -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Feedback Form with Character Counter</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Share your feedback</h4>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Your feedback</span>
                                <span class="label-text-alt">Maximum 500 characters</span>
                            </label>
                            <textarea 
                                class="textarea textarea-bordered" 
                                placeholder="Tell us what you think..."
                                maxlength="500"
                                rows="5"
                            ></textarea>
                            <label class="label">
                                <span class="label-text-alt">Help us improve our product</span>
                                <span class="label-text-alt">0/500</span>
                            </label>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-ghost">Cancel</button>
                            <button class="btn btn-primary">Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Code Editor Style -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Code Editor Style</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">CSS Editor</h4>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Custom CSS</span>
                            </label>
                            <textarea 
                                class="textarea textarea-bordered font-mono text-sm" 
                                placeholder="/* Enter your CSS code here */"
                                rows="8"
                            ></textarea>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-outline">Reset</button>
                            <button class="btn btn-primary">Apply CSS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>