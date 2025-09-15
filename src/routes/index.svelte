<script lang="ts">
    import { ArrowRight, Code, Palette, Zap, Github, Copy, Check } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';

    let copied = false;

    const installCommand = 'npm install @nui/core';

    async function copyInstallCommand() {
        try {
            await navigator.clipboard.writeText(installCommand);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    const features = [
        {
            icon: Code,
            title: 'DaisyUI Powered',
            description: 'Built on top of DaisyUI for beautiful, accessible components with comprehensive theming.'
        },
        {
            icon: Zap,
            title: 'shadcn-svelte Compatible',
            description: 'Drop-in replacement with familiar API and component structure for easy migration.'
        },
        {
            icon: Palette,
            title: 'Rich Theming',
            description: 'Over 30 built-in themes with full customization support and real-time theme switching.'
        }
    ];

    const quickStartCode = `<script>
  import { Button, Card, Input } from '@nui/core';
<\/script>

<Card>
  <Card.Header>
    <Card.Title>Welcome to NUI</Card.Title>
    <Card.Description>
      Get started with beautiful components
    </Card.Description>
  </Card.Header>
  <Card.Content class="space-y-4">
    <Input placeholder="Enter your name" />
    <Button class="w-full">Get Started</Button>
  </Card.Content>
</Card>`;

    const componentPreviewCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`;
</script>

<svelte:head>
    <title>NUI - DaisyUI-powered Svelte Components</title>
    <meta name="description" content="Modern Svelte component library with DaisyUI styling and shadcn-svelte compatibility" />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                <span class="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>Now in Beta</span>
            </div>
            
            <h1 class="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Build Beautiful UIs with NUI
            </h1>
            
            <p class="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
                DaisyUI-powered Svelte component library with shadcn-svelte API compatibility. 
                Beautiful components, rich theming, and exceptional developer experience.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a href="/docs" class="btn btn-primary btn-lg">
                    Get Started
                    <ArrowRight class="ml-2 h-5 w-5" />
                </a>
                <a href="/components" class="btn btn-outline btn-lg">
                    View Components
                </a>
            </div>
            
            <!-- Install Command -->
            <div class="max-w-md mx-auto">
                <div class="flex items-center bg-base-200 rounded-lg p-4">
                    <code class="flex-1 text-sm font-mono text-left">
                        {installCommand}
                    </code>
                    <button
                        on:click={copyInstallCommand}
                        class="btn btn-ghost btn-sm ml-2"
                        aria-label="Copy install command"
                    >
                        {#if copied}
                            <Check class="h-4 w-4 text-success" />
                        {:else}
                            <Copy class="h-4 w-4" />
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-20 bg-base-200/30">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">Why Choose NUI?</h2>
            <p class="text-base-content/70">
                Combine the power of DaisyUI's theming with the familiarity of shadcn-svelte's API
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            {#each features as feature}
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body items-center text-center">
                        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                            <svelte:component this={feature.icon} class="h-6 w-6" />
                        </div>
                        <h3 class="card-title">{feature.title}</h3>
                        <p class="text-base-content/70">{feature.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Quick Start Section -->
<section class="py-20">
    <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">Quick Start</h2>
                <p class="text-base-content/70">
                    Get up and running with NUI in seconds
                </p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 items-start">
                <!-- Code Example -->
                <div>
                    <h3 class="text-xl font-semibold mb-4">Simple Example</h3>
                    <CodeBlock code={quickStartCode} language="svelte" />
                </div>
                
                <!-- Preview -->
                <div>
                    <h3 class="text-xl font-semibold mb-4">Result</h3>
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h4 class="card-title">Welcome to NUI</h4>
                            <p class="text-base-content/70 mb-4">
                                Get started with beautiful components
                            </p>
                            <div class="space-y-4">
                                <input type="text" placeholder="Enter your name" class="input input-bordered w-full" />
                                <button class="btn btn-primary w-full">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Component Preview Section -->
<section class="py-20 bg-base-200/30">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">Component Showcase</h2>
                <p class="text-base-content/70">
                    Preview some of our most popular components
                </p>
            </div>
            
            <ComponentShowcase 
                title="Button Variants" 
                description="Multiple button styles and sizes for every use case"
                code={componentPreviewCode}
            >
                <div class="flex flex-wrap gap-4">
                    <button class="btn btn-primary">Primary</button>
                    <button class="btn btn-secondary">Secondary</button>
                    <button class="btn btn-outline">Outline</button>
                    <button class="btn btn-ghost">Ghost</button>
                    <button class="btn btn-link">Link</button>
                </div>
            </ComponentShowcase>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-base-content/70 mb-8">
                Join thousands of developers building beautiful Svelte applications with NUI
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/docs" class="btn btn-primary btn-lg">
                    Read the Docs
                    <ArrowRight class="ml-2 h-5 w-5" />
                </a>
                <a 
                    href="https://github.com/nui-dev/nui" 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-outline btn-lg"
                >
                    <Github class="mr-2 h-5 w-5" />
                    View on GitHub
                </a>
            </div>
        </div>
    </div>
</section>
