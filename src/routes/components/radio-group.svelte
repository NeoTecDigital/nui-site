<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Settings, User, CreditCard } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add radio-group';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<RadioGroup>
  <input type="radio" name="basic" value="option1" class="radio" />
  <input type="radio" name="basic" value="option2" class="radio" />
</RadioGroup>`;

    const variantsCode = `<input type="radio" name="variants1" class="radio radio-primary" />
<input type="radio" name="variants2" class="radio radio-secondary" />
<input type="radio" name="variants3" class="radio radio-accent" />
<input type="radio" name="variants4" class="radio radio-success" />
<input type="radio" name="variants5" class="radio radio-warning" />
<input type="radio" name="variants6" class="radio radio-error" />`;

    const sizesCode = `<input type="radio" name="sizes1" class="radio radio-xs" />
<input type="radio" name="sizes2" class="radio radio-sm" />
<input type="radio" name="sizes3" class="radio radio-md" />
<input type="radio" name="sizes4" class="radio radio-lg" />`;

    const statesCode = `<input type="radio" name="states1" class="radio radio-primary" checked />
<input type="radio" name="states2" class="radio radio-primary" disabled />
<input type="radio" name="states3" class="radio radio-primary" checked disabled />`;

    const withLabelsCode = `<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Option 1</span>
    <input type="radio" name="labeled" value="1" class="radio" />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Option 2</span>
    <input type="radio" name="labeled" value="2" class="radio" />
  </label>
</div>`;

    const radioGroupCode = `<script>
  let selectedPlan = 'basic';
<\/script>

<div class="form-control space-y-3">
  <label class="label cursor-pointer">
    <span class="label-text">Basic Plan</span>
    <input 
      type="radio" 
      name="plan" 
      value="basic" 
      class="radio radio-primary" 
      bind:group={selectedPlan} 
    />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Pro Plan</span>
    <input 
      type="radio" 
      name="plan" 
      value="pro" 
      class="radio radio-primary" 
      bind:group={selectedPlan} 
    />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Enterprise Plan</span>
    <input 
      type="radio" 
      name="plan" 
      value="enterprise" 
      class="radio radio-primary" 
      bind:group={selectedPlan} 
    />
  </label>
</div>`;

    const customStyleCode = `<!-- Custom colored radio buttons -->
<input type="radio" name="custom1" class="radio border-blue-500 [--chkbg:theme(colors.blue.500)]" />
<input type="radio" name="custom2" class="radio border-purple-500 [--chkbg:theme(colors.purple.500)]" />
<input type="radio" name="custom3" class="radio border-pink-500 [--chkbg:theme(colors.pink.500)]" />`;

    const cardRadioCode = `<script>
  let selectedOption = 'option1';
<\/script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <label class="cursor-pointer">
    <input 
      type="radio" 
      name="cards" 
      value="option1" 
      class="sr-only peer" 
      bind:group={selectedOption}
    />
    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
      <div class="card-body text-center">
        <h3 class="card-title justify-center">Basic</h3>
        <p>Perfect for getting started</p>
      </div>
    </div>
  </label>
  
  <label class="cursor-pointer">
    <input 
      type="radio" 
      name="cards" 
      value="option2" 
      class="sr-only peer" 
      bind:group={selectedOption}
    />
    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
      <div class="card-body text-center">
        <h3 class="card-title justify-center">Pro</h3>
        <p>For growing businesses</p>
      </div>
    </div>
  </label>
  
  <label class="cursor-pointer">
    <input 
      type="radio" 
      name="cards" 
      value="option3" 
      class="sr-only peer" 
      bind:group={selectedOption}
    />
    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
      <div class="card-body text-center">
        <h3 class="card-title justify-center">Enterprise</h3>
        <p>For large organizations</p>
      </div>
    </div>
  </label>
</div>`;

    const apiProps = [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
            default: "'primary'",
            description: 'Visual style variant of the radio button'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the radio button'
        },
        {
            name: 'checked',
            type: 'boolean',
            default: 'false',
            description: 'Whether the radio button is selected'
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the radio button interaction'
        },
        {
            name: 'value',
            type: 'string',
            default: 'undefined',
            description: 'Value of the radio button'
        },
        {
            name: 'name',
            type: 'string',
            default: 'undefined',
            description: 'Name attribute for radio button grouping'
        },
        {
            name: 'group',
            type: 'string',
            default: 'undefined',
            description: 'Bound value for the selected radio button in a group'
        }
    ];

    // State management for interactive examples
    let basicSelected = 'option1';
    let planSelected = 'basic';
    let paymentMethod = 'credit';
    let notificationPreference = 'email';
    let cardSelected = 'option1';
    let customSelected = ['option1', 'option2', 'option1'];
</script>

<svelte:head>
    <title>Radio Group - NUI Components</title>
    <meta name="description" content="Radio Group component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Radio Group</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Radio Group</h1>
                <p class="text-xl text-base-content/70">
                    Single-selection input component for choosing one option from multiple choices.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/radio-group"
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
            description="Simple radio group with default styling"
            code={basicUsage}
        >
            <div class="flex gap-4">
                <label class="flex items-center gap-2">
                    <input type="radio" name="basic" value="option1" class="radio" bind:group={basicSelected} />
                    Option 1
                </label>
                <label class="flex items-center gap-2">
                    <input type="radio" name="basic" value="option2" class="radio" bind:group={basicSelected} />
                    Option 2
                </label>
            </div>
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
                <input type="radio" name="variants1" class="radio radio-primary" checked />
                <input type="radio" name="variants2" class="radio radio-secondary" checked />
                <input type="radio" name="variants3" class="radio radio-accent" checked />
                <input type="radio" name="variants4" class="radio radio-success" checked />
                <input type="radio" name="variants5" class="radio radio-warning" checked />
                <input type="radio" name="variants6" class="radio radio-error" checked />
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different radio button sizes from extra small to large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <input type="radio" name="sizes1" class="radio radio-primary radio-xs" checked />
                <input type="radio" name="sizes2" class="radio radio-primary radio-sm" checked />
                <input type="radio" name="sizes3" class="radio radio-primary radio-md" checked />
                <input type="radio" name="sizes4" class="radio radio-primary radio-lg" checked />
            </div>
        </ComponentShowcase>
    </div>

    <!-- States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="States" 
            description="Radio button states including checked and disabled"
            code={statesCode}
        >
            <div class="flex flex-wrap gap-4">
                <input type="radio" name="states1" class="radio radio-primary" checked />
                <input type="radio" name="states2" class="radio radio-primary" disabled />
                <input type="radio" name="states3" class="radio radio-primary" checked disabled />
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Labels" 
            description="Radio buttons with proper labels for better accessibility"
            code={withLabelsCode}
        >
            <div class="form-control max-w-xs space-y-2">
                <label class="label cursor-pointer">
                    <span class="label-text">Option 1</span>
                    <input type="radio" name="labeled" value="1" class="radio radio-primary" />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Option 2</span>
                    <input type="radio" name="labeled" value="2" class="radio radio-primary" />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Option 3</span>
                    <input type="radio" name="labeled" value="3" class="radio radio-primary" />
                </label>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Radio Groups -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Radio Groups" 
            description="Multiple radio buttons working together as a single-selection group"
            code={radioGroupCode}
        >
            <div class="form-control max-w-xs">
                <label class="label cursor-pointer">
                    <span class="label-text">Basic Plan</span>
                    <input 
                        type="radio" 
                        name="plan" 
                        value="basic" 
                        class="radio radio-primary" 
                        bind:group={planSelected} 
                    />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Pro Plan</span>
                    <input 
                        type="radio" 
                        name="plan" 
                        value="pro" 
                        class="radio radio-primary" 
                        bind:group={planSelected} 
                    />
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Enterprise Plan</span>
                    <input 
                        type="radio" 
                        name="plan" 
                        value="enterprise" 
                        class="radio radio-primary" 
                        bind:group={planSelected} 
                    />
                </label>
                <div class="mt-4 text-sm text-base-content/70">
                    Selected: {planSelected}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Styling" 
            description="Custom colored radio buttons using CSS variables"
            code={customStyleCode}
        >
            <div class="flex flex-wrap gap-4">
                <input 
                    type="radio" 
                    name="custom1" 
                    class="radio border-blue-500 [--chkbg:theme(colors.blue.500)]" 
                    bind:group={customSelected[0]}
                />
                <input 
                    type="radio" 
                    name="custom2" 
                    class="radio border-purple-500 [--chkbg:theme(colors.purple.500)]" 
                    bind:group={customSelected[1]}
                />
                <input 
                    type="radio" 
                    name="custom3" 
                    class="radio border-pink-500 [--chkbg:theme(colors.pink.500)]" 
                    bind:group={customSelected[2]}
                />
            </div>
        </ComponentShowcase>
    </div>

    <!-- Card Radio Buttons -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Card Radio Buttons" 
            description="Radio buttons integrated with card components for enhanced selection experience"
            code={cardRadioCode}
        >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="cursor-pointer">
                    <input 
                        type="radio" 
                        name="cards" 
                        value="option1" 
                        class="sr-only peer" 
                        bind:group={cardSelected}
                    />
                    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
                        <div class="card-body text-center">
                            <h3 class="card-title justify-center">Basic</h3>
                            <p>Perfect for getting started</p>
                        </div>
                    </div>
                </label>
                
                <label class="cursor-pointer">
                    <input 
                        type="radio" 
                        name="cards" 
                        value="option2" 
                        class="sr-only peer" 
                        bind:group={cardSelected}
                    />
                    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
                        <div class="card-body text-center">
                            <h3 class="card-title justify-center">Pro</h3>
                            <p>For growing businesses</p>
                        </div>
                    </div>
                </label>
                
                <label class="cursor-pointer">
                    <input 
                        type="radio" 
                        name="cards" 
                        value="option3" 
                        class="sr-only peer" 
                        bind:group={cardSelected}
                    />
                    <div class="card bg-base-100 border border-base-300 peer-checked:border-primary peer-checked:bg-primary/5">
                        <div class="card-body text-center">
                            <h3 class="card-title justify-center">Enterprise</h3>
                            <p>For large organizations</p>
                        </div>
                    </div>
                </label>
            </div>
            <div class="mt-4 text-sm text-base-content/70">
                Selected: {cardSelected}
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Arrow Keys</kbd> and <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes and roles</li>
                <li>✅ Maintains focus management and visual focus indicators</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Proper label association for form controls</li>
                <li>✅ Single selection enforced within radio groups</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Payment Method Selection -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Payment Method Selection</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Choose Payment Method</h4>
                        <div class="form-control space-y-3">
                            <label class="label cursor-pointer">
                                <span class="label-text flex items-center">
                                    <CreditCard class="w-4 h-4 mr-2" />
                                    Credit Card
                                </span>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="credit" 
                                    class="radio radio-primary" 
                                    bind:group={paymentMethod} 
                                />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text flex items-center">
                                    <User class="w-4 h-4 mr-2" />
                                    PayPal
                                </span>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="paypal" 
                                    class="radio radio-primary" 
                                    bind:group={paymentMethod} 
                                />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text flex items-center">
                                    <Settings class="w-4 h-4 mr-2" />
                                    Bank Transfer
                                </span>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="bank" 
                                    class="radio radio-primary" 
                                    bind:group={paymentMethod} 
                                />
                            </label>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">
                                Continue with {paymentMethod === 'credit' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notification Preferences -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">How would you like to be notified?</h4>
                        <div class="form-control space-y-2">
                            <label class="label cursor-pointer">
                                <span class="label-text">Email notifications</span>
                                <input 
                                    type="radio" 
                                    name="notifications" 
                                    value="email" 
                                    class="radio radio-primary" 
                                    bind:group={notificationPreference} 
                                />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">SMS notifications</span>
                                <input 
                                    type="radio" 
                                    name="notifications" 
                                    value="sms" 
                                    class="radio radio-primary" 
                                    bind:group={notificationPreference} 
                                />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Push notifications</span>
                                <input 
                                    type="radio" 
                                    name="notifications" 
                                    value="push" 
                                    class="radio radio-primary" 
                                    bind:group={notificationPreference} 
                                />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">No notifications</span>
                                <input 
                                    type="radio" 
                                    name="notifications" 
                                    value="none" 
                                    class="radio radio-error" 
                                    bind:group={notificationPreference} 
                                />
                            </label>
                        </div>
                        <div class="mt-4 text-sm text-base-content/70">
                            Current preference: {notificationPreference}
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-ghost">Cancel</button>
                            <button class="btn btn-primary">Save Preferences</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Survey Question -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Survey Question</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">How satisfied are you with our service?</h4>
                        <div class="form-control space-y-2">
                            <label class="label cursor-pointer">
                                <span class="label-text">Very satisfied</span>
                                <input type="radio" name="satisfaction" value="very-satisfied" class="radio radio-success" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Satisfied</span>
                                <input type="radio" name="satisfaction" value="satisfied" class="radio radio-primary" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Neutral</span>
                                <input type="radio" name="satisfaction" value="neutral" class="radio radio-warning" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Dissatisfied</span>
                                <input type="radio" name="satisfaction" value="dissatisfied" class="radio radio-error" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Very dissatisfied</span>
                                <input type="radio" name="satisfaction" value="very-dissatisfied" class="radio radio-error" />
                            </label>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">Submit Response</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>