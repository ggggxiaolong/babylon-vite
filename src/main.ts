import './style.css'
const params = new URLSearchParams(window.location.search);
const query = params.get("q");
export const NAMES: Map<string, string> = new Map([
    ["first-scene-and-model", "chapter-1"],
    ["first-model", "chapter-1"],
    ["load-model", "chapter-1"],
    ["ground", "chapter-2"],
    ["sound", "chapter-2"],
    ["placeMesh", "chapter-2"],
    ["basicHouse", "chapter-2"],
    ["texture", "chapter-2"],
    ["materialForEachHouseSide", "chapter-2"],
    ["combiningMesh", "chapter-2"],
    ["copyMeshes", "chapter-2"],
    ["chapter-2-camera", "html"],
    ["webLayout", "chapter-2"],
    
])
// console.log(path);
if(query){
    const pathName = NAMES.get(query);
    switch(pathName){
        case "chapter-1":
            import(`./chapter-1/${query}.ts`);
            break;
        case "chapter-2":
            import(`./chapter-2/${query}.ts`);
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
