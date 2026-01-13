import { createServerSupabaseClient } from "./supabase-server";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

