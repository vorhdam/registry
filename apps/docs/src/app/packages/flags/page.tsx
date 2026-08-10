import { CodeBlock } from "@/components/blocks/code";
import { Flag } from "@/components/ui/flag";
import registry from "@/packages";
import { notFound } from "next/navigation";

export default async function FlagsPage() {
  const component = registry.items.find((i) => i.name === "flags");
  if (!component) return notFound();

  const code =
    "'https://cdn.jsdelivr.net/npm/@nordaun/flags@latest/flags/${countryCode}.svg'";

  return (
    <div className="flex flex-col w-full gap-8 max-w-2xl">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">{component.title}</h1>
        <h2 className="text-muted-foreground max-w-xl">
          {component.description}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Usage</h2>
        <h3 className="text-muted-foreground">
          Replace <span className="bg-muted rounded-sm px-1">countryCode</span>{" "}
          with your country's ID and visit the following address:
        </h3>
        <CodeBlock directory={`Browser`} code={code} />
        <h3 className="text-muted-foreground">
          You can also use this package to create your own projects and
          components.
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Example</h2>
        <h3 className="text-muted-foreground">
          These flags were rendered from the JSDelivery CDN which is available
          worldwide 24/7.
        </h3>
        <div className="mx-auto flex flex-row gap-4">
          <Flag code="HU" className="size-16" />
          <Flag code="GB" className="size-16" />
          <Flag code="DE" className="size-16" />
          <Flag code="NO" className="size-16" />
        </div>
      </div>
    </div>
  );
}
