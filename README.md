# Daily PTT Login

## Try 1: web socket

> see [3fea641](https://github.com/maxam2017/daily-ptt-login/commit/3fea6415c1c655c505e245dd5a401a303fb1e957)

Web sockets are the most natural way to use PPT, and **PyPTT** is the best and most comprehensive third-party library for this purpose.
I decided to use the Python-supporting Vercel serverless function as a result. and failed.

Because web sockets are consistent connections, Vercel serverless function does not support them. I therefore choose a different approach.

## Try 2: headless / headed browser

> see [f7f6a15](https://github.com/maxam2017/daily-ptt-login/commit/f7f6a15b692b16ea1f1f5a8719e555c7149f38ef)

Another option is to use Chromium (/w Playwright or Puppeteer), although at the moment serverless functions can only execute for 10 seconds on the free plan. We finally get a break.

## Try 3: self hosted

> TBC.

This, I believe, is the only option. I hope I can come up with a better solution 🌟
