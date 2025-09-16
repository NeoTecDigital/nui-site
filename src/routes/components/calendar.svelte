<script lang="ts">
    import CodeBlock from '$lib/components/CodeBlock.svelte';
    import ComponentShowcase from '$lib/components/ComponentShowcase.svelte';
    import { ArrowLeft, Github, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-svelte';

    const installCommand = 'npx @nui/cli add calendar';

    const basicUsage = `<script>
  // Component imports from @nui/core (using DaisyUI classes)
  
  let selectedDate = new Date();
<\/script>

<Calendar bind:selectedDate />`;

    const basicCalendarCode = `<div class="calendar bg-base-100 border rounded-lg p-4">
  <div class="calendar-header flex items-center justify-between mb-4">
    <button class="btn btn-ghost btn-sm">
      <ChevronLeft class="w-4 h-4" />
    </button>
    <h3 class="text-lg font-semibold">January 2024</h3>
    <button class="btn btn-ghost btn-sm">
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>
  <div class="calendar-grid grid grid-cols-7 gap-1">
    <!-- Days of week -->
    <div class="text-center text-sm font-medium p-2">Su</div>
    <div class="text-center text-sm font-medium p-2">Mo</div>
    <!-- ... other days ... -->
    <!-- Date cells -->
    <button class="btn btn-ghost btn-sm">1</button>
    <button class="btn btn-ghost btn-sm">2</button>
    <!-- ... other dates ... -->
  </div>
</div>`;

    const datePickerCode = `<script>
  let selectedDate = new Date();
  let showCalendar = false;
  
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
<\/script>

<div class="form-control">
  <label class="label">
    <span class="label-text">Select Date</span>
  </label>
  <div class="relative">
    <input 
      type="text" 
      class="input input-bordered w-full pr-10" 
      value={formatDate(selectedDate)}
      on:click={() => showCalendar = !showCalendar}
      readonly
    />
    <button class="absolute right-2 top-1/2 transform -translate-y-1/2">
      <CalendarIcon class="w-5 h-5" />
    </button>
    {#if showCalendar}
      <div class="absolute top-full left-0 mt-1 z-10">
        <!-- Calendar component here -->
      </div>
    {/if}
  </div>
</div>`;

    const dateRangeCode = `<script>
  let startDate = new Date();
  let endDate = null;
  let selectingEnd = false;
  
  function selectDate(date) {
    if (!selectingEnd) {
      startDate = date;
      endDate = null;
      selectingEnd = true;
    } else {
      endDate = date;
      selectingEnd = false;
    }
  }
  
  function isInRange(date) {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  }
<\/script>

<div class="space-y-4">
  <div class="flex gap-4">
    <div class="form-control">
      <label class="label">Start Date</label>
      <input type="date" class="input input-bordered" 
             bind:value={startDate} />
    </div>
    <div class="form-control">
      <label class="label">End Date</label>
      <input type="date" class="input input-bordered" 
             bind:value={endDate} />
    </div>
  </div>
  <!-- Calendar with range selection visualization -->
</div>`;

    const eventCalendarCode = `<script>
  let events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 0, 15),
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2024, 0, 20),
      time: 'All Day',
      type: 'deadline'
    }
  ];
  
  function getEventsForDate(date) {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }
<\/script>

<div class="calendar">
  <div class="calendar-grid grid grid-cols-7 gap-1">
    {#each calendarDays as day}
      <div class="calendar-day relative">
        <button class="btn btn-ghost btn-sm w-full">
          {day.getDate()}
        </button>
        {#each getEventsForDate(day) as event}
          <div class="absolute bottom-0 left-0 right-0">
            <div class="text-xs px-1 py-0.5 bg-primary text-primary-content rounded text-center truncate">
              {event.title}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>`;

    const customThemeCode = `<!-- Light theme calendar -->
<div class="calendar bg-base-100 border border-base-300 rounded-lg">
  <!-- Calendar content -->
</div>

<!-- Dark theme calendar -->
<div class="calendar bg-base-200 border border-base-content/20 rounded-lg" data-theme="dark">
  <!-- Calendar content -->
</div>

<!-- Accent colored calendar -->
<div class="calendar bg-accent/10 border border-accent rounded-lg">
  <div class="calendar-header text-accent">
    <!-- Header content -->
  </div>
  <!-- Calendar content with accent colors -->
</div>`;

    // Sample data and state
    let currentDate = new Date();
    let selectedDate = new Date();
    let showDatePicker = false;
    let startDate = new Date();
    let endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    let selectingEnd = false;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Sample events
    let events = [
        {
            id: 1,
            title: 'Team Meeting',
            date: new Date(2024, 0, 15),
            time: '10:00 AM',
            type: 'meeting',
            location: 'Conference Room A'
        },
        {
            id: 2,
            title: 'Project Deadline',
            date: new Date(2024, 0, 20),
            time: 'All Day',
            type: 'deadline',
            location: 'Remote'
        },
        {
            id: 3,
            title: 'Client Presentation',
            date: new Date(2024, 0, 25),
            time: '2:00 PM',
            type: 'presentation',
            location: 'Client Office'
        }
    ];

    // Calendar helper functions
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month];
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    function generateCalendarDays(year, month) {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    }

    function previousMonth() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
    }

    function nextMonth() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
    }

    function selectDate(date) {
        if (!selectingEnd) {
            startDate = date;
            endDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
            selectingEnd = true;
        } else {
            endDate = date;
            selectingEnd = false;
        }
    }

    function isInRange(date) {
        if (!startDate || !endDate) return false;
        return date >= startDate && date <= endDate;
    }

    function isDateDisabled(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    function getEventsForDate(date) {
        return events.filter(event => 
            event.date.toDateString() === date.toDateString()
        );
    }

    function isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    function isSameDate(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    $: calendarDays = generateCalendarDays(currentYear, currentMonth);

    const apiProps = [
        {
            name: 'selectedDate',
            type: 'Date',
            default: 'new Date()',
            description: 'Currently selected date'
        },
        {
            name: 'minDate',
            type: 'Date | null',
            default: 'null',
            description: 'Minimum selectable date'
        },
        {
            name: 'maxDate',
            type: 'Date | null',
            default: 'null',
            description: 'Maximum selectable date'
        },
        {
            name: 'disabledDates',
            type: 'Date[]',
            default: '[]',
            description: 'Array of dates that should be disabled'
        },
        {
            name: 'events',
            type: 'Event[]',
            default: '[]',
            description: 'Array of events to display on the calendar'
        },
        {
            name: 'mode',
            type: "'single' | 'range' | 'multiple'",
            default: "'single'",
            description: 'Date selection mode'
        },
        {
            name: 'showWeekNumbers',
            type: 'boolean',
            default: 'false',
            description: 'Show week numbers in the calendar'
        },
        {
            name: 'firstDayOfWeek',
            type: '0 | 1',
            default: '0',
            description: 'First day of week (0 = Sunday, 1 = Monday)'
        },
        {
            name: 'locale',
            type: 'string',
            default: "'en-US'",
            description: 'Locale for date formatting'
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Size of the calendar component'
        }
    ];
</script>

<svelte:head>
    <title>Calendar - NUI Components</title>
    <meta name="description" content="Calendar component documentation and examples for NUI" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-base-content/70 mb-8">
        <a href="/components" class="hover:text-primary flex items-center">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Components
        </a>
        <span>/</span>
        <span class="text-base-content">Calendar</span>
    </div>

    <!-- Header -->
    <div class="max-w-4xl mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Calendar</h1>
                <p class="text-xl text-base-content/70">
                    Interactive calendar component for date selection, range picking, and event management.
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="badge badge-success">Stable</span>
                <a 
                    href="https://github.com/nui-dev/nui/tree/main/packages/nui/src/lib/components/calendar"
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
            description="Simple calendar with date selection"
            code={basicUsage}
        >
            <div class="calendar bg-base-100 border rounded-lg p-4 max-w-sm mx-auto">
                <div class="calendar-header flex items-center justify-between mb-4">
                    <button class="btn btn-ghost btn-sm" on:click={previousMonth}>
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    <h3 class="text-lg font-semibold">
                        {getMonthName(currentMonth)} {currentYear}
                    </h3>
                    <button class="btn btn-ghost btn-sm" on:click={nextMonth}>
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>
                <div class="calendar-grid">
                    <!-- Days of week header -->
                    <div class="grid grid-cols-7 gap-1 mb-2">
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                    </div>
                    <!-- Date cells -->
                    <div class="grid grid-cols-7 gap-1">
                        {#each calendarDays as day}
                            {#if day}
                                <button 
                                    class="btn btn-ghost btn-sm h-10 p-0 text-sm
                                           {isSameDate(day, selectedDate) ? 'btn-primary' : ''}
                                           {isToday(day) ? 'ring-2 ring-primary ring-opacity-50' : ''}"
                                    on:click={() => selectedDate = day}
                                >
                                    {day.getDate()}
                                </button>
                            {:else}
                                <div class="h-10"></div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Date Picker -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Date Picker Input" 
            description="Calendar component integrated with input field for date selection"
            code={datePickerCode}
        >
            <div class="form-control max-w-xs">
                <label class="label">
                    <span class="label-text">Select Date</span>
                </label>
                <div class="relative">
                    <input 
                        type="text" 
                        class="input input-bordered w-full pr-10" 
                        value={formatDate(selectedDate)}
                        on:click={() => showDatePicker = !showDatePicker}
                        readonly
                    />
                    <button 
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-sm p-1"
                        on:click={() => showDatePicker = !showDatePicker}
                    >
                        <CalendarIcon class="w-5 h-5" />
                    </button>
                    {#if showDatePicker}
                        <div class="absolute top-full left-0 mt-1 z-10 shadow-lg">
                            <div class="calendar bg-base-100 border rounded-lg p-4">
                                <div class="calendar-header flex items-center justify-between mb-4">
                                    <button class="btn btn-ghost btn-sm" on:click={previousMonth}>
                                        <ChevronLeft class="w-4 h-4" />
                                    </button>
                                    <h3 class="text-sm font-semibold">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </h3>
                                    <button class="btn btn-ghost btn-sm" on:click={nextMonth}>
                                        <ChevronRight class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="calendar-grid">
                                    <div class="grid grid-cols-7 gap-1 mb-2">
                                        <div class="text-center text-xs p-1 text-base-content/70">Su</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">Mo</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">Tu</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">We</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">Th</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">Fr</div>
                                        <div class="text-center text-xs p-1 text-base-content/70">Sa</div>
                                    </div>
                                    <div class="grid grid-cols-7 gap-1">
                                        {#each calendarDays as day}
                                            {#if day}
                                                <button 
                                                    class="btn btn-ghost btn-xs h-8 p-0 text-xs
                                                           {isSameDate(day, selectedDate) ? 'btn-primary' : ''}
                                                           {isToday(day) ? 'ring-1 ring-primary ring-opacity-50' : ''}"
                                                    on:click={() => {
                                                        selectedDate = day;
                                                        showDatePicker = false;
                                                    }}
                                                >
                                                    {day.getDate()}
                                                </button>
                                            {:else}
                                                <div class="h-8"></div>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Date Range Selection -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Date Range Selection" 
            description="Calendar with range selection for start and end dates"
            code={dateRangeCode}
        >
            <div class="space-y-4">
                <div class="flex gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Start Date</span>
                        </label>
                        <input 
                            type="text" 
                            class="input input-bordered input-sm" 
                            value={formatDate(startDate)}
                            readonly 
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">End Date</span>
                        </label>
                        <input 
                            type="text" 
                            class="input input-bordered input-sm" 
                            value={endDate ? formatDate(endDate) : ''}
                            readonly 
                        />
                    </div>
                </div>
                <div class="calendar bg-base-100 border rounded-lg p-4 max-w-sm mx-auto">
                    <div class="calendar-header flex items-center justify-between mb-4">
                        <button class="btn btn-ghost btn-sm" on:click={previousMonth}>
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        <h3 class="text-lg font-semibold">
                            {getMonthName(currentMonth)} {currentYear}
                        </h3>
                        <button class="btn btn-ghost btn-sm" on:click={nextMonth}>
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="calendar-grid">
                        <div class="grid grid-cols-7 gap-1 mb-2">
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                        </div>
                        <div class="grid grid-cols-7 gap-1">
                            {#each calendarDays as day}
                                {#if day}
                                    <button 
                                        class="btn btn-ghost btn-sm h-10 p-0 text-sm relative
                                               {isSameDate(day, startDate) ? 'btn-primary' : ''}
                                               {isSameDate(day, endDate) ? 'btn-secondary' : ''}
                                               {isInRange(day) && !isSameDate(day, startDate) && !isSameDate(day, endDate) ? 'bg-primary/20' : ''}
                                               {isToday(day) ? 'ring-2 ring-accent ring-opacity-50' : ''}"
                                        on:click={() => selectDate(day)}
                                    >
                                        {day.getDate()}
                                        {#if isInRange(day) && !isSameDate(day, startDate) && !isSameDate(day, endDate)}
                                            <div class="absolute inset-0 bg-primary/10 rounded"></div>
                                        {/if}
                                    </button>
                                {:else}
                                    <div class="h-10"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Event Calendar -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Event Calendar" 
            description="Calendar with event indicators and event management"
            code={eventCalendarCode}
        >
            <div class="space-y-4">
                <div class="calendar bg-base-100 border rounded-lg p-4 max-w-sm mx-auto">
                    <div class="calendar-header flex items-center justify-between mb-4">
                        <button class="btn btn-ghost btn-sm" on:click={previousMonth}>
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        <h3 class="text-lg font-semibold">
                            {getMonthName(currentMonth)} {currentYear}
                        </h3>
                        <button class="btn btn-ghost btn-sm" on:click={nextMonth}>
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="calendar-grid">
                        <div class="grid grid-cols-7 gap-1 mb-2">
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                            <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                        </div>
                        <div class="grid grid-cols-7 gap-1">
                            {#each calendarDays as day}
                                {#if day}
                                    {@const dayEvents = getEventsForDate(day)}
                                    <div class="relative">
                                        <button 
                                            class="btn btn-ghost btn-sm h-16 p-0 text-sm w-full flex flex-col items-center justify-start pt-1
                                                   {isSameDate(day, selectedDate) ? 'btn-primary' : ''}
                                                   {isToday(day) ? 'ring-2 ring-primary ring-opacity-50' : ''}"
                                            on:click={() => selectedDate = day}
                                        >
                                            <span class="text-xs">{day.getDate()}</span>
                                            {#if dayEvents.length > 0}
                                                <div class="flex flex-col gap-0.5 mt-1 w-full px-1">
                                                    {#each dayEvents.slice(0, 2) as event}
                                                        <div class="w-full h-1 bg-{event.type === 'meeting' ? 'primary' : event.type === 'deadline' ? 'error' : 'accent'} rounded-full"></div>
                                                    {/each}
                                                    {#if dayEvents.length > 2}
                                                        <div class="text-xs text-base-content/70">+{dayEvents.length - 2}</div>
                                                    {/if}
                                                </div>
                                            {/if}
                                        </button>
                                    </div>
                                {:else}
                                    <div class="h-16"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
                
                <!-- Events for selected date -->
                {#if getEventsForDate(selectedDate).length > 0}
                    {@const selectedEvents = getEventsForDate(selectedDate)}
                    <div class="card bg-base-100 border max-w-sm mx-auto">
                        <div class="card-body p-4">
                            <h4 class="card-title text-sm">Events on {formatDate(selectedDate)}</h4>
                            <div class="space-y-2">
                                {#each selectedEvents as event}
                                    <div class="flex items-start gap-3 p-2 bg-base-200 rounded">
                                        <div class="w-2 h-2 rounded-full bg-{event.type === 'meeting' ? 'primary' : event.type === 'deadline' ? 'error' : 'accent'} mt-2"></div>
                                        <div class="flex-1">
                                            <div class="font-medium text-sm">{event.title}</div>
                                            <div class="text-xs text-base-content/70 flex items-center gap-2">
                                                <Clock class="w-3 h-3" />
                                                {event.time}
                                            </div>
                                            {#if event.location}
                                                <div class="text-xs text-base-content/70 flex items-center gap-2">
                                                    <MapPin class="w-3 h-3" />
                                                    {event.location}
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </ComponentShowcase>
    </div>

    <!-- Disabled Dates -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Disabled Dates" 
            description="Calendar with validation and disabled date ranges"
            code={`<script>
  function isDateDisabled(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Disable past dates
    return date < today;
  }
<\/script>

<Calendar 
  bind:selectedDate 
  {isDateDisabled} 
/>`}
        >
            <div class="calendar bg-base-100 border rounded-lg p-4 max-w-sm mx-auto">
                <div class="calendar-header flex items-center justify-between mb-4">
                    <button class="btn btn-ghost btn-sm" on:click={previousMonth}>
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    <h3 class="text-lg font-semibold">
                        {getMonthName(currentMonth)} {currentYear}
                    </h3>
                    <button class="btn btn-ghost btn-sm" on:click={nextMonth}>
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>
                <div class="calendar-grid">
                    <div class="grid grid-cols-7 gap-1 mb-2">
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                    </div>
                    <div class="grid grid-cols-7 gap-1">
                        {#each calendarDays as day}
                            {#if day}
                                {@const disabled = isDateDisabled(day)}
                                <button 
                                    class="btn btn-sm h-10 p-0 text-sm
                                           {disabled ? 'btn-disabled opacity-30' : 'btn-ghost'}
                                           {!disabled && isSameDate(day, selectedDate) ? 'btn-primary' : ''}
                                           {!disabled && isToday(day) ? 'ring-2 ring-primary ring-opacity-50' : ''}"
                                    {disabled}
                                    on:click={() => !disabled && (selectedDate = day)}
                                >
                                    {day.getDate()}
                                </button>
                            {:else}
                                <div class="h-10"></div>
                            {/if}
                        {/each}
                    </div>
                </div>
                <div class="mt-4 text-sm text-base-content/70">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-base-300 rounded opacity-30"></div>
                        <span>Past dates are disabled</span>
                    </div>
                </div>
            </div>
        </ComponentShowcase>
    </div>

    <!-- Custom Styling -->
    <div class="max-w-4xl mb-12">
        <ComponentShowcase 
            title="Custom Themes" 
            description="Calendar with different themes and color schemes"
            code={customThemeCode}
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Accent theme -->
                <div class="calendar bg-accent/10 border border-accent rounded-lg p-4">
                    <div class="calendar-header flex items-center justify-between mb-4">
                        <button class="btn btn-ghost btn-sm text-accent">
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        <h3 class="text-lg font-semibold text-accent">
                            {getMonthName(currentMonth)} {currentYear}
                        </h3>
                        <button class="btn btn-ghost btn-sm text-accent">
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="calendar-grid">
                        <div class="grid grid-cols-7 gap-1 mb-2">
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Su</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Mo</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Tu</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">We</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Th</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Fr</div>
                            <div class="text-center text-sm font-medium p-2 text-accent/70">Sa</div>
                        </div>
                        <div class="grid grid-cols-7 gap-1">
                            {#each calendarDays.slice(0, 14) as day}
                                {#if day}
                                    <button class="btn btn-ghost btn-sm h-8 p-0 text-sm hover:bg-accent/20 hover:text-accent">
                                        {day.getDate()}
                                    </button>
                                {:else}
                                    <div class="h-8"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Minimal theme -->
                <div class="calendar bg-base-50 border-0 rounded-lg p-4 shadow-sm">
                    <div class="calendar-header flex items-center justify-between mb-4">
                        <button class="btn btn-ghost btn-sm text-base-content/70">
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        <h3 class="text-lg font-light text-base-content">
                            {getMonthName(currentMonth)} {currentYear}
                        </h3>
                        <button class="btn btn-ghost btn-sm text-base-content/70">
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="calendar-grid">
                        <div class="grid grid-cols-7 gap-1 mb-2">
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Su</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Mo</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Tu</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">We</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Th</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Fr</div>
                            <div class="text-center text-sm font-light p-2 text-base-content/50">Sa</div>
                        </div>
                        <div class="grid grid-cols-7 gap-1">
                            {#each calendarDays.slice(0, 14) as day}
                                {#if day}
                                    <button class="btn btn-ghost btn-sm h-8 p-0 text-sm font-light hover:bg-base-200">
                                        {day.getDate()}
                                    </button>
                                {:else}
                                    <div class="h-8"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
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
                <li>✅ Supports keyboard navigation with <kbd class="kbd kbd-sm">Arrow keys</kbd>, <kbd class="kbd kbd-sm">Enter</kbd>, and <kbd class="kbd kbd-sm">Space</kbd></li>
                <li>✅ Includes proper ARIA attributes for calendar structure and navigation</li>
                <li>✅ Screen reader announces selected dates and navigation changes</li>
                <li>✅ Focus management maintains logical tab order</li>
                <li>✅ High contrast mode support with proper color ratios</li>
                <li>✅ Date format follows locale conventions</li>
                <li>✅ Disabled dates are properly announced to screen readers</li>
                <li>✅ Calendar grid structure is semantically correct</li>
                <li>✅ Month/year navigation is keyboard accessible</li>
                <li>✅ Event indicators include proper descriptions</li>
            </ul>
        </div>
    </div>

    <!-- Examples -->
    <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-6">Common Use Cases</h2>
        
        <div class="space-y-8">
            <!-- Booking System -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Hotel Booking Calendar</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Select Your Stay</h4>
                        <p class="text-base-content/70">Choose check-in and check-out dates</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div class="space-y-4">
                                <div class="flex gap-4">
                                    <div class="form-control flex-1">
                                        <label class="label">
                                            <span class="label-text">Check-in</span>
                                        </label>
                                        <input type="text" class="input input-bordered" value={formatDate(startDate)} readonly />
                                    </div>
                                    <div class="form-control flex-1">
                                        <label class="label">
                                            <span class="label-text">Check-out</span>
                                        </label>
                                        <input type="text" class="input input-bordered" value={endDate ? formatDate(endDate) : ''} readonly />
                                    </div>
                                </div>
                                
                                <div class="stats bg-base-200 w-full">
                                    <div class="stat">
                                        <div class="stat-title">Total Nights</div>
                                        <div class="stat-value text-lg">
                                            {endDate && startDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0}
                                        </div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-title">Price per Night</div>
                                        <div class="stat-value text-lg">$129</div>
                                    </div>
                                </div>
                                
                                <div class="card-actions">
                                    <button class="btn btn-primary btn-block">Check Availability</button>
                                </div>
                            </div>
                            
                            <div class="calendar bg-base-100 border rounded-lg p-4">
                                <div class="calendar-header flex items-center justify-between mb-4">
                                    <button class="btn btn-ghost btn-sm">
                                        <ChevronLeft class="w-4 h-4" />
                                    </button>
                                    <h3 class="text-lg font-semibold">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </h3>
                                    <button class="btn btn-ghost btn-sm">
                                        <ChevronRight class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="calendar-grid">
                                    <div class="grid grid-cols-7 gap-1 mb-2">
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                                    </div>
                                    <div class="grid grid-cols-7 gap-1">
                                        {#each calendarDays as day}
                                            {#if day}
                                                {@const disabled = isDateDisabled(day)}
                                                <button 
                                                    class="btn btn-sm h-10 p-0 text-sm relative
                                                           {disabled ? 'btn-disabled opacity-30' : 'btn-ghost'}
                                                           {!disabled && isSameDate(day, startDate) ? 'btn-primary' : ''}
                                                           {!disabled && isSameDate(day, endDate) ? 'btn-secondary' : ''}
                                                           {!disabled && isInRange(day) && !isSameDate(day, startDate) && !isSameDate(day, endDate) ? 'bg-primary/20' : ''}"
                                                    {disabled}
                                                    on:click={() => !disabled && selectDate(day)}
                                                >
                                                    {day.getDate()}
                                                    {#if !disabled && isInRange(day) && !isSameDate(day, startDate) && !isSameDate(day, endDate)}
                                                        <div class="absolute inset-0 bg-primary/10 rounded"></div>
                                                    {/if}
                                                </button>
                                            {:else}
                                                <div class="h-10"></div>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Meeting Scheduler -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Meeting Scheduler</h3>
                <div class="card bg-base-100 border">
                    <div class="card-body">
                        <h4 class="card-title">Schedule New Meeting</h4>
                        <p class="text-base-content/70">Select a date and view available time slots</p>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                            <div class="calendar bg-base-100 border rounded-lg p-4">
                                <div class="calendar-header flex items-center justify-between mb-4">
                                    <button class="btn btn-ghost btn-sm">
                                        <ChevronLeft class="w-4 h-4" />
                                    </button>
                                    <h3 class="text-lg font-semibold">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </h3>
                                    <button class="btn btn-ghost btn-sm">
                                        <ChevronRight class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="calendar-grid">
                                    <div class="grid grid-cols-7 gap-1 mb-2">
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Su</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Mo</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Tu</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">We</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Th</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Fr</div>
                                        <div class="text-center text-sm font-medium p-2 text-base-content/70">Sa</div>
                                    </div>
                                    <div class="grid grid-cols-7 gap-1">
                                        {#each calendarDays as day}
                                            {#if day}
                                                {@const disabled = isDateDisabled(day)}
                                                {@const hasEvents = getEventsForDate(day).length > 0}
                                                <button 
                                                    class="btn btn-sm h-12 p-0 text-sm relative flex flex-col items-center justify-center
                                                           {disabled ? 'btn-disabled opacity-30' : 'btn-ghost'}
                                                           {!disabled && isSameDate(day, selectedDate) ? 'btn-primary' : ''}
                                                           {!disabled && isToday(day) ? 'ring-2 ring-primary ring-opacity-50' : ''}"
                                                    {disabled}
                                                    on:click={() => !disabled && (selectedDate = day)}
                                                >
                                                    <span class="text-xs">{day.getDate()}</span>
                                                    {#if hasEvents}
                                                        <div class="w-1 h-1 bg-warning rounded-full mt-1"></div>
                                                    {/if}
                                                </button>
                                            {:else}
                                                <div class="h-12"></div>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <div>
                                    <h5 class="font-semibold mb-2">Available Times for {formatDate(selectedDate)}</h5>
                                    <div class="grid grid-cols-2 gap-2">
                                        {#each ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] as time}
                                            <button class="btn btn-outline btn-sm">
                                                <Clock class="w-3 h-3 mr-2" />
                                                {time}
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Meeting Title</span>
                                    </label>
                                    <input type="text" class="input input-bordered" placeholder="Enter meeting title" />
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Attendees</span>
                                    </label>
                                    <input type="text" class="input input-bordered" placeholder="Email addresses" />
                                </div>
                                
                                <button class="btn btn-primary btn-block">
                                    <Users class="w-4 h-4 mr-2" />
                                    Schedule Meeting
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>