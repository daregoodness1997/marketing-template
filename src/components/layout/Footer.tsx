import { getTranslations } from "next-intl/server";
import { FooterTrackingLinks } from "./FooterTrackingLinks";
import { Logo } from "@/components/ui/Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const sectionLinks = [
    "features",
    "audience",
    "integrations",
    "faq",
    "contact",
  ] as const;

  return (
    <footer
      className="bg-white border-t border-slate-200 py-20 px-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="mb-6">
            <Logo size="sm" />
          </div>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px]">
            {t("links_title")}
          </h4>
          <ul className="space-y-4 text-slate-500 font-bold text-sm tracking-tight">
            {sectionLinks.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="group relative transition-colors hover:text-primary inline-block"
                >
                  {tNav(id)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px]">
            {t("contact_title")}
          </h4>
          <ul className="space-y-5 text-slate-500 text-sm font-medium">
            <FooterTrackingLinks />
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 gap-4 uppercase tracking-[0.2em]">
        <div>
          &copy; {new Date().getFullYear()} Your Brand. {t("rights")}
        </div>
        <div className="flex gap-12">
          <a
            href="#"
            className="group relative hover:text-slate-900 transition-all"
          >
            {t("privacy")}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#"
            className="group relative hover:text-slate-900 transition-all"
          >
            {t("terms")}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
}
