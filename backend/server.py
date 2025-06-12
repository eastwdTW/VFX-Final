from flask import Flask, request, send_file
from PIL import Image
from flask_cors import CORS
import io
from styleTransfer import styleTransfer

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_images():

    if 'content' not in request.files or 'style' not in request.files:
        return "請上傳 content 和 style 兩張圖片", 400

    content_file = request.files['content']
    style_file = request.files['style']

    content_img = Image.open(content_file).convert("RGB")
    style_img = Image.open(style_file).convert("RGB")

    result_img = styleTransfer(content_img, style_img)

    img_io = io.BytesIO()
    result_img.save(img_io, 'JPEG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
