import socket
import threading
import os

HOST = '127.0.0.1'
PORT = 8080
WEB_ROOT = './www'

def get_content_type(file_path):
    if file_path.endswith(".html"):
        return "text/html"
    elif file_path.endswith(".css"):
        return "text/css"
    elif file_path.endswith(".js"):
        return "application/javascript"
    elif file_path.endswith(".png"):
        return "image/png"
    elif file_path.endswith(".jpg") or file_path.endswith(".jpeg"):
        return "image/jpeg"
    elif file_path.endswith(".gif"):
        return "image/gif"
    else:
        return "application/octet-stream"

def handle_client(conn, addr):
    print(f"[+] Подключено: {addr}")
    request = conn.recv(1024).decode('utf-8')

    if not request:
        conn.close()
        return

    try:
        method, path, _ = request.split(' ', 2)
    except ValueError:
        conn.close()
        return

    if path == '/':
        path = '/index.html'

    file_path = os.path.join(WEB_ROOT, path.lstrip('/'))

    if os.path.exists(file_path) and os.path.isfile(file_path):
        with open(file_path, 'rb') as f:
            body = f.read()

        content_type = get_content_type(file_path)

        header = (
            "HTTP/1.1 200 OK\r\n"
            f"Content-Length: {len(body)}\r\n"
            f"Content-Type: {content_type}\r\n"
            "Connection: close\r\n"
            "\r\n"
        )
        response = header.encode('utf-8') + body
    else:
        body = b"<h1>404 Not Found</h1>"
        header = (
            "HTTP/1.1 404 Not Found\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Content-Type: text/html\r\n"
            "Connection: close\r\n"
            "\r\n"
        )
        response = header.encode('utf-8') + body

    conn.sendall(response)
    conn.close()

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen(5)
    print(f"[🚀] Сервер запущен на http://{HOST}:{PORT}")

    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()

if __name__ == "__main__":
    start_server()
