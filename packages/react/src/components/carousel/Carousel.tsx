/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Carousel component - embla-based with prev/next controls
 */

'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: UseEmblaCarouselType[1]) => void
}

const CarouselContext = React.createContext<CarouselStateProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }
  return context
}

type CarouselStateProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: UseEmblaCarouselType[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)
    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div
        ref={ref}
        onKeyDownCapture={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); scrollPrev() }
          else if (event.key === 'ArrowRight') { event.preventDefault(); scrollNext() }
        }}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = React.useContext(CarouselContext) ?? {}
    return (
      <div ref={carouselRef as React.Ref<HTMLDivElement>} className="overflow-hidden">
        <div
          ref={ref}
          className={cn('flex', className)}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = React.useContext(CarouselContext) ?? {}
    return (
      <button
        type="button"
        aria-label="Previous slide"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          'absolute h-8 w-8 rounded-full border border-border bg-background inline-flex items-center justify-center left-1 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100',
          className
        )}
        {...props}
        ref={ref}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
    )
  }
)
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = React.useContext(CarouselContext) ?? {}
    return (
      <button
        type="button"
        aria-label="Next slide"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background opacity-50 hover:opacity-100 absolute right-1 top-1/2 -translate-y-1/2',
          className
        )}
        {...props}
        ref={ref}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    )
  }
)
CarouselNext.displayName = 'CarouselNext'

export { type CarouselStateProps, type CarouselProps, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
