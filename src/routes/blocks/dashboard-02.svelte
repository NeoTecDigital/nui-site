<script lang="ts">
    import { 
        TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye,
        BarChart3, PieChart, Activity, Calendar, Download, Filter,
        RefreshCw, ChevronDown, ArrowUpRight, ArrowDownRight
    } from 'lucide-svelte';
    
    // Sample analytics data
    let timeRange = '7d';
    let selectedMetric = 'all';
    
    const metrics = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-success'
        },
        {
            title: 'Total Users',
            value: '12,234',
            change: '+15.3%',
            trend: 'up',
            icon: Users,
            color: 'text-info'
        },
        {
            title: 'Page Views',
            value: '2.4M',
            change: '+5.2%',
            trend: 'up',
            icon: Eye,
            color: 'text-warning'
        },
        {
            title: 'Bounce Rate',
            value: '34.2%',
            change: '-2.4%',
            trend: 'down',
            icon: Activity,
            color: 'text-error'
        }
    ];
    
    const chartData = {
        revenue: [1200, 1900, 3000, 5000, 4200, 3800, 4500],
        users: [400, 600, 800, 1200, 1000, 900, 1100],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
    
    const topPages = [
        { page: '/home', views: 24567, bounce: '32.1%' },
        { page: '/products', views: 18234, bounce: '28.5%' },
        { page: '/about', views: 12456, bounce: '45.2%' },
        { page: '/contact', views: 8934, bounce: '52.1%' },
        { page: '/blog', views: 7234, bounce: '38.7%' }
    ];
    
    const deviceData = [
        { device: 'Desktop', percentage: 62.5, count: 15678 },
        { device: 'Mobile', percentage: 28.3, count: 7102 },
        { device: 'Tablet', percentage: 9.2, count: 2310 }
    ];
    
    // Chart rendering helper
    function getBarHeight(value: number, max: number): number {
        return (value / max) * 100;
    }
    
    const maxRevenue = Math.max(...chartData.revenue);
</script>

<svelte:head>
    <title>Analytics Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-base-200">
    <!-- Header -->
    <div class="bg-base-100 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-6">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-base-content">Analytics Dashboard</h1>
                        <p class="mt-1 text-sm text-base-content/70">
                            Track your website performance and user engagement
                        </p>
                    </div>
                    <div class="mt-4 flex md:ml-4 md:mt-0 gap-2">
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                                <Filter class="w-4 h-4 mr-2" />
                                Filter
                                <ChevronDown class="w-4 h-4 ml-1" />
                            </div>
                            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a href="#/">Last 24 hours</a></li>
                                <li><a href="#/">Last 7 days</a></li>
                                <li><a href="#/">Last 30 days</a></li>
                                <li><a href="#/">Last 3 months</a></li>
                            </ul>
                        </div>
                        <button class="btn btn-outline btn-sm">
                            <Download class="w-4 h-4 mr-2" />
                            Export
                        </button>
                        <button class="btn btn-primary btn-sm">
                            <RefreshCw class="w-4 h-4 mr-2" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {#each metrics as metric}
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class={`p-2 rounded-lg bg-base-200 ${metric.color}`}>
                                    <svelte:component this={metric.icon} class="w-5 h-5" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-base-content/70">{metric.title}</p>
                                    <p class="text-2xl font-bold text-base-content">{metric.value}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1">
                                {#if metric.trend === 'up'}
                                    <ArrowUpRight class="w-4 h-4 text-success" />
                                {:else}
                                    <ArrowDownRight class="w-4 h-4 text-error" />
                                {/if}
                                <span class={`text-sm font-medium ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                                    {metric.change}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Revenue Chart -->
            <div class="lg:col-span-2">
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-lg font-semibold">Revenue Overview</h3>
                                <p class="text-sm text-base-content/70">Weekly revenue breakdown</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="badge badge-primary badge-sm">Revenue</div>
                                <div class="badge badge-outline badge-sm">Users</div>
                            </div>
                        </div>
                        
                        <!-- Chart -->
                        <div class="h-64 flex items-end justify-between space-x-2">
                            {#each chartData.revenue as value, i}
                                <div class="flex-1 flex flex-col items-center">
                                    <div class="w-full flex flex-col items-center space-y-1">
                                        <!-- Revenue Bar -->
                                        <div 
                                            class="w-full bg-primary rounded-t-sm transition-all duration-300"
                                            style="height: {getBarHeight(value, maxRevenue)}%;"
                                        ></div>
                                        <!-- Users Bar -->
                                        <div 
                                            class="w-full bg-primary/30 rounded-b-sm transition-all duration-300"
                                            style="height: {getBarHeight(chartData.users[i], maxRevenue)}%;"
                                        ></div>
                                    </div>
                                    <span class="text-xs text-base-content/70 mt-2">{chartData.labels[i]}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Device Breakdown -->
            <div>
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <h3 class="text-lg font-semibold mb-6">Device Usage</h3>
                        <div class="space-y-4">
                            {#each deviceData as device}
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-medium">{device.device}</span>
                                        <span class="text-sm text-base-content/70">{device.percentage}%</span>
                                    </div>
                                    <div class="progress progress-primary bg-base-200 h-2">
                                        <div 
                                            class="progress-primary h-full rounded-full"
                                            style="width: {device.percentage}%;"
                                        ></div>
                                    </div>
                                    <div class="text-xs text-base-content/50 mt-1">
                                        {device.count.toLocaleString()} users
                                    </div>
                                </div>
                            {/each}
                        </div>
                        
                        <div class="mt-6 p-4 bg-base-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium">Mobile Traffic</p>
                                    <p class="text-xs text-base-content/70">vs last week</p>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <TrendingUp class="w-4 h-4 text-success" />
                                    <span class="text-sm font-semibold text-success">+12.3%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Pages Table -->
        <div class="mt-8">
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-lg font-semibold">Top Pages</h3>
                            <p class="text-sm text-base-content/70">Most visited pages this week</p>
                        </div>
                        <button class="btn btn-outline btn-sm">View All</button>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Page</th>
                                    <th class="text-right">Views</th>
                                    <th class="text-right">Bounce Rate</th>
                                    <th class="text-right">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each topPages as page, i}
                                    <tr class="hover">
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <div class="w-2 h-2 rounded-full bg-primary"></div>
                                                <span class="font-mono text-sm">{page.page}</span>
                                            </div>
                                        </td>
                                        <td class="text-right font-semibold">{page.views.toLocaleString()}</td>
                                        <td class="text-right">
                                            <span class={`badge badge-sm ${
                                                parseFloat(page.bounce) > 40 ? 'badge-error' : 'badge-success'
                                            }`}>
                                                {page.bounce}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            {#if i < 2}
                                                <TrendingUp class="w-4 h-4 text-success inline" />
                                            {:else}
                                                <TrendingDown class="w-4 h-4 text-error inline" />
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <BarChart3 class="w-8 h-8 mx-auto text-primary mb-2" />
                    <h4 class="font-semibold">Average Session</h4>
                    <p class="text-2xl font-bold text-primary">4m 32s</p>
                    <p class="text-sm text-base-content/70">+18% from last week</p>
                </div>
            </div>
            
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <PieChart class="w-8 h-8 mx-auto text-warning mb-2" />
                    <h4 class="font-semibold">Conversion Rate</h4>
                    <p class="text-2xl font-bold text-warning">3.24%</p>
                    <p class="text-sm text-base-content/70">-0.5% from last week</p>
                </div>
            </div>
            
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <Calendar class="w-8 h-8 mx-auto text-info mb-2" />
                    <h4 class="font-semibold">New Visitors</h4>
                    <p class="text-2xl font-bold text-info">68%</p>
                    <p class="text-sm text-base-content/70">+12% from last week</p>
                </div>
            </div>
        </div>
    </div>
</div>