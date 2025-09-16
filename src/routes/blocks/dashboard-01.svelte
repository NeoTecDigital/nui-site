<script lang="ts">
    import {
        BarChart3,
        TrendingUp,
        TrendingDown,
        DollarSign,
        Users,
        ShoppingCart,
        Activity,
        Search,
        Bell,
        Settings,
        User,
        Home,
        FileText,
        Calendar,
        Mail,
        MoreHorizontal,
        ChevronDown,
        Filter,
        Download,
        Eye,
        Edit,
        Trash2,
        Menu,
        X
    } from 'lucide-svelte';
    
    // Mobile sidebar state
    let sidebarOpen = false;
    
    // Sample data for dashboard
    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign
        },
        {
            title: 'Active Users',
            value: '2,350',
            change: '+15.3%',
            trend: 'up',
            icon: Users
        },
        {
            title: 'Total Orders',
            value: '12,234',
            change: '-2.5%',
            trend: 'down',
            icon: ShoppingCart
        },
        {
            title: 'Conversion Rate',
            value: '3.24%',
            change: '+8.2%',
            trend: 'up',
            icon: Activity
        }
    ];
    
    const recentOrders = [
        {
            id: '#3210',
            customer: 'Liam Johnson',
            email: 'liam@example.com',
            type: 'Sale',
            status: 'Fulfilled',
            date: '2024-06-23',
            amount: '$250.00'
        },
        {
            id: '#3209',
            customer: 'Olivia Smith',
            email: 'olivia@example.com',
            type: 'Refund',
            status: 'Declined',
            date: '2024-06-23',
            amount: '-$150.00'
        },
        {
            id: '#3208',
            customer: 'Noah Williams',
            email: 'noah@example.com',
            type: 'Sale',
            status: 'Fulfilled',
            date: '2024-06-23',
            amount: '$350.00'
        },
        {
            id: '#3207',
            customer: 'Emma Brown',
            email: 'emma@example.com',
            type: 'Sale',
            status: 'Fulfilled',
            date: '2024-06-22',
            amount: '$450.00'
        },
        {
            id: '#3206',
            customer: 'Liam Johnson',
            email: 'liam@example.com',
            type: 'Sale',
            status: 'Fulfilled',
            date: '2024-06-22',
            amount: '$550.00'
        }
    ];
    
    const recentActivity = [
        {
            user: 'John Doe',
            action: 'Created new project',
            time: '2 hours ago'
        },
        {
            user: 'Sarah Wilson',
            action: 'Updated user profile',
            time: '4 hours ago'
        },
        {
            user: 'Mike Johnson',
            action: 'Completed task',
            time: '6 hours ago'
        },
        {
            user: 'Emma Davis',
            action: 'Uploaded new file',
            time: '8 hours ago'
        }
    ];
    
    // Chart data simulation
    const chartData = [
        { month: 'Jan', revenue: 4000, orders: 240 },
        { month: 'Feb', revenue: 3000, orders: 198 },
        { month: 'Mar', revenue: 2000, orders: 180 },
        { month: 'Apr', revenue: 2780, orders: 208 },
        { month: 'May', revenue: 1890, orders: 154 },
        { month: 'Jun', revenue: 2390, orders: 178 },
        { month: 'Jul', revenue: 3490, orders: 220 }
    ];
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
    
    function getStatusColor(status: string) {
        switch (status.toLowerCase()) {
            case 'fulfilled': return 'badge-success';
            case 'pending': return 'badge-warning';
            case 'declined': return 'badge-error';
            default: return 'badge-neutral';
        }
    }
</script>

<svelte:head>
    <title>Dashboard - NUI</title>
    <meta name="description" content="Complete dashboard with sidebar navigation, stats cards, charts, and data tables" />
</svelte:head>

<div class="min-h-screen bg-base-200 flex">
    <!-- Mobile Sidebar Overlay -->
    {#if sidebarOpen}
        <div class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" on:click={toggleSidebar}></div>
    {/if}
    
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-30 w-64 bg-base-100 border-r border-base-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}">
        <div class="flex items-center justify-between h-16 px-4 border-b border-base-300">
            <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <BarChart3 class="w-5 h-5 text-primary-content" />
                </div>
                <span class="ml-2 text-xl font-semibold">Dashboard</span>
            </div>
            <button class="lg:hidden btn btn-ghost btn-sm" on:click={toggleSidebar}>
                <X class="w-4 h-4" />
            </button>
        </div>
        
        <nav class="mt-5 px-2">
            <div class="space-y-1">
                <a href="#" class="bg-primary text-primary-content group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Home class="mr-3 h-5 w-5 flex-shrink-0" />
                    Dashboard
                </a>
                <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Users class="mr-3 h-5 w-5 flex-shrink-0" />
                    Team
                </a>
                <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <FileText class="mr-3 h-5 w-5 flex-shrink-0" />
                    Projects
                </a>
                <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Calendar class="mr-3 h-5 w-5 flex-shrink-0" />
                    Calendar
                </a>
                <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <ShoppingCart class="mr-3 h-5 w-5 flex-shrink-0" />
                    Orders
                </a>
                <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Mail class="mr-3 h-5 w-5 flex-shrink-0" />
                    Messages
                </a>
            </div>
            
            <div class="mt-8">
                <h3 class="px-3 text-xs font-semibold text-base-content/70 uppercase tracking-wider">
                    Account
                </h3>
                <div class="mt-1 space-y-1">
                    <a href="#" class="text-base-content hover:bg-base-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        <Settings class="mr-3 h-5 w-5 flex-shrink-0" />
                        Settings
                    </a>
                </div>
            </div>
        </nav>
        
        <div class="absolute bottom-0 w-full p-4">
            <div class="flex items-center">
                <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                        <User class="w-4 h-4" />
                    </div>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">Tom Cook</p>
                    <p class="text-xs text-base-content/70">tom@example.com</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="bg-base-100 border-b border-base-300">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <button class="lg:hidden btn btn-ghost btn-sm" on:click={toggleSidebar}>
                            <Menu class="w-5 h-5" />
                        </button>
                        <h1 class="ml-2 text-2xl font-semibold lg:ml-0">Dashboard</h1>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <!-- Search -->
                        <div class="relative hidden sm:block">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search class="h-4 w-4 text-base-content/70" />
                            </div>
                            <input
                                type="text"
                                class="input input-sm input-bordered pl-10 pr-4 w-64"
                                placeholder="Search..."
                            />
                        </div>
                        
                        <!-- Notifications -->
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary badge-sm">3</span>
                            <button class="btn btn-ghost btn-sm">
                                <Bell class="w-5 h-5" />
                            </button>
                        </div>
                        
                        <!-- User Menu -->
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-sm">
                                <div class="avatar">
                                    <div class="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                        <User class="w-4 h-4" />
                                    </div>
                                </div>
                                <ChevronDown class="w-4 h-4 ml-1" />
                            </label>
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Main Content Area -->
        <main class="flex-1 overflow-auto">
            <div class="p-6">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {#each stats as stat}
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body p-6">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-medium text-base-content/70">{stat.title}</p>
                                        <p class="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <svelte:component this={stat.icon} class="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    {#if stat.trend === 'up'}
                                        <TrendingUp class="w-4 h-4 text-success mr-1" />
                                        <span class="text-success text-sm font-medium">{stat.change}</span>
                                    {:else}
                                        <TrendingDown class="w-4 h-4 text-error mr-1" />
                                        <span class="text-error text-sm font-medium">{stat.change}</span>
                                    {/if}
                                    <span class="text-base-content/70 text-sm ml-1">from last month</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
                
                <!-- Charts and Tables Row -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Revenue Chart -->
                    <div class="lg:col-span-2">
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <div class="flex items-center justify-between mb-6">
                                    <h3 class="text-lg font-semibold">Revenue Overview</h3>
                                    <div class="flex items-center space-x-2">
                                        <button class="btn btn-ghost btn-sm">
                                            <Filter class="w-4 h-4 mr-2" />
                                            Filter
                                        </button>
                                        <button class="btn btn-ghost btn-sm">
                                            <Download class="w-4 h-4 mr-2" />
                                            Export
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Simulated Chart Area -->
                                <div class="h-80 bg-base-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <div class="w-full h-full relative">
                                        <!-- Chart Bars Simulation -->
                                        <div class="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-4">
                                            {#each chartData as data, i}
                                                <div class="flex flex-col items-center space-y-2">
                                                    <div class="bg-primary rounded-t-sm transition-all duration-300" 
                                                         style="height: {(data.revenue / 5000) * 200}px; width: 24px;"></div>
                                                    <span class="text-xs text-base-content/70">{data.month}</span>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between mt-4 text-sm">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 bg-primary rounded-full mr-2"></div>
                                            <span>Revenue</span>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                                            <span>Orders</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recent Activity -->
                    <div>
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
                                <div class="space-y-4">
                                    {#each recentActivity as activity}
                                        <div class="flex items-start space-x-3">
                                            <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <User class="w-4 h-4 text-primary" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-base-content">{activity.user}</p>
                                                <p class="text-sm text-base-content/70">{activity.action}</p>
                                                <p class="text-xs text-base-content/50">{activity.time}</p>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Orders Table -->
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold">Recent Orders</h3>
                            <button class="btn btn-primary btn-sm">View All</button>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Customer</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each recentOrders as order}
                                        <tr>
                                            <td>
                                                <div class="font-medium">{order.id}</div>
                                            </td>
                                            <td>
                                                <div class="flex flex-col">
                                                    <div class="font-medium">{order.customer}</div>
                                                    <div class="text-sm opacity-70">{order.email}</div>
                                                </div>
                                            </td>
                                            <td>{order.type}</td>
                                            <td>
                                                <div class="badge {getStatusColor(order.status)}">{order.status}</div>
                                            </td>
                                            <td>{order.date}</td>
                                            <td class="font-mono {order.amount.startsWith('-') ? 'text-error' : 'text-success'}">{order.amount}</td>
                                            <td>
                                                <div class="flex justify-end space-x-2">
                                                    <button class="btn btn-ghost btn-xs">
                                                        <Eye class="w-3 h-3" />
                                                    </button>
                                                    <button class="btn btn-ghost btn-xs">
                                                        <Edit class="w-3 h-3" />
                                                    </button>
                                                    <div class="dropdown dropdown-end">
                                                        <label tabindex="0" class="btn btn-ghost btn-xs">
                                                            <MoreHorizontal class="w-3 h-3" />
                                                        </label>
                                                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <li><a href="#">Edit</a></li>
                                                            <li><a href="#">Duplicate</a></li>
                                                            <li><a href="#" class="text-error">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<style>
    /* Ensure proper scrolling on mobile */
    @media (max-width: 1024px) {
        .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh;
        }
    }
</style>