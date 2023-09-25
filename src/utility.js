
function fadeOutDoStuffThenFadeInLoadable(elem, func, loadTriggerFunc, pictures) {
    const body = document.querySelector('body');
    body.style.pointerEvents = 'none';
    elem.classList.add('jetUtilFadeOut');
    const loadListener = () => {
        func();
        elem.classList.remove('jetUtilFadeOut');
        body.style.pointerEvents = 'auto';
        elem.removeEventListener('load', loadListener);
    }
    const listenerFun = () => {
        loadTriggerFunc(elem, pictures);
        elem.removeEventListener('transitionend', listenerFun);
    }
    elem.addEventListener('load', loadListener);
    elem.addEventListener('transitionend', listenerFun);
}

function fadeOutDoStuffThenFadeIn(elem, func) {
    elem.style.transition = 'all 0.6s';
    elem.classList.add('jetUtilFadeOut');
    const listenerFun = () => {
        func();
        elem.classList.remove('jetUtilFadeOut');
        elem.removeEventListener('transitionend', listenerFun);
    }
    elem.addEventListener('transitionend', listenerFun);
}

function randomPic(array){
    let random = Math.round(Math.random()*3);
    return array[random];
}

function arrayWithoutElem(str, arrai){
    let arr = [];
    for(let stre of arrai){
        if(stre!==stringFromSubstring('/images',str)){
            arr.push(stre);
        }
    }
    return arr;
}

function stringFromSubstring(str, streng){
    const strLen = str.length;
    let tempStr = '';
    let counter = 0;
    let index = 0;
    for(let char of streng){
        if(counter<strLen){
            counter++;
            index++;
            tempStr+=char;
        }
        else {
            if(tempStr===str){
                return streng.slice(index-strLen);
            }
            counter = 1;
            tempStr=''+char;
            index++;
        }
    }
    return '';
}

function getMusicObjectArray(streng){
    const basedArr = streng.split('\n');
    let joniarai = [];
    for(let neim of basedArr){
        neim = neim.trim();
        joniarai.push({
            path: `/musicWry/${neim}`,
            name: `${neim}`,
            played: 0
        });
    }
    return joniarai;
}

export {fadeOutDoStuffThenFadeInLoadable, getMusicObjectArray, randomPic, arrayWithoutElem, stringFromSubstring};