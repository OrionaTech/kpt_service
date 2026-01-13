"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, Send, Eye } from "lucide-react";
import { sendQuotationEmail } from "@/lib/email";

interface QuotationItem {
  id?: string;
  quotation_id?: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  sort_order?: number;
}

interface Quotation {
  id: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  project_type?: string;
  status: string;
  version?: number;
  total_amount?: number;
  public_token?: string;
  request_id?: string;
  valid_until?: string;
  admin_notes?: string;
}

export default function QuotationEditorClient({
  initialQuotation,
  initialItems,
  initialRequest,
}: {
  initialQuotation: Quotation;
  initialItems: QuotationItem[];
  initialRequest: any;
}) {
  const router = useRouter();
  const [quotation, setQuotation] = useState<Quotation>(initialQuotation);
  const [items, setItems] = useState<QuotationItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusSelected, setStatusSelected] = useState<string>(quotation.status || "draft");

  useEffect(() => {
    calculateTotal();
  }, [items]);

  function calculateTotal() {
    const total = items.reduce((sum, item) => {
      const amount = (item.quantity || 0) * (item.rate || 0);
      return sum + amount;
    }, 0);
    setQuotation((prev) => ({ ...prev, total_amount: total }));
  }

  async function saveQuotation(updateStatus?: string) {
    setSaving(true);
    try {
      const updateData: any = {
        total_amount: quotation.total_amount,
        updated_at: new Date().toISOString(),
        ...quotation,
      };
      if (updateStatus) updateData.status = updateStatus;

      // Update quotation via server API
      await fetch(`/api/admin/quotations/${quotation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      // Save items via server API
      for (const item of items) {
        const itemData = {
          ...item,
          amount: (item.quantity || 0) * (item.rate || 0),
          quotation_id: quotation.id,
        };

        if (item.id) {
          await fetch(`/api/admin/quotation-items`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
          });
        } else {
          const res = await fetch(`/api/admin/quotation-items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
          });
          const json = await res.json();
          if (json?.data) {
            // assign returned id to item locally
            item.id = json.data.id;
          }
        }
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to save quotation:", error);
      alert("Failed to save quotation. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function addItem() {
    const maxOrder = Math.max(...items.map((i) => i.sort_order || 0), 0);
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        sort_order: maxOrder + 1,
      },
    ]);
  }

  function updateItem(index: number, field: keyof QuotationItem, value: any) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "quantity" || field === "rate") {
      updated[index].amount = (updated[index].quantity || 0) * (updated[index].rate || 0);
    }
    setItems(updated);
  }

  async function deleteItem(itemId: string | undefined) {
    if (!itemId) {
      setItems(items.filter((_, i) => i !== items.length - 1));
      return;
    }
    try {
      await fetch("/api/admin/quotation-items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId }),
      });
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  async function sendQuotation() {
    if (!quotation.client_email) {
      alert("Please enter client email address.");
      return;
    }

    if (!confirm("Send this quotation to the client?")) {
      return;
    }

    setSending(true);
    try {
      // Ensure public token exists
      if (!quotation.public_token) {
        const res = await fetch(`/api/admin/quotations/${quotation.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token: crypto.randomUUID() }),
        });
        const json = await res.json();
        if (json?.data?.public_token) {
          setQuotation((prev) => ({ ...prev, public_token: json.data.public_token }));
        }
      }

      const baseUrl = window.location.origin;
      const quotationLink = `${baseUrl}/quote/${quotation.public_token}`;

      await sendQuotationEmail({
        clientEmail: quotation.client_email,
        clientName: quotation.client_name || "Valued Client",
        quotationNumber: quotation.id.slice(0, 8).toUpperCase(),
        quotationLink,
        totalAmount: quotation.total_amount || 0,
        validUntil: quotation.valid_until ? new Date(quotation.valid_until) : undefined,
      });

      // Update quotation status
      await fetch(`/api/admin/quotations/${quotation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "sent",
          email_sent_at: new Date().toISOString(),
          email_sent_to: quotation.client_email,
        }),
      });

      alert("Quotation sent successfully!");
      router.refresh();
    } catch (error) {
      console.error("Failed to send quotation:", error);
      alert("Failed to send quotation. Please check your email configuration.");
    } finally {
      setSending(false);
    }
  }

  const [baseUrl, setBaseUrl] = useState("");
  
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const clientLink = quotation.public_token && baseUrl
    ? `${baseUrl}/quote/${quotation.public_token}`
    : null;

  return (
    <div className="space-y-6">
      {/* Client Info */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={quotation.client_name || ""}
              onChange={(e) =>
                setQuotation((prev) => ({ ...prev, client_name: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={quotation.client_email || ""}
              onChange={(e) =>
                setQuotation((prev) => ({ ...prev, client_email: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={quotation.client_phone || ""}
              onChange={(e) =>
                setQuotation((prev) => ({ ...prev, client_phone: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Type
            </label>
            <input
              type="text"
              value={quotation.project_type || ""}
              onChange={(e) =>
                setQuotation((prev) => ({ ...prev, project_type: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {initialRequest && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm font-medium text-blue-900 mb-2">Original Request</p>
            <p className="text-sm text-blue-700">
              From: {initialRequest.project_page || "Unknown"}
            </p>
            {initialRequest.estimate_data && (
              <details className="mt-2">
                <summary className="text-sm text-blue-700 cursor-pointer">View Estimate Data</summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto">
                  {JSON.stringify(initialRequest.estimate_data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Quotation Items */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Quotation Items</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Description</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">Quantity</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">Rate</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">Amount</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id || index} className="border-b border-slate-100">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.description || ""}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                        placeholder="Item description"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.quantity || 0}
                        onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-slate-900"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.rate || 0}
                        onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-slate-900"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-900">
                      ₹{((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No items. Click "Add Item" to get started.
                  </td>
                </tr>
              )}
              <tr className="bg-slate-50 font-semibold">
                <td colSpan={3} className="py-3 px-4 text-right text-slate-900">
                  Total Amount:
                </td>
                <td className="py-3 px-4 text-right text-lg text-slate-900">
                  ₹{(quotation.total_amount || 0).toLocaleString("en-IN")}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => saveQuotation()}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => saveQuotation("draft")}
            disabled={saving}
            className="px-6 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <div className="flex items-center gap-2">
            <select
              value={statusSelected}
              onChange={(e) => setStatusSelected(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md bg-white"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={() => saveQuotation(statusSelected)}
              disabled={saving}
              className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Change Status
            </button>
          </div>
          {clientLink && (
            <a
              href={clientLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
          )}
          <button
            onClick={sendQuotation}
            disabled={sending || !quotation.client_email}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 ml-auto"
          >
            <Send className="w-4 h-4" />
            {sending ? "Sending..." : "Send to Client"}
          </button>
        </div>
        {clientLink && (
          <div className="mt-4 p-3 bg-slate-50 rounded">
            <p className="text-sm text-slate-600 mb-1">Client Link:</p>
            <code className="text-xs text-blue-600 break-all">{clientLink}</code>
          </div>
        )}
      </div>
    </div>
  );
}

