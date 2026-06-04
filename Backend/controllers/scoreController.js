import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const CTAScore = async (req, res) => {
    const { imageurl } = req.body;

    if (!imageurl) {
        return res.status(400).json({
            success: false,
            error: "Image URL is required",
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: imageurl,
                            },
                        },
                        {
                            type: "text",
                            text: `
Analyze this YouTube thumbnail and give a CTA (Click-Through Appeal) score.

Return ONLY valid JSON.
Do not use markdown.
Do not wrap the response in backticks.

{
  "overall": <number 0-100>,
  "metrics": [
    { "label": "Contrast", "score": <0-100> },
    { "label": "Readability", "score": <0-100> },
    { "label": "Color Harmony", "score": <0-100> },
    { "label": "Title Clarity", "score": <0-100> },
    { "label": "Click Appeal", "score": <0-100> }
  ],
  "recommendations": [
    "<specific improvement tip 1>",
    "<specific improvement tip 2>",
    "<specific improvement tip 3>"
  ]
}
`,
                        },
                    ],
                },
            ],
            max_tokens: 500,
        });

        const result = JSON.parse(
            response.choices[0].message.content
        );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("CTA Score Error:", error);

        return res.status(500).json({
            success: false,
            error: "Score analysis failed",
        });
    }
};