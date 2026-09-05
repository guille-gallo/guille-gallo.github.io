import { Meta, Title } from "@solidjs/meta";
import { GithubIcon as Github } from "~/components/icons/BrandIcons";
import { LinkedinIcon as Linkedin } from "~/components/icons/BrandIcons";
import Mail from "lucide-solid/icons/mail";
import MapPin from "lucide-solid/icons/map-pin";
import { Show } from "solid-js";
import { cvData } from "~/lib/cv-data";
import { pageTitle } from "~/lib/site";

export default function ContactPage() {
  return (
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <Title>{pageTitle("Contact")}</Title>
      <Meta
        name="description"
        content={`Get in touch with ${cvData.name}. Available for new opportunities and collaborations.`}
      />

      {/* Header */}
      <section class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold tracking-tight text-slate-900">Get in Touch</h1>
        <p class="mx-auto max-w-2xl text-lg text-slate-500">
          Interested in working together or have a question? Feel free to reach out through any of the channels
          below.
        </p>
      </section>

      {/* Contact Links */}
      <div class="mx-auto max-w-xl space-y-4">
        {/* Email */}
        <a href={`mailto:${cvData.email}`} class="glass-panel flex items-center gap-4 p-5">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40">
            <Mail class="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p class="font-medium text-slate-900">Email</p>
            <p class="text-sm text-slate-500">{cvData.email}</p>
          </div>
        </a>

        {/* GitHub */}
        <a href={cvData.github} target="_blank" rel="noopener noreferrer" class="glass-panel flex items-center gap-4 p-5">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40">
            <Github class="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p class="font-medium text-slate-900">GitHub</p>
            <p class="text-sm text-slate-500">github.com/guille-gallo</p>
          </div>
        </a>

        {/* LinkedIn */}
        <Show when={cvData.linkedin}>
          {(linkedin) => (
            <a href={linkedin()} target="_blank" rel="noopener noreferrer" class="glass-panel flex items-center gap-4 p-5">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40">
                <Linkedin class="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <p class="font-medium text-slate-900">LinkedIn</p>
                <p class="text-sm text-slate-500">Connect on LinkedIn</p>
              </div>
            </a>
          )}
        </Show>

        {/* Location */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cvData.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          class="glass-panel flex items-center gap-4 p-5"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40">
            <MapPin class="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <p class="font-medium text-slate-900">Location</p>
            <p class="text-sm text-slate-500">{cvData.location}</p>
          </div>
        </a>
      </div>
    </div>
  );
}
