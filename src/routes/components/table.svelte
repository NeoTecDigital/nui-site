<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronUp, ChevronDown, Edit, Trash2, Eye } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add table';

    const basicUsage = `<script>
  import { Table } from '@nui/core';
<\/script>

<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Job</th>
      <th>Company</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cy Ganderton</td>
      <td>Quality Control Specialist</td>
      <td>Littel, Schaden and Vandervort</td>
    </tr>
  </tbody>
</table>`;

    const variantsCode = `<!-- Basic Table -->
<table class="table">
  <thead>
    <tr><th>Name</th><th>Job</th></tr>
  </thead>
  <tbody>
    <tr><td>John Doe</td><td>Developer</td></tr>
  </tbody>
</table>

<!-- Zebra Striped -->
<table class="table table-zebra">
  <thead>
    <tr><th>Name</th><th>Job</th></tr>
  </thead>
  <tbody>
    <tr><td>John Doe</td><td>Developer</td></tr>
  </tbody>
</table>

<!-- Compact -->
<table class="table table-xs">
  <thead>
    <tr><th>Name</th><th>Job</th></tr>
  </thead>
  <tbody>
    <tr><td>John Doe</td><td>Developer</td></tr>
  </tbody>
</table>`;

    const sortingCode = `<script>
  let sortField = '';
  let sortDirection = 'asc';
  
  function sort(field) {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
    // Sort logic here
  }
<\/script>

<table class="table">
  <thead>
    <tr>
      <th>
        <button class="btn btn-ghost btn-xs" on:click={() => sort('name')}>
          Name
          {#if sortField === 'name'}
            {#if sortDirection === 'asc'}
              <ChevronUp class="w-4 h-4" />
            {:else}
              <ChevronDown class="w-4 h-4" />
            {/if}
          {/if}
        </button>
      </th>
    </tr>
  </thead>
</table>`;

    const selectionCode = `<script>
  let selectedItems = [];
  let selectAll = false;
  
  function toggleSelectAll() {
    if (selectAll) {
      selectedItems = data.map(item => item.id);
    } else {
      selectedItems = [];
    }
  }
<\/script>

<table class="table">
  <thead>
    <tr>
      <th>
        <label class="cursor-pointer">
          <input type="checkbox" class="checkbox" 
                 bind:checked={selectAll} 
                 on:change={toggleSelectAll} />
        </label>
      </th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {#each data as item}
      <tr class:active={selectedItems.includes(item.id)}>
        <th>
          <label class="cursor-pointer">
            <input type="checkbox" class="checkbox" 
                   bind:group={selectedItems} 
                   value={item.id} />
          </label>
        </th>
        <td>{item.name}</td>
        <td>{item.email}</td>
      </tr>
    {/each}
  </tbody>
</table>`;

    const actionsCode = `<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><div class="badge badge-success">Active</div></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-xs">
            <Eye class="w-4 h-4" />
          </button>
          <button class="btn btn-ghost btn-xs">
            <Edit class="w-4 h-4" />
          </button>
          <button class="btn btn-ghost btn-xs text-error">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</table>`;

    const responsiveCode = `<!-- Responsive table with horizontal scroll -->
<div class="overflow-x-auto">
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Company</th>
        <th>Location</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>+1 555-0123</td>
        <td>Acme Corp</td>
        <td>New York, NY</td>
        <td><div class="badge badge-success">Active</div></td>
      </tr>
    </tbody>
  </table>
</div>`;

    // Sample data for examples
    let users = [
        { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', company: 'Littel, Schaden and Vandervort', email: 'cy@example.com', status: 'Active' },
        { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', company: 'Zemlak, Daniel and Leannon', email: 'hart@example.com', status: 'Inactive' },
        { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', company: 'Carroll Group', email: 'brice@example.com', status: 'Active' },
        { id: 4, name: 'Marjy Ferencz', job: 'Office Assistant I', company: 'Rowe-Schoen', email: 'marjy@example.com', status: 'Pending' },
        { id: 5, name: 'Yancy Tear', job: 'Community Outreach Specialist', company: 'Wyman-Ledner', email: 'yancy@example.com', status: 'Active' }
    ];

    let sortedUsers = [...users];
    let sortField = '';
    let sortDirection = 'asc';
    let selectedItems = [];
    let selectAll = false;

    function sortUsers(field) {
        if (sortField === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDirection = 'asc';
        }
        
        sortedUsers = [...users].sort((a, b) => {
            const aVal = a[field].toLowerCase();
            const bVal = b[field].toLowerCase();
            
            if (sortDirection === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }

    function toggleSelectAll() {
        if (selectAll) {
            selectedItems = users.map(user => user.id);
        } else {
            selectedItems = [];
        }
    }

    $: selectAll = selectedItems.length === users.length;

    function handleEdit(user) {
        console.log('Edit user:', user);
    }

    function handleDelete(user) {
        console.log('Delete user:', user);
    }

    function handleView(user) {
        console.log('View user:', user);
    }

    const apiProps = [
        {
            name: 'table',
            type: "base class",
            default: "N/A",
            description: 'Base table styling with proper spacing and typography'
        },
        {
            name: 'table-zebra',
            type: "modifier class",
            default: "false",
            description: 'Adds alternating row background colors for better readability'
        },
        {
            name: 'table-xs',
            type: "modifier class",
            default: "false",
            description: 'Compact table with reduced padding and smaller text'
        },
        {
            name: 'table-sm',
            type: "modifier class", 
            default: "false",
            description: 'Small table with slightly reduced padding'
        },
        {
            name: 'table-md',
            type: "modifier class",
            default: "true",
            description: 'Default table size with standard padding'
        },
        {
            name: 'table-lg',
            type: "modifier class",
            default: "false",
            description: 'Large table with increased padding'
        },
        {
            name: 'table-pin-rows',
            type: "modifier class",
            default: "false",
            description: 'Makes table header sticky when scrolling'
        },
        {
            name: 'table-pin-cols',
            type: "modifier class",
            default: "false",
            description: 'Makes first column sticky when scrolling horizontally'
        }
    ];
</script>

<svelte:head>
    <title>Table - NUI Components</title>
    <meta name="description" content="Table component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Table</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Table</h1>
                <p class="text-xl text-base-content/70">
                    Flexible table component for displaying tabular data with sorting, selection, and actions.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/table"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-ghost btn-sm"
                >
                    <Github class="w-4 h-4 mr-2" />
                    Source
                </a>
            </div>
        </div>

        <!-- Installation -->
        <div class="alert mb-8">
            <div class="flex-1">
                <h3 class="font-semibold mb-2">Installation</h3>
                <CodeBlock code={installCommand} language="bash" copyable={true} />
            </div>
        </div>
    </div>

    <!-- Basic Usage -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Basic Usage" 
            description="Simple table with headers and data rows"
            code={basicUsage}
        >
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                        </tr>
                        <tr>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Zemlak, Daniel and Leannon</td>
                        </tr>
                        <tr>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Carroll Group</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Table Variants" 
            description="Different table styles including zebra stripes and compact sizing"
            code={variantsCode}
        >
            <div class="space-y-6">
                <!-- Basic Table -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Basic Table</h4>
                    <div class="overflow-x-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Developer</td>
                                    <td><div class="badge badge-success">Active</div></td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>Designer</td>
                                    <td><div class="badge badge-warning">Pending</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Zebra Striped -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Zebra Striped</h4>
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Developer</td>
                                    <td><div class="badge badge-success">Active</div></td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>Designer</td>
                                    <td><div class="badge badge-warning">Pending</div></td>
                                </tr>
                                <tr>
                                    <td>Bob Johnson</td>
                                    <td>Manager</td>
                                    <td><div class="badge badge-error">Inactive</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Compact -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Compact Table</h4>
                    <div class="overflow-x-auto">
                        <table class="table table-xs">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Developer</td>
                                    <td><div class="badge badge-xs badge-success">Active</div></td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>Designer</td>
                                    <td><div class="badge badge-xs badge-warning">Pending</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sorting -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sortable Table" 
            description="Table with clickable column headers for sorting functionality"
            code={sortingCode}
        >
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>
                                <button class="btn btn-ghost btn-xs flex items-center" on:click={() => sortUsers('name')}>
                                    Name
                                    {#if sortField === 'name'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4 ml-1" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4 ml-1" />
                                        {/if}
                                    {/if}
                                </button>
                            </th>
                            <th>
                                <button class="btn btn-ghost btn-xs flex items-center" on:click={() => sortUsers('job')}>
                                    Job
                                    {#if sortField === 'job'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4 ml-1" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4 ml-1" />
                                        {/if}
                                    {/if}
                                </button>
                            </th>
                            <th>
                                <button class="btn btn-ghost btn-xs flex items-center" on:click={() => sortUsers('company')}>
                                    Company
                                    {#if sortField === 'company'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4 ml-1" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4 ml-1" />
                                        {/if}
                                    {/if}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each sortedUsers.slice(0, 3) as user}
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.job}</td>
                                <td>{user.company}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Selection -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Selectable Table" 
            description="Table with checkboxes for row selection and bulk actions"
            code={selectionCode}
        >
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <label class="cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        class="checkbox" 
                                        bind:checked={selectAll} 
                                        on:change={toggleSelectAll} 
                                    />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users.slice(0, 4) as user}
                            <tr class:active={selectedItems.includes(user.id)}>
                                <th>
                                    <label class="cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            class="checkbox" 
                                            bind:group={selectedItems} 
                                            value={user.id} 
                                        />
                                    </label>
                                </th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div class="badge {user.status === 'Active' ? 'badge-success' : user.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                        {user.status}
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {#if selectedItems.length > 0}
                    <div class="mt-4 p-3 bg-base-200 rounded-lg">
                        <span class="text-sm">Selected {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'}</span>
                        <div class="flex gap-2 mt-2">
                            <button class="btn btn-sm btn-primary">Bulk Edit</button>
                            <button class="btn btn-sm btn-error">Bulk Delete</button>
                        </div>
                    </div>
                {/if}
            </div>
        </ComponentShowcase>
    </div>

    <!-- Actions -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Table with Actions" 
            description="Table with action buttons for each row (view, edit, delete)"
            code={actionsCode}
        >
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users.slice(0, 3) as user}
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.job}</td>
                                <td>
                                    <div class="badge {user.status === 'Active' ? 'badge-success' : user.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                        {user.status}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex gap-2">
                                        <button 
                                            class="btn btn-ghost btn-xs" 
                                            on:click={() => handleView(user)}
                                            title="View details"
                                        >
                                            <Eye class="w-4 h-4" />
                                        </button>
                                        <button 
                                            class="btn btn-ghost btn-xs" 
                                            on:click={() => handleEdit(user)}
                                            title="Edit user"
                                        >
                                            <Edit class="w-4 h-4" />
                                        </button>
                                        <button 
                                            class="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content" 
                                            on:click={() => handleDelete(user)}
                                            title="Delete user"
                                        >
                                            <Trash2 class="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Responsive -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Responsive Table" 
            description="Table with horizontal scroll for mobile devices and many columns"
            code={responsiveCode}
        >
            <div class="overflow-x-auto">
                <table class="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>john@example.com</td>
                            <td>+1 555-0123</td>
                            <td>Acme Corp</td>
                            <td>New York, NY</td>
                            <td><div class="badge badge-success">Active</div></td>
                            <td>2024-01-15</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>jane@example.com</td>
                            <td>+1 555-0124</td>
                            <td>Tech Solutions</td>
                            <td>San Francisco, CA</td>
                            <td><div class="badge badge-warning">Pending</div></td>
                            <td>2024-01-14</td>
                            <td>User</td>
                        </tr>
                        <tr>
                            <td>Bob Johnson</td>
                            <td>bob@example.com</td>
                            <td>+1 555-0125</td>
                            <td>Design Studio</td>
                            <td>Los Angeles, CA</td>
                            <td><div class="badge badge-error">Inactive</div></td>
                            <td>2024-01-10</td>
                            <td>Moderator</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- API Reference -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">API Reference</h2>
        
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each apiProps as prop}
                        <tr>
                            <td>
                                <code class="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                                    {prop.name}
                                </code>
                            </td>
                            <td>
                                <code class="text-sm text-base-content/70">
                                    {prop.type}
                                </code>
                            </td>
                            <td>
                                <code class="text-sm text-base-content/70">
                                    {prop.default}
                                </code>
                            </td>
                            <td class="text-sm">
                                {prop.description}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Accessibility -->
    <div class="max-w-4xl mb-12">
        <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
        <div class="prose prose-sm max-w-none">
            <ul class="space-y-2">
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and arrow keys</li>
                <li>✅ Includes proper ARIA attributes for table structure</li>
                <li>✅ Screen reader compatible with proper table headers</li>
                <li>✅ High contrast mode support</li>
                <li>✅ Focus management for interactive elements</li>
                <li>✅ Sortable columns announce sort direction to screen readers</li>
                <li>✅ Checkbox selection announces state changes</li>
                <li>✅ Responsive design maintains accessibility on mobile</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Data Dashboard -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Data Dashboard Table</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="card-title">User Management</h4>
                            <div class="flex gap-2">
                                <button class="btn btn-primary btn-sm">Add User</button>
                                <button class="btn btn-outline btn-sm">Export</button>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Last Active</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <div class="avatar placeholder">
                                                    <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                                                        <span class="text-xs">JD</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">John Doe</div>
                                                    <div class="text-sm opacity-50">john@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Administrator</td>
                                        <td>2 hours ago</td>
                                        <td><div class="badge badge-success">Online</div></td>
                                        <td>
                                            <div class="dropdown dropdown-end">
                                                <label tabindex="0" class="btn btn-ghost btn-xs">⋯</label>
                                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a>View Profile</a></li>
                                                    <li><a>Edit User</a></li>
                                                    <li><a class="text-error">Delete User</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <div class="avatar placeholder">
                                                    <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                                                        <span class="text-xs">JS</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">Jane Smith</div>
                                                    <div class="text-sm opacity-50">jane@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Editor</td>
                                        <td>1 day ago</td>
                                        <td><div class="badge badge-warning">Away</div></td>
                                        <td>
                                            <div class="dropdown dropdown-end">
                                                <label tabindex="0" class="btn btn-ghost btn-xs">⋯</label>
                                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a>View Profile</a></li>
                                                    <li><a>Edit User</a></li>
                                                    <li><a class="text-error">Delete User</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Shopping Cart -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Shopping Cart Table</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Your Cart</h4>
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12 bg-base-200"></div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">Premium Headphones</div>
                                                    <div class="text-sm opacity-50">Wireless Bluetooth</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex items-center gap-2">
                                                <button class="btn btn-ghost btn-xs">-</button>
                                                <span>2</span>
                                                <button class="btn btn-ghost btn-xs">+</button>
                                            </div>
                                        </td>
                                        <td>$199.99</td>
                                        <td class="font-bold">$399.98</td>
                                        <td>
                                            <button class="btn btn-ghost btn-xs text-error">
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12 bg-base-200"></div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">Mechanical Keyboard</div>
                                                    <div class="text-sm opacity-50">RGB Backlit</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex items-center gap-2">
                                                <button class="btn btn-ghost btn-xs">-</button>
                                                <span>1</span>
                                                <button class="btn btn-ghost btn-xs">+</button>
                                            </div>
                                        </td>
                                        <td>$149.99</td>
                                        <td class="font-bold">$149.99</td>
                                        <td>
                                            <button class="btn btn-ghost btn-xs text-error">
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="font-bold">
                                        <td colspan="3">Total</td>
                                        <td>$549.97</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-outline">Continue Shopping</button>
                            <button class="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>