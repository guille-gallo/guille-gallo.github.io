import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, For, on, onCleanup, onMount } from "solid-js";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/github-featured-projects", label: "Featured Projects" },
  { href: "/contact", label: "Contact" },
];

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = createSignal(false);
  const [pill, setPill] = createSignal<{ left: number; width: number } | null>(null);
  const [pillReady, setPillReady] = createSignal(false);
  const itemRefs = new Map<string, HTMLAnchorElement>();
  let listRef!: HTMLUListElement;

  const isActive = (href: string) => normalize(location.pathname) === href;

  // Shared "active tab" pill: measured from the active link and slid with a CSS transition
  // (replaces framer-motion's layoutId spring).
  const measurePill = () => {
    const active = navItems.find((item) => isActive(item.href));
    const el = active ? itemRefs.get(active.href) : undefined;
    if (!el || !listRef) {
      setPill(null);
      return;
    }
    const listRect = listRef.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setPill({ left: rect.left - listRect.left, width: rect.width });
  };

  onMount(() => {
    measurePill();
    // Enable the slide transition only after the first paint so the pill doesn't fly in on load.
    requestAnimationFrame(() => setPillReady(true));
    window.addEventListener("resize", measurePill);
    onCleanup(() => window.removeEventListener("resize", measurePill));

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (motionQuery.matches) {
          setScrolled(true);
          return;
        }
        setScrolled(!entry?.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);

    onCleanup(() => {
      observer.disconnect();
      sentinel.remove();
    });
  });

  createEffect(on(() => location.pathname, measurePill, { defer: true }));

  return (
    <header class="sticky top-0 z-50 mx-4 mt-4 sm:mx-6 lg:mx-auto lg:max-w-5xl">
      <nav
        class={`glass-nav flex h-14 w-full items-center justify-center rounded-2xl px-4 sm:px-6 ${
          scrolled() ? "glass-nav-scrolled" : ""
        }`}
      >
        <ul ref={listRef} class="relative flex items-center gap-2 sm:gap-3">
          {pill() && (
            <li
              aria-hidden="true"
              class={`pointer-events-none absolute inset-y-0 rounded-full bg-white/90 shadow-sm ${
                pillReady() ? "transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
              }`}
              style={{ left: `${pill()!.left}px`, width: `${pill()!.width}px` }}
            />
          )}
          <For each={navItems}>
            {(item) => (
              <li class="relative z-10">
                <A
                  href={item.href}
                  ref={(el) => itemRefs.set(item.href, el)}
                  class={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-neutral-900"
                      : "text-neutral-700 hover:bg-white/90 hover:text-neutral-900 hover:shadow-sm"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  );
}
