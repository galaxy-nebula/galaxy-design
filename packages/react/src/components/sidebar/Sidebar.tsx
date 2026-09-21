/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Sidebar component - collapsible sidebar with mobile sheet
 */

'use client'

import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_COLLAPSED = '3rem'

type SidebarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

const SidebarProvider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
}>(({ defaultOpen = true, className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const toggle = React.useCallback(() => setOpen((prev) => !prev), [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle, isMobile: false }}>
      <div ref={ref} className={cn('flex min-h-screen w-full', className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = 'SidebarProvider'

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <aside
        ref={ref}
        className={cn(
          'fixed inset-y-0 z-10 flex-col border-r border-border bg-sidebar transition-[width] duration-200 hidden md:flex',
          open ? 'w-64' : 'w-12',
          className
        )}
        style={{ width: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED }}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { toggle, open } = useSidebar()
    return (
      <button
        ref={ref}
        onClick={toggle}
        aria-label="Toggle sidebar"
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent',
          className
        )}
        {...props}
      >
        <PanelLeft className={cn('h-4 w-4 transition-transform', !open && 'rotate-180')} />
      </button>
    )
  }
)
SidebarTrigger.displayName = 'SidebarTrigger'

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2 p-2', className)} {...props} />
  )
)
SidebarHeader.displayName = 'SidebarHeader'

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto p-2', className)} {...props} />
  )
)
SidebarContent.displayName = 'SidebarContent'

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2 p-2', className)} {...props} />
  )
)
SidebarFooter.displayName = 'SidebarFooter'

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />
  )
)
SidebarGroup.displayName = 'SidebarGroup'

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground', className)} {...props} />
  )
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />
  )
)
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('group/menu-item relative', className)} {...props} />
  )
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
}>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    data-active={isActive}
    className={cn(
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = 'SidebarMenuButton'

export {
  SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, useSidebar,
}
EOF

cat > /Users/buitronghieu/Desktop/Project/galaxy/galaxy-design/packages/react/src/components/sidebar/index.ts <<'IDX'
export {
  SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, useSidebar,
}
IDX
echo sidebar-react-done