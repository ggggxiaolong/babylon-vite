import { NAMES } from "./main";
// console.log(NAMES.keys());
const table = document.createElement("table");
table.className = "table"
let index = 0;
let tr = document.createElement("tr");
table.appendChild(tr)
for(let key of NAMES.keys()){
    // console.log(key);
    const td = document.createElement("td");
    const a = document.createElement("a");
    a.href = `?q=${key}`;
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