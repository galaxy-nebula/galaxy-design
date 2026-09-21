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
