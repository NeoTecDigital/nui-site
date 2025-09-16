<script lang="ts">
    import { EyeOff, Eye, Mail, Lock, ArrowRight, Shield } from 'lucide-svelte';
    
    let email = '';
    let password = '';
    let rememberMe = false;
    let showPassword = false;
    let isLoading = false;
    let errors: {[key: string]: string} = {};

    // Form validation
    function validateForm() {
        errors = {};
        
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        return Object.keys(errors).length === 0;
    }

    // Handle form submission
    async function handleSubmit(event: Event) {
        event.preventDefault();
        
        if (!validateForm()) return;
        
        isLoading = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            console.log('Login attempt:', {
                email,
                password,
                rememberMe,
                timestamp: new Date().toISOString()
            });
            
            alert('Login successful! (This is a demo)');
            
            email = '';
            password = '';
            rememberMe = false;
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            isLoading = false;
        }
    }

    function handleForgotPassword() {
        console.log('Forgot password clicked for:', email || 'no email provided');
        alert(`Password reset link would be sent to: ${email || 'your email'} (This is a demo)`);
    }

    // Real-time validation
    function validateField(field: string) {
        if (field === 'email' && email) {
            if (!/\S+@\S+\.\S+/.test(email)) {
                errors.email = 'Email is invalid';
            } else {
                delete errors.email;
            }
        }
        if (field === 'password' && password) {
            if (password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            } else {
                delete errors.password;
            }
        }
        errors = errors;
    }
</script>

<svelte:head>
    <title>Hero Login - NUI Blocks</title>
    <meta name="description" content="Login form with stunning background image and modern design" />
</svelte:head>

<div class="min-h-screen flex">
    <!-- Background Image Section -->
    <div class="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <!-- Background with overlay -->
        <div 
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="background-image: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), 
                   url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 1000 1000&quot;><defs><radialGradient id=&quot;a&quot; cx=&quot;50%&quot; cy=&quot;50%&quot;><stop offset=&quot;0%&quot; stop-color=&quot;%23667eea&quot;/><stop offset=&quot;100%&quot; stop-color=&quot;%23764ba2&quot;/></radialGradient></defs><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;url(%23a)&quot;/><g fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;><circle cx=&quot;200&quot; cy=&quot;200&quot; r=&quot;100&quot;/><circle cx=&quot;800&quot; cy=&quot;300&quot; r=&quot;150&quot;/><circle cx=&quot;400&quot; cy=&quot;700&quot; r=&quot;80&quot;/><circle cx=&quot;700&quot; cy=&quot;800&quot; r=&quot;120&quot;/></g></svg>')"
        ></div>
        
        <!-- Content Overlay -->
        <div class="relative z-10 flex flex-col justify-center px-12 text-white">
            <div class="max-w-md">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
                    <Shield class="w-8 h-8" />
                </div>
                
                <h2 class="text-4xl font-bold mb-6 leading-tight">
                    Secure access to your workspace
                </h2>
                
                <p class="text-xl mb-8 text-white/80 leading-relaxed">
                    Join thousands of professionals who trust our platform for their daily workflow.
                </p>
                
                <div class="space-y-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <span class="text-white/90">Advanced security & encryption</span>
                    </div>
                    
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <span class="text-white/90">24/7 customer support</span>
                    </div>
                    
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <span class="text-white/90">99.9% uptime guarantee</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
    </div>

    <!-- Login Form Section -->
    <div class="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-base-100">
        <div class="w-full max-w-md">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-content rounded-2xl mb-6">
                    <Lock class="w-8 h-8" />
                </div>
                <h1 class="text-3xl font-bold text-base-content mb-2">Welcome back</h1>
                <p class="text-base-content/60">Please sign in to your account</p>
            </div>

            <!-- Login Form -->
            <form on:submit={handleSubmit} class="space-y-6" novalidate>
                <!-- Email Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold text-base-content">Email address</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail class="h-5 w-5 text-base-content/40" />
                        </div>
                        <input 
                            type="email" 
                            bind:value={email}
                            on:blur={() => validateField('email')}
                            placeholder="Enter your email" 
                            class="input input-bordered input-lg w-full pl-12 bg-base-100 border-2 focus:border-primary"
                            class:input-error={errors.email}
                            disabled={isLoading}
                            autocomplete="email"
                            required
                        />
                    </div>
                    {#if errors.email}
                        <label class="label">
                            <span class="label-text-alt text-error font-medium">{errors.email}</span>
                        </label>
                    {/if}
                </div>

                <!-- Password Field -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold text-base-content">Password</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock class="h-5 w-5 text-base-content/40" />
                        </div>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            on:input={(e) => password = e.target.value}
                            on:blur={() => validateField('password')}
                            placeholder="Enter your password" 
                            class="input input-bordered input-lg w-full pl-12 pr-12 bg-base-100 border-2 focus:border-primary"
                            class:input-error={errors.password}
                            disabled={isLoading}
                            autocomplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            class="absolute inset-y-0 right-0 pr-4 flex items-center"
                            on:click={() => showPassword = !showPassword}
                            disabled={isLoading}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {#if showPassword}
                                <EyeOff class="h-5 w-5 text-base-content/40 hover:text-base-content transition-colors" />
                            {:else}
                                <Eye class="h-5 w-5 text-base-content/40 hover:text-base-content transition-colors" />
                            {/if}
                        </button>
                    </div>
                    {#if errors.password}
                        <label class="label">
                            <span class="label-text-alt text-error font-medium">{errors.password}</span>
                        </label>
                    {/if}
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <input 
                                type="checkbox" 
                                bind:checked={rememberMe}
                                class="checkbox checkbox-primary mr-3" 
                                disabled={isLoading}
                            />
                            <span class="label-text text-base-content/70">Keep me signed in</span>
                        </label>
                    </div>
                    <button
                        type="button"
                        class="link link-primary font-medium"
                        on:click={handleForgotPassword}
                        disabled={isLoading}
                    >
                        Forgot password?
                    </button>
                </div>

                <!-- Submit Button -->
                <div class="form-control mt-8">
                    <button 
                        type="submit" 
                        class="btn btn-primary btn-lg w-full"
                        class:loading={isLoading}
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <span class="loading loading-spinner"></span>
                            Signing you in...
                        {:else}
                            Sign in
                            <ArrowRight class="w-5 h-5 ml-2" />
                        {/if}
                    </button>
                </div>
            </form>

            <!-- Sign Up Link -->
            <div class="text-center mt-8 pt-6 border-t border-base-300">
                <p class="text-base-content/70">
                    New to our platform?
                    <button 
                        class="link link-primary font-semibold"
                        disabled={isLoading}
                    >
                        Create your account
                    </button>
                </p>
            </div>

            <!-- Trust Indicators -->
            <div class="flex items-center justify-center mt-8 space-x-6 text-xs text-base-content/50">
                <div class="flex items-center">
                    <Shield class="w-4 h-4 mr-1" />
                    SSL Secured
                </div>
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Privacy Protected
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Enhanced focus styles */
    .input:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
        outline: none;
        border-color: hsl(var(--p));
    }
    
    .btn:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.3);
        outline: none;
    }
    
    .checkbox:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
    }
    
    /* Smooth transitions */
    .input,
    .btn,
    .checkbox {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced button hover effect */
    .btn-primary:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgb(var(--p) / 0.3);
    }
    
    /* Custom scrollbar for webkit browsers */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: hsl(var(--b3));
    }
    
    ::-webkit-scrollbar-thumb {
        background: hsl(var(--bc) / 0.3);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--bc) / 0.5);
    }
    
    /* Responsive adjustments */
    @media (max-width: 1024px) {
        .min-h-screen {
            min-height: 100vh;
            background: linear-gradient(135deg, hsl(var(--p) / 0.1) 0%, hsl(var(--s) / 0.1) 100%);
        }
    }
</style>