import { json } from "@sveltejs/kit";
import { evaluate } from "mathjs";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const requestBody = await request.json(); // Assigning parsed JSON data
    const userInput = requestBody.userInput;
    const result = evaluate(userInput); // Calculating the userInput

    return json({ result }); // Return the result as a JSON object
  } catch (error) {
    // Error handling
    console.error("Error in POST /api/calculate:", error);

    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}
