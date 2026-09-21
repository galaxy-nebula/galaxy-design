# Framework Notes — gotchas per framework

## Vue

- **Date components** (`date-picker`, `date-range-picker`, `calendar`): `modelValue` is radix **`DateValue`** (from `@internationalized/date`), NOT native `Date`. Bridge with `.toDate(getLocalTimeZone())`.
- **Calendar** uses radix-vue subcomponents (`CalendarRoot`, `CalendarGrid`...). The slot provides `grid` = array of `{ value, rows, cells }` objects — iterate `month.rows`, pass `:date` to `CalendarCell`, `:day` + `:month` to `CalendarCellTrigger`.
- **Toast** uses `vue-sonner` (`Toaster` + `toast()` from the toast component index).
- Templates cannot use TS assertions directly in expressions — move to script or computed.

## Angular

- All components are **standalone** with `ui-*` selectors (e.g., `ui-combobox`, `ui-data-table`).
- Form controls implement `ControlValueAccessor` — use `[(ngModel)]` or ReactiveForms.
- **Alert Dialog** uses `@radix-ng/primitives` with an injected service (`RdxAlertDialogService`), not template-only wiring.
- Blocks live in `blocks/<name>-block/` with their own `index.ts` exports.

## React / Next.js

- Reference implementation — all components mirror the shadcn structure with Galaxy contracts.
- `data-table` uses TanStack-style column definitions.

## React Native

- **NativeWind** classes (same Tailwind syntax, `className` prop).
- No web date libraries — Calendar/TimePicker are custom implementations.
- Blocks are available (login-block, pricing-block); dashboard-block is web-only.

## Flutter

- Material 3 widgets, `Galaxy` prefix (`GalaxyCalendar`, `GalaxyOTPInput`).
- Date/time pickers delegate to Flutter's native `showDatePicker`/`showTimePicker`.

## Web-only components (not on mobile)

`breadcrumb`, `command`, `combobox`, `dashboard-block`, `data-table`, `kbd`, `toolbar`, `resizable`, `scroll-area` — use platform-native equivalents.
