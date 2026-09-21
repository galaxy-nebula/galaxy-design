<!--
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Sidebar component - collapsible sidebar
-->
<script setup lang="ts">
import { type HTMLAttributes, provide, ref } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), { defaultOpen: true })
const open = ref(props.defaultOpen)

function toggle() {
  open.value = !open.value
}

provide('sidebar', { open, toggle })
</script>

<template>
  <div :class="cn('flex min-h-screen w-full', props.class)">
    <slot :open="open" :toggle="toggle" />
  </div>
</template>
EOF

cat > /Users/buitronghieu/Desktop/Project/galaxy/galaxy-design/packages/vue/src/components/sidebar/SidebarNav.vue <<'VUE'
<!--
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Sidebar nav panel - collapsible
-->
<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), { open: true })
const emits = defineEmits<{ (e: 'toggle'): void }>()

const width = computed(() => (props.open ? '16rem' : '3rem'))
</script>

<template>
  <aside
    :class="cn(
      'fixed inset-y-0 z-10 hidden flex-col border-r border-border bg-sidebar transition-[width] duration-200 md:flex',
      props.class
    )"
    :style="{ width }"
  >
    <div class="flex items-center justify-end p-2">
      <button
        aria-label="Toggle sidebar"
        class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
        @click="emits('toggle')"
      >
        <PanelLeft class="h-4 w-4" />
      </button>
    </div>
    <slot />
  </aside>
</template>
EOF

cat > /Users/buitronghieu/Desktop/Project/galaxy/galaxy-design/packages/vue/src/components/sidebar/index.ts <<'IDX'
export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarNav } from './Sidebar.vue'
IDX
echo sidebar-vue-done