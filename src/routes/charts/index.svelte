<script lang="ts">
    import { 
        BarChart3, LineChart, PieChart, TrendingUp, Activity, DollarSign,
        Copy, ExternalLink, RefreshCw, Monitor, Tablet, Smartphone,
        ChevronDown, Calendar
    } from 'lucide-svelte';
    import * as Chart from '$lib/components/ui/chart/index.js';
    import { Chart as LayerChart, Svg, Area, Axis, LinearGradient } from 'layerchart';
    import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
    import { timeParse } from 'd3-time-format';
    import { curveLinear, curveStep } from 'd3-shape';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
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

    // Real data for the charts - properly validated
    const parseTime = timeParse('%Y-%m-%d');
    
    // Area Chart - Interactive data with date range filtering
    const rawInteractiveData = [
        { date: '2024-01-01', desktop: 186, mobile: 80 },
        { date: '2024-01-15', desktop: 305, mobile: 200 },
        { date: '2024-02-01', desktop: 237, mobile: 120 },
        { date: '2024-02-15', desktop: 173, mobile: 190 },
        { date: '2024-03-01', desktop: 209, mobile: 130 },
        { date: '2024-03-15', desktop: 264, mobile: 140 },
        { date: '2024-04-01', desktop: 214, mobile: 160 },
        { date: '2024-04-15', desktop: 324, mobile: 180 },
        { date: '2024-05-01', desktop: 285, mobile: 220 },
        { date: '2024-05-15', desktop: 378, mobile: 250 },
        { date: '2024-06-01', desktop: 329, mobile: 190 },
        { date: '2024-06-15', desktop: 410, mobile: 280 },
    ];
    
    const interactiveData = rawInteractiveData.map(d => ({
        ...d,
        date: parseTime(d.date)
    })).filter(d => d.date && !isNaN(d.desktop) && !isNaN(d.mobile));

    // Basic area chart data
    const basicAreaData = [
        { month: 'Jan', visitors: 186 },
        { month: 'Feb', visitors: 305 },
        { month: 'Mar', visitors: 237 },
        { month: 'Apr', visitors: 173 },
        { month: 'May', visitors: 209 },
        { month: 'Jun', visitors: 264 },
    ];

    // Multi-series data for stacked charts
    const stackedData = [
        { month: 'Jan', desktop: 186, mobile: 80, tablet: 45 },
        { month: 'Feb', desktop: 305, mobile: 200, tablet: 98 },
        { month: 'Mar', desktop: 237, mobile: 120, tablet: 86 },
        { month: 'Apr', desktop: 173, mobile: 190, tablet: 71 },
        { month: 'May', desktop: 209, mobile: 130, tablet: 89 },
        { month: 'Jun', desktop: 264, mobile: 140, tablet: 92 },
    ];

    // Chart configurations
    const interactiveConfig = {
        visitors: {
            label: 'Visitors',
        },
        desktop: {
            label: 'Desktop',
            color: 'var(--chart-1)',
        },
        mobile: {
            label: 'Mobile',
            color: 'var(--chart-2)',
        }
    } satisfies Chart.ChartConfig;

    const basicConfig = {
        visitors: {
            label: 'Visitors',
            color: 'var(--chart-1)',
        }
    } satisfies Chart.ChartConfig;

    const stackedConfig = {
        desktop: {
            label: 'Desktop',
            color: 'var(--chart-1)',
        },
        mobile: {
            label: 'Mobile',
            color: 'var(--chart-2)',
        },
        tablet: {
            label: 'Tablet',
            color: 'var(--chart-3)',
        }
    } satisfies Chart.ChartConfig;

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    let dateRange = 'last3months';

    $: filteredInteractiveData = dateRange === 'last3months' 
        ? interactiveData.slice(-6) 
        : interactiveData;
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
            <!-- Area Chart - Interactive -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-interactive')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Interactive</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 3 months</p>
                    </div>

                    <!-- Date Range Selector -->
                    <div class="mb-4">
                        <select bind:value={dateRange} class="select select-xs select-bordered">
                            <option value="last3months">Last 3 months</option>
                            <option value="last6months">Last 6 months</option>
                        </select>
                    </div>
                    
                    <!-- Interactive Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={filteredInteractiveData}
                            x="date"
                            y="desktop"
                            xScale={scaleTime()}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="desktop" fill="hsl(var(--chart-1))" fillOpacity={0.6} stroke="hsl(var(--chart-1))" strokeWidth={2} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Basic -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-default')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Basic Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={basicAreaData}
                            x="month"
                            y="visitors"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="visitors" fill="hsl(var(--chart-1))" fillOpacity={0.6} stroke="hsl(var(--chart-1))" strokeWidth={2} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Linear -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-linear')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Linear</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Linear Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={basicAreaData}
                            x="month"
                            y="visitors"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="visitors" fill="hsl(var(--chart-1))" fillOpacity={0.6} stroke="hsl(var(--chart-1))" strokeWidth={2} curve={curveLinear} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Step -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-step')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Step</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Step Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={basicAreaData}
                            x="month"
                            y="visitors"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="visitors" fill="hsl(var(--chart-1))" fillOpacity={0.6} stroke="hsl(var(--chart-1))" strokeWidth={2} curve={curveStep} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Legend -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-legend')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Legend</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Legend Area Chart -->
                    <div class="h-[350px] w-full">
                        <LayerChart
                            data={stackedData}
                            x="month"
                            y="desktop"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 60, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="desktop" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                        
                        <!-- Custom Legend -->
                        <div class="flex justify-center space-x-6 mt-3">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full" style="background-color: hsl(var(--chart-1))"></div>
                                <span class="text-sm">Desktop</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full" style="background-color: hsl(var(--chart-2))"></div>
                                <span class="text-sm">Mobile</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full" style="background-color: hsl(var(--chart-3))"></div>
                                <span class="text-sm">Tablet</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Stacked -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-stacked')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Stacked</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Stacked Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={stackedData}
                            x="month"
                            y="desktop"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="desktop" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Gradient -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-gradient')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Gradient</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Gradient Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={basicAreaData}
                            x="month"
                            y="visitors"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <defs>
                                    <LinearGradient id="areaGradient" vertical>
                                        <stop offset="0%" stop-color="hsl(var(--chart-1))" stop-opacity="0.8" />
                                        <stop offset="100%" stop-color="hsl(var(--chart-1))" stop-opacity="0.1" />
                                    </LinearGradient>
                                </defs>
                                <Area y="visitors" fill="url(#areaGradient)" />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Icons -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-icons')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4 flex items-center space-x-2">
                        <Monitor class="w-4 h-4" />
                        <div>
                            <h3 class="font-semibold text-lg">Area Chart - Icons</h3>
                            <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                        </div>
                    </div>
                    
                    <!-- Icons Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={filteredInteractiveData}
                            x="date"
                            y="desktop"
                            xScale={scaleTime()}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="desktop" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                <Monitor class="w-4 h-4 text-chart-1" />
                                <span class="text-sm">Desktop: 24,828</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Smartphone class="w-4 h-4 text-chart-2" />
                                <span class="text-sm">Mobile: 25,010</span>
                            </div>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Axes -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-axes')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Axes</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Axes Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={basicAreaData}
                            x="month"
                            y="visitors"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 60, bottom: 50, top: 20, right: 20 }}
                        >
                            <Svg>
                                <Area y="visitors" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                <Axis placement="bottom" grid ticks={6} />
                                <Axis placement="left" grid />
                                <Axis placement="top" ticks={0} />
                                <Axis placement="right" ticks={0} />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>

            <!-- Area Chart - Stacked Expanded -->
            <div class="bg-base-100 rounded-lg border">
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <Activity class="w-4 h-4" />
                            <span class="text-sm font-medium">Chart</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-ghost btn-xs" on:click={() => copyToClipboard('area-stacked-expand')}>
                                <Copy class="w-3 h-3 mr-1" />
                                Copy
                            </button>
                            <div class="h-3 w-px bg-border"></div>
                            <button class="btn btn-ghost btn-xs">View Code</button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg">Area Chart - Stacked Expanded</h3>
                        <p class="text-sm text-base-content/70">Showing total visitors for the last 6 months</p>
                    </div>
                    
                    <!-- Stacked Expanded Area Chart -->
                    <div class="h-[300px] w-full">
                        <LayerChart
                            data={stackedData}
                            x="month"
                            y="desktop"
                            xScale={scaleBand().paddingInner(0.1)}
                            yScale={scaleLinear()}
                            padding={{ left: 50, bottom: 40, top: 10, right: 10 }}
                        >
                            <Svg>
                                <Area y="desktop" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                <Axis placement="bottom" />
                                <Axis placement="left" />
                            </Svg>
                        </LayerChart>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex items-center space-x-2">
                            <TrendingUp class="w-4 h-4 text-success" />
                            <span class="text-sm">Trending up by 5.2% this month</span>
                        </div>
                        <p class="text-xs text-base-content/60 mt-1">January - June 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>