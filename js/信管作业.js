let lunbotu = document.getElementsByClassName("lunbotu")

let lunbotuBtn = document.getElementsByClassName("lunbotu-btn")

//设置index
let index = 0;

//清除active属性
let clearActive = function () {
    for (let i = 0; i < lunbotu.length; i++) {
        lunbotu[i].className = 'lunbotu';
        lunbotuBtn[i].className = 'lunbotu-btn';
    }
}

//添加active属性
let goActive = function () {
    clearActive();
    lunbotu[index].className = 'lunbotu active';
    lunbotuBtn[index].className = 'lunbotu-btn active';
}

//编写goNext函数
let goNext = function () {
    if (index == lunbotu.length - 1) {
        index = 0;
        goActive();
    } else {
        index++;
        goActive();
    }
}

//获取data-point属性
for (let i = 0; i < lunbotuBtn.length; i++) {
    lunbotuBtn[i].addEventListener('click', function () {
        let activePoint = this.getAttribute("data-point");
        index = activePoint;
        goActive();
    })
}

//设置定时器
setInterval(() => {
    goNext();
}, 6000);

//图片
let img = document.querySelector("#rightBox-bo-inner")
let hiddens = document.querySelectorAll(".hidden");
hiddens[0].style.zIndex = '-10';
hiddens.forEach(hidden => {
    img.addEventListener('mouseover', () => {
        hidden.style.cursor = 'pointer'
        hidden.style.zIndex = '0';
        hidden.style.opacity = '1'
    })
    img.addEventListener('mouseout', () => {
        hidden.style.cursor = 'pointer'
        hidden.style.zIndex = '-10';
        hidden.style.opacity = '0'
    })
})



let goRightBoxs = document.querySelectorAll("#thefifthBigBox-middle-right-toRight span");
for (let i = 0; i < goRightBoxs.length; i++) {
    let a = Math.random();
    a = a * 10;
    a = Math.ceil(a);
    let time = a + 15 + 's';
    let top = parseInt(i * 21) + 'px'
    goRightBoxs[i].setAttribute('style', `animation-name: exampleGoRight;
    animation-duration: ${time};position:absolute;top:${top};display:block;height:21px;width:190px;animation-timing-function:linear;animation-iteration-count:infinite;`)
}

let goLeftBoxs = document.querySelectorAll("#thefifthBigBox-middle-right-toLeft span");
for (let i = 0; i < goLeftBoxs.length; i++) {
    let a = Math.random();
    a = a * 10;
    a = Math.ceil(a);
    let time = a + 15 + 's';
    let top = parseInt(i * 21) + 'px'
    goLeftBoxs[i].setAttribute('style', `animation-name: exampleGoLeft;
    animation-duration: ${time};position:absolute;top:${top};display:block;height:21px;width:190px;animation-timing-function:linear;animation-iteration-count:infinite;`)
}

//点击smooth跳转
let iconSvg = document.querySelector("#iconSvg");
iconSvg.addEventListener('click', () => {
    window.scrollTo({
        top: 748,
        left: 100,
        behavior: "smooth"
    });
})
let reset = document.querySelector("#reset");
reset.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth"
    });
})
reset.style.display = 'display'
window.onscroll = function () {
    myFunction();
}
let bottomBox = document.querySelector("#theforthBigBox-right-buttom");
let topBox = document.querySelector("#theforthBigBox-right-top");
let leftBox = document.querySelector("#theforthBigBox-left");
let imgBox = document.querySelector("#rightBox-bottom");
let rightBoxTop = document.querySelector("#rightBox-top");
let leftBoxTopTop = document.querySelector("#leftBox-top-top");
let leftBoxTopBottom = document.querySelector("#leftBox-top-bottom");
leftBoxTopBottom.style.display = 'none'
leftBoxTopTop.style.visibility = 'hidden'
rightBoxTop.style.visibility = 'hidden'
imgBox.style.display = 'none'
leftBox.style.visibility = 'hidden'
topBox.style.visibility = 'hidden'
bottomBox.style.visibility = 'hidden'
function myFunction() {
    if (window.scrollY >= 700) {
        reset.style.display = 'block'
    } else {
        reset.style.display = 'none'
    }
    if (window.scrollY >= 300 && window.scrollY <= 1350) {
        leftBoxTopBottom.setAttribute('style', 'animation:wordMove 1s 0.2s forwards;')
        leftBoxTopTop.setAttribute('style', 'animation:wordMove 1s 0.2s forwards;')
        rightBoxTop.setAttribute('style', 'animation:wordMove 1s 0.2s forwards;')
        imgBox.setAttribute('style', `animation: picMove 1.5s ease forwards;`)
    }
    if (window.scrollY >= 1600 && window.scrollY <= 2850) {
        leftBox.setAttribute('style', `animation: leftMove 1s forwards`)
        topBox.setAttribute('style', `animation: rightTopMove 1s forwards`)
        bottomBox.setAttribute('style', `animation: rightBottomMove 1s forwards`)
    }
}




