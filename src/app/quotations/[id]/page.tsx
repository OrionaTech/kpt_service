import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export default async function QuotationPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
		? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
		: await createServerSupabaseClient();

	const { data: quotation, error: quotationError } = await supabase
		.from("quotations")
		.select("*")
		.eq("id", id)
		.single();

	if (quotationError || !quotation) {
		console.error("Failed to load quotation:", quotationError);
		notFound();
	}

	const { data: items } = await supabase
		.from("quotation_items")
		.select("*")
		.eq("quotation_id", id)
		.order("sort_order", { ascending: true });

	// Get quotation request if exists
	let request = null;
	if (quotation.request_id) {
		const { data } = await supabase
			.from("quotation_requests")
			.select("*")
			.eq("id", quotation.request_id)
			.single();
		request = data;
	}

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-slate-900">Quotation</h1>
				<p className="text-slate-600 mt-2">Quotation #{quotation.id?.slice(0, 8)}</p>
			</div>

			<div className="mb-6">
				<h2 className="text-xl font-semibold">Items</h2>
				<ul className="mt-2 list-disc pl-5">
					{(items || []).map((it: any) => (
						<li key={it.id} className="text-slate-700">
							{it.description || it.name} — {it.quantity || 1} × {it.unit_price ?? ""}
						</li>
					))}
				</ul>
			</div>

			{request && (
				<div className="mt-6 p-4 bg-slate-50 rounded">
					<h3 className="font-medium">Request Info</h3>
					<p className="text-sm text-slate-700">{request?.notes || "—"}</p>
				</div>
			)}
		</div>
	);
}
