<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import HomePage from './routes/index.svelte';
    import DocsPage from './routes/docs/index.svelte';
    import ComponentsPage from './routes/components/index.svelte';
    import ButtonPage from './routes/components/button.svelte';
    import InputPage from './routes/components/input.svelte';
    import CardPage from './routes/components/card.svelte';
    import TextareaPage from './routes/components/textarea.svelte';
    import SelectPage from './routes/components/select.svelte';
    import CheckboxPage from './routes/components/checkbox.svelte';
    import AlertPage from './routes/components/alert.svelte';
    import BadgePage from './routes/components/badge.svelte';
    import SwitchPage from './routes/components/switch.svelte';
    import ProgressPage from './routes/components/progress.svelte';
    import DialogPage from './routes/components/dialog.svelte';
    import TablePage from './routes/components/table.svelte';
    import TabsPage from './routes/components/tabs.svelte';
    import AvatarPage from './routes/components/avatar.svelte';
    // New component imports for all missing components
    import RadioGroupPage from './routes/components/radio-group.svelte';
    import SliderPage from './routes/components/slider.svelte';
    import LabelPage from './routes/components/label.svelte';
    import SeparatorPage from './routes/components/separator.svelte';
    import SheetPage from './routes/components/sheet.svelte';
    import DrawerPage from './routes/components/drawer.svelte';
    import AccordionPage from './routes/components/accordion.svelte';
    import CollapsiblePage from './routes/components/collapsible.svelte';
    import BreadcrumbPage from './routes/components/breadcrumb.svelte';
    import PaginationPage from './routes/components/pagination.svelte';
    import NavigationMenuPage from './routes/components/navigation-menu.svelte';
    import MenubarPage from './routes/components/menubar.svelte';
    import TooltipPage from './routes/components/tooltip.svelte';
    import PopoverPage from './routes/components/popover.svelte';
    import DropdownMenuPage from './routes/components/dropdown-menu.svelte';
    // Temporarily commenting out problematic components
    // import ContextMenuPage from './routes/components/context-menu.svelte';
    // import DataTablePage from './routes/components/data-table.svelte';
    // import CalendarPage from './routes/components/calendar.svelte';
    // import CommandPage from './routes/components/command.svelte';
    import TogglePage from './routes/components/toggle.svelte';
    import BlocksPage from './routes/blocks/index.svelte';
    // Block component imports
    import Dashboard01Page from './routes/blocks/dashboard-01.svelte';
    import Dashboard02Page from './routes/blocks/dashboard-02.svelte';
    import Dashboard03Page from './routes/blocks/dashboard-03.svelte';
    import Dashboard04Page from './routes/blocks/dashboard-04.svelte';
    import Sidebar01Page from './routes/blocks/sidebar-01.svelte';
    import Sidebar02Page from './routes/blocks/sidebar-02.svelte';
    import Sidebar04Page from './routes/blocks/sidebar-04.svelte';
    import Sidebar05Page from './routes/blocks/sidebar-05.svelte';
    import Login01Page from './routes/blocks/login-01.svelte';
    import Login02Page from './routes/blocks/login-02.svelte';
    import Login03Page from './routes/blocks/login-03.svelte';
    import Hero01Page from './routes/blocks/hero-01.svelte';
    import Features01Page from './routes/blocks/features-01.svelte';
    import Pricing01Page from './routes/blocks/pricing-01.svelte';
    import Testimonials01Page from './routes/blocks/testimonials-01.svelte';
    import Product01Page from './routes/blocks/product-01.svelte';
    import Checkout01Page from './routes/blocks/checkout-01.svelte';
    import Cart01Page from './routes/blocks/cart-01.svelte';
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
    registerRoute('/components/button', ButtonPage, 'Button - NUI Components');
    registerRoute('/components/input', InputPage, 'Input - NUI Components');
    registerRoute('/components/card', CardPage, 'Card - NUI Components');
    registerRoute('/components/textarea', TextareaPage, 'Textarea - NUI Components');
    registerRoute('/components/select', SelectPage, 'Select - NUI Components');
    registerRoute('/components/checkbox', CheckboxPage, 'Checkbox - NUI Components');
    registerRoute('/components/alert', AlertPage, 'Alert - NUI Components');
    registerRoute('/components/badge', BadgePage, 'Badge - NUI Components');
    registerRoute('/components/switch', SwitchPage, 'Switch - NUI Components');
    registerRoute('/components/progress', ProgressPage, 'Progress - NUI Components');
    registerRoute('/components/dialog', DialogPage, 'Dialog - NUI Components');
    registerRoute('/components/table', TablePage, 'Table - NUI Components');
    registerRoute('/components/tabs', TabsPage, 'Tabs - NUI Components');
    registerRoute('/components/avatar', AvatarPage, 'Avatar - NUI Components');
    // Register all new component routes
    registerRoute('/components/radio-group', RadioGroupPage, 'Radio Group - NUI Components');
    registerRoute('/components/slider', SliderPage, 'Slider - NUI Components');
    registerRoute('/components/label', LabelPage, 'Label - NUI Components');
    registerRoute('/components/separator', SeparatorPage, 'Separator - NUI Components');
    registerRoute('/components/sheet', SheetPage, 'Sheet - NUI Components');
    registerRoute('/components/drawer', DrawerPage, 'Drawer - NUI Components');
    registerRoute('/components/accordion', AccordionPage, 'Accordion - NUI Components');
    registerRoute('/components/collapsible', CollapsiblePage, 'Collapsible - NUI Components');
    registerRoute('/components/breadcrumb', BreadcrumbPage, 'Breadcrumb - NUI Components');
    registerRoute('/components/pagination', PaginationPage, 'Pagination - NUI Components');
    registerRoute('/components/navigation-menu', NavigationMenuPage, 'Navigation Menu - NUI Components');
    registerRoute('/components/menubar', MenubarPage, 'Menubar - NUI Components');
    registerRoute('/components/tooltip', TooltipPage, 'Tooltip - NUI Components');
    registerRoute('/components/popover', PopoverPage, 'Popover - NUI Components');
    registerRoute('/components/dropdown-menu', DropdownMenuPage, 'Dropdown Menu - NUI Components');
    // Temporarily commenting out problematic component routes
    // registerRoute('/components/context-menu', ContextMenuPage, 'Context Menu - NUI Components');
    // registerRoute('/components/data-table', DataTablePage, 'Data Table - NUI Components');
    // registerRoute('/components/calendar', CalendarPage, 'Calendar - NUI Components');
    // registerRoute('/components/command', CommandPage, 'Command - NUI Components');
    registerRoute('/components/toggle', TogglePage, 'Toggle - NUI Components');
    registerRoute('/blocks', BlocksPage, 'Blocks - NUI');
    // Block routes
    registerRoute('/blocks/dashboard-01', Dashboard01Page, 'Dashboard 01 - NUI Blocks');
    registerRoute('/blocks/dashboard-02', Dashboard02Page, 'Dashboard 02 - NUI Blocks');
    registerRoute('/blocks/dashboard-03', Dashboard03Page, 'Dashboard 03 - NUI Blocks');
    registerRoute('/blocks/dashboard-04', Dashboard04Page, 'Dashboard 04 - NUI Blocks');
    registerRoute('/blocks/sidebar-01', Sidebar01Page, 'Sidebar 01 - NUI Blocks');
    registerRoute('/blocks/sidebar-02', Sidebar02Page, 'Sidebar 02 - NUI Blocks');
    registerRoute('/blocks/sidebar-04', Sidebar04Page, 'Sidebar 04 - NUI Blocks');
    registerRoute('/blocks/sidebar-05', Sidebar05Page, 'Sidebar 05 - NUI Blocks');
    registerRoute('/blocks/login-01', Login01Page, 'Login 01 - NUI Blocks');
    registerRoute('/blocks/login-02', Login02Page, 'Login 02 - NUI Blocks');
    registerRoute('/blocks/login-03', Login03Page, 'Login 03 - NUI Blocks');
    registerRoute('/blocks/hero-01', Hero01Page, 'Hero 01 - NUI Blocks');
    registerRoute('/blocks/features-01', Features01Page, 'Features 01 - NUI Blocks');
    registerRoute('/blocks/pricing-01', Pricing01Page, 'Pricing 01 - NUI Blocks');
    registerRoute('/blocks/testimonials-01', Testimonials01Page, 'Testimonials 01 - NUI Blocks');
    registerRoute('/blocks/product-01', Product01Page, 'Product 01 - NUI Blocks');
    registerRoute('/blocks/checkout-01', Checkout01Page, 'Checkout 01 - NUI Blocks');
    registerRoute('/blocks/cart-01', Cart01Page, 'Cart 01 - NUI Blocks');
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
