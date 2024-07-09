const fs = require("fs");
const readline = require("readline");

/**
 * Utility function to parse a log file.
 * Reads the file line by line and applies a callback function to each parsed line.
 * @param {string} filePath - Path to the log file to be parsed.
 * @param {Function} callback - Function to process each log line.
 * @returns {Promise} - A promise that resolves when parsing is complete.
 */
async function parseLogFile(filePath, callback) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Iterate over each line in the log file
    for await (const line of rl) {
      // Match the log line with the specified regex pattern
      const logParts = line.match(/(\d+\.\d+\.\d+\.\d+) - - \[.*?\] "GET (.*?) HTTP\/1\.1"/);
      // If the log line matches the pattern, call the callback with the matched parts
      if (logParts) {
        callback(logParts);
      }
    }
  } catch (error) {
    console.error(`Error parsing log file: ${error.message}`);
  }
}

/**
 * Parses the log file to count visits for each URL.
 * @param {string} filePath - Path to the log file to be parsed.
 * @returns {Promise<Map<string, number>>} - A map of URLs to their visit counts.
 */
async function getUrlVisits(filePath) {
  try {
    const urlVisits = new Map();

    await parseLogFile(filePath, ([_, __, url]) => {
      // Increment the visit count for the URL
      urlVisits.set(url, (urlVisits.get(url) || 0) + 1);
    });

    return urlVisits;
  } catch (error) {
    console.error(`Error getting URL visits: ${error.message}`);
  }
}

/**
 * Parses the log file to get a set of unique IP addresses.
 * @param {string} filePath - Path to the log file to be parsed.
 * @returns {Promise<Set<string>>} - A set of unique IP addresses.
 */
async function getUniqueIPAddresses(filePath) {
  try {
    const ipAddresses = new Set();

    await parseLogFile(filePath, ([_, ip]) => {
      // Add the IP address to the set of unique IP addresses
      ipAddresses.add(ip);
    });

    return ipAddresses;
  } catch (error) {
    console.error(`Error getting unique IP addresses: ${error.message}`);
  }
}

/**
 * Parses the log file to count requests from each IP address.
 * @param {string} filePath - Path to the log file to be parsed.
 * @returns {Promise<Map<string, number>>} - A map of IP addresses to their request counts.
 */
async function getIPActivity(filePath) {
  try {
    const ipActivity = new Map();

    await parseLogFile(filePath, ([_, ip]) => {
      // Increment the request count for the IP address
      ipActivity.set(ip, (ipActivity.get(ip) || 0) + 1);
    });

    return ipActivity;
  } catch (error) {
    console.error(`Error getting IP activity: ${error.message}`);
  }
}

/**
 * Gets the top N visited items from a visit map.
 * @param {Map<string, number>} visitMap - A map of visits (URLs or IPs) to their counts.
 * @param {number} topN - The number of top items to return.
 * @returns {Array} - An array of the top N most visited items and their counts.
 */
function getTopVisits(visitMap, topN = 3) {
  try {
    // Sort the entries by count in descending order and return the top N entries
    return [...visitMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);
  } catch (error) {
    console.error(`Error getting top visits: ${error.message}`);
  }
}

/**
 * Main function to parse the log file and return the results.
 * @param {string} filePath - Path to the log file to be parsed.
 * @returns {Promise<Object>} - An object containing the unique IP count, top URLs, and top IPs.
 */
async function parseLogFileResults(filePath) {
  try {
    // Run the parsing functions concurrently
    const [urlVisits, uniqueIPAddresses, ipActivity] = await Promise.all([
      getUrlVisits(filePath),
      getUniqueIPAddresses(filePath),
      getIPActivity(filePath)
    ]);

    // Return the parsed results
    return {
      uniqueIPCount: uniqueIPAddresses.size,
      topUrls: getTopVisits(urlVisits),
      topIPs: getTopVisits(ipActivity)
    };
  } catch (error) {
    console.error(`Error parsing log file results: ${error.message}`);
  }
}

/**
 * Function to display the results.
 * @param {Object} results - The results object containing unique IP count, top URLs, and top IPs.
 */
function displayResults(results) {
  try {
    console.log(`Number of unique IP addresses: ${results.uniqueIPCount}`);
    console.log(`Top 3 most visited URLs:`);
    results.topUrls.forEach(([url, count], index) => {
      console.log(`${index + 1}. ${url} - ${count} visits`);
    });
    console.log(`Top 3 most active IP addresses:`);
    results.topIPs.forEach(([ip, count], index) => {
      console.log(`${index + 1}. ${ip} - ${count} requests`);
    });
  } catch (error) {
    console.error(`Error displaying results: ${error.message}`);
  }
}

module.exports = {
  parseLogFileResults,
  displayResults
};
