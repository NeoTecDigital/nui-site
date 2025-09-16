<script lang="ts">
    import { EyeOff, Eye, Mail, Lock, User } from 'lucide-svelte';
    
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Login attempt:', {
                email,
                password,
                rememberMe,
                timestamp: new Date().toISOString()
            });
            
            alert('Login successful! (This is a demo)');
            
            // Reset form
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
        errors = errors; // Trigger reactivity
    }
</script>

<svelte:head>
    <title>Simple Login - NUI Blocks</title>
    <meta name="description" content="Simple login form block with validation and modern styling" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="avatar placeholder mb-4">
                <div class="bg-primary text-primary-content rounded-full w-16">
                    <User class="w-8 h-8" />
                </div>
            </div>
            <h1 class="text-3xl font-bold text-base-content">Welcome back</h1>
            <p class="text-base-content/70 mt-2">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <form on:submit={handleSubmit} class="space-y-4" novalidate>
                    <!-- Email Field -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Email address</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail class="h-5 w-5 text-base-content/40" />
                            </div>
                            <input 
                                type="email" 
                                bind:value={email}
                                on:blur={() => validateField('email')}
                                placeholder="Enter your email" 
                                class="input input-bordered w-full pl-10 {errors.email ? 'input-error' : ''}"
                                class:input-error={errors.email}
                                disabled={isLoading}
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
                                class="input input-bordered w-full pl-10 pr-12 {errors.password ? 'input-error' : ''}"
                                disabled={isLoading}
                                autocomplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                on:click={() => showPassword = !showPassword}
                                disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                                <span class="label-text text-sm">Remember me</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            class="link link-primary text-sm"
                            on:click={handleForgotPassword}
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                <div class="divider">or</div>

                <!-- Sign Up Link -->
                <div class="text-center">
                    <p class="text-sm text-base-content/70">
                        Don't have an account?
                        <button class="link link-primary font-medium" disabled={isLoading}>
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-xs text-base-content/50">
            <p>Protected by industry-standard encryption</p>
        </div>
    </div>
</div>

<style>
    /* Custom focus styles for better accessibility */
    .input:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
    }
    
    .checkbox:focus {
        box-shadow: 0 0 0 3px rgb(var(--p) / 0.2);
    }
    
    /* Smooth transitions */
    .input,
    .btn,
    .checkbox {
        transition: all 0.2s ease;
    }
</style>