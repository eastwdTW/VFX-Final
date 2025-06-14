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

* You can use the following to setup environment
```
conda create -n VFX-Final python=3.10
conda activate VFX-Final
cd backend
pip install -r requirement.txt
```

## Usage

* Run backend server
```
python server.py
```

* Run frontend web
Open style_transfer.html to transfer the style of content image to style image.

Open face_style_transfer.html to transfer your portrait(capture by front camera) to other style.

## License

This project uses code from [pytorch-AdaIN](https://github.com/naoto0804/pytorch-AdaIN), originally created by Naoto Inoue, which is licensed under the MIT License.

See [`LICENSE`](./LICENSE) for more information.