<script lang="ts">
    import { EyeOff, Eye, Mail, Lock, Github, Chrome } from 'lucide-svelte';
    
    let email = '';
    let password = '';
    let rememberMe = false;
    let showPassword = false;
    let isLoading = false;
    let socialLoading: {[key: string]: boolean} = {};
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Email login attempt:', {
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

    // Handle social login
    async function handleSocialLogin(provider: string) {
        socialLoading[provider] = true;
        socialLoading = socialLoading; // Trigger reactivity
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Social login attempt:', {
                provider,
                timestamp: new Date().toISOString()
            });
            
            alert(`${provider} login successful! (This is a demo)`);
        } catch (error) {
            console.error(`${provider} login failed:`, error);
        } finally {
            socialLoading[provider] = false;
            socialLoading = socialLoading;
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

    $: anyLoading = isLoading || Object.values(socialLoading).some(loading => loading);
</script>

<svelte:head>
    <title>Social Login - NUI Blocks</title>
    <meta name="description" content="Login form with social authentication options" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-content rounded-2xl mb-4">
                <Lock class="w-8 h-8" />
            </div>
            <h1 class="text-3xl font-bold text-base-content">Sign in</h1>
            <p class="text-base-content/70 mt-2">Continue to your account</p>
        </div>

        <!-- Login Form -->
        <div class="card bg-base-100 shadow-2xl border border-base-300">
            <div class="card-body">
                <!-- Social Login Buttons -->
                <div class="space-y-3 mb-6">
                    <button 
                        class="btn btn-outline w-full"
                        class:loading={socialLoading.google}
                        disabled={anyLoading}
                        on:click={() => handleSocialLogin('Google')}
                    >
                        {#if socialLoading.google}
                            <span class="loading loading-spinner loading-sm"></span>
                            Connecting...
                        {:else}
                            <Chrome class="w-5 h-5 mr-2" />
                            Continue with Google
                        {/if}
                    </button>

                    <button 
                        class="btn btn-outline w-full"
                        class:loading={socialLoading.github}
                        disabled={anyLoading}
                        on:click={() => handleSocialLogin('GitHub')}
                    >
                        {#if socialLoading.github}
                            <span class="loading loading-spinner loading-sm"></span>
                            Connecting...
                        {:else}
                            <Github class="w-5 h-5 mr-2" />
                            Continue with GitHub
                        {/if}
                    </button>

                    <button 
                        class="btn btn-outline w-full"
                        class:loading={socialLoading.apple}
                        disabled={anyLoading}
                        on:click={() => handleSocialLogin('Apple')}
                    >
                        {#if socialLoading.apple}
                            <span class="loading loading-spinner loading-sm"></span>
                            Connecting...
                        {:else}
                            <!-- Apple Icon -->
                            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Continue with Apple
                        {/if}
                    </button>
                </div>

                <!-- Divider -->
                <div class="divider">or continue with email</div>

                <!-- Email/Password Form -->
                <form on:submit={handleSubmit} class="space-y-4" novalidate>
                    <!-- Email Field -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Email</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail class="h-5 w-5 text-base-content/40" />
                            </div>
                            <input 
                                type="email" 
                                bind:value={email}
                                on:blur={() => validateField('email')}
                                placeholder="name@example.com" 
                                class="input input-bordered w-full pl-10"
                                class:input-error={errors.email}
                                disabled={anyLoading}
                                autocomplete="email"
                                required
                            />
                        </div>
                        {#if errors.email}
                            <label class="label">
                                <span class="label-text-alt text-error">{errors.email}</span>
                            </label>
                        {/if}
                    </div>

                    <!-- Password Field -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Password</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock class="h-5 w-5 text-base-content/40" />
                            </div>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                on:input={(e) => password = e.target.value}
                                on:blur={() => validateField('password')}
                                placeholder="Enter your password" 
                                class="input input-bordered w-full pl-10 pr-12"
                                class:input-error={errors.password}
                                disabled={anyLoading}
                                autocomplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                on:click={() => showPassword = !showPassword}
                                disabled={anyLoading}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {#if showPassword}
                                    <EyeOff class="h-5 w-5 text-base-content/40 hover:text-base-content" />
                                {:else}
                                    <Eye class="h-5 w-5 text-base-content/40 hover:text-base-content" />
                                {/if}
                            </button>
                        </div>
                        {#if errors.password}
                            <label class="label">
                                <span class="label-text-alt text-error">{errors.password}</span>
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
                                    class="checkbox checkbox-primary checkbox-sm mr-2" 
                                    disabled={anyLoading}
                                />
                                <span class="label-text text-sm">Remember me</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            class="link link-primary text-sm"
                            on:click={handleForgotPassword}
                            disabled={anyLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-control mt-6">
                        <button 
                            type="submit" 
                            class="btn btn-primary w-full"
                            class:loading={isLoading}
                            disabled={anyLoading}
                        >
                            {#if isLoading}
                                <span class="loading loading-spinner"></span>
                                Signing in...
                            {:else}
                                Sign in
                            {/if}
                        </button>
                    </div>
                </form>

                <!-- Divider -->
                <div class="divider">Need an account?</div>

                <!-- Sign Up Link -->
                <div class="text-center">
                    <button 
                        class="btn btn-ghost btn-sm"
                        disabled={anyLoading}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>

        <!-- Security Notice -->
        <div class="text-center mt-6">
            <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-sm">
                    <div class="font-medium">Secure Login</div>
                    <div class="text-xs opacity-70">Your data is protected with end-to-end encryption</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Enhanced focus styles */
    .input:focus,
    .btn:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
        outline: none;
    }
    
    .checkbox:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
    }
    
    /* Smooth transitions */
    .input,
    .btn,
    .checkbox {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced gradient background */
    .bg-gradient-to-br {
        background-image: linear-gradient(135deg, hsl(var(--b2)), hsl(var(--b3)));
    }
    
    /* Social button hover effects */
    .btn-outline:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
    }
</style>