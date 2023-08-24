<template>
  <div class="h-full">
    <header class="sticky top-0 max-h-screen flex gap-3 flex-col py-4 justify-between w-full overflow-hidden bg-white border-2 rounded-3xl dark:bg-neutral-900 dark:border-neutral-700" style="--stagger:1" data-animate>
      <navigationHeaderLogo />
      <div class="flex justify-around gap-4">
        <ThemeToggler />
      </div>
      <navigationHeaderItems />
      <navigationHeaderPound />
    </header>
  </div>
</template>
