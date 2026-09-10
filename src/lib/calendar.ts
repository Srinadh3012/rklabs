// Calendar helpers — Google Calendar URL + ICS file for one-click "add to calendar"

export type CalEvent = {
  title: string;
  description?: string;
  location?: string;
  start: Date; // event start
  durationMinutes?: number; // default 45
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** UTC compact format: YYYYMMDDTHHMMSSZ */
export function toIcsUtc(d: Date) {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function endOf(ev: CalEvent) {
  return new Date(ev.start.getTime() + (ev.durationMinutes ?? 45) * 60_000);
}

/** Build a `https://calendar.google.com/...` link that opens the event in Google Calendar. */
export function googleCalendarUrl(ev: CalEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${toIcsUtc(ev.start)}/${toIcsUtc(endOf(ev))}`,
  });
  if (ev.description) params.set("details", ev.description);
  if (ev.location) params.set("location", ev.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Build a valid `.ics` file body (Apple Calendar, Outlook, etc.). */
export function buildIcs(ev: CalEvent, uid = `${Date.now()}@rk-repair-labs`) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RK Repair Labs//Appointments//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(ev.start)}`,
    `DTEND:${toIcsUtc(endOf(ev))}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    ev.description ? `DESCRIPTION:${escapeIcs(ev.description)}` : null,
    ev.location ? `LOCATION:${escapeIcs(ev.location)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

/** Trigger a browser download for an `.ics` file (Apple/Outlook/phone calendars). */
export function downloadIcs(ev: CalEvent, filename = "appointment.ics") {
  const blob = new Blob([buildIcs(ev)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 500);
}
