<script lang="ts">
    import { 
        Minus, Plus, Trash2, ShoppingCart, Heart, Tag, 
        Truck, Shield, RotateCcw, Star, Gift, ArrowRight,
        CreditCard, Lock, AlertTriangle, Info
    } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    // Cart state with realistic products
    let cartItems = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            originalPrice: 399.99,
            discount: 25,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
            sku: "WH-001",
            category: "Electronics",
            inStock: true,
            maxQuantity: 5,
            shipping: "free",
            rating: 4.8,
            features: ["Noise Cancelling", "30hr Battery", "Bluetooth 5.0"]
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            price: 249.99,
            originalPrice: null,
            discount: 0,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
            sku: "SW-002",
            category: "Wearables",
            inStock: true,
            maxQuantity: 3,
            shipping: "free",
            rating: 4.6,
            features: ["Heart Rate Monitor", "GPS", "Water Resistant"]
        },
        {
            id: 3,
            name: "Ergonomic Office Chair",
            price: 459.99,
            originalPrice: 599.99,
            discount: 23,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=120&h=120&fit=crop",
            sku: "OC-003",
            category: "Furniture",
            inStock: true,
            maxQuantity: 2,
            shipping: "standard",
            rating: 4.4,
            features: ["Lumbar Support", "Memory Foam", "Height Adjustable"]
        },
        {
            id: 4,
            name: "Minimalist Desk Lamp",
            price: 89.99,
            originalPrice: 129.99,
            discount: 31,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&h=120&fit=crop",
            sku: "DL-004",
            category: "Home",
            inStock: false,
            maxQuantity: 10,
            shipping: "free",
            rating: 4.3,
            features: ["LED", "Touch Control", "USB Charging"],
            estimatedRestock: "Dec 28, 2024"
        }
    ];

    let savedForLater = [];
    let wishlist = [];
    let promoCode = '';
    let promoDiscount = 0;
    let promoError = '';
    let isApplyingPromo = false;

    // Valid promo codes
    const validPromoCodes = {
        'SAVE10': { discount: 0.10, description: '10% off your order' },
        'WELCOME': { discount: 0.15, description: '15% off for new customers' },
        'HOLIDAY': { discount: 0.20, description: '20% off holiday special' }
    };

    // Recommended products
    const recommendedProducts = [
        {
            id: 101,
            name: "Wireless Charging Pad",
            price: 39.99,
            originalPrice: 49.99,
            discount: 20,
            image: "https://images.unsplash.com/photo-1609181108804-fab6ff5662c4?w=120&h=120&fit=crop",
            rating: 4.5
        },
        {
            id: 102,
            name: "Bluetooth Keyboard",
            price: 79.99,
            originalPrice: null,
            discount: 0,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&h=120&fit=crop",
            rating: 4.7
        },
        {
            id: 103,
            name: "Phone Stand",
            price: 24.99,
            originalPrice: 34.99,
            discount: 29,
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=120&h=120&fit=crop",
            rating: 4.2
        }
    ];

    // Calculations
    $: subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $: totalDiscount = cartItems.reduce((sum, item) => {
        if (item.originalPrice) {
            return sum + ((item.originalPrice - item.price) * item.quantity);
        }
        return sum;
    }, 0);
    $: promoAmount = subtotal * promoDiscount;
    $: shippingCost = calculateShipping();
    $: tax = (subtotal - promoAmount + shippingCost) * 0.0875; // 8.75% tax
    $: total = subtotal - promoAmount + shippingCost + tax;
    $: freeShippingThreshold = 75;
    $: remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    function calculateShipping() {
        if (subtotal >= freeShippingThreshold) return 0;
        const hasStandardShipping = cartItems.some(item => item.shipping === 'standard');
        return hasStandardShipping ? 12.99 : 5.99;
    }

    function updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }

        const item = cartItems.find(item => item.id === itemId);
        if (item && newQuantity <= item.maxQuantity) {
            item.quantity = newQuantity;
            cartItems = [...cartItems];
            showToast('Cart updated');
        }
    }

    function removeItem(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        showToast('Item removed from cart');
    }

    function moveToSaved(itemId) {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            savedForLater.push({ ...item, quantity: 1 });
            removeItem(itemId);
            savedForLater = [...savedForLater];
            showToast('Moved to saved for later');
        }
    }

    function moveToCart(itemId) {
        const item = savedForLater.find(item => item.id === itemId);
        if (item) {
            cartItems.push({ ...item });
            savedForLater = savedForLater.filter(i => i.id !== itemId);
            cartItems = [...cartItems];
            showToast('Moved to cart');
        }
    }

    function addToWishlist(itemId) {
        const item = cartItems.find(item => item.id === itemId) || 
                   savedForLater.find(item => item.id === itemId) ||
                   recommendedProducts.find(item => item.id === itemId);
        
        if (item && !wishlist.find(w => w.id === itemId)) {
            wishlist.push(item);
            wishlist = [...wishlist];
            showToast('Added to wishlist');
        }
    }

    function addRecommendedToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            cartItems.push({
                ...product,
                quantity: 1,
                inStock: true,
                maxQuantity: 10,
                shipping: 'free',
                features: []
            });
            cartItems = [...cartItems];
        }
        showToast('Added to cart');
    }

    async function applyPromoCode() {
        if (!promoCode.trim()) return;
        
        isApplyingPromo = true;
        promoError = '';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (validPromoCodes[promoCode.toUpperCase()]) {
            promoDiscount = validPromoCodes[promoCode.toUpperCase()].discount;
            promoError = '';
            showToast(`Promo code applied: ${validPromoCodes[promoCode.toUpperCase()].description}`);
        } else {
            promoError = 'Invalid promo code';
            promoDiscount = 0;
        }
        
        isApplyingPromo = false;
    }

    function removePromoCode() {
        promoCode = '';
        promoDiscount = 0;
        promoError = '';
        showToast('Promo code removed');
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end';
        toast.innerHTML = `
            <div class="alert alert-success">
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
    }

    function clearCart() {
        cartItems = [];
        showToast('Cart cleared');
    }
</script>

<svelte:head>
    <title>Shopping Cart - Review Your Items</title>
    <meta name="description" content="Review and manage items in your shopping cart" />
</svelte:head>

<div class="min-h-screen bg-base-50">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p class="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
        </div>

        {#if cartItems.length === 0}
            <!-- Empty Cart -->
            <div class="text-center py-16">
                <div class="text-6xl mb-4">🛒</div>
                <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p class="text-gray-600 mb-8">Start shopping to add items to your cart</p>
                <button class="btn btn-primary">
                    <ShoppingCart class="w-4 h-4 mr-2" />
                    Continue Shopping
                </button>
            </div>
        {:else}
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Main Cart -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Free Shipping Progress -->
                    {#if remainingForFreeShipping > 0}
                        <div class="alert">
                            <Truck class="w-4 h-4" />
                            <div class="flex-1">
                                <div class="text-sm">
                                    Add {formatPrice(remainingForFreeShipping)} more for <strong>FREE shipping</strong>!
                                </div>
                                <div class="w-full bg-base-200 rounded-full h-2 mt-2">
                                    <div 
                                        class="bg-success h-2 rounded-full transition-all duration-300"
                                        style="width: {Math.min(100, ((subtotal / freeShippingThreshold) * 100))}%"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="alert alert-success">
                            <Truck class="w-4 h-4" />
                            <span>You qualify for FREE shipping!</span>
                        </div>
                    {/if}

                    <!-- Cart Items -->
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-xl font-semibold">Cart Items</h2>
                                {#if cartItems.length > 0}
                                    <button class="btn btn-ghost btn-sm text-error" on:click={clearCart}>
                                        <Trash2 class="w-4 h-4 mr-2" />
                                        Clear Cart
                                    </button>
                                {/if}
                            </div>

                            <div class="space-y-6">
                                {#each cartItems as item (item.id)}
                                    <div class="flex gap-4 pb-6 border-b border-base-200 last:border-b-0 last:pb-0">
                                        <!-- Product Image -->
                                        <div class="w-24 h-24 flex-shrink-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                class="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>

                                        <!-- Product Details -->
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 class="font-medium text-lg leading-tight">{item.name}</h3>
                                                    <div class="text-sm text-gray-600 mt-1">
                                                        SKU: {item.sku} • {item.category}
                                                    </div>
                                                    
                                                    <!-- Rating -->
                                                    <div class="flex items-center gap-2 mt-1">
                                                        <div class="rating rating-sm">
                                                            {#each Array(5) as _, i}
                                                                <Star class={cn(
                                                                    'w-3 h-3',
                                                                    i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                )} />
                                                            {/each}
                                                        </div>
                                                        <span class="text-xs text-gray-600">{item.rating}</span>
                                                    </div>

                                                    <!-- Features -->
                                                    <div class="flex flex-wrap gap-1 mt-2">
                                                        {#each item.features.slice(0, 3) as feature}
                                                            <span class="badge badge-outline badge-xs">{feature}</span>
                                                        {/each}
                                                    </div>
                                                </div>
                                                
                                                <!-- Stock Status -->
                                                <div class="text-right">
                                                    {#if item.inStock}
                                                        <span class="badge badge-success badge-sm">In Stock</span>
                                                    {:else}
                                                        <span class="badge badge-warning badge-sm">Out of Stock</span>
                                                        <div class="text-xs text-gray-600 mt-1">Est. {item.estimatedRestock}</div>
                                                    {/if}
                                                </div>
                                            </div>

                                            <!-- Price and Controls -->
                                            <div class="flex items-center justify-between mt-4">
                                                <div>
                                                    <div class="flex items-center gap-2">
                                                        <span class="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                                                        {#if item.originalPrice}
                                                            <span class="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                                                            <span class="badge badge-error badge-sm">-{item.discount}%</span>
                                                        {/if}
                                                    </div>
                                                    
                                                    <!-- Shipping Info -->
                                                    <div class="flex items-center gap-1 mt-1">
                                                        {#if item.shipping === 'free'}
                                                            <Truck class="w-3 h-3 text-success" />
                                                            <span class="text-xs text-success">Free shipping</span>
                                                        {:else}
                                                            <Truck class="w-3 h-3 text-warning" />
                                                            <span class="text-xs text-warning">Standard shipping</span>
                                                        {/if}
                                                    </div>
                                                </div>

                                                <div class="flex items-center gap-2">
                                                    <!-- Quantity Controls -->
                                                    <div class="flex items-center">
                                                        <button 
                                                            class="btn btn-circle btn-outline btn-xs"
                                                            on:click={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={!item.inStock}
                                                        >
                                                            <Minus class="w-3 h-3" />
                                                        </button>
                                                        <input 
                                                            type="number" 
                                                            class="input input-bordered input-xs w-16 text-center mx-2"
                                                            min="1" 
                                                            max={item.maxQuantity}
                                                            value={item.quantity}
                                                            disabled={!item.inStock}
                                                            on:change={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        />
                                                        <button 
                                                            class="btn btn-circle btn-outline btn-xs"
                                                            on:click={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={!item.inStock || item.quantity >= item.maxQuantity}
                                                        >
                                                            <Plus class="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Actions -->
                                            <div class="flex items-center gap-4 mt-4">
                                                <button 
                                                    class="btn btn-ghost btn-xs"
                                                    on:click={() => removeItem(item.id)}
                                                >
                                                    <Trash2 class="w-3 h-3 mr-1" />
                                                    Remove
                                                </button>
                                                <button 
                                                    class="btn btn-ghost btn-xs"
                                                    on:click={() => moveToSaved(item.id)}
                                                >
                                                    <Heart class="w-3 h-3 mr-1" />
                                                    Save for Later
                                                </button>
                                                <button 
                                                    class="btn btn-ghost btn-xs"
                                                    on:click={() => addToWishlist(item.id)}
                                                >
                                                    <Star class="w-3 h-3 mr-1" />
                                                    Add to Wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Saved for Later -->
                    {#if savedForLater.length > 0}
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h3 class="text-lg font-semibold mb-4">Saved for Later ({savedForLater.length})</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {#each savedForLater as item}
                                        <div class="flex gap-3 p-3 border border-base-200 rounded-lg">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                class="w-16 h-16 object-cover rounded"
                                            />
                                            <div class="flex-1 min-w-0">
                                                <h4 class="font-medium text-sm leading-tight">{item.name}</h4>
                                                <div class="text-sm font-semibold text-primary mt-1">{formatPrice(item.price)}</div>
                                                <div class="flex gap-2 mt-2">
                                                    <button 
                                                        class="btn btn-primary btn-xs"
                                                        on:click={() => moveToCart(item.id)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button 
                                                        class="btn btn-ghost btn-xs"
                                                        on:click={() => removeItem(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}

                    <!-- Recommended Products -->
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-4">Recommended for You</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {#each recommendedProducts as product}
                                    <div class="border border-base-200 rounded-lg p-4">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            class="w-full h-32 object-cover rounded mb-3"
                                        />
                                        <h4 class="font-medium text-sm mb-2">{product.name}</h4>
                                        
                                        <div class="flex items-center gap-2 mb-2">
                                            <div class="rating rating-sm">
                                                {#each Array(5) as _, i}
                                                    <Star class={cn(
                                                        'w-3 h-3',
                                                        i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                    )} />
                                                {/each}
                                            </div>
                                            <span class="text-xs text-gray-600">{product.rating}</span>
                                        </div>

                                        <div class="flex items-center gap-2 mb-3">
                                            <span class="font-semibold text-primary">{formatPrice(product.price)}</span>
                                            {#if product.originalPrice}
                                                <span class="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                                            {/if}
                                        </div>
                                        
                                        <button 
                                            class="btn btn-primary btn-sm w-full"
                                            on:click={() => addRecommendedToCart(product)}
                                        >
                                            <Plus class="w-3 h-3 mr-1" />
                                            Add to Cart
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="lg:col-span-1">
                    <div class="sticky top-8 space-y-4">
                        <!-- Promo Code -->
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-4">
                                <h3 class="font-semibold mb-3">
                                    <Tag class="w-4 h-4 inline mr-2" />
                                    Promo Code
                                </h3>
                                <div class="space-y-2">
                                    <div class="join w-full">
                                        <input 
                                            type="text" 
                                            placeholder="Enter code"
                                            class={cn('input input-bordered join-item flex-1', promoError ? 'input-error' : '')}
                                            bind:value={promoCode}
                                            disabled={isApplyingPromo}
                                        />
                                        <button 
                                            class="btn btn-primary join-item"
                                            class:loading={isApplyingPromo}
                                            disabled={!promoCode.trim() || isApplyingPromo}
                                            on:click={applyPromoCode}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {#if promoError}
                                        <div class="text-error text-xs">{promoError}</div>
                                    {/if}
                                    {#if promoDiscount > 0}
                                        <div class="flex items-center justify-between text-success text-sm">
                                            <span>✓ Code applied: {promoCode.toUpperCase()}</span>
                                            <button class="btn btn-ghost btn-xs" on:click={removePromoCode}>Remove</button>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary -->
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-4">
                                <h3 class="font-semibold mb-4">Order Summary</h3>
                                
                                <div class="space-y-2">
                                    <div class="flex justify-between text-sm">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    
                                    {#if totalDiscount > 0}
                                        <div class="flex justify-between text-sm text-success">
                                            <span>Product discounts</span>
                                            <span>-{formatPrice(totalDiscount)}</span>
                                        </div>
                                    {/if}
                                    
                                    {#if promoDiscount > 0}
                                        <div class="flex justify-between text-sm text-success">
                                            <span>Promo code ({promoCode.toUpperCase()})</span>
                                            <span>-{formatPrice(promoAmount)}</span>
                                        </div>
                                    {/if}
                                    
                                    <div class="flex justify-between text-sm">
                                        <div class="flex items-center gap-1">
                                            <span>Shipping</span>
                                            {#if shippingCost === 0}
                                                <span class="badge badge-success badge-xs">FREE</span>
                                            {/if}
                                        </div>
                                        <span>{formatPrice(shippingCost)}</span>
                                    </div>
                                    
                                    <div class="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                    
                                    <div class="divider my-2"></div>
                                    
                                    <div class="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <!-- Checkout Button -->
                                <button class="btn btn-primary w-full mt-4" disabled={cartItems.length === 0}>
                                    <Lock class="w-4 h-4 mr-2" />
                                    Secure Checkout
                                </button>
                                
                                <!-- Payment Methods -->
                                <div class="flex items-center justify-center gap-2 mt-3 text-xs text-gray-600">
                                    <CreditCard class="w-3 h-3" />
                                    <span>Visa, Mastercard, PayPal, Apple Pay</span>
                                </div>
                            </div>
                        </div>

                        <!-- Trust Indicators -->
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-4">
                                <div class="space-y-3 text-sm">
                                    <div class="flex items-center gap-3">
                                        <Shield class="w-5 h-5 text-success" />
                                        <div>
                                            <div class="font-medium">Secure Checkout</div>
                                            <div class="text-gray-600 text-xs">SSL encrypted & secure</div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-3">
                                        <RotateCcw class="w-5 h-5 text-info" />
                                        <div>
                                            <div class="font-medium">Free Returns</div>
                                            <div class="text-gray-600 text-xs">30-day return policy</div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-3">
                                        <Truck class="w-5 h-5 text-warning" />
                                        <div>
                                            <div class="font-medium">Fast Shipping</div>
                                            <div class="text-gray-600 text-xs">2-5 business days</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Help -->
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-4">
                                <h4 class="font-semibold text-sm mb-2">Need Help?</h4>
                                <div class="space-y-2 text-xs">
                                    <a href="#" class="link link-primary block">Contact Customer Support</a>
                                    <a href="#" class="link link-primary block">Shipping Information</a>
                                    <a href="#" class="link link-primary block">Return Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
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