<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, Play, Pause, RotateCcw } from 'lucide-svelte';
    import { onMount } from 'svelte';

    const installCommand = 'npx @nui/cli add progress';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
<\/script>

<Progress value={60} />`;

    const variantsCode = `<Progress value={60} variant="primary" />
<Progress value={60} variant="secondary" />
<Progress value={60} variant="accent" />
<Progress value={60} variant="success" />
<Progress value={60} variant="warning" />
<Progress value={60} variant="error" />`;

    const sizesCode = `<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`;

    const animatedCode = `<script>
  import { onMount } from 'svelte';
  
  let progress = 0;
  let interval;
  
  onMount(() => {
    interval = setInterval(() => {
      progress = (progress + 5) % 100;
    }, 200);
    
    return () => clearInterval(interval);
  });
<\/script>

<Progress value={progress} variant="primary" />`;

    const withLabelsCode = `<div class="space-y-4">
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium">Downloading...</span>
      <span class="text-sm text-base-content/70">75%</span>
    </div>
    <Progress value={75} variant="primary" />
  </div>
  
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium">Upload Progress</span>
      <span class="text-sm text-base-content/70">45/100 MB</span>
    </div>
    <Progress value={45} variant="success" />
  </div>
</div>`;

    const circularCode = `<div class="flex items-center space-x-8">
  <div class="radial-progress text-primary" style="--value:70;" role="progressbar">70%</div>
  <div class="radial-progress text-secondary" style="--value:85;" role="progressbar">85%</div>
  <div class="radial-progress text-accent" style="--value:30;" role="progressbar">30%</div>
</div>`;

    const indeterminateCode = `<!-- Indeterminate progress (no value) -->
<Progress />

<!-- Loading spinner alternative -->
<div class="flex items-center space-x-2">
  <span class="loading loading-spinner loading-sm"></span>
  <span>Processing...</span>
</div>`;

    const apiProps = [
        {
            name: 'value',
            type: 'number',
            default: 'undefined',
            description: 'Current progress value (0-100). When undefined, shows indeterminate state'
        },
        {
            name: 'max',
            type: 'number',
            default: '100',
            description: 'Maximum value for the progress bar'
        },
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
            default: "'primary'",
            description: 'Visual style variant of the progress bar'
        },
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the progress bar'
        },
        {
            name: 'indeterminate',
            type: 'boolean',
            default: 'false',
            description: 'Shows animated indeterminate progress when true'
        },
        {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Accessible label for screen readers'
        }
    ];

    // Demo state for animated examples
    let animatedProgress = 0;
    let isAnimating = false;
    let animationInterval: number;

    const startAnimation = () => {
        if (isAnimating) return;
        isAnimating = true;
        animationInterval = setInterval(() => {
            animatedProgress = (animatedProgress + 2) % 101;
        }, 100);
    };

    const stopAnimation = () => {
        isAnimating = false;
        clearInterval(animationInterval);
    };

    const resetProgress = () => {
        stopAnimation();
        animatedProgress = 0;
    };

    onMount(() => {
        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        };
    });

    // Circular progress demo
    let circularProgress1 = 70;
    let circularProgress2 = 85;
    let circularProgress3 = 30;
</script>

<svelte:head>
    <title>Progress - NUI Components</title>
    <meta name="description" content="Progress component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Progress</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Progress</h1>
                <p class="text-xl text-base-content/70">
                    Progress indicators to show completion status of tasks and operations.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/progress"
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
            description="Simple progress bar showing 60% completion"
            code={basicUsage}
        >
            <progress class="progress progress-primary w-56" value="60" max="100"></progress>
        </ComponentShowcase>
    </div>

    <!-- Variants -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Variants" 
            description="Different color variants for various contexts"
            code={variantsCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <progress class="progress progress-primary w-full" value="60" max="100"></progress>
                <progress class="progress progress-secondary w-full" value="60" max="100"></progress>
                <progress class="progress progress-accent w-full" value="60" max="100"></progress>
                <progress class="progress progress-success w-full" value="60" max="100"></progress>
                <progress class="progress progress-warning w-full" value="60" max="100"></progress>
                <progress class="progress progress-error w-full" value="60" max="100"></progress>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Sizes -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Sizes" 
            description="Different progress bar sizes from extra small to large"
            code={sizesCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <progress class="progress progress-primary w-full h-1" value="60" max="100"></progress>
                <progress class="progress progress-primary w-full h-2" value="60" max="100"></progress>
                <progress class="progress progress-primary w-full h-4" value="60" max="100"></progress>
                <progress class="progress progress-primary w-full h-6" value="60" max="100"></progress>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Animated Progress -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Animated Progress" 
            description="Progress bar with real-time animation and controls"
            code={animatedCode}
        >
            <div class="space-y-4 w-full max-w-md">
                <progress class="progress progress-primary w-full" value={animatedProgress} max="100"></progress>
                <div class="flex items-center space-x-2">
                    <button 
                        class="btn btn-sm btn-primary" 
                        class:btn-disabled={isAnimating}
                        on:click={startAnimation}
                    >
                        <Play class="w-4 h-4 mr-1" />
                        Start
                    </button>
                    <button 
                        class="btn btn-sm btn-secondary" 
                        class:btn-disabled={!isAnimating}
                        on:click={stopAnimation}
                    >
                        <Pause class="w-4 h-4 mr-1" />
                        Pause
                    </button>
                    <button class="btn btn-sm btn-ghost" on:click={resetProgress}>
                        <RotateCcw class="w-4 h-4 mr-1" />
                        Reset
                    </button>
                    <span class="text-sm text-base-content/70">{Math.round(animatedProgress)}%</span>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- With Labels -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Progress with Labels" 
            description="Progress bars with descriptive labels and percentage indicators"
            code={withLabelsCode}
        >
            <div class="space-y-6 w-full max-w-md">
                <div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-medium">Downloading...</span>
                        <span class="text-sm text-base-content/70">75%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value="75" max="100"></progress>
                </div>
                
                <div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-medium">Upload Progress</span>
                        <span class="text-sm text-base-content/70">45/100 MB</span>
                    </div>
                    <progress class="progress progress-success w-full" value="45" max="100"></progress>
                </div>

                <div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-medium">Processing Files</span>
                        <span class="text-sm text-base-content/70">12/20 files</span>
                    </div>
                    <progress class="progress progress-accent w-full" value="60" max="100"></progress>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Circular Progress -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Circular Progress" 
            description="Radial progress indicators for compact display"
            code={circularCode}
        >
            <div class="flex items-center space-x-8">
                <div class="radial-progress text-primary" style="--value:{circularProgress1};" role="progressbar">
                    {circularProgress1}%
                </div>
                <div class="radial-progress text-secondary" style="--value:{circularProgress2};" role="progressbar">
                    {circularProgress2}%
                </div>
                <div class="radial-progress text-accent" style="--value:{circularProgress3};" role="progressbar">
                    {circularProgress3}%
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Indeterminate Progress -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Indeterminate Progress" 
            description="Progress indicators for unknown completion time"
            code={indeterminateCode}
        >
            <div class="space-y-6 w-full max-w-md">
                <!-- Indeterminate progress bar -->
                <progress class="progress progress-primary w-full"></progress>
                
                <!-- With loading text -->
                <div class="flex items-center space-x-3">
                    <span class="loading loading-spinner loading-sm text-primary"></span>
                    <span class="text-sm">Processing request...</span>
                </div>

                <!-- Different spinner sizes -->
                <div class="flex items-center space-x-4">
                    <span class="loading loading-spinner loading-xs text-primary"></span>
                    <span class="loading loading-spinner loading-sm text-secondary"></span>
                    <span class="loading loading-spinner loading-md text-accent"></span>
                    <span class="loading loading-spinner loading-lg text-success"></span>
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
                <li>✅ Uses semantic <code>&lt;progress&gt;</code> element with proper ARIA attributes</li>
                <li>✅ Includes <code>role="progressbar"</code> for circular progress indicators</li>
                <li>✅ Provides accessible value announcements for screen readers</li>
                <li>✅ Supports <code>aria-label</code> and <code>aria-describedby</code> for context</li>
                <li>✅ Compatible with high contrast mode and reduced motion preferences</li>
                <li>✅ Maintains proper color contrast ratios for all variants</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- File Upload -->
            <div>
                <h3 class="text-lg font-semibold mb-4">File Upload Progress</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="font-medium mb-4">Uploading document.pdf</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>2.4 MB / 5.2 MB</span>
                            </div>
                            <progress class="progress progress-primary w-full" value="46" max="100"></progress>
                            <div class="flex justify-between text-xs text-base-content/70">
                                <span>46% complete</span>
                                <span>~30 seconds remaining</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Multi-step Process -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Multi-step Process</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="font-medium mb-4">Account Setup</h4>
                        <div class="space-y-4">
                            <!-- Step 1 -->
                            <div class="flex items-center space-x-3">
                                <div class="badge badge-success badge-sm">✓</div>
                                <span class="text-sm flex-1">Personal Information</span>
                                <progress class="progress progress-success w-20 h-2" value="100" max="100"></progress>
                            </div>
                            
                            <!-- Step 2 -->
                            <div class="flex items-center space-x-3">
                                <div class="badge badge-primary badge-sm">2</div>
                                <span class="text-sm flex-1">Payment Method</span>
                                <progress class="progress progress-primary w-20 h-2" value="60" max="100"></progress>
                            </div>
                            
                            <!-- Step 3 -->
                            <div class="flex items-center space-x-3">
                                <div class="badge badge-ghost badge-sm">3</div>
                                <span class="text-sm flex-1 text-base-content/50">Verification</span>
                                <progress class="progress w-20 h-2" value="0" max="100"></progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dashboard Stats -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Dashboard Statistics</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="card bg-base-100 border">
                        <div class="card-body items-center text-center">
                            <div class="radial-progress text-primary" style="--value:87;" role="progressbar">
                                <span class="text-xl font-bold">87%</span>
                            </div>
                            <h4 class="font-medium mt-2">CPU Usage</h4>
                            <p class="text-sm text-base-content/70">8.7/10 GB</p>
                        </div>
                    </div>
                    
                    <div class="card bg-base-100 border">
                        <div class="card-body items-center text-center">
                            <div class="radial-progress text-success" style="--value:65;" role="progressbar">
                                <span class="text-xl font-bold">65%</span>
                            </div>
                            <h4 class="font-medium mt-2">Memory</h4>
                            <p class="text-sm text-base-content/70">6.5/10 GB</p>
                        </div>
                    </div>
                    
                    <div class="card bg-base-100 border">
                        <div class="card-body items-center text-center">
                            <div class="radial-progress text-warning" style="--value:23;" role="progressbar">
                                <span class="text-xl font-bold">23%</span>
                            </div>
                            <h4 class="font-medium mt-2">Storage</h4>
                            <p class="text-sm text-base-content/70">230/1000 GB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>