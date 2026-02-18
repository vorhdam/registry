import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-dvw h-dvh items-center justify-center gap-2">
      <p>
        This site is primarly used to host registry items that can be used as
        React components in your app.
      </p>
      <p>
        If you need documentation please visit:{" "}
        <Link href="" className="font-bold underline">
          Github
        </Link>
      </p>
    </div>
  );
}
