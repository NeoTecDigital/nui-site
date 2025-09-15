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
    import { onMount } from 'svelte';

    let currentRoute = '';

    // Simple client-side routing
    function updateRoute() {
        currentRoute = window.location.pathname;
    }

    // Initialize theme and routing on mount
    onMount(() => {
        document.documentElement.setAttribute('data-theme', $theme);
        updateRoute();
        
        // Listen for route changes
        window.addEventListener('popstate', updateRoute);
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.target) {
                e.preventDefault();
                history.pushState(null, '', link.href);
                updateRoute();
            }
        });
    });

    // Get component for current route
    function getRouteComponent() {
        switch (currentRoute) {
            case '/':
            case '':
                return HomePage;
            case '/docs':
                return DocsPage;
            case '/components':
                return ComponentsPage;
            case '/components/button':
                return ButtonPage;
            case '/blocks':
                return BlocksPage;
            case '/charts':
                return ChartsPage;
            case '/themes':
                return ThemesPage;
            case '/colors':
                return ColorsPage;
            default:
                return HomePage;
        }
    }

    $: RouteComponent = getRouteComponent();
</script>

<div class="min-h-screen flex flex-col" data-theme={$theme}>
    <Header />
    <main class="flex-1">
        <svelte:component this={RouteComponent} />
    </main>
    <Footer />
</div>
