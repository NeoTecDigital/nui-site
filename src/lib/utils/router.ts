import { writable } from 'svelte/store';

export interface Route {
    path: string;
    component: any;
    title?: string;
}

// Route store
export const currentRoute = writable<string>('/');

// Route registry
const routes: Map<string, Route> = new Map();

// Register a route
export function registerRoute(path: string, component: any, title?: string): void {
    routes.set(path, { path, component, title });
}

// Get route component
export function getRouteComponent(path: string): any | null {
    const route = routes.get(path);
    return route?.component || null;
}

// Navigate to a route
export function navigate(path: string): void {
    if (path !== getCurrentPath()) {
        window.history.pushState({}, '', path);
        currentRoute.set(path);
        updateTitle(path);
    }
}

// Get current path
export function getCurrentPath(): string {
    return window.location.pathname;
}

// Update document title
function updateTitle(path: string): void {
    const route = routes.get(path);
    if (route?.title) {
        document.title = route.title;
    }
}

// Initialize router
export function initRouter(): void {
    // Set initial route
    currentRoute.set(getCurrentPath());
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        currentRoute.set(getCurrentPath());
        updateTitle(getCurrentPath());
    });
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href && !link.target && !link.download) {
            const url = new URL(link.href);
            
            // Only handle internal links
            if (url.origin === window.location.origin) {
                e.preventDefault();
                navigate(url.pathname);
            }
        }
    });
}

// Get all registered routes
export function getAllRoutes(): Route[] {
    return Array.from(routes.values());
}
