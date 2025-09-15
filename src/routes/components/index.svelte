<script lang="ts">
    import { Search, Filter, Grid, List } from 'lucide-svelte';
    import { cn } from '$lib/utils/index.js';

    let searchQuery = '';
    let selectedCategory = 'all';
    let viewMode = 'grid';

    const categories = [
        { id: 'all', name: 'All Components', count: 38 },
        { id: 'form', name: 'Form', count: 8 },
        { id: 'layout', name: 'Layout', count: 6 },
        { id: 'navigation', name: 'Navigation', count: 5 },
        { id: 'feedback', name: 'Feedback', count: 4 },
        { id: 'overlay', name: 'Overlay', count: 4 },
        { id: 'data', name: 'Data Display', count: 6 },
        { id: 'media', name: 'Media', count: 3 },
        { id: 'interactive', name: 'Interactive', count: 2 }
    ];

    const components = [
        // Form Components
        { name: 'Button', category: 'form', status: 'stable', description: 'Clickable button component with multiple variants' },
        { name: 'Input', category: 'form', status: 'stable', description: 'Text input field with validation support' },
        { name: 'Textarea', category: 'form', status: 'stable', description: 'Multi-line text input component' },
        { name: 'Checkbox', category: 'form', status: 'stable', description: 'Checkbox input with custom styling' },
        { name: 'Radio Group', category: 'form', status: 'stable', description: 'Group of radio button inputs' },
        { name: 'Select', category: 'form', status: 'stable', description: 'Dropdown selection component' },
        { name: 'Switch', category: 'form', status: 'stable', description: 'Toggle switch component' },
        { name: 'Slider', category: 'form', status: 'stable', description: 'Range slider input component' },

        // Layout Components  
        { name: 'Card', category: 'layout', status: 'stable', description: 'Container component with header, content, and footer' },
        { name: 'Separator', category: 'layout', status: 'stable', description: 'Visual divider between content sections' },
        { name: 'Sheet', category: 'layout', status: 'stable', description: 'Side panel overlay component' },
        { name: 'Drawer', category: 'layout', status: 'beta', description: 'Sliding drawer panel component' },
        { name: 'Accordion', category: 'layout', status: 'stable', description: 'Collapsible content sections' },
        { name: 'Collapsible', category: 'layout', status: 'stable', description: 'Simple collapsible content wrapper' },

        // Navigation Components
        { name: 'Breadcrumb', category: 'navigation', status: 'stable', description: 'Navigation breadcrumb trail' },
        { name: 'Pagination', category: 'navigation', status: 'stable', description: 'Page navigation component' },
        { name: 'Navigation Menu', category: 'navigation', status: 'stable', description: 'Complex navigation menu system' },
        { name: 'Menubar', category: 'navigation', status: 'stable', description: 'Application menubar component' },
        { name: 'Tabs', category: 'navigation', status: 'stable', description: 'Tabbed content navigation' },

        // Feedback Components
        { name: 'Alert', category: 'feedback', status: 'stable', description: 'Alert message component with variants' },
        { name: 'Badge', category: 'feedback', status: 'stable', description: 'Small status indicator badge' },
        { name: 'Progress', category: 'feedback', status: 'stable', description: 'Progress bar indicator' },
        { name: 'Tooltip', category: 'feedback', status: 'stable', description: 'Hover tooltip component' },

        // Overlay Components
        { name: 'Dialog', category: 'overlay', status: 'stable', description: 'Modal dialog component' },
        { name: 'Popover', category: 'overlay', status: 'stable', description: 'Floating popover content' },
        { name: 'Dropdown Menu', category: 'overlay', status: 'stable', description: 'Dropdown menu with items' },
        { name: 'Context Menu', category: 'overlay', status: 'stable', description: 'Right-click context menu' },

        // Data Display Components
        { name: 'Table', category: 'data', status: 'stable', description: 'Data table component' },
        { name: 'Data Table', category: 'data', status: 'beta', description: 'Advanced data table with sorting and filtering' },
        { name: 'Calendar', category: 'data', status: 'stable', description: 'Date picker calendar component' },
        { name: 'Avatar', category: 'data', status: 'stable', description: 'User avatar display component' },
        { name: 'Badge', category: 'data', status: 'stable', description: 'Status and count indicators' },
        { name: 'Label', category: 'data', status: 'stable', description: 'Form field label component' },

        // Media Components
        { name: 'Avatar', category: 'media', status: 'stable', description: 'User profile avatar component' },

        // Interactive Components
        { name: 'Command', category: 'interactive', status: 'beta', description: 'Command palette component' },
        { name: 'Toggle', category: 'interactive', status: 'stable', description: 'Toggle button component' }
    ];

    $: filteredComponents = components.filter(component => {
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            component.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    function getStatusColor(status: string) {
        switch (status) {
            case 'stable': return 'badge-success';
            case 'beta': return 'badge-warning'; 
            case 'alpha': return 'badge-info';
            case 'deprecated': return 'badge-error';
            default: return 'badge-ghost';
        }
    }
</script>

<svelte:head>
    <title>Components - NUI</title>
    <meta name="description" content="Browse all NUI components with examples and documentation" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Components</h1>
        <p class="text-xl text-base-content/70">
            Discover our comprehensive collection of beautiful, accessible components.
        </p>
    </div>

    <!-- Filters and Search -->
    <div class="mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/60" />
                <input
                    type="text"
                    placeholder="Search components..."
                    bind:value={searchQuery}
                    class="input input-bordered w-full pl-10"
                />
            </div>

            <!-- View Mode Toggle -->
            <div class="flex items-center space-x-2">
                <span class="text-sm text-base-content/70">View:</span>
                <div class="btn-group">
                    <button
                        class={cn('btn btn-sm', viewMode === 'grid' ? 'btn-active' : 'btn-ghost')}
                        on:click={() => viewMode = 'grid'}
                    >
                        <Grid class="h-4 w-4" />
                    </button>
                    <button
                        class={cn('btn btn-sm', viewMode === 'list' ? 'btn-active' : 'btn-ghost')}
                        on:click={() => viewMode = 'list'}
                    >
                        <List class="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Filter -->
        <div class="mt-4">
            <div class="flex flex-wrap gap-2">
                {#each categories as category}
                    <button
                        class={cn(
                            'btn btn-sm',
                            selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                        )}
                        on:click={() => selectedCategory = category.id}
                    >
                        {category.name}
                        <span class="badge badge-sm ml-2">{category.count}</span>
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <!-- Results Count -->
    <div class="mb-6">
        <p class="text-sm text-base-content/70">
            Showing {filteredComponents.length} of {components.length} components
        </p>
    </div>

    <!-- Components Grid/List -->
    {#if viewMode === 'grid'}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredComponents as component}
                <a href="#/components/{component.name.toLowerCase().replace(/\s+/g, '-')}" class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="card-title text-lg">{component.name}</h3>
                            <span class="badge {getStatusColor(component.status)} badge-sm">
                                {component.status}
                            </span>
                        </div>
                        <p class="text-sm text-base-content/70 mb-4">{component.description}</p>
                        <div class="card-actions justify-end">
                            <span class="badge badge-outline badge-sm">{component.category}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <div class="space-y-4">
            {#each filteredComponents as component}
                <a href="#/components/{component.name.toLowerCase().replace(/\s+/g, '-')}" class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <h3 class="text-lg font-semibold">{component.name}</h3>
                                    <span class="badge {getStatusColor(component.status)} badge-sm">
                                        {component.status}
                                    </span>
                                    <span class="badge badge-outline badge-sm">{component.category}</span>
                                </div>
                                <p class="text-sm text-base-content/70">{component.description}</p>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}

    <!-- Empty State -->
    {#if filteredComponents.length === 0}
        <div class="text-center py-16">
            <div class="max-w-md mx-auto">
                <Filter class="h-16 w-16 text-base-content/30 mx-auto mb-4" />
                <h3 class="text-xl font-semibold mb-2">No components found</h3>
                <p class="text-base-content/70 mb-6">
                    Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                    on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}
                    class="btn btn-outline"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    {/if}
</div>