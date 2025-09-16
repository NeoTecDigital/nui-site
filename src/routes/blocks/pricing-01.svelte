<script lang="ts">
  import { 
    Check, 
    X, 
    Crown, 
    Zap, 
    Users, 
    Building2,
    ArrowRight,
    Star,
    Sparkles
  } from 'lucide-svelte';

  let isAnnual = false;
  let selectedPlan = 'pro';

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      icon: Zap,
      monthly: 0,
      annual: 0,
      originalMonthly: null,
      originalAnnual: null,
      features: [
        'Up to 5 components',
        'Basic documentation',
        'Community support',
        'MIT license',
        'Email templates'
      ],
      limitations: [
        'No premium components',
        'No priority support',
        'No custom themes'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'btn-outline'
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Best for growing teams and businesses',
      icon: Crown,
      monthly: 29,
      annual: 25,
      originalMonthly: 39,
      originalAnnual: 35,
      features: [
        'All 50+ components',
        'Premium templates',
        'Priority support',
        'Commercial license',
        'Advanced documentation',
        'Custom themes',
        'Figma design system',
        'Weekly updates'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'btn-primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large teams with custom needs',
      icon: Building2,
      monthly: 99,
      annual: 89,
      originalMonthly: null,
      originalAnnual: null,
      features: [
        'Everything in Pro',
        'Unlimited projects',
        'Custom components',
        'Dedicated support',
        'SLA guarantee',
        'On-premise option',
        'Training sessions',
        'Custom integrations',
        'White-label option'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'btn-secondary'
    }
  ];

  function toggleBilling() {
    isAnnual = !isAnnual;
  }

  function selectPlan(planId: string) {
    selectedPlan = planId;
  }

  function getPrice(plan: typeof plans[0]) {
    return isAnnual ? plan.annual : plan.monthly;
  }

  function getOriginalPrice(plan: typeof plans[0]) {
    return isAnnual ? plan.originalAnnual : plan.originalMonthly;
  }
</script>

<section class="bg-gradient-to-br from-base-200 to-base-300 py-20">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center max-w-4xl mx-auto mb-16">
      <div class="badge badge-primary badge-lg mb-6">
        <Star class="w-4 h-4 mr-2" />
        Pricing
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-bold text-base-content mb-6">
        Simple, Transparent
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Pricing
        </span>
      </h2>
      
      <p class="text-xl text-base-content/70 leading-relaxed mb-8">
        Choose the perfect plan for your needs. Start free, upgrade when you need more power.
        All plans include access to our growing component library.
      </p>

      <!-- Billing Toggle -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <span class="text-base-content/70" class:font-bold={!isAnnual}>Monthly</span>
        
        <input 
          type="checkbox" 
          class="toggle toggle-primary toggle-lg"
          bind:checked={isAnnual}
          on:change={toggleBilling}
        />
        
        <div class="flex items-center gap-2">
          <span class="text-base-content/70" class:font-bold={isAnnual}>Annual</span>
          <div class="badge badge-success badge-sm">Save 20%</div>
        </div>
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
      {#each plans as plan}
        <div 
          class="card bg-base-100 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl"
          class:border-primary={plan.popular}
          class:border-base-200={!plan.popular}
          class:scale-105={plan.popular}
          class:lg:scale-110={plan.popular}
        >
          {#if plan.popular}
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div class="badge badge-primary badge-lg">
                <Sparkles class="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>
          {/if}

          <div class="card-body p-8">
            <!-- Plan Header -->
            <div class="text-center mb-8">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svelte:component 
                  this={plan.icon} 
                  class="w-8 h-8 text-primary"
                />
              </div>
              
              <h3 class="text-2xl font-bold text-base-content mb-2">
                {plan.name}
              </h3>
              
              <p class="text-base-content/70">
                {plan.description}
              </p>
            </div>

            <!-- Pricing -->
            <div class="text-center mb-8">
              {#if plan.monthly === 0}
                <div class="text-5xl font-bold text-base-content">
                  Free
                </div>
                <div class="text-base-content/60 mt-2">
                  Forever
                </div>
              {:else}
                <div class="flex items-baseline justify-center gap-2">
                  {#if getOriginalPrice(plan)}
                    <span class="text-2xl text-base-content/40 line-through">
                      ${getOriginalPrice(plan)}
                    </span>
                  {/if}
                  <span class="text-5xl font-bold text-base-content">
                    ${getPrice(plan)}
                  </span>
                  <span class="text-base-content/60">
                    /{isAnnual ? 'month' : 'month'}
                  </span>
                </div>
                {#if isAnnual}
                  <div class="text-sm text-success mt-1">
                    Billed annually (${getPrice(plan) * 12}/year)
                  </div>
                {:else}
                  <div class="text-sm text-base-content/60 mt-1">
                    Billed monthly
                  </div>
                {/if}
              {/if}
            </div>

            <!-- Features -->
            <div class="space-y-4 mb-8">
              {#each plan.features as feature}
                <div class="flex items-start gap-3">
                  <Check class="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span class="text-base-content/80">{feature}</span>
                </div>
              {/each}
              
              {#each plan.limitations as limitation}
                <div class="flex items-start gap-3">
                  <X class="w-5 h-5 text-base-content/40 flex-shrink-0 mt-0.5" />
                  <span class="text-base-content/50">{limitation}</span>
                </div>
              {/each}
            </div>

            <!-- CTA Button -->
            <div class="card-actions">
              <button 
                class="btn {plan.color} btn-lg w-full group"
                class:btn-outline={selectedPlan !== plan.id && !plan.popular}
                on:click={() => selectPlan(plan.id)}
              >
                {plan.cta}
                {#if plan.id !== 'enterprise'}
                  <ArrowRight class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                {/if}
              </button>
            </div>

            {#if plan.id === 'pro'}
              <div class="text-center mt-4">
                <span class="text-sm text-base-content/60">
                  14-day free trial • No credit card required
                </span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Feature Comparison -->
    <div class="max-w-6xl mx-auto mb-16">
      <h3 class="text-3xl font-bold text-center text-base-content mb-8">
        Compare Plans
      </h3>
      
      <div class="overflow-x-auto">
        <table class="table table-zebra bg-base-100 shadow-xl">
          <thead>
            <tr>
              <th class="text-base-content">Features</th>
              <th class="text-center">Starter</th>
              <th class="text-center">Professional</th>
              <th class="text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-semibold">Component Library</td>
              <td class="text-center">5 components</td>
              <td class="text-center">50+ components</td>
              <td class="text-center">50+ components</td>
            </tr>
            <tr>
              <td class="font-semibold">Premium Templates</td>
              <td class="text-center"><X class="w-5 h-5 text-error mx-auto" /></td>
              <td class="text-center"><Check class="w-5 h-5 text-success mx-auto" /></td>
              <td class="text-center"><Check class="w-5 h-5 text-success mx-auto" /></td>
            </tr>
            <tr>
              <td class="font-semibold">Support</td>
              <td class="text-center">Community</td>
              <td class="text-center">Priority</td>
              <td class="text-center">Dedicated</td>
            </tr>
            <tr>
              <td class="font-semibold">Custom Components</td>
              <td class="text-center"><X class="w-5 h-5 text-error mx-auto" /></td>
              <td class="text-center"><X class="w-5 h-5 text-error mx-auto" /></td>
              <td class="text-center"><Check class="w-5 h-5 text-success mx-auto" /></td>
            </tr>
            <tr>
              <td class="font-semibold">SLA Guarantee</td>
              <td class="text-center"><X class="w-5 h-5 text-error mx-auto" /></td>
              <td class="text-center"><X class="w-5 h-5 text-error mx-auto" /></td>
              <td class="text-center"><Check class="w-5 h-5 text-success mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-4xl mx-auto">
      <h3 class="text-3xl font-bold text-center text-base-content mb-8">
        Frequently Asked Questions
      </h3>
      
      <div class="space-y-4">
        <div class="collapse collapse-plus bg-base-100 shadow-lg">
          <input type="radio" name="faq" />
          <div class="collapse-title text-xl font-medium">
            Can I change plans anytime?
          </div>
          <div class="collapse-content">
            <p>Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the next billing cycle, and we'll prorate any differences.</p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-lg">
          <input type="radio" name="faq" />
          <div class="collapse-title text-xl font-medium">
            What's included in the free plan?
          </div>
          <div class="collapse-content">
            <p>The free plan includes access to 5 basic components, community support, and our comprehensive documentation. It's perfect for learning and small projects.</p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-lg">
          <input type="radio" name="faq" />
          <div class="collapse-title text-xl font-medium">
            Do you offer refunds?
          </div>
          <div class="collapse-content">
            <p>We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment in full, no questions asked.</p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100 shadow-lg">
          <input type="radio" name="faq" />
          <div class="collapse-title text-xl font-medium">
            Is there a student discount?
          </div>
          <div class="collapse-content">
            <p>Yes! Students and educators get 50% off all paid plans. Contact us with your educational email address for a discount code.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>