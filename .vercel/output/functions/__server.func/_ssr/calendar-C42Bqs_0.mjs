//#region node_modules/.nitro/vite/services/ssr/assets/calendar-C42Bqs_0.js
function pad(n) {
	return String(n).padStart(2, "0");
}
/** UTC compact format: YYYYMMDDTHHMMSSZ */
function toIcsUtc(d) {
	return d.getUTCFullYear().toString() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + "Z";
}
function endOf(ev) {
	return new Date(ev.start.getTime() + (ev.durationMinutes ?? 45) * 6e4);
}
/** Build a `https://calendar.google.com/...` link that opens the event in Google Calendar. */
function googleCalendarUrl(ev) {
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: ev.title,
		dates: `${toIcsUtc(ev.start)}/${toIcsUtc(endOf(ev))}`
	});
	if (ev.description) params.set("details", ev.description);
	if (ev.location) params.set("location", ev.location);
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function escapeIcs(s) {
	return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
/** Build a valid `.ics` file body (Apple Calendar, Outlook, etc.). */
function buildIcs(ev, uid = `${Date.now()}@rk-repair-labs`) {
	return [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//RK Repair Labs//Appointments//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"BEGIN:VEVENT",
		`UID:${uid}`,
		`DTSTAMP:${toIcsUtc(/* @__PURE__ */ new Date())}`,
		`DTSTART:${toIcsUtc(ev.start)}`,
		`DTEND:${toIcsUtc(endOf(ev))}`,
		`SUMMARY:${escapeIcs(ev.title)}`,
		ev.description ? `DESCRIPTION:${escapeIcs(ev.description)}` : null,
		ev.location ? `LOCATION:${escapeIcs(ev.location)}` : null,
		"END:VEVENT",
		"END:VCALENDAR"
	].filter(Boolean).join("\r\n");
}
/** Trigger a browser download for an `.ics` file (Apple/Outlook/phone calendars). */
function downloadIcs(ev, filename = "appointment.ics") {
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
//#endregion
export { googleCalendarUrl as n, downloadIcs as t };
