import './style.css'
const params = new URLSearchParams(window.location.search);
const query = params.get("q");
export const NAMES: Map<string, string> = new Map([
    ["first-scene-and-model", "chapter-1"],
    ["first-model", "chapter-1"],
    ["load-model", "chapter-1"],
    
])
// console.log(path);
if(query){
    const pathName = NAMES.get(query);
    switch(pathName){
        case "chapter-1":
            import(`./chapter-1/${query}.ts`);
            break;
        default: 
        import('./home');
        break;
    }
} else {
    import('./home');
}

// import './chapter-1/first-scene-and-model.ts'
// import './chapter-1/first-model'
// import './chapter-1/load-model'
