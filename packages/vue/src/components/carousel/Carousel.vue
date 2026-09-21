<!--
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Carousel component - embla-based with prev/next controls
-->
<script setup lang="ts">
import { type HTMLAttributes, type Ref, ref, watch } from 'vue'
import emblaCarouselVue, { type EmblaCarouselType } from 'embla-carousel-vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

interface Props {
  opts?: Record<string, unknown>
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<Props>(), { orientation: 'horizontal' })
const emits = defineEmits<{ (e: 'init-api', api: EmblaCarouselType): void }>()

const emblaNode = emblaCarouselVue(props.opts as never, { align: 'start' })
const emblaApi = emblaNode[0]

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const onSelect = (api: EmblaCarouselType | undefined) => {
  if (!api) return
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
}

watch(emblaApi, (api) => {
  if (!api) return
  emits('init-api', api)
  onSelect(api)
  api.on('select', () => onSelect(api))
  api.on('reInit', () => onSelect(api))
})

function scrollPrev() { emblaApi.value?.scrollPrev() }
function scrollNext() { emblaApi.value?.scrollNext() }
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown.arrow-left.prevent="scrollPrev"
    @keydown.arrow-right.prevent="scrollNext"
  >
    <div ref="emblaNode" class="overflow-hidden">
      <div :class="cn('flex', orientation === 'vertical' && 'flex-col')" v-bind="$attrs">
        <slot />
      </div>
    </div>
    <button
      type="button"
      aria-label="Previous slide"
      :disabled="!canScrollPrev"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background absolute left-1 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
      @click="scrollPrev"
    >
      <ArrowLeft class="h-4 w-4" />
    </button>
    <button
      type="button"
      aria-label="Next slide"
      :disabled="!canScrollNext"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background absolute right-1 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
      @click="scrollNext"
    >
      <ArrowRight class="h-4 w-4" />
    </button>
  </div>
</template>
EOF

cat > src/components/carousel/index.ts <<'IDX'
export { default as Carousel } from './Carousel.vue'
IDX
npm run build 2>&1 | rg 'error|built' | head -2