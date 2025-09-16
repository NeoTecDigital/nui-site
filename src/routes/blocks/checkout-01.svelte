<script lang="ts">
    import { CreditCard, Lock, Truck, ShoppingCart, ArrowLeft, Check, AlertCircle, Info } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    // Sample cart items
    let cartItems = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
            sku: "WH-001"
        },
        {
            id: 2,
            name: "Smart Fitness Watch", 
            price: 249.99,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
            sku: "SW-002"
        },
        {
            id: 3,
            name: "Ergonomic Office Chair",
            price: 459.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop",
            sku: "OC-003"
        }
    ];

    // Form state
    let currentStep = 1;
    let checkoutForm = {
        // Customer Information
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        
        // Shipping Address
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        
        // Billing Address
        billingSame: true,
        billingAddress: '',
        billingApartment: '',
        billingCity: '',
        billingState: '',
        billingZipCode: '',
        billingCountry: 'US',
        
        // Payment
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        saveCard: false,
        
        // Shipping & Extras
        shippingMethod: 'standard',
        giftMessage: '',
        newsletter: false,
        terms: false
    };

    let errors = {};
    let isSubmitting = false;
    let orderComplete = false;

    // Shipping options
    const shippingMethods = [
        {
            id: 'standard',
            name: 'Standard Shipping',
            description: '5-7 business days',
            price: 9.99,
            estimated: 'Dec 28-30'
        },
        {
            id: 'express',
            name: 'Express Shipping',
            description: '2-3 business days',
            price: 19.99,
            estimated: 'Dec 25-26'
        },
        {
            id: 'overnight',
            name: 'Overnight Shipping',
            description: 'Next business day',
            price: 29.99,
            estimated: 'Dec 24'
        }
    ];

    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'AU', name: 'Australia' }
    ];

    // Calculations
    $: subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $: selectedShipping = shippingMethods.find(method => method.id === checkoutForm.shippingMethod);
    $: shippingCost = selectedShipping?.price || 0;
    $: tax = subtotal * 0.0875; // 8.75% tax rate
    $: total = subtotal + shippingCost + tax;

    // Validation functions
    function validateStep(step) {
        errors = {};
        let isValid = true;

        if (step >= 1) {
            if (!checkoutForm.email) {
                errors.email = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(checkoutForm.email)) {
                errors.email = 'Please enter a valid email';
                isValid = false;
            }
            
            if (!checkoutForm.firstName) {
                errors.firstName = 'First name is required';
                isValid = false;
            }
            
            if (!checkoutForm.lastName) {
                errors.lastName = 'Last name is required';
                isValid = false;
            }
        }

        if (step >= 2) {
            if (!checkoutForm.address) {
                errors.address = 'Address is required';
                isValid = false;
            }
            
            if (!checkoutForm.city) {
                errors.city = 'City is required';
                isValid = false;
            }
            
            if (!checkoutForm.state) {
                errors.state = 'State is required';
                isValid = false;
            }
            
            if (!checkoutForm.zipCode) {
                errors.zipCode = 'ZIP code is required';
                isValid = false;
            } else if (!/^\d{5}(-\d{4})?$/.test(checkoutForm.zipCode)) {
                errors.zipCode = 'Please enter a valid ZIP code';
                isValid = false;
            }
        }

        if (step >= 3) {
            if (!checkoutForm.cardNumber) {
                errors.cardNumber = 'Card number is required';
                isValid = false;
            } else if (!/^\d{16}$/.test(checkoutForm.cardNumber.replace(/\s/g, ''))) {
                errors.cardNumber = 'Please enter a valid card number';
                isValid = false;
            }
            
            if (!checkoutForm.expiryDate) {
                errors.expiryDate = 'Expiry date is required';
                isValid = false;
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(checkoutForm.expiryDate)) {
                errors.expiryDate = 'Please enter date as MM/YY';
                isValid = false;
            }
            
            if (!checkoutForm.cvv) {
                errors.cvv = 'CVV is required';
                isValid = false;
            } else if (!/^\d{3,4}$/.test(checkoutForm.cvv)) {
                errors.cvv = 'Please enter a valid CVV';
                isValid = false;
            }
            
            if (!checkoutForm.cardholderName) {
                errors.cardholderName = 'Cardholder name is required';
                isValid = false;
            }

            if (!checkoutForm.terms) {
                errors.terms = 'Please accept the terms and conditions';
                isValid = false;
            }
        }

        return isValid;
    }

    function nextStep() {
        if (validateStep(currentStep)) {
            currentStep++;
        }
    }

    function prevStep() {
        currentStep--;
    }

    async function submitOrder() {
        if (!validateStep(3)) return;
        
        isSubmitting = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        isSubmitting = false;
        orderComplete = true;
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    function formatCardNumber(value) {
        return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    }

    function formatExpiryDate(value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    }
</script>

<svelte:head>
    <title>Secure Checkout - Complete Your Order</title>
    <meta name="description" content="Secure checkout process with multiple payment options" />
</svelte:head>

{#if orderComplete}
    <!-- Order Success -->
    <div class="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div class="max-w-md w-full">
            <div class="text-center">
                <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check class="w-8 h-8 text-white" />
                </div>
                <h1 class="text-2xl font-bold mb-2">Order Confirmed!</h1>
                <p class="text-gray-600 mb-6">
                    Thank you for your purchase. Your order #ORD-2024-0001 has been confirmed.
                </p>
                <div class="bg-base-200 rounded-lg p-4 mb-6">
                    <div class="text-sm text-gray-600 mb-1">Order Total</div>
                    <div class="text-xl font-bold">{formatPrice(total)}</div>
                </div>
                <div class="space-y-2">
                    <button class="btn btn-primary w-full">Track Your Order</button>
                    <button class="btn btn-ghost w-full">Continue Shopping</button>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="min-h-screen bg-base-50">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="max-w-6xl mx-auto mb-8">
                <div class="flex items-center gap-4 mb-6">
                    <button class="btn btn-ghost btn-circle">
                        <ArrowLeft class="w-5 h-5" />
                    </button>
                    <h1 class="text-2xl font-bold">Secure Checkout</h1>
                    <div class="flex items-center text-success">
                        <Lock class="w-4 h-4 mr-2" />
                        <span class="text-sm">SSL Secured</span>
                    </div>
                </div>

                <!-- Progress Steps -->
                <div class="steps steps-horizontal w-full">
                    <div class={cn('step', currentStep >= 1 ? 'step-primary' : '')}>
                        Contact
                    </div>
                    <div class={cn('step', currentStep >= 2 ? 'step-primary' : '')}>
                        Shipping
                    </div>
                    <div class={cn('step', currentStep >= 3 ? 'step-primary' : '')}>
                        Payment
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto">
                <div class="grid lg:grid-cols-5 gap-8">
                    <!-- Main Form -->
                    <div class="lg:col-span-3">
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                {#if currentStep === 1}
                                    <!-- Contact Information -->
                                    <div class="space-y-6">
                                        <div class="flex items-center gap-2 mb-4">
                                            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                                            <h2 class="text-xl font-semibold">Contact Information</h2>
                                        </div>

                                        <div class="grid grid-cols-1 gap-4">
                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Email Address *</span>
                                                </label>
                                                <input 
                                                    type="email" 
                                                    placeholder="you@example.com"
                                                    class={cn('input input-bordered w-full', errors.email ? 'input-error' : '')}
                                                    bind:value={checkoutForm.email}
                                                />
                                                {#if errors.email}
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{errors.email}</span>
                                                    </label>
                                                {/if}
                                            </div>

                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">First Name *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="John"
                                                        class={cn('input input-bordered w-full', errors.firstName ? 'input-error' : '')}
                                                        bind:value={checkoutForm.firstName}
                                                    />
                                                    {#if errors.firstName}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.firstName}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">Last Name *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Doe"
                                                        class={cn('input input-bordered w-full', errors.lastName ? 'input-error' : '')}
                                                        bind:value={checkoutForm.lastName}
                                                    />
                                                    {#if errors.lastName}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.lastName}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Phone Number</span>
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    placeholder="(555) 123-4567"
                                                    class="input input-bordered w-full"
                                                    bind:value={checkoutForm.phone}
                                                />
                                            </div>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer justify-start gap-3">
                                                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={checkoutForm.newsletter} />
                                                <span class="label-text">Keep me updated on special offers and news</span>
                                            </label>
                                        </div>
                                    </div>
                                {:else if currentStep === 2}
                                    <!-- Shipping Information -->
                                    <div class="space-y-6">
                                        <div class="flex items-center gap-2 mb-4">
                                            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                                            <h2 class="text-xl font-semibold">Shipping Information</h2>
                                        </div>

                                        <div class="grid grid-cols-1 gap-4">
                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Street Address *</span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    placeholder="123 Main Street"
                                                    class={cn('input input-bordered w-full', errors.address ? 'input-error' : '')}
                                                    bind:value={checkoutForm.address}
                                                />
                                                {#if errors.address}
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{errors.address}</span>
                                                    </label>
                                                {/if}
                                            </div>

                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Apartment, suite, etc.</span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Apt 4B"
                                                    class="input input-bordered w-full"
                                                    bind:value={checkoutForm.apartment}
                                                />
                                            </div>

                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">City *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="New York"
                                                        class={cn('input input-bordered w-full', errors.city ? 'input-error' : '')}
                                                        bind:value={checkoutForm.city}
                                                    />
                                                    {#if errors.city}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.city}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">State *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="NY"
                                                        class={cn('input input-bordered w-full', errors.state ? 'input-error' : '')}
                                                        bind:value={checkoutForm.state}
                                                    />
                                                    {#if errors.state}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.state}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                            </div>

                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">ZIP Code *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="10001"
                                                        class={cn('input input-bordered w-full', errors.zipCode ? 'input-error' : '')}
                                                        bind:value={checkoutForm.zipCode}
                                                    />
                                                    {#if errors.zipCode}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.zipCode}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">Country *</span>
                                                    </label>
                                                    <select class="select select-bordered w-full" bind:value={checkoutForm.country}>
                                                        {#each countries as country}
                                                            <option value={country.code}>{country.name}</option>
                                                        {/each}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Shipping Method -->
                                        <div class="space-y-4">
                                            <h3 class="font-semibold">Shipping Method</h3>
                                            <div class="space-y-3">
                                                {#each shippingMethods as method}
                                                    <label class="cursor-pointer">
                                                        <div class={cn(
                                                            'card border-2 transition-colors',
                                                            checkoutForm.shippingMethod === method.id ? 'border-primary bg-primary/5' : 'border-base-300'
                                                        )}>
                                                            <div class="card-body p-4">
                                                                <div class="flex items-center gap-3">
                                                                    <input 
                                                                        type="radio" 
                                                                        class="radio radio-primary" 
                                                                        bind:group={checkoutForm.shippingMethod}
                                                                        value={method.id}
                                                                    />
                                                                    <div class="flex-1">
                                                                        <div class="flex items-center justify-between">
                                                                            <div>
                                                                                <div class="font-medium">{method.name}</div>
                                                                                <div class="text-sm text-gray-600">{method.description}</div>
                                                                            </div>
                                                                            <div class="text-right">
                                                                                <div class="font-semibold">{formatPrice(method.price)}</div>
                                                                                <div class="text-sm text-gray-600">Est. {method.estimated}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                {/each}
                                            </div>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer justify-start gap-3">
                                                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={checkoutForm.billingSame} />
                                                <span class="label-text">Billing address same as shipping</span>
                                            </label>
                                        </div>
                                    </div>
                                {:else if currentStep === 3}
                                    <!-- Payment Information -->
                                    <div class="space-y-6">
                                        <div class="flex items-center gap-2 mb-4">
                                            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                                            <h2 class="text-xl font-semibold">Payment Information</h2>
                                        </div>

                                        <div class="alert alert-info">
                                            <Info class="w-4 h-4" />
                                            <span class="text-sm">Your payment information is protected with 256-bit SSL encryption</span>
                                        </div>

                                        <div class="grid grid-cols-1 gap-4">
                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Card Number *</span>
                                                </label>
                                                <div class="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="1234 5678 9012 3456"
                                                        class={cn('input input-bordered w-full pr-12', errors.cardNumber ? 'input-error' : '')}
                                                        value={formatCardNumber(checkoutForm.cardNumber)}
                                                        on:input={(e) => checkoutForm.cardNumber = e.target.value}
                                                    />
                                                    <CreditCard class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                                {#if errors.cardNumber}
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{errors.cardNumber}</span>
                                                    </label>
                                                {/if}
                                            </div>

                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">Expiry Date *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="MM/YY"
                                                        class={cn('input input-bordered w-full', errors.expiryDate ? 'input-error' : '')}
                                                        value={formatExpiryDate(checkoutForm.expiryDate)}
                                                        on:input={(e) => checkoutForm.expiryDate = e.target.value}
                                                    />
                                                    {#if errors.expiryDate}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.expiryDate}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                                <div>
                                                    <label class="label">
                                                        <span class="label-text">CVV *</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="123"
                                                        maxlength="4"
                                                        class={cn('input input-bordered w-full', errors.cvv ? 'input-error' : '')}
                                                        bind:value={checkoutForm.cvv}
                                                    />
                                                    {#if errors.cvv}
                                                        <label class="label">
                                                            <span class="label-text-alt text-error">{errors.cvv}</span>
                                                        </label>
                                                    {/if}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="label">
                                                    <span class="label-text">Cardholder Name *</span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    placeholder="John Doe"
                                                    class={cn('input input-bordered w-full', errors.cardholderName ? 'input-error' : '')}
                                                    bind:value={checkoutForm.cardholderName}
                                                />
                                                {#if errors.cardholderName}
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{errors.cardholderName}</span>
                                                    </label>
                                                {/if}
                                            </div>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer justify-start gap-3">
                                                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={checkoutForm.saveCard} />
                                                <span class="label-text">Save card for future purchases</span>
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer justify-start gap-3">
                                                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={checkoutForm.terms} />
                                                <span class="label-text">
                                                    I agree to the <a href="#" class="link link-primary">Terms & Conditions</a> 
                                                    and <a href="#" class="link link-primary">Privacy Policy</a> *
                                                </span>
                                            </label>
                                            {#if errors.terms}
                                                <label class="label">
                                                    <span class="label-text-alt text-error">{errors.terms}</span>
                                                </label>
                                            {/if}
                                        </div>
                                    </div>
                                {/if}

                                <!-- Navigation Buttons -->
                                <div class="flex justify-between pt-6 border-t">
                                    {#if currentStep > 1}
                                        <button class="btn btn-ghost" on:click={prevStep}>
                                            <ArrowLeft class="w-4 h-4 mr-2" />
                                            Back
                                        </button>
                                    {:else}
                                        <div></div>
                                    {/if}

                                    {#if currentStep < 3}
                                        <button class="btn btn-primary" on:click={nextStep}>
                                            Continue to {currentStep === 1 ? 'Shipping' : 'Payment'}
                                        </button>
                                    {:else}
                                        <button 
                                            class="btn btn-primary"
                                            class:loading={isSubmitting}
                                            disabled={isSubmitting}
                                            on:click={submitOrder}
                                        >
                                            {#if isSubmitting}
                                                Processing...
                                            {:else}
                                                <Lock class="w-4 h-4 mr-2" />
                                                Complete Order
                                            {/if}
                                        </button>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Summary -->
                    <div class="lg:col-span-2">
                        <div class="sticky top-8">
                            <div class="card bg-base-100 shadow-sm">
                                <div class="card-body">
                                    <h3 class="font-semibold text-lg mb-4">Order Summary</h3>
                                    
                                    <!-- Cart Items -->
                                    <div class="space-y-4 mb-6">
                                        {#each cartItems as item}
                                            <div class="flex gap-3">
                                                <div class="relative">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        class="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div class="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h4 class="font-medium text-sm leading-tight">{item.name}</h4>
                                                    <div class="text-xs text-gray-600 mt-1">SKU: {item.sku}</div>
                                                    <div class="flex items-center justify-between mt-2">
                                                        <span class="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                        <span class="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>

                                    <!-- Pricing Breakdown -->
                                    <div class="space-y-2 border-t pt-4">
                                        <div class="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span>Shipping ({selectedShipping?.name})</span>
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

                                    <!-- Security Badges -->
                                    <div class="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
                                        <div class="flex items-center text-xs text-gray-600">
                                            <Lock class="w-3 h-3 mr-1" />
                                            SSL Secure
                                        </div>
                                        <div class="flex items-center text-xs text-gray-600">
                                            <Truck class="w-3 h-3 mr-1" />
                                            Free Returns
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Trust Indicators -->
                            <div class="card bg-base-100 shadow-sm mt-4">
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <div class="text-2xl mb-2">🔐</div>
                                        <h4 class="font-semibold text-sm mb-1">Secure Checkout</h4>
                                        <p class="text-xs text-gray-600">
                                            Your payment information is encrypted and secure. We never store your card details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}