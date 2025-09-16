<script lang="ts">
  import { 
    Quote, 
    Star, 
    ArrowLeft, 
    ArrowRight, 
    ExternalLink,
    Users,
    Award,
    TrendingUp,
    Heart
  } from 'lucide-svelte';

  let currentTestimonial = 0;

  const testimonials = [
    {
      id: 1,
      content: "NUI Components transformed our development workflow completely. What used to take us weeks now takes days. The components are beautifully designed and incredibly flexible.",
      author: "Sarah Chen",
      title: "Lead Frontend Developer",
      company: "TechFlow Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Built a complete dashboard in 2 days",
      savings: "80% faster development"
    },
    {
      id: 2,
      content: "The accessibility features are outstanding. As someone who cares deeply about inclusive design, I'm impressed by how much thought went into making these components work for everyone.",
      author: "Marcus Rodriguez",
      title: "UX Engineer",
      company: "Accessible Web Co.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "WCAG 2.1 AA compliant e-commerce site",
      savings: "100% accessibility compliance"
    },
    {
      id: 3,
      content: "The TypeScript support is phenomenal. IntelliSense works perfectly, and the type definitions are comprehensive. It makes development so much more productive and error-free.",
      author: "Alex Thompson",
      title: "Senior Software Engineer",
      company: "DevCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Enterprise application with 50+ screens",
      savings: "90% fewer type errors"
    },
    {
      id: 4,
      content: "Our design system implementation was seamless thanks to the theming capabilities. The components adapt perfectly to our brand while maintaining consistency across all platforms.",
      author: "Emily Watson",
      title: "Design Systems Lead",
      company: "Brand Studio Pro",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Multi-brand design system",
      savings: "60% design-dev handoff time"
    },
    {
      id: 5,
      content: "The performance is incredible. Our page load times improved by 40% after switching to NUI Components. The bundle size optimization is impressive.",
      author: "David Kim",
      title: "Performance Engineer",
      company: "SpeedTech Labs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "High-traffic e-commerce platform",
      savings: "40% faster page loads"
    },
    {
      id: 6,
      content: "Customer support is exceptional. The team goes above and beyond to help with implementation questions. They even created custom examples for our specific use case.",
      author: "Lisa Park",
      title: "Frontend Architect",
      company: "Enterprise Solutions Ltd.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Complex enterprise dashboard",
      savings: "24-hour support response time"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Happy Developers",
      color: "text-primary"
    },
    {
      icon: Award,
      value: "98%",
      label: "Satisfaction Rate",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Faster Development",
      color: "text-warning"
    },
    {
      icon: Heart,
      value: "500+",
      label: "5-Star Reviews",
      color: "text-error"
    }
  ];

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  }

  function goToTestimonial(index: number) {
    currentTestimonial = index;
  }
</script>

<section class="bg-base-100 py-20">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center max-w-4xl mx-auto mb-16">
      <div class="badge badge-primary badge-lg mb-6">
        <Quote class="w-4 h-4 mr-2" />
        Testimonials
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-bold text-base-content mb-6">
        Loved by
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Developers
        </span>
        Worldwide
      </h2>
      
      <p class="text-xl text-base-content/70 leading-relaxed">
        Join thousands of developers who have transformed their workflow with our components. 
        Here's what they have to say about their experience.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {#each stats as stat}
        <div class="text-center">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center mx-auto mb-4">
            <svelte:component 
              this={stat.icon} 
              class="w-8 h-8 {stat.color}"
            />
          </div>
          <div class="text-3xl lg:text-4xl font-bold text-base-content mb-2">
            {stat.value}
          </div>
          <div class="text-base-content/70">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>

    <!-- Main Testimonial Carousel -->
    <div class="max-w-6xl mx-auto mb-16">
      <div class="card bg-gradient-to-br from-base-200 to-base-300 shadow-2xl">
        <div class="card-body p-12">
          <div class="grid lg:grid-cols-3 gap-8 items-center">
            <!-- Testimonial Content -->
            <div class="lg:col-span-2 space-y-6">
              <Quote class="w-12 h-12 text-primary" />
              
              <blockquote class="text-2xl lg:text-3xl font-medium text-base-content leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <!-- Rating -->
              <div class="flex items-center gap-2">
                {#each Array(testimonials[currentTestimonial].rating) as _}
                  <Star class="w-6 h-6 fill-warning text-warning" />
                {/each}
              </div>

              <!-- Author Info -->
              <div class="flex items-center gap-4 pt-4 border-t border-base-content/10">
                <div class="avatar">
                  <div class="w-16 h-16 rounded-full">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].author}
                      class="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <div class="font-bold text-lg text-base-content">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div class="text-base-content/70">
                    {testimonials[currentTestimonial].title}
                  </div>
                  <div class="text-primary font-semibold">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Highlights -->
            <div class="space-y-6">
              <div class="card bg-base-100 shadow-xl">
                <div class="card-body p-6">
                  <h4 class="font-bold text-base-content mb-4">Project Impact</h4>
                  
                  <div class="space-y-4">
                    <div>
                      <div class="text-sm text-base-content/70 mb-1">Project</div>
                      <div class="font-semibold text-base-content">
                        {testimonials[currentTestimonial].project}
                      </div>
                    </div>
                    
                    <div>
                      <div class="text-sm text-base-content/70 mb-1">Results</div>
                      <div class="badge badge-success badge-lg">
                        {testimonials[currentTestimonial].savings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation -->
              <div class="flex items-center justify-between">
                <button 
                  class="btn btn-circle btn-outline"
                  on:click={prevTestimonial}
                >
                  <ArrowLeft class="w-5 h-5" />
                </button>

                <div class="flex gap-2">
                  {#each testimonials as _, index}
                    <button 
                      class="btn btn-xs rounded-full"
                      class:btn-primary={index === currentTestimonial}
                      class:btn-outline={index !== currentTestimonial}
                      on:click={() => goToTestimonial(index)}
                    >
                    </button>
                  {/each}
                </div>

                <button 
                  class="btn btn-circle btn-outline"
                  on:click={nextTestimonial}
                >
                  <ArrowRight class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Testimonials Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {#each testimonials.slice(0, 3) as testimonial}
        <div class="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div class="card-body p-6">
            <Quote class="w-8 h-8 text-primary mb-4" />
            
            <p class="text-base-content/80 leading-relaxed mb-6">
              "{testimonial.content.slice(0, 120)}..."
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-1 mb-4">
              {#each Array(testimonial.rating) as _}
                <Star class="w-4 h-4 fill-warning text-warning" />
              {/each}
            </div>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    class="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <div class="font-bold text-base-content">
                  {testimonial.author}
                </div>
                <div class="text-sm text-base-content/70">
                  {testimonial.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Trust Indicators -->
    <div class="text-center space-y-8">
      <h3 class="text-3xl font-bold text-base-content">
        Trusted by Leading Companies
      </h3>
      
      <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div class="text-2xl font-bold text-base-content">GitHub</div>
        <div class="text-2xl font-bold text-base-content">Vercel</div>
        <div class="text-2xl font-bold text-base-content">Stripe</div>
        <div class="text-2xl font-bold text-base-content">Linear</div>
        <div class="text-2xl font-bold text-base-content">Framer</div>
        <div class="text-2xl font-bold text-base-content">Notion</div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-16">
      <div class="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div class="card-body items-center text-center py-12">
          <Quote class="w-16 h-16 text-primary mb-6" />
          
          <h3 class="text-3xl font-bold text-base-content mb-4">
            Ready to Join Our Happy Customers?
          </h3>
          
          <p class="text-lg text-base-content/70 mb-8 max-w-2xl">
            Start your free trial today and experience the difference quality components make. 
            Join thousands of developers who are already building better UIs faster.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn btn-primary btn-lg">
              Start Free Trial
              <ArrowRight class="w-5 h-5" />
            </button>
            
            <button class="btn btn-outline btn-lg">
              View All Reviews
              <ExternalLink class="w-5 h-5" />
            </button>
          </div>

          <div class="text-sm text-base-content/60 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </div>
    </div>
  </div>
</section>