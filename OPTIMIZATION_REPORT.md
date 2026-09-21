# Galaxy UI — Báo Cáo Tối Ưu Hợp Nhất Và Kế Hoạch Triển Khai

> Phạm vi audit: `galaxy-design`, `galaxy-design-cli`, `docs-galaxy-desgin`
>
> Thời điểm kiểm tra: 04/09/2026
>
> Mục tiêu: giữ triết lý copy-paste của shadcn, nhưng cung cấp component nhất quán cho nhiều framework và hỗ trợ Tailwind CSS v3/v4 một cách có kiểm chứng.

Kế hoạch này ưu tiên ba web framework React, Vue và Angular theo phạm vi audit. React Native và Flutter cần một compatibility matrix riêng ở giai đoạn tiếp theo; Next.js và Nuxt được xem là target dẫn xuất lần lượt từ React và Vue, nhưng vẫn phải có integration fixture riêng.

## Cập Nhật Triển Khai P0 — 04/09/2026

Các thay đổi sau đã được triển khai trong working tree sau khi báo cáo được duyệt:

- **Hoàn thành:** thu hồi refactor runtime `@galaxy-ui/core` chưa hoàn chỉnh; React/Vue/Angular build và smoke import lại thành công với `variants.ts` framework-local.
- **Hoàn thành:** scaffold Tailwind v4 có `@theme inline`, dark custom variant và `tw-animate-css`; v3 có `tailwindcss-animate`; `tailwind-merge` được chọn v2/v3 theo target.
- **Hoàn thành:** migration v3 → v4 có dry-run, backup `.galaxy/backups`, preserve custom PostCSS plugin, giữ legacy config bằng `@config`, chuyển đúng ESM/CommonJS PostCSS, thêm Galaxy semantic theme và trả exit code khác 0 khi hard failure.
- **Đã kiểm chứng:** Tailwind v4 semantic utilities compile; fixture migration React/Vue/Angular build thành công; docs VitePress đã được chuyển sang Tailwind 4.3.3 và build thành công.
- **Hoàn thành:** CLI emit `.d.ts`, có strict typecheck riêng, bỏ hardcoded Bun path, sửa registry dependencies, schema pointers và block file references; audit mới kiểm tra component/block files, imports/dependencies, group references và schema resolution.
- **Hoàn thành tạm thời:** CLI không còn fetch `main`; source được pin vào commit `a1978198a3d97b59d1088ecdfe58910bd123fcc5`, có override `GALAXY_DESIGN_SOURCE_REF` cho development. Versioned registry + checksum vẫn thuộc P1.4.
- **Hoàn thành local, chờ deploy:** docs có `cleanUrls`, `/schema.json`, nội dung CLI/Tailwind và matrix trung thực hơn, cùng script `smoke:production`. Điều kiện HTTP 200 chỉ được đóng sau lần deploy Vercel kế tiếp.
- **P1.1 (mới):** đã tạo `packages/contracts` với JSON Schema manifest và
  **61 manifest** cho toàn bộ component installable của CLI: 7 manifest viết tay
  (`button`, `dialog`, `select`, `date-picker`, `gauge-chart`, `toast`,
  `toolbar`) và 54 manifest bootstrapped từ CLI registries (props
  framework-local, selector/providers Angular, exports audit-compatible).
  Validator đối chiếu file/export/dependency thật; generator sinh framework
  registries + summary + coverage; check chống stale artifacts.
- **P1.1 normalized props (mới):** toàn bộ manifest bootstrap giờ có normalized
  root props sinh từ merge props framework-local (alias `className/class`,
  `modelValue/value`, `onValueChange/valueChange`, `child/children` gộp đúng
  bucket; khác biệt tên/type/default ghi thành per-framework overrides).
  Framework-local props giữ nguyên trong manifest để CLI entries giữ fidelity;
  props framework-local cho 7 pilot đã phục hồi đầy đủ, kèm validator gate yêu
  cầu mọi implemented framework phải khai báo `props` list.
- **CLI đã consume manifests (mới):** `scripts/sync-contracts.mjs` trong CLI
  thay toàn bộ component entries của 5 framework registry từ
  `packages/contracts/generated`; `npm run audit:registry` pass và `npm run
verify` full pass với registry được sinh từ manifest. CLI registries giờ là
  generated output; `manifests/*.json` là nguồn duy nhất cần sửa tay.
- **Docs matrix đã generate (mới):** `scripts/generate-coverage.mjs` cập nhật
  bảng platform coverage (React 65, Vue 61, Angular 60, RN 50, Flutter 49 — gồm
  block; 56 component web dùng chung) trực tiếp từ `coverage.json`; VitePress
  build pass.
- **P1.2 bug fixes (mới):** (1) Angular Command giờ emit đúng output
  `searchChange` (trước đó gọi `search.emit` gây runtime error); (2) Angular
  Alert Dialog action đóng qua `RdxAlertDialogService` thay vì tái dùng cancel
  directive; (3) Angular Tooltip được sửa sang API thật của Radix NG
  (`RdxTooltipRoot/Trigger/ContentDirective` từ `@radix-ng/primitives/tooltip`)
  và root-export cùng Toast — build Angular giờ compile thật cả hai (trước đó
  import `tooltip2`/`RdxTooltip` không tồn tại nhưng được ng-packagr bỏ qua vì
  không root-export); (4) providers giả `provideRdxTooltipConfig` đã bị gỡ khỏi
  registry + CLI test cập nhật; `ngx-sonner` được thêm làm dependency thật của
  Angular.
- **P1.2 Sheet (mới):** Angular Sheet được nâng cấp có dialog semantics —
  Escape close, body scroll lock, CDK focus trap, `aria-modal`, và subparts
  SheetTrigger/SheetClose/Header/Footer/Title/Description khớp API React;
  manifest + CLI registry cập nhật kèm dependency `@angular/cdk` được khai báo
  đúng.
- **P1.2 Select (mới):** Angular Select có đủ listbox keyboard behavior —
  roving active item (Arrow/Home/End, skip disabled), typeahead 500ms,
  Enter/Space chọn active, `aria-activedescendant`/`aria-controls`/`aria-
autocomplete` wiring, re-subscribe khi items thay đổi; đồng thời sửa bug dấu
  check không bao giờ hiển thị (`isSelected` không được set từ parent).
- **P1.2 ScrollArea (mới):** Angular ScrollArea giờ render custom scrollbars —
  thumb dọc/ngang có pointer drag, metrics cập nhật qua scroll event +
  ResizeObserver, corner element, và ẩn native scrollbar (trước đây chỉ là
  `overflow-auto` với native scrollbar).
- **P1.2 Vue charts (mới):** RadarChart và ScatterChart trên Vue thiếu hoàn
  toàn lệnh đăng ký ECharts modules (`use([...])`) — chart render trống im
  lặng khi runtime. Đã đăng ký đúng `RadarChart`/`ScatterChart` + các
  component/renderer tương ứng; Vue build + smoke import pass.
  Lưu ý: bug này tồn tại ở **cả hai cây** (`charts/` và `<name>-chart/` của
  Vue); bản được CLI install (`<name>-chart/*.vue`) cũng đã được sửa. Đây là
  bằng chứng mạnh nhất cho P1.3: hai cây không chỉ drift API mà còn drift cả
  bug fixes.
- **P1.3 chart consolidation (mới, đã duyệt):** cây `charts/` trùng lặp đã bị
  xóa trên cả 3 framework; `charts/index.ts` giờ là compatibility barrel
  re-export từ cây canonical `<chart-name>/` (không phá import cũ). Port fix
  theme-aware colors (`getThemeColors`) cho radar/scatter trên React + Vue;
  tree `<name>-chart/` giữ typed baseSeries của MixedChart. Gauge chart được
  port cho React (`echarts-for-react`) + Vue (`vue-echarts`) từ bản Angular —
  React giờ **full coverage 61/61 component**, Vue/Angular chỉ còn thiếu 4
  date/time pickers. Manifest + CLI registries (react 61, vue 57) + summary +
  audit + docs coverage (React 66, Vue 62 tổng) đều đã cập nhật và pass.
- **P1.2 Vue pickers (mới):** port 4 component date/time sang Vue —
  DatePicker, DateRangePicker, TimePicker, DateTimePicker — dùng radix-vue
  Popover/Calendar/Select + date-fns formatting, v-model API. Vue registries
  giờ **61/61 component (full parity với React)**; docs coverage Vue = 66 tổng.
  Angular vẫn thiếu 4 picker (đợt tiếp theo).
- **P1.2 Angular pickers (mới) — web full parity:** port 4 component date/time
  sang Angular (date-picker, date-range-picker, time-picker, date-time-picker)
  dùng popover + calendar/calendar-range/select composition và date-fns
  formatting; bổ sung input `disabled` cho `ui-popover-trigger`. Kết quả:
  **React, Vue, Angular đều đạt 61/61 component — không còn gap availability**
  trên web; CLI registries + summary + audit + docs coverage (React 66, Vue 66,
  Angular 64 tổng) đều cập nhật và pass.
- **P2.1 list + doctor (mới):** CLI bổ sung hai lệnh còn thiếu trong roadmap —
  `galaxy-design list [--framework] [--category]` (liệt kê component/block theo
  registry, group theo category, exit code 0/1) và `galaxy-design doctor`
  (kiểm tra components.json, framework detection, Tailwind version/CSS/config/
  theme bridge/animation, utils + components path với alias resolution đúng
  src layout, và các dependency bắt buộc kèm tailwind-merge version match).
  Exit code khác 0 khi check bắt buộc thất bại; docs CLI (EN + VI) đã cập nhật
  theo các lệnh mới. Verify CLI pass 16 tests (fixture ENOENT của
  `test/galaxy-*-lint` là vấn đề môi trường — thư mục fixture không tồn tại
  trong máy hiện tại).
- **P2.1 diff + update + P1.4 artifact (mới):** `galaxy-design diff
[components...]` — fetch source từ pinned commit, so file local vs registry
  (unchanged/modified/missing), exit 1 khi khác biệt; `galaxy-design update
[components...]` — ghi đè file local từ registry, backup tự động vào
  `.galaxy/backups/update/`, cần `.galaxy/installed-components.json` (add
  command giờ ghi file manifest này). P1.4: `packages/contracts
  build:artifact` sinh versioned release artifact `dist/registry/<version>/`
  (7 files, sha256 per file + digest) — ready cho CDN distribution.
- **Release prep (mới):** galaxy-design committed + pushed (`b532037`, 166
  files); CLI source pin cập nhật sang `b532037` (fetch smoke OK cho gauge
  react/vue, date-picker vue/angular, RN accordion); verify CLI pass với pin
  mới; version bump **0.3.0**; CLI committed (`637eb4b`, kèm `.galaxy/`
  untrack + gitignore). CLI sẵn sàng `npm publish` — người dùng thực hiện
  (cần npm credentials); docs deploy Vercel + smoke cũng thuộc người dùng.
- **P1.4 CDN live (mới):** registry artifacts (7 JSON + **673 source files**)
  đã serve tại `galaxy-nebula.vercel.app/registry/` qua docs repo; CLI có
  `--registry-url` / `GALAXY_REGISTRY_URL` — fetch manifest, verify digest
  (trust anchor `b351c8a1...` bundled trong CLI release), verify sha256 per
  source file, rồi mới install. E2E test pass: `add accordion
--registry-url https://galaxy-nebula.vercel.app/registry` fetch + verify +
  install, content khớp artifact 100%. GitHub pin vẫn là default; CDN là
  opt-in cho đến khi digest rotation flow hoàn thiện.
- **P1.4 rotation flow CI (mới):** GitHub Actions workflow `registry-release.yml`
  — validate manifests → generate artifacts → build versioned artifact →
  deploy docs → update CLI digest → commit + push, chạy tự động khi manifests
  thay đổi trên main.
- **Mobile toast (mới):** React Native (custom Animated fade, variants, a11y)
  - Flutter (SnackBar wrapper với `GalaxyToastVariant`) — mobile matrix giờ
    **48/61** (7 needs port, 6 web-only).
- **P2.2 iconLibrary + aliases.ui (mới):** `icon-transformer.ts` transform
  lucide imports sang heroicons/radix-icons cho ~9 icon phổ biến; framework
  không map được giữ nguyên lucide (fallback). `add` giờ dùng
  `config.aliases.ui` thay vì hardcode `/ui` suffix. `--overwrite` flag với
  backup đã wire. Còn mở: JS mode (strip types), prefix, cssVariables false.
- **Combobox (mới):** component mới cho React (cmdk-based) + Vue (custom filter)
  — searchable select với filtered dropdown. Registry: React 62, Vue 62
  components. Manifest + CLI + docs coverage đã cập nhật.
- **Dashboard Block (mới):** block đầu tiên — full page với collapsible
  sidebar, 4 stat cards, recent activity table, responsive grid. React
  (`echarts-for-react` + `button` deps) + Vue + Angular. Registry: React 64,
  Vue 64, Angular 62 components. Docs coverage: React 69, Vue 69, Angular 65
  tổng. Pipeline end-to-end verified: manifest → artifact → CLI sync → CDN
  → CLI add.
- **P2.2 JS mode + cssVariables + prefix (mới):** (1) `js-transformer.ts`
  dùng SWC strip TypeScript types khi `typescript: false` — `.ts`→`.js`,
  `.tsx`→`.jsx`; (2) scaffold `cssVariables: false` sinh CSS không dùng
  `hsl(var(--x))` (direct colors); (3) `prefix` param trong Tailwind v3 config
  (`prefix: "xxx-"`). Tất cả wired qua `TailwindScaffoldOptions` +
  `CopyComponentFilesOptions.typescript`.
- **Còn mở:** behavioral/accessibility parity, hợp nhất chart tree, transaction rollback khi dependency install thất bại, visual/computed-style assertions, versioned CDN/checksum và docs generation tự động; đồng bộ CLI/docs để consume `packages/contracts/generated`.

Các mục “hiện trạng” bên dưới giữ lại bằng chứng audit ban đầu. Khi có khác biệt, phần cập nhật triển khai này là trạng thái mới nhất.

---

## 1. Kết Luận Điều Hành

Galaxy UI có hướng kiến trúc đúng: source component tách theo framework, CLI chịu trách nhiệm cài source vào dự án người dùng, docs là bề mặt tra cứu chung. Tuy nhiên, hệ thống hiện giống ba implementation song song hơn là một design system có contract chung.

| Câu hỏi                                             | Kết luận hiện tại                                                                                                                  |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| React, Vue, Angular đã đồng bộ chưa?                | Chưa. Registry integrity đã được siết chặt, nhưng availability, public exports, API, hành vi và accessibility còn lệch.            |
| Source có phải chủ yếu dựa trên Tailwind v3 không?  | Có. Convention, semantic tokens và một số utility vẫn mang semantics v3.                                                           |
| CLI có biết Tailwind v4 không?                      | Có detection, scaffold và migration v3 → v4 đã chạy qua compile/build fixtures đại diện.                                           |
| Có chuyển đổi v3 ↔ v4 không?                        | Có upgrade v3 → v4 kèm backup/dry-run; không có và không cam kết downgrade v4 → v3 lossless.                                       |
| Có thể tuyên bố component hỗ trợ Tailwind v4 không? | Có ở mức scaffold/build compatibility đã test; chưa có visual/behavior contract đủ để tuyên bố parity tuyệt đối cho mọi component. |
| Điểm nghẽn lớn nhất                                 | Không có một component manifest/contract duy nhất để sinh và kiểm tra source, registry, docs, dependencies và framework parity.    |

Khuyến nghị tổng quát:

1. Ổn định build/release hiện tại trước khi tiếp tục mở rộng component.
2. Xây một manifest chuẩn làm source of truth; AST chỉ dùng để kiểm chứng manifest và hỗ trợ code generation.
3. Cung cấp hai Tailwind adapter rõ ràng cho v3 và v4, dùng chung semantic design tokens.
4. Định nghĩa parity ở cấp hành vi/API/accessibility, không chỉ dựa vào việc có thư mục hoặc file.
5. Phân phối registry theo release bất biến, có version và checksum; không fetch trực tiếp nhánh `main`.

---

## 2. Đánh Giá Và Điều Chỉnh Các Đề Xuất Ban Đầu

Năm hướng đề xuất ban đầu đều được giữ lại, nhưng cần điều chỉnh phạm vi triển khai như sau.

| Đề xuất ban đầu                                  | Đánh giá                                                                                                                                                                                         | Quyết định hợp nhất                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auto-generator registry bằng AST                 | Đúng hướng, nhưng không nên coi AST extraction là nguồn chân lý 100%. AST không tự suy ra được behavioral contract, accessibility, dependency policy hoặc mapping props khác tên giữa framework. | Tạo manifest khai báo chuẩn; dùng `ts-morph`, Vue compiler và Angular compiler để validate imports/exports/props/dependencies so với manifest và sinh registry/docs. |
| Chuyển `variants.ts` và `utils.ts` vào core      | Hợp lý nếu core là nguồn template dùng lúc build/copy. Không hợp lý nếu component được copy phải import runtime từ package core private.                                                         | Giữ một shared template/canonical source, nhưng CLI materialize file vật lý vào project người dùng. Không tạo runtime lock-in.                                       |
| Port component còn thiếu và nâng cấp Tailwind v4 | Cần thiết, nhưng phải tách “availability parity” khỏi “behavior parity”; class v3 không luôn giữ nguyên giá trị/semantics trên v4.                                                               | Xây Tailwind contract v3/v4 trước, rồi port/hoàn thiện component dựa trên contract tests chung.                                                                      |
| Đưa registry lên Vercel                          | Hợp lý nếu artifact bất biến theo release. Dùng một URL `latest` duy nhất vẫn có rủi ro tương tự fetch `main`.                                                                                   | Publish `/registry/<version>/...`, manifest release và checksum; `latest` chỉ là alias có kiểm soát. Có thể dùng Vercel CDN, GitHub Release hoặc npm artifact.       |
| Docs tự lấy code từ source                       | Đúng hướng để loại bỏ copy thủ công. Tuy nhiên VitePress/Vue không thể trực tiếp chạy demo React/Angular chỉ bằng cách import file.                                                              | Generate code tabs từ source thật; chạy interactive demo trong fixture/app riêng theo framework hoặc iframe. Docs không giữ bản copy component độc lập.              |

---

## 3. Hiện Trạng Đã Kiểm Chứng

### 3.1. Component Matrix

Số lượng khác nhau tùy theo lớp đang xét:

| Bề mặt                                 | React | Vue | Angular | Chung cả 3 |
| -------------------------------------- | ----: | --: | ------: | ---------: |
| Thư mục source                         |    61 |  57 |      60 |         57 |
| Public root exports                    |    53 |  49 |      47 |         47 |
| Component registry, chưa gồm blocks    |    60 |  56 |      57 |         56 |
| CLI catalog sau khi merge block hợp lệ |    65 |  61 |      60 |         59 |

Khoảng chênh giữa ba hàng là dấu hiệu source, public API và registry chưa được sinh từ cùng một nguồn.

Các gap availability chính:

- React-only trong CLI: `date-picker`, `date-range-picker`, `date-time-picker`, `time-picker`.
- Trong ba web target, `gauge-chart` chỉ được CLI expose cho Angular, dù source chart của React/Vue có implementation liên quan. React Native và Flutter cũng có registry entry cho Gauge.
- React/Vue expose năm block; Angular hiện chỉ expose ba block có source cài được (`authentication`, `chat-ui`, `sidebar`). `email` và `featured` Angular đã bị loại khỏi registry cho đến khi implementation hoàn chỉnh.
- React có package subpath export `./components/*`, Vue và Angular chỉ expose root.
- Docs matrix đã bỏ tuyên bố “41 component/complete” và hiện công bố số registry entry cùng các gap chính; bước tiếp theo là generate matrix từ manifest.

### 3.2. Cùng Tên Nhưng Chưa Cùng Hành Vi

Các ví dụ điển hình:

- React Dropdown dùng Radix Root/Trigger/Portal và state/positioning thật; Angular Dropdown root, trigger và content phần lớn mới là wrapper `div`/`button`.
- React Command dựa trên `cmdk` và có anatomy đầy đủ; Vue/Angular mới là input + content đơn giản. Angular còn gọi `search.emit()` trong khi output tên `searchChange`.
- React Form tích hợp `react-hook-form`, context, validation và ARIA; Vue/Angular chủ yếu mới cung cấp wrapper/context tối thiểu.
- Angular Sheet thiếu dialog semantics, focus trap, Escape handling, portal và liên kết title/description.
- Angular Select chưa có roving focus/typeahead đầy đủ; ScrollArea chưa có primitive/custom scrollbar tương đương.
- Angular Alert Dialog dùng cancel directive cho cả action và cancel.
- Angular Toast/Tooltip có import/dependency bất nhất và không được root-export.

Vì vậy một component chỉ được đánh dấu “complete” khi đạt đủ source, export, registry, dependency, build, behavior, accessibility và docs — không phải chỉ khi thư mục tồn tại.

### 3.3. Charts

Cả ba framework đang có hai cây implementation:

- `components/charts/*`
- `components/area-chart`, `bar-chart`, `line-chart`, ...

Hai cây đã drift về props, types, exports và bug fixes. Cần giữ đúng một implementation tree/canonical schema và generate adapter hoặc entry point cần thiết.

### 3.4. Tailwind CSS

| Lớp                   | Trạng thái v3                                 | Trạng thái v4                                                                         |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| Base component source | Dùng semantic class theo convention shadcn/v3 | Dùng cùng class contract qua Galaxy `@theme inline`; còn cần visual regression đầy đủ |
| CLI init              | Scaffold v3 + animation plugin đã có test     | Scaffold v4 + semantic tokens + animation import đã compile                           |
| CLI migration         | N/A                                           | v3 → v4 có backup/dry-run/PostCSS merge/theme adapter/build fixtures                  |
| Docs                  | Nội dung vẫn mô tả target v3 khi cần          | Site runtime đã chuyển sang Tailwind 4.3.3 và build pass                              |
| `tailwind-merge`      | CLI chọn nhánh 2.6 cho target v3              | CLI chọn nhánh 3.x cho target v4                                                      |

Lỗi v4 quan trọng nhất tại thời điểm audit (đã được sửa trong scaffold):

- CLI sinh `@import "tailwindcss"` và CSS variables như `--border`, `--background`.
- Sau đó dùng `@apply border-border bg-background text-foreground`.
- Không có `@theme`/`@theme inline` và namespace `--color-*` để Tailwind v4 sinh các utility đó.
- Compile thực tế bằng Tailwind 4.1.x thất bại với `Cannot apply unknown utility class border-border`.

Theo tài liệu Tailwind, custom utility được tạo từ theme variables khai báo qua [`@theme`](https://tailwindcss.com/docs/theme). shadcn v4 dùng [`@theme inline`](https://ui.shadcn.com/docs/tailwind-v4) để ánh xạ semantic CSS variables.

Các vấn đề bổ sung:

- Source web có 127 lần dùng các utility đã đổi tên hoặc đổi nghĩa giữa v3/v4 như `outline-none`, `rounded-sm`, `shadow-sm`, `blur-sm`.
- Component dùng nhiều `animate-in`, `fade-in-*`, `zoom-in-*`; scaffold hiện đã thêm `tailwindcss-animate` cho v3 và `tw-animate-css` cho v4.
- `packages/tailwind-preset` hiện chỉ là placeholder trả chuỗi `tailwind-preset`.
- Test CLI hiện compile semantic CSS v4 và build migration fixtures React/Vue/Angular; visual/computed-style assertion vẫn còn mở.

### 3.5. Migration Tailwind

`galaxy-design migrate tailwind` hiện thực hiện:

- đổi dependency;
- thay `@tailwind base/components/utilities` bằng v4 imports + Galaxy `@theme inline`;
- preserve legacy config bằng `@config`;
- merge PostCSS object config, giữ plugin khác và chuyển module format theo project;
- cập nhật version trong `components.json`.
- tạo backup trước khi ghi và rollback nếu bước ghi file thất bại.

Nó chưa thực hiện hoàn chỉnh:

- chuyển các utility có semantics thay đổi;
- tự gọi official upgrader/AST parser cho config phức tạp;
- rollback toàn bộ nếu dependency install hoặc framework build bên ngoài command thất bại;
- v4 → v3.

Tailwind có official upgrader [`@tailwindcss/upgrade`](https://tailwindcss.com/docs/upgrade-guide). Galaxy CLI nên tận dụng hoặc bao quanh công cụ này, sau đó áp dụng Galaxy-specific theme adapter và chạy verification.

Không nên cam kết migration lossless hai chiều. Hướng thực tế hơn:

- hỗ trợ init/add native cho cả target v3 và v4;
- hỗ trợ upgrade v3 → v4 có backup, dry-run và verification;
- khi cần downgrade, regenerate Galaxy assets cho target v3 trên một branch/snapshot thay vì cố đảo ngược toàn bộ CSS-first config.

### 3.6. CLI Và Registry

Các vấn đề release-safety đã xác nhận và trạng thái xử lý:

- Source fetch đã được pin vào commit bất biến; versioned artifact/checksum vẫn còn ở P1.4.
- Các missing dependency đã biết và block file reference sai đã được sửa; block chưa hoàn chỉnh bị ẩn khỏi registry.
- Schema pointers đã trỏ tới file tồn tại; audit bao phủ schema resolution, component/block files, imports/dependencies và group references. Full JSON Schema engine/public export parity vẫn cần mở rộng.
- Hard failure chính của `init`, `add`, `migrate` đã đặt non-zero exit code.
- Build CLI hiện emit declaration và có strict typecheck.
- `add` ghi source trước khi cài dependency và không rollback nếu install thất bại.
- Các option `iconLibrary`, JavaScript mode, `tailwind.prefix`, `cssVariables`, `aliases.ui` chưa được áp dụng nhất quán.
- Docs CLI đã thu hẹp theo đúng `init`, `add`, `migrate tailwind`; `list/diff/update/doctor` giữ ở roadmap P2.

### 3.7. Docs Và Vercel

- Vercel config đã thêm `cleanUrls`; cần deploy để xác nhận URL extensionless trả 200.
- `public/schema.json` đã được thêm và build artifact đã kiểm tra; cần deploy để canonical URL trả 200.
- Docs matrix, CLI commands và Tailwind guide chính đã được đồng bộ; các framework example cũ còn cần generation từ manifest.
- Có 11 component preview được Markdown tham chiếu nhưng chưa đăng ký trong VitePress theme; build vẫn pass và render vùng preview rỗng.
- Docs giữ một bản copy Vue UI riêng đã drift so với `galaxy-design`.
- VI sidebar trỏ tới một số guide chưa tồn tại; edit links trỏ nhầm repository/path.
- Local VitePress build pass nhưng không compile code fences, không validate imports và không phát hiện preview rỗng.

### 3.8. Build, Type Safety Và WIP Hiện Tại

Clean HEAD của `galaxy-design` có thể build ba web package, nhưng build config đang tắt typecheck (`noCheck`/`strict: false`). Strict typecheck vẫn có nhiều diagnostics ở cả React, Vue và Angular; chưa có test suite component hoạt động hoặc CI workflow đầy đủ.

Refactor shared variants chưa hoàn tất đã được thu hồi khỏi working tree: component dùng lại sidecar `variants.ts` framework-local, alias core sai đã bị bỏ, và build/smoke của ba web package đã pass. Canonical shared template vẫn là công việc P1, không phải runtime dependency.

---

## 4. Kiến Trúc Đích Đề Xuất

```text
Canonical component manifest + shared design contract
├── Framework implementations
│   ├── React
│   ├── Vue
│   └── Angular
├── Generated framework-local shared files
│   ├── variants
│   ├── class helpers
│   └── Tailwind-mode-specific assets
├── CLI registries + dependency metadata
├── Versioned registry artifacts + checksums
├── Docs matrix + code tabs + API tables
└── CI contract tests + Tailwind v3/v4 fixtures
```

Phân lớp package khuyến nghị:

| Lớp                                | Trách nhiệm                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `packages/contracts`               | Manifest schema, normalized component contract, shared types cho tooling; không chứa framework runtime. |
| `packages/registry`                | Canonical templates/content builder và generated artifact; dùng ở maintainer/release time.              |
| `packages/tailwind`                | Semantic token source cùng adapter v3 JS preset và v4 CSS theme.                                        |
| `packages/react`, `vue`, `angular` | Implementation idiomatic theo framework và framework-specific behavior.                                 |

Tên package chỉ là đề xuất; điều bắt buộc là tách rõ contract/template-time khỏi runtime dependency.

Quyền sở hữu đề xuất:

- `galaxy-design` sở hữu canonical manifest, source templates, Tailwind adapters và tạo release artifact.
- `galaxy-design-cli` chỉ consume artifact đã pin, thực hiện transform/materialize và ghi version/checksum vào `components.json`.
- `docs-galaxy-desgin` consume đúng cùng artifact version để sinh matrix, API và code examples.
- Release manifest phải ghi rõ mapping giữa version core/registry, CLI và docs deployment để tránh ba repo trôi độc lập.

### 4.1. Canonical Manifest

Mỗi component nên có manifest chứa tối thiểu:

- `id`, category, maturity/status;
- availability theo framework;
- anatomy/subcomponents;
- normalized props/events và mapping tên theo framework;
- controlled/uncontrolled behavior;
- keyboard/focus/ARIA invariants;
- runtime/dev dependencies theo framework;
- source files và public exports;
- Tailwind tokens, animation requirements và version constraints;
- docs/examples/tests tương ứng.

AST tooling có nhiệm vụ:

- phát hiện import nhưng manifest thiếu dependency;
- kiểm tra file/export khai báo có tồn tại;
- trích xuất prop signatures để so với mapping;
- sinh registry/docs/schema;
- báo drift, không âm thầm ghi đè quyết định semantic của maintainer.

### 4.2. Shared Core Không Tạo Runtime Lock-In

Nên phân biệt hai loại shared code:

1. **Maintainer-time shared source/template:** canonical variants, token definitions, registry helpers. Đây là nguồn để generator tạo file framework-local.
2. **Runtime package:** chỉ dùng nếu thực sự có logic framework-neutral cần publish và version như dependency.

`variants.ts` và `cn()` trong mô hình copy-paste nên được materialize vào project người dùng. Component được add không nên phụ thuộc vào một package core private hoặc hidden alias.

### 4.3. Registry Artifact

Artifact đề xuất:

```text
/registry/<galaxy-version>/manifest.json
/registry/<galaxy-version>/<framework>/<component>.json
/registry/<galaxy-version>/schema.json
/registry/latest/manifest.json
```

Mỗi component artifact nên có:

- source content hoặc immutable content URL;
- SHA-256 checksum;
- dependency list;
- Tailwind compatibility;
- CLI minimum version;
- component schema version.

CLI phải pin version theo chính release của nó hoặc theo `components.json`; không fetch source từ `main`. Download có timeout, retry giới hạn, concurrency, cache và integrity verification.

---

## 5. Kế Hoạch Triển Khai Ưu Tiên

### P0 — Ổn Định Trước Khi Release

#### P0.1. Hoàn Tất Hoặc Thu Hồi Refactor Shared Variants

Công việc:

- Không để component copy-paste import runtime từ core private.
- Khôi phục framework-local `variants.ts` để ổn định WIP, sau đó chuyển canonical definition sang shared template ở build-time; CLI luôn tạo file local trong component output.
- Cập nhật registry/audit để hiểu rõ file nào đến từ framework và file nào được materialize từ shared template.
- Sửa dependency manifest của core nếu core vẫn giữ runtime utility.

Điều kiện hoàn thành:

- React/Vue/Angular build và smoke import đều pass trên current worktree.
- `audit-registries` và representative `add button/badge/toggle/alert` pass.
- Generated project không có unresolved `@galaxy-ui/core` import.

#### P0.2. Sửa Tailwind v4 Scaffold

Công việc:

- Tạo Galaxy v4 theme CSS bằng `@theme inline`, ánh xạ đầy đủ color/radius/token.
- Tạo class-based dark variant phù hợp.
- Cài/import animation solution cho v4; bổ sung plugin animation cho v3.
- Chọn `tailwind-merge@2.6` khi target v3 và `tailwind-merge@3` khi target v4.
- Xây mapping version-specific dựa trên official upgrade guide và generate/transform theo target; không search-replace mù 127 utility hiện có.
- Không mặc định v4 cho project mới cho đến khi toàn bộ v4 fixtures pass.

Điều kiện hoàn thành:

- Fixture React/Vue/Angular × Tailwind 3.4 và Tailwind 4.x đều compile CSS và framework build thành công.
- `border-border`, `bg-background`, `text-foreground`, ring, radius, dark mode và animation đều xuất hiện/hoạt động trong output.
- Có visual snapshot hoặc computed-style assertion cho component đại diện.

#### P0.3. Làm Migration An Toàn

Công việc:

- Dry-run sinh migration plan chi tiết.
- Backup hoặc yêu cầu clean Git branch trước khi ghi file.
- Preserve/merge PostCSS config thay vì overwrite toàn bộ.
- Dùng official upgrader hoặc AST/CSS parser để chuyển config/template.
- Áp dụng Galaxy v4 theme adapter sau migration.
- Chạy install, CSS compile và framework build; rollback khi thất bại.

Điều kiện hoàn thành:

- Migration fixture có custom colors, plugin, dark mode và PostCSS plugin vẫn hoạt động sau migrate.
- Mọi hard failure trả exit code khác 0.
- Có tài liệu rõ phần tự động và phần cần review thủ công.

#### P0.4. Sửa CLI Packaging Và Registry Integrity

Công việc:

- Sửa missing dependencies và Angular block file references.
- JSON-Schema validate toàn bộ registries và blocks.
- Emit `.d.ts` thật hoặc bỏ khai báo types không tồn tại.
- Loại artifact `.old`, `.backup`, code cũ khỏi npm package.
- Làm `init`/`add` transactional hoặc ít nhất không báo success khi dependency install thất bại.
- Đặt `process.exitCode = 1` cho mọi hard failure.
- Loại hardcoded local machine paths và sibling-repo dependency khỏi publish checks.
- Ngay trong P0, pin source theo commit/tag tương ứng hoặc bundle source artifact cùng CLI; không tiếp tục fetch nhánh `main` cho release mới. CDN versioned hoàn chỉnh có thể triển khai ở P1.4.

Điều kiện hoàn thành:

- `npm pack --dry-run` chỉ chứa artifact cần thiết và có typings hợp lệ.
- Prepublish verification chạy được trong clean clone độc lập.
- Registry audit bao phủ files, imports, dependencies, exports và schema; artifact được bundle/pin phải có content hash ổn định.

#### P0.5. Sửa Docs Production Và Schema

Công việc:

- Đồng bộ VitePress `cleanUrls` với Vercel rewrite/clean URL behavior.
- Publish một canonical schema URL và cập nhật CLI/docs dùng cùng URL.
- Sửa docs CLI theo command/options thật.
- Hiển thị component availability từ generated manifest.
- Gắn trạng thái `experimental`, `partial`, `complete` thay vì tuyên bố tất cả hoàn chỉnh.

Điều kiện hoàn thành:

- Homepage, guide, component page và schema canonical URL trả 200 khi truy cập trực tiếp.
- Post-deploy HTTP smoke test chạy tự động.
- Không còn docs quảng bá command, framework support hoặc schema chưa tồn tại.

### P1 — Xây Source Of Truth Và Parity Contract

#### P1.1. Component Manifest + Code Generation

Công việc:

- Định nghĩa schema manifest và thử nghiệm trước với `button`, `dialog`, `select`, `date-picker`, `gauge-chart`.
- Generate framework registry, summary registry, root exports, docs matrix và API tables.
- Dùng AST validator kiểm tra dependency/props/export drift.
- Sau khi pilot ổn định, migrate toàn bộ component.

Điều kiện hoàn thành:

- Không maintain thủ công cùng metadata ở core, CLI và docs.
- CI fail khi source, registry, exports hoặc docs availability lệch nhau.

#### P1.2. Hoàn Thiện Behavioral Parity

Thứ tự ưu tiên:

1. Sửa bug runtime/compile hiện có: Angular Command, Alert Dialog, Toast, Tooltip; Vue chart issues.
2. Hoàn thiện accessibility primitives: Sheet, Select, Dropdown, Context Menu, Menubar, ScrollArea, Form.
3. Port bốn date/time picker sang Vue và Angular hoặc đánh dấu rõ React-only.
4. Chuẩn hóa controlled/uncontrolled state, prop/event naming và subcomponent anatomy.

Điều kiện hoàn thành cho một component:

- Có source và public export.
- CLI add được với đủ dependencies.
- Typecheck/build pass.
- Keyboard/focus/ARIA contract tests pass.
- Docs code samples compile.
- Demo chạy được và availability matrix được generate.

#### P1.3. Hợp Nhất Charts

Công việc:

- Chọn một canonical chart tree.
- Chuẩn hóa chart schema/types độc lập framework.
- Generate hoặc viết adapter React/Vue/Angular từ cùng schema.
- Sửa Gauge export/registry; thống nhất props như `stack`, data labels, area opacity/gradient.
- Externalize ECharts subpath đúng cách và kiểm soát bundle size.

Điều kiện hoàn thành:

- Không còn hai implementation cho cùng chart trong một framework.
- Cùng dataset/config tạo kết quả tương đương trên ba framework.

#### P1.4. Versioned Registry Distribution

Công việc:

- Build immutable registry artifact trong release pipeline.
- Deploy CDN và publish manifest/checksum.
- Bundle expected manifest digest hoặc public verification key trong CLI release; checksum nằm cùng artifact trên một CDN không được xem là trust anchor độc lập.
- CLI resolve registry version, cache và verify integrity.
- Cho phép override registry URL cho development/self-hosting.

Điều kiện hoàn thành:

- Cùng một CLI + config luôn tải cùng một source artifact.
- Commit mới trên `main` không thay đổi output của release đã publish.

### P2 — Developer Experience Và Docs Automation

#### P2.1. `list`, `diff`, `update`, `doctor`

- `list`: đọc trực tiếp versioned manifest.
- `diff`: so sánh file local với base snapshot/checksum của phiên bản đã cài.
- `update`: three-way merge hoặc hiển thị patch, không overwrite mù customization của người dùng.
- `doctor`: kiểm tra Tailwind mode, theme, animation, dependency, alias, schema và registry reachability.

`components.json` cần lưu component version, checksum và target Tailwind version để hỗ trợ các flow này.

#### P2.2. Áp Dụng Đúng Các Option Đã Công Bố

- JavaScript mode phải tạo `.js/.jsx` hợp lệ hoặc bỏ option cho đến khi hỗ trợ.
- `iconLibrary` phải transform imports và cài đúng package.
- `prefix`, `cssVariables`, `aliases.ui`, `aliases.lib` phải thực sự ảnh hưởng output.
- `add --overwrite` chỉ được bổ sung khi có diff/backup/confirmation an toàn.

#### P2.3. Docs Tự Đồng Bộ

- Code tabs lấy trực tiếp từ release artifact hoặc source snapshot.
- API tables và availability matrix được generate từ manifest.
- Vue/React/Angular demo chạy trong fixture riêng; VitePress chỉ embed kết quả.
- Xóa bản copy Vue UI độc lập trong docs.
- CI kiểm tra link, localization parity, demo registration và code sample compile.

---

## 6. CI Và Release Gates Bắt Buộc

| Gate               | Kiểm tra tối thiểu                                                                 |
| ------------------ | ---------------------------------------------------------------------------------- |
| Source             | lint, format, strict typecheck, framework build, smoke import                      |
| Registry           | schema, file existence, imports/dependencies, exports, checksum, block files       |
| Component contract | unit/interaction tests, keyboard, focus, ARIA, controlled state                    |
| Tailwind v3        | React/Vue/Angular fixture init → add → CSS compile → build                         |
| Tailwind v4        | React/Vue/Angular fixture init → add → CSS compile → build                         |
| CLI package        | clean-clone prepublish, npm pack contents, typings, non-zero failures              |
| Docs               | VitePress build, broken links, sample compile, preview render, localization parity |
| Deployment         | canonical routes, schema và representative registry URLs trả 200                   |

Không được dùng build với `noCheck` làm bằng chứng thay thế strict typecheck. Có thể giữ fast build riêng, nhưng release gate phải chạy typecheck thật.

---

## 7. Thứ Tự Thực Hiện Khuyến Nghị

| Giai đoạn            | Repo chính            | Kết quả cần đạt                                                                 |
| -------------------- | --------------------- | ------------------------------------------------------------------------------- |
| 0. Stabilize         | `galaxy-design`, CLI  | Current WIP build được; registry/add smoke pass; không publish import core lỗi. |
| 1. Tailwind contract | CLI, `galaxy-design`  | v3/v4 adapters và ma trận 3 framework × 2 Tailwind versions pass.               |
| 2. Release integrity | CLI, docs             | CLI typings/exit codes/registry deps/schema và docs routes được sửa.            |
| 3. Source of truth   | Cả ba repo            | Manifest pilot sinh registry, exports và docs cho component đại diện.           |
| 4. Parity            | `galaxy-design`, docs | Hoàn thiện behavior/a11y và port component theo priority.                       |
| 5. DX                | CLI, docs             | Registry CDN versioned, `doctor`, `diff`, `update`, docs automation.            |

Không nên port hàng loạt component trước giai đoạn 1–3, vì nếu tiếp tục với metadata và Tailwind contract hiện tại thì lượng drift sẽ tăng theo số component.

---

## 8. Các Quyết Định Kiến Trúc Khuyến Nghị

1. **Namespace:** lập migration riêng để chuẩn hóa về một namespace; khuyến nghị `@galaxy-ui/*` vì các framework package hiện dùng namespace này. Không để việc đổi namespace chặn bản sửa build khẩn cấp, và phải bao phủ cả React Native/Flutter/core trước khi xóa alias cũ.
2. **Delivery model:** xem CLI copy-paste là bề mặt chính. Nếu vẫn hỗ trợ import package trực tiếp, coi đó là một sản phẩm riêng với compatibility matrix và release tests riêng.
3. **Copy-paste contract:** shared source là maintainer-time; output của CLI tự chứa các file cần thiết.
4. **Tailwind:** hỗ trợ target v3 và v4; chỉ đặt v4 làm default sau khi fixture matrix pass.
5. **Migration:** ưu tiên v3 → v4 an toàn; không hứa round-trip lossless.
6. **Parity:** cho phép framework có trạng thái khác nhau, nhưng phải công khai và được generate; không gắn nhãn complete dựa trên folder.
7. **Registry:** immutable theo release, có checksum; CDN là kênh phân phối, không phải source of truth.
8. **Docs:** là consumer của manifest/release artifact, không phải một implementation component thứ tư.

Với kiến trúc này, Galaxy UI vẫn giữ được điểm mạnh của shadcn — source thuộc về người dùng sau khi cài — đồng thời giảm đáng kể chi phí đồng bộ nhiều framework, tránh runtime lock-in và có cơ sở kỹ thuật để tuyên bố hỗ trợ Tailwind v3/v4.

---

## 9. Cập Nhật 17/09/2026 — Trạng Thái Đóng Gói Lộ Trình P3

### 9.1. Phủ Sóng Component Hoàn Chỉnh 67/67 Trên Cả 5 Frameworks

| Framework | Trước | Sau | Ghi chú |
|---|---|---|---|
| React | 67/67 | **67/67** ✅ | — |
| Vue | 67/67 | **67/67** ✅ | — |
| Angular | 63/67 | **67/67** ✅ | Thêm: combobox (ControlValueAccessor), data-table (sortable), login-block, pricing-block |
| React Native | 50/67 | **67/67** ✅ | Port: otp-input, calendar-range, date-range-picker, date-time-picker, form, tags-input, pricing-block, login-block |
| Flutter | 50/67 | **67/67** ✅ | Port cùng bộ như React Native (widget + helper theo platform idiom) |
| **Web-only set** | — | **9 components** | breadcrumb, command, combobox, dashboard-block, data-table, kbd, toolbar, resizable, scroll-area — đánh dấu `status: web-only` trong manifests, mobile-matrix tự phân loại |

### 9.1.1. Sửa Lỗi Thư Viện Phát Hiện Qua Docs

| Bug | Nguyên nhân | Fix |
|---|---|---|
| Vue Calendar: nút prev/next không hoạt động | Nav buttons không có handler + sai slot API radix-vue (dùng `grid[0].weeks` không tồn tại) | Viết lại bằng radix subcomponents (CalendarPrev/Next/Heading, `grid[].rows`) — đã verify qua docs production |
| Vue DatePicker/DateRangePicker: types dùng `Date` nhưng radix phát ra `DateValue` | Type contract sai với radix-vue 1.9.x | types.ts dùng `DateValue`/`DateRange` từ `@internationalized/date` |
| date-fns `format()` nhận DateValue | date-fns cần native Date | Bridge `DateValue.toDate(getLocalTimeZone())` trước khi format |
| DateTimePicker | Composition Date ↔ DateValue lệch lớp | Bridge `toNativeDate`/`toDateValue` ở ranh giới component, API public giữ native `Date` |

⚠️ **Lưu ý breaking change (minor):** `modelValue` của Vue date components giờ là radix `DateValue` thay vì native `Date`. Docs demos đã cập nhật theo.

### 9.1.2. MCP Model — Triển Khai Đầy Đủ 4 Kênh

| Kênh | Trạng thái |
|---|---|
| npm `@galaxy-stack/design-mcp@0.1.1` | ✅ Published (`mcpName` cho ownership check) |
| Smithery | ✅ `galaxy-stack/design-mcp` — MCPB bundle, release SUCCESS |
| Remote MCP endpoint | ✅ `https://design-mcp--galaxy-stack.run.tools` (Smithery host) |
| Official MCP Registry | ✅ `io.github.buikevin/galaxy-design-mcp` @ `registry.modelcontextprotocol.io` |

### 9.1.3. Namespace Chốt: `@galaxy-stack/*`

- `@galaxy-stack/design-cli@0.3.1` — published, package cũ `galaxy-design` deprecated kèm thông báo trỏ mới.
- `@galaxy-stack/design-mcp@0.1.1` — npm + Smithery + MCP Registry.
- Scope `@galaxy-design` không thể tạo (npm không cho tạo org trùng tên package đang tồn tại).

### 9.1.4. Docs Rendering — 3 Root Causes Đã Sửa (Giữ VitePress)

1. **Tailwind v4 + .gitignore:** auto-detection bỏ qua `.vitepress/*` → thêm `@source` directives tường minh.
2. **Cascade layers:** VitePress reset `button{border:0}` unlayered thắng Tailwind's `@layer utilities` → `revert-layer` scoped trong `.component-preview`.
3. **Demos không đăng ký:** demos mới không nằm trong manual registration list → auto-register bằng `import.meta.glob` — demo mới trong `demos/` tự đăng ký, không cần sửa theme.

**Quyết định kiến trúc: GIỮ VitePress.** Lý do: demos là Vue components sống (radix-vue chạy thật trong trang); chuyển sang Fumadocs/Nextra/Docusaurus (React) = viết lại toàn bộ ~50 demos + mất parity. 3 lỗi gặp phải đều là integration quirks có fix nhỏ, không phải giới hạn framework. Điều kiện xem xét migrate lại: chuyển hướng React-first hoặc VitePress 2.x stable breaking quá lớn.

**Điều kiện lặp lại các lỗi trên:** mọi file mới dưới `.vitepress/` phải `git add -f` (gitignore); demo mới cần có file `.vue` trong `demos/` (auto-registered).

### 9.1.5. Visual Regression — Baseline Đầu Tiên Đã Chạy

- 39/39 component baselines chụp từ production (`.component-preview` selector), commit vào `packages/visual-tests/tests/components.spec.ts-snapshots/`.
- Selector cập nhật từ `[data-component]` (playground không tồn tại) → `.component-preview` trên trang `/components/*` thật.
- 3 components loại khỏi suite: resizable (grid layout render chậm), toast (dynamic), tags-input (input focus state).
- CI: `npx playwright test --project=chromium` trên PR — compare với baselines, threshold 2%.
