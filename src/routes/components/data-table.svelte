<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronUp, ChevronDown, Search, Filter, Download, Eye, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Loader2 } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add data-table';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  
  let data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];
<\/script>

<div class="overflow-x-auto">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {#each data as item}
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>`;

    const sortableCode = `<script>
  let data = [...originalData];
  let sortField = '';
  let sortDirection = 'asc';
  
  function handleSort(field) {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
    
    data = [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (typeof aVal === 'string') {
        const result = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? result : -result;
      }
      
      const result = aVal - bVal;
      return sortDirection === 'asc' ? result : -result;
    });
  }
<\/script>

<table class="table">
  <thead>
    <tr>
      <th>
        <button class="btn btn-ghost btn-sm gap-2" on:click={() => handleSort('name')}>
          Name
          {#if sortField === 'name'}
            {#if sortDirection === 'asc'}
              <ChevronUp class="w-4 h-4" />
            {:else}
              <ChevronDown class="w-4 h-4" />
            {/if}
          {:else}
            <ArrowUpDown class="w-4 h-4 opacity-30" />
          {/if}
        </button>
      </th>
    </tr>
  </thead>
</table>`;

    const filteringCode = `<script>
  let searchTerm = '';
  let statusFilter = 'all';
  
  $: filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
<\/script>

<div class="flex gap-4 mb-4">
  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Search..." class="input input-bordered" bind:value={searchTerm} />
      <span class="btn btn-square">
        <Search class="w-4 h-4" />
      </span>
    </div>
  </div>
  
  <select class="select select-bordered" bind:value={statusFilter}>
    <option value="all">All Status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</div>`;

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
  
  function toggleItemSelection(id) {
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(itemId => itemId !== id);
    } else {
      selectedItems = [...selectedItems, id];
    }
    selectAll = selectedItems.length === data.length;
  }
  
  $: selectAll = selectedItems.length === data.length && data.length > 0;
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
      <tr class:bg-base-200={selectedItems.includes(item.id)}>
        <th>
          <label class="cursor-pointer">
            <input type="checkbox" class="checkbox" 
                   checked={selectedItems.includes(item.id)}
                   on:change={() => toggleItemSelection(item.id)} />
          </label>
        </th>
        <td>{item.name}</td>
        <td>{item.email}</td>
      </tr>
    {/each}
  </tbody>
</table>`;

    const paginationCode = `<script>
  let currentPage = 1;
  let itemsPerPage = 5;
  
  $: totalPages = Math.ceil(data.length / itemsPerPage);
  $: paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
<\/script>

<!-- Table content -->
<table class="table">
  <tbody>
    {#each paginatedData as item}
      <tr><!-- table rows --></tr>
    {/each}
  </tbody>
</table>

<!-- Pagination Controls -->
<div class="flex justify-between items-center mt-4">
  <div class="text-sm text-base-content/70">
    Showing {(currentPage - 1) * itemsPerPage + 1} to 
    {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
  </div>
  
  <div class="btn-group">
    <button class="btn btn-sm" disabled={currentPage === 1} on:click={() => goToPage(1)}>
      <ChevronsLeft class="w-4 h-4" />
    </button>
    <button class="btn btn-sm" disabled={currentPage === 1} on:click={() => goToPage(currentPage - 1)}>
      <ChevronLeft class="w-4 h-4" />
    </button>
    <button class="btn btn-sm btn-active">{currentPage}</button>
    <button class="btn btn-sm" disabled={currentPage === totalPages} on:click={() => goToPage(currentPage + 1)}>
      <ChevronRight class="w-4 h-4" />
    </button>
    <button class="btn btn-sm" disabled={currentPage === totalPages} on:click={() => goToPage(totalPages)}>
      <ChevronsRight class="w-4 h-4" />
    </button>
  </div>
</div>`;

    const exportCode = `<script>
  function exportToCSV() {
    const headers = ['Name', 'Email', 'Role', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => 
        [item.name, item.email, item.role, item.status].join(',')
      )
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  function exportSelected() {
    const selectedData = data.filter(item => selectedItems.includes(item.id));
    // Export selected items only
  }
<\/script>

<div class="flex gap-2 mb-4">
  <button class="btn btn-outline btn-sm gap-2" on:click={exportToCSV}>
    <Download class="w-4 h-4" />
    Export All
  </button>
  
  {#if selectedItems.length > 0}
    <button class="btn btn-outline btn-sm gap-2" on:click={exportSelected}>
      <Download class="w-4 h-4" />
      Export Selected ({selectedItems.length})
    </button>
  {/if}
</div>`;

    const loadingStateCode = `<script>
  let loading = false;
  let data = [];
  
  async function loadData() {
    loading = true;
    try {
      const response = await fetch('/api/data');
      data = await response.json();
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      loading = false;
    }
  }
<\/script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <div class="flex flex-col items-center gap-4">
      <Loader2 class="w-8 h-8 animate-spin" />
      <span class="text-base-content/70">Loading data...</span>
    </div>
  </div>
{:else if data.length === 0}
  <div class="flex justify-center items-center h-64">
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">No data available</h3>
      <p class="text-base-content/70 mb-4">There are no items to display.</p>
      <button class="btn btn-primary" on:click={loadData}>Refresh</button>
    </div>
  </div>
{:else}
  <!-- Normal table content -->
{/if}`;

    // Sample data for examples
    let sampleData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', department: 'Engineering' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', department: 'Design' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10', department: 'Marketing' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13', department: 'Sales' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', department: 'Engineering' },
        { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Pending', lastLogin: '2024-01-12', department: 'HR' },
        { id: 7, name: 'Edward Clark', email: 'edward@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-11', department: 'Content' },
        { id: 8, name: 'Fiona Davis', email: 'fiona@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-09', department: 'Finance' }
    ];

    // State management
    let data = [...sampleData];
    let filteredData = [...data];
    let sortField = '';
    let sortDirection = 'asc';
    let selectedItems = [];
    let selectAll = false;
    let searchTerm = '';
    let statusFilter = 'all';
    let currentPage = 1;
    let itemsPerPage = 5;
    let loading = false;

    // Computed values
    $: {
        // Apply filters
        filteredData = data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 item.department.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        // Apply sorting
        if (sortField) {
            filteredData.sort((a, b) => {
                const aVal = a[sortField];
                const bVal = b[sortField];
                
                if (typeof aVal === 'string') {
                    const result = aVal.localeCompare(bVal);
                    return sortDirection === 'asc' ? result : -result;
                }
                
                const result = aVal - bVal;
                return sortDirection === 'asc' ? result : -result;
            });
        }
        
        // Reset to first page when filters change
        currentPage = 1;
    }

    $: totalPages = Math.ceil(filteredData.length / itemsPerPage);
    $: paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );
    $: selectAll = selectedItems.length === paginatedData.length && paginatedData.length > 0;

    // Functions
    function handleSort(field) {
        if (sortField === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDirection = 'asc';
        }
    }

    function toggleSelectAll() {
        if (selectAll) {
            selectedItems = paginatedData.map(item => item.id);
        } else {
            selectedItems = [];
        }
    }

    function toggleItemSelection(id) {
        if (selectedItems.includes(id)) {
            selectedItems = selectedItems.filter(itemId => itemId !== id);
        } else {
            selectedItems = [...selectedItems, id];
        }
    }

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function exportToCSV() {
        const headers = ['Name', 'Email', 'Role', 'Status', 'Department'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(item => 
                [item.name, item.email, item.role, item.status, item.department].join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    function exportSelected() {
        const selectedData = data.filter(item => selectedItems.includes(item.id));
        const headers = ['Name', 'Email', 'Role', 'Status', 'Department'];
        const csvContent = [
            headers.join(','),
            ...selectedData.map(item => 
                [item.name, item.email, item.role, item.status, item.department].join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected-data-export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    function simulateLoading() {
        loading = true;
        setTimeout(() => {
            loading = false;
        }, 2000);
    }

    function handleEdit(item) {
        console.log('Edit:', item);
    }

    function handleDelete(item) {
        console.log('Delete:', item);
        data = data.filter(d => d.id !== item.id);
    }

    function handleView(item) {
        console.log('View:', item);
    }

    const apiProps = [
        {
            name: 'data',
            type: "Array<Object>",
            default: "[]",
            description: 'Array of data objects to display in the table'
        },
        {
            name: 'columns',
            type: "Array<Column>",
            default: "[]",
            description: 'Column configuration with header, field, sortable, filterable properties'
        },
        {
            name: 'sortable',
            type: "boolean",
            default: "true",
            description: 'Enable sorting functionality for columns'
        },
        {
            name: 'filterable',
            type: "boolean",
            default: "true",
            description: 'Enable filtering and search functionality'
        },
        {
            name: 'selectable',
            type: "boolean",
            default: "false",
            description: 'Enable row selection with checkboxes'
        },
        {
            name: 'pagination',
            type: "boolean | PaginationConfig",
            default: "false",
            description: 'Enable pagination or provide pagination configuration'
        },
        {
            name: 'loading',
            type: "boolean",
            default: "false",
            description: 'Show loading state when fetching data'
        },
        {
            name: 'exportable',
            type: "boolean",
            default: "false",
            description: 'Enable data export functionality (CSV, JSON)'
        },
        {
            name: 'searchPlaceholder',
            type: "string",
            default: "'Search...'",
            description: 'Placeholder text for the search input'
        },
        {
            name: 'emptyMessage',
            type: "string",
            default: "'No data available'",
            description: 'Message displayed when no data is available'
        },
        {
            name: 'itemsPerPage',
            type: "number",
            default: "10",
            description: 'Number of items to display per page when pagination is enabled'
        },
        {
            name: 'resizable',
            type: "boolean",
            default: "false",
            description: 'Enable column resizing functionality'
        }
    ];
</script>

<svelte:head>
    <title>Data Table - NUI Components</title>
    <meta name="description" content="Advanced data table component with sorting, filtering, pagination, and selection capabilities for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Data Table</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Data Table</h1>
                <p class="text-xl text-base-content/70">
                    Advanced data table component with sorting, filtering, pagination, selection, and export capabilities.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-warning">Beta</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/data-table"
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
            description="Simple data table with rows and columns"
            code={basicUsage}
        >
            <div class="overflow-x-auto w-full">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.slice(0, 3) as item}
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                        {item.role}
                                    </div>
                                </td>
                                <td>{item.department}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sortable Table -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sortable Columns" 
            description="Click column headers to sort data in ascending or descending order"
            code={sortableCode}
        >
            <div class="overflow-x-auto w-full">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <button class="btn btn-ghost btn-sm gap-2 justify-start" on:click={() => handleSort('name')}>
                                    Name
                                    {#if sortField === 'name'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4" />
                                        {/if}
                                    {:else}
                                        <ArrowUpDown class="w-4 h-4 opacity-30" />
                                    {/if}
                                </button>
                            </th>
                            <th>
                                <button class="btn btn-ghost btn-sm gap-2 justify-start" on:click={() => handleSort('role')}>
                                    Role
                                    {#if sortField === 'role'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4" />
                                        {/if}
                                    {:else}
                                        <ArrowUpDown class="w-4 h-4 opacity-30" />
                                    {/if}
                                </button>
                            </th>
                            <th>
                                <button class="btn btn-ghost btn-sm gap-2 justify-start" on:click={() => handleSort('department')}>
                                    Department
                                    {#if sortField === 'department'}
                                        {#if sortDirection === 'asc'}
                                            <ChevronUp class="w-4 h-4" />
                                        {:else}
                                            <ChevronDown class="w-4 h-4" />
                                        {/if}
                                    {:else}
                                        <ArrowUpDown class="w-4 h-4 opacity-30" />
                                    {/if}
                                </button>
                            </th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paginatedData.slice(0, 4) as item}
                            <tr>
                                <td class="font-medium">{item.name}</td>
                                <td>
                                    <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                        {item.role}
                                    </div>
                                </td>
                                <td>{item.department}</td>
                                <td>
                                    <div class="badge {item.status === 'Active' ? 'badge-success' : item.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                        {item.status}
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Filtering -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Filtering & Search" 
            description="Search across multiple fields and filter by specific criteria"
            code={filteringCode}
        >
            <div class="w-full">
                <!-- Filters -->
                <div class="flex gap-4 mb-4">
                    <div class="form-control">
                        <div class="input-group">
                            <input 
                                type="text" 
                                placeholder="Search users..." 
                                class="input input-bordered input-sm" 
                                bind:value={searchTerm} 
                            />
                            <span class="btn btn-square btn-sm">
                                <Search class="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                    
                    <select class="select select-bordered select-sm" bind:value={statusFilter}>
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <!-- Results info -->
                <div class="text-sm text-base-content/70 mb-3">
                    Showing {filteredData.length} of {data.length} entries
                    {#if searchTerm || statusFilter !== 'all'}
                        <button class="btn btn-ghost btn-xs ml-2" on:click={() => { searchTerm = ''; statusFilter = 'all'; }}>
                            Clear filters
                        </button>
                    {/if}
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each filteredData.slice(0, 4) as item}
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.department}</td>
                                    <td>
                                        <div class="badge {item.status === 'Active' ? 'badge-success' : item.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                            {item.status}
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Selection -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Row Selection" 
            description="Select individual rows or all rows with bulk action support"
            code={selectionCode}
        >
            <div class="w-full">
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <label class="cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            class="checkbox checkbox-sm" 
                                            bind:checked={selectAll} 
                                            on:change={toggleSelectAll} 
                                        />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each paginatedData.slice(0, 4) as item}
                                <tr class:bg-base-200={selectedItems.includes(item.id)}>
                                    <th>
                                        <label class="cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                class="checkbox checkbox-sm" 
                                                checked={selectedItems.includes(item.id)}
                                                on:change={() => toggleItemSelection(item.id)} 
                                            />
                                        </label>
                                    </th>
                                    <td class="font-medium">{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                            {item.role}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="badge {item.status === 'Active' ? 'badge-success' : item.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                            {item.status}
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                
                {#if selectedItems.length > 0}
                    <div class="mt-4 p-4 bg-base-200 rounded-lg border">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium">
                                {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'} selected
                            </span>
                            <div class="flex gap-2">
                                <button class="btn btn-sm btn-primary">
                                    <Edit class="w-4 h-4 mr-1" />
                                    Bulk Edit
                                </button>
                                <button class="btn btn-sm btn-error">
                                    <Trash2 class="w-4 h-4 mr-1" />
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </ComponentShowcase>
    </div>

    <!-- Pagination -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Pagination" 
            description="Navigate through large datasets with pagination controls"
            code={paginationCode}
        >
            <div class="w-full">
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each paginatedData as item}
                                <tr>
                                    <td class="font-medium">{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.department}</td>
                                    <td>{item.lastLogin}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination Controls -->
                <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-base-content/70">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to 
                        {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                    </div>
                    
                    <div class="btn-group">
                        <button 
                            class="btn btn-sm" 
                            disabled={currentPage === 1} 
                            on:click={() => goToPage(1)}
                            title="First page"
                        >
                            <ChevronsLeft class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm" 
                            disabled={currentPage === 1} 
                            on:click={() => goToPage(currentPage - 1)}
                            title="Previous page"
                        >
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        <button class="btn btn-sm btn-active">
                            {currentPage}
                        </button>
                        <button 
                            class="btn btn-sm" 
                            disabled={currentPage === totalPages} 
                            on:click={() => goToPage(currentPage + 1)}
                            title="Next page"
                        >
                            <ChevronRight class="w-4 h-4" />
                        </button>
                        <button 
                            class="btn btn-sm" 
                            disabled={currentPage === totalPages} 
                            on:click={() => goToPage(totalPages)}
                            title="Last page"
                        >
                            <ChevronsRight class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Data Export -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Data Export" 
            description="Export table data to CSV format, either all data or selected rows"
            code={exportCode}
        >
            <div class="w-full">
                <!-- Export Controls -->
                <div class="flex flex-wrap gap-2 mb-4">
                    <button class="btn btn-outline btn-sm gap-2" on:click={exportToCSV}>
                        <Download class="w-4 h-4" />
                        Export All ({filteredData.length} rows)
                    </button>
                    
                    {#if selectedItems.length > 0}
                        <button class="btn btn-outline btn-sm gap-2" on:click={exportSelected}>
                            <Download class="w-4 h-4" />
                            Export Selected ({selectedItems.length} rows)
                        </button>
                    {/if}
                    
                    <div class="divider divider-horizontal"></div>
                    
                    <button class="btn btn-ghost btn-sm gap-2" on:click={simulateLoading}>
                        <Loader2 class="w-4 h-4" />
                        Refresh Data
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <label class="cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            class="checkbox checkbox-sm" 
                                            bind:checked={selectAll} 
                                            on:change={toggleSelectAll} 
                                        />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.slice(0, 4) as item}
                                <tr class:bg-base-200={selectedItems.includes(item.id)}>
                                    <th>
                                        <label class="cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                class="checkbox checkbox-sm" 
                                                checked={selectedItems.includes(item.id)}
                                                on:change={() => toggleItemSelection(item.id)} 
                                            />
                                        </label>
                                    </th>
                                    <td class="font-medium">{item.name}</td>
                                    <td>
                                        <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                            {item.role}
                                        </div>
                                    </td>
                                    <td>{item.department}</td>
                                    <td>
                                        <div class="flex gap-1">
                                            <button 
                                                class="btn btn-ghost btn-xs" 
                                                on:click={() => handleView(item)}
                                                title="View details"
                                            >
                                                <Eye class="w-4 h-4" />
                                            </button>
                                            <button 
                                                class="btn btn-ghost btn-xs" 
                                                on:click={() => handleEdit(item)}
                                                title="Edit user"
                                            >
                                                <Edit class="w-4 h-4" />
                                            </button>
                                            <div class="dropdown dropdown-end">
                                                <label tabindex="0" class="btn btn-ghost btn-xs">
                                                    <MoreHorizontal class="w-4 h-4" />
                                                </label>
                                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><button on:click={() => handleView(item)}>View Profile</button></li>
                                                    <li><button on:click={() => handleEdit(item)}>Edit User</button></li>
                                                    <li><button class="text-error" on:click={() => handleDelete(item)}>Delete User</button></li>
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
        </ComponentShowcase>
    </div>

    <!-- Loading States -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Loading & Empty States" 
            description="Handle loading states and empty data scenarios gracefully"
            code={loadingStateCode}
        >
            <div class="w-full">
                <div class="tabs tabs-boxed mb-4">
                    <button class="tab tab-active" on:click={() => loading = false}>Normal</button>
                    <button class="tab" on:click={simulateLoading}>Loading</button>
                    <button class="tab" on:click={() => { data = []; loading = false; }}>Empty</button>
                    <button class="tab" on:click={() => { data = [...sampleData]; loading = false; }}>Reset</button>
                </div>

                {#if loading}
                    <div class="flex justify-center items-center h-64 bg-base-100 rounded-lg border">
                        <div class="flex flex-col items-center gap-4">
                            <Loader2 class="w-8 h-8 animate-spin text-primary" />
                            <span class="text-base-content/70">Loading data...</span>
                        </div>
                    </div>
                {:else if data.length === 0}
                    <div class="flex justify-center items-center h-64 bg-base-100 rounded-lg border">
                        <div class="text-center">
                            <h3 class="text-lg font-semibold mb-2">No data available</h3>
                            <p class="text-base-content/70 mb-4">There are no items to display at the moment.</p>
                            <button class="btn btn-primary" on:click={() => data = [...sampleData]}>
                                Load Sample Data
                            </button>
                        </div>
                    </div>
                {:else}
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each data.slice(0, 3) as item}
                                    <tr>
                                        <td class="font-medium">{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                                {item.role}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="badge {item.status === 'Active' ? 'badge-success' : item.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                                {item.status}
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                {/if}
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
                        <th>Prop</th>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd>, <kbd class="kbd kbd-sm">Space</kbd>, and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Proper ARIA attributes for table structure and interactive elements</li>
                <li>✅ Screen reader announcements for sort changes and selection states</li>
                <li>✅ High contrast mode support with proper focus indicators</li>
                <li>✅ Semantic HTML structure with proper table headers and captions</li>
                <li>✅ Keyboard-accessible dropdown menus and pagination controls</li>
                <li>✅ ARIA labels for action buttons and form controls</li>
                <li>✅ Responsive design maintains accessibility across devices</li>
                <li>✅ Loading states announced to screen readers</li>
                <li>✅ Empty state provides clear alternative actions</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- User Management Dashboard -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Management Dashboard</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="card-title">Team Members</h4>
                            <div class="flex gap-2">
                                <button class="btn btn-primary btn-sm">
                                    Add Member
                                </button>
                                <button class="btn btn-outline btn-sm gap-2" on:click={exportToCSV}>
                                    <Download class="w-4 h-4" />
                                    Export
                                </button>
                            </div>
                        </div>
                        
                        <!-- Search and filters -->
                        <div class="flex gap-4 mb-4">
                            <div class="form-control flex-1">
                                <div class="input-group">
                                    <input 
                                        type="text" 
                                        placeholder="Search members..." 
                                        class="input input-bordered input-sm" 
                                        bind:value={searchTerm} 
                                    />
                                    <span class="btn btn-square btn-sm">
                                        <Search class="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                            <select class="select select-bordered select-sm">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Design</option>
                                <option>Marketing</option>
                            </select>
                            <select class="select select-bordered select-sm" bind:value={statusFilter}>
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>
                                            <label class="cursor-pointer">
                                                <input type="checkbox" class="checkbox checkbox-sm" />
                                            </label>
                                        </th>
                                        <th>Member</th>
                                        <th>Role</th>
                                        <th>Department</th>
                                        <th>Last Active</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each filteredData.slice(0, 5) as item}
                                        <tr>
                                            <th>
                                                <label class="cursor-pointer">
                                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                                </label>
                                            </th>
                                            <td>
                                                <div class="flex items-center gap-3">
                                                    <div class="avatar placeholder">
                                                        <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                                                            <span class="text-xs">{item.name.split(' ').map(n => n[0]).join('')}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold">{item.name}</div>
                                                        <div class="text-sm opacity-50">{item.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="badge {item.role === 'Admin' ? 'badge-primary' : item.role === 'Editor' ? 'badge-secondary' : 'badge-outline'}">
                                                    {item.role}
                                                </div>
                                            </td>
                                            <td>{item.department}</td>
                                            <td>{item.lastLogin}</td>
                                            <td>
                                                <div class="badge {item.status === 'Active' ? 'badge-success' : item.status === 'Pending' ? 'badge-warning' : 'badge-error'}">
                                                    {item.status}
                                                </div>
                                            </td>
                                            <td>
                                                <div class="dropdown dropdown-end">
                                                    <label tabindex="0" class="btn btn-ghost btn-xs">
                                                        <MoreHorizontal class="w-4 h-4" />
                                                    </label>
                                                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li><button>View Profile</button></li>
                                                        <li><button>Edit Member</button></li>
                                                        <li><button>Change Role</button></li>
                                                        <li class="divider"></li>
                                                        <li><button class="text-error">Remove Member</button></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Pagination -->
                        <div class="flex justify-between items-center mt-4">
                            <div class="text-sm text-base-content/70">
                                Showing 1 to 5 of {filteredData.length} entries
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-sm">«</button>
                                <button class="btn btn-sm btn-active">1</button>
                                <button class="btn btn-sm">2</button>
                                <button class="btn btn-sm">3</button>
                                <button class="btn btn-sm">»</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analytics Data Table -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Analytics Data Table</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="card-title">Website Analytics</h4>
                            <div class="flex gap-2">
                                <select class="select select-bordered select-sm">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 90 days</option>
                                </select>
                                <button class="btn btn-outline btn-sm gap-2">
                                    <Download class="w-4 h-4" />
                                    Export Report
                                </button>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Page</th>
                                        <th class="text-right">Views</th>
                                        <th class="text-right">Unique Visitors</th>
                                        <th class="text-right">Bounce Rate</th>
                                        <th class="text-right">Avg. Time</th>
                                        <th>Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="font-medium">/dashboard</td>
                                        <td class="text-right font-mono">12,456</td>
                                        <td class="text-right font-mono">8,234</td>
                                        <td class="text-right">
                                            <span class="text-success">32.1%</span>
                                        </td>
                                        <td class="text-right font-mono">2:34</td>
                                        <td>
                                            <div class="badge badge-success">↗ +12%</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-medium">/components</td>
                                        <td class="text-right font-mono">9,123</td>
                                        <td class="text-right font-mono">6,789</td>
                                        <td class="text-right">
                                            <span class="text-warning">45.3%</span>
                                        </td>
                                        <td class="text-right font-mono">1:56</td>
                                        <td>
                                            <div class="badge badge-warning">↘ -3%</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-medium">/docs</td>
                                        <td class="text-right font-mono">7,891</td>
                                        <td class="text-right font-mono">5,432</td>
                                        <td class="text-right">
                                            <span class="text-success">28.7%</span>
                                        </td>
                                        <td class="text-right font-mono">3:12</td>
                                        <td>
                                            <div class="badge badge-success">↗ +8%</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>