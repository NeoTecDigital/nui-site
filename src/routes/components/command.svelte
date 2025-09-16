<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Search, Command as CommandIcon, FileText, Settings, Users, PlusCircle, Calendar, Home, Folder, ChevronRight, Clock, Star, Hash, ArrowUp, CornerDownLeft } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add command';

    const basicUsage = `<script>
  import { Command } from '@nui/core';
  let showCommand = false;
  let searchQuery = '';
<\/script>

<!-- Command Trigger -->
<button class="btn btn-primary" on:click={() => showCommand = true}>
  Open Command Palette
</button>

<!-- Command Modal -->
{#if showCommand}
  <dialog class="modal modal-open">
    <div class="modal-box max-w-lg p-0">
      <div class="border-b">
        <div class="flex items-center px-4 py-3">
          <Search class="w-4 h-4 mr-3 text-base-content/60" />
          <input 
            type="text" 
            placeholder="Type a command or search..."
            class="flex-1 bg-transparent outline-none"
            bind:value={searchQuery}
          />
          <kbd class="kbd kbd-sm">ESC</kbd>
        </div>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <div class="p-2">
          <div class="menu">
            <li><a class="flex items-center"><FileText class="w-4 h-4" />New Document</a></li>
            <li><a class="flex items-center"><Settings class="w-4 h-4" />Settings</a></li>
            <li><a class="flex items-center"><Users class="w-4 h-4" />Team</a></li>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button on:click={() => showCommand = false}>close</button>
    </form>
  </dialog>
{/if}`;

    const searchCode = `<script>
  let searchQuery = '';
  let commands = [
    { id: 'new-doc', title: 'New Document', description: 'Create a new document', icon: FileText, shortcut: 'Ctrl+N' },
    { id: 'settings', title: 'Settings', description: 'Open application settings', icon: Settings, shortcut: 'Ctrl+,' },
    { id: 'team', title: 'Team', description: 'Manage team members', icon: Users, shortcut: undefined },
    { id: 'calendar', title: 'Calendar', description: 'View calendar events', icon: Calendar, shortcut: undefined }
  ];
  
  $: filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
<\/script>

<dialog class="modal modal-open">
  <div class="modal-box max-w-lg p-0">
    <div class="border-b">
      <div class="flex items-center px-4 py-3">
        <Search class="w-4 h-4 mr-3 text-base-content/60" />
        <input 
          type="text" 
          placeholder="Search commands..."
          class="flex-1 bg-transparent outline-none"
          bind:value={searchQuery}
        />
      </div>
    </div>
    <div class="max-h-96 overflow-y-auto">
      {#if filteredCommands.length > 0}
        <div class="p-2">
          <div class="menu">
            {#each filteredCommands as command}
              <li>
                <a class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                    <div>
                      <div class="font-medium">{command.title}</div>
                      <div class="text-xs text-base-content/60">{command.description}</div>
                    </div>
                  </div>
                  {#if command.shortcut}
                    <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                  {/if}
                </a>
              </li>
            {/each}
          </div>
        </div>
      {:else}
        <div class="p-8 text-center text-base-content/60">
          <Search class="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No commands found</p>
        </div>
      {/if}
    </div>
  </div>
</dialog>`;

    const groupedCode = `<script>
  let commandGroups = [
    {
      name: 'Quick Actions',
      commands: [
        { title: 'New Document', icon: FileText, shortcut: 'Ctrl+N' },
        { title: 'Add Task', icon: PlusCircle, shortcut: 'Ctrl+T' }
      ]
    },
    {
      name: 'Navigation',
      commands: [
        { title: 'Go to Home', icon: Home, shortcut: 'Ctrl+H' },
        { title: 'Browse Files', icon: Folder, shortcut: 'Ctrl+O' },
        { title: 'Calendar', icon: Calendar, shortcut: 'Ctrl+K' }
      ]
    },
    {
      name: 'Settings',
      commands: [
        { title: 'Preferences', icon: Settings },
        { title: 'Manage Team', icon: Users }
      ]
    }
  ];
<\/script>

<div class="max-h-96 overflow-y-auto">
  {#each commandGroups as group}
    <div class="p-2">
      <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
        {group.name}
      </div>
      <div class="menu">
        {#each group.commands as command}
          <li>
            <a class="flex items-center justify-between">
              <div class="flex items-center">
                <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                {command.title}
              </div>
              {#if command.shortcut}
                <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
              {/if}
            </a>
          </li>
        {/each}
      </div>
    </div>
  {/each}
</div>`;

    const recentCode = `<script>
  let recentCommands = [
    { title: 'Project Settings', icon: Settings, timestamp: '2 minutes ago' },
    { title: 'Team Dashboard', icon: Users, timestamp: '5 minutes ago' },
    { title: 'New Document', icon: FileText, timestamp: '1 hour ago' }
  ];
  
  let allCommands = [
    { title: 'Calendar View', icon: Calendar },
    { title: 'Add New Task', icon: PlusCircle },
    { title: 'Browse Files', icon: Folder }
  ];
<\/script>

<div class="max-h-96 overflow-y-auto">
  {#if recentCommands.length > 0}
    <div class="p-2">
      <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide flex items-center">
        <Clock class="w-3 h-3 mr-1" />
        Recent
      </div>
      <div class="menu">
        {#each recentCommands as command}
          <li>
            <a class="flex items-center justify-between">
              <div class="flex items-center">
                <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                <div>
                  <div class="font-medium">{command.title}</div>
                  <div class="text-xs text-base-content/60">{command.timestamp}</div>
                </div>
              </div>
            </a>
          </li>
        {/each}
      </div>
    </div>
    <div class="divider my-1"></div>
  {/if}
  
  <div class="p-2">
    <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
      All Commands
    </div>
    <div class="menu">
      {#each allCommands as command}
        <li>
          <a class="flex items-center">
            <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
            {command.title}
          </a>
        </li>
      {/each}
    </div>
  </div>
</div>`;

    const keyboardCode = `<!-- Command palette with keyboard navigation hints -->
<dialog class="modal modal-open">
  <div class="modal-box max-w-lg p-0">
    <div class="border-b">
      <div class="flex items-center px-4 py-3">
        <Search class="w-4 h-4 mr-3 text-base-content/60" />
        <input 
          type="text" 
          placeholder="Type a command..."
          class="flex-1 bg-transparent outline-none"
        />
        <div class="flex items-center space-x-1">
          <kbd class="kbd kbd-sm">ESC</kbd>
        </div>
      </div>
    </div>
    <div class="max-h-96 overflow-y-auto">
      <div class="p-2">
        <div class="menu">
          <li>
            <a class="flex items-center justify-between bg-primary text-primary-content">
              <div class="flex items-center">
                <FileText class="w-4 h-4 mr-3" />
                New Document
              </div>
              <div class="flex items-center space-x-1">
                <kbd class="kbd kbd-sm bg-primary-content text-primary">Ctrl</kbd>
                <kbd class="kbd kbd-sm bg-primary-content text-primary">N</kbd>
              </div>
            </a>
          </li>
          <li>
            <a class="flex items-center justify-between">
              <div class="flex items-center">
                <Settings class="w-4 h-4 mr-3" />
                Settings
              </div>
              <div class="flex items-center space-x-1">
                <kbd class="kbd kbd-sm">Ctrl</kbd>
                <kbd class="kbd kbd-sm">,</kbd>
              </div>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Users class="w-4 h-4 mr-3" />
              Team Management
            </a>
          </li>
        </div>
      </div>
    </div>
    <div class="border-t p-3">
      <div class="flex items-center justify-between text-xs text-base-content/60">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1">
            <kbd class="kbd kbd-sm">↑↓</kbd>
            <span>Navigate</span>
          </div>
          <div class="flex items-center space-x-1">
            <kbd class="kbd kbd-sm">Enter</kbd>
            <span>Select</span>
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <kbd class="kbd kbd-sm">ESC</kbd>
          <span>Close</span>
        </div>
      </div>
    </div>
  </div>
</dialog>`;

    const applicationCode = `<script>
  let showCommand = false;
  let activeFilter = 'all';
  
  let applicationCommands = {
    files: [
      { title: 'New File', description: 'Create a new file', icon: FileText, shortcut: 'Ctrl+N' },
      { title: 'Open Folder', description: 'Open project folder', icon: Folder, shortcut: 'Ctrl+O' },
      { title: 'Save All', description: 'Save all open files', icon: FileText, shortcut: 'Ctrl+Shift+S' }
    ],
    edit: [
      { title: 'Find in Files', description: 'Search across all files', icon: Search, shortcut: 'Ctrl+Shift+F' },
      { title: 'Replace in Files', description: 'Find and replace', icon: Search, shortcut: 'Ctrl+Shift+H' }
    ],
    view: [
      { title: 'Toggle Sidebar', description: 'Show/hide sidebar', icon: Folder, shortcut: 'Ctrl+B' },
      { title: 'Command Palette', description: 'Show all commands', icon: CommandIcon, shortcut: 'Ctrl+Shift+P' }
    ],
    tools: [
      { title: 'Settings', description: 'Open preferences', icon: Settings, shortcut: 'Ctrl+,' },
      { title: 'Extensions', description: 'Manage extensions', icon: PlusCircle }
    ]
  };
  
  function executeCommand(command) {
    console.log('Executing:', command.title);
    showCommand = false;
  }
<\/script>

<!-- Trigger -->
<div class="flex items-center space-x-2">
  <button class="btn btn-primary" on:click={() => showCommand = true}>
    <CommandIcon class="w-4 h-4 mr-2" />
    Command Palette
  </button>
  <div class="text-sm text-base-content/60">
    or press <kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">Shift</kbd> + <kbd class="kbd kbd-sm">P</kbd>
  </div>
</div>

{#if showCommand}
  <dialog class="modal modal-open">
    <div class="modal-box max-w-2xl p-0">
      <div class="border-b">
        <div class="flex items-center px-4 py-3">
          <CommandIcon class="w-4 h-4 mr-3 text-base-content/60" />
          <input 
            type="text" 
            placeholder="Type a command or search..."
            class="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      
      <!-- Filter Tabs -->
      <div class="border-b">
        <div class="tabs tabs-boxed tabs-sm bg-transparent">
          <button 
            class="tab {activeFilter === 'all' ? 'tab-active' : ''}"
            on:click={() => activeFilter = 'all'}
          >
            All
          </button>
          <button 
            class="tab {activeFilter === 'files' ? 'tab-active' : ''}"
            on:click={() => activeFilter = 'files'}
          >
            Files
          </button>
          <button 
            class="tab {activeFilter === 'edit' ? 'tab-active' : ''}"
            on:click={() => activeFilter = 'edit'}
          >
            Edit
          </button>
          <button 
            class="tab {activeFilter === 'view' ? 'tab-active' : ''}"
            on:click={() => activeFilter = 'view'}
          >
            View
          </button>
          <button 
            class="tab {activeFilter === 'tools' ? 'tab-active' : ''}"
            on:click={() => activeFilter = 'tools'}
          >
            Tools
          </button>
        </div>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        {#if activeFilter === 'all'}
          {#each Object.entries(applicationCommands) as [category, commands]}
            <div class="p-2">
              <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                {category}
              </div>
              <div class="menu">
                {#each commands as command}
                  <li>
                    <a class="flex items-center justify-between" on:click={() => executeCommand(command)}>
                      <div class="flex items-center">
                        <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                        <div>
                          <div class="font-medium">{command.title}</div>
                          <div class="text-xs text-base-content/60">{command.description}</div>
                        </div>
                      </div>
                      {#if command.shortcut}
                        <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                      {/if}
                    </a>
                  </li>
                {/each}
              </div>
            </div>
          {/each}
        {:else}
          <div class="p-2">
            <div class="menu">
              {#each applicationCommands[activeFilter] as command}
                <li>
                  <a class="flex items-center justify-between" on:click={() => executeCommand(command)}>
                    <div class="flex items-center">
                      <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                      <div>
                        <div class="font-medium">{command.title}</div>
                        <div class="text-xs text-base-content/60">{command.description}</div>
                      </div>
                    </div>
                    {#if command.shortcut}
                      <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                    {/if}
                  </a>
                </li>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button on:click={() => showCommand = false}>close</button>
    </form>
  </dialog>
{/if}`;

    const apiProps = [
        {
            name: 'open',
            type: 'boolean',
            default: 'false',
            description: 'Controls the open/closed state of the command palette'
        },
        {
            name: 'placeholder',
            type: 'string',
            default: "'Type a command or search...'",
            description: 'Placeholder text for the search input'
        },
        {
            name: 'searchQuery',
            type: 'string',
            default: "''",
            description: 'The current search query value'
        },
        {
            name: 'commands',
            type: 'CommandItem[]',
            default: '[]',
            description: 'Array of command items to display'
        },
        {
            name: 'groups',
            type: 'CommandGroup[]',
            default: '[]',
            description: 'Array of command groups for organized display'
        },
        {
            name: 'maxHeight',
            type: 'string',
            default: "'max-h-96'",
            description: 'Maximum height class for the command list'
        },
        {
            name: 'showShortcuts',
            type: 'boolean',
            default: 'true',
            description: 'Whether to display keyboard shortcuts'
        },
        {
            name: 'showFooter',
            type: 'boolean',
            default: 'true',
            description: 'Whether to show the keyboard navigation footer'
        },
        {
            name: 'onSelect',
            type: 'function',
            default: 'undefined',
            description: 'Callback function when a command is selected'
        },
        {
            name: 'onClose',
            type: 'function',
            default: 'undefined',
            description: 'Callback function when the command palette is closed'
        }
    ];

    // Component state
    let showBasicCommand = false;
    let showSearchCommand = false;
    let showGroupedCommand = false;
    let showRecentCommand = false;
    let showKeyboardCommand = false;
    let showApplicationCommand = false;

    // Search functionality
    let searchQuery = '';
    let basicCommands = [
        { id: 'new-doc', title: 'New Document', description: 'Create a new document', icon: FileText, shortcut: 'Ctrl+N' },
        { id: 'settings', title: 'Settings', description: 'Open application settings', icon: Settings, shortcut: 'Ctrl+,' },
        { id: 'team', title: 'Team', description: 'Manage team members', icon: Users },
        { id: 'calendar', title: 'Calendar', description: 'View calendar events', icon: Calendar }
    ];

    $: filteredCommands = basicCommands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Grouped commands
    let commandGroups = [
        {
            name: 'Quick Actions',
            commands: [
                { title: 'New Document', icon: FileText, shortcut: 'Ctrl+N' },
                { title: 'Add Task', icon: PlusCircle, shortcut: 'Ctrl+T' }
            ]
        },
        {
            name: 'Navigation',
            commands: [
                { title: 'Go to Home', icon: Home, shortcut: 'Ctrl+H' },
                { title: 'Browse Files', icon: Folder, shortcut: 'Ctrl+O' },
                { title: 'Calendar', icon: Calendar, shortcut: 'Ctrl+K' }
            ]
        },
        {
            name: 'Settings',
            commands: [
                { title: 'Preferences', icon: Settings },
                { title: 'Manage Team', icon: Users }
            ]
        }
    ];

    // Recent commands
    let recentCommands = [
        { title: 'Project Settings', icon: Settings, timestamp: '2 minutes ago' },
        { title: 'Team Dashboard', icon: Users, timestamp: '5 minutes ago' },
        { title: 'New Document', icon: FileText, timestamp: '1 hour ago' }
    ];

    let allCommands = [
        { title: 'Calendar View', icon: Calendar },
        { title: 'Add New Task', icon: PlusCircle },
        { title: 'Browse Files', icon: Folder }
    ];

    // Application commands
    let applicationCommands = {
        files: [
            { title: 'New File', description: 'Create a new file', icon: FileText, shortcut: 'Ctrl+N' },
            { title: 'Open Folder', description: 'Open project folder', icon: Folder, shortcut: 'Ctrl+O' },
            { title: 'Save All', description: 'Save all open files', icon: FileText, shortcut: 'Ctrl+Shift+S' }
        ],
        edit: [
            { title: 'Find in Files', description: 'Search across all files', icon: Search, shortcut: 'Ctrl+Shift+F' },
            { title: 'Replace in Files', description: 'Find and replace', icon: Search, shortcut: 'Ctrl+Shift+H' }
        ],
        view: [
            { title: 'Toggle Sidebar', description: 'Show/hide sidebar', icon: Folder, shortcut: 'Ctrl+B' },
            { title: 'Command Palette', description: 'Show all commands', icon: CommandIcon, shortcut: 'Ctrl+Shift+P' }
        ],
        tools: [
            { title: 'Settings', description: 'Open preferences', icon: Settings, shortcut: 'Ctrl+,' },
            { title: 'Extensions', description: 'Manage extensions', icon: PlusCircle, shortcut: undefined }
        ]
    };

    let activeFilter = 'all';

    function executeCommand(command: any) {
        console.log('Executing:', command.title);
        showApplicationCommand = false;
    }

    function selectCommand(command: any) {
        console.log('Selected:', command.title);
    }
</script>

<svelte:head>
    <title>Command - NUI Components</title>
    <meta name="description" content="Command palette component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Command</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Command</h1>
                <p class="text-xl text-base-content/70">
                    Fast, accessible command palette for navigation and actions. Search through commands with keyboard navigation.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-warning">Beta</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/command"
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
            title="Basic Command Palette" 
            description="Simple command palette with search input and command list"
            code={basicUsage}
        >
            <div class="space-y-4">
                <button class="btn btn-primary" on:click={() => showBasicCommand = true}>
                    <CommandIcon class="w-4 h-4 mr-2" />
                    Open Command Palette
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Search and Filter -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Search and Filter" 
            description="Command palette with fuzzy search functionality and filtered results"
            code={searchCode}
        >
            <div class="space-y-4">
                <button class="btn btn-secondary" on:click={() => showSearchCommand = true}>
                    <Search class="w-4 h-4 mr-2" />
                    Search Commands
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Grouped Commands -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Grouped Commands" 
            description="Organize commands into logical groups with section headers"
            code={groupedCode}
        >
            <div class="space-y-4">
                <button class="btn btn-accent" on:click={() => showGroupedCommand = true}>
                    <Hash class="w-4 h-4 mr-2" />
                    Grouped Commands
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Recent Commands -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Recent Commands" 
            description="Show recently used commands with timestamps for quick access"
            code={recentCode}
        >
            <div class="space-y-4">
                <button class="btn btn-info" on:click={() => showRecentCommand = true}>
                    <Clock class="w-4 h-4 mr-2" />
                    Recent Commands
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Keyboard Navigation -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Keyboard Navigation" 
            description="Full keyboard navigation with visual indicators and shortcuts"
            code={keyboardCode}
        >
            <div class="space-y-4">
                <button class="btn btn-neutral" on:click={() => showKeyboardCommand = true}>
                    <ArrowUp class="w-4 h-4 mr-2" />
                    Keyboard Navigation
                </button>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Application Example -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Application Command Palette" 
            description="Complete example with categories, filters, and application-style commands"
            code={applicationCode}
        >
            <div class="space-y-4">
                <div class="flex items-center space-x-2">
                    <button class="btn btn-primary" on:click={() => showApplicationCommand = true}>
                        <CommandIcon class="w-4 h-4 mr-2" />
                        Command Palette
                    </button>
                    <div class="text-sm text-base-content/60">
                        or press <kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">Shift</kbd> + <kbd class="kbd kbd-sm">P</kbd>
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
                <li>✅ Full keyboard navigation with <kbd class="kbd kbd-sm">Arrow Keys</kbd>, <kbd class="kbd kbd-sm">Enter</kbd>, and <kbd class="kbd kbd-sm">Escape</kbd></li>
                <li>✅ Screen reader compatible with proper ARIA labels and roles</li>
                <li>✅ Focus management and visual focus indicators</li>
                <li>✅ Supports <kbd class="kbd kbd-sm">Ctrl/Cmd + K</kbd> global shortcut pattern</li>
                <li>✅ Search functionality for quick command discovery</li>
                <li>✅ High contrast mode support</li>
                <li>✅ Respects reduced motion preferences</li>
                <li>✅ Keyboard shortcuts displayed and accessible</li>
                <li>✅ Modal behavior with proper focus trapping</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Code Editor Commands -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Code Editor Commands</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title text-base flex items-center">
                            <FileText class="w-5 h-5 mr-2" />
                            File Operations
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span>New File</span>
                                <kbd class="kbd kbd-sm">Ctrl+N</kbd>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Open File</span>
                                <kbd class="kbd kbd-sm">Ctrl+O</kbd>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Save File</span>
                                <kbd class="kbd kbd-sm">Ctrl+S</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Application Navigation -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Application Navigation</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title text-base flex items-center">
                            <Home class="w-5 h-5 mr-2" />
                            Quick Navigation
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span>Go to Dashboard</span>
                                <kbd class="kbd kbd-sm">Ctrl+1</kbd>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Open Settings</span>
                                <kbd class="kbd kbd-sm">Ctrl+,</kbd>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Search Everything</span>
                                <kbd class="kbd kbd-sm">Ctrl+/</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Collaboration -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Team Collaboration</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title text-base flex items-center">
                            <Users class="w-5 h-5 mr-2" />
                            Team Actions
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span>Share Project</span>
                                <span class="text-base-content/60">No shortcut</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Invite Member</span>
                                <kbd class="kbd kbd-sm">Ctrl+I</kbd>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>View Activity</span>
                                <kbd class="kbd kbd-sm">Ctrl+Shift+A</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Components -->

<!-- Basic Command -->
{#if showBasicCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-lg p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <Search class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Type a command or search..."
                        class="flex-1 bg-transparent outline-none"
                    />
                    <kbd class="kbd kbd-sm">ESC</kbd>
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                <div class="p-2">
                    <div class="menu">
                        <li><a class="flex items-center" on:click={() => selectCommand({title: 'New Document'})}><FileText class="w-4 h-4 mr-3" />New Document</a></li>
                        <li><a class="flex items-center" on:click={() => selectCommand({title: 'Settings'})}><Settings class="w-4 h-4 mr-3" />Settings</a></li>
                        <li><a class="flex items-center" on:click={() => selectCommand({title: 'Team'})}><Users class="w-4 h-4 mr-3" />Team</a></li>
                    </div>
                </div>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showBasicCommand = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Search Command -->
{#if showSearchCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-lg p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <Search class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Search commands..."
                        class="flex-1 bg-transparent outline-none"
                        bind:value={searchQuery}
                    />
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                {#if filteredCommands.length > 0}
                    <div class="p-2">
                        <div class="menu">
                            {#each filteredCommands as command}
                                <li>
                                    <a class="flex items-center justify-between" on:click={() => selectCommand(command)}>
                                        <div class="flex items-center">
                                            <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                            <div>
                                                <div class="font-medium">{command.title}</div>
                                                <div class="text-xs text-base-content/60">{command.description}</div>
                                            </div>
                                        </div>
                                        {#if command.shortcut}
                                            <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                                        {/if}
                                    </a>
                                </li>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="p-8 text-center text-base-content/60">
                        <Search class="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No commands found</p>
                    </div>
                {/if}
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showSearchCommand = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Grouped Commands -->
{#if showGroupedCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-lg p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <Hash class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Type a command..."
                        class="flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                {#each commandGroups as group}
                    <div class="p-2">
                        <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                            {group.name}
                        </div>
                        <div class="menu">
                            {#each group.commands as command}
                                <li>
                                    <a class="flex items-center justify-between" on:click={() => selectCommand(command)}>
                                        <div class="flex items-center">
                                            <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                            {command.title}
                                        </div>
                                        {#if command.shortcut}
                                            <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                                        {/if}
                                    </a>
                                </li>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showGroupedCommand = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Recent Commands -->
{#if showRecentCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-lg p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <Clock class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Search recent commands..."
                        class="flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                {#if recentCommands.length > 0}
                    <div class="p-2">
                        <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide flex items-center">
                            <Clock class="w-3 h-3 mr-1" />
                            Recent
                        </div>
                        <div class="menu">
                            {#each recentCommands as command}
                                <li>
                                    <a class="flex items-center justify-between" on:click={() => selectCommand(command)}>
                                        <div class="flex items-center">
                                            <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                            <div>
                                                <div class="font-medium">{command.title}</div>
                                                <div class="text-xs text-base-content/60">{command.timestamp}</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            {/each}
                        </div>
                    </div>
                    <div class="divider my-1"></div>
                {/if}
                
                <div class="p-2">
                    <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                        All Commands
                    </div>
                    <div class="menu">
                        {#each allCommands as command}
                            <li>
                                <a class="flex items-center" on:click={() => selectCommand(command)}>
                                    <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                    {command.title}
                                </a>
                            </li>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showRecentCommand = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Keyboard Navigation -->
{#if showKeyboardCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-lg p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <Search class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Type a command..."
                        class="flex-1 bg-transparent outline-none"
                    />
                    <div class="flex items-center space-x-1">
                        <kbd class="kbd kbd-sm">ESC</kbd>
                    </div>
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                <div class="p-2">
                    <div class="menu">
                        <li>
                            <a class="flex items-center justify-between bg-primary text-primary-content">
                                <div class="flex items-center">
                                    <FileText class="w-4 h-4 mr-3" />
                                    New Document
                                </div>
                                <div class="flex items-center space-x-1">
                                    <kbd class="kbd kbd-sm bg-primary-content text-primary">Ctrl</kbd>
                                    <kbd class="kbd kbd-sm bg-primary-content text-primary">N</kbd>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <Settings class="w-4 h-4 mr-3" />
                                    Settings
                                </div>
                                <div class="flex items-center space-x-1">
                                    <kbd class="kbd kbd-sm">Ctrl</kbd>
                                    <kbd class="kbd kbd-sm">,</kbd>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center">
                                <Users class="w-4 h-4 mr-3" />
                                Team Management
                            </a>
                        </li>
                    </div>
                </div>
            </div>
            <div class="border-t p-3">
                <div class="flex items-center justify-between text-xs text-base-content/60">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-1">
                            <kbd class="kbd kbd-sm">↑↓</kbd>
                            <span>Navigate</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <kbd class="kbd kbd-sm">Enter</kbd>
                            <span>Select</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <kbd class="kbd kbd-sm">ESC</kbd>
                        <span>Close</span>
                    </div>
                </div>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showKeyboardCommand = false}>close</button>
        </form>
    </dialog>
{/if}

<!-- Application Command -->
{#if showApplicationCommand}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-2xl p-0">
            <div class="border-b">
                <div class="flex items-center px-4 py-3">
                    <CommandIcon class="w-4 h-4 mr-3 text-base-content/60" />
                    <input 
                        type="text" 
                        placeholder="Type a command or search..."
                        class="flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            
            <!-- Filter Tabs -->
            <div class="border-b">
                <div class="tabs tabs-boxed tabs-sm bg-transparent">
                    <button 
                        class="tab {activeFilter === 'all' ? 'tab-active' : ''}"
                        on:click={() => activeFilter = 'all'}
                    >
                        All
                    </button>
                    <button 
                        class="tab {activeFilter === 'files' ? 'tab-active' : ''}"
                        on:click={() => activeFilter = 'files'}
                    >
                        Files
                    </button>
                    <button 
                        class="tab {activeFilter === 'edit' ? 'tab-active' : ''}"
                        on:click={() => activeFilter = 'edit'}
                    >
                        Edit
                    </button>
                    <button 
                        class="tab {activeFilter === 'view' ? 'tab-active' : ''}"
                        on:click={() => activeFilter = 'view'}
                    >
                        View
                    </button>
                    <button 
                        class="tab {activeFilter === 'tools' ? 'tab-active' : ''}"
                        on:click={() => activeFilter = 'tools'}
                    >
                        Tools
                    </button>
                </div>
            </div>
            
            <div class="max-h-96 overflow-y-auto">
                {#if activeFilter === 'all'}
                    {#each Object.entries(applicationCommands) as [category, commands]}
                        <div class="p-2">
                            <div class="px-2 py-1 text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                                {category}
                            </div>
                            <div class="menu">
                                {#each commands as command}
                                    <li>
                                        <a class="flex items-center justify-between" on:click={() => executeCommand(command)}>
                                            <div class="flex items-center">
                                                <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                                <div>
                                                    <div class="font-medium">{command.title}</div>
                                                    <div class="text-xs text-base-content/60">{command.description}</div>
                                                </div>
                                            </div>
                                            {#if command.shortcut}
                                                <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                                            {/if}
                                        </a>
                                    </li>
                                {/each}
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div class="p-2">
                        <div class="menu">
                            {#each applicationCommands[activeFilter] as command}
                                <li>
                                    <a class="flex items-center justify-between" on:click={() => executeCommand(command)}>
                                        <div class="flex items-center">
                                            <svelte:component this={command.icon} class="w-4 h-4 mr-3" />
                                            <div>
                                                <div class="font-medium">{command.title}</div>
                                                <div class="text-xs text-base-content/60">{command.description}</div>
                                            </div>
                                        </div>
                                        {#if command.shortcut}
                                            <kbd class="kbd kbd-sm">{command.shortcut}</kbd>
                                        {/if}
                                    </a>
                                </li>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button on:click={() => showApplicationCommand = false}>close</button>
        </form>
    </dialog>
{/if}