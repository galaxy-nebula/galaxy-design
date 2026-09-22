# Component Patterns

## Form composition (web)

```vue
<Form class="space-y-4" @submit.prevent>
  <FormItem>
    <FormLabel for="email">Email</FormLabel>
    <Input id="email" type="email" placeholder="m@example.com" />
    <FormDescription>We'll never share your email.</FormDescription>
    <FormMessage />
  </FormItem>
  <Button type="submit">Submit</Button>
</Form>
```

## Dialog flow

Dialog/AlertDialog use radix state: render `<DialogTrigger as-child>` with a Button, content hidden until open. Never pre-open dialogs in previews.

## Date pickers

DatePicker = Popover (trigger button showing formatted date) + Calendar in PopoverContent. In Vue, pass/emit radix `DateValue`; format with date-fns after converting to native Date.

## Data Table

`<DataTable :columns="[...]" :data="[...]" />` — columns define key/header/sortable. Sorting toggles asc/desc on header click.

## Toast

Mount `<Toaster />` once (App root), fire with `toast('message')` imported from the toast component index.

## Blocks

Login/pricing/dashboard blocks are composite pages — install with `nebula add login-block` and customize. Dashboard block = sidebar + stat cards + table.

## Assistant UI (React, phase 1)

Assistant components power AI-native surfaces (VSCode webviews, sidebars, agent panels). All four live in `@/components/assistant/<name>/` and are stateless/dumb — state lives in the host app:

- `ChatPanel` — message list + tool-call cards + composer. Props: `messages`, `model`, `onSendMessage`, `onStop`, `busy` via `messages.some(m => m.streaming)`.
- `AgentActivity` — task checklist + progress + tool log. Props: `tasks` (`pending|running|completed|error`), `toolEvents`, `status`, `elapsedLabel`.
- `DiffReview` — accept/reject per file, unified diff lines with `+`/`-` prefixes. Props: `files` (`DiffFile[]`), `onAccept`, `onReject`, `onAcceptAll`, `onRejectAll`.
- `PromptBox` — standalone composer with auto-resize, slash commands, attachments, model pill.

Install with `nebula add chat-panel` etc. Docs: https://galaxy-nebula.vercel.app/assistant/overview
