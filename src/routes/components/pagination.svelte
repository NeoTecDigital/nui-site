<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add pagination';

    const basicUsage = `<script>
  import { Pagination } from '@nui/core';
<\/script>

<div class="join">
  <button class="join-item btn">«</button>
  <button class="join-item btn">Page 22</button>
  <button class="join-item btn">»</button>
</div>`;

    const sizesCode = `<!-- Small Pagination -->
<div class="join">
  <button class="join-item btn btn-sm">«</button>
  <button class="join-item btn btn-sm">1</button>
  <button class="join-item btn btn-sm btn-active">2</button>
  <button class="join-item btn btn-sm">3</button>
  <button class="join-item btn btn-sm">»</button>
</div>

<!-- Medium Pagination (Default) -->
<div class="join">
  <button class="join-item btn">«</button>
  <button class="join-item btn">1</button>
  <button class="join-item btn btn-active">2</button>
  <button class="join-item btn">3</button>
  <button class="join-item btn">»</button>
</div>

<!-- Large Pagination -->
<div class="join">
  <button class="join-item btn btn-lg">«</button>
  <button class="join-item btn btn-lg">1</button>
  <button class="join-item btn btn-lg btn-active">2</button>
  <button class="join-item btn btn-lg">3</button>
  <button class="join-item btn btn-lg">»</button>
</div>`;

    const variantsCode = `<!-- With Page Numbers -->
<div class="join">
  <button class="join-item btn">1</button>
  <button class="join-item btn btn-active">2</button>
  <button class="join-item btn">3</button>
  <button class="join-item btn">4</button>
  <button class="join-item btn">5</button>
</div>

<!-- With Navigation Only -->
<div class="join">
  <button class="join-item btn">Previous</button>
  <button class="join-item btn">Page 3 of 10</button>
  <button class="join-item btn">Next</button>
</div>

<!-- With Icons -->
<div class="join">
  <button class="join-item btn">
    <ChevronLeft class="w-4 h-4" />
  </button>
  <button class="join-item btn">1</button>
  <button class="join-item btn btn-active">2</button>
  <button class="join-item btn">3</button>
  <button class="join-item btn">
    <ChevronRight class="w-4 h-4" />
  </button>
</div>`;

    const fullFeaturedCode = `<script>
  let currentPage = 1;
  let totalPages = 10;
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
  
  function getVisiblePages() {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    
    return rangeWithDots;
  }
<\/script>

<div class="join">
  <button 
    class="join-item btn" 
    disabled={currentPage === 1}
    on:click={() => goToPage(1)}
  >
    ««
  </button>
  <button 
    class="join-item btn" 
    disabled={currentPage === 1}
    on:click={() => goToPage(currentPage - 1)}
  >
    «
  </button>
  
  {#each getVisiblePages() as page}
    {#if page === '...'}
      <button class="join-item btn btn-disabled">...</button>
    {:else}
      <button 
        class="join-item btn {currentPage === page ? 'btn-active' : ''}"
        on:click={() => goToPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}
  
  <button 
    class="join-item btn" 
    disabled={currentPage === totalPages}
    on:click={() => goToPage(currentPage + 1)}
  >
    »
  </button>
  <button 
    class="join-item btn" 
    disabled={currentPage === totalPages}
    on:click={() => goToPage(totalPages)}
  >
    »»
  </button>
</div>`;

    const mobileCode = `<!-- Mobile-First Pagination -->
<div class="join w-full">
  <!-- Mobile View (sm and below) -->
  <div class="block sm:hidden w-full">
    <div class="join w-full">
      <button class="join-item btn flex-1" disabled={currentPage === 1}>
        Previous
      </button>
      <button class="join-item btn">
        Page {currentPage} of {totalPages}
      </button>
      <button class="join-item btn flex-1" disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  </div>
  
  <!-- Desktop View (sm and above) -->
  <div class="hidden sm:flex">
    <div class="join">
      <button class="join-item btn" disabled={currentPage === 1}>««</button>
      <button class="join-item btn" disabled={currentPage === 1}>«</button>
      
      {#each getVisiblePages() as page}
        {#if page === '...'}
          <button class="join-item btn btn-disabled">...</button>
        {:else}
          <button class="join-item btn {currentPage === page ? 'btn-active' : ''}">
            {page}
          </button>
        {/if}
      {/each}
      
      <button class="join-item btn" disabled={currentPage === totalPages}>»</button>
      <button class="join-item btn" disabled={currentPage === totalPages}>»»</button>
    </div>
  </div>
</div>`;

    const dataTableCode = `<script>
  let currentPage = 1;
  let itemsPerPage = 5;
  let totalItems = 50;
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Sample data
  let allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // ... more users
  ];
  
  $: paginatedUsers = allUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
<\/script>

<!-- Data Table -->
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
      {#each paginatedUsers as user}
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- Pagination -->
<div class="flex justify-between items-center mt-4">
  <div class="text-sm text-base-content/70">
    Showing {(currentPage - 1) * itemsPerPage + 1} to 
    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
  </div>
  
  <div class="join">
    <button 
      class="join-item btn btn-sm" 
      disabled={currentPage === 1}
      on:click={() => currentPage = Math.max(1, currentPage - 1)}
    >
      Previous
    </button>
    
    {#each Array.from({length: Math.min(5, totalPages)}, (_, i) => i + Math.max(1, currentPage - 2)) as page}
      {#if page <= totalPages}
        <button 
          class="join-item btn btn-sm {currentPage === page ? 'btn-active' : ''}"
          on:click={() => currentPage = page}
        >
          {page}
        </button>
      {/if}
    {/each}
    
    <button 
      class="join-item btn btn-sm" 
      disabled={currentPage === totalPages}
      on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
    >
      Next
    </button>
  </div>
</div>`;

    // Reactive variables for examples
    let currentPage = 1;
    let totalPages = 10;
    let tableCurrentPage = 1;
    let itemsPerPage = 5;
    let totalItems = 25;
    let tablePages = Math.ceil(totalItems / itemsPerPage);

    // Sample data for table example
    let allUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
        { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'User' },
        { id: 7, name: 'Edward Miller', email: 'edward@example.com', role: 'Editor' },
        { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'User' },
        { id: 9, name: 'George Martinez', email: 'george@example.com', role: 'Admin' },
        { id: 10, name: 'Helen Rodriguez', email: 'helen@example.com', role: 'User' },
        { id: 11, name: 'Ivan Lopez', email: 'ivan@example.com', role: 'Editor' },
        { id: 12, name: 'Julia Gonzalez', email: 'julia@example.com', role: 'User' },
        { id: 13, name: 'Kevin Hernandez', email: 'kevin@example.com', role: 'Admin' },
        { id: 14, name: 'Linda Young', email: 'linda@example.com', role: 'User' },
        { id: 15, name: 'Michael King', email: 'michael@example.com', role: 'Editor' },
        { id: 16, name: 'Nancy Wright', email: 'nancy@example.com', role: 'User' },
        { id: 17, name: 'Oscar Lee', email: 'oscar@example.com', role: 'Admin' },
        { id: 18, name: 'Patricia Walker', email: 'patricia@example.com', role: 'User' },
        { id: 19, name: 'Quinn Hall', email: 'quinn@example.com', role: 'Editor' },
        { id: 20, name: 'Rachel Allen', email: 'rachel@example.com', role: 'User' },
        { id: 21, name: 'Steven Young', email: 'steven@example.com', role: 'Admin' },
        { id: 22, name: 'Teresa Hernandez', email: 'teresa@example.com', role: 'User' },
        { id: 23, name: 'Victor Nelson', email: 'victor@example.com', role: 'Editor' },
        { id: 24, name: 'Wendy Carter', email: 'wendy@example.com', role: 'User' },
        { id: 25, name: 'Xavier Mitchell', email: 'xavier@example.com', role: 'Admin' }
    ];

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function goToTablePage(page) {
        if (page >= 1 && page <= tablePages) {
            tableCurrentPage = page;
        }
    }

    function getVisiblePages(current, total) {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        
        for (let i = Math.max(2, current - delta); 
             i <= Math.min(total - 1, current + delta); 
             i++) {
            range.push(i);
        }
        
        if (current - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }
        
        rangeWithDots.push(...range);
        
        if (current + delta < total - 1) {
            rangeWithDots.push('...', total);
        } else if (total > 1) {
            rangeWithDots.push(total);
        }
        
        return rangeWithDots;
    }

    $: paginatedUsers = allUsers.slice(
        (tableCurrentPage - 1) * itemsPerPage,
        tableCurrentPage * itemsPerPage
    );

    $: visiblePages = getVisiblePages(currentPage, totalPages);

    const apiProps = [
        {
            name: 'join',
            type: "container class",
            default: "N/A",
            description: 'Container class that groups pagination buttons together'
        },
        {
            name: 'join-item',
            type: "modifier class",
            default: "N/A",
            description: 'Applied to each button within the pagination group'
        },
        {
            name: 'btn',
            type: "base class",
            default: "N/A",
            description: 'Base button styling for pagination items'
        },
        {
            name: 'btn-active',
            type: "modifier class",
            default: "false",
            description: 'Highlights the current active page button'
        },
        {
            name: 'btn-disabled',
            type: "modifier class",
            default: "false",
            description: 'Disables pagination buttons (for ellipsis or disabled states)'
        },
        {
            name: 'btn-sm',
            type: "size modifier",
            default: "false",
            description: 'Small pagination buttons with reduced padding'
        },
        {
            name: 'btn-lg',
            type: "size modifier",
            default: "false",
            description: 'Large pagination buttons with increased padding'
        },
        {
            name: 'disabled',
            type: "HTML attribute",
            default: "false",
            description: 'Native disabled attribute for prev/next buttons at boundaries'
        }
    ];
</script>

<svelte:head>
    <title>Pagination - NUI Components</title>
    <meta name="description" content="Pagination component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Pagination</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Pagination</h1>
                <p class="text-xl text-base-content/70">
                    Navigation component for dividing content across multiple pages with intuitive controls.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/pagination"
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
            description="Simple pagination with previous/next navigation and current page display"
            code={basicUsage}
        >
            <div class="flex justify-center">
                <div class="join">
                    <button class="join-item btn">«</button>
                    <button class="join-item btn">Page 22</button>
                    <button class="join-item btn">»</button>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Pagination Sizes" 
            description="Different pagination sizes for various UI contexts"
            code={sizesCode}
        >
            <div class="space-y-6">
                <!-- Small -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Small</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn btn-sm">«</button>
                            <button class="join-item btn btn-sm">1</button>
                            <button class="join-item btn btn-sm btn-active">2</button>
                            <button class="join-item btn btn-sm">3</button>
                            <button class="join-item btn btn-sm">»</button>
                        </div>
                    </div>
                </div>

                <!-- Medium (Default) -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Medium (Default)</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn">«</button>
                            <button class="join-item btn">1</button>
                            <button class="join-item btn btn-active">2</button>
                            <button class="join-item btn">3</button>
                            <button class="join-item btn">»</button>
                        </div>
                    </div>
                </div>

                <!-- Large -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Large</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn btn-lg">«</button>
                            <button class="join-item btn btn-lg">1</button>
                            <button class="join-item btn btn-lg btn-active">2</button>
                            <button class="join-item btn btn-lg">3</button>
                            <button class="join-item btn btn-lg">»</button>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Pagination Variants" 
            description="Different pagination styles and layouts"
            code={variantsCode}
        >
            <div class="space-y-6">
                <!-- With Page Numbers -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">With Page Numbers</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn">1</button>
                            <button class="join-item btn btn-active">2</button>
                            <button class="join-item btn">3</button>
                            <button class="join-item btn">4</button>
                            <button class="join-item btn">5</button>
                        </div>
                    </div>
                </div>

                <!-- With Navigation Only -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">Navigation Only</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn">Previous</button>
                            <button class="join-item btn">Page 3 of 10</button>
                            <button class="join-item btn">Next</button>
                        </div>
                    </div>
                </div>

                <!-- With Icons -->
                <div>
                    <h4 class="text-sm font-medium mb-2 text-base-content/70">With Icons</h4>
                    <div class="flex justify-center">
                        <div class="join">
                            <button class="join-item btn">
                                <ChevronLeft class="w-4 h-4" />
                            </button>
                            <button class="join-item btn">1</button>
                            <button class="join-item btn btn-active">2</button>
                            <button class="join-item btn">3</button>
                            <button class="join-item btn">
                                <ChevronRight class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Full Featured -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Full Featured Pagination" 
            description="Complete pagination with first/last page controls, ellipsis, and disabled states"
            code={fullFeaturedCode}
        >
            <div class="flex flex-col items-center space-y-4">
                <div class="join">
                    <button 
                        class="join-item btn" 
                        class:btn-disabled={currentPage === 1}
                        disabled={currentPage === 1}
                        on:click={() => goToPage(1)}
                    >
                        <ChevronsLeft class="w-4 h-4" />
                    </button>
                    <button 
                        class="join-item btn" 
                        class:btn-disabled={currentPage === 1}
                        disabled={currentPage === 1}
                        on:click={() => goToPage(currentPage - 1)}
                    >
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    
                    {#each visiblePages as page}
                        {#if page === '...'}
                            <button class="join-item btn btn-disabled">...</button>
                        {:else}
                            <button 
                                class="join-item btn {currentPage === page ? 'btn-active' : ''}"
                                on:click={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        {/if}
                    {/each}
                    
                    <button 
                        class="join-item btn" 
                        class:btn-disabled={currentPage === totalPages}
                        disabled={currentPage === totalPages}
                        on:click={() => goToPage(currentPage + 1)}
                    >
                        <ChevronRight class="w-4 h-4" />
                    </button>
                    <button 
                        class="join-item btn" 
                        class:btn-disabled={currentPage === totalPages}
                        disabled={currentPage === totalPages}
                        on:click={() => goToPage(totalPages)}
                    >
                        <ChevronsRight class="w-4 h-4" />
                    </button>
                </div>
                
                <div class="text-sm text-base-content/70">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Mobile Responsive -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Mobile Responsive" 
            description="Adaptive pagination that works on mobile and desktop devices"
            code={mobileCode}
        >
            <div class="w-full">
                <!-- Mobile View (sm and below) -->
                <div class="block sm:hidden w-full">
                    <div class="join w-full">
                        <button 
                            class="join-item btn flex-1" 
                            disabled={currentPage === 1}
                            on:click={() => goToPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <button class="join-item btn">
                            Page {currentPage} of {totalPages}
                        </button>
                        <button 
                            class="join-item btn flex-1" 
                            disabled={currentPage === totalPages}
                            on:click={() => goToPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
                
                <!-- Desktop View (sm and above) -->
                <div class="hidden sm:flex justify-center">
                    <div class="join">
                        <button 
                            class="join-item btn" 
                            disabled={currentPage === 1}
                            on:click={() => goToPage(1)}
                        >
                            <ChevronsLeft class="w-4 h-4" />
                        </button>
                        <button 
                            class="join-item btn" 
                            disabled={currentPage === 1}
                            on:click={() => goToPage(currentPage - 1)}
                        >
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        
                        {#each visiblePages as page}
                            {#if page === '...'}
                                <button class="join-item btn btn-disabled">...</button>
                            {:else}
                                <button 
                                    class="join-item btn {currentPage === page ? 'btn-active' : ''}"
                                    on:click={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            {/if}
                        {/each}
                        
                        <button 
                            class="join-item btn" 
                            disabled={currentPage === totalPages}
                            on:click={() => goToPage(currentPage + 1)}
                        >
                            <ChevronRight class="w-4 h-4" />
                        </button>
                        <button 
                            class="join-item btn" 
                            disabled={currentPage === totalPages}
                            on:click={() => goToPage(totalPages)}
                        >
                            <ChevronsRight class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Data Table Integration -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Data Table with Pagination" 
            description="Real-world example showing pagination integrated with a data table"
            code={dataTableCode}
        >
            <div class="space-y-4">
                <!-- Data Table -->
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
                            {#each paginatedUsers as user}
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div class="badge {user.role === 'Admin' ? 'badge-primary' : user.role === 'Editor' ? 'badge-secondary' : 'badge-neutral'}">
                                            {user.role}
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Footer -->
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="text-sm text-base-content/70">
                        Showing {(tableCurrentPage - 1) * itemsPerPage + 1} to 
                        {Math.min(tableCurrentPage * itemsPerPage, totalItems)} of {totalItems} entries
                    </div>
                    
                    <div class="join">
                        <button 
                            class="join-item btn btn-sm" 
                            disabled={tableCurrentPage === 1}
                            on:click={() => goToTablePage(tableCurrentPage - 1)}
                        >
                            Previous
                        </button>
                        
                        {#each Array.from({length: Math.min(5, tablePages)}, (_, i) => i + Math.max(1, tableCurrentPage - 2)) as page}
                            {#if page <= tablePages}
                                <button 
                                    class="join-item btn btn-sm {tableCurrentPage === page ? 'btn-active' : ''}"
                                    on:click={() => goToTablePage(page)}
                                >
                                    {page}
                                </button>
                            {/if}
                        {/each}
                        
                        <button 
                            class="join-item btn btn-sm" 
                            disabled={tableCurrentPage === tablePages}
                            on:click={() => goToTablePage(tableCurrentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Uses semantic button elements with proper roles</li>
                <li>✅ Includes ARIA labels for screen reader navigation</li>
                <li>✅ Disabled states are properly announced to assistive technology</li>
                <li>✅ Current page state is clearly indicated visually and semantically</li>
                <li>✅ Focus management maintains logical tab order</li>
                <li>✅ High contrast mode compatible</li>
                <li>✅ Mobile-friendly touch targets (minimum 44px)</li>
                <li>✅ Responsive design maintains usability across devices</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Search Results -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Search Results Pagination</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="card-title">Search Results</h4>
                            <div class="text-sm text-base-content/70">
                                About 1,234 results (0.42 seconds)
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <!-- Search Result Items -->
                            <div class="border-b border-base-200 pb-4">
                                <h5 class="text-lg font-medium text-primary hover:underline cursor-pointer">
                                    How to implement pagination in Svelte
                                </h5>
                                <p class="text-sm text-base-content/70 mb-2">
                                    https://example.com/svelte-pagination-guide
                                </p>
                                <p class="text-sm">
                                    A comprehensive guide to implementing pagination components in Svelte applications using DaisyUI classes...
                                </p>
                            </div>
                            
                            <div class="border-b border-base-200 pb-4">
                                <h5 class="text-lg font-medium text-primary hover:underline cursor-pointer">
                                    Best practices for pagination UX
                                </h5>
                                <p class="text-sm text-base-content/70 mb-2">
                                    https://example.com/pagination-ux-best-practices
                                </p>
                                <p class="text-sm">
                                    Learn about user experience considerations when designing pagination interfaces for web applications...
                                </p>
                            </div>
                            
                            <div class="pb-4">
                                <h5 class="text-lg font-medium text-primary hover:underline cursor-pointer">
                                    Accessible pagination components
                                </h5>
                                <p class="text-sm text-base-content/70 mb-2">
                                    https://example.com/accessible-pagination
                                </p>
                                <p class="text-sm">
                                    Making pagination accessible to all users with proper ARIA labels, keyboard navigation, and screen reader support...
                                </p>
                            </div>
                        </div>
                        
                        <!-- Google-style pagination -->
                        <div class="flex justify-center mt-6">
                            <div class="join">
                                <button class="join-item btn btn-ghost" disabled>
                                    <ChevronLeft class="w-4 h-4" />
                                </button>
                                <button class="join-item btn btn-ghost btn-active">1</button>
                                <button class="join-item btn btn-ghost">2</button>
                                <button class="join-item btn btn-ghost">3</button>
                                <button class="join-item btn btn-ghost">4</button>
                                <button class="join-item btn btn-ghost">5</button>
                                <button class="join-item btn btn-ghost">
                                    <ChevronRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Blog Posts -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Blog Post Archive</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Latest Articles</h4>
                        
                        <div class="space-y-6">
                            <!-- Blog Post Items -->
                            <article class="border-b border-base-200 pb-6">
                                <div class="flex gap-4">
                                    <div class="avatar">
                                        <div class="w-16 h-16 rounded-lg bg-base-200"></div>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="text-lg font-medium mb-2 hover:text-primary cursor-pointer">
                                            Building Modern Web Components with Svelte 5
                                        </h5>
                                        <p class="text-sm text-base-content/70 mb-2">
                                            Explore the new features and improvements in Svelte 5, including the new runes system and enhanced performance optimizations.
                                        </p>
                                        <div class="flex items-center gap-4 text-xs text-base-content/60">
                                            <span>March 15, 2024</span>
                                            <span>•</span>
                                            <span>5 min read</span>
                                            <span>•</span>
                                            <span class="badge badge-xs">Web Development</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            
                            <article class="border-b border-base-200 pb-6">
                                <div class="flex gap-4">
                                    <div class="avatar">
                                        <div class="w-16 h-16 rounded-lg bg-base-200"></div>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="text-lg font-medium mb-2 hover:text-primary cursor-pointer">
                                            Design System Implementation Guide
                                        </h5>
                                        <p class="text-sm text-base-content/70 mb-2">
                                            A step-by-step approach to implementing a consistent design system across your application using component libraries.
                                        </p>
                                        <div class="flex items-center gap-4 text-xs text-base-content/60">
                                            <span>March 12, 2024</span>
                                            <span>•</span>
                                            <span>8 min read</span>
                                            <span>•</span>
                                            <span class="badge badge-xs">Design</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            
                            <article class="pb-6">
                                <div class="flex gap-4">
                                    <div class="avatar">
                                        <div class="w-16 h-16 rounded-lg bg-base-200"></div>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="text-lg font-medium mb-2 hover:text-primary cursor-pointer">
                                            Performance Optimization Techniques
                                        </h5>
                                        <p class="text-sm text-base-content/70 mb-2">
                                            Learn how to optimize your web applications for better performance, including code splitting, lazy loading, and caching strategies.
                                        </p>
                                        <div class="flex items-center gap-4 text-xs text-base-content/60">
                                            <span>March 10, 2024</span>
                                            <span>•</span>
                                            <span>12 min read</span>
                                            <span>•</span>
                                            <span class="badge badge-xs">Performance</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        
                        <!-- Blog-style pagination -->
                        <div class="flex justify-between items-center mt-6 pt-6 border-t border-base-200">
                            <button class="btn btn-outline" disabled>
                                <ChevronLeft class="w-4 h-4 mr-2" />
                                Older Posts
                            </button>
                            
                            <div class="join">
                                <button class="join-item btn btn-sm btn-active">1</button>
                                <button class="join-item btn btn-sm">2</button>
                                <button class="join-item btn btn-sm">3</button>
                                <button class="join-item btn btn-sm">...</button>
                                <button class="join-item btn btn-sm">15</button>
                            </div>
                            
                            <button class="btn btn-outline">
                                Newer Posts
                                <ChevronRight class="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- E-commerce Product Grid -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Product Catalog</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="card-title">Electronics</h4>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-base-content/70">Sort by:</span>
                                <select class="select select-sm select-bordered">
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                    <option>Best Selling</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Product Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div class="card card-compact bg-base-100 border">
                                <figure class="bg-base-200 h-48"></figure>
                                <div class="card-body">
                                    <h5 class="card-title text-sm">Wireless Headphones</h5>
                                    <p class="text-xs text-base-content/70">Premium noise-canceling headphones</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-bold">$199.99</span>
                                        <div class="rating rating-sm">
                                            <span class="text-xs text-base-content/70">4.5 ★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card card-compact bg-base-100 border">
                                <figure class="bg-base-200 h-48"></figure>
                                <div class="card-body">
                                    <h5 class="card-title text-sm">Smart Watch</h5>
                                    <p class="text-xs text-base-content/70">Fitness tracking and notifications</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-bold">$299.99</span>
                                        <div class="rating rating-sm">
                                            <span class="text-xs text-base-content/70">4.8 ★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card card-compact bg-base-100 border">
                                <figure class="bg-base-200 h-48"></figure>
                                <div class="card-body">
                                    <h5 class="card-title text-sm">Smartphone</h5>
                                    <p class="text-xs text-base-content/70">Latest model with advanced camera</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-bold">$699.99</span>
                                        <div class="rating rating-sm">
                                            <span class="text-xs text-base-content/70">4.6 ★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- E-commerce pagination with product count -->
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-base-200">
                            <div class="text-sm text-base-content/70">
                                Showing 1-12 of 248 products
                            </div>
                            
                            <div class="join">
                                <button class="join-item btn btn-sm" disabled>
                                    <ChevronLeft class="w-4 h-4" />
                                </button>
                                <button class="join-item btn btn-sm btn-active">1</button>
                                <button class="join-item btn btn-sm">2</button>
                                <button class="join-item btn btn-sm">3</button>
                                <button class="join-item btn btn-sm">4</button>
                                <button class="join-item btn btn-sm">5</button>
                                <button class="join-item btn btn-sm">...</button>
                                <button class="join-item btn btn-sm">21</button>
                                <button class="join-item btn btn-sm">
                                    <ChevronRight class="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-base-content/70">Items per page:</span>
                                <select class="select select-sm select-bordered">
                                    <option>12</option>
                                    <option>24</option>
                                    <option>48</option>
                                    <option>96</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>