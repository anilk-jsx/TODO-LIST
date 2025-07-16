const inputElem = document.getElementById("inputElem");
const addBtn = document.querySelector(".addBtn");
const dataSection = document.getElementById("dataSection");

let toDoValueArr = [];
const getLocalStorageData = ()=>{
    return JSON.parse(localStorage.getItem("ToDoListData"));
}
const addDynamicData = (data)=>{
    if(data!=""){
        const dataElem = document.createElement("div");
        dataElem.classList.add("toDoElem");
        dataElem.innerHTML = `<li>${data}</li><button class="dltBtn">Delete</button>`;
        dataSection.append(dataElem);
    }
}
const addBtnHandler = ()=>{
    data = inputElem.value.trim();
    if(data == ""){
        alert("please enter some values");
    }
    if(!toDoValueArr.includes(data)){
        toDoValueArr.push(data);
        toDoValueArr = [...new Set(toDoValueArr)];
        localStorage.setItem("ToDoListData",JSON.stringify(toDoValueArr));
        addDynamicData(data);
        inputElem.value = "";
    }
}
addBtn.addEventListener("click",(event)=>{
    addBtnHandler(event);
});
let localStorageData = getLocalStorageData();
localStorageData.forEach(element => {
    addDynamicData(element);
});
const addToLocalStorage = (toDoValueArr)=>{
    localStorage.setItem("ToDoListData", JSON.stringify(toDoValueArr));
}
const dltBtnHandler = (event)=>{
    let toDoToremove = event.target;
    let dataToRemove = toDoToremove.previousElementSibling.innerText;

    toDoValueArr = toDoValueArr.filter((curData)=>{
        return curData !== dataToRemove;
    });
    addToLocalStorage(toDoValueArr);
    toDoToremove.parentElement.remove();
} 
dataSection.addEventListener('click',(event)=>{
    if(event.target.classList.contains('dltBtn')){
        dltBtnHandler(event);
    }
});