const openai = require("./instances/openai");
const { constructAnalysisPrompt } = require("./utils/prompts");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "./data/data.log");

async function main(filePath) {
  try {
    const logData = fs.readFileSync(filePath, "utf-8");
    const prompt = constructAnalysisPrompt(logData);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    console.log("Analysis Result:", completion.choices[0].message.content);
  } catch (error) {
    console.error("An error occured when analyzing the log file. Reason: ", error);
  }
}

main(logFilePath);
