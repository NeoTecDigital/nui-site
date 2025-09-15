<script lang="ts">
    import { Search, Eye, Code, Copy, Star, Clock, User, Mail, Phone } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import { cn } from '$lib/utils/index.js';

    let searchQuery = '';
    let selectedCategory = 'all';
    let viewMode = 'preview';

    const categories = [
        { id: 'all', name: 'All Blocks', count: 24 },
        { id: 'layout', name: 'Layout', count: 6 },
        { id: 'marketing', name: 'Marketing', count: 5 },
        { id: 'ecommerce', name: 'E-commerce', count: 4 },
        { id: 'dashboard', name: 'Dashboard', count: 4 },
        { id: 'auth', name: 'Authentication', count: 3 },
        { id: 'content', name: 'Content', count: 2 }
    ];

    const blocks = [
        // Layout Blocks
        {
            name: 'Hero Section',
            category: 'layout',
            description: 'Eye-catching hero section with call-to-action',
            preview: 'hero-preview',
            code: `<section class="hero min-h-screen bg-gradient-to-r from-primary to-secondary">
  <div class="hero-content text-center text-primary-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
      <p class="mb-5">Beautiful hero section with gradient background</p>
      <button class="btn btn-accent">Get Started</button>
    </div>
  </div>
</section>`
        },
        {
            name: 'Feature Grid',
            category: 'layout',
            description: 'Grid layout showcasing key features',
            preview: 'feature-grid-preview',
            code: `<div class="grid md:grid-cols-3 gap-8">
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body items-center text-center">
      <Star class="w-12 h-12 text-primary mb-4" />
      <h3 class="card-title">Feature One</h3>
      <p>Description of your amazing feature</p>
    </div>
  </div>
  <!-- Repeat for other features -->
</div>`
        },

        // Marketing Blocks
        {
            name: 'Pricing Cards',
            category: 'marketing',
            description: 'Professional pricing table with featured plan',
            preview: 'pricing-preview',
            code: `<div class="grid md:grid-cols-3 gap-6">
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="card-title">Basic</h3>
      <div class="text-4xl font-bold">$9<span class="text-lg font-normal">/mo</span></div>
      <ul class="space-y-2 mt-4">
        <li>✓ 5 Projects</li>
        <li>✓ Basic Support</li>
      </ul>
      <button class="btn btn-outline mt-6">Choose Plan</button>
    </div>
  </div>
  <!-- More plans... -->
</div>`
        },
        {
            name: 'Testimonials',
            category: 'marketing',
            description: 'Customer testimonials with avatars and ratings',
            preview: 'testimonials-preview',
            code: `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="flex items-center space-x-4 mb-4">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="/avatar1.jpg" alt="Customer" />
          </div>
        </div>
        <div>
          <h4 class="font-semibold">John Doe</h4>
          <div class="rating rating-sm">
            <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
          </div>
        </div>
      </div>
      <p class="text-sm">"Excellent product! Highly recommended."</p>
    </div>
  </div>
</div>`
        },

        // Dashboard Blocks
        {
            name: 'Stats Cards',
            category: 'dashboard',
            description: 'Dashboard statistics cards with icons',
            preview: 'stats-preview',
            code: `<div class="stats stats-vertical lg:stats-horizontal shadow">
  <div class="stat">
    <div class="stat-figure text-primary">
      <User class="w-8 h-8" />
    </div>
    <div class="stat-title">Total Users</div>
    <div class="stat-value text-primary">89,400</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
  <!-- More stats... -->
</div>`
        },

        // Authentication Blocks
        {
            name: 'Login Form',
            category: 'auth',
            description: 'Clean login form with social login options',
            preview: 'login-preview',
            code: `<div class="card bg-base-100 shadow-xl w-96">
  <div class="card-body">
    <h2 class="card-title justify-center">Login</h2>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" class="input input-bordered" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input type="password" class="input input-bordered" />
    </div>
    <div class="form-control mt-6">
      <button class="btn btn-primary">Login</button>
    </div>
  </div>
</div>`
        }
    ];

    $: filteredBlocks = blocks.filter(block => {
        const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            block.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    function renderPreview(previewType: string) {
        switch (previewType) {
            case 'hero-preview':
                return `<div class="hero min-h-48 bg-gradient-to-r from-primary to-secondary rounded-lg">
                    <div class="hero-content text-center text-primary-content">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">Hello there</h1>
                            <p class="mb-4">Beautiful hero section</p>
                            <button class="btn btn-accent btn-sm">Get Started</button>
                        </div>
                    </div>
                </div>`;
            case 'feature-grid-preview':
                return `<div class="grid grid-cols-3 gap-4">
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4 items-center text-center">
                            <Star class="w-8 h-8 text-primary mb-2" />
                            <h3 class="font-semibold text-sm">Feature</h3>
                        </div>
                    </div>
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4 items-center text-center">
                            <Clock class="w-8 h-8 text-primary mb-2" />
                            <h3 class="font-semibold text-sm">Feature</h3>
                        </div>
                    </div>
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4 items-center text-center">
                            <User class="w-8 h-8 text-primary mb-2" />
                            <h3 class="font-semibold text-sm">Feature</h3>
                        </div>
                    </div>
                </div>`;
            default:
                return '<div class="bg-base-200 rounded p-8 text-center text-base-content/60">Preview</div>';
        }
    }
</script>

<svelte:head>
    <title>Blocks - NUI</title>
    <meta name="description" content="Pre-built component blocks and patterns for rapid development" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Blocks</h1>
        <p class="text-xl text-base-content/70">
            Pre-built component compositions and UI patterns to accelerate your development.
        </p>
    </div>

    <!-- Filters and Search -->
    <div class="mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/60" />
                <input
                    type="text"
                    placeholder="Search blocks..."
                    bind:value={searchQuery}
                    class="input input-bordered w-full pl-10"
                />
            </div>

            <!-- View Mode Toggle -->
            <div class="flex items-center space-x-2">
                <span class="text-sm text-base-content/70">View:</span>
                <div class="btn-group">
                    <button
                        class={cn('btn btn-sm', viewMode === 'preview' ? 'btn-active' : 'btn-ghost')}
                        on:click={() => viewMode = 'preview'}
                    >
                        <Eye class="h-4 w-4" />
                        Preview
                    </button>
                    <button
                        class={cn('btn btn-sm', viewMode === 'code' ? 'btn-active' : 'btn-ghost')}
                        on:click={() => viewMode = 'code'}
                    >
                        <Code class="h-4 w-4" />
                        Code
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Filter -->
        <div class="mt-4">
            <div class="flex flex-wrap gap-2">
                {#each categories as category}
                    <button
                        class={cn(
                            'btn btn-sm',
                            selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                        )}
                        on:click={() => selectedCategory = category.id}
                    >
                        {category.name}
                        <span class="badge badge-sm ml-2">{category.count}</span>
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <!-- Results Count -->
    <div class="mb-6">
        <p class="text-sm text-base-content/70">
            Showing {filteredBlocks.length} of {blocks.length} blocks
        </p>
    </div>

    <!-- Blocks Grid -->
    <div class="grid md:grid-cols-2 gap-8">
        {#each filteredBlocks as block}
            <div class="card bg-base-100 shadow-sm border">
                <div class="card-body">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="card-title">{block.name}</h3>
                            <p class="text-sm text-base-content/70">{block.description}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="badge badge-outline badge-sm">{block.category}</span>
                            <button class="btn btn-ghost btn-sm btn-square" title="Copy code">
                                <Copy class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Content -->
                    {#if viewMode === 'preview'}
                        <!-- Preview -->
                        <div class="border rounded-lg p-4 bg-base-50 min-h-48 flex items-center justify-center">
                            {#if block.preview === 'hero-preview'}
                                <div class="w-full">
                                    <div class="hero min-h-32 bg-gradient-to-r from-primary to-secondary rounded-lg">
                                        <div class="hero-content text-center text-primary-content">
                                            <div>
                                                <h1 class="text-2xl font-bold mb-2">Hello there</h1>
                                                <p class="mb-4 text-sm">Beautiful hero section</p>
                                                <button class="btn btn-accent btn-sm">Get Started</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {:else if block.preview === 'feature-grid-preview'}
                                <div class="w-full">
                                    <div class="grid grid-cols-3 gap-3">
                                        <div class="card bg-base-100 shadow-sm">
                                            <div class="card-body p-3 items-center text-center">
                                                <Star class="w-6 h-6 text-primary mb-2" />
                                                <h3 class="font-semibold text-xs">Feature</h3>
                                            </div>
                                        </div>
                                        <div class="card bg-base-100 shadow-sm">
                                            <div class="card-body p-3 items-center text-center">
                                                <Clock class="w-6 h-6 text-primary mb-2" />
                                                <h3 class="font-semibold text-xs">Feature</h3>
                                            </div>
                                        </div>
                                        <div class="card bg-base-100 shadow-sm">
                                            <div class="card-body p-3 items-center text-center">
                                                <User class="w-6 h-6 text-primary mb-2" />
                                                <h3 class="font-semibold text-xs">Feature</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {:else if block.preview === 'stats-preview'}
                                <div class="w-full">
                                    <div class="stats shadow w-full">
                                        <div class="stat">
                                            <div class="stat-figure text-primary">
                                                <User class="w-6 h-6" />
                                            </div>
                                            <div class="stat-title text-xs">Users</div>
                                            <div class="stat-value text-primary text-xl">89K</div>
                                        </div>
                                    </div>
                                </div>
                            {:else if block.preview === 'login-preview'}
                                <div class="w-full max-w-xs mx-auto">
                                    <div class="card bg-base-100 shadow-lg">
                                        <div class="card-body p-4">
                                            <h2 class="text-center font-bold mb-3">Login</h2>
                                            <input type="email" placeholder="Email" class="input input-bordered input-sm mb-2" />
                                            <input type="password" placeholder="Password" class="input input-bordered input-sm mb-3" />
                                            <button class="btn btn-primary btn-sm w-full">Login</button>
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                <div class="text-center text-base-content/60">
                                    <Eye class="w-8 h-8 mx-auto mb-2" />
                                    <p class="text-sm">Preview coming soon</p>
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <!-- Code -->
                        <CodeBlock code={block.code} language="svelte" class="text-xs" />
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <!-- Empty State -->
    {#if filteredBlocks.length === 0}
        <div class="text-center py-16">
            <div class="max-w-md mx-auto">
                <Search class="h-16 w-16 text-base-content/30 mx-auto mb-4" />
                <h3 class="text-xl font-semibold mb-2">No blocks found</h3>
                <p class="text-base-content/70 mb-6">
                    Try adjusting your search or filter criteria.
                </p>
                <button
                    on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}
                    class="btn btn-outline"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    {/if}

    <!-- Getting Started -->
    <div class="mt-16 max-w-4xl mx-auto">
        <div class="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div class="card-body">
                <h2 class="card-title text-2xl mb-4">Getting Started with Blocks</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Copy class="w-6 h-6" />
                        </div>
                        <h3 class="font-semibold mb-2">1. Copy Code</h3>
                        <p class="text-sm text-base-content/70">
                            Browse blocks and copy the code that fits your needs
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Code class="w-6 h-6" />
                        </div>
                        <h3 class="font-semibold mb-2">2. Customize</h3>
                        <p class="text-sm text-base-content/70">
                            Modify the block to match your design and content
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Star class="w-6 h-6" />
                        </div>
                        <h3 class="font-semibold mb-2">3. Ship</h3>
                        <p class="text-sm text-base-content/70">
                            Deploy your beautiful interface in minutes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>