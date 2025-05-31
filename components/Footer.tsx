import { Link } from "@heroui/link";

export const Footer = () => {
  return (
    <footer className="w-full py-3">
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-center">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com?utm_source=next-app-template"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">HeroUI</p>
        </Link>
      </div>
    </footer>
  );
};
