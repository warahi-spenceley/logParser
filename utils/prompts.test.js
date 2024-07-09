const { constructAnalysisPrompt } = require("./prompts");

describe("constructAnalysisPrompt", () => {
  test("should return a formatted analysis prompt for valid log data", () => {
    const logData = '192.168.1.1 - - [10/Jul/2023:21:21:15 +0000] "GET /index.html HTTP/1.1" 200 10469';
    const expectedPrompt = `
Analyze the following log file and provide me with:
1. The number of unique IP addresses.
2. The top 3 most visited URLs.
3. The top 3 most active IP addresses.
Respond in a condensed format like this example:
"1. The number of unique IP addresses are X.
2. The top 3 most visited URLs are A, B, C.
3. The top 3 most active IP addresses are D, E, and F."

Log data:
${logData}
`;

    const result = constructAnalysisPrompt(logData);
    expect(result).toBe(expectedPrompt);
  });

  test("should throw an error if logData is not a string", () => {
    expect(() => constructAnalysisPrompt(123)).toThrow("logData must be a string");
    expect(() => constructAnalysisPrompt({})).toThrow("logData must be a string");
    expect(() => constructAnalysisPrompt([])).toThrow("logData must be a string");
    expect(() => constructAnalysisPrompt(null)).toThrow("logData must be a string");
    expect(() => constructAnalysisPrompt(undefined)).toThrow("logData must be a string");
  });
});
