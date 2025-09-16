<script lang="ts">
    import { ArrowRight, Book, Code, Palette, Download } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';

    const installationSteps = [
        {
            title: 'Install the Package',
            description: 'Add NUI to your Svelte project with your preferred package manager',
            code: `npm install @nui/core
# or
pnpm add @nui/core
# or
yarn add @nui/core`
        },
        {
            title: 'Configure Tailwind CSS',
            description: 'Update your Tailwind configuration to include NUI components',
            code: `// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@nui/core/**/*.{html,js,svelte,ts}'
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
}`
        },
        {
            title: 'Import and Use',
            description: 'Start using NUI components in your Svelte app',
            code: `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<Card>
  <Card.Header>
    <Card.Title>Hello NUI</Card.Title>
  </Card.Header>
  <Card.Content>
    <Input placeholder="Enter text" />
    <Button>Click me</Button>
  </Card.Content>
</Card>`
        }
    ];

    const quickLinks = [
        {
            title: 'Installation Guide',
            description: 'Complete setup instructions for your project',
            href: '/docs/installation',
            icon: Download
        },
        {
            title: 'Component Library',
            description: 'Browse all available components with examples',
            href: '/components',
            icon: Code
        },
        {
            title: 'Theming System',
            description: 'Learn about DaisyUI themes and customization',
            href: '/docs/theming',
            icon: Palette
        },
        {
            title: 'API Reference',
            description: 'Detailed API documentation for each component',
            href: '/docs/api',
            icon: Book
        }
    ];
</script>

<svelte:head>
    <title>Documentation - NUI</title>
    <meta name="description" content="Complete documentation for NUI - DaisyUI-powered Svelte components" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-16">
        <h1 class="text-4xl font-bold mb-4">Documentation</h1>
        <p class="text-xl text-base-content/70">
            Everything you need to know about building beautiful UIs with NUI components.
        </p>
    </div>

    <!-- Quick Links -->
    <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-2xl font-bold mb-8">Quick Navigation</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each quickLinks as link}
                <a href={link.href} class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="card-body">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                            <svelte:component this={link.icon} class="h-5 w-5" />
                        </div>
                        <h3 class="card-title text-lg">{link.title}</h3>
                        <p class="text-sm text-base-content/70">{link.description}</p>
                        <div class="card-actions justify-end mt-4">
                            <ArrowRight class="h-4 w-4 text-primary" />
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>

    <!-- Getting Started -->
    <div class="max-w-4xl mx-auto mb-16">
        <h2 class="text-3xl font-bold mb-8">Getting Started</h2>
        <div class="space-y-12">
            {#each installationSteps as step, index}
                <div class="relative">
                    <div class="flex items-start space-x-4">
                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-content text-sm font-bold">
                            {index + 1}
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold mb-2">{step.title}</h3>
                            <p class="text-base-content/70 mb-4">{step.description}</p>
                            <CodeBlock code={step.code} language="bash" />
                        </div>
                    </div>
                    {#if index < installationSteps.length - 1}
                        <div class="absolute left-4 top-12 h-12 w-px bg-border"></div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <!-- Features Overview -->
    <div class="max-w-4xl mx-auto mb-16">
        <h2 class="text-3xl font-bold mb-8">Key Features</h2>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-semibold mb-2">🎨 Rich Theming</h3>
                    <p class="text-base-content/70">
                        Built on DaisyUI's powerful theming system with 30+ built-in themes.
                        Support for custom themes and real-time theme switching.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-2">♿ Accessibility First</h3>
                    <p class="text-base-content/70">
                        All components follow WCAG guidelines and include proper ARIA attributes,
                        keyboard navigation, and screen reader support.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-2">📱 Responsive Design</h3>
                    <p class="text-base-content/70">
                        Mobile-first responsive components that work beautifully across
                        all device sizes and screen orientations.
                    </p>
                </div>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h3 class="text-xl font-semibold mb-2">⚡ Performance Optimized</h3>
                    <p class="text-base-content/70">
                        Tree-shakeable components with minimal bundle impact.
                        Optimized for both development and production builds.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-2">🔧 Developer Experience</h3>
                    <p class="text-base-content/70">
                        TypeScript support, comprehensive documentation, and familiar
                        shadcn-svelte API for easy migration.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-2">🧩 Composable</h3>
                    <p class="text-base-content/70">
                        Mix and match components to build complex interfaces.
                        Consistent styling and behavior across all components.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Next Steps -->
    <div class="max-w-4xl mx-auto">
        <div class="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div class="card-body">
                <h2 class="card-title text-2xl">Ready to Start Building?</h2>
                <p class="text-base-content/70 mb-6">
                    Explore our component library and start building beautiful interfaces today.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/components" class="btn btn-primary">
                        Browse Components
                        <ArrowRight class="ml-2 h-4 w-4" />
                    </a>
                    <a href="/blocks" class="btn btn-outline">
                        View Blocks
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>