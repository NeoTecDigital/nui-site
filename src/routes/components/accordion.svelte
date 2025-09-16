<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronDown, ChevronRight, Plus, Minus, HelpCircle, Settings, User, Shield, CreditCard, Bell } from 'lucide-svelte';

    // State for different accordion examples
    let singleOpen = 0;
    let multipleOpen = [true, false, false];
    let controlledOpen = false;
    let nestedOpen = [false, false];
    let nestedSubOpen = [false, false];
    let faqOpen = [false, false, false, false];
    let settingsOpen = [false, false, false];

    const installCommand = 'npx @nui/cli add accordion';

    const basicUsage = `<script>
  import { Accordion } from '@nui/core';
  let open = false;
<\/script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" bind:checked={open} />
  <div class="collapse-title text-xl font-medium">
    Click me to show/hide content
  </div>
  <div class="collapse-content">
    <p>This is the content that can be shown or hidden.</p>
  </div>
</div>`;

    const singleAccordionCode = `<script>
  let activeIndex = 0;
<\/script>

<div class="join join-vertical w-full">
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input 
      type="radio" 
      name="my-accordion-1" 
      bind:group={activeIndex} 
      value={0}
    />
    <div class="collapse-title text-xl font-medium">
      Section 1
    </div>
    <div class="collapse-content">
      <p>Content for section 1 goes here. This section is part of a single-open accordion.</p>
    </div>
  </div>
  
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input 
      type="radio" 
      name="my-accordion-1" 
      bind:group={activeIndex} 
      value={1}
    />
    <div class="collapse-title text-xl font-medium">
      Section 2
    </div>
    <div class="collapse-content">
      <p>Content for section 2. Only one section can be open at a time.</p>
    </div>
  </div>
  
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input 
      type="radio" 
      name="my-accordion-1" 
      bind:group={activeIndex} 
      value={2}
    />
    <div class="collapse-title text-xl font-medium">
      Section 3
    </div>
    <div class="collapse-content">
      <p>Content for section 3. Click to expand this section.</p>
    </div>
  </div>
</div>`;

    const multipleAccordionCode = `<script>
  let openStates = [false, false, false];
<\/script>

<div class="join join-vertical w-full">
  <div class="collapse collapse-plus join-item border border-base-300">
    <input type="checkbox" bind:checked={openStates[0]} />
    <div class="collapse-title text-xl font-medium">
      Multiple Section 1
    </div>
    <div class="collapse-content">
      <p>This accordion allows multiple sections to be open simultaneously.</p>
    </div>
  </div>
  
  <div class="collapse collapse-plus join-item border border-base-300">
    <input type="checkbox" bind:checked={openStates[1]} />
    <div class="collapse-title text-xl font-medium">
      Multiple Section 2
    </div>
    <div class="collapse-content">
      <p>You can open this section while keeping others open too.</p>
    </div>
  </div>
  
  <div class="collapse collapse-plus join-item border border-base-300">
    <input type="checkbox" bind:checked={openStates[2]} />
    <div class="collapse-title text-xl font-medium">
      Multiple Section 3
    </div>
    <div class="collapse-content">
      <p>All sections can be expanded at the same time if needed.</p>
    </div>
  </div>
</div>`;

    const variantsCode = `<!-- Arrow Variant -->
<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Arrow Collapse
  </div>
  <div class="collapse-content">
    <p>Uses a chevron arrow as the indicator</p>
  </div>
</div>

<!-- Plus Variant -->
<div class="collapse collapse-plus bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Plus Collapse
  </div>
  <div class="collapse-content">
    <p>Uses a plus/minus icon as the indicator</p>
  </div>
</div>

<!-- Close Variant -->
<div class="collapse collapse-close bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Close Collapse
  </div>
  <div class="collapse-content">
    <p>Uses a close icon as the indicator</p>
  </div>
</div>`;

    const customIconCode = `<script>
  let isOpen = false;
<\/script>

<div class="collapse bg-base-200 border">
  <input type="checkbox" bind:checked={isOpen} />
  <div class="collapse-title text-xl font-medium flex items-center justify-between">
    <span>Custom Icon Accordion</span>
    <div class="transition-transform duration-200" class:rotate-90={isOpen}>
      <ChevronRight class="w-5 h-5" />
    </div>
  </div>
  <div class="collapse-content">
    <p>This accordion uses a custom Lucide icon with rotation animation.</p>
  </div>
</div>`;

    const nestedAccordionCode = `<script>
  let parentOpen = [false, false];
  let childOpen = [false, false];
<\/script>

<div class="join join-vertical w-full">
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="checkbox" bind:checked={parentOpen[0]} />
    <div class="collapse-title text-xl font-medium">
      Parent Section 1
    </div>
    <div class="collapse-content">
      <div class="space-y-2">
        <p>This parent section contains nested accordions:</p>
        
        <div class="join join-vertical w-full ml-4">
          <div class="collapse collapse-plus join-item border border-base-300 bg-base-100">
            <input type="checkbox" bind:checked={childOpen[0]} />
            <div class="collapse-title font-medium">
              Nested Item 1
            </div>
            <div class="collapse-content">
              <p>Content for nested item 1</p>
            </div>
          </div>
          
          <div class="collapse collapse-plus join-item border border-base-300 bg-base-100">
            <input type="checkbox" bind:checked={childOpen[1]} />
            <div class="collapse-title font-medium">
              Nested Item 2
            </div>
            <div class="collapse-content">
              <p>Content for nested item 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="checkbox" bind:checked={parentOpen[1]} />
    <div class="collapse-title text-xl font-medium">
      Parent Section 2
    </div>
    <div class="collapse-content">
      <p>Another parent section with its own content.</p>
    </div>
  </div>
</div>`;

    const faqAccordionCode = `<script>
  let faqOpen = [false, false, false, false];
<\/script>

<div class="space-y-4">
  <h3 class="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
  
  <div class="join join-vertical w-full">
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" bind:checked={faqOpen[0]} />
      <div class="collapse-title text-lg font-medium flex items-center">
        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
        What is NUI and how does it work?
      </div>
      <div class="collapse-content">
        <p class="text-base-content/80">
          NUI is a comprehensive UI component library built on top of DaisyUI and Tailwind CSS. 
          It provides pre-built, accessible components that you can easily integrate into your Svelte applications.
        </p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" bind:checked={faqOpen[1]} />
      <div class="collapse-title text-lg font-medium flex items-center">
        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
        How do I install and use NUI components?
      </div>
      <div class="collapse-content">
        <p class="text-base-content/80">
          You can install NUI components using our CLI tool: <code class="bg-base-300 px-2 py-1 rounded">npx @nui/cli add [component]</code>. 
          Each component comes with documentation and examples to help you get started quickly.
        </p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" bind:checked={faqOpen[2]} />
      <div class="collapse-title text-lg font-medium flex items-center">
        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
        Is NUI compatible with TypeScript?
      </div>
      <div class="collapse-content">
        <p class="text-base-content/80">
          Yes! NUI is built with TypeScript and provides full type definitions for all components. 
          You'll get excellent autocomplete and type checking support in your IDE.
        </p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" bind:checked={faqOpen[3]} />
      <div class="collapse-title text-lg font-medium flex items-center">
        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
        Can I customize the styling of NUI components?
      </div>
      <div class="collapse-content">
        <p class="text-base-content/80">
          Absolutely! Since NUI is built on Tailwind CSS and DaisyUI, you can easily customize components 
          using Tailwind utilities or by overriding CSS variables for global theme changes.
        </p>
      </div>
    </div>
  </div>
</div>`;

    const settingsAccordionCode = `<div class="join join-vertical w-full max-w-md">
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="checkbox" bind:checked={settingsOpen[0]} />
    <div class="collapse-title font-medium flex items-center">
      <User class="w-5 h-5 mr-3 text-primary" />
      Account Settings
    </div>
    <div class="collapse-content">
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Display Name</span>
          </label>
          <input type="text" placeholder="Enter your name" class="input input-bordered input-sm" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" placeholder="Enter your email" class="input input-bordered input-sm" />
        </div>
      </div>
    </div>
  </div>
  
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="checkbox" bind:checked={settingsOpen[1]} />
    <div class="collapse-title font-medium flex items-center">
      <Bell class="w-5 h-5 mr-3 text-primary" />
      Notification Settings
    </div>
    <div class="collapse-content">
      <div class="space-y-3">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Email notifications</span>
            <input type="checkbox" class="checkbox checkbox-primary" checked />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Push notifications</span>
            <input type="checkbox" class="checkbox checkbox-primary" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">SMS notifications</span>
            <input type="checkbox" class="checkbox checkbox-primary" />
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="checkbox" bind:checked={settingsOpen[2]} />
    <div class="collapse-title font-medium flex items-center">
      <Shield class="w-5 h-5 mr-3 text-primary" />
      Privacy & Security
    </div>
    <div class="collapse-content">
      <div class="space-y-3">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Make profile public</span>
            <input type="checkbox" class="checkbox checkbox-primary" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Two-factor authentication</span>
            <input type="checkbox" class="checkbox checkbox-primary" checked />
          </label>
        </div>
        <button class="btn btn-outline btn-sm">Change Password</button>
      </div>
    </div>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'open',
            type: 'boolean',
            default: 'false',
            description: 'Controls whether the accordion section is open or closed'
        },
        {
            name: 'variant',
            type: "'arrow' | 'plus' | 'close' | 'none'",
            default: "'arrow'",
            description: 'Visual style of the collapse indicator'
        },
        {
            name: 'bordered',
            type: 'boolean',
            default: 'false',
            description: 'Adds border around the accordion'
        },
        {
            name: 'background',
            type: "'base-100' | 'base-200' | 'base-300'",
            default: "'base-200'",
            description: 'Background color of the accordion'
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the accordion title and padding'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables interaction with the accordion'
        },
        {
            name: 'multiple',
            type: 'boolean',
            default: 'false',
            description: 'Allows multiple accordion sections to be open simultaneously'
        }
    ];
</script>

<svelte:head>
    <title>Accordion - NUI Components</title>
    <meta name="description" content="Accordion component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Accordion</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Accordion</h1>
                <p class="text-xl text-base-content/70">
                    Collapsible content sections for organizing information and improving user experience.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/accordion"
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
            description="Simple collapsible content section with toggle functionality"
            code={basicUsage}
        >
            <div class="w-full max-w-md">
                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" bind:checked={controlledOpen} />
                    <div class="collapse-title text-xl font-medium">
                        Click me to show/hide content
                    </div>
                    <div class="collapse-content">
                        <p>This is the content that can be shown or hidden.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Single Open Accordion -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Single Open Accordion" 
            description="Radio-style accordion where only one section can be open at a time"
            code={singleAccordionCode}
        >
            <div class="w-full max-w-md">
                <div class="join join-vertical w-full">
                    <div class="collapse collapse-arrow join-item border border-base-300">
                        <input 
                            type="radio" 
                            name="single-accordion" 
                            bind:group={singleOpen} 
                            value={0}
                        />
                        <div class="collapse-title text-xl font-medium">
                            Section 1
                        </div>
                        <div class="collapse-content">
                            <p>Content for section 1 goes here. This section is part of a single-open accordion.</p>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-arrow join-item border border-base-300">
                        <input 
                            type="radio" 
                            name="single-accordion" 
                            bind:group={singleOpen} 
                            value={1}
                        />
                        <div class="collapse-title text-xl font-medium">
                            Section 2
                        </div>
                        <div class="collapse-content">
                            <p>Content for section 2. Only one section can be open at a time.</p>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-arrow join-item border border-base-300">
                        <input 
                            type="radio" 
                            name="single-accordion" 
                            bind:group={singleOpen} 
                            value={2}
                        />
                        <div class="collapse-title text-xl font-medium">
                            Section 3
                        </div>
                        <div class="collapse-content">
                            <p>Content for section 3. Click to expand this section.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Multiple Open Accordion -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Multiple Open Accordion" 
            description="Checkbox-style accordion allowing multiple sections to be open simultaneously"
            code={multipleAccordionCode}
        >
            <div class="w-full max-w-md">
                <div class="join join-vertical w-full">
                    <div class="collapse collapse-plus join-item border border-base-300">
                        <input type="checkbox" bind:checked={multipleOpen[0]} />
                        <div class="collapse-title text-xl font-medium">
                            Multiple Section 1
                        </div>
                        <div class="collapse-content">
                            <p>This accordion allows multiple sections to be open simultaneously.</p>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-plus join-item border border-base-300">
                        <input type="checkbox" bind:checked={multipleOpen[1]} />
                        <div class="collapse-title text-xl font-medium">
                            Multiple Section 2
                        </div>
                        <div class="collapse-content">
                            <p>You can open this section while keeping others open too.</p>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-plus join-item border border-base-300">
                        <input type="checkbox" bind:checked={multipleOpen[2]} />
                        <div class="collapse-title text-xl font-medium">
                            Multiple Section 3
                        </div>
                        <div class="collapse-content">
                            <p>All sections can be expanded at the same time if needed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different visual styles for accordion indicators"
            code={variantsCode}
        >
            <div class="w-full max-w-md space-y-4">
                <!-- Arrow Variant -->
                <div class="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Arrow Collapse
                    </div>
                    <div class="collapse-content">
                        <p>Uses a chevron arrow as the indicator</p>
                    </div>
                </div>

                <!-- Plus Variant -->
                <div class="collapse collapse-plus bg-base-200">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Plus Collapse
                    </div>
                    <div class="collapse-content">
                        <p>Uses a plus/minus icon as the indicator</p>
                    </div>
                </div>

                <!-- Close Variant -->
                <div class="collapse collapse-close bg-base-200">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Close Collapse
                    </div>
                    <div class="collapse-content">
                        <p>Uses a close icon as the indicator</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Icon -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Icon" 
            description="Accordion with custom Lucide icon and smooth rotation animation"
            code={customIconCode}
        >
            <div class="w-full max-w-md">
                <div class="collapse bg-base-200 border">
                    <input type="checkbox" bind:checked={controlledOpen} />
                    <div class="collapse-title text-xl font-medium flex items-center justify-between">
                        <span>Custom Icon Accordion</span>
                        <div class="transition-transform duration-200" class:rotate-90={controlledOpen}>
                            <ChevronRight class="w-5 h-5" />
                        </div>
                    </div>
                    <div class="collapse-content">
                        <p>This accordion uses a custom Lucide icon with rotation animation.</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Accordion -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Accordion" 
            description="Accordion sections containing other accordion sections for hierarchical content"
            code={nestedAccordionCode}
        >
            <div class="w-full max-w-md">
                <div class="join join-vertical w-full">
                    <div class="collapse collapse-arrow join-item border border-base-300">
                        <input type="checkbox" bind:checked={nestedOpen[0]} />
                        <div class="collapse-title text-xl font-medium">
                            Parent Section 1
                        </div>
                        <div class="collapse-content">
                            <div class="space-y-2">
                                <p>This parent section contains nested accordions:</p>
                                
                                <div class="join join-vertical w-full ml-4">
                                    <div class="collapse collapse-plus join-item border border-base-300 bg-base-100">
                                        <input type="checkbox" bind:checked={nestedSubOpen[0]} />
                                        <div class="collapse-title font-medium">
                                            Nested Item 1
                                        </div>
                                        <div class="collapse-content">
                                            <p>Content for nested item 1</p>
                                        </div>
                                    </div>
                                    
                                    <div class="collapse collapse-plus join-item border border-base-300 bg-base-100">
                                        <input type="checkbox" bind:checked={nestedSubOpen[1]} />
                                        <div class="collapse-title font-medium">
                                            Nested Item 2
                                        </div>
                                        <div class="collapse-content">
                                            <p>Content for nested item 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="collapse collapse-arrow join-item border border-base-300">
                        <input type="checkbox" bind:checked={nestedOpen[1]} />
                        <div class="collapse-title text-xl font-medium">
                            Parent Section 2
                        </div>
                        <div class="collapse-content">
                            <p>Another parent section with its own content.</p>
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
                <li>✅ Supports proper ARIA attributes for collapsible content</li>
                <li>✅ Keyboard navigation with Space and Enter keys</li>
                <li>✅ Screen reader announcements for expand/collapse state</li>
                <li>✅ Focus management when opening/closing sections</li>
                <li>✅ Proper heading hierarchy for accordion titles</li>
                <li>✅ High contrast indicators for different themes</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Semantic HTML structure with proper roles</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-12">
            <!-- FAQ Section -->
            <div>
                <ComponentShowcase 
                    title="FAQ Section" 
                    description="Frequently asked questions with expandable answers"
                    code={faqAccordionCode}
                >
                    <div class="w-full max-w-2xl">
                        <div class="space-y-4">
                            <h3 class="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                            
                            <div class="join join-vertical w-full">
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="checkbox" bind:checked={faqOpen[0]} />
                                    <div class="collapse-title text-lg font-medium flex items-center">
                                        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
                                        What is NUI and how does it work?
                                    </div>
                                    <div class="collapse-content">
                                        <p class="text-base-content/80">
                                            NUI is a comprehensive UI component library built on top of DaisyUI and Tailwind CSS. 
                                            It provides pre-built, accessible components that you can easily integrate into your Svelte applications.
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="checkbox" bind:checked={faqOpen[1]} />
                                    <div class="collapse-title text-lg font-medium flex items-center">
                                        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
                                        How do I install and use NUI components?
                                    </div>
                                    <div class="collapse-content">
                                        <p class="text-base-content/80">
                                            You can install NUI components using our CLI tool: <code class="bg-base-300 px-2 py-1 rounded">npx @nui/cli add [component]</code>. 
                                            Each component comes with documentation and examples to help you get started quickly.
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="checkbox" bind:checked={faqOpen[2]} />
                                    <div class="collapse-title text-lg font-medium flex items-center">
                                        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
                                        Is NUI compatible with TypeScript?
                                    </div>
                                    <div class="collapse-content">
                                        <p class="text-base-content/80">
                                            Yes! NUI is built with TypeScript and provides full type definitions for all components. 
                                            You'll get excellent autocomplete and type checking support in your IDE.
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="checkbox" bind:checked={faqOpen[3]} />
                                    <div class="collapse-title text-lg font-medium flex items-center">
                                        <HelpCircle class="w-5 h-5 mr-3 text-primary" />
                                        Can I customize the styling of NUI components?
                                    </div>
                                    <div class="collapse-content">
                                        <p class="text-base-content/80">
                                            Absolutely! Since NUI is built on Tailwind CSS and DaisyUI, you can easily customize components 
                                            using Tailwind utilities or by overriding CSS variables for global theme changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentShowcase>
            </div>

            <!-- Settings Panel -->
            <div>
                <ComponentShowcase 
                    title="Settings Panel" 
                    description="Organized settings with collapsible categories and form controls"
                    code={settingsAccordionCode}
                >
                    <div class="w-full max-w-md">
                        <div class="join join-vertical w-full">
                            <div class="collapse collapse-arrow join-item border border-base-300">
                                <input type="checkbox" bind:checked={settingsOpen[0]} />
                                <div class="collapse-title font-medium flex items-center">
                                    <User class="w-5 h-5 mr-3 text-primary" />
                                    Account Settings
                                </div>
                                <div class="collapse-content">
                                    <div class="space-y-4">
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Display Name</span>
                                            </label>
                                            <input type="text" placeholder="Enter your name" class="input input-bordered input-sm" />
                                        </div>
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Email</span>
                                            </label>
                                            <input type="email" placeholder="Enter your email" class="input input-bordered input-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="collapse collapse-arrow join-item border border-base-300">
                                <input type="checkbox" bind:checked={settingsOpen[1]} />
                                <div class="collapse-title font-medium flex items-center">
                                    <Bell class="w-5 h-5 mr-3 text-primary" />
                                    Notification Settings
                                </div>
                                <div class="collapse-content">
                                    <div class="space-y-3">
                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Email notifications</span>
                                                <input type="checkbox" class="checkbox checkbox-primary" checked />
                                            </label>
                                        </div>
                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Push notifications</span>
                                                <input type="checkbox" class="checkbox checkbox-primary" />
                                            </label>
                                        </div>
                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">SMS notifications</span>
                                                <input type="checkbox" class="checkbox checkbox-primary" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="collapse collapse-arrow join-item border border-base-300">
                                <input type="checkbox" bind:checked={settingsOpen[2]} />
                                <div class="collapse-title font-medium flex items-center">
                                    <Shield class="w-5 h-5 mr-3 text-primary" />
                                    Privacy & Security
                                </div>
                                <div class="collapse-content">
                                    <div class="space-y-3">
                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Make profile public</span>
                                                <input type="checkbox" class="checkbox checkbox-primary" />
                                            </label>
                                        </div>
                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Two-factor authentication</span>
                                                <input type="checkbox" class="checkbox checkbox-primary" checked />
                                            </label>
                                        </div>
                                        <button class="btn btn-outline btn-sm">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentShowcase>
            </div>
        </div>
    </div>
</div>