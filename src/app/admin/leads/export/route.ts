import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
	const supabase = await createServerSupabaseClient();

	const { data: leads, error } = await supabase
		.from("leads")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	if (!leads || leads.length === 0) {
		return new NextResponse("", { status: 204 });
	}

	const headers = Object.keys(leads[0]);

	const csv = [
		headers.join(","),
		...leads.map((row: any) =>
			headers
				.map((field) => {
					const val = row[field] ?? "";
					return `"${String(val).replace(/"/g, '""')}"`;
				})
				.join(",")
		),
	].join("\n");

	const res = new NextResponse(csv);
	res.headers.set("Content-Type", "text/csv; charset=utf-8");
	res.headers.set("Content-Disposition", "attachment; filename=leads.csv");
	return res;
}
