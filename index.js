const startBtn = document.getElementById("startBtn");
const prevStep = document.getElementById("prevStep");
const nextStep = document.getElementById("nextStep");
const playBtn = document.getElementById("playBtn");
const container = document.getElementById("animation");


const animationSteps = [];
let step = 0;
let tick;

const renderList = (list) => {
    container.innerHTML = "";
    list.forEach((no, index) => {
        const box = document.createElement("div");
        box.className = "list-element";
        box.style.left = `${index * 30}px`
        box.style.height = `${(no*2) + 20}px`
        box.innerText = no;
        container.appendChild(box);
    })
}

const generateList = (length=10, max=100, min=0) => {
    const resultsArr = [];

    for (let i=0; i<length; i++) {
        const newNumber = Math.floor(Math.random() * (max - min)) + min;

        if(resultsArr.includes(newNumber)){
            length += 1;
        }
        else {
            resultsArr.push(newNumber)
        }
    }

    return resultsArr;
}

const bubbleSort = (list) => {
    const arr = [...list];
    let swapped = true;
    do {
        swapped = false;
        for(let i=0; i<arr.length; i++){
            if(arr[i] > arr[i + 1]){
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
                animationSteps.push([...arr]);
            }
        }
    } while(swapped)
    return arr;
}


const main = () => {
    const randomNumbers = generateList();
    const maxValue = bubbleSort(randomNumbers)[randomNumbers.length-1];
    container.style.height = `${(maxValue*2) + 20}px`
    renderList(randomNumbers);
}

const animatePosition = (stepArray) => {
    Array.from(container.children).forEach((child, index) => {
        const value = Number(child.innerText);
        const position = stepArray.indexOf(value);
        child.style.left = `${position * 30}px`;
    })
}

const handleNextAnimStep = () => {
    if(step > animationSteps.length - 1){
        if(tick){
            clearInterval(tick);
            tick = null;
        }
        return;
    }
    animatePosition(animationSteps[step++]);
}

const handlePrevAnimStep = () => {
    if(step === 0)return;
    animatePosition(animationSteps[step--]);
}


startBtn.addEventListener("click", main);
prevStep.addEventListener("click", handlePrevAnimStep);
nextStep.addEventListener("click", handleNextAnimStep);
playBtn.addEventListener("click", () => {
    tick = setInterval(handleNextAnimStep, 1000);
})

window.addEventListener("load", main);