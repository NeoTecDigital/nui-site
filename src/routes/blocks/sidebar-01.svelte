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
        LogOut 
    } from 'lucide-svelte';
    
    // Navigation state
    let activeItem = 'dashboard';
    
    // Navigation items with icons
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#dashboard' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '#analytics' },
        { id: 'users', label: 'Users', icon: Users, href: '#users' },
        { id: 'documents', label: 'Documents', icon: FileText, href: '#documents' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, href: '#calendar' },
        { id: 'messages', label: 'Messages', icon: Mail, href: '#messages' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' }
    ];
    
    const secondaryItems = [
        { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '#help' },
        { id: 'logout', label: 'Log out', icon: LogOut, href: '#logout' }
    ];
    
    function handleNavClick(itemId: string, event: Event) {
        event.preventDefault();
        activeItem = itemId;
        
        // Dispatch custom event for parent components
        const detail = { activeItem: itemId };
        const customEvent = new CustomEvent('navigate', { detail });
        document.dispatchEvent(customEvent);
    }
</script>

<div class="h-screen bg-base-100 border-r border-base-300">
    <!-- Sidebar Content -->
    <div class="flex h-full w-64 flex-col">
        <!-- Header -->
        <div class="flex h-16 shrink-0 items-center border-b border-base-300 px-6">
            <h1 class="text-xl font-bold text-base-content">Simple Nav</h1>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 space-y-1 p-4">
            <!-- Primary Navigation -->
            <div class="space-y-1">
                {#each navItems as item}
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
            
            <!-- Divider -->
            <div class="divider"></div>
            
            <!-- Secondary Navigation -->
            <div class="space-y-1">
                {#each secondaryItems as item}
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
        </nav>
    </div>
</div>

<style>
    /* Custom scrollbar for sidebar */
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
</style>