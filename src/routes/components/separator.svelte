<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Minus, Plus, Users, Star, Heart, Settings } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add separator';

    const basicUsage = `<script>
  // Using DaisyUI divider classes - no additional imports needed
<\/script>

<div>Content above</div>
<div class="divider"></div>
<div>Content below</div>`;

    const orientationsCode = `<!-- Horizontal Separator -->
<div>
  <p>Section 1</p>
  <div class="divider"></div>
  <p>Section 2</p>
</div>

<!-- Vertical Separator -->
<div class="flex items-center gap-4">
  <span>Left content</span>
  <div class="divider divider-horizontal"></div>
  <span>Right content</span>
</div>`;

    const withTextCode = `<!-- Horizontal with text -->
<div class="divider">OR</div>

<!-- Text variations -->
<div class="divider">AND</div>
<div class="divider">MORE</div>
<div class="divider">CONTINUE</div>

<!-- Vertical with text -->
<div class="flex items-center">
  <span>Login</span>
  <div class="divider divider-horizontal">OR</div>
  <span>Sign up</span>
</div>`;

    const variantsCode = `<!-- Default -->
<div class="divider"></div>

<!-- Primary color -->
<div class="divider divider-primary"></div>

<!-- Secondary color -->
<div class="divider divider-secondary"></div>

<!-- Accent color -->
<div class="divider divider-accent"></div>

<!-- Neutral color -->
<div class="divider divider-neutral"></div>

<!-- Success color -->
<div class="divider divider-success"></div>

<!-- Warning color -->
<div class="divider divider-warning"></div>

<!-- Error color -->
<div class="divider divider-error"></div>`;

    const customStylesCode = `<!-- Thin divider -->
<div class="divider opacity-50" style="border-top-width: 1px;"></div>

<!-- Thick divider -->
<div class="divider" style="border-top-width: 3px;"></div>

<!-- Dashed divider -->
<div class="divider" style="border-style: dashed;"></div>

<!-- Dotted divider -->
<div class="divider" style="border-style: dotted;"></div>

<!-- Custom spacing -->
<div class="divider my-8"></div>
<div class="divider my-2"></div>`;

    const layoutExamplesCode = `<!-- Article sections -->
<article class="prose">
  <h2>Introduction</h2>
  <p>Lorem ipsum dolor sit amet...</p>
  
  <div class="divider">CHAPTER 1</div>
  
  <h2>Getting Started</h2>
  <p>Consectetur adipiscing elit...</p>
  
  <div class="divider">CHAPTER 2</div>
  
  <h2>Advanced Topics</h2>
  <p>Sed do eiusmod tempor...</p>
</article>

<!-- Navigation sections -->
<nav class="flex items-center space-x-4">
  <a href="/home">Home</a>
  <div class="divider divider-horizontal"></div>
  <a href="/about">About</a>
  <div class="divider divider-horizontal"></div>
  <a href="/contact">Contact</a>
</nav>`;

    const apiProps = [
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            default: "'horizontal'",
            description: 'Direction of the separator line'
        },
        {
            name: 'variant',
            type: "'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'",
            default: "'default'",
            description: 'Color variant of the separator'
        },
        {
            name: 'text',
            type: 'string',
            default: 'undefined',
            description: 'Optional text to display in the center of the separator'
        },
        {
            name: 'thickness',
            type: "'thin' | 'normal' | 'thick'",
            default: "'normal'",
            description: 'Thickness of the separator line'
        },
        {
            name: 'style',
            type: "'solid' | 'dashed' | 'dotted'",
            default: "'solid'",
            description: 'Line style of the separator'
        },
        {
            name: 'spacing',
            type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'md'",
            description: 'Margin spacing around the separator'
        },
        {
            name: 'opacity',
            type: 'number',
            default: '1',
            description: 'Opacity of the separator line (0-1)'
        }
    ];
</script>

<svelte:head>
    <title>Separator - NUI Components</title>
    <meta name="description" content="Separator component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Separator</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Separator</h1>
                <p class="text-xl text-base-content/70">
                    Visual divider component for separating content sections with optional text labels.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/separator"
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
            description="Simple horizontal separator to divide content sections"
            code={basicUsage}
        >
            <div class="w-full max-w-md mx-auto">
                <div class="p-4 bg-base-200 rounded-lg text-center">
                    Content above
                </div>
                <div class="divider"></div>
                <div class="p-4 bg-base-200 rounded-lg text-center">
                    Content below
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Orientations -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Orientations" 
            description="Horizontal and vertical separator orientations"
            code={orientationsCode}
        >
            <div class="space-y-8">
                <!-- Horizontal -->
                <div>
                    <h4 class="text-sm font-semibold mb-4 text-base-content/70">Horizontal</h4>
                    <div class="max-w-md">
                        <p class="p-3 bg-base-200 rounded text-center">Section 1</p>
                        <div class="divider"></div>
                        <p class="p-3 bg-base-200 rounded text-center">Section 2</p>
                    </div>
                </div>

                <!-- Vertical -->
                <div>
                    <h4 class="text-sm font-semibold mb-4 text-base-content/70">Vertical</h4>
                    <div class="flex items-center justify-center">
                        <span class="p-3 bg-base-200 rounded">Left content</span>
                        <div class="divider divider-horizontal mx-4"></div>
                        <span class="p-3 bg-base-200 rounded">Right content</span>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Text -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Text Labels" 
            description="Separators with centered text labels for additional context"
            code={withTextCode}
        >
            <div class="space-y-8">
                <!-- Horizontal with text -->
                <div class="max-w-md mx-auto">
                    <div class="p-4 bg-base-200 rounded-lg text-center">Login with email</div>
                    <div class="divider">OR</div>
                    <div class="p-4 bg-base-200 rounded-lg text-center">Continue with social</div>
                </div>

                <!-- Text variations -->
                <div class="max-w-md mx-auto space-y-4">
                    <div class="divider">AND</div>
                    <div class="divider">MORE</div>
                    <div class="divider">CONTINUE</div>
                </div>

                <!-- Vertical with text -->
                <div class="flex items-center justify-center">
                    <button class="btn btn-primary">Login</button>
                    <div class="divider divider-horizontal mx-4">OR</div>
                    <button class="btn btn-outline">Sign up</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Color Variants" 
            description="Different color variants for various design contexts"
            code={variantsCode}
        >
            <div class="space-y-4 max-w-md mx-auto">
                <div>
                    <span class="text-xs text-base-content/70">Default</span>
                    <div class="divider"></div>
                </div>
                <div>
                    <span class="text-xs text-primary">Primary</span>
                    <div class="divider divider-primary"></div>
                </div>
                <div>
                    <span class="text-xs text-secondary">Secondary</span>
                    <div class="divider divider-secondary"></div>
                </div>
                <div>
                    <span class="text-xs text-accent">Accent</span>
                    <div class="divider divider-accent"></div>
                </div>
                <div>
                    <span class="text-xs text-neutral">Neutral</span>
                    <div class="divider divider-neutral"></div>
                </div>
                <div>
                    <span class="text-xs text-success">Success</span>
                    <div class="divider divider-success"></div>
                </div>
                <div>
                    <span class="text-xs text-warning">Warning</span>
                    <div class="divider divider-warning"></div>
                </div>
                <div>
                    <span class="text-xs text-error">Error</span>
                    <div class="divider divider-error"></div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styles -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Styles" 
            description="Customize thickness, style, and spacing of separators"
            code={customStylesCode}
        >
            <div class="space-y-6 max-w-md mx-auto">
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Thin divider</span>
                    <div class="divider opacity-50" style="border-top-width: 1px;"></div>
                </div>
                
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Thick divider</span>
                    <div class="divider" style="border-top-width: 3px;"></div>
                </div>
                
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Dashed divider</span>
                    <div class="divider" style="border-style: dashed;"></div>
                </div>
                
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Dotted divider</span>
                    <div class="divider" style="border-style: dotted;"></div>
                </div>
                
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Large spacing</span>
                    <div class="divider my-8"></div>
                </div>
                
                <div>
                    <span class="text-xs text-base-content/70 mb-2 block">Small spacing</span>
                    <div class="divider my-2"></div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Layout Examples -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Layout Integration" 
            description="Common layout patterns using separators in real-world scenarios"
            code={layoutExamplesCode}
        >
            <div class="space-y-8">
                <!-- Article sections -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="text-lg font-semibold mb-4">Article with chapters</h3>
                        <div class="prose prose-sm max-w-none">
                            <h4>Introduction</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                            
                            <div class="divider">CHAPTER 1</div>
                            
                            <h4>Getting Started</h4>
                            <p>Sed do eiusmod tempor incididunt ut labore et dolore...</p>
                            
                            <div class="divider">CHAPTER 2</div>
                            
                            <h4>Advanced Topics</h4>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation...</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="text-lg font-semibold mb-4">Navigation with separators</h3>
                        <nav class="flex items-center justify-center space-x-4">
                            <a href="#" class="link link-hover">Home</a>
                            <div class="divider divider-horizontal"></div>
                            <a href="#" class="link link-hover">About</a>
                            <div class="divider divider-horizontal"></div>
                            <a href="#" class="link link-hover">Contact</a>
                        </nav>
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
                <li>✅ Uses semantic <code>hr</code> element or appropriate ARIA roles for screen readers</li>
                <li>✅ Maintains proper contrast ratios for visibility</li>
                <li>✅ Text labels are announced correctly by assistive technologies</li>
                <li>✅ Does not interfere with keyboard navigation flow</li>
                <li>✅ Provides meaningful separation context for screen readers</li>
                <li>✅ Supports high contrast mode and custom themes</li>
                <li>✅ Respects reduced motion preferences</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Form Sections -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Form Sections</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">User Registration</h4>
                        
                        <!-- Personal Info -->
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" class="input input-bordered" />
                                <input type="text" placeholder="Last Name" class="input input-bordered" />
                            </div>
                            <input type="email" placeholder="Email" class="input input-bordered" />
                        </div>

                        <div class="divider">ACCOUNT SETTINGS</div>

                        <!-- Account Settings -->
                        <div class="space-y-4">
                            <input type="password" placeholder="Password" class="input input-bordered" />
                            <input type="password" placeholder="Confirm Password" class="input input-bordered" />
                        </div>

                        <div class="divider">PREFERENCES</div>

                        <!-- Preferences -->
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text">Email notifications</span>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </div>

                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-primary">Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Social Login -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Social Authentication</h3>
                <div class="card bg-base-100 border max-w-md mx-auto">
                    <div class="card-body">
                        <h4 class="card-title text-center">Sign In</h4>
                        
                        <div class="space-y-4">
                            <input type="email" placeholder="Email" class="input input-bordered" />
                            <input type="password" placeholder="Password" class="input input-bordered" />
                            <button class="btn btn-primary btn-block">Sign In</button>
                        </div>

                        <div class="divider">OR</div>

                        <div class="space-y-2">
                            <button class="btn btn-outline btn-block">
                                <Github class="w-4 h-4 mr-2" />
                                Continue with GitHub
                            </button>
                            <button class="btn btn-outline btn-block">
                                <Plus class="w-4 h-4 mr-2" />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Sections -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Content Organization</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <!-- Profile Section -->
                        <div class="flex items-center space-x-4">
                            <div class="avatar">
                                <div class="w-16 rounded-full">
                                    <img src="https://picsum.photos/100/100" alt="Profile" />
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold">John Doe</h4>
                                <p class="text-sm text-base-content/70">Software Engineer</p>
                            </div>
                        </div>

                        <div class="divider">ACTIVITY</div>

                        <!-- Activity Feed -->
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <Heart class="w-5 h-5 text-error" />
                                <span class="text-sm">Liked a post by Sarah Johnson</span>
                                <span class="text-xs text-base-content/50">2h ago</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <Star class="w-5 h-5 text-warning" />
                                <span class="text-sm">Starred a repository</span>
                                <span class="text-xs text-base-content/50">4h ago</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <Users class="w-5 h-5 text-primary" />
                                <span class="text-sm">Joined the team</span>
                                <span class="text-xs text-base-content/50">1d ago</span>
                            </div>
                        </div>

                        <div class="divider">SETTINGS</div>

                        <!-- Quick Settings -->
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Quick actions</span>
                            <button class="btn btn-ghost btn-sm">
                                <Settings class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pricing Tiers -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Pricing Comparison</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="card bg-base-100 border">
                        <div class="card-body text-center">
                            <h4 class="text-lg font-bold">Basic</h4>
                            <div class="text-3xl font-bold text-primary mt-2">$0</div>
                            <p class="text-sm text-base-content/70">per month</p>
                            
                            <div class="divider my-4">FEATURES</div>
                            
                            <ul class="text-sm space-y-2">
                                <li>✓ 1 Project</li>
                                <li>✓ Basic Support</li>
                                <li>✓ Community Access</li>
                            </ul>
                            
                            <button class="btn btn-outline btn-block mt-6">Get Started</button>
                        </div>
                    </div>

                    <div class="card bg-base-100 border border-primary">
                        <div class="card-body text-center">
                            <div class="badge badge-primary mb-2">Most Popular</div>
                            <h4 class="text-lg font-bold">Pro</h4>
                            <div class="text-3xl font-bold text-primary mt-2">$29</div>
                            <p class="text-sm text-base-content/70">per month</p>
                            
                            <div class="divider my-4">FEATURES</div>
                            
                            <ul class="text-sm space-y-2">
                                <li>✓ Unlimited Projects</li>
                                <li>✓ Priority Support</li>
                                <li>✓ Advanced Analytics</li>
                                <li>✓ Team Collaboration</li>
                            </ul>
                            
                            <button class="btn btn-primary btn-block mt-6">Upgrade Now</button>
                        </div>
                    </div>

                    <div class="card bg-base-100 border">
                        <div class="card-body text-center">
                            <h4 class="text-lg font-bold">Enterprise</h4>
                            <div class="text-3xl font-bold text-primary mt-2">$99</div>
                            <p class="text-sm text-base-content/70">per month</p>
                            
                            <div class="divider my-4">FEATURES</div>
                            
                            <ul class="text-sm space-y-2">
                                <li>✓ Everything in Pro</li>
                                <li>✓ Dedicated Support</li>
                                <li>✓ Custom Integrations</li>
                                <li>✓ SLA Guarantee</li>
                            </ul>
                            
                            <button class="btn btn-outline btn-block mt-6">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>