const beginUrl = 'http://music.eleuu.com';
function ajaxFun(method, url) {
    return new Promise((resolve, rejected) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    res = JSON.parse(xhr.responseText);
                    resolve(res);
                } else {
                    rejected('请求失败');
                }
            }
        };
        xhr.send();
    })
}
let newFun = async () => {
    const res = await ajaxFun('get', `${beginUrl}/personalized?limit=8`);
    console.log(res);
    let content = res.result;
    console.log(content);
    let contents = document.querySelector("#content");
    for (let key of content) {
        let cover = document.createElement('div');
        cover.className = 'cover'
        let imgBox = document.createElement("div");
        let pContent = document.createElement("p");
        pContent.className = 'pContent'
        pContent.innerHTML = key.name;
        imgBox.className = 'imgBox'
        imgBox.setAttribute('data-id', key.id);
        pContent.setAttribute('data-id', key.id);
        let img = document.createElement("img");
        let bottom = document.createElement("div");
        img.className = 'coverImg'
        img.setAttribute('src', key.picUrl)
        bottom.className = 'coverBottom'
        imgBox.appendChild(img);
        imgBox.appendChild(bottom);
        contents.appendChild(cover);
        cover.appendChild(imgBox);
        cover.appendChild(pContent);
        let aBegin = document.createElement("a");
        let spanNum = document.createElement("span");
        let iconSpan = document.createElement("span");
        bottom.appendChild(aBegin);
        bottom.appendChild(iconSpan);
        bottom.appendChild(spanNum);
        aBegin.className = 'aBegin'
        aBegin.title = '播放'
        iconSpan.className = 'iconSpan'
        spanNum.className = 'spanNum'
        spanNum.innerHTML = key.playCount;
        img.addEventListener("click", () => {
            Det(img.parentNode.getAttribute('data-id'))
        })
    }
}
newFun()
let Det = async (id) => {
    const res = await ajaxFun('get', `${beginUrl}/playlist/detail?limit=10&id=${id}`);
    console.log(res);
    let iconBack = document.createElement("div")
    iconBack.className = 'iconBack'
    iconBack.innerHTML = '<img src="../IMG/左箭头.png" style="width:25px;height:25px;cursor:pointer"></img>'
    iconBack.addEventListener('click', () => {
        location.reload();
    })
    let inner = document.querySelector("#content");
    let page = document.querySelector("#firstPageInner")
    let title = document.querySelectorAll(".title")[0];
    title.setAttribute('style', `width:690px`)
    title.innerHTML = '<h3>歌单对应歌曲</h3>'
    inner.innerHTML = '';
    inner.className = 'inner'
    let tracks = res.playlist.tracks;
    for (let i = 0; i < tracks.length; i++) {
        let li = document.createElement("li");
        li.className = 'songNLi'
        if (i % 2 == 0) {
            li.style.backgroundColor = '#f7f7f7'
        } else {
            li.style.backgroundColor = '#fff'
        }
        li.id = tracks[i].id
        let beginBox = document.createElement("div");
        beginBox.className = 'beginBox'
        let begin = document.createElement("div");
        begin.className = 'begin'
        let num = document.createElement("span");
        num.innerHTML = i + 1;
        let icon = document.createElement("span");
        icon.className = 'beginS'
        icon.setAttribute('data-id', tracks[i].id);
        icon.setAttribute('data-name', tracks[i].name);
        icon.setAttribute('data-singer', tracks[i].ar[0].name);
        icon.setAttribute('data-duration', tracks[i].dt)
        icon.style.backgroundImage = 'url(../IMG/table.png)';
        icon.style.backgroundPosition = '0 -103px';
        beginBox.appendChild(begin)
        begin.appendChild(num);
        begin.appendChild(icon);

        let SNBox = document.createElement("div");
        SNBox.className = 'SNBox'
        let SNA = document.createElement("a");
        SNA.style.cursor = 'pointer';
        SNA.innerHTML = tracks[i].name;
        SNA.setAttribute('data-id', tracks[i].id)
        SNA.addEventListener('click', () => {
            lyric(tracks[i].id);
        })
        SNBox.appendChild(SNA)


        let STBox = document.createElement("div");
        STBox.style.padding = '6px 10px'
        STBox.style.width = '91px';
        STBox.style.height = '18px';
        let time = document.createElement("span");
        let hidden = document.createElement("div");
        hidden.style.display = 'none'
        let add = document.createElement("a");
        add.style.display = 'block';
        add.style.width = '13px'
        add.style.height = '13px'
        add.style.backgroundImage = 'url(../IMG/icon.png)';
        add.style.backgroundPosition = '0 -700px'
        add.style.cursor = 'pointer';
        add.title = '添加至播放列表';
        add.style.float = 'left'
        add.className = 'aSong'
        add.setAttribute('data-id', tracks[i].id);
        add.setAttribute('data-name', tracks[i].name);
        add.setAttribute('data-singer', tracks[i].ar[0].name);
        add.setAttribute('data-duration', tracks[i].dt)
        hidden.appendChild(add);
        let collect = document.createElement("a");
        collect.className = 'collectA'
        collect.title = '收藏';
        hidden.appendChild(collect);
        let share = document.createElement("a");
        share.style.display = 'block';
        share.style.width = '18px'
        share.style.height = '16px'
        share.style.backgroundImage = 'url(../IMG/table.png)';
        share.style.backgroundPosition = '0 -195px'
        share.style.cursor = 'pointer';
        share.style.margin = '0px 0 0 2px'
        share.title = '分享';
        share.style.float = 'left';
        hidden.appendChild(share);
        let download = document.createElement("a");
        download.className = 'collect'
        download.style.backgroundPosition = '-81px -174px'
        download.title = '下载';
        hidden.appendChild(download);
        let deleteA = document.createElement("a");
        deleteA.style.display = 'block';
        deleteA.style.width = '18px'
        deleteA.style.height = '16px'
        deleteA.style.backgroundImage = 'url(../IMG/table.png)';
        deleteA.style.backgroundPosition = '0 -217px'
        deleteA.style.cursor = 'pointer';
        deleteA.style.margin = '0px 0 0 2px'
        deleteA.title = '删除';
        deleteA.style.marginLeft = '75px';
        hidden.appendChild(deleteA);
        STBox.appendChild(time);
        STBox.appendChild(hidden)

        let SNaBox = document.createElement("div");
        SNaBox.style.padding = '6px 10px'
        SNaBox.style.width = '83.45px';
        SNaBox.style.height = '18px';
        let SNa = document.createElement("div");
        SNa.innerHTML = tracks[i].ar[0].name
        SNaBox.appendChild(SNa)

        let AN = document.createElement("div");
        AN.style.padding = '6px 10px'
        AN.style.width = '127.8px';
        AN.style.height = '18px';
        let al = document.createElement("span");
        al.innerHTML = tracks[i].al.name;
        AN.appendChild(al);
        inner.appendChild(li);
        page.appendChild(iconBack)
        li.appendChild(beginBox);
        li.appendChild(SNBox);
        li.appendChild(STBox);
        li.appendChild(SNaBox);
        li.appendChild(AN);
        li.addEventListener('mouseover', () => {
            hidden.style.display = 'block'
        })
        li.addEventListener('mouseout', () => {
            hidden.style.display = 'none'
        })
    }
}
let lyric = async (id) => {
    const res = await ajaxFun('get', `${beginUrl}/lyric?id=${id}`)
    console.log(res);
    const lyric = res.lrc.lyric;
    const a = lyric.split('[');
    let inner = document.querySelector("#content");
    let page = document.querySelector("#firstPageInner")
    let title = document.querySelectorAll(".title")[0];
    title.setAttribute('style', `width:690px`)
    title.innerHTML = '<h3>歌曲对应歌词</h3>'
    inner.innerHTML = '';
    inner.className = 'innerT'
    for (let i = 1; i < a.length; i++) {
        const b = a[i].split(']');
        inner.innerHTML += '<p style="margin-top:10px">' + b[1] + '</p>'
    }
}