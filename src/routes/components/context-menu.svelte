<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { 
        ArrowLeft, 
        Github, 
        MoreVertical, 
        Copy, 
        Cut, 
        Paste, 
        Edit3, 
        Trash2, 
        Download, 
        Share2, 
        Bookmark, 
        Heart, 
        Star, 
        Eye, 
        EyeOff, 
        Lock, 
        Unlock, 
        FileText, 
        Image, 
        Folder, 
        Play, 
        Pause, 
        RotateCw,
        Info,
        Settings,
        Plus,
        Minus
    } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add context-menu';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  
  let contextMenuVisible = false;
  let contextMenuX = 0;
  let contextMenuY = 0;
  
  function handleRightClick(event) {
    event.preventDefault();
    contextMenuX = event.clientX;
    contextMenuY = event.clientY;
    contextMenuVisible = true;
  }
  
  function hideContextMenu() {
    contextMenuVisible = false;
  }
<\/script>

<!-- Right-click target -->
<div 
  class="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu"
  on:contextmenu={handleRightClick}
>
  Right-click me for context menu
</div>

<!-- Context Menu -->
{#if contextMenuVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {contextMenuX}px; top: {contextMenuY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
      <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
      <li><button class="flex items-center gap-2"><Paste class="w-4 h-4" />Paste</button></li>
      <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Edit</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2 text-error"><Trash2 class="w-4 h-4" />Delete</button></li>
    </div>
  </div>
{/if}

<!-- Click outside to close -->
{#if contextMenuVisible}
  <div class="fixed inset-0 z-40" on:click={hideContextMenu}></div>
{/if}`;

    const textContextCode = `<!-- Text selection context menu -->
<div 
  class="p-6 bg-base-200 rounded-lg select-text"
  on:contextmenu={handleTextRightClick}
>
  <p class="text-lg leading-relaxed">
    Select this text and right-click to see text-specific context menu options.
    You can copy, cut, paste, or perform other text operations.
  </p>
</div>

{#if textContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {textContextX}px; top: {textContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-56 p-2">
      <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
      <li><button class="flex items-center gap-2"><Cut class="w-4 h-4" />Cut</button></li>
      <li><button class="flex items-center gap-2"><Paste class="w-4 h-4" />Paste</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Select All</button></li>
      <li><button class="flex items-center gap-2"><Search class="w-4 h-4" />Find in Page</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2"><Share2 class="w-4 h-4" />Share Text</button></li>
    </div>
  </div>
{/if}`;

    const fileContextCode = `<!-- File/folder context menu -->
<div class="grid grid-cols-2 gap-4">
  <div 
    class="card bg-base-100 border p-4 cursor-context-menu"
    on:contextmenu={(e) => handleFileRightClick(e, 'document')}
  >
    <div class="flex items-center gap-3">
      <FileText class="w-8 h-8 text-primary" />
      <div>
        <h4 class="font-semibold">Document.pdf</h4>
        <p class="text-sm text-base-content/70">2.4 MB</p>
      </div>
    </div>
  </div>
  
  <div 
    class="card bg-base-100 border p-4 cursor-context-menu"
    on:contextmenu={(e) => handleFileRightClick(e, 'folder')}
  >
    <div class="flex items-center gap-3">
      <Folder class="w-8 h-8 text-warning" />
      <div>
        <h4 class="font-semibold">Projects</h4>
        <p class="text-sm text-base-content/70">15 items</p>
      </div>
    </div>
  </div>
</div>

{#if fileContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {fileContextX}px; top: {fileContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
      {#if fileContextType === 'document'}
        <li><button class="flex items-center gap-2"><Eye class="w-4 h-4" />Open</button></li>
        <li><button class="flex items-center gap-2"><Download class="w-4 h-4" />Download</button></li>
        <li><button class="flex items-center gap-2"><Share2 class="w-4 h-4" />Share</button></li>
        <div class="divider my-1"></div>
        <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
        <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Rename</button></li>
        <li><button class="flex items-center gap-2"><Star class="w-4 h-4" />Add to Favorites</button></li>
        <div class="divider my-1"></div>
        <li><button class="flex items-center gap-2 text-error"><Trash2 class="w-4 h-4" />Delete</button></li>
      {:else}
        <li><button class="flex items-center gap-2"><Eye class="w-4 h-4" />Open</button></li>
        <li><button class="flex items-center gap-2"><Plus class="w-4 h-4" />New File</button></li>
        <li><button class="flex items-center gap-2"><Folder class="w-4 h-4" />New Folder</button></li>
        <div class="divider my-1"></div>
        <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
        <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Rename</button></li>
        <li><button class="flex items-center gap-2"><Bookmark class="w-4 h-4" />Bookmark</button></li>
        <div class="divider my-1"></div>
        <li><button class="flex items-center gap-2 text-error"><Trash2 class="w-4 h-4" />Delete</button></li>
      {/if}
    </div>
  </div>
{/if}`;

    const imageContextCode = `<!-- Image context menu -->
<div 
  class="relative inline-block cursor-context-menu"
  on:contextmenu={handleImageRightClick}
>
  <div class="w-64 h-48 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
    <Image class="w-16 h-16 text-white/80" />
  </div>
  <div class="absolute top-2 right-2">
    <button class="btn btn-circle btn-sm bg-black/20 border-none text-white hover:bg-black/40">
      <Heart class="w-4 h-4" />
    </button>
  </div>
</div>

{#if imageContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {imageContextX}px; top: {imageContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-56 p-2">
      <li><button class="flex items-center gap-2"><Eye class="w-4 h-4" />View Full Size</button></li>
      <li><button class="flex items-center gap-2"><Download class="w-4 h-4" />Save Image As...</button></li>
      <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy Image</button></li>
      <li><button class="flex items-center gap-2"><Share2 class="w-4 h-4" />Share Image</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2"><RotateCw class="w-4 h-4" />Rotate Right</button></li>
      <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Edit Image</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2"><Heart class="w-4 h-4" />Add to Favorites</button></li>
      <li><button class="flex items-center gap-2"><Info class="w-4 h-4" />Image Info</button></li>
    </div>
  </div>
{/if}`;

    const keyboardShortcutsCode = `<!-- Context menu with keyboard shortcuts -->
{#if shortcutContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {shortcutContextX}px; top: {shortcutContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-64 p-2">
      <li>
        <button class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <Copy class="w-4 h-4" />Copy
          </span>
          <kbd class="kbd kbd-xs">Ctrl+C</kbd>
        </button>
      </li>
      <li>
        <button class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <Cut class="w-4 h-4" />Cut
          </span>
          <kbd class="kbd kbd-xs">Ctrl+X</kbd>
        </button>
      </li>
      <li>
        <button class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <Paste class="w-4 h-4" />Paste
          </span>
          <kbd class="kbd kbd-xs">Ctrl+V</kbd>
        </button>
      </li>
      <div class="divider my-1"></div>
      <li>
        <button class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <Edit3 class="w-4 h-4" />Select All
          </span>
          <kbd class="kbd kbd-xs">Ctrl+A</kbd>
        </button>
      </li>
      <li>
        <button class="flex items-center justify-between">
          <span class="flex items-center gap-2">
            <RotateCw class="w-4 h-4" />Refresh
          </span>
          <kbd class="kbd kbd-xs">F5</kbd>
        </button>
      </li>
      <div class="divider my-1"></div>
      <li>
        <button class="flex items-center justify-between text-error">
          <span class="flex items-center gap-2">
            <Trash2 class="w-4 h-4" />Delete
          </span>
          <kbd class="kbd kbd-xs">Del</kbd>
        </button>
      </li>
    </div>
  </div>
{/if}`;

    const conditionalMenuCode = `<!-- Conditional menu items based on state -->
<div class="space-y-4">
  <div class="flex items-center gap-4">
    <label class="cursor-pointer label">
      <span class="label-text">Is Favorite</span>
      <input type="checkbox" bind:checked={isFavorite} class="checkbox checkbox-primary" />
    </label>
    <label class="cursor-pointer label">
      <span class="label-text">Is Locked</span>
      <input type="checkbox" bind:checked={isLocked} class="checkbox checkbox-warning" />
    </label>
    <label class="cursor-pointer label">
      <span class="label-text">Is Hidden</span>
      <input type="checkbox" bind:checked={isHidden} class="checkbox checkbox-secondary" />
    </label>
  </div>
  
  <div 
    class="p-6 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu"
    class:opacity-50={isHidden}
    on:contextmenu={handleConditionalRightClick}
  >
    <div class="flex items-center justify-center gap-2">
      {#if isFavorite}<Heart class="w-5 h-5 text-error" />{/if}
      {#if isLocked}<Lock class="w-5 h-5 text-warning" />{/if}
      {#if isHidden}<EyeOff class="w-5 h-5 text-base-content/50" />{/if}
      Right-click for conditional menu
    </div>
  </div>
</div>

{#if conditionalContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {conditionalContextX}px; top: {conditionalContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
      <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
      <li><button class="flex items-center gap-2"><Edit3 class="w-4 h-4" />Edit</button></li>
      <div class="divider my-1"></div>
      
      <!-- Conditional favorite toggle -->
      <li>
        <button 
          class="flex items-center gap-2"
          class:text-error={isFavorite}
          on:click={() => isFavorite = !isFavorite}
        >
          <Heart class="w-4 h-4" class:fill-current={isFavorite} />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </li>
      
      <!-- Conditional lock toggle -->
      <li>
        <button 
          class="flex items-center gap-2"
          class:text-warning={isLocked}
          on:click={() => isLocked = !isLocked}
        >
          {#if isLocked}
            <Unlock class="w-4 h-4" />Unlock
          {:else}
            <Lock class="w-4 h-4" />Lock
          {/if}
        </button>
      </li>
      
      <!-- Conditional visibility toggle -->
      <li>
        <button 
          class="flex items-center gap-2"
          on:click={() => isHidden = !isHidden}
        >
          {#if isHidden}
            <Eye class="w-4 h-4" />Show
          {:else}
            <EyeOff class="w-4 h-4" />Hide
          {/if}
        </button>
      </li>
      
      <div class="divider my-1"></div>
      
      <!-- Delete is disabled if locked -->
      <li>
        <button 
          class="flex items-center gap-2"
          class:text-error={!isLocked}
          class:text-base-content/40={isLocked}
          disabled={isLocked}
        >
          <Trash2 class="w-4 h-4" />Delete
          {#if isLocked}<Lock class="w-3 h-3 ml-auto" />{/if}
        </button>
      </li>
    </div>
  </div>
{/if}`;

    const nestedMenuCode = `<!-- Nested context menu -->
{#if nestedContextVisible}
  <div 
    class="dropdown dropdown-open absolute z-50"
    style="left: {nestedContextX}px; top: {nestedContextY}px;"
  >
    <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
      <li><button class="flex items-center gap-2"><Copy class="w-4 h-4" />Copy</button></li>
      <li><button class="flex items-center gap-2"><Paste class="w-4 h-4" />Paste</button></li>
      <div class="divider my-1"></div>
      
      <!-- Submenu trigger -->
      <li>
        <button 
          class="flex items-center justify-between"
          on:mouseenter={() => showSubmenu = true}
          on:mouseleave={() => showSubmenu = false}
        >
          <span class="flex items-center gap-2">
            <Plus class="w-4 h-4" />New
          </span>
          <span class="text-xs">›</span>
        </button>
      </li>
      
      <li><button class="flex items-center gap-2"><Settings class="w-4 h-4" />Properties</button></li>
      <div class="divider my-1"></div>
      <li><button class="flex items-center gap-2 text-error"><Trash2 class="w-4 h-4" />Delete</button></li>
    </div>
    
    <!-- Submenu -->
    {#if showSubmenu}
      <div 
        class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-48 p-2 absolute"
        style="left: 100%; top: 120px;"
        on:mouseenter={() => showSubmenu = true}
        on:mouseleave={() => showSubmenu = false}
      >
        <li><button class="flex items-center gap-2"><FileText class="w-4 h-4" />Text Document</button></li>
        <li><button class="flex items-center gap-2"><Image class="w-4 h-4" />Image</button></li>
        <li><button class="flex items-center gap-2"><Folder class="w-4 h-4" />Folder</button></li>
        <div class="divider my-1"></div>
        <li><button class="flex items-center gap-2"><Download class="w-4 h-4" />From Template</button></li>
      </div>
    {/if}
  </div>
{/if}`;

    const apiProps = [
        {
            name: 'visible',
            type: 'boolean',
            default: 'false',
            description: 'Controls visibility of the context menu'
        },
        {
            name: 'x',
            type: 'number',
            default: '0',
            description: 'Horizontal position in pixels from left edge'
        },
        {
            name: 'y',
            type: 'number',
            default: '0',
            description: 'Vertical position in pixels from top edge'
        },
        {
            name: 'items',
            type: 'ContextMenuItem[]',
            default: '[]',
            description: 'Array of menu items to display'
        },
        {
            name: 'onItemClick',
            type: '(item: ContextMenuItem) => void',
            default: 'undefined',
            description: 'Callback function when menu item is clicked'
        },
        {
            name: 'onClose',
            type: '() => void',
            default: 'undefined',
            description: 'Callback function when menu is closed'
        },
        {
            name: 'className',
            type: 'string',
            default: "''",
            description: 'Additional CSS classes for the menu container'
        },
        {
            name: 'boundaryElement',
            type: 'HTMLElement',
            default: 'document.body',
            description: 'Element used for boundary calculations'
        },
        {
            name: 'offset',
            type: '{ x: number, y: number }',
            default: '{ x: 0, y: 0 }',
            description: 'Offset adjustment for menu positioning'
        },
        {
            name: 'preventBoundaryOverflow',
            type: 'boolean',
            default: 'true',
            description: 'Automatically adjust position to stay within viewport'
        }
    ];

    // Context menu state management
    let contextMenuVisible = false;
    let contextMenuX = 0;
    let contextMenuY = 0;

    let textContextVisible = false;
    let textContextX = 0;
    let textContextY = 0;

    let fileContextVisible = false;
    let fileContextX = 0;
    let fileContextY = 0;
    let fileContextType = 'document';

    let imageContextVisible = false;
    let imageContextX = 0;
    let imageContextY = 0;

    let shortcutContextVisible = false;
    let shortcutContextX = 0;
    let shortcutContextY = 0;

    let conditionalContextVisible = false;
    let conditionalContextX = 0;
    let conditionalContextY = 0;

    let nestedContextVisible = false;
    let nestedContextX = 0;
    let nestedContextY = 0;
    let showSubmenu = false;

    // State for conditional menu
    let isFavorite = false;
    let isLocked = false;
    let isHidden = false;

    function handleRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 208; // Approximate menu width
        const menuHeight = 200; // Approximate menu height
        
        let x = event.clientX;
        let y = event.clientY;
        
        // Adjust position if menu would overflow viewport
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        contextMenuX = x;
        contextMenuY = y;
        contextMenuVisible = true;
    }

    function handleTextRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 224;
        const menuHeight = 250;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        textContextX = x;
        textContextY = y;
        textContextVisible = true;
    }

    function handleFileRightClick(event: MouseEvent, type: string) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 208;
        const menuHeight = 280;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        fileContextX = x;
        fileContextY = y;
        fileContextType = type;
        fileContextVisible = true;
    }

    function handleImageRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 224;
        const menuHeight = 300;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        imageContextX = x;
        imageContextY = y;
        imageContextVisible = true;
    }

    function handleShortcutRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 256;
        const menuHeight = 250;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        shortcutContextX = x;
        shortcutContextY = y;
        shortcutContextVisible = true;
    }

    function handleConditionalRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 208;
        const menuHeight = 300;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        conditionalContextX = x;
        conditionalContextY = y;
        conditionalContextVisible = true;
    }

    function handleNestedRightClick(event: MouseEvent) {
        event.preventDefault();
        hideAllMenus();
        
        const rect = document.documentElement.getBoundingClientRect();
        const menuWidth = 208;
        const menuHeight = 250;
        
        let x = event.clientX;
        let y = event.clientY;
        
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        nestedContextX = x;
        nestedContextY = y;
        nestedContextVisible = true;
    }

    function hideAllMenus() {
        contextMenuVisible = false;
        textContextVisible = false;
        fileContextVisible = false;
        imageContextVisible = false;
        shortcutContextVisible = false;
        conditionalContextVisible = false;
        nestedContextVisible = false;
        showSubmenu = false;
    }

    function handleAction(action: string) {
        console.log(`Action performed: ${action}`);
        hideAllMenus();
    }
</script>

<svelte:head>
    <title>Context Menu - NUI Components</title>
    <meta name="description" content="Context Menu component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Context Menu</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Context Menu</h1>
                <p class="text-xl text-base-content/70">
                    Right-click context menu component for displaying contextual actions and options based on user interactions.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/context-menu"
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
            title="Basic Context Menu" 
            description="Simple right-click context menu with basic actions"
            code={basicUsage}
        >
            <div 
                class="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu"
                on:contextmenu={handleRightClick}
            >
                <MoreVertical class="w-8 h-8 mx-auto mb-2 text-base-content/50" />
                Right-click me for context menu
            </div>
        </ComponentShowcase>
    </div>

    <!-- Text Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Text Context Menu" 
            description="Context menu specialized for text selection and editing operations"
            code={textContextCode}
        >
            <div 
                class="p-6 bg-base-200 rounded-lg select-text cursor-context-menu"
                on:contextmenu={handleTextRightClick}
            >
                <p class="text-lg leading-relaxed">
                    Select this text and right-click to see text-specific context menu options.
                    You can copy, cut, paste, or perform other text operations. The menu includes 
                    common keyboard shortcuts for quick reference.
                </p>
            </div>
        </ComponentShowcase>
    </div>

    <!-- File Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="File Context Menu" 
            description="Different context menus for files and folders with appropriate actions"
            code={fileContextCode}
        >
            <div class="grid grid-cols-2 gap-4">
                <div 
                    class="card bg-base-100 border p-4 cursor-context-menu hover:shadow-md transition-shadow"
                    on:contextmenu={(e) => handleFileRightClick(e, 'document')}
                >
                    <div class="flex items-center gap-3">
                        <FileText class="w-8 h-8 text-primary" />
                        <div>
                            <h4 class="font-semibold">Document.pdf</h4>
                            <p class="text-sm text-base-content/70">2.4 MB</p>
                        </div>
                    </div>
                </div>
                
                <div 
                    class="card bg-base-100 border p-4 cursor-context-menu hover:shadow-md transition-shadow"
                    on:contextmenu={(e) => handleFileRightClick(e, 'folder')}
                >
                    <div class="flex items-center gap-3">
                        <Folder class="w-8 h-8 text-warning" />
                        <div>
                            <h4 class="font-semibold">Projects</h4>
                            <p class="text-sm text-base-content/70">15 items</p>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Image Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Image Context Menu" 
            description="Context menu for images with image-specific actions like save, rotate, and view"
            code={imageContextCode}
        >
            <div class="flex justify-center">
                <div 
                    class="relative inline-block cursor-context-menu"
                    on:contextmenu={handleImageRightClick}
                >
                    <div class="w-64 h-48 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Image class="w-16 h-16 text-white/80" />
                    </div>
                    <div class="absolute top-2 right-2">
                        <button class="btn btn-circle btn-sm bg-black/20 border-none text-white hover:bg-black/40">
                            <Heart class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Keyboard Shortcuts -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Context Menu with Keyboard Shortcuts" 
            description="Context menu displaying keyboard shortcuts for better accessibility"
            code={keyboardShortcutsCode}
        >
            <div 
                class="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu"
                on:contextmenu={handleShortcutRightClick}
            >
                <div class="flex items-center justify-center gap-2 mb-2">
                    <kbd class="kbd kbd-sm">Ctrl</kbd>
                    <span>+</span>
                    <kbd class="kbd kbd-sm">Right Click</kbd>
                </div>
                Right-click to see shortcuts
            </div>
        </ComponentShowcase>
    </div>

    <!-- Conditional Menu Items -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Conditional Menu Items" 
            description="Context menu that changes based on current state and conditions"
            code={conditionalMenuCode}
        >
            <div class="space-y-4">
                <div class="flex flex-wrap items-center gap-4">
                    <label class="cursor-pointer label">
                        <span class="label-text mr-2">Is Favorite</span>
                        <input type="checkbox" bind:checked={isFavorite} class="checkbox checkbox-primary" />
                    </label>
                    <label class="cursor-pointer label">
                        <span class="label-text mr-2">Is Locked</span>
                        <input type="checkbox" bind:checked={isLocked} class="checkbox checkbox-warning" />
                    </label>
                    <label class="cursor-pointer label">
                        <span class="label-text mr-2">Is Hidden</span>
                        <input type="checkbox" bind:checked={isHidden} class="checkbox checkbox-secondary" />
                    </label>
                </div>
                
                <div 
                    class="p-6 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu transition-opacity"
                    class:opacity-50={isHidden}
                    on:contextmenu={handleConditionalRightClick}
                >
                    <div class="flex items-center justify-center gap-2">
                        {#if isFavorite}<Heart class="w-5 h-5 text-error fill-current" />{/if}
                        {#if isLocked}<Lock class="w-5 h-5 text-warning" />{/if}
                        {#if isHidden}<EyeOff class="w-5 h-5 text-base-content/50" />{/if}
                        Right-click for conditional menu
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Context Menu" 
            description="Context menu with submenu support for organized hierarchical actions"
            code={nestedMenuCode}
        >
            <div 
                class="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu"
                on:contextmenu={handleNestedRightClick}
            >
                <div class="flex items-center justify-center gap-2 mb-2">
                    <MoreVertical class="w-6 h-6 text-base-content/50" />
                    <span class="text-xs">›</span>
                    <MoreVertical class="w-4 h-4 text-base-content/30" />
                </div>
                Right-click for nested menu
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Arrow Keys</kbd> and <kbd class="kbd kbd-sm">Enter</kbd></li>
                <li>✅ Includes proper ARIA attributes and menu role</li>
                <li>✅ Maintains focus management within menu</li>
                <li>✅ Closes on <kbd class="kbd kbd-sm">Escape</kbd> key press</li>
                <li>✅ Compatible with screen readers</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Menu items are focusable and activatable</li>
                <li>✅ Automatic boundary detection and repositioning</li>
                <li>✅ Click outside to close functionality</li>
                <li>✅ Keyboard shortcuts displayed for reference</li>
            </ul>
        </div>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Content Management -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Content Management</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Article: "Getting Started with NUI"</h4>
                        <p class="text-sm text-base-content/70 mb-4">Last modified: 2 hours ago</p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="badge badge-success">Published</span>
                                <span class="badge badge-outline">Featured</span>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-ghost btn-sm">
                                    <Eye class="w-4 h-4 mr-2" />
                                    Preview
                                </button>
                                <button class="btn btn-ghost btn-sm">
                                    <Edit3 class="w-4 h-4 mr-2" />
                                    Edit
                                </button>
                                <button class="btn btn-ghost btn-sm">
                                    <MoreVertical class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- File Browser -->
            <div>
                <h3 class="text-lg font-semibold mb-4">File Browser</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">File Explorer</h4>
                        <div class="grid grid-cols-4 gap-4 mt-4">
                            <div class="flex flex-col items-center p-3 rounded hover:bg-base-200">
                                <Folder class="w-12 h-12 text-warning mb-2" />
                                <span class="text-sm">Documents</span>
                            </div>
                            <div class="flex flex-col items-center p-3 rounded hover:bg-base-200">
                                <Image class="w-12 h-12 text-success mb-2" />
                                <span class="text-sm">photo.jpg</span>
                            </div>
                            <div class="flex flex-col items-center p-3 rounded hover:bg-base-200">
                                <FileText class="w-12 h-12 text-primary mb-2" />
                                <span class="text-sm">report.pdf</span>
                            </div>
                            <div class="flex flex-col items-center p-3 rounded hover:bg-base-200">
                                <Play class="w-12 h-12 text-secondary mb-2" />
                                <span class="text-sm">video.mp4</span>
                            </div>
                        </div>
                        <p class="text-xs text-base-content/60 mt-4">Right-click items for context menu</p>
                    </div>
                </div>
            </div>

            <!-- User Management -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Management</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Team Members</h4>
                        <div class="space-y-3 mt-4">
                            <div class="flex items-center justify-between p-3 rounded hover:bg-base-200">
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div class="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                            J
                                        </div>
                                    </div>
                                    <div>
                                        <p class="font-medium">John Doe</p>
                                        <p class="text-sm text-base-content/70">john@example.com</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="badge badge-primary">Admin</span>
                                    <button class="btn btn-ghost btn-sm">
                                        <MoreVertical class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Context Menu Implementations -->

<!-- Basic Context Menu -->
{#if contextMenuVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {contextMenuX}px; top: {contextMenuY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
            <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                <Copy class="w-4 h-4" />Copy
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('paste')}>
                <Paste class="w-4 h-4" />Paste
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('edit')}>
                <Edit3 class="w-4 h-4" />Edit
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2 text-error" on:click={() => handleAction('delete')}>
                <Trash2 class="w-4 h-4" />Delete
            </button></li>
        </div>
    </div>
{/if}

<!-- Text Context Menu -->
{#if textContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {textContextX}px; top: {textContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-56 p-2">
            <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                <Copy class="w-4 h-4" />Copy
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('cut')}>
                <Cut class="w-4 h-4" />Cut
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('paste')}>
                <Paste class="w-4 h-4" />Paste
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('selectAll')}>
                <Edit3 class="w-4 h-4" />Select All
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('find')}>
                <Eye class="w-4 h-4" />Find in Page
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('share')}>
                <Share2 class="w-4 h-4" />Share Text
            </button></li>
        </div>
    </div>
{/if}

<!-- File Context Menu -->
{#if fileContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {fileContextX}px; top: {fileContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
            {#if fileContextType === 'document'}
                <li><button class="flex items-center gap-2" on:click={() => handleAction('open')}>
                    <Eye class="w-4 h-4" />Open
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('download')}>
                    <Download class="w-4 h-4" />Download
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('share')}>
                    <Share2 class="w-4 h-4" />Share
                </button></li>
                <div class="divider my-1"></div>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                    <Copy class="w-4 h-4" />Copy
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('rename')}>
                    <Edit3 class="w-4 h-4" />Rename
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('favorite')}>
                    <Star class="w-4 h-4" />Add to Favorites
                </button></li>
                <div class="divider my-1"></div>
                <li><button class="flex items-center gap-2 text-error" on:click={() => handleAction('delete')}>
                    <Trash2 class="w-4 h-4" />Delete
                </button></li>
            {:else}
                <li><button class="flex items-center gap-2" on:click={() => handleAction('open')}>
                    <Eye class="w-4 h-4" />Open
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('newFile')}>
                    <Plus class="w-4 h-4" />New File
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('newFolder')}>
                    <Folder class="w-4 h-4" />New Folder
                </button></li>
                <div class="divider my-1"></div>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                    <Copy class="w-4 h-4" />Copy
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('rename')}>
                    <Edit3 class="w-4 h-4" />Rename
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('bookmark')}>
                    <Bookmark class="w-4 h-4" />Bookmark
                </button></li>
                <div class="divider my-1"></div>
                <li><button class="flex items-center gap-2 text-error" on:click={() => handleAction('delete')}>
                    <Trash2 class="w-4 h-4" />Delete
                </button></li>
            {/if}
        </div>
    </div>
{/if}

<!-- Image Context Menu -->
{#if imageContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {imageContextX}px; top: {imageContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-56 p-2">
            <li><button class="flex items-center gap-2" on:click={() => handleAction('viewFull')}>
                <Eye class="w-4 h-4" />View Full Size
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('saveAs')}>
                <Download class="w-4 h-4" />Save Image As...
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('copyImage')}>
                <Copy class="w-4 h-4" />Copy Image
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('shareImage')}>
                <Share2 class="w-4 h-4" />Share Image
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('rotate')}>
                <RotateCw class="w-4 h-4" />Rotate Right
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('editImage')}>
                <Edit3 class="w-4 h-4" />Edit Image
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('addToFavorites')}>
                <Heart class="w-4 h-4" />Add to Favorites
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('imageInfo')}>
                <Info class="w-4 h-4" />Image Info
            </button></li>
        </div>
    </div>
{/if}

<!-- Keyboard Shortcuts Context Menu -->
{#if shortcutContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {shortcutContextX}px; top: {shortcutContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-64 p-2">
            <li>
                <button class="flex items-center justify-between" on:click={() => handleAction('copy')}>
                    <span class="flex items-center gap-2">
                        <Copy class="w-4 h-4" />Copy
                    </span>
                    <kbd class="kbd kbd-xs">Ctrl+C</kbd>
                </button>
            </li>
            <li>
                <button class="flex items-center justify-between" on:click={() => handleAction('cut')}>
                    <span class="flex items-center gap-2">
                        <Cut class="w-4 h-4" />Cut
                    </span>
                    <kbd class="kbd kbd-xs">Ctrl+X</kbd>
                </button>
            </li>
            <li>
                <button class="flex items-center justify-between" on:click={() => handleAction('paste')}>
                    <span class="flex items-center gap-2">
                        <Paste class="w-4 h-4" />Paste
                    </span>
                    <kbd class="kbd kbd-xs">Ctrl+V</kbd>
                </button>
            </li>
            <div class="divider my-1"></div>
            <li>
                <button class="flex items-center justify-between" on:click={() => handleAction('selectAll')}>
                    <span class="flex items-center gap-2">
                        <Edit3 class="w-4 h-4" />Select All
                    </span>
                    <kbd class="kbd kbd-xs">Ctrl+A</kbd>
                </button>
            </li>
            <li>
                <button class="flex items-center justify-between" on:click={() => handleAction('refresh')}>
                    <span class="flex items-center gap-2">
                        <RotateCw class="w-4 h-4" />Refresh
                    </span>
                    <kbd class="kbd kbd-xs">F5</kbd>
                </button>
            </li>
            <div class="divider my-1"></div>
            <li>
                <button class="flex items-center justify-between text-error" on:click={() => handleAction('delete')}>
                    <span class="flex items-center gap-2">
                        <Trash2 class="w-4 h-4" />Delete
                    </span>
                    <kbd class="kbd kbd-xs">Del</kbd>
                </button>
            </li>
        </div>
    </div>
{/if}

<!-- Conditional Context Menu -->
{#if conditionalContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {conditionalContextX}px; top: {conditionalContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
            <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                <Copy class="w-4 h-4" />Copy
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('edit')}>
                <Edit3 class="w-4 h-4" />Edit
            </button></li>
            <div class="divider my-1"></div>
            
            <!-- Conditional favorite toggle -->
            <li>
                <button 
                    class="flex items-center gap-2"
                    class:text-error={isFavorite}
                    on:click={() => {
                        isFavorite = !isFavorite;
                        handleAction(isFavorite ? 'addToFavorites' : 'removeFromFavorites');
                    }}
                >
                    <Heart class="w-4 h-4" class:fill-current={isFavorite} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </li>
            
            <!-- Conditional lock toggle -->
            <li>
                <button 
                    class="flex items-center gap-2"
                    class:text-warning={isLocked}
                    on:click={() => {
                        isLocked = !isLocked;
                        handleAction(isLocked ? 'lock' : 'unlock');
                    }}
                >
                    {#if isLocked}
                        <Unlock class="w-4 h-4" />Unlock
                    {:else}
                        <Lock class="w-4 h-4" />Lock
                    {/if}
                </button>
            </li>
            
            <!-- Conditional visibility toggle -->
            <li>
                <button 
                    class="flex items-center gap-2"
                    on:click={() => {
                        isHidden = !isHidden;
                        handleAction(isHidden ? 'hide' : 'show');
                    }}
                >
                    {#if isHidden}
                        <Eye class="w-4 h-4" />Show
                    {:else}
                        <EyeOff class="w-4 h-4" />Hide
                    {/if}
                </button>
            </li>
            
            <div class="divider my-1"></div>
            
            <!-- Delete is disabled if locked -->
            <li>
                <button 
                    class="flex items-center gap-2"
                    class:text-error={!isLocked}
                    class:text-base-content/40={isLocked}
                    disabled={isLocked}
                    on:click={() => handleAction('delete')}
                >
                    <Trash2 class="w-4 h-4" />Delete
                    {#if isLocked}<Lock class="w-3 h-3 ml-auto" />{/if}
                </button>
            </li>
        </div>
    </div>
{/if}

<!-- Nested Context Menu -->
{#if nestedContextVisible}
    <div 
        class="dropdown dropdown-open absolute z-50"
        style="left: {nestedContextX}px; top: {nestedContextY}px;"
    >
        <div class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2">
            <li><button class="flex items-center gap-2" on:click={() => handleAction('copy')}>
                <Copy class="w-4 h-4" />Copy
            </button></li>
            <li><button class="flex items-center gap-2" on:click={() => handleAction('paste')}>
                <Paste class="w-4 h-4" />Paste
            </button></li>
            <div class="divider my-1"></div>
            
            <!-- Submenu trigger -->
            <li>
                <button 
                    class="flex items-center justify-between"
                    on:mouseenter={() => showSubmenu = true}
                    on:mouseleave={() => showSubmenu = false}
                    on:click={() => handleAction('new')}
                >
                    <span class="flex items-center gap-2">
                        <Plus class="w-4 h-4" />New
                    </span>
                    <span class="text-xs">›</span>
                </button>
            </li>
            
            <li><button class="flex items-center gap-2" on:click={() => handleAction('properties')}>
                <Settings class="w-4 h-4" />Properties
            </button></li>
            <div class="divider my-1"></div>
            <li><button class="flex items-center gap-2 text-error" on:click={() => handleAction('delete')}>
                <Trash2 class="w-4 h-4" />Delete
            </button></li>
        </div>
        
        <!-- Submenu -->
        {#if showSubmenu}
            <div 
                class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-48 p-2 absolute"
                style="left: 100%; top: 120px;"
                on:mouseenter={() => showSubmenu = true}
                on:mouseleave={() => showSubmenu = false}
            >
                <li><button class="flex items-center gap-2" on:click={() => handleAction('newDocument')}>
                    <FileText class="w-4 h-4" />Text Document
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('newImage')}>
                    <Image class="w-4 h-4" />Image
                </button></li>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('newFolder')}>
                    <Folder class="w-4 h-4" />Folder
                </button></li>
                <div class="divider my-1"></div>
                <li><button class="flex items-center gap-2" on:click={() => handleAction('fromTemplate')}>
                    <Download class="w-4 h-4" />From Template
                </button></li>
            </div>
        {/if}
    </div>
{/if}

<!-- Click outside to close -->
{#if contextMenuVisible || textContextVisible || fileContextVisible || imageContextVisible || shortcutContextVisible || conditionalContextVisible || nestedContextVisible}
    <div class="fixed inset-0 z-40" on:click={hideAllMenus}></div>
{/if}

<svelte:head>
    <title>Context Menu - NUI Components</title>
    <meta name="description" content="Context menu component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Context Menu</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Context Menu</h1>
                <p class="text-xl text-base-content/70">
                    Right-click context menus for enhanced user interactions and quick access to actions.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/context-menu"
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
            title="Basic Context Menu" 
            description="Right-click to open a context menu with various actions"
            code={basicUsage}
        >
            <div class="space-y-4">
                <div 
                    class="card bg-base-200 p-8 text-center cursor-pointer select-none"
                    on:contextmenu={handleRightClick}
                >
                    <p class="text-lg">Right-click here to open context menu</p>
                    <p class="text-sm text-base-content/70 mt-2">Try right-clicking anywhere in this area</p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Text Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Text Context Menu" 
            description="Context menu optimized for text selection and editing operations"
            code={textContextCode}
        >
            <div class="space-y-4">
                <div 
                    class="card bg-base-100 border p-6"
                    on:contextmenu={handleTextRightClick}
                >
                    <h4 class="font-semibold mb-2">Editable Text Area</h4>
                    <p class="leading-relaxed">
                        This is some sample text that you can interact with. Right-click on this text 
                        to see text-specific context menu options like copy, cut, paste, and formatting.
                    </p>
                    <p class="mt-4 text-base-content/70">
                        The context menu will show appropriate options based on whether text is selected.
                    </p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- File Context Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="File Context Menu" 
            description="Context menu for file operations and management"
            code={fileContextCode}
        >
            <div class="space-y-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div 
                        class="card bg-base-100 border p-4 text-center cursor-pointer hover:bg-base-200 transition-colors"
                        on:contextmenu={handleFileRightClick}
                    >
                        <FileText class="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <p class="text-sm font-medium">Document.txt</p>
                        <p class="text-xs text-base-content/70">2.1 KB</p>
                    </div>
                    
                    <div 
                        class="card bg-base-100 border p-4 text-center cursor-pointer hover:bg-base-200 transition-colors"
                        on:contextmenu={handleImageRightClick}
                    >
                        <Image class="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <p class="text-sm font-medium">Photo.jpg</p>
                        <p class="text-xs text-base-content/70">1.8 MB</p>
                    </div>

                    <div 
                        class="card bg-base-100 border p-4 text-center cursor-pointer hover:bg-base-200 transition-colors"
                        on:contextmenu={handleFileRightClick}
                    >
                        <Folder class="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                        <p class="text-sm font-medium">Projects</p>
                        <p class="text-xs text-base-content/70">12 items</p>
                    </div>

                    <div 
                        class="card bg-base-100 border p-4 text-center cursor-pointer hover:bg-base-200 transition-colors"
                        on:contextmenu={handleFileRightClick}
                    >
                        <FileText class="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <p class="text-sm font-medium">Readme.md</p>
                        <p class="text-xs text-base-content/70">856 B</p>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Keyboard Shortcuts -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="With Keyboard Shortcuts" 
            description="Context menu displaying keyboard shortcuts for each action"
            code={keyboardShortcutsCode}
        >
            <div class="space-y-4">
                <div 
                    class="card bg-base-200 p-8 text-center cursor-pointer select-none"
                    on:contextmenu={handleShortcutRightClick}
                >
                    <p class="text-lg">Right-click to see shortcuts</p>
                    <p class="text-sm text-base-content/70 mt-2">Each menu item shows its keyboard shortcut</p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Conditional Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Conditional Menu Items" 
            description="Menu items that appear conditionally based on context or state"
            code={conditionalMenuCode}
        >
            <div class="space-y-4">
                <div class="flex gap-4 mb-4">
                    <label class="cursor-pointer label">
                        <span class="label-text mr-2">Show admin options:</span>
                        <input type="checkbox" class="checkbox checkbox-sm" bind:checked={isAdmin} />
                    </label>
                    <label class="cursor-pointer label">
                        <span class="label-text mr-2">Item selected:</span>
                        <input type="checkbox" class="checkbox checkbox-sm" bind:checked={hasSelection} />
                    </label>
                </div>
                
                <div 
                    class="card bg-base-100 border p-8 text-center cursor-pointer"
                    on:contextmenu={handleConditionalRightClick}
                >
                    <p class="text-lg">Right-click to see conditional menu</p>
                    <p class="text-sm text-base-content/70 mt-2">
                        Admin: {isAdmin ? 'Yes' : 'No'} | Selection: {hasSelection ? 'Yes' : 'No'}
                    </p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Nested Menu -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Nested Submenus" 
            description="Context menu with nested submenus for organizing related actions"
            code={nestedMenuCode}
        >
            <div class="space-y-4">
                <div 
                    class="card bg-base-200 p-8 text-center cursor-pointer select-none"
                    on:contextmenu={handleNestedRightClick}
                >
                    <p class="text-lg">Right-click for nested menu</p>
                    <p class="text-sm text-base-content/70 mt-2">Hover over "New" to see submenu</p>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Common Use Cases -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- File Manager -->
            <div>
                <h3 class="text-lg font-semibold mb-4">File Manager Interface</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title mb-4">My Documents</h4>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleFileRightClick}
                            >
                                <Folder class="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                <p class="text-xs">Downloads</p>
                            </div>
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleFileRightClick}
                            >
                                <FileText class="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                <p class="text-xs">Report.pdf</p>
                            </div>
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleImageRightClick}
                            >
                                <Image class="w-8 h-8 mx-auto mb-2 text-green-500" />
                                <p class="text-xs">vacation.jpg</p>
                            </div>
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleFileRightClick}
                            >
                                <Folder class="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                                <p class="text-xs">Projects</p>
                            </div>
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleFileRightClick}
                            >
                                <FileText class="w-8 h-8 mx-auto mb-2 text-red-500" />
                                <p class="text-xs">notes.txt</p>
                            </div>
                            <div 
                                class="text-center p-3 rounded hover:bg-base-200 cursor-pointer"
                                on:contextmenu={handleFileRightClick}
                            >
                                <FileText class="w-8 h-8 mx-auto mb-2 text-purple-500" />
                                <p class="text-xs">config.json</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Editor -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Content Editor</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div 
                            class="min-h-48 p-4 border border-base-300 rounded-lg focus:outline-none focus:border-primary"
                            contenteditable="true"
                            on:contextmenu={handleTextRightClick}
                        >
                            <h4 class="font-bold mb-2">Sample Document</h4>
                            <p class="mb-4">
                                This is a rich text editor interface. You can right-click anywhere 
                                in this editable area to access text formatting options, clipboard 
                                operations, and other editing tools.
                            </p>
                            <p>
                                Try selecting some text and right-clicking to see context-specific 
                                menu options. The menu will adapt based on your current selection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>