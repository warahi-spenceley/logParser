- [logParser](#logparser)
  - [Description](#description)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)

# logParser

## Description

`logParser` is a Node.js application that analyzes log files using OpenAI's GPT-4 model. It reads a log file, constructs an analysis prompt, and sends it to the OpenAI API to get insights and analysis.

## Requirements

- Node.js
- npm
- OpenAI API key

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/warahi-spenceley/logParser.git
    cd logParser
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

    ```env
    OPENAI_KEY=sk-proj-xxxx
    ```

    Replace `sk-proj-xxxx` with your actual OpenAI API key.

4. This app is already configured to use a default log data file, but if you wish to use another, add your file to the `./data` directory and update the `main.js` file to ensure it points to your new log file path:

    ```javascript
    const logFilePath = path.join(__dirname, "./data/<new_file_name>.log");
    ```

## Usage

To analyze the log file, run the following command:

```sh
npm run analyse
