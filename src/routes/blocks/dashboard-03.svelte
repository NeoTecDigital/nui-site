<script lang="ts">
    import { 
        ShoppingCart, DollarSign, Package, TrendingUp, TrendingDown,
        Users, CreditCard, Truck, AlertTriangle, CheckCircle,
        Clock, Star, MoreHorizontal, Search, Filter, Download,
        ArrowUpRight, ArrowDownRight, Eye, Edit, Trash2
    } from 'lucide-svelte';
    
    // Sample e-commerce data
    let selectedPeriod = '30d';
    let orderFilter = 'all';
    
    const salesMetrics = [
        {
            title: 'Total Revenue',
            value: '$124,563',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-success'
        },
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'text-primary'
        },
        {
            title: 'Total Customers',
            value: '892',
            change: '+15.3%',
            trend: 'up',
            icon: Users,
            color: 'text-info'
        },
        {
            title: 'Avg. Order Value',
            value: '$101.23',
            change: '-2.4%',
            trend: 'down',
            icon: CreditCard,
            color: 'text-warning'
        }
    ];
    
    const recentOrders = [
        {
            id: '#12345',
            customer: 'John Doe',
            email: 'john@example.com',
            amount: '$89.99',
            status: 'completed',
            date: '2024-01-15',
            items: 3
        },
        {
            id: '#12346',
            customer: 'Jane Smith',
            email: 'jane@example.com',
            amount: '$156.50',
            status: 'processing',
            date: '2024-01-15',
            items: 2
        },
        {
            id: '#12347',
            customer: 'Mike Johnson',
            email: 'mike@example.com',
            amount: '$234.75',
            status: 'shipped',
            date: '2024-01-14',
            items: 5
        },
        {
            id: '#12348',
            customer: 'Sarah Wilson',
            email: 'sarah@example.com',
            amount: '$67.25',
            status: 'pending',
            date: '2024-01-14',
            items: 1
        },
        {
            id: '#12349',
            customer: 'David Brown',
            email: 'david@example.com',
            amount: '$198.99',
            status: 'completed',
            date: '2024-01-13',
            items: 4
        }
    ];
    
    const topProducts = [
        {
            name: 'Wireless Headphones',
            sku: 'WH-001',
            sales: 145,
            revenue: '$14,500',
            stock: 23,
            rating: 4.8
        },
        {
            name: 'Smart Watch Pro',
            sku: 'SW-002',
            sales: 98,
            revenue: '$24,500',
            stock: 45,
            rating: 4.6
        },
        {
            name: 'Bluetooth Speaker',
            sku: 'BS-003',
            sales: 87,
            revenue: '$8,700',
            stock: 12,
            rating: 4.4
        },
        {
            name: 'Phone Case Premium',
            sku: 'PC-004',
            sales: 156,
            revenue: '$4,680',
            stock: 89,
            rating: 4.9
        },
        {
            name: 'USB-C Cable',
            sku: 'UC-005',
            sales: 234,
            revenue: '$2,340',
            stock: 156,
            rating: 4.2
        }
    ];
    
    const salesData = {
        thisMonth: [1200, 1900, 3000, 5000, 4200, 3800, 4500, 6200, 5800, 7100, 6900, 8200, 7800, 9100],
        lastMonth: [1000, 1500, 2500, 4200, 3800, 3200, 3900, 5500, 5100, 6300, 6100, 7200, 6900, 8000],
        labels: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27']
    };
    
    function getStatusBadge(status: string) {
        const badges = {
            completed: 'badge-success',
            processing: 'badge-warning',
            shipped: 'badge-info',
            pending: 'badge-error',
            cancelled: 'badge-neutral'
        };
        return badges[status] || 'badge-neutral';
    }
    
    function getStockStatus(stock: number) {
        if (stock < 20) return 'text-error';
        if (stock < 50) return 'text-warning';
        return 'text-success';
    }
    
    function getBarHeight(value: number, max: number): number {
        return (value / max) * 100;
    }
    
    const maxSales = Math.max(...salesData.thisMonth);
</script>

<svelte:head>
    <title>E-commerce Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-base-200">
    <!-- Header -->
    <div class="bg-base-100 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-6">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-base-content">E-commerce Dashboard</h1>
                        <p class="mt-1 text-sm text-base-content/70">
                            Monitor your store performance and manage orders
                        </p>
                    </div>
                    <div class="mt-4 flex md:ml-4 md:mt-0 gap-2">
                        <button class="btn btn-outline btn-sm">
                            <Download class="w-4 h-4 mr-2" />
                            Export Report
                        </button>
                        <button class="btn btn-primary btn-sm">
                            <Package class="w-4 h-4 mr-2" />
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Sales Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {#each salesMetrics as metric}
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class={`p-3 rounded-lg bg-base-200 ${metric.color}`}>
                                    <svelte:component this={metric.icon} class="w-6 h-6" />
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
            <!-- Sales Chart -->
            <div class="lg:col-span-2">
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-lg font-semibold">Sales Overview</h3>
                                <p class="text-sm text-base-content/70">Daily sales comparison</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="badge badge-primary badge-sm">This Month</div>
                                <div class="badge badge-outline badge-sm">Last Month</div>
                            </div>
                        </div>
                        
                        <!-- Chart -->
                        <div class="h-64 flex items-end justify-between space-x-1">
                            {#each salesData.thisMonth as value, i}
                                <div class="flex-1 flex flex-col items-center">
                                    <div class="w-full flex justify-center space-x-1">
                                        <!-- This Month Bar -->
                                        <div 
                                            class="w-2 bg-primary rounded-t transition-all duration-300"
                                            style="height: {getBarHeight(value, maxSales)}%;"
                                        ></div>
                                        <!-- Last Month Bar -->
                                        <div 
                                            class="w-2 bg-primary/30 rounded-t transition-all duration-300"
                                            style="height: {getBarHeight(salesData.lastMonth[i], maxSales)}%;"
                                        ></div>
                                    </div>
                                    <span class="text-xs text-base-content/70 mt-2">{salesData.labels[i]}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div>
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <h3 class="text-lg font-semibold mb-6">Quick Actions</h3>
                        <div class="space-y-3">
                            <button class="btn btn-outline btn-sm w-full justify-start">
                                <Package class="w-4 h-4 mr-2" />
                                Add New Product
                            </button>
                            <button class="btn btn-outline btn-sm w-full justify-start">
                                <ShoppingCart class="w-4 h-4 mr-2" />
                                Process Orders
                            </button>
                            <button class="btn btn-outline btn-sm w-full justify-start">
                                <Truck class="w-4 h-4 mr-2" />
                                Manage Shipping
                            </button>
                            <button class="btn btn-outline btn-sm w-full justify-start">
                                <Users class="w-4 h-4 mr-2" />
                                View Customers
                            </button>
                        </div>
                        
                        <!-- Inventory Alerts -->
                        <div class="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                            <div class="flex items-start space-x-3">
                                <AlertTriangle class="w-5 h-5 text-warning mt-0.5" />
                                <div class="flex-1">
                                    <h4 class="font-semibold text-warning">Low Stock Alert</h4>
                                    <p class="text-sm text-base-content/70 mt-1">
                                        3 products are running low on inventory
                                    </p>
                                    <button class="btn btn-warning btn-xs mt-2">View Items</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
            <!-- Recent Orders -->
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-lg font-semibold">Recent Orders</h3>
                            <p class="text-sm text-base-content/70">Latest customer orders</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <select class="select select-sm select-bordered" bind:value={orderFilter}>
                                <option value="all">All Orders</option>
                                <option value="completed">Completed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="table table-xs">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each recentOrders as order}
                                    <tr class="hover">
                                        <td>
                                            <div>
                                                <div class="font-mono text-sm font-semibold">{order.id}</div>
                                                <div class="text-xs text-base-content/70">{order.items} items</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div class="font-medium text-sm">{order.customer}</div>
                                                <div class="text-xs text-base-content/70">{order.email}</div>
                                            </div>
                                        </td>
                                        <td class="font-semibold">{order.amount}</td>
                                        <td>
                                            <span class={`badge badge-xs ${getStatusBadge(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td class="text-xs">{order.date}</td>
                                        <td>
                                            <div class="dropdown dropdown-end">
                                                <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                                                    <MoreHorizontal class="w-3 h-3" />
                                                </div>
                                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                                    <li><a href="#/" class="text-xs"><Eye class="w-3 h-3 mr-1" />View</a></li>
                                                    <li><a href="#/" class="text-xs"><Edit class="w-3 h-3 mr-1" />Edit</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Top Products -->
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-lg font-semibold">Top Products</h3>
                            <p class="text-sm text-base-content/70">Best selling products</p>
                        </div>
                        <button class="btn btn-outline btn-sm">View All</button>
                    </div>
                    
                    <div class="space-y-4">
                        {#each topProducts as product, i}
                            <div class="flex items-center justify-between p-3 bg-base-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-sm">{product.name}</h4>
                                        <div class="flex items-center space-x-2 text-xs text-base-content/70">
                                            <span>SKU: {product.sku}</span>
                                            <div class="flex items-center space-x-1">
                                                <Star class="w-3 h-3 text-warning fill-current" />
                                                <span>{product.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="font-semibold text-sm">{product.revenue}</div>
                                    <div class="text-xs text-base-content/70">{product.sales} sold</div>
                                    <div class={`text-xs ${getStockStatus(product.stock)}`}>
                                        {product.stock} in stock
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Row -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <CheckCircle class="w-8 h-8 mx-auto text-success mb-2" />
                    <h4 class="font-semibold">Order Success Rate</h4>
                    <p class="text-2xl font-bold text-success">96.8%</p>
                    <p class="text-sm text-base-content/70">+2.1% from last month</p>
                </div>
            </div>
            
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <Truck class="w-8 h-8 mx-auto text-info mb-2" />
                    <h4 class="font-semibold">Avg. Delivery Time</h4>
                    <p class="text-2xl font-bold text-info">2.3 days</p>
                    <p class="text-sm text-base-content/70">-0.5 days improved</p>
                </div>
            </div>
            
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <Star class="w-8 h-8 mx-auto text-warning mb-2" />
                    <h4 class="font-semibold">Customer Rating</h4>
                    <p class="text-2xl font-bold text-warning">4.7/5</p>
                    <p class="text-sm text-base-content/70">Based on 1,234 reviews</p>
                </div>
            </div>
            
            <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                    <Clock class="w-8 h-8 mx-auto text-primary mb-2" />
                    <h4 class="font-semibold">Response Time</h4>
                    <p class="text-2xl font-bold text-primary">1.2h</p>
                    <p class="text-sm text-base-content/70">Average support response</p>
                </div>
            </div>
        </div>
    </div>
</div>