import Image from "next/image";
import Link from "next/link";

/**
 * Official HE Capital Markets lockup. The artwork is drawn for dark
 * backgrounds -- "HE" and "MARKETS" are white, "CAPITAL" is brand blue -- so it
 * sits on the navy navbar untreated. Do not recolour or invert it.
 */
export function Logo({
  className = "",
  onNavigate,
}: {
  className?: string;
  /** Lets an overlay close itself when the mark is used as a home link. */
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`flex items-center focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 ${className}`}
    >
      <Image
        src="/images/he-capital-markets-logo.png"
        alt="HE Capital Markets"
        width={280}
        height={75}
        priority
        // Intrinsic 280x75 against a ~119-149px render leaves headroom for 2x
        // displays; h-auto keeps the aspect ratio locked.
        className="h-8 w-auto sm:h-9 lg:h-10"
      />
    </Link>
  );
}
