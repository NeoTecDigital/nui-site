<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, File, Edit, Eye, HelpCircle, Settings, Save, Copy, Scissors, Clipboard, Search, RotateCcw, RotateCw, Download, Upload, Users, Grid, List, SidebarOpen, ChevronDown, Command, Plus, Minus } from 'lucide-svelte';

    // State for different menubar examples
    let fileMenuOpen = false;
    let editMenuOpen = false;
    let viewMenuOpen = false;
    let helpMenuOpen = false;
    let macMenuOpen = false;
    let desktopMenuOpen = false;
    let applicationMenuOpen = false;

    const installCommand = 'npx @nui/cli add menubar';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<div class="navbar bg-base-200">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost">
        File
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a>New</a></li>
        <li><a>Open</a></li>
        <li><a>Save</a></li>
      </ul>
    </div>
  </div>
</div>`;

    const desktopMenubarCode = `<script>
  let fileOpen = false;
  let editOpen = false;
  let viewOpen = false;
  let helpOpen = false;
<\/script>

<div class="navbar bg-base-200 border-b">
  <div class="navbar-start">
    <div class="flex">
      <!-- File Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm" on:click={() => fileOpen = !fileOpen}>
          File
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <Plus class="w-4 h-4" />
              New
              <span class="ml-auto text-xs opacity-60">Ctrl+N</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <File class="w-4 h-4" />
              Open
              <span class="ml-auto text-xs opacity-60">Ctrl+O</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Save class="w-4 h-4" />
              Save
              <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              <Download class="w-4 h-4" />
              Export
              <span class="ml-auto text-xs opacity-60">Ctrl+E</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Edit Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          Edit
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <RotateCcw class="w-4 h-4" />
              Undo
              <span class="ml-auto text-xs opacity-60">Ctrl+Z</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <RotateCw class="w-4 h-4" />
              Redo
              <span class="ml-auto text-xs opacity-60">Ctrl+Y</span>
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              <Scissors class="w-4 h-4" />
              Cut
              <span class="ml-auto text-xs opacity-60">Ctrl+X</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Copy class="w-4 h-4" />
              Copy
              <span class="ml-auto text-xs opacity-60">Ctrl+C</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Clipboard class="w-4 h-4" />
              Paste
              <span class="ml-auto text-xs opacity-60">Ctrl+V</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- View Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          View
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <SidebarOpen class="w-4 h-4" />
              Toggle Sidebar
              <span class="ml-auto text-xs opacity-60">Ctrl+B</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Grid class="w-4 h-4" />
              Grid View
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <List class="w-4 h-4" />
              List View
            </a>
          </li>
        </ul>
      </div>

      <!-- Help Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          Help
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <HelpCircle class="w-4 h-4" />
              Documentation
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Users class="w-4 h-4" />
              Community
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              <Settings class="w-4 h-4" />
              About
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;

    const nestedMenuCode = `<div class="navbar bg-base-200 border-b">
  <div class="navbar-start">
    <div class="dropdown dropdown-bottom">
      <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
        File
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow-lg">
        <li>
          <a class="flex items-center">
            <Plus class="w-4 h-4" />
            New
            <ChevronDown class="w-4 h-4 ml-auto" />
          </a>
          <ul class="p-2">
            <li><a>New File</a></li>
            <li><a>New Folder</a></li>
            <li><a>New Project</a></li>
          </ul>
        </li>
        <li>
          <a class="flex items-center">
            <File class="w-4 h-4" />
            Open Recent
            <ChevronDown class="w-4 h-4 ml-auto" />
          </a>
          <ul class="p-2">
            <li><a>project-1.txt</a></li>
            <li><a>document.md</a></li>
            <li><a>notes.txt</a></li>
          </ul>
        </li>
        <li><div class="divider my-1"></div></li>
        <li>
          <a class="flex items-center">
            <Save class="w-4 h-4" />
            Save
            <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>`;

    const macMenubarCode = `<div class="navbar bg-base-200 border-b">
  <div class="navbar-start">
    <div class="flex">
      <!-- App Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm font-bold">
          MyApp
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              About MyApp
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              <Settings class="w-4 h-4" />
              Preferences
              <span class="ml-auto text-xs opacity-60">⌘,</span>
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              Hide MyApp
              <span class="ml-auto text-xs opacity-60">⌘H</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              Quit MyApp
              <span class="ml-auto text-xs opacity-60">⌘Q</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- File Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          File
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <Plus class="w-4 h-4" />
              New
              <span class="ml-auto text-xs opacity-60">⌘N</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <File class="w-4 h-4" />
              Open
              <span class="ml-auto text-xs opacity-60">⌘O</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Save class="w-4 h-4" />
              Save
              <span class="ml-auto text-xs opacity-60">⌘S</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Edit Menu -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          Edit
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center">
              <RotateCcw class="w-4 h-4" />
              Undo
              <span class="ml-auto text-xs opacity-60">⌘Z</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <RotateCw class="w-4 h-4" />
              Redo
              <span class="ml-auto text-xs opacity-60">⌘⇧Z</span>
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center">
              <Copy class="w-4 h-4" />
              Copy
              <span class="ml-auto text-xs opacity-60">⌘C</span>
            </a>
          </li>
          <li>
            <a class="flex items-center">
              <Clipboard class="w-4 h-4" />
              Paste
              <span class="ml-auto text-xs opacity-60">⌘V</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;

    const contextualMenubarCode = `<script>
  // Context-aware menu state
  let hasSelection = true;
  let hasClipboard = true;
  let canUndo = true;
  let canRedo = false;
<\/script>

<div class="navbar bg-base-200 border-b">
  <div class="navbar-start">
    <div class="flex">
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
          Edit
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
          <li>
            <a class="flex items-center" class:text-base-content/40={!canUndo} class:pointer-events-none={!canUndo}>
              <RotateCcw class="w-4 h-4" />
              Undo
              <span class="ml-auto text-xs opacity-60">Ctrl+Z</span>
            </a>
          </li>
          <li>
            <a class="flex items-center" class:text-base-content/40={!canRedo} class:pointer-events-none={!canRedo}>
              <RotateCw class="w-4 h-4" />
              Redo
              <span class="ml-auto text-xs opacity-60">Ctrl+Y</span>
            </a>
          </li>
          <li><div class="divider my-1"></div></li>
          <li>
            <a class="flex items-center" class:text-base-content/40={!hasSelection} class:pointer-events-none={!hasSelection}>
              <Scissors class="w-4 h-4" />
              Cut
              <span class="ml-auto text-xs opacity-60">Ctrl+X</span>
            </a>
          </li>
          <li>
            <a class="flex items-center" class:text-base-content/40={!hasSelection} class:pointer-events-none={!hasSelection}>
              <Copy class="w-4 h-4" />
              Copy
              <span class="ml-auto text-xs opacity-60">Ctrl+C</span>
            </a>
          </li>
          <li>
            <a class="flex items-center" class:text-base-content/40={!hasClipboard} class:pointer-events-none={!hasClipboard}>
              <Clipboard class="w-4 h-4" />
              Paste
              <span class="ml-auto text-xs opacity-60">Ctrl+V</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;

    const apiProps = [
        {
            name: 'variant',
            type: "'default' | 'compact' | 'mac'",
            default: "'default'",
            description: 'Visual style variant of the menubar'
        },
        {
            name: 'position',
            type: "'top' | 'bottom'",
            default: "'top'",
            description: 'Position of the menubar relative to content'
        },
        {
            name: 'sticky',
            type: 'boolean',
            default: 'false',
            description: 'Makes the menubar stick to the top when scrolling'
        },
        {
            name: 'bordered',
            type: 'boolean',
            default: 'true',
            description: 'Adds border around the menubar'
        },
        {
            name: 'background',
            type: "'base-100' | 'base-200' | 'base-300'",
            default: "'base-200'",
            description: 'Background color of the menubar'
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the menubar and menu items'
        },
        {
            name: 'closeOnSelect',
            type: 'boolean',
            default: 'true',
            description: 'Automatically close menus when an item is selected'
        },
        {
            name: 'keyboardShortcuts',
            type: 'boolean',
            default: 'true',
            description: 'Enable keyboard shortcuts display in menu items'
        }
    ];
</script>

<svelte:head>
    <title>Menubar - NUI Components</title>
    <meta name="description" content="Menubar component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Menubar</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Menubar</h1>
                <p class="text-xl text-base-content/70">
                    Desktop-style application menubar with dropdown menus for organizing actions and navigation.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/menubar"
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
            description="Simple menubar with dropdown menus for common actions"
            code={basicUsage}
        >
            <div class="w-full max-w-2xl border rounded-lg overflow-hidden">
                <div class="navbar bg-base-200">
                    <div class="navbar-start">
                        <div class="dropdown">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-sm" on:click={() => fileMenuOpen = !fileMenuOpen}>
                                File
                            </div>
                            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>New</a></li>
                                <li><a>Open</a></li>
                                <li><a>Save</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-8 bg-base-100 text-center text-base-content/50">
                    Application content area
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Desktop Application Menubar -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Desktop Application Menubar" 
            description="Complete desktop-style menubar with File, Edit, View, and Help menus including keyboard shortcuts"
            code={desktopMenubarCode}
        >
            <div class="w-full max-w-4xl border rounded-lg overflow-hidden">
                <div class="navbar bg-base-200 border-b">
                    <div class="navbar-start">
                        <div class="flex">
                            <!-- File Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    File
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <Plus class="w-4 h-4" />
                                            New
                                            <span class="ml-auto text-xs opacity-60">Ctrl+N</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <File class="w-4 h-4" />
                                            Open
                                            <span class="ml-auto text-xs opacity-60">Ctrl+O</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Save class="w-4 h-4" />
                                            Save
                                            <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Download class="w-4 h-4" />
                                            Export
                                            <span class="ml-auto text-xs opacity-60">Ctrl+E</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- Edit Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    Edit
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <RotateCcw class="w-4 h-4" />
                                            Undo
                                            <span class="ml-auto text-xs opacity-60">Ctrl+Z</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <RotateCw class="w-4 h-4" />
                                            Redo
                                            <span class="ml-auto text-xs opacity-60">Ctrl+Y</span>
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Scissors class="w-4 h-4" />
                                            Cut
                                            <span class="ml-auto text-xs opacity-60">Ctrl+X</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Copy class="w-4 h-4" />
                                            Copy
                                            <span class="ml-auto text-xs opacity-60">Ctrl+C</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Clipboard class="w-4 h-4" />
                                            Paste
                                            <span class="ml-auto text-xs opacity-60">Ctrl+V</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- View Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    View
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <SidebarOpen class="w-4 h-4" />
                                            Toggle Sidebar
                                            <span class="ml-auto text-xs opacity-60">Ctrl+B</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Grid class="w-4 h-4" />
                                            Grid View
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <List class="w-4 h-4" />
                                            List View
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- Help Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    Help
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <HelpCircle class="w-4 h-4" />
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Users class="w-4 h-4" />
                                            Community
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Settings class="w-4 h-4" />
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-8 bg-base-100 text-center text-base-content/50">
                    Desktop application content area
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Menus -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Menu Structure" 
            description="Menubar with nested submenus for hierarchical organization"
            code={nestedMenuCode}
        >
            <div class="w-full max-w-2xl border rounded-lg overflow-hidden">
                <div class="navbar bg-base-200 border-b">
                    <div class="navbar-start">
                        <div class="dropdown dropdown-bottom">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                File
                            </div>
                            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow-lg">
                                <li>
                                    <a class="flex items-center">
                                        <Plus class="w-4 h-4" />
                                        New
                                        <ChevronDown class="w-4 h-4 ml-auto" />
                                    </a>
                                    <ul class="p-2">
                                        <li><a>New File</a></li>
                                        <li><a>New Folder</a></li>
                                        <li><a>New Project</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="flex items-center">
                                        <File class="w-4 h-4" />
                                        Open Recent
                                        <ChevronDown class="w-4 h-4 ml-auto" />
                                    </a>
                                    <ul class="p-2">
                                        <li><a>project-1.txt</a></li>
                                        <li><a>document.md</a></li>
                                        <li><a>notes.txt</a></li>
                                    </ul>
                                </li>
                                <li><div class="divider my-1"></div></li>
                                <li>
                                    <a class="flex items-center">
                                        <Save class="w-4 h-4" />
                                        Save
                                        <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-8 bg-base-100 text-center text-base-content/50">
                    Content with nested menu structure
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Mac-style Menubar -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Mac-style Menubar" 
            description="Apple macOS-inspired menubar with app menu and Command key shortcuts"
            code={macMenubarCode}
        >
            <div class="w-full max-w-4xl border rounded-lg overflow-hidden">
                <div class="navbar bg-base-200 border-b">
                    <div class="navbar-start">
                        <div class="flex">
                            <!-- App Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm font-bold">
                                    MyApp
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            About MyApp
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Settings class="w-4 h-4" />
                                            Preferences
                                            <span class="ml-auto text-xs opacity-60">⌘,</span>
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            Hide MyApp
                                            <span class="ml-auto text-xs opacity-60">⌘H</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            Quit MyApp
                                            <span class="ml-auto text-xs opacity-60">⌘Q</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- File Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    File
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <Plus class="w-4 h-4" />
                                            New
                                            <span class="ml-auto text-xs opacity-60">⌘N</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <File class="w-4 h-4" />
                                            Open
                                            <span class="ml-auto text-xs opacity-60">⌘O</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Save class="w-4 h-4" />
                                            Save
                                            <span class="ml-auto text-xs opacity-60">⌘S</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- Edit Menu -->
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    Edit
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <RotateCcw class="w-4 h-4" />
                                            Undo
                                            <span class="ml-auto text-xs opacity-60">⌘Z</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <RotateCw class="w-4 h-4" />
                                            Redo
                                            <span class="ml-auto text-xs opacity-60">⌘⇧Z</span>
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Copy class="w-4 h-4" />
                                            Copy
                                            <span class="ml-auto text-xs opacity-60">⌘C</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Clipboard class="w-4 h-4" />
                                            Paste
                                            <span class="ml-auto text-xs opacity-60">⌘V</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-8 bg-base-100 text-center text-base-content/50">
                    Mac-style application content
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Contextual Menubar -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Contextual Menubar" 
            description="Smart menubar that enables/disables actions based on application state"
            code={contextualMenubarCode}
        >
            <div class="w-full max-w-2xl border rounded-lg overflow-hidden">
                <div class="navbar bg-base-200 border-b">
                    <div class="navbar-start">
                        <div class="flex">
                            <div class="dropdown dropdown-bottom">
                                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                    Edit
                                </div>
                                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                    <li>
                                        <a class="flex items-center">
                                            <RotateCcw class="w-4 h-4" />
                                            Undo
                                            <span class="ml-auto text-xs opacity-60">Ctrl+Z</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center text-base-content/40 pointer-events-none">
                                            <RotateCw class="w-4 h-4" />
                                            Redo
                                            <span class="ml-auto text-xs opacity-60">Ctrl+Y</span>
                                        </a>
                                    </li>
                                    <li><div class="divider my-1"></div></li>
                                    <li>
                                        <a class="flex items-center">
                                            <Scissors class="w-4 h-4" />
                                            Cut
                                            <span class="ml-auto text-xs opacity-60">Ctrl+X</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Copy class="w-4 h-4" />
                                            Copy
                                            <span class="ml-auto text-xs opacity-60">Ctrl+C</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="flex items-center">
                                            <Clipboard class="w-4 h-4" />
                                            Paste
                                            <span class="ml-auto text-xs opacity-60">Ctrl+V</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-8 bg-base-100">
                    <div class="text-center text-base-content/50 mb-4">
                        Context-aware menu (Redo is disabled)
                    </div>
                    <div class="bg-base-200 p-4 rounded text-center">
                        <span class="bg-primary text-primary-content px-2 py-1 rounded">Selected text</span>
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
                <li>✅ Full keyboard navigation with <kbd class="kbd kbd-sm">Tab</kbd>, <kbd class="kbd kbd-sm">Enter</kbd>, and <kbd class="kbd kbd-sm">Escape</kbd></li>
                <li>✅ ARIA menu and menubar roles for proper screen reader support</li>
                <li>✅ Focus management with proper focus trapping within active menus</li>
                <li>✅ Keyboard shortcuts clearly displayed and announced</li>
                <li>✅ High contrast support for menu items and indicators</li>
                <li>✅ Screen reader announcements for menu state changes</li>
                <li>✅ Support for reduced motion preferences</li>
                <li>✅ Semantic HTML structure with proper roles and relationships</li>
                <li>✅ Compatible with browser zoom up to 200%</li>
                <li>✅ Clear visual focus indicators for all interactive elements</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-12">
            <!-- Text Editor Application -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Text Editor Application</h3>
                <div class="card bg-base-100 border">
                    <div class="navbar bg-base-200 border-b">
                        <div class="navbar-start">
                            <div class="flex">
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        File
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li>
                                            <a class="flex items-center">
                                                <Plus class="w-4 h-4" />
                                                New Document
                                                <span class="ml-auto text-xs opacity-60">Ctrl+N</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="flex items-center">
                                                <File class="w-4 h-4" />
                                                Open
                                                <span class="ml-auto text-xs opacity-60">Ctrl+O</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="flex items-center">
                                                <Save class="w-4 h-4" />
                                                Save
                                                <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
                                            </a>
                                        </li>
                                        <li><div class="divider my-1"></div></li>
                                        <li>
                                            <a class="flex items-center">
                                                <Download class="w-4 h-4" />
                                                Export as PDF
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        Format
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li><a><strong>B</strong> Bold</a></li>
                                        <li><a><em>I</em> Italic</a></li>
                                        <li><a><u>U</u> Underline</a></li>
                                        <li><div class="divider my-1"></div></li>
                                        <li><a>Font Size</a></li>
                                        <li><a>Text Color</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="bg-base-200 h-32 rounded flex items-center justify-center text-base-content/50">
                            Document editing area with text formatting tools
                        </div>
                    </div>
                </div>
            </div>

            <!-- Image Editor Application -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Image Editor Application</h3>
                <div class="card bg-base-100 border">
                    <div class="navbar bg-base-200 border-b">
                        <div class="navbar-start">
                            <div class="flex">
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        File
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li>
                                            <a class="flex items-center">
                                                <Upload class="w-4 h-4" />
                                                Import Image
                                            </a>
                                        </li>
                                        <li>
                                            <a class="flex items-center">
                                                <Download class="w-4 h-4" />
                                                Export
                                                <ChevronDown class="w-4 h-4 ml-auto" />
                                            </a>
                                            <ul class="p-2">
                                                <li><a>Export as PNG</a></li>
                                                <li><a>Export as JPEG</a></li>
                                                <li><a>Export as WebP</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        Filter
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li><a>Blur</a></li>
                                        <li><a>Sharpen</a></li>
                                        <li><a>Brightness/Contrast</a></li>
                                        <li><a>Saturation</a></li>
                                        <li><div class="divider my-1"></div></li>
                                        <li><a>Vintage Effect</a></li>
                                        <li><a>Black & White</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        Transform
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li><a>Rotate 90° CW</a></li>
                                        <li><a>Rotate 90° CCW</a></li>
                                        <li><a>Flip Horizontal</a></li>
                                        <li><a>Flip Vertical</a></li>
                                        <li><div class="divider my-1"></div></li>
                                        <li><a>Crop</a></li>
                                        <li><a>Resize</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="bg-base-200 h-32 rounded flex items-center justify-center text-base-content/50">
                            Image canvas with editing tools and filters
                        </div>
                    </div>
                </div>
            </div>

            <!-- Web Browser Application -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Web Browser Application</h3>
                <div class="card bg-base-100 border">
                    <div class="navbar bg-base-200 border-b">
                        <div class="navbar-start">
                            <div class="flex">
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        File
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li>
                                            <a class="flex items-center">
                                                <Plus class="w-4 h-4" />
                                                New Tab
                                                <span class="ml-auto text-xs opacity-60">Ctrl+T</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="flex items-center">
                                                <Plus class="w-4 h-4" />
                                                New Window
                                                <span class="ml-auto text-xs opacity-60">Ctrl+N</span>
                                            </a>
                                        </li>
                                        <li><div class="divider my-1"></div></li>
                                        <li>
                                            <a class="flex items-center">
                                                <Download class="w-4 h-4" />
                                                Save Page As
                                                <span class="ml-auto text-xs opacity-60">Ctrl+S</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        View
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li>
                                            <a class="flex items-center">
                                                <Plus class="w-4 h-4" />
                                                Zoom In
                                                <span class="ml-auto text-xs opacity-60">Ctrl++</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="flex items-center">
                                                <Minus class="w-4 h-4" />
                                                Zoom Out
                                                <span class="ml-auto text-xs opacity-60">Ctrl+-</span>
                                            </a>
                                        </li>
                                        <li><div class="divider my-1"></div></li>
                                        <li><a>Developer Tools</a></li>
                                        <li><a>View Source</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown dropdown-bottom">
                                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                                        Bookmarks
                                    </div>
                                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-lg">
                                        <li><a>Bookmark This Page</a></li>
                                        <li><a>Bookmark Manager</a></li>
                                        <li><div class="divider my-1"></div></li>
                                        <li><a>Homepage</a></li>
                                        <li><a>Documentation</a></li>
                                        <li><a>GitHub</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="bg-base-200 h-32 rounded flex items-center justify-center text-base-content/50">
                            Web browser content area with navigation and bookmarks
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>