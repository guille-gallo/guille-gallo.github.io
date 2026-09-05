import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "~/lib/site";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{SITE_TITLE}</Title>
          <Meta name="description" content={SITE_DESCRIPTION} />
          <Meta name="keywords" content="developer, portfolio, web development, software engineer" />
          <Meta name="author" content="Guille Gallo" />
          <Meta name="robots" content="index, follow" />
          <Meta property="og:type" content="website" />
          <Meta property="og:locale" content="en_US" />
          <Meta property="og:url" content={SITE_URL} />
          <Meta property="og:site_name" content={SITE_NAME} />
          <Meta property="og:title" content={SITE_TITLE} />
          <Meta property="og:description" content={SITE_DESCRIPTION} />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:title" content={SITE_TITLE} />
          <Meta name="twitter:description" content={SITE_DESCRIPTION} />
          <Link rel="canonical" href={`${SITE_URL}${props.location.pathname}`} />

          {/* Soft background shapes for glass effect */}
          <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div class="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-neutral-200 blur-3xl animate-float-1" />
            <div class="absolute -right-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-neutral-200 blur-3xl animate-float-2" />
            <div class="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-neutral-300/50 blur-3xl animate-float-3" />
          </div>

          <div class="flex min-h-screen flex-col">
            <Header />
            <main class="flex-grow">
              <Suspense>{props.children}</Suspense>
            </main>
            <Footer />
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
