<script lang="ts">
    import { 
        Search, Eye, Code, Copy, Star, Clock, User, Mail, Phone, 
        ExternalLink, RefreshCw, Monitor, Tablet, Smartphone,
        BarChart3, PieChart, TrendingUp, ShoppingCart, CreditCard,
        Settings, Lock, FileText, MessageSquare, Calendar
    } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import { cn } from '$lib/utils/index.js';
    
    // Import block components
    import Dashboard01 from './dashboard-01.svelte';
    import Dashboard02 from './dashboard-02.svelte';
    import Dashboard03 from './dashboard-03.svelte';
    import Dashboard04 from './dashboard-04.svelte';
    import Sidebar01 from './sidebar-01.svelte';
    import Sidebar02 from './sidebar-02.svelte';
    import Sidebar04 from './sidebar-04.svelte';
    import Sidebar05 from './sidebar-05.svelte';
    import Login01 from './login-01.svelte';
    import Login02 from './login-02.svelte';
    import Login03 from './login-03.svelte';
    import Hero01 from './hero-01.svelte';
    import Features01 from './features-01.svelte';
    import Pricing01 from './pricing-01.svelte';
    import Testimonials01 from './testimonials-01.svelte';
    import Product01 from './product-01.svelte';
    import Checkout01 from './checkout-01.svelte';
    import Cart01 from './cart-01.svelte';

    let searchQuery = '';
    let selectedCategory = 'featured';
    let viewMode = 'preview';
    let deviceView = 'desktop';
    let copiedCode = '';

    const categories = [
        { id: 'featured', name: 'Featured', count: 8 },
        { id: 'sidebar', name: 'Sidebar', count: 4 },
        { id: 'login', name: 'Login', count: 3 },
        { id: 'dashboard', name: 'Dashboard', count: 4 },
        { id: 'marketing', name: 'Marketing', count: 4 },
        { id: 'ecommerce', name: 'E-commerce', count: 3 }
    ];

    const blocks = [
        // Featured Blocks
        {
            id: 'dashboard-01',
            name: 'Dashboard with Sidebar',
            category: 'featured',
            description: 'A complete dashboard with sidebar, charts and data table',
            component: Dashboard01,
            link: '/blocks/dashboard-01',
            code: `npx @nui/cli add dashboard-01`
        },
        {
            id: 'sidebar-01',
            name: 'Simple Sidebar',
            category: 'featured',
            description: 'A basic sidebar layout with navigation',
            component: Sidebar01,
            link: '/blocks/sidebar-01',
            code: `npx @nui/cli add sidebar-01`
        },
        {
            id: 'login-03',
            name: 'Login with Background',
            category: 'featured',
            description: 'A login page with a background image',
            component: Login03,
            link: '/blocks/login-03', 
            code: `npx @nui/cli add login-03`
        },
        {
            id: 'hero-01',
            name: 'Hero Section',
            category: 'featured',
            description: 'Landing page hero section with CTA',
            component: Hero01,
            link: '/blocks/hero-01',
            code: `npx @nui/cli add hero-01`
        },

        // Dashboard Blocks
        {
            id: 'dashboard-02',
            name: 'Analytics Dashboard',
            category: 'dashboard',
            description: 'Dashboard with analytics widgets',
            component: Dashboard02,
            link: '/blocks/dashboard-02',
            code: `npx @nui/cli add dashboard-02`
        },
        {
            id: 'dashboard-03',
            name: 'E-commerce Dashboard',
            category: 'dashboard',
            description: 'Sales and orders dashboard',
            component: Dashboard03,
            link: '/blocks/dashboard-03', 
            code: `npx @nui/cli add dashboard-03`
        },
        {
            id: 'dashboard-04',
            name: 'Project Dashboard',
            category: 'dashboard',
            description: 'Project management dashboard',
            component: Dashboard04,
            link: '/blocks/dashboard-04',
            code: `npx @nui/cli add dashboard-04`
        },

        // Sidebar Blocks
        {
            id: 'sidebar-02',
            name: 'Sidebar with Header',
            category: 'sidebar',
            description: 'Sidebar with branded header',
            component: Sidebar02,
            link: '/blocks/sidebar-02',
            code: `npx @nui/cli add sidebar-02`
        },
        {
            id: 'sidebar-04',
            name: 'Sidebar with Footer',
            category: 'sidebar',
            description: 'Sidebar with user profile footer',
            component: Sidebar04,
            link: '/blocks/sidebar-04', 
            code: `npx @nui/cli add sidebar-04`
        },
        {
            id: 'sidebar-05',
            name: 'Sidebar with Projects',
            category: 'sidebar',
            description: 'Sidebar with project navigation',
            component: Sidebar05,
            link: '/blocks/sidebar-05',
            code: `npx @nui/cli add sidebar-05`
        },

        // Login Blocks  
        {
            id: 'login-01',
            name: 'Simple Login',
            category: 'login',
            description: 'A simple login form',
            component: Login01,
            link: '/blocks/login-01',
            code: `npx @nui/cli add login-01`
        },
        {
            id: 'login-02',
            name: 'Login with Image',
            category: 'login',
            description: 'Login form with side image',
            component: Login02,
            link: '/blocks/login-02',
            code: `npx @nui/cli add login-02`
        },

        // Marketing Blocks
        {
            id: 'features-01',
            name: 'Feature Grid',
            category: 'marketing',
            description: 'Features showcase grid',
            component: Features01,
            link: '/blocks/features-01',
            code: `npx @nui/cli add features-01`
        },
        {
            id: 'pricing-01',
            name: 'Pricing Section',
            category: 'marketing',
            description: 'Pricing plans section',
            component: Pricing01,
            link: '/blocks/pricing-01',
            code: `npx @nui/cli add pricing-01`
        },
        {
            id: 'testimonials-01',
            name: 'Testimonials',
            category: 'marketing',
            description: 'Customer testimonials section',
            component: Testimonials01,
            link: '/blocks/testimonials-01',
            code: `npx @nui/cli add testimonials-01`
        },

        // E-commerce Blocks
        {
            id: 'product-01',
            name: 'Product Details',
            category: 'ecommerce',
            description: 'Product page layout',
            component: Product01,
            link: '/blocks/product-01',
            code: `npx @nui/cli add product-01`
        },
        {
            id: 'checkout-01',
            name: 'Checkout Form',
            category: 'ecommerce',
            description: 'Checkout process form',
            component: Checkout01,
            link: '/blocks/checkout-01',
            code: `npx @nui/cli add checkout-01`
        },
        {
            id: 'cart-01',
            name: 'Shopping Cart',
            category: 'ecommerce',
            description: 'Shopping cart component',
            component: Cart01,
            link: '/blocks/cart-01',
            code: `npx @nui/cli add cart-01`
        }
    ];

    // Copy to clipboard function
    function copyToClipboard(text: string, blockId: string) {
        navigator.clipboard.writeText(text).then(() => {
            copiedCode = blockId;
            setTimeout(() => copiedCode = '', 2000);
        });
    }

    $: filteredBlocks = blocks.filter(block => {
        const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            block.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'featured' || block.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
</script>

<svelte:head>
    <title>Blocks - NUI</title>
    <meta name="description" content="Pre-built component blocks and patterns for rapid development" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-12">
        <h1 class="text-4xl font-bold mb-4">Building Blocks for the Web</h1>
        <p class="text-xl text-base-content/70 mb-8">
            Clean, modern building blocks. Works with all Svelte projects. Copy and paste into your apps. Open Source. Free forever.
        </p>
        <a href="#blocks" class="btn btn-primary">Browse Blocks</a>
    </div>

    <!-- Categories Navigation -->
    <div class="max-w-6xl mx-auto mb-8" id="blocks">
        <div class="flex flex-wrap gap-2 mb-4">
            {#each categories as category}
                <button
                    class={cn(
                        'btn btn-sm',
                        selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                    )}
                    on:click={() => selectedCategory = category.id}
                >
                    {category.name}
                </button>
            {/each}
        </div>
        <div class="text-sm text-base-content/70">
            Showing {filteredBlocks.length} block{filteredBlocks.length === 1 ? '' : 's'}
            {selectedCategory !== 'featured' ? `in ${categories.find(c => c.id === selectedCategory)?.name}` : ''}
        </div>
    </div>

    <!-- Blocks Showcase -->
    <div class="max-w-7xl mx-auto space-y-16">
        {#each filteredBlocks.slice(0, 8) as block}
            <div class="bg-base-100 rounded-lg border">
                <!-- Block Header -->
                <div class="p-6 border-b">
                    <div class="flex items-center justify-between">
                        <!-- Block Info -->
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-semibold">{block.name}</h3>
                                <span class="badge badge-secondary badge-sm">{block.category}</span>
                            </div>
                            <div class="h-4 w-px bg-border"></div>
                            <p class="text-sm text-base-content/70">{block.description}</p>
                        </div>

                        <!-- Controls -->
                        <div class="flex items-center space-x-2">
                            <!-- Device Toggle -->
                            <div class="flex items-center space-x-1 bg-base-200 rounded-lg p-1">
                                <button 
                                    class={cn('btn btn-xs', deviceView === 'desktop' ? 'btn-active' : 'btn-ghost')}
                                    on:click={() => deviceView = 'desktop'}
                                    title="Desktop View"
                                >
                                    <Monitor class="w-3 h-3" />
                                </button>
                                <button 
                                    class={cn('btn btn-xs', deviceView === 'tablet' ? 'btn-active' : 'btn-ghost')}
                                    on:click={() => deviceView = 'tablet'}
                                    title="Tablet View"
                                >
                                    <Tablet class="w-3 h-3" />
                                </button>
                                <button 
                                    class={cn('btn btn-xs', deviceView === 'mobile' ? 'btn-active' : 'btn-ghost')}
                                    on:click={() => deviceView = 'mobile'}
                                    title="Mobile View"
                                >
                                    <Smartphone class="w-3 h-3" />
                                </button>
                            </div>
                            
                            <div class="h-4 w-px bg-border"></div>
                            
                            <a href={block.link} class="btn btn-ghost btn-sm">
                                <ExternalLink class="w-4 h-4 mr-2" />
                                Open Full Screen
                            </a>
                        </div>
                    </div>
                    
                    <div class="mt-4 flex items-center space-x-2">
                        <button 
                            class={cn('btn btn-sm', copiedCode === block.id ? 'btn-success' : 'btn-primary')}
                            on:click={() => copyToClipboard(block.code, block.id)}
                        >
                            <Copy class="w-4 h-4 mr-2" />
                            {copiedCode === block.id ? 'Copied!' : 'Copy Install Command'}
                        </button>
                        <code class="text-sm bg-base-200 px-2 py-1 rounded">{block.code}</code>
                    </div>
                </div>

                <!-- Preview -->
                <div class="bg-base-50 p-4">
                    <div class={cn(
                        'mx-auto transition-all duration-200 border rounded-lg overflow-hidden bg-white shadow-sm',
                        deviceView === 'desktop' ? 'max-w-full' : '',
                        deviceView === 'tablet' ? 'max-w-2xl' : '',
                        deviceView === 'mobile' ? 'max-w-sm' : ''
                    )}>
                        <div class="transform {deviceView === 'mobile' ? 'scale-75 origin-top' : deviceView === 'tablet' ? 'scale-90 origin-top' : 'scale-100'}">
                            <div class="min-h-96 overflow-auto">
                                <svelte:component this={block.component} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Search and Browse More -->
    <div class="max-w-6xl mx-auto mt-16 text-center space-y-4">
        <div class="flex justify-center items-center space-x-4">
            <input 
                type="text" 
                placeholder="Search blocks..." 
                class="input input-bordered w-full max-w-xs"
                bind:value={searchQuery}
            />
            <button 
                class="btn btn-ghost"
                on:click={() => { searchQuery = ''; selectedCategory = 'featured'; }}
            >
                Clear
            </button>
        </div>
        <p class="text-sm text-base-content/70">
            All blocks are responsive and work seamlessly across devices. 
            Copy the install command or view the full screen version.
        </p>
    </div>
</div>