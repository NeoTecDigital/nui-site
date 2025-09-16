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
        ChevronDown,
        ChevronRight,
        User,
        CreditCard,
        Shield,
        Palette,
        Database
    } from 'lucide-svelte';
    
    // Navigation and user state
    let activeItem = 'dashboard';
    let expandedSections: string[] = [];
    
    // User profile data
    const userProfile = {
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b631?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'online', // online, away, busy, offline
        plan: 'Pro'
    };
    
    // Navigation structure with sections
    const navigationSections = [
        {
            id: 'main',
            label: 'Main',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#dashboard' },
                { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '#analytics' },
                { id: 'users', label: 'Users', icon: Users, href: '#users', count: 1247 }
            ]
        },
        {
            id: 'content',
            label: 'Content',
            items: [
                { id: 'documents', label: 'Documents', icon: FileText, href: '#documents' },
                { id: 'calendar', label: 'Calendar', icon: Calendar, href: '#calendar' },
                { id: 'messages', label: 'Messages', icon: Mail, href: '#messages', count: 5 }
            ]
        },
        {
            id: 'system',
            label: 'System',
            items: [
                { id: 'database', label: 'Database', icon: Database, href: '#database' },
                { id: 'security', label: 'Security', icon: Shield, href: '#security' },
                { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' }
            ]
        }
    ];
    
    // User menu items
    const userMenuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'preferences', label: 'Preferences', icon: Palette },
        { id: 'help', label: 'Help Center', icon: HelpCircle },
        { id: 'logout', label: 'Sign out', icon: LogOut }
    ];
    
    let userMenuOpen = false;
    
    function toggleSection(sectionId: string) {
        if (expandedSections.includes(sectionId)) {
            expandedSections = expandedSections.filter(id => id !== sectionId);
        } else {
            expandedSections = [...expandedSections, sectionId];
        }
    }
    
    function handleNavClick(itemId: string, event: Event) {
        event.preventDefault();
        activeItem = itemId;
        
        // Dispatch custom event for parent components
        const detail = { activeItem: itemId };
        const customEvent = new CustomEvent('navigate', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function toggleUserMenu() {
        userMenuOpen = !userMenuOpen;
    }
    
    function handleUserMenuClick(action: string, event: Event) {
        event.preventDefault();
        userMenuOpen = false;
        
        // Dispatch user action event
        const detail = { action };
        const customEvent = new CustomEvent('userAction', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function getStatusColor(status: string) {
        switch (status) {
            case 'online': return 'bg-success';
            case 'away': return 'bg-warning';
            case 'busy': return 'bg-error';
            default: return 'bg-base-content/30';
        }
    }
    
    // Initialize with first section expanded
    expandedSections = ['main'];
</script>

<div class="h-screen bg-base-100 border-r border-base-300">
    <!-- Sidebar Content -->
    <div class="flex h-full w-72 flex-col">
        <!-- Header -->
        <div class="flex h-16 shrink-0 items-center justify-between border-b border-base-300 px-6">
            <h1 class="text-xl font-bold text-base-content">Workspace</h1>
            <button class="btn btn-ghost btn-sm btn-circle" aria-label="Notifications">
                <Bell class="h-5 w-5" />
                <div class="absolute top-2 right-2 h-2 w-2 rounded-full bg-error"></div>
            </button>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto p-4">
            {#each navigationSections as section}
                <div class="mb-6">
                    <!-- Section Header -->
                    <button
                        class="flex w-full items-center justify-between px-2 py-1 text-xs font-semibold text-base-content/50 uppercase tracking-wider hover:text-base-content/70 transition-colors"
                        on:click={() => toggleSection(section.id)}
                    >
                        <span>{section.label}</span>
                        <svelte:component 
                            this={expandedSections.includes(section.id) ? ChevronDown : ChevronRight}
                            class="h-3 w-3 transition-transform duration-200"
                        />
                    </button>
                    
                    <!-- Section Items -->
                    {#if expandedSections.includes(section.id)}
                        <div class="mt-2 space-y-1">
                            {#each section.items as item}
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
                                    
                                    {#if item.count}
                                        <span class="badge badge-primary badge-sm">{item.count}</span>
                                    {/if}
                                </a>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        </nav>
        
        <!-- User Profile Footer -->
        <div class="border-t border-base-300 p-4">
            <div class="relative">
                <!-- User Profile Button -->
                <button
                    class="flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors hover:bg-base-200"
                    on:click={toggleUserMenu}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                >
                    <!-- Avatar with Status -->
                    <div class="relative flex-shrink-0">
                        <img 
                            class="h-10 w-10 rounded-full object-cover" 
                            src={userProfile.avatar} 
                            alt={userProfile.name}
                        />
                        <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-100 {getStatusColor(userProfile.status)}"></div>
                    </div>
                    
                    <!-- User Info -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center space-x-2">
                            <p class="text-sm font-medium text-base-content truncate">{userProfile.name}</p>
                            <span class="badge badge-secondary badge-xs">{userProfile.plan}</span>
                        </div>
                        <p class="text-xs text-base-content/60 truncate">{userProfile.email}</p>
                        <p class="text-xs text-base-content/50 capitalize">{userProfile.status} • {userProfile.role}</p>
                    </div>
                    
                    <!-- Dropdown Arrow -->
                    <ChevronDown class="h-4 w-4 text-base-content/50 transition-transform duration-200 {userMenuOpen ? 'rotate-180' : ''}" />
                </button>
                
                <!-- User Menu Dropdown -->
                {#if userMenuOpen}
                    <div class="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-base-300 bg-base-100 py-2 shadow-lg">
                        {#each userMenuItems as menuItem}
                            <button
                                class="flex w-full items-center px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors
                                       {menuItem.id === 'logout' ? 'text-error hover:bg-error/10' : ''}"
                                on:click={(e) => handleUserMenuClick(menuItem.id, e)}
                            >
                                <svelte:component 
                                    this={menuItem.icon} 
                                    class="mr-3 h-4 w-4 {menuItem.id === 'logout' ? 'text-error' : 'text-base-content/60'}"
                                />
                                {menuItem.label}
                            </button>
                        {/each}
                    </div>
                {/if}
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
    
    /* Smooth animations */
    .transition-transform {
        transition: transform 0.2s ease-in-out;
    }
    
    /* User menu animation */
    .absolute.bottom-full {
        animation: slideUp 0.15s ease-out;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>