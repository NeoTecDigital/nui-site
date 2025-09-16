<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, User, Users } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add avatar';

    const basicUsage = `<script>
  import { Avatar } from '@nui/core';
<\/script>

<div class="avatar">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>`;

    const sizesCode = `<div class="avatar">
  <div class="w-8 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-16 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-32 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>`;

    const shapesCode = `<!-- Circular (default) -->
<div class="avatar">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<!-- Square -->
<div class="avatar">
  <div class="w-24">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<!-- Rounded Square -->
<div class="avatar">
  <div class="w-24 rounded-xl">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>`;

    const placeholderCode = `<!-- With initials -->
<div class="avatar placeholder">
  <div class="bg-neutral text-neutral-content w-24 rounded-full">
    <span class="text-xl">JD</span>
  </div>
</div>

<!-- With icon -->
<div class="avatar placeholder">
  <div class="bg-neutral text-neutral-content w-24 rounded-full">
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
</div>

<!-- Colored backgrounds -->
<div class="avatar placeholder">
  <div class="bg-primary text-primary-content w-24 rounded-full">
    <span class="text-xl">AL</span>
  </div>
</div>

<div class="avatar placeholder">
  <div class="bg-secondary text-secondary-content w-24 rounded-full">
    <span class="text-xl">MK</span>
  </div>
</div>`;

    const groupCode = `<div class="avatar-group -space-x-6 rtl:space-x-reverse">
  <div class="avatar">
    <div class="w-12 rounded-full">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12 rounded-full">
      <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12 rounded-full">
      <img src="https://img.daisyui.com/images/stock/photo-1494790108755-2616c90d4190.webp" />
    </div>
  </div>
  <div class="avatar placeholder">
    <div class="w-12 bg-neutral text-neutral-content rounded-full">
      <span>+99</span>
    </div>
  </div>
</div>`;

    const indicatorCode = `<!-- Online indicator -->
<div class="avatar online">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<!-- Offline indicator -->
<div class="avatar offline">
  <div class="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" />
  </div>
</div>`;

    const ringCode = `<div class="avatar">
  <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" />
  </div>
</div>

<div class="avatar">
  <div class="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1494790108755-2616c90d4190.webp" />
  </div>
</div>`;

    const apiProps = [
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'w-{size}'",
            default: "'md'",
            description: 'Size of the avatar (xs=w-8, sm=w-12, md=w-16, lg=w-24, xl=w-32)'
        },
        {
            name: 'shape',
            type: "'circle' | 'square' | 'rounded'",
            default: "'circle'",
            description: 'Shape of the avatar (circle=rounded-full, square=no rounding, rounded=rounded corners)'
        },
        {
            name: 'online',
            type: 'boolean',
            default: 'false',
            description: 'Shows online indicator dot'
        },
        {
            name: 'offline',
            type: 'boolean',
            default: 'false',
            description: 'Shows offline indicator dot'
        },
        {
            name: 'placeholder',
            type: 'boolean',
            default: 'false',
            description: 'Use placeholder styling for initials or icons'
        },
        {
            name: 'ring',
            type: 'boolean',
            default: 'false',
            description: 'Adds ring border around avatar'
        },
        {
            name: 'ringColor',
            type: "'primary' | 'secondary' | 'accent' | 'neutral'",
            default: "'primary'",
            description: 'Color of the ring border'
        }
    ];
</script>

<svelte:head>
    <title>Avatar - NUI Components</title>
    <meta name="description" content="Avatar component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Avatar</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Avatar</h1>
                <p class="text-xl text-base-content/70">
                    User profile image component with support for placeholders, indicators, and grouping.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/avatar"
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
            description="Simple avatar with user image"
            code={basicUsage}
        >
            <div class="avatar">
                <div class="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different avatar sizes from extra small to extra large"
            code={sizesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="avatar">
                    <div class="w-8 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="XS avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="SM avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-16 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="MD avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="LG avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-32 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="XL avatar" />
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Shapes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Shapes" 
            description="Different avatar shapes - circular, square, and rounded"
            code={shapesCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Circular avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-24">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Square avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-24 rounded-xl">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Rounded avatar" />
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Placeholder/Initials -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Placeholder & Initials" 
            description="Avatar placeholders with initials, icons, or colored backgrounds"
            code={placeholderCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-24 rounded-full">
                        <span class="text-xl">JD</span>
                    </div>
                </div>
                <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-24 rounded-full">
                        <User class="w-6 h-6" />
                    </div>
                </div>
                <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content w-24 rounded-full">
                        <span class="text-xl">AL</span>
                    </div>
                </div>
                <div class="avatar placeholder">
                    <div class="bg-secondary text-secondary-content w-24 rounded-full">
                        <span class="text-xl">MK</span>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Avatar Groups -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Avatar Groups" 
            description="Grouped avatars with overlapping layout for team displays"
            code={groupCode}
        >
            <div class="avatar-group -space-x-6 rtl:space-x-reverse">
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Team member 1" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" alt="Team member 2" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1494790108755-2616c90d4190.webp" alt="Team member 3" />
                    </div>
                </div>
                <div class="avatar placeholder">
                    <div class="w-12 bg-neutral text-neutral-content rounded-full">
                        <span>+99</span>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Online/Offline Indicators -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Status Indicators" 
            description="Avatar with online/offline status indicators"
            code={indicatorCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="avatar online">
                    <div class="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Online user" />
                    </div>
                </div>
                <div class="avatar offline">
                    <div class="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" alt="Offline user" />
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Ring Borders -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Ring Borders" 
            description="Avatar with decorative ring borders in various colors"
            code={ringCode}
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="avatar">
                    <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Primary ring avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" alt="Secondary ring avatar" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1494790108755-2616c90d4190.webp" alt="Accent ring avatar" />
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
                <li>✅ Images include descriptive <code>alt</code> attributes for screen readers</li>
                <li>✅ Placeholder avatars include meaningful text or ARIA labels</li>
                <li>✅ Status indicators are announced to assistive technologies</li>
                <li>✅ Maintains appropriate color contrast ratios</li>
                <li>✅ Supports high contrast mode</li>
                <li>✅ Scales properly with browser zoom levels</li>
                <li>✅ Group avatars include semantic markup for team context</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- User Profile Header -->
            <div>
                <h3 class="text-lg font-semibold mb-4">User Profile Header</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <div class="flex items-center space-x-4">
                            <div class="avatar online">
                                <div class="w-16 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile picture" />
                                </div>
                            </div>
                            <div>
                                <h4 class="card-title">Jane Doe</h4>
                                <p class="text-sm text-base-content/70">Software Engineer</p>
                                <div class="badge badge-success badge-sm">Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Members List -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Team Members</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title mb-4">
                            <Users class="w-5 h-5" />
                            Project Team (4 members)
                        </h4>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="avatar online">
                                        <div class="w-10 rounded-full">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Sarah" />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="font-medium">Sarah Wilson</p>
                                        <p class="text-xs text-base-content/70">Team Lead</p>
                                    </div>
                                </div>
                                <div class="badge badge-success badge-xs">Online</div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="avatar offline">
                                        <div class="w-10 rounded-full">
                                            <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" alt="Mike" />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="font-medium">Mike Johnson</p>
                                        <p class="text-xs text-base-content/70">Developer</p>
                                    </div>
                                </div>
                                <div class="badge badge-ghost badge-xs">Offline</div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="avatar placeholder">
                                        <div class="bg-primary text-primary-content w-10 rounded-full">
                                            <span class="text-xs">AL</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="font-medium">Alex Lee</p>
                                        <p class="text-xs text-base-content/70">Designer</p>
                                    </div>
                                </div>
                                <div class="badge badge-warning badge-xs">Away</div>
                            </div>
                        </div>
                        
                        <!-- Team Avatar Group Summary -->
                        <div class="divider"></div>
                        <div class="flex items-center justify-between">
                            <div class="avatar-group -space-x-4">
                                <div class="avatar">
                                    <div class="w-8 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Team member" />
                                    </div>
                                </div>
                                <div class="avatar">
                                    <div class="w-8 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1535713875002-d1d0cf227877.webp" alt="Team member" />
                                    </div>
                                </div>
                                <div class="avatar placeholder">
                                    <div class="w-8 bg-primary text-primary-content rounded-full">
                                        <span class="text-xs">AL</span>
                                    </div>
                                </div>
                                <div class="avatar placeholder">
                                    <div class="w-8 bg-neutral text-neutral-content rounded-full">
                                        <span class="text-xs">+1</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-ghost btn-sm">View All</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comment Section -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Comment Thread</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body space-y-4">
                        <div class="flex space-x-3">
                            <div class="avatar">
                                <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Commenter" />
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <h5 class="font-medium">Emma Davis</h5>
                                    <span class="text-xs text-base-content/60">2 hours ago</span>
                                </div>
                                <p class="text-sm">This looks great! The new design really improves the user experience.</p>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <div class="avatar placeholder">
                                <div class="bg-secondary text-secondary-content w-10 rounded-full">
                                    <span class="text-sm">RK</span>
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <h5 class="font-medium">Robert Kim</h5>
                                    <span class="text-xs text-base-content/60">1 hour ago</span>
                                </div>
                                <p class="text-sm">Agreed! Should we also consider the mobile responsive behavior?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>