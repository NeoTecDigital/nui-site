<script lang="ts">
    import { ShoppingCart, Star, Heart, Eye, Filter, Grid3X3, List, ChevronDown, Search } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    // Product data with realistic e-commerce items
    let products = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            originalPrice: 399.99,
            discount: 25,
            rating: 4.8,
            reviews: 1247,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            badge: "Bestseller",
            category: "Electronics",
            inStock: true,
            quickSpecs: ["Noise Cancelling", "30hr Battery", "Bluetooth 5.0"]
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            price: 249.99,
            originalPrice: null,
            discount: 0,
            rating: 4.6,
            reviews: 892,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            badge: "New",
            category: "Wearables",
            inStock: true,
            quickSpecs: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"]
        },
        {
            id: 3,
            name: "Professional Camera Lens",
            price: 899.99,
            originalPrice: 1199.99,
            discount: 25,
            rating: 4.9,
            reviews: 456,
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
            badge: "Pro",
            category: "Photography",
            inStock: true,
            quickSpecs: ["85mm f/1.4", "Weather Sealed", "Silent Focus"]
        },
        {
            id: 4,
            name: "Ergonomic Office Chair",
            price: 459.99,
            originalPrice: 599.99,
            discount: 23,
            rating: 4.4,
            reviews: 1823,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
            badge: null,
            category: "Furniture",
            inStock: true,
            quickSpecs: ["Lumbar Support", "Adjustable Height", "Memory Foam"]
        },
        {
            id: 5,
            name: "Minimalist Desk Lamp",
            price: 89.99,
            originalPrice: 129.99,
            discount: 31,
            rating: 4.3,
            reviews: 678,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
            badge: "Sale",
            category: "Home",
            inStock: true,
            quickSpecs: ["LED", "Touch Control", "USB Charging"]
        },
        {
            id: 6,
            name: "Organic Cotton T-Shirt",
            price: 34.99,
            originalPrice: null,
            discount: 0,
            rating: 4.7,
            reviews: 2134,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            badge: "Eco",
            category: "Clothing",
            inStock: true,
            quickSpecs: ["100% Organic", "Fair Trade", "Machine Wash"]
        },
        {
            id: 7,
            name: "Stainless Steel Water Bottle",
            price: 24.99,
            originalPrice: 34.99,
            discount: 29,
            rating: 4.5,
            reviews: 967,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
            badge: "Eco",
            category: "Lifestyle",
            inStock: false,
            quickSpecs: ["Insulated", "BPA Free", "24oz Capacity"]
        },
        {
            id: 8,
            name: "Bluetooth Portable Speaker",
            price: 79.99,
            originalPrice: 99.99,
            discount: 20,
            rating: 4.2,
            reviews: 543,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            badge: null,
            category: "Electronics",
            inStock: true,
            quickSpecs: ["Waterproof", "12hr Battery", "360° Sound"]
        }
    ];

    // State management
    let cart = [];
    let wishlist = [];
    let searchQuery = '';
    let selectedCategory = 'all';
    let sortBy = 'featured';
    let viewMode = 'grid';
    let showFilters = false;
    let priceRange = [0, 1000];

    // Filter and sort functionality
    const categories = [
        { id: 'all', name: 'All Products', count: products.length },
        { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'Electronics').length },
        { id: 'wearables', name: 'Wearables', count: products.filter(p => p.category === 'Wearables').length },
        { id: 'photography', name: 'Photography', count: products.filter(p => p.category === 'Photography').length },
        { id: 'furniture', name: 'Furniture', count: products.filter(p => p.category === 'Furniture').length },
        { id: 'home', name: 'Home', count: products.filter(p => p.category === 'Home').length },
        { id: 'clothing', name: 'Clothing', count: products.filter(p => p.category === 'Clothing').length },
        { id: 'lifestyle', name: 'Lifestyle', count: products.filter(p => p.category === 'Lifestyle').length }
    ];

    const sortOptions = [
        { id: 'featured', name: 'Featured' },
        { id: 'price-low', name: 'Price: Low to High' },
        { id: 'price-high', name: 'Price: High to Low' },
        { id: 'rating', name: 'Highest Rated' },
        { id: 'newest', name: 'Newest First' }
    ];

    $: filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || 
                                  product.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesSearch && matchesCategory && matchesPrice;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id;
                default:
                    return 0;
            }
        });

    // Cart functions
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        cart = cart;
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end';
        toast.innerHTML = `
            <div class="alert alert-success">
                <span>Added to cart!</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
    }

    function toggleWishlist(product) {
        const index = wishlist.findIndex(item => item.id === product.id);
        if (index > -1) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(product);
        }
        wishlist = wishlist;
    }

    function isInWishlist(productId) {
        return wishlist.some(item => item.id === productId);
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
</script>

<svelte:head>
    <title>Product Catalog - Premium E-commerce</title>
    <meta name="description" content="Discover our premium collection of electronics, furniture, and lifestyle products" />
</svelte:head>

<div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Premium Collection</h1>
                    <p class="text-gray-600 mt-1">Discover our curated selection of quality products</p>
                </div>
                
                <!-- Search and Cart Info -->
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            class="input input-bordered pl-10 w-64"
                            bind:value={searchQuery}
                        />
                    </div>
                    <div class="badge badge-primary badge-lg">
                        {filteredProducts.length} products
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        <div class="flex gap-8">
            <!-- Sidebar Filters -->
            <div class="hidden lg:block w-64 flex-shrink-0">
                <div class="sticky top-8 space-y-6">
                    <!-- Categories -->
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4">
                            <h3 class="font-semibold mb-4">Categories</h3>
                            <div class="space-y-2">
                                {#each categories as category}
                                    <button
                                        class={cn(
                                            'btn btn-ghost btn-sm justify-between w-full',
                                            selectedCategory === category.id ? 'btn-active' : ''
                                        )}
                                        on:click={() => selectedCategory = category.id}
                                    >
                                        <span>{category.name}</span>
                                        <span class="badge badge-neutral badge-sm">{category.count}</span>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Price Range -->
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4">
                            <h3 class="font-semibold mb-4">Price Range</h3>
                            <div class="space-y-4">
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1000" 
                                        class="range range-primary range-sm" 
                                        bind:value={priceRange[1]}
                                    />
                                </div>
                                <div class="flex justify-between text-sm text-gray-600">
                                    <span>$0</span>
                                    <span>{formatPrice(priceRange[1])}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Filters -->
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body p-4">
                            <h3 class="font-semibold mb-4">Quick Filters</h3>
                            <div class="space-y-2">
                                <label class="label cursor-pointer">
                                    <span class="label-text">On Sale</span>
                                    <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                                </label>
                                <label class="label cursor-pointer">
                                    <span class="label-text">Free Shipping</span>
                                    <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                                </label>
                                <label class="label cursor-pointer">
                                    <span class="label-text">In Stock</span>
                                    <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" checked />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1">
                <!-- Toolbar -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div class="flex items-center gap-2">
                        <button 
                            class="btn btn-ghost btn-sm lg:hidden"
                            on:click={() => showFilters = !showFilters}
                        >
                            <Filter class="w-4 h-4 mr-2" />
                            Filters
                        </button>
                        <span class="text-gray-600 text-sm">
                            Showing {filteredProducts.length} of {products.length} products
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <!-- Sort Dropdown -->
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                                Sort: {sortOptions.find(opt => opt.id === sortBy)?.name}
                                <ChevronDown class="w-4 h-4 ml-1" />
                            </div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {#each sortOptions as option}
                                    <li>
                                        <button 
                                            class={cn('text-sm', sortBy === option.id ? 'active' : '')}
                                            on:click={() => sortBy = option.id}
                                        >
                                            {option.name}
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <!-- View Mode Toggle -->
                        <div class="join">
                            <button 
                                class={cn('btn btn-sm join-item', viewMode === 'grid' ? 'btn-active' : 'btn-outline')}
                                on:click={() => viewMode = 'grid'}
                            >
                                <Grid3X3 class="w-4 h-4" />
                            </button>
                            <button 
                                class={cn('btn btn-sm join-item', viewMode === 'list' ? 'btn-active' : 'btn-outline')}
                                on:click={() => viewMode = 'list'}
                            >
                                <List class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Products Grid/List -->
                {#if viewMode === 'grid'}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {#each filteredProducts as product}
                            <div class="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-200 group">
                                <figure class="relative overflow-hidden aspect-square">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    
                                    <!-- Badges -->
                                    {#if product.badge}
                                        <div class="absolute top-2 left-2">
                                            <span class={cn(
                                                'badge badge-sm',
                                                product.badge === 'Sale' ? 'badge-error' : 
                                                product.badge === 'New' ? 'badge-success' :
                                                product.badge === 'Bestseller' ? 'badge-warning' :
                                                product.badge === 'Pro' ? 'badge-info' :
                                                'badge-accent'
                                            )}>
                                                {product.badge}
                                            </span>
                                        </div>
                                    {/if}

                                    {#if product.discount > 0}
                                        <div class="absolute top-2 right-2">
                                            <span class="badge badge-error badge-sm">-{product.discount}%</span>
                                        </div>
                                    {/if}

                                    <!-- Overlay Actions -->
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div class="flex gap-2">
                                            <button 
                                                class="btn btn-circle btn-sm bg-white text-black hover:bg-gray-100"
                                                on:click={() => toggleWishlist(product)}
                                            >
                                                <Heart class={cn(
                                                    'w-4 h-4',
                                                    isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                                                )} />
                                            </button>
                                            <button class="btn btn-circle btn-sm bg-white text-black hover:bg-gray-100">
                                                <Eye class="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Stock indicator -->
                                    {#if !product.inStock}
                                        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span class="badge badge-neutral">Out of Stock</span>
                                        </div>
                                    {/if}
                                </figure>
                                
                                <div class="card-body p-4">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="card-title text-sm font-medium leading-tight">{product.name}</h3>
                                    </div>
                                    
                                    <!-- Rating -->
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="rating rating-sm">
                                            {#each Array(5) as _, i}
                                                <Star class={cn(
                                                    'w-3 h-3',
                                                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                )} />
                                            {/each}
                                        </div>
                                        <span class="text-xs text-gray-600">({product.reviews})</span>
                                    </div>

                                    <!-- Quick Specs -->
                                    <div class="flex flex-wrap gap-1 mb-3">
                                        {#each product.quickSpecs.slice(0, 2) as spec}
                                            <span class="badge badge-outline badge-xs">{spec}</span>
                                        {/each}
                                    </div>
                                    
                                    <!-- Price -->
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                                        {#if product.originalPrice}
                                            <span class="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                                        {/if}
                                    </div>
                                    
                                    <!-- Add to Cart Button -->
                                    <button 
                                        class="btn btn-primary btn-sm w-full"
                                        disabled={!product.inStock}
                                        on:click={() => addToCart(product)}
                                    >
                                        <ShoppingCart class="w-4 h-4 mr-2" />
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <!-- List View -->
                    <div class="space-y-4">
                        {#each filteredProducts as product}
                            <div class="card bg-base-100 shadow-sm">
                                <div class="card-body p-4">
                                    <div class="flex gap-4">
                                        <div class="w-20 h-20 flex-shrink-0">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                class="w-full h-full object-cover rounded"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-start justify-between">
                                                <div>
                                                    <h3 class="font-medium text-lg">{product.name}</h3>
                                                    <div class="flex items-center gap-2 mt-1">
                                                        <div class="rating rating-sm">
                                                            {#each Array(5) as _, i}
                                                                <Star class={cn(
                                                                    'w-3 h-3',
                                                                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                )} />
                                                            {/each}
                                                        </div>
                                                        <span class="text-sm text-gray-600">({product.reviews} reviews)</span>
                                                    </div>
                                                    <div class="flex flex-wrap gap-2 mt-2">
                                                        {#each product.quickSpecs as spec}
                                                            <span class="badge badge-outline badge-sm">{spec}</span>
                                                        {/each}
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                    <div class="flex items-center gap-2 mb-2">
                                                        <span class="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                                                        {#if product.originalPrice}
                                                            <span class="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                                                        {/if}
                                                    </div>
                                                    <button 
                                                        class="btn btn-primary btn-sm"
                                                        disabled={!product.inStock}
                                                        on:click={() => addToCart(product)}
                                                    >
                                                        <ShoppingCart class="w-4 h-4 mr-2" />
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}

                <!-- Empty State -->
                {#if filteredProducts.length === 0}
                    <div class="text-center py-16">
                        <div class="text-6xl mb-4">🔍</div>
                        <h3 class="text-xl font-semibold mb-2">No products found</h3>
                        <p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
                        <button 
                            class="btn btn-primary"
                            on:click={() => {
                                searchQuery = '';
                                selectedCategory = 'all';
                                priceRange = [0, 1000];
                            }}
                        >
                            Clear all filters
                        </button>
                    </div>
                {/if}

                <!-- Load More / Pagination would go here -->
                {#if filteredProducts.length >= 12}
                    <div class="text-center mt-12">
                        <button class="btn btn-outline">Load More Products</button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .rating .w-3 {
        mask-image: url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/%3e%3c/svg%3e");
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
    }
</style>