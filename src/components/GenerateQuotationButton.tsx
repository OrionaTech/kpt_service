"use client";

import { useState } from "react";

type Props = {
  productSlug: string;
  productName: string;
estimate: any;
};

export default function GenerateQuotationButton({
  productSlug,
  productName,
  estimate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    await fetch("/api/quotation-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone,
        product_slug: productSlug,
        product_name: productName,
          estimate,
        source_page: window.location.pathname,
      }),
    });

    setLoading(false);
    setOpen(false);
    alert("Quotation request submitted. Our team will email you shortly.");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 border border-[var(--accent)] px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--glow)]"
      >
        Generate Detailed Quotation
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-md border border-[#343434] bg-[#121212] p-6 text-[var(--bright)]">
            <h3 className="mb-4 font-heading text-2xl font-semibold">
              Request Detailed Quotation
            </h3>

            <input
              type="email"
              placeholder="Email"
              className="mb-3 w-full border-0 border-b border-[#3a3a3a] bg-transparent p-2 pl-0 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone"
              className="mb-4 w-full border-0 border-b border-[#3a3a3a] bg-transparent p-2 pl-0 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={submit}
                disabled={loading}
                className="shimmer-btn flex-1 border border-[var(--accent)] bg-[var(--accent)] py-2 font-mono text-xs uppercase tracking-[0.14em] text-[#1c1204] transition hover:bg-[#f1b84f]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-[#3a3a3a] py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--steel)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
