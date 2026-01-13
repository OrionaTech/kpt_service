"use client";

import { useEffect } from "react";

export default function PageTracker() {
  useEffect(() => {
    let sid = localStorage.getItem("sid");

    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("sid", sid);
    }

    fetch("/api/track/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
        sessionId: sid,
      }),
    });
  }, []);

  return null; // invisible component
}
