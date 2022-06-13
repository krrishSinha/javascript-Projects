const form = document.querySelector(".add-items");
const itemList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function submit(e){
    e.preventDefault();
    const inputvalue = (document.querySelector(`[type="text"]`)).value;
    const item = {
        text: inputvalue,
        done: false
    }

    items.push(item);
    addingListItems(items, itemList);
    localStorage.setItem("items", JSON.stringify(items));
    form.reset();
}

function addingListItems(itemArray, itemlist){
    const html = itemArray.map((item, index)=>{
        return `
        <li>
        <input type="checkbox" data-index='${index}' id="item${index}" ${item.done ? "checked" : ""} />
        <label for="item${index}">${item.text}</label>
        </li>
        `
    }).join("");

    

    itemList.innerHTML = html;
}

function toggleHandle(e){
    if(!e.target.matches("input")){
        return;
    }
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    addingListItems(items, itemList);
}

form.addEventListener("submit", submit);

addingListItems(items, itemList);

itemList.addEventListener("click", toggleHandle);