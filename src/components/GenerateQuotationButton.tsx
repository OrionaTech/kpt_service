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
        className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-md"
      >
        Generate Detailed Quotation
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Request Detailed Quotation
            </h3>

            <input
              type="email"
              placeholder="Email"
              className="border w-full p-2 mb-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone"
              className="border w-full p-2 mb-4 rounded"
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 bg-slate-900 text-white py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="flex-1 border py-2 rounded"
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
