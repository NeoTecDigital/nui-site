<script lang="ts">
    import { BarChart3, LineChart, PieChart, TrendingUp, Activity, DollarSign } from 'lucide-svelte';
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';

    const chartTypes = [
        {
            icon: BarChart3,
            title: 'Bar Charts',
            description: 'Perfect for comparing categories and showing data distributions',
            example: 'Sales by region, survey responses, population by age groups'
        },
        {
            icon: LineChart,
            title: 'Line Charts',
            description: 'Ideal for showing trends and changes over time',
            example: 'Stock prices, website traffic, temperature changes'
        },
        {
            icon: PieChart,
            title: 'Pie Charts',
            description: 'Great for showing proportions and percentages',
            example: 'Market share, budget allocation, demographic breakdown'
        },
        {
            icon: Activity,
            title: 'Area Charts',
            description: 'Shows volume and cumulative data over time',
            example: 'Revenue growth, user acquisition, inventory levels'
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
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Charts</h1>
                <p class="text-xl text-base-content/70">
                    Beautiful, responsive charts and data visualization components.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-warning">Coming Soon</span>
            </div>
        </div>

        <!-- Installation -->
        <div class="alert mb-8">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Installation</h3>
                <CodeBlock code="npx @nui/cli add charts" language="bash" copyable={true} />
            </div>
        </div>
    </div>

    <!-- Chart Types Overview -->
    <div class="max-w-6xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Chart Types</h2>
        <div class="grid md:grid-cols-2 gap-6">
            {#each chartTypes as chart}
                <div class="card bg-base-100 shadow-sm border">
                    <div class="card-body">
                        <div class="flex items-start space-x-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <svelte:component this={chart.icon} class="h-6 w-6" />
                            </div>
                            <div class="flex-1">
                                <h3 class="card-title text-lg">{chart.title}</h3>
                                <p class="text-base-content/70 mb-2">{chart.description}</p>
                                <p class="text-sm text-base-content/60">{chart.example}</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Quick Start -->
    <div class="max-w-4xl mb-16">
        <ComponentShowcase 
            title="Quick Start" 
            description="Get started with charts in just a few lines of code"
            code={quickStartCode}
        >
            <div class="flex items-center justify-center p-8 bg-base-200 rounded-lg">
                <div class="text-center">
                    <TrendingUp class="w-16 h-16 text-primary mx-auto mb-4" />
                    <p class="text-base-content/70">Chart preview will appear here</p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Chart Examples -->
    <div class="max-w-4xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Examples</h2>
        
        <div class="space-y-12">
            <!-- Bar Chart Example -->
            <ComponentShowcase 
                title="Bar Chart" 
                description="Compare values across different categories"
                code={barChartCode}
            >
                <div class="bg-base-100 p-6 rounded-lg border">
                    <h4 class="font-semibold mb-4">Monthly Sales Performance</h4>
                    <div class="flex items-end space-x-2 h-32">
                        {#each sampleData as item, i}
                            <div class="flex flex-col items-center flex-1">
                                <div 
                                    class="w-full bg-primary rounded-t"
                                    style="height: {(item.sales / 4000) * 100}%"
                                ></div>
                                <span class="text-xs mt-2">{item.name}</span>
                            </div>
                        {/each}
                    </div>
                    <div class="flex items-center justify-between mt-4 text-sm text-base-content/70">
                        <span>0</span>
                        <span>4000</span>
                    </div>
                </div>
            </ComponentShowcase>

            <!-- Line Chart Example -->
            <ComponentShowcase 
                title="Line Chart" 
                description="Show trends and changes over time"
                code={lineChartCode}
            >
                <div class="bg-base-100 p-6 rounded-lg border">
                    <h4 class="font-semibold mb-4">Website Traffic Trend</h4>
                    <div class="relative h-32 flex items-end">
                        <!-- Simple line chart visualization -->
                        <svg viewBox="0 0 300 100" class="w-full h-full">
                            <polyline
                                fill="none"
                                stroke="oklch(var(--p))"
                                stroke-width="2"
                                points="0,60 50,80 100,20 150,40 200,15 250,35 300,25"
                            />
                            <!-- Data points -->
                            {#each [0, 50, 100, 150, 200, 250, 300] as x, i}
                                <circle 
                                    cx={x} 
                                    cy={[60, 80, 20, 40, 15, 35, 25][i]} 
                                    r="3" 
                                    fill="oklch(var(--p))"
                                />
                            {/each}
                        </svg>
                    </div>
                    <div class="flex justify-between mt-4 text-sm text-base-content/70">
                        {#each sampleData as item}
                            <span>{item.name}</span>
                        {/each}
                    </div>
                </div>
            </ComponentShowcase>
        </div>
    </div>

    <!-- Features -->
    <div class="max-w-4xl mb-16">
        <h2 class="text-2xl font-bold mb-8">Features</h2>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Responsive design</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Theme integration</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Accessible by default</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>TypeScript support</span>
                </div>
            </div>
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Customizable colors</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Animation support</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Export functionality</span>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span>Real-time updates</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Coming Soon -->
    <div class="max-w-4xl">
        <div class="alert alert-info">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Coming Soon</h3>
                <p class="text-sm">
                    Chart components are currently in development. Stay tuned for powerful data visualization 
                    capabilities with seamless theme integration and extensive customization options.
                </p>
            </div>
        </div>
    </div>
</div>