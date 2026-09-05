import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import Home from "lucide-solid/icons/home";
import { pageTitle } from "~/lib/site";

export default function NotFound() {
  return (
    <div class="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <Title>{pageTitle("Page not found")}</Title>
      <HttpStatusCode code={404} />
      <h1 class="mb-4 text-6xl font-bold text-slate-900">404</h1>
      <p class="mb-8 text-xl text-slate-500">Page not found. The page you're looking for doesn't exist.</p>
      <A
        href="/"
        class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        <Home class="h-4 w-4" />
        Back to Home
      </A>
    </div>
  );
}
