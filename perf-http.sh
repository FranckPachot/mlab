#!/bin/bash

seconds="${1:-15}"
pgrep="${2:-^mongod$}"

perf record -o - --call-graph fp -F99 -e cpu-cycles -p $(pgrep -d, "$pgrep" ) sleep "$seconds" | 
 perf script -F +pid | python3 -c "

# Start a simple Python HTTP server to serve the file

import http.server
import socketserver

PORT = 80
class PerfHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve the perf output
        if self.path == '/':
            try:
                with open('/dev/stdin', 'rb') as f:
                    self.send_response(200)
                    self.send_header('Content-type', 'text/plain')
                    self.end_headers()
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(b'Error: No perf output found')
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

# Run the server on port 8080
with socketserver.TCPServer((\"\", PORT), PerfHandler) as httpd:
    print(f\"Serving perf data on port {PORT}\")
    httpd.handle_request()  # Only serve one request, then exit

"

