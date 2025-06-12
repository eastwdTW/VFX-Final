import torch
import torch.nn as nn
from torchvision import transforms
import net
from function import adaptive_instance_normalization

def test_transform(size, crop):
    transform_list = []
    if size != 0:
        transform_list.append(transforms.Resize(size))
    if crop:
        transform_list.append(transforms.CenterCrop(size))
    transform_list.append(transforms.ToTensor())
    transform = transforms.Compose(transform_list)
    return transform

def style_transfer(vgg, decoder, content, style, device, alpha=1.0,
                   interpolation_weights=None):
    assert (0.0 <= alpha <= 1.0)
    content_f = vgg(content)
    style_f = vgg(style)
    if interpolation_weights:
        _, C, H, W = content_f.size()
        feat = torch.FloatTensor(1, C, H, W).zero_().to(device)
        base_feat = adaptive_instance_normalization(content_f, style_f)
        for i, w in enumerate(interpolation_weights):
            feat = feat + w * base_feat[i:i + 1]
        content_f = content_f[0:1]
    else:
        feat = adaptive_instance_normalization(content_f, style_f)
    feat = feat * alpha + content_f * (1 - alpha)
    return decoder(feat)

def styleTransfer(content, style):

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    decoder = net.decoder
    vgg = net.vgg

    decoder.eval()
    vgg.eval()

    decoder.load_state_dict(torch.load('./models/decoder.pth'))
    vgg.load_state_dict(torch.load('./models/vgg_normalised.pth'))
    vgg = nn.Sequential(*list(vgg.children())[:31])

    vgg.to(device)
    decoder.to(device)

    content_tf = test_transform(512, False)
    style_tf = test_transform(512, False)

    content = content_tf(content)
    style = style_tf(style)
    style = style.to(device).unsqueeze(0)
    content = content.to(device).unsqueeze(0)
    with torch.no_grad():
        output = style_transfer(vgg, decoder, content, style, device, 1.0)

    to_pil = transforms.ToPILImage()
    output = to_pil(output[0])

    return output