const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-Colors") || "[]");

const copyColor = element=>{
    navigator.clipboard.writeText(element.dataset.color);
    element.innerHTML = "COPIED";
    setTimeout(()=>{
        element.innerHTML = element.dataset.color;
    },1000);
}

const showColors = ()=>{
    colorList.innerHTML = pickedColors.map(color=>`
        <li class="color">
            <span class="rect" style="background: ${color}; border:1px solid ${color=="#ffffff" ? "#ccc":color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>   
    `).join("");

    document.querySelector(".picked-colors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li=>{
        li.addEventListener("click",e=>copyColor(e.currentTarget.lastElementChild))
    })
}
showColors();

const activateEyeDropper = async()=>{
    try {
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);
        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-Colors",JSON.stringify(pickedColors));
            showColors();
        }
    } catch (e) {
        console.log(e);
    }

}

clearAll.addEventListener("click",()=>{
    pickedColors.length = 0;
    localStorage.setItem("picked-Colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
})

colorPickerBtn.addEventListener("click",activateEyeDropper);