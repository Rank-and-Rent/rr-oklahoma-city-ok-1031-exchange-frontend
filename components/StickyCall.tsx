export default function StickyCall({ phone }: { phone: string }) {
  const tel = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <a
      href={tel}
      aria-label="Call now"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-[#334155] bg-[#0EA5A6] px-5 py-3 text-[#0B0F13] shadow-xl hover:opacity-90"
    >
      <span>Call Now</span>
    </a>
  );
}