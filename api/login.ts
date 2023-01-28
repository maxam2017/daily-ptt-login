import { loginPTT } from "../lib/login-ptt";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { id, password } = req.body;
  let code = 200;
  let message = "login success";

  // Check id and password
  if (!id || !password) {
    code = 400;
    message = "id or password is empty";
  }

  // Login PTT
  try {
    await loginPTT({ id, password });
  } catch (e) {
    console.error(e);
    code = 401;
    message = "login failed";
  }

  res.status(code).json({ success: code < 400, message });
}
