<script lang="ts">
  import { ArrowRight, Play, CheckCircle, Star, Users, Zap } from 'lucide-svelte';
  
  let videoPlaying = false;
  
  function toggleVideo() {
    videoPlaying = !videoPlaying;
  }
</script>

<section class="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
  </div>
  
  <!-- Hero Content -->
  <div class="relative container mx-auto px-4 pt-20 pb-16">
    <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
      <!-- Left Column - Content -->
      <div class="space-y-8">
        <!-- Trust Indicators -->
        <div class="flex flex-wrap gap-4 items-center text-sm text-base-content/70">
          <div class="flex items-center gap-2">
            <div class="flex -space-x-1">
              <div class="avatar placeholder w-6 h-6">
                <div class="bg-neutral text-neutral-content rounded-full text-xs">A</div>
              </div>
              <div class="avatar placeholder w-6 h-6">
                <div class="bg-secondary text-secondary-content rounded-full text-xs">B</div>
              </div>
              <div class="avatar placeholder w-6 h-6">
                <div class="bg-accent text-accent-content rounded-full text-xs">C</div>
              </div>
            </div>
            <span>1,000+ developers trust us</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="rating rating-sm">
              <Star class="w-4 h-4 fill-warning text-warning" />
              <Star class="w-4 h-4 fill-warning text-warning" />
              <Star class="w-4 h-4 fill-warning text-warning" />
              <Star class="w-4 h-4 fill-warning text-warning" />
              <Star class="w-4 h-4 fill-warning text-warning" />
            </div>
            <span>4.9/5 rating</span>
          </div>
        </div>

        <!-- Main Headline -->
        <div class="space-y-6">
          <h1 class="text-5xl lg:text-7xl font-bold text-base-content leading-tight">
            Build <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beautiful</span>
            <br />UI Components
            <br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">10x Faster</span>
          </h1>
          
          <p class="text-xl lg:text-2xl text-base-content/70 leading-relaxed max-w-2xl">
            Professional-grade Svelte components with DaisyUI styling. Ship production-ready interfaces in minutes, not hours.
          </p>
        </div>

        <!-- Feature Highlights -->
        <div class="flex flex-wrap gap-6 text-base-content/80">
          <div class="flex items-center gap-2">
            <CheckCircle class="w-5 h-5 text-success" />
            <span>50+ Components</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle class="w-5 h-5 text-success" />
            <span>TypeScript Support</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle class="w-5 h-5 text-success" />
            <span>Fully Responsive</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button class="btn btn-primary btn-lg group">
            Start Building Free
            <ArrowRight class="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            class="btn btn-outline btn-lg group"
            on:click={toggleVideo}
          >
            <Play class="w-5 h-5 transition-transform group-hover:scale-110" />
            Watch Demo (2 min)
          </button>
        </div>

        <!-- Social Proof -->
        <div class="pt-8 border-t border-base-content/10">
          <p class="text-sm text-base-content/60 mb-4">Trusted by teams at</p>
          <div class="flex flex-wrap gap-6 items-center opacity-60">
            <div class="text-2xl font-bold">GitHub</div>
            <div class="text-2xl font-bold">Vercel</div>
            <div class="text-2xl font-bold">Stripe</div>
            <div class="text-2xl font-bold">Linear</div>
          </div>
        </div>
      </div>

      <!-- Right Column - Visual -->
      <div class="relative">
        <div class="mockup-browser bg-base-100 shadow-2xl">
          <div class="mockup-browser-toolbar">
            <div class="input">https://your-app.com</div>
          </div>
          <div class="bg-base-200 px-6 py-8">
            <div class="space-y-4">
              <!-- Mock Component Preview -->
              <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                  <div class="flex items-center gap-4">
                    <div class="avatar">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                    </div>
                    <div class="flex-1">
                      <div class="h-4 bg-base-300 rounded w-32 mb-2"></div>
                      <div class="h-3 bg-base-300 rounded w-24"></div>
                    </div>
                    <button class="btn btn-primary btn-sm">
                      <Users class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="stat bg-base-100 rounded-lg shadow-lg">
                  <div class="stat-figure text-primary">
                    <Zap class="w-8 h-8" />
                  </div>
                  <div class="stat-title">Speed</div>
                  <div class="stat-value text-primary">10x</div>
                </div>
                
                <div class="stat bg-base-100 rounded-lg shadow-lg">
                  <div class="stat-figure text-secondary">
                    <Users class="w-8 h-8" />
                  </div>
                  <div class="stat-title">Users</div>
                  <div class="stat-value text-secondary">1K+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full animate-pulse opacity-20"></div>
        <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full animate-bounce opacity-20"></div>
      </div>
    </div>
  </div>

  <!-- Video Modal -->
  {#if videoPlaying}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-4xl">
        <div class="aspect-video bg-base-300 rounded-lg flex items-center justify-center">
          <div class="text-center space-y-4">
            <Play class="w-16 h-16 text-primary mx-auto" />
            <p class="text-lg">Demo video would play here</p>
            <p class="text-sm opacity-70">This is a placeholder for the actual video content</p>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" on:click={toggleVideo}>Close</button>
        </div>
      </div>
    </div>
  {/if}
</section>