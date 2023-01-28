import json
from http.server import BaseHTTPRequestHandler
import PyPtt

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
        code = 200
        error = None

        if 'id' in data and 'password' in data:
            try:
                ptt_bot = PyPtt.API()
                ptt_bot.login(
                    ptt_id=data['id'], ptt_pw=data['password'], kick_other_session=True)
            except PyPtt.LoginError:
                code = 401
                error = 'Login failed'
            except PyPtt.WrongIDorPassword:
                code = 401
                error = 'Wrong ID or password'
            except PyPtt.LoginTooOften:
                code = 401
                error = 'Please login after a while'
        else:
            code = 400
            error = 'ID and password cannot be empty'

        self.send_response(code)
        self.send_header('Content-type','application/json')
        self.end_headers()

        if error:
            self.wfile.write(('{"success":false, "error":"%s"}' % error).encode('utf-8'))
        else:
            self.wfile.write('{"success":true}'.encode('utf-8'))
