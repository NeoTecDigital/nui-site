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
        ChevronDown,
        ChevronRight,
        Folder,
        FolderOpen,
        Globe,
        Smartphone,
        Monitor,
        Zap,
        Code,
        Database,
        Cloud,
        GitBranch,
        Star,
        Clock,
        Plus
    } from 'lucide-svelte';
    
    // Navigation and project state
    let activeItem = 'overview';
    let expandedProjects: string[] = [];
    let selectedProject = 'nui-dashboard';
    
    // Projects data structure
    let projects = [
        {
            id: 'nui-dashboard',
            name: 'NUI Dashboard',
            type: 'web',
            icon: Monitor,
            color: 'bg-blue-500',
            status: 'active',
            lastActivity: '2 hours ago',
            starred: true,
            environments: [
                { id: 'dev', name: 'Development', icon: Code, status: 'healthy' },
                { id: 'staging', name: 'Staging', icon: GitBranch, status: 'healthy' },
                { id: 'prod', name: 'Production', icon: Globe, status: 'healthy' }
            ]
        },
        {
            id: 'mobile-app',
            name: 'Mobile App',
            type: 'mobile',
            icon: Smartphone,
            color: 'bg-green-500',
            status: 'active',
            lastActivity: '1 day ago',
            starred: false,
            environments: [
                { id: 'dev', name: 'Development', icon: Code, status: 'warning' },
                { id: 'prod', name: 'App Store', icon: Smartphone, status: 'healthy' }
            ]
        },
        {
            id: 'api-service',
            name: 'API Service',
            type: 'backend',
            icon: Database,
            color: 'bg-purple-500',
            status: 'maintenance',
            lastActivity: '3 hours ago',
            starred: true,
            environments: [
                { id: 'dev', name: 'Development', icon: Code, status: 'healthy' },
                { id: 'staging', name: 'Staging', icon: Cloud, status: 'error' },
                { id: 'prod', name: 'Production', icon: Database, status: 'healthy' }
            ]
        },
        {
            id: 'analytics',
            name: 'Analytics Platform',
            type: 'data',
            icon: BarChart3,
            color: 'bg-orange-500',
            status: 'active',
            lastActivity: '30 minutes ago',
            starred: false,
            environments: [
                { id: 'dev', name: 'Development', icon: Code, status: 'healthy' },
                { id: 'prod', name: 'Production', icon: BarChart3, status: 'healthy' }
            ]
        }
    ];
    
    // Main navigation items
    const mainNavItems = [
        { id: 'overview', label: 'Overview', icon: Home, href: '#overview' },
        { id: 'activity', label: 'Activity', icon: Clock, href: '#activity' },
        { id: 'team', label: 'Team', icon: Users, href: '#team', count: 12 },
        { id: 'deployments', label: 'Deployments', icon: Zap, href: '#deployments' },
        { id: 'monitoring', label: 'Monitoring', icon: BarChart3, href: '#monitoring' }
    ];
    
    // Bottom navigation
    const bottomNavItems = [
        { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
        { id: 'help', label: 'Documentation', icon: HelpCircle, href: '#help' },
        { id: 'logout', label: 'Sign out', icon: LogOut, href: '#logout' }
    ];
    
    function toggleProject(projectId: string) {
        if (expandedProjects.includes(projectId)) {
            expandedProjects = expandedProjects.filter(id => id !== projectId);
        } else {
            expandedProjects = [...expandedProjects, projectId];
        }
    }
    
    function selectProject(projectId: string) {
        selectedProject = projectId;
        
        // Dispatch project selection event
        const detail = { projectId };
        const customEvent = new CustomEvent('projectSelected', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function handleNavClick(itemId: string, event: Event) {
        event.preventDefault();
        activeItem = itemId;
        
        // Dispatch navigation event
        const detail = { activeItem: itemId };
        const customEvent = new CustomEvent('navigate', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function handleEnvironmentClick(projectId: string, envId: string, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Dispatch environment selection event
        const detail = { projectId, envId };
        const customEvent = new CustomEvent('environmentSelected', { detail });
        document.dispatchEvent(customEvent);
    }
    
    function toggleStarred(projectId: string, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Find and toggle starred status
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            projects[projectIndex].starred = !projects[projectIndex].starred;
            
            // Trigger reactivity
            projects = [...projects];
            
            // Dispatch starred event
            const detail = { projectId, starred: projects[projectIndex].starred };
            const customEvent = new CustomEvent('projectStarred', { detail });
            document.dispatchEvent(customEvent);
        }
    }
    
    function getStatusColor(status: string) {
        switch (status) {
            case 'healthy': return 'text-success';
            case 'warning': return 'text-warning';
            case 'error': return 'text-error';
            default: return 'text-base-content/50';
        }
    }
    
    function getProjectStatusBadge(status: string) {
        switch (status) {
            case 'active': return 'badge-success';
            case 'maintenance': return 'badge-warning';
            case 'error': return 'badge-error';
            default: return 'badge-neutral';
        }
    }
    
    // Initialize with selected project expanded
    expandedProjects = [selectedProject];
</script>

<div class="h-screen bg-base-100 border-r border-base-300">
    <!-- Sidebar Content -->
    <div class="flex h-full w-80 flex-col">
        <!-- Header -->
        <div class="flex h-16 shrink-0 items-center justify-between border-b border-base-300 px-6">
            <h1 class="text-xl font-bold text-base-content">Projects</h1>
            <button class="btn btn-ghost btn-sm btn-circle" aria-label="Add new project">
                <Plus class="h-5 w-5" />
            </button>
        </div>
        
        <!-- Main Navigation -->
        <div class="border-b border-base-300 p-4">
            <nav class="space-y-1">
                {#each mainNavItems as item}
                    <a 
                        href={item.href}
                        class="group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
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
            </nav>
        </div>
        
        <!-- Projects List -->
        <div class="flex-1 overflow-y-auto">
            <div class="p-4">
                <div class="mb-3 flex items-center justify-between">
                    <h3 class="text-sm font-semibold text-base-content/70 uppercase tracking-wider">
                        Your Projects
                    </h3>
                    <span class="text-xs text-base-content/50">{projects.length}</span>
                </div>
                
                <div class="space-y-2">
                    {#each projects as project}
                        <div class="rounded-lg border border-base-300 bg-base-50">
                            <!-- Project Header -->
                            <button
                                class="flex w-full items-center justify-between p-3 text-left hover:bg-base-200/50 transition-colors
                                       {selectedProject === project.id ? 'bg-primary/10' : ''}"
                                on:click={() => {
                                    selectProject(project.id);
                                    toggleProject(project.id);
                                }}
                            >
                                <div class="flex items-center space-x-3">
                                    <!-- Project Icon -->
                                    <div class="flex h-8 w-8 items-center justify-center rounded-lg {project.color} text-white">
                                        <svelte:component this={project.icon} class="h-4 w-4" />
                                    </div>
                                    
                                    <!-- Project Info -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2">
                                            <p class="text-sm font-medium text-base-content truncate">
                                                {project.name}
                                            </p>
                                            <span class="badge badge-xs {getProjectStatusBadge(project.status)}">
                                                {project.status}
                                            </span>
                                        </div>
                                        <p class="text-xs text-base-content/60">{project.lastActivity}</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-2">
                                    <!-- Star Toggle -->
                                    <button
                                        class="p-1 rounded hover:bg-base-300/50 transition-colors"
                                        on:click={(e) => toggleStarred(project.id, e)}
                                        aria-label={project.starred ? 'Unstar project' : 'Star project'}
                                    >
                                        <Star 
                                            class="h-4 w-4 {project.starred ? 'text-warning fill-current' : 'text-base-content/40'}" 
                                        />
                                    </button>
                                    
                                    <!-- Expand Toggle -->
                                    <svelte:component 
                                        this={expandedProjects.includes(project.id) ? ChevronDown : ChevronRight}
                                        class="h-4 w-4 text-base-content/50 transition-transform duration-200"
                                    />
                                </div>
                            </button>
                            
                            <!-- Project Environments -->
                            {#if expandedProjects.includes(project.id)}
                                <div class="border-t border-base-300 bg-base-100 p-2">
                                    <p class="text-xs font-medium text-base-content/50 uppercase tracking-wider mb-2 px-2">
                                        Environments
                                    </p>
                                    <div class="space-y-1">
                                        {#each project.environments as env}
                                            <button
                                                class="flex w-full items-center justify-between px-3 py-2 text-sm rounded hover:bg-base-200 transition-colors"
                                                on:click={(e) => handleEnvironmentClick(project.id, env.id, e)}
                                            >
                                                <div class="flex items-center space-x-2">
                                                    <svelte:component 
                                                        this={env.icon} 
                                                        class="h-4 w-4 text-base-content/60"
                                                    />
                                                    <span class="text-base-content">{env.name}</span>
                                                </div>
                                                
                                                <!-- Environment Status -->
                                                <div class="flex items-center space-x-2">
                                                    <div class="h-2 w-2 rounded-full {env.status === 'healthy' ? 'bg-success' : env.status === 'warning' ? 'bg-warning' : 'bg-error'}"></div>
                                                    <span class="text-xs {getStatusColor(env.status)} capitalize">
                                                        {env.status}
                                                    </span>
                                                </div>
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        
        <!-- Bottom Navigation -->
        <div class="border-t border-base-300 p-4">
            <nav class="space-y-1">
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
            </nav>
        </div>
    </div>
</div>

<style>
    /* Custom scrollbar */
    .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: theme(colors.base-300) transparent;
    }
    
    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
        background: transparent;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: theme(colors.base-300);
        border-radius: 3px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background-color: theme(colors.base-content / 0.3);
    }
    
    /* Smooth transitions */
    .transition-transform {
        transition: transform 0.2s ease-in-out;
    }
    
    /* Project cards animations */
    .rounded-lg.border {
        transition: all 0.15s ease-in-out;
    }
    
    .rounded-lg.border:hover {
        box-shadow: 0 4px 12px theme(colors.base-content / 0.1);
        border-color: theme(colors.base-content / 0.2);
    }
</style>