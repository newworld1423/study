(() => {

    const actions = {
        birdFlies(key) {
            if(key){
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`; //위 코드에서 템플릿 리터럴 써주셨는지 한번 확인해보세요. ' <- 이 따옴표가 아니라 ` <- 요 백틱 써주셔야해요. (숫자 1 왼쪽에 있는 버튼)
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if(key){
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`; //위 코드에서 템플릿 리터럴 써주셨는지 한번 확인해보세요. ' <- 이 따옴표가 아니라 ` <- 요 백틱 써주셔야해요. (숫자 1 왼쪽에 있는 버튼)
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    //https://heropy.blog/2019/10/27/intersection-observer/
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        //stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if(action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if(action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        //for (let i = 0; i < stepElems.length; i++){
        for (let i = ioIndex - 1; i < ioIndex + 2; i++){
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();

            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {

                inactivate(currentItem.dataset.action); //이런형식으로 인수를 넣어주시면 됩니다.
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();
})();

// 1. (() => {})() : IIFE(즉시 실행 함수 표현)
// 2. const constant = {}