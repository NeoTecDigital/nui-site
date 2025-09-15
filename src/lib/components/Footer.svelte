<script lang="ts">
    import { Github, Twitter, MessageCircle } from 'lucide-svelte';
</script>

<footer class="bg-base-200/50 border-t">
    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand -->
            <div class="md:col-span-1">
                <div class="flex items-center space-x-2 mb-4">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content font-bold">
                        N
                    </div>
                    <span class="text-xl font-bold">NUI</span>
                </div>
                <p class="text-sm text-base-content/70 mb-4">
                    DaisyUI-powered Svelte component library with shadcn-svelte API compatibility.
                </p>
                <div class="flex space-x-3">
                    <a 
                        href="https://github.com/nui-dev/nui"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-ghost btn-sm btn-circle"
                        aria-label="GitHub"
                    >
                        <Github class="h-4 w-4" />
                    </a>
                    <a 
                        href="https://twitter.com/nui_dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-ghost btn-sm btn-circle"
                        aria-label="Twitter"
                    >
                        <Twitter class="h-4 w-4" />
                    </a>
                    <a 
                        href="https://discord.gg/nui"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-ghost btn-sm btn-circle"
                        aria-label="Discord"
                    >
                        <MessageCircle class="h-4 w-4" />
                    </a>
                </div>
            </div>

            <!-- Documentation -->
            <div>
                <h3 class="font-semibold mb-4">Documentation</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/docs" class="text-base-content/70 hover:text-primary transition-colors">Getting Started</a></li>
                    <li><a href="/docs/installation" class="text-base-content/70 hover:text-primary transition-colors">Installation</a></li>
                    <li><a href="/docs/theming" class="text-base-content/70 hover:text-primary transition-colors">Theming</a></li>
                    <li><a href="/docs/customization" class="text-base-content/70 hover:text-primary transition-colors">Customization</a></li>
                </ul>
            </div>

            <!-- Components -->
            <div>
                <h3 class="font-semibold mb-4">Components</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/components" class="text-base-content/70 hover:text-primary transition-colors">All Components</a></li>
                    <li><a href="/components/button" class="text-base-content/70 hover:text-primary transition-colors">Button</a></li>
                    <li><a href="/components/input" class="text-base-content/70 hover:text-primary transition-colors">Input</a></li>
                    <li><a href="/components/card" class="text-base-content/70 hover:text-primary transition-colors">Card</a></li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h3 class="font-semibold mb-4">Resources</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/blocks" class="text-base-content/70 hover:text-primary transition-colors">Blocks</a></li>
                    <li><a href="/charts" class="text-base-content/70 hover:text-primary transition-colors">Charts</a></li>
                    <li><a href="/themes" class="text-base-content/70 hover:text-primary transition-colors">Themes</a></li>
                    <li><a href="/colors" class="text-base-content/70 hover:text-primary transition-colors">Colors</a></li>
                </ul>
            </div>
        </div>

        <div class="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-base-content/60">
                © 2024 NUI. Built with ❤️ using Svelte and DaisyUI.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" class="text-sm text-base-content/60 hover:text-primary transition-colors">Privacy</a>
                <a href="/terms" class="text-sm text-base-content/60 hover:text-primary transition-colors">Terms</a>
                <a href="/license" class="text-sm text-base-content/60 hover:text-primary transition-colors">License</a>
            </div>
        </div>
    </div>
</footer>