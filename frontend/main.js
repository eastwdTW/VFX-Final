const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu-container');
menuButton.addEventListener('click', (e) => {
    menu.style.zIndex = 1;
})

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', (e) => {
    menu.style.zIndex = -1;
})

const shell = document.getElementById('shell');
shell.addEventListener('click', (e) => {
    menu.style.zIndex = -1;
})

const input1 = document.getElementById('imageUpload1');
const fileNameSpan1 = document.getElementById('fileName1');
const preview1 = document.getElementById('preview1');

input1.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan1.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview1.src = e.target.result;
            preview1.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        fileNameSpan1.textContent = '';
        preview1.style.display = 'none';
        preview1.src = '';
    }
});

const input2 = document.getElementById('imageUpload2');
const fileNameSpan2 = document.getElementById('fileName2');
const preview2 = document.getElementById('preview2');

input2.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan2.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview2.src = e.target.result;
            preview2.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        fileNameSpan2.textContent = '';
        preview2.style.display = 'none';
        preview2.src = '';
    }
});

const start = document.getElementsByClassName('start')[0]
const loading = document.getElementById('loading')
const loadingDots = document.getElementsByClassName('dot')
const preview3 = document.getElementById('preview3');
const radius = 65
const color = []
var count = 0

for (let i = 0; i < 8; i++) {
    var r = 65 + 110 * i / 8;
    var g = 50 + 110 * i / 8;
    var b = 0 + 95 * i / 8;
    color.push(`rgb(${r}, ${g}, ${b})`);
}

start.addEventListener('click', () => {
    loading.style.zIndex = 1 
    for (let i = 0; i < loadingDots.length; i++) {
        const element = loadingDots[i];
        var deg = 2*Math.PI * i / 8;
        element.style.top = `calc(50% - 12px - ${radius*Math.cos(deg)}px)`;
        element.style.left = `calc(50% - 12px - ${radius*Math.sin(deg)}px)`;
        element.style.backgroundColor = color[i];
    }

    count = 1;
    setInterval(update, 100);

    const formData = new FormData();
    formData.append("content", input1.files[0]);
    formData.append("style", input2.files[0]);

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        preview3.src = url;
        preview3.style.display = 'block';
        loading.style.zIndex = -1;
    })
    .catch(err => {
        console.error("錯誤：", err);
        alert('Error!')
        loading.style.zIndex = -1;
    });

})

const update = () => {
    for (let i = 0; i < loadingDots.length; i++) {
        const element = loadingDots[i];
        var idx = (i+count) % 8
        element.style.backgroundColor = color[idx];
    }
    count++;
}
