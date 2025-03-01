# Website Size Checker

This is a Node.js script that checks the total size of a website, including its assets (CSS, JavaScript, images, etc.). The script crawls the given URL and calculates the size of all linked resources.

## Requirements

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the script file.

2. Open a terminal and navigate to the directory containing the script.

3. Install the required dependencies using npm:

   ```sh
   npm install axios cheerio
   ```

## Usage

1. Run the script using Node.js:

   ```sh
   node index.js
   ```

2. Enter the URL of the website you want to check when prompted.

## Example

```sh
$ node index.js
Masukkan link yang ingin diperiksa: https://example.com
```

The script will output the total size of the website, including all linked assets.

## Code Explanation

- The script uses `axios` to perform HTTP requests and `cheerio` to parse HTML.
- It prompts the user to enter a URL using `readline`.
- The `getSize` function retrieves the size of a resource by performing an HTTP GET request and checking the `content-length` header or the length of the response data.
- The `crawl` function recursively checks the size of the given URL and all linked assets, keeping track of visited URLs to avoid duplicate checks.

## License

This project is licensed under the MIT License.