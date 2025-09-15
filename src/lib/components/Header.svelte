<script lang="ts">
    import { theme, themes } from '$lib/stores/theme.js';
    import { currentRoute } from '$lib/utils/router.js';
    import { Moon, Sun, Menu, Search, Github } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    let isMenuOpen = false;
    let searchQuery = '';

    function toggleTheme() {
        const currentIndex = themes.indexOf($theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        theme.set(themes[nextIndex]);
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    const navigation = [
        { name: 'Docs', href: '/docs' },
        { name: 'Components', href: '/components' },
        { name: 'Blocks', href: '/blocks' },
        { name: 'Charts', href: '/charts' },
        { name: 'Themes', href: '/themes' },
        { name: 'Colors', href: '/colors' },
    ];
</script>

<header class="sticky top-0 z-50 w-full border-b bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
            <a href="/" class="flex items-center space-x-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content font-bold">
                    N
                </div>
                <span class="text-xl font-bold">NUI</span>
            </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
            {#each navigation as item}
                <a 
                    href={item.href} 
                    class={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        $currentRoute === item.href 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-base-content/70"
                    )}
                >
                    {item.name}
                </a>
            {/each}
        </nav>

        <!-- Search & Actions -->
        <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="hidden md:flex items-center">
                <div class="relative">
                    <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        bind:value={searchQuery}
                        class="input input-sm pl-8 w-48 bg-base-200"
                    />
                </div>
            </div>

            <!-- Theme Toggle -->
            <button 
                on:click={toggleTheme}
                class="btn btn-ghost btn-sm btn-circle"
                aria-label="Toggle theme"
            >
                {#if $theme === 'dark'}
                    <Sun class="h-4 w-4" />
                {:else}
                    <Moon class="h-4 w-4" />
                {/if}
            </button>

            <!-- GitHub Link -->
            <a 
                href="https://github.com/nui-dev/nui"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ghost btn-sm btn-circle"
                aria-label="GitHub repository"
            >
                <Github class="h-4 w-4" />
            </a>

            <!-- Mobile Menu Button -->
            <button 
                on:click={toggleMenu}
                class="btn btn-ghost btn-sm btn-circle md:hidden"
                aria-label="Toggle menu"
            >
                <Menu class="h-4 w-4" />
            </button>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <div class="border-t bg-base-100 md:hidden">
            <div class="container mx-auto px-4 py-4">
                <nav class="flex flex-col space-y-3">
                    {#each navigation as item}
                        <a 
                            href={item.href} 
                            class={cn(
                                "text-sm font-medium transition-colors hover:text-primary py-2",
                                $currentRoute === item.href 
                                    ? "text-primary border-l-2 border-primary pl-2" 
                                    : "text-base-content/70"
                            )}
                            on:click={() => isMenuOpen = false}
                        >
                            {item.name}
                        </a>
                    {/each}
                </nav>
                
                <!-- Mobile Search -->
                <div class="mt-4 pt-4 border-t">
                    <div class="relative">
                        <Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            bind:value={searchQuery}
                            class="input input-sm pl-8 w-full bg-base-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    {/if}
</header>