/**
 * Constructs an analysis prompt for a given log data.
 *
 * @param {string} logData - The log data to be analyzed.
 * @returns {string} The formatted analysis prompt.
 * @throws {Error} If logData is not a string.
 */
function constructAnalysisPrompt(logData) {
  if (typeof logData !== 'string') {
    throw new Error('logData must be a string');
  }

  return `
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
}

module.exports = {
  constructAnalysisPrompt
};
