import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

/** Standard call-to-action button. */
export default function Magnetic({ href, children, variant = "primary", external, className = "" }: Props) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`} {...extra}>
      <span>{children}</span>
    </Link>
  );
}
