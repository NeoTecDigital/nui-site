<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import HomePage from './routes/index.svelte';
    import DocsPage from './routes/docs/index.svelte';
    import ComponentsPage from './routes/components/index.svelte';
    import ButtonPage from './routes/components/button.svelte';
    import BlocksPage from './routes/blocks/index.svelte';
    import ChartsPage from './routes/charts/index.svelte';
    import ThemesPage from './routes/themes/index.svelte';
    import ColorsPage from './routes/colors/index.svelte';
    import { theme } from '$lib/stores/theme.js';
    import { currentRoute, registerRoute, getRouteComponent, initRouter } from '$lib/utils/router.js';
    import { onMount } from 'svelte';

    // Register all routes
    registerRoute('/', HomePage, 'NUI - DaisyUI-powered Svelte Components');
    registerRoute('/docs', DocsPage, 'Documentation - NUI');
    registerRoute('/components', ComponentsPage, 'Components - NUI');
    registerRoute('/components/button', ButtonPage, 'Button Component - NUI');
    registerRoute('/blocks', BlocksPage, 'Blocks - NUI');
    registerRoute('/charts', ChartsPage, 'Charts - NUI');
    registerRoute('/themes', ThemesPage, 'Themes - NUI');
    registerRoute('/colors', ColorsPage, 'Colors - NUI');

    // Initialize theme and routing on mount
    onMount(() => {
        document.documentElement.setAttribute('data-theme', $theme);
        initRouter();
    });

    // Get current route component
    $: RouteComponent = getRouteComponent($currentRoute) || HomePage;
</script>

<div class="min-h-screen flex flex-col" data-theme={$theme}>
    <Header />
    <main class="flex-1">
        <svelte:component this={RouteComponent} />
    </main>
    <Footer />
</div>
