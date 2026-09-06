import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({ text: z.string().min(1).max(2000) });

export const translateToEnglish = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI gateway not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are a professional translator for a mobile & electronics repair shop in India. Translate the user's device issue description into clear, concise technical English. If it's already English, keep it but polish grammar. Return ONLY the translated text — no quotes, no prefix, no explanation.",
          },
          { role: "user", content: data.text },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`AI gateway ${res.status}: ${body.slice(0, 200)}`);
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const out = json.choices?.[0]?.message?.content?.trim();
    if (!out) throw new Error("Empty translation");
    return { text: out };
  });
