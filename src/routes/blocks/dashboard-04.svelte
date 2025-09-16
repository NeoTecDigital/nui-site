<script lang="ts">
    import { 
        Settings, Users, Lock, Shield, Database, Server, Bell,
        Activity, HardDrive, Wifi, Globe, Mail, Key, UserCheck,
        AlertTriangle, CheckCircle, Clock, Eye, EyeOff, Edit,
        Save, X, Plus, Trash2, Search, Filter, MoreVertical,
        Monitor, Smartphone, Tablet, RefreshCw, Download, Upload
    } from 'lucide-svelte';
    
    // Settings state
    let activeTab = 'general';
    let showPassword = false;
    let notifications = {
        email: true,
        push: false,
        sms: true,
        security: true
    };
    
    // System stats
    const systemStats = [
        {
            title: 'Server Uptime',
            value: '99.9%',
            status: 'healthy',
            icon: Server,
            detail: '364 days, 23 hours'
        },
        {
            title: 'Storage Used',
            value: '67%',
            status: 'warning',
            icon: HardDrive,
            detail: '340 GB / 500 GB'
        },
        {
            title: 'Active Users',
            value: '1,234',
            status: 'healthy',
            icon: Users,
            detail: '+12% from last month'
        },
        {
            title: 'Security Score',
            value: '94/100',
            status: 'healthy',
            icon: Shield,
            detail: 'All checks passed'
        }
    ];
    
    // Recent activities
    const recentActivities = [
        {
            id: 1,
            action: 'User login',
            user: 'john@example.com',
            timestamp: '2 minutes ago',
            status: 'success',
            ip: '192.168.1.1'
        },
        {
            id: 2,
            action: 'Settings changed',
            user: 'admin@example.com',
            timestamp: '15 minutes ago',
            status: 'info',
            ip: '192.168.1.2'
        },
        {
            id: 3,
            action: 'Failed login attempt',
            user: 'unknown@suspicious.com',
            timestamp: '1 hour ago',
            status: 'error',
            ip: '203.0.113.1'
        },
        {
            id: 4,
            action: 'Database backup',
            user: 'system',
            timestamp: '3 hours ago',
            status: 'success',
            ip: 'localhost'
        },
        {
            id: 5,
            action: 'User registered',
            user: 'jane@example.com',
            timestamp: '5 hours ago',
            status: 'success',
            ip: '192.168.1.3'
        }
    ];
    
    // User management
    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'Active',
            lastLogin: '2024-01-15 14:32',
            created: '2023-06-15'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Editor',
            status: 'Active',
            lastLogin: '2024-01-15 09:15',
            created: '2023-08-22'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'User',
            status: 'Inactive',
            lastLogin: '2024-01-10 16:45',
            created: '2023-11-03'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            role: 'Editor',
            status: 'Active',
            lastLogin: '2024-01-15 11:20',
            created: '2023-12-18'
        }
    ];
    
    // Security settings
    let securitySettings = {
        twoFactorEnabled: true,
        passwordExpiry: 90,
        maxLoginAttempts: 5,
        sessionTimeout: 30,
        ipWhitelist: true,
        auditLogging: true
    };
    
    function getStatusColor(status: string) {
        const colors = {
            healthy: 'text-success',
            warning: 'text-warning',
            error: 'text-error',
            info: 'text-info'
        };
        return colors[status] || 'text-base-content';
    }
    
    function getStatusBadge(status: string) {
        const badges = {
            success: 'badge-success',
            info: 'badge-info',
            error: 'badge-error',
            warning: 'badge-warning'
        };
        return badges[status] || 'badge-neutral';
    }
    
    function getUserStatusBadge(status: string) {
        return status === 'Active' ? 'badge-success' : 'badge-error';
    }
    
    function getRoleBadge(role: string) {
        const badges = {
            'Admin': 'badge-error',
            'Editor': 'badge-warning',
            'User': 'badge-info'
        };
        return badges[role] || 'badge-neutral';
    }
    
    const tabs = [
        { id: 'general', name: 'General', icon: Settings },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'system', name: 'System', icon: Server },
        { id: 'activity', name: 'Activity', icon: Activity }
    ];
</script>

<svelte:head>
    <title>Settings Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-base-200">
    <!-- Header -->
    <div class="bg-base-100 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-6">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-base-content">Settings Dashboard</h1>
                        <p class="mt-1 text-sm text-base-content/70">
                            Manage system settings, users, and security configurations
                        </p>
                    </div>
                    <div class="mt-4 flex md:ml-4 md:mt-0 gap-2">
                        <button class="btn btn-outline btn-sm">
                            <Download class="w-4 h-4 mr-2" />
                            Export Config
                        </button>
                        <button class="btn btn-primary btn-sm">
                            <Save class="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- System Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {#each systemStats as stat}
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class={`p-3 rounded-lg bg-base-200 ${getStatusColor(stat.status)}`}>
                                    <svelte:component this={stat.icon} class="w-6 h-6" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-base-content/70">{stat.title}</p>
                                    <p class="text-2xl font-bold text-base-content">{stat.value}</p>
                                </div>
                            </div>
                            {#if stat.status === 'healthy'}
                                <CheckCircle class="w-5 h-5 text-success" />
                            {:else if stat.status === 'warning'}
                                <AlertTriangle class="w-5 h-5 text-warning" />
                            {:else if stat.status === 'error'}
                                <X class="w-5 h-5 text-error" />
                            {/if}
                        </div>
                        <p class="text-xs text-base-content/50 mt-2">{stat.detail}</p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Settings Navigation -->
            <div>
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body">
                        <h3 class="text-lg font-semibold mb-4">Settings</h3>
                        <ul class="menu menu-compact">
                            {#each tabs as tab}
                                <li>
                                    <button 
                                        class={`${activeTab === tab.id ? 'active' : ''}`}
                                        on:click={() => activeTab = tab.id}
                                    >
                                        <svelte:component this={tab.icon} class="w-4 h-4" />
                                        {tab.name}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Settings Content -->
            <div class="lg:col-span-3">
                <!-- General Settings -->
                {#if activeTab === 'general'}
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-6">General Settings</h3>
                            
                            <div class="space-y-6">
                                <!-- Site Configuration -->
                                <div>
                                    <h4 class="font-medium mb-4">Site Configuration</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Site Name</span>
                                            </label>
                                            <input type="text" class="input input-bordered" value="My Application" />
                                        </div>
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Site URL</span>
                                            </label>
                                            <input type="url" class="input input-bordered" value="https://example.com" />
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Notifications -->
                                <div>
                                    <h4 class="font-medium mb-4">Notifications</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <Mail class="w-4 h-4 text-base-content/70" />
                                                <span>Email Notifications</span>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={notifications.email} />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <Bell class="w-4 h-4 text-base-content/70" />
                                                <span>Push Notifications</span>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={notifications.push} />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <Smartphone class="w-4 h-4 text-base-content/70" />
                                                <span>SMS Notifications</span>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={notifications.sms} />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <Shield class="w-4 h-4 text-base-content/70" />
                                                <span>Security Alerts</span>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={notifications.security} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- User Management -->
                {#if activeTab === 'users'}
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h3 class="text-lg font-semibold">User Management</h3>
                                    <p class="text-sm text-base-content/70">Manage user accounts and permissions</p>
                                </div>
                                <button class="btn btn-primary btn-sm">
                                    <Plus class="w-4 h-4 mr-2" />
                                    Add User
                                </button>
                            </div>
                            
                            <div class="overflow-x-auto">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Last Login</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each users as user}
                                            <tr class="hover">
                                                <td>
                                                    <div class="flex items-center space-x-3">
                                                        <div class="avatar placeholder">
                                                            <div class="bg-neutral text-neutral-content rounded-full w-8">
                                                                <span class="text-xs">{user.name.charAt(0)}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="font-bold text-sm">{user.name}</div>
                                                            <div class="text-sm text-base-content/70">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class={`badge badge-sm ${getRoleBadge(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class={`badge badge-sm ${getUserStatusBadge(user.status)}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td class="text-sm">{user.lastLogin}</td>
                                                <td>
                                                    <div class="flex items-center space-x-2">
                                                        <button class="btn btn-ghost btn-xs">
                                                            <Edit class="w-3 h-3" />
                                                        </button>
                                                        <button class="btn btn-ghost btn-xs text-error">
                                                            <Trash2 class="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Security Settings -->
                {#if activeTab === 'security'}
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-6">Security Settings</h3>
                            
                            <div class="space-y-6">
                                <!-- Authentication -->
                                <div>
                                    <h4 class="font-medium mb-4">Authentication</h4>
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <span class="font-medium">Two-Factor Authentication</span>
                                                <p class="text-sm text-base-content/70">Require 2FA for all admin accounts</p>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={securitySettings.twoFactorEnabled} />
                                        </div>
                                        
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div class="form-control">
                                                <label class="label">
                                                    <span class="label-text">Password Expiry (days)</span>
                                                </label>
                                                <input type="number" class="input input-bordered" bind:value={securitySettings.passwordExpiry} />
                                            </div>
                                            <div class="form-control">
                                                <label class="label">
                                                    <span class="label-text">Max Login Attempts</span>
                                                </label>
                                                <input type="number" class="input input-bordered" bind:value={securitySettings.maxLoginAttempts} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Session Management -->
                                <div>
                                    <h4 class="font-medium mb-4">Session Management</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Session Timeout (minutes)</span>
                                            </label>
                                            <input type="number" class="input input-bordered" bind:value={securitySettings.sessionTimeout} />
                                        </div>
                                    </div>
                                </div>

                                <!-- Advanced Security -->
                                <div>
                                    <h4 class="font-medium mb-4">Advanced Security</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <span class="font-medium">IP Whitelist</span>
                                                <p class="text-sm text-base-content/70">Restrict access to allowed IP addresses</p>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={securitySettings.ipWhitelist} />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <span class="font-medium">Audit Logging</span>
                                                <p class="text-sm text-base-content/70">Log all administrative actions</p>
                                            </div>
                                            <input type="checkbox" class="toggle toggle-primary" bind:checked={securitySettings.auditLogging} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- System Settings -->
                {#if activeTab === 'system'}
                    <div class="space-y-6">
                        <div class="card bg-base-100 shadow-sm">
                            <div class="card-body">
                                <h3 class="text-lg font-semibold mb-6">System Information</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 class="font-medium mb-3">Server Details</h4>
                                        <div class="space-y-2 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">OS Version:</span>
                                                <span>Ubuntu 22.04 LTS</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Node.js:</span>
                                                <span>v18.19.0</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Database:</span>
                                                <span>PostgreSQL 15.1</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Memory:</span>
                                                <span>4.2GB / 8GB</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 class="font-medium mb-3">Application</h4>
                                        <div class="space-y-2 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Version:</span>
                                                <span>v2.1.4</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Environment:</span>
                                                <span class="badge badge-success badge-sm">Production</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Last Deploy:</span>
                                                <span>2024-01-15 14:30</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-base-content/70">Build:</span>
                                                <span>#1234</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex space-x-2 mt-6">
                                    <button class="btn btn-outline btn-sm">
                                        <RefreshCw class="w-4 h-4 mr-2" />
                                        Restart Server
                                    </button>
                                    <button class="btn btn-outline btn-sm">
                                        <Download class="w-4 h-4 mr-2" />
                                        Download Logs
                                    </button>
                                    <button class="btn btn-outline btn-sm">
                                        <Database class="w-4 h-4 mr-2" />
                                        Backup Database
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Activity Log -->
                {#if activeTab === 'activity'}
                    <div class="card bg-base-100 shadow-sm">
                        <div class="card-body">
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h3 class="text-lg font-semibold">Recent Activity</h3>
                                    <p class="text-sm text-base-content/70">System and user activity log</p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <select class="select select-sm select-bordered">
                                        <option>All Activities</option>
                                        <option>User Actions</option>
                                        <option>System Events</option>
                                        <option>Security Events</option>
                                    </select>
                                    <button class="btn btn-outline btn-sm">
                                        <RefreshCw class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                {#each recentActivities as activity}
                                    <div class="flex items-start space-x-4 p-4 bg-base-50 rounded-lg">
                                        <div class={`w-2 h-2 rounded-full mt-2 ${
                                            activity.status === 'success' ? 'bg-success' :
                                            activity.status === 'error' ? 'bg-error' :
                                            activity.status === 'warning' ? 'bg-warning' : 'bg-info'
                                        }`}></div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between">
                                                <p class="text-sm font-medium">{activity.action}</p>
                                                <span class={`badge badge-xs ${getStatusBadge(activity.status)}`}>
                                                    {activity.status}
                                                </span>
                                            </div>
                                            <div class="flex items-center space-x-2 text-xs text-base-content/70 mt-1">
                                                <span>{activity.user}</span>
                                                <span>•</span>
                                                <span>{activity.ip}</span>
                                                <span>•</span>
                                                <span>{activity.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                            
                            <div class="text-center mt-6">
                                <button class="btn btn-outline btn-sm">Load More Activities</button>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>