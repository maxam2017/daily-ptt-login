import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

// get this path from chrome://version
const LOCAL_CHROMIUM_EXECUTABLE_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function loginPTT(options: { id: string; password: string }) {
  const { id, password } = options;
  // Launch browser
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath:
      (await chromium.executablePath) || LOCAL_CHROMIUM_EXECUTABLE_PATH,
    headless: chromium.headless,
  });

  // Open new page
  const page = await browser.newPage();
  await page.goto("https://term.ptt.cc");

  // Check page loaded
  await page.getByText("代號").waitFor({ state: "visible" });

  // Type id
  await page.keyboard.type(id);
  await page.keyboard.press("Enter");

  // Type password
  await page.keyboard.type(password);
  await page.keyboard.press("Enter");

  // Check login success
  await page.getByText("歡迎").waitFor({ state: "visible" });

  await browser.close();
}
