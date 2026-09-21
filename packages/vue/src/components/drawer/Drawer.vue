<!--
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Drawer component - mobile-first bottom sheet (vaul-vue)
-->
<script setup lang="ts">
import { DrawerRoot, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription, type DrawerRootEmits, type DrawerRootProps } from 'vaul-vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <DrawerRoot @update:open="emits('update:open', $event)">
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 z-50 bg-black/80" />
      <DrawerContent
        :class="cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-border bg-background',
          props.class
        )"
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <slot />
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
EOF

cat > packages/vue/src/components/drawer/DrawerContent.vue <<'VUE'
<script setup lang="ts">
import { DrawerContent as VaulContent } from 'vaul-vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <VaulContent :class="cn('fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] border border-border bg-background', props.class)">
    <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    <slot />
  </VaulContent>
</template>
EOF
rm packages/vue/src/components/drawer/DrawerContent.vue
cat > packages/vue/src/components/drawer/index.ts <<'IDX'
export { default as Drawer } from './Drawer.vue'
IDX
echo drawer-vue-done