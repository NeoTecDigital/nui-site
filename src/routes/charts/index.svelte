<script lang="ts">
    import { 
        BarChart3, LineChart, PieChart, TrendingUp, Activity, DollarSign,
        Copy, ExternalLink, RefreshCw, Monitor, Tablet, Smartphone,
        ChevronDown
    } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { cn } from '$lib/utils/index.js';

    let selectedTheme = 'default';
    let selectedCategory = 'area';
    let deviceView = 'desktop';

    const themes = [
        { id: 'default', name: 'Default' },
        { id: 'dark', name: 'Dark' },
        { id: 'modern', name: 'Modern' },
        { id: 'minimal', name: 'Minimal' }
    ];

    const categories = [
        { id: 'area', name: 'Area Charts', href: '/charts/area' },
        { id: 'bar', name: 'Bar Charts', href: '/charts/bar' },
        { id: 'line', name: 'Line Charts', href: '/charts/line' },
        { id: 'pie', name: 'Pie Charts', href: '/charts/pie' },
        { id: 'radar', name: 'Radar Charts', href: '/charts/radar' },
        { id: 'radial', name: 'Radial Charts', href: '/charts/radial' },
        { id: 'tooltip', name: 'Tooltips', href: '/charts/tooltip' }
    ];

    const areaCharts = [
        {
            id: 'area-interactive',
            name: 'Area Chart - Interactive',
            description: 'Showing total visitors for the last 3 months',
            code: 'npx @nui/cli add area-interactive',
            preview: '/charts/area-interactive'
        },
        {
            id: 'area-default',
            name: 'Area Chart',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-default',
            preview: '/charts/area-default'
        },
        {
            id: 'area-linear',
            name: 'Area Chart - Linear',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-linear',
            preview: '/charts/area-linear'
        },
        {
            id: 'area-step',
            name: 'Area Chart - Step',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-step',
            preview: '/charts/area-step'
        },
        {
            id: 'area-legend',
            name: 'Area Chart - Legend',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-legend',
            preview: '/charts/area-legend'
        },
        {
            id: 'area-stacked',
            name: 'Area Chart - Stacked',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-stacked',
            preview: '/charts/area-stacked'
        },
        {
            id: 'area-stacked-expand',
            name: 'Area Chart - Stacked Expanded',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-stacked-expand',
            preview: '/charts/area-stacked-expand'
        },
        {
            id: 'area-icons',
            name: 'Area Chart - Icons',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-icons',
            preview: '/charts/area-icons'
        },
        {
            id: 'area-gradient',
            name: 'Area Chart - Gradient',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-gradient',
            preview: '/charts/area-gradient'
        },
        {
            id: 'area-axes',
            name: 'Area Chart - Axes',
            description: 'Showing total visitors for the last 6 months',
            code: 'npx @nui/cli add area-axes',
            preview: '/charts/area-axes'
        }
    ];

    const quickStartCode = `<script>
  import { Chart } from '@nui/charts';
  
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 }
  ];
<\/script>

<Chart 
  type="line" 
  {data} 
  width={400} 
  height={200} 
/>`;

    const barChartCode = `<script>
  import { BarChart } from '@nui/charts';
<\/script>

<BarChart 
  data={salesData}
  xKey="month"
  yKey="sales"
  title="Monthly Sales"
  color="primary"
/>`;

    const lineChartCode = `<script>
  import { LineChart } from '@nui/charts';
<\/script>

<LineChart 
  data={trafficData}
  xKey="date"
  yKey="visitors"
  title="Website Traffic"
  smooth={true}
/>`;

    // Mock data for demonstrations
    const sampleData = [
        { name: 'Jan', sales: 4000, traffic: 2400 },
        { name: 'Feb', sales: 3000, traffic: 1398 },
        { name: 'Mar', sales: 2000, traffic: 9800 },
        { name: 'Apr', sales: 2780, traffic: 3908 },
        { name: 'May', sales: 1890, traffic: 4800 },
        { name: 'Jun', sales: 2390, traffic: 3800 }
    ];
</script>

<svelte:head>
    <title>Charts - NUI Components</title>
    <meta name="description" content="Beautiful, responsive charts and data visualization components for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-12">
        <h1 class="text-4xl font-bold mb-4">Beautiful Charts & Graphs</h1>
        <p class="text-xl text-base-content/70 mb-8">
            A collection of ready-to-use chart components built with LayerChart. From basic charts to rich data displays, copy and paste into your apps.
        </p>
        <div class="flex space-x-4">
            <a href="#charts" class="btn btn-primary">Browse Charts</a>
            <a href="/docs/components/chart" class="btn btn-outline">Documentation</a>
        </div>
    </div>

    <!-- Category Navigation -->
    <div class="max-w-6xl mx-auto mb-8" id="charts">
        <div class="flex flex-wrap gap-2 mb-4">
            {#each categories as category}
                <a href="{category.href}#charts" class={cn(
                    'btn btn-sm',
                    selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                )}>
                    {category.name}
                </a>
            {/each}
        </div>
        
        <!-- Theme Selector -->
        <div class="flex items-center space-x-4">
            <span class="text-sm font-medium">Theme</span>
            <div class="dropdown">
                <button class="btn btn-sm btn-outline">
                    Theme: {themes.find(t => t.id === selectedTheme)?.name}
                    <ChevronDown class="w-4 h-4 ml-2" />
                </button>
                <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {#each themes as theme}
                        <li>
                            <button 
                                class={cn(theme.id === selectedTheme ? 'active' : '')}
                                on:click={() => selectedTheme = theme.id}
                            >
                                {theme.name}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

    <!-- Area Charts Section -->
    <div class="max-w-7xl mx-auto mb-16">
        <h2 class="text-3xl font-bold mb-8">Area Charts</h2>
        
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {#each areaCharts as chart}
                <div class="bg-base-100 rounded-lg border">
                    <!-- Chart Header -->
                    <div class="p-4 border-b">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <Activity class="w-4 h-4" />
                                <span class="text-sm font-medium">Chart</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="btn btn-ghost btn-xs">
                                    <Copy class="w-3 h-3 mr-1" />
                                    Copy
                                </button>
                                <div class="h-3 w-px bg-border"></div>
                                <button class="btn btn-ghost btn-xs">View Code</button>
                            </div>
                        </div>
                    </div>

                    <!-- Chart Content -->
                    <div class="p-4">
                        <div class="mb-4">
                            <h3 class="font-semibold text-lg">{chart.name}</h3>
                            <p class="text-sm text-base-content/70">{chart.description}</p>
                        </div>
                        
                        <!-- Chart Preview -->
                        <div class="bg-base-50 rounded border h-64 flex items-center justify-center">
                            <div class="text-center">
                                <Activity class="w-12 h-12 text-primary mx-auto mb-2" />
                                <p class="text-sm text-base-content/70">Chart preview</p>
                            </div>
                        </div>
                        
                        <!-- Footer with trend info -->
                        <div class="mt-4 pt-4 border-t">
                            <div class="flex items-center space-x-2">
                                <TrendingUp class="w-4 h-4 text-success" />
                                <span class="text-sm">Trending up by 5.2% this month</span>
                            </div>
                            <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>