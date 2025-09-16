<script lang="ts">
  import { 
    Zap, 
    Shield, 
    Paintbrush, 
    Code, 
    Smartphone, 
    Globe, 
    Puzzle, 
    Rocket,
    CheckCircle,
    ArrowRight 
  } from 'lucide-svelte';

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized components that load instantly and perform flawlessly across all devices and browsers.",
      benefits: ["Sub-second load times", "Minimal bundle size", "Performance optimized"],
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security features and best practices to keep your applications and user data safe.",
      benefits: ["OWASP compliant", "Input sanitization", "XSS protection"],
      color: "text-success"
    },
    {
      icon: Paintbrush,
      title: "Beautiful Design",
      description: "Pixel-perfect components with modern aesthetics and smooth animations out of the box.",
      benefits: ["20+ themes included", "Custom styling", "Animation library"],
      color: "text-primary"
    },
    {
      icon: Code,
      title: "Developer Experience",
      description: "TypeScript support, comprehensive documentation, and intuitive APIs that developers love.",
      benefits: ["Full TypeScript support", "IntelliSense enabled", "Extensive documentation"],
      color: "text-info"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive components that work beautifully on every screen size and device type.",
      benefits: ["Touch optimized", "Responsive by default", "PWA ready"],
      color: "text-secondary"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "WCAG 2.1 AA compliant components ensuring your app is usable by everyone, everywhere.",
      benefits: ["Screen reader support", "Keyboard navigation", "ARIA compliant"],
      color: "text-accent"
    }
  ];

  let hoveredFeature = -1;
</script>

<section class="bg-base-100 py-20">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center max-w-4xl mx-auto mb-16">
      <div class="badge badge-primary badge-lg mb-6">
        <Puzzle class="w-4 h-4 mr-2" />
        Features
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-bold text-base-content mb-6">
        Everything You Need to
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Build Amazing UIs
        </span>
      </h2>
      
      <p class="text-xl text-base-content/70 leading-relaxed">
        Our comprehensive component library gives you all the tools needed to create professional, 
        accessible, and high-performance web applications in record time.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each features as feature, index}
        <div 
          class="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          class:ring-2={hoveredFeature === index}
          class:ring-primary={hoveredFeature === index}
          on:mouseenter={() => hoveredFeature = index}
          on:mouseleave={() => hoveredFeature = -1}
          role="button"
          tabindex="0"
        >
          <div class="card-body p-8">
            <!-- Icon -->
            <div class="mb-6">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                <svelte:component 
                  this={feature.icon} 
                  class="w-8 h-8 {feature.color}"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-base-content">
                {feature.title}
              </h3>
              
              <p class="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>

              <!-- Benefits List -->
              <div class="space-y-2">
                {#each feature.benefits as benefit}
                  <div class="flex items-center gap-3 text-sm text-base-content/60">
                    <CheckCircle class="w-4 h-4 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Learn More Link -->
            <div class="card-actions justify-start pt-4">
              <button class="btn btn-ghost btn-sm group text-primary">
                Learn more
                <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Stats Section -->
    <div class="stats stats-vertical lg:stats-horizontal shadow-xl w-full bg-gradient-to-r from-primary/5 to-secondary/5 border border-base-200">
      <div class="stat place-items-center">
        <div class="stat-title">Components</div>
        <div class="stat-value text-primary">50+</div>
        <div class="stat-desc">Production ready</div>
      </div>
      
      <div class="stat place-items-center">
        <div class="stat-title">Downloads</div>
        <div class="stat-value text-secondary">100K+</div>
        <div class="stat-desc">Monthly installs</div>
      </div>
      
      <div class="stat place-items-center">
        <div class="stat-title">Developers</div>
        <div class="stat-value text-accent">5K+</div>
        <div class="stat-desc">Active users</div>
      </div>
      
      <div class="stat place-items-center">
        <div class="stat-title">Projects</div>
        <div class="stat-value text-info">1K+</div>
        <div class="stat-desc">Built with NUI</div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-16">
      <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl">
        <div class="card-body items-center text-center py-12">
          <Rocket class="w-16 h-16 mb-6" />
          
          <h3 class="text-3xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h3>
          
          <p class="text-lg opacity-90 mb-8 max-w-2xl">
            Join thousands of developers who are already building faster with our component library. 
            Start your free trial today and see the difference quality components make.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn btn-accent btn-lg">
              Start Free Trial
              <Rocket class="w-5 h-5" />
            </button>
            
            <button class="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>