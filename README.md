# VFX-Final

This project provides an easy-to-use system for style-transfer.

## Team 7

* R13943001 賴宗佑
* R13631011 陳冠廷

## Requirements

- Python 3.10
- Flask
- Flask-cors
- PyTorch 2.7.0
- TorchVision
- Pillow

## Usage

```
cd backend
pip install -r requirement.txt
python server.py
```
Then just open style_transfer.html in frontend, you can transfer the style of content image to style image.

And face_style_transfer.html is to transfer your portrait(capture by front camera) to other style.

## License

This project uses code from [pytorch-AdaIN](https://github.com/naoto0804/pytorch-AdaIN), originally created by Naoto Inoue, which is licensed under the MIT License.

See [`LICENSE`](./LICENSE) for more information.