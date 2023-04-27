import { NAMES } from "./main";
const table = document.createElement("table");
table.className = "table"
let index = 0;
let tr = document.createElement("tr");
table.appendChild(tr)
for(let key of NAMES.keys()){
    // console.log(key);
    const td = document.createElement("td");
    const a = document.createElement("a");
    if(NAMES.get(key) === "html"){
        a.href = `${key}.html`;
    } else {
        a.href = `?q=${key}`;
    }
    a.textContent = key;
    td.appendChild(a);
    tr.appendChild(td);
    index += 1;
    if(index % 8 == 0){
        tr = document.createElement("tr");
        table.appendChild(tr)
    }
}

document.body.appendChild(table);