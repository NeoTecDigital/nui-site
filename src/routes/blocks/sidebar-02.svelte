<script lang="ts">
    import { 
        Home, 
        BarChart3, 
        Users, 
        Settings, 
        FileText, 
        Calendar, 
        Mail,
        HelpCircle,
        LogOut,
        Bell,
        Search,
        ChevronRight,
        Package
    } from 'lucide-svelte';
    
    // Navigation state
    let activeItem = 'overview';
    let searchQuery = '';
    
    // Brand logo/name
    const brandName = 'NUI Dashboard';
    const brandLogo = 'N'; // Could be replaced with actual logo component
    
    // Navigation items with icons and badges
    const navItems = [
        { 
            id: 'overview', 
            label: 'Overview', 
            icon: Home, 
            href: '#overview' 
        },
        { 
            id: 'analytics', 
            label: 'Analytics', 
            icon: BarChart3, 
            href: '#analytics',
            badge: 'Pro'
        },
        { 
            id: 'customers', 
            label: 'Customers', 
            icon: Users, 
            href: '#customers',
            count: 124
        },
        { 
            id: 'products', 
            label: 'Products', 
            icon: Package, 
            href: '#products' 
        },
        { 
            id: 'documents', 
            label: 'Documents', 
            icon: FileText, 
            href: '#documents' 
        },
        { 
            id: 'calendar', 
            label: 'Calendar', 
            icon: Calendar, 
            href: '#calendar' 
        },
        { 
            id: 'messages', 
            label: 'Messages', 
            icon: Mail, 
            href: '#messages',
            count: 3
        }
    ];
    
    const bottomNavItems = [
        { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
        { id: 'help', label: 'Help Center', icon: HelpCircle, href: '#help' },
        { id: 'logout', label: 'Sign out', icon: LogOut, href: '#logout' }
    ];
    
    function handleNavClick(itemId: string, event: Event) {
        event.preventDefault();
        activeItem = itemId;
        
        // Dispatch custom event for parent components
        const detail = { activeItem: itemId };
        const customEvent = new CustomEvent('navigate', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        searchQuery = target.value;
        
        // Dispatch search event
        const detail = { query: searchQuery };
        const customEvent = new CustomEvent('search', { detail });
        document.dispatchEvent(customEvent);
    }
</script>

<div class="h-screen bg-base-100 border-r border-base-300">
    <!-- Sidebar Content -->
    <div class="flex h-full w-64 flex-col">
        <!-- Branded Header -->
        <div class="flex h-20 shrink-0 items-center justify-between border-b border-base-300 px-6 py-4">
            <div class="flex items-center space-x-3">
                <!-- Brand Logo -->
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-content font-bold text-lg">
                    {brandLogo}
                </div>
                <!-- Brand Name -->
                <div>
                    <h1 class="text-lg font-bold text-base-content">{brandName}</h1>
                    <p class="text-xs text-base-content/60">v2.1.0</p>
                </div>
            </div>
            <!-- Notifications Badge -->
            <div class="relative">
                <button class="btn btn-ghost btn-sm btn-circle" aria-label="Notifications">
                    <Bell class="h-5 w-5" />
                    <div class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error"></div>
                </button>
            </div>
        </div>
        
        <!-- Search Bar -->
        <div class="p-4 border-b border-base-300">
            <div class="relative">
                <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50" />
                <input
                    type="text"
                    placeholder="Search..."
                    class="input input-bordered w-full pl-10 pr-4 py-2 text-sm"
                    bind:value={searchQuery}
                    on:input={handleSearch}
                />
            </div>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto p-4">
            <!-- Main Navigation -->
            <div class="space-y-1">
                <p class="px-3 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-3">
                    Main Menu
                </p>
                {#each navItems as item}
                    <a 
                        href={item.href}
                        class="group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ease-in-out
                               {activeItem === item.id 
                                   ? 'bg-primary text-primary-content shadow-sm' 
                                   : 'text-base-content hover:bg-base-200 hover:text-base-content'}"
                        on:click={(e) => handleNavClick(item.id, e)}
                        role="button"
                        tabindex="0"
                        on:keydown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleNavClick(item.id, e);
                            }
                        }}
                    >
                        <div class="flex items-center">
                            <svelte:component 
                                this={item.icon} 
                                class="mr-3 h-5 w-5 flex-shrink-0 {activeItem === item.id ? 'text-primary-content' : 'text-base-content/70 group-hover:text-base-content'}"
                            />
                            {item.label}
                        </div>
                        
                        <!-- Badges and counts -->
                        <div class="flex items-center space-x-2">
                            {#if item.badge}
                                <span class="badge badge-secondary badge-xs">{item.badge}</span>
                            {/if}
                            {#if item.count}
                                <span class="badge badge-primary badge-sm">{item.count}</span>
                            {/if}
                            {#if activeItem === item.id}
                                <ChevronRight class="h-4 w-4" />
                            {/if}
                        </div>
                    </a>
                {/each}
            </div>
        </nav>
        
        <!-- Bottom Navigation -->
        <div class="border-t border-base-300 p-4">
            <div class="space-y-1">
                {#each bottomNavItems as item}
                    <a 
                        href={item.href}
                        class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
                               {activeItem === item.id 
                                   ? 'bg-primary text-primary-content' 
                                   : 'text-base-content hover:bg-base-200 hover:text-base-content'}"
                        on:click={(e) => handleNavClick(item.id, e)}
                        role="button"
                        tabindex="0"
                        on:keydown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleNavClick(item.id, e);
                            }
                        }}
                    >
                        <svelte:component 
                            this={item.icon} 
                            class="mr-3 h-5 w-5 flex-shrink-0 {activeItem === item.id ? 'text-primary-content' : 'text-base-content/70 group-hover:text-base-content'}"
                        />
                        {item.label}
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom scrollbar */
    nav {
        scrollbar-width: thin;
        scrollbar-color: theme(colors.base-300) transparent;
    }
    
    nav::-webkit-scrollbar {
        width: 6px;
    }
    
    nav::-webkit-scrollbar-track {
        background: transparent;
    }
    
    nav::-webkit-scrollbar-thumb {
        background-color: theme(colors.base-300);
        border-radius: 3px;
    }
    
    nav::-webkit-scrollbar-thumb:hover {
        background-color: theme(colors.base-content / 0.3);
    }
    
    /* Smooth transitions for active states */
    a {
        transform: translateX(0);
        transition: all 0.15s ease-in-out;
    }
    
    a:hover {
        transform: translateX(2px);
    }
</style>