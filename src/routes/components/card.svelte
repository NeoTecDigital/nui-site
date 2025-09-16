<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Star, ShoppingCart, Heart, Share2, Download, Plus } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add card';

    const basicUsage = `<script>
  import { Card } from '@nui/core';
<\/script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>`;

    const variantsCode = `<!-- Normal Card -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Normal Card</h2>
    <p>Default card with shadow</p>
  </div>
</div>

<!-- Bordered Card -->
<div class="card bg-base-100 border">
  <div class="card-body">
    <h2 class="card-title">Bordered Card</h2>
    <p>Card with border instead of shadow</p>
  </div>
</div>

<!-- Compact Card -->
<div class="card card-compact bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Compact Card</h2>
    <p>Smaller padding</p>
  </div>
</div>

<!-- Side Card -->
<div class="card card-side bg-base-100 shadow-xl">
  <figure>
    <img src="https://picsum.photos/200/200" alt="Movie" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Side Card</h2>
    <p>Content beside image</p>
  </div>
</div>`;

    const withImageCode = `<!-- Image Top -->
<div class="card bg-base-100 shadow-xl">
  <figure>
    <img src="https://picsum.photos/400/225" alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

<!-- Image with overlay -->
<div class="card image-full bg-base-100 shadow-xl">
  <figure>
    <img src="https://picsum.photos/400/225" alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card with image overlay!</h2>
    <p>How to apply image overlay?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>`;

    const withActionsCode = `<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">
      Shoes!
      <div class="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-between">
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm">
          <Heart class="w-4 h-4" />
        </button>
        <button class="btn btn-ghost btn-sm">
          <Share2 class="w-4 h-4" />
        </button>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm">Add to Cart</button>
        <button class="btn btn-primary btn-sm">Buy Now</button>
      </div>
    </div>
  </div>
</div>`;

    const pricingCardCode = `<div class="card bg-base-100 shadow-xl border-2 border-primary">
  <div class="card-body text-center">
    <div class="badge badge-primary badge-lg mb-4">Most Popular</div>
    <h2 class="card-title justify-center text-2xl">Pro Plan</h2>
    <div class="text-4xl font-bold text-primary my-4">
      $29
      <span class="text-base font-normal text-base-content/70">/month</span>
    </div>
    <ul class="space-y-2 mb-6">
      <li class="flex items-center justify-center">
        <Star class="w-4 h-4 mr-2 text-success" />
        Unlimited projects
      </li>
      <li class="flex items-center justify-center">
        <Star class="w-4 h-4 mr-2 text-success" />
        Priority support
      </li>
      <li class="flex items-center justify-center">
        <Star class="w-4 h-4 mr-2 text-success" />
        Advanced analytics
      </li>
    </ul>
    <div class="card-actions">
      <button class="btn btn-primary btn-block">Get Started</button>
    </div>
  </div>
</div>`;

    const productCardCode = `<div class="card bg-base-100 shadow-xl">
  <figure class="relative">
    <img src="https://picsum.photos/400/300" alt="Product" class="w-full h-48 object-cover" />
    <div class="absolute top-2 right-2">
      <div class="badge badge-error">-20%</div>
    </div>
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      Awesome Product
      <div class="rating rating-sm">
        <Star class="w-4 h-4 text-warning fill-current" />
        <Star class="w-4 h-4 text-warning fill-current" />
        <Star class="w-4 h-4 text-warning fill-current" />
        <Star class="w-4 h-4 text-warning fill-current" />
        <Star class="w-4 h-4 text-base-300" />
      </div>
    </h2>
    <p class="text-sm text-base-content/70">Premium quality product with amazing features</p>
    <div class="flex items-center justify-between mt-4">
      <div class="text-2xl font-bold text-primary">
        $79.99
        <span class="text-sm font-normal text-base-content/70 line-through ml-2">$99.99</span>
      </div>
      <button class="btn btn-primary">
        <ShoppingCart class="w-4 h-4 mr-2" />
        Add to Cart
      </button>
    </div>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'bg',
            type: "'base-100' | 'base-200' | 'base-300' | 'primary' | 'secondary' | 'accent'",
            default: "'base-100'",
            description: 'Background color of the card'
        },
        {
            name: 'shadow',
            type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
            default: "'xl'",
            description: 'Shadow size for the card'
        },
        {
            name: 'bordered',
            type: 'boolean',
            default: 'false',
            description: 'Adds border instead of shadow'
        },
        {
            name: 'compact',
            type: 'boolean',
            default: 'false',
            description: 'Reduces padding in card body'
        },
        {
            name: 'side',
            type: 'boolean',
            default: 'false',
            description: 'Arranges content horizontally'
        },
        {
            name: 'imageOverlay',
            type: 'boolean',
            default: 'false',
            description: 'Places content over the image'
        },
        {
            name: 'glass',
            type: 'boolean',
            default: 'false',
            description: 'Applies glass morphism effect'
        }
    ];
</script>

<svelte:head>
    <title>Card - NUI Components</title>
    <meta name="description" content="Card component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Card</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Card</h1>
                <p class="text-xl text-base-content/70">
                    Flexible content container with header, body, footer, and image support.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/card"
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
            description="Simple card with title, content, and actions"
            code={basicUsage}
        >
            <div class="card bg-base-100 shadow-xl w-96">
                <div class="card-body">
                    <h2 class="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different card styles including normal, bordered, compact, and side layouts"
            code={variantsCode}
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Normal Card -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Normal Card</h2>
                        <p>Default card with shadow</p>
                    </div>
                </div>

                <!-- Bordered Card -->
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h2 class="card-title">Bordered Card</h2>
                        <p>Card with border instead of shadow</p>
                    </div>
                </div>

                <!-- Compact Card -->
                <div class="card card-compact bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Compact Card</h2>
                        <p>Smaller padding</p>
                    </div>
                </div>

                <!-- Side Card -->
                <div class="card card-side bg-base-100 shadow-xl">
                    <figure class="w-24">
                        <img src="https://picsum.photos/200/200" alt="Movie" class="w-full h-full object-cover" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Side Card</h2>
                        <p>Content beside image</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Images -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Images" 
            description="Cards with images positioned at the top or as overlay backgrounds"
            code={withImageCode}
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Image Top -->
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img src="https://picsum.photos/400/225" alt="Shoes" class="w-full h-48 object-cover" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <!-- Image with overlay -->
                <div class="card image-full bg-base-100 shadow-xl">
                    <figure>
                        <img src="https://picsum.photos/400/225" alt="Shoes" class="w-full h-48 object-cover" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title text-white">Card with image overlay!</h2>
                        <p class="text-white/90">How to apply image overlay?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Actions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Actions" 
            description="Cards with multiple action buttons and interactive elements"
            code={withActionsCode}
        >
            <div class="card bg-base-100 shadow-xl w-96">
                <div class="card-body">
                    <h2 class="card-title">
                        Shoes!
                        <div class="badge badge-secondary">NEW</div>
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-between">
                        <div class="flex gap-2">
                            <button class="btn btn-ghost btn-sm">
                                <Heart class="w-4 h-4" />
                            </button>
                            <button class="btn btn-ghost btn-sm">
                                <Share2 class="w-4 h-4" />
                            </button>
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-outline btn-sm">Add to Cart</button>
                            <button class="btn btn-primary btn-sm">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Pricing Card -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Pricing Card" 
            description="Professional pricing card with features list and call-to-action"
            code={pricingCardCode}
        >
            <div class="card bg-base-100 shadow-xl border-2 border-primary w-80">
                <div class="card-body text-center">
                    <div class="badge badge-primary badge-lg mb-4">Most Popular</div>
                    <h2 class="card-title justify-center text-2xl">Pro Plan</h2>
                    <div class="text-4xl font-bold text-primary my-4">
                        $29
                        <span class="text-base font-normal text-base-content/70">/month</span>
                    </div>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-center justify-center">
                            <Star class="w-4 h-4 mr-2 text-success" />
                            Unlimited projects
                        </li>
                        <li class="flex items-center justify-center">
                            <Star class="w-4 h-4 mr-2 text-success" />
                            Priority support
                        </li>
                        <li class="flex items-center justify-center">
                            <Star class="w-4 h-4 mr-2 text-success" />
                            Advanced analytics
                        </li>
                    </ul>
                    <div class="card-actions">
                        <button class="btn btn-primary btn-block">Get Started</button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Product Card -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Product Card" 
            description="E-commerce product card with image, rating, pricing, and purchase options"
            code={productCardCode}
        >
            <div class="card bg-base-100 shadow-xl w-80">
                <figure class="relative">
                    <img src="https://picsum.photos/400/300" alt="Product" class="w-full h-48 object-cover" />
                    <div class="absolute top-2 right-2">
                        <div class="badge badge-error">-20%</div>
                    </div>
                </figure>
                <div class="card-body">
                    <h2 class="card-title">
                        Awesome Product
                        <div class="rating rating-sm">
                            <Star class="w-4 h-4 text-warning fill-current" />
                            <Star class="w-4 h-4 text-warning fill-current" />
                            <Star class="w-4 h-4 text-warning fill-current" />
                            <Star class="w-4 h-4 text-warning fill-current" />
                            <Star class="w-4 h-4 text-base-300" />
                        </div>
                    </h2>
                    <p class="text-sm text-base-content/70">Premium quality product with amazing features</p>
                    <div class="flex items-center justify-between mt-4">
                        <div class="text-2xl font-bold text-primary">
                            $79.99
                            <span class="text-sm font-normal text-base-content/70 line-through ml-2">$99.99</span>
                        </div>
                        <button class="btn btn-primary">
                            <ShoppingCart class="w-4 h-4 mr-2" />
                            Add to Cart
                        </button>
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
                <li>✅ Supports proper semantic HTML structure with <code>article</code> or <code>section</code> roles</li>
                <li>✅ Includes proper heading hierarchy for card titles</li>
                <li>✅ Images include descriptive <code>alt</code> attributes</li>
                <li>✅ Interactive elements maintain focus management</li>
                <li>✅ Supports keyboard navigation for all actions</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Maintains sufficient color contrast ratios</li>
                <li>✅ Respects reduced motion preferences for animations</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Blog Post Card -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Blog Post Card</h3>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img src="https://picsum.photos/600/300" alt="Blog post" class="w-full h-48 object-cover" />
                    </figure>
                    <div class="card-body">
                        <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-2">
                            <span class="badge badge-primary badge-sm">Technology</span>
                            <span>•</span>
                            <span>March 15, 2024</span>
                        </div>
                        <h2 class="card-title">How to Build Modern Web Applications</h2>
                        <p>Learn the latest techniques and best practices for creating responsive, accessible, and performant web applications using modern frameworks and tools.</p>
                        <div class="card-actions justify-between items-center mt-4">
                            <div class="flex items-center space-x-2">
                                <div class="avatar">
                                    <div class="w-8 rounded-full">
                                        <img src="https://picsum.photos/40/40" alt="Author" />
                                    </div>
                                </div>
                                <span class="text-sm">John Doe</span>
                            </div>
                            <button class="btn btn-primary btn-sm">Read More</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Feature Card -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Feature Card</h3>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="avatar">
                            <div class="w-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <Download class="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h2 class="card-title">Easy Installation</h2>
                        <p>Get started in minutes with our simple installation process. No complex configuration required.</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">
                                <Plus class="w-4 h-4 mr-2" />
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Member Card -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Team Member Card</h3>
                <div class="card bg-base-100 shadow-xl">
                    <figure class="pt-6">
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img src="https://picsum.photos/150/150" alt="Team member" />
                            </div>
                        </div>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Sarah Johnson</h2>
                        <p class="text-primary font-semibold">Lead Designer</p>
                        <p class="text-sm text-base-content/70">Passionate about creating beautiful and functional user experiences with over 8 years of design expertise.</p>
                        <div class="card-actions justify-center mt-4">
                            <button class="btn btn-ghost btn-sm">
                                <Github class="w-4 h-4" />
                            </button>
                            <button class="btn btn-ghost btn-sm">
                                <Share2 class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>