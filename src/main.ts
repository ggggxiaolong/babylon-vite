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
    ["meshParents", "chapter-3"],
    ["car", "chapter-3"],
    ["carMesh", "chapter-3"],
    ["wheelAnimation", "chapter-3"],
    ["carAnimation", "chapter-3"],
    ["characterAnimation", "chapter-3"],
    ["movePov", "chapter-3"],
    ["walkAround", "chapter-3"],
    ["avoidCollisions", "chapter-4"],
    ["hills", "chapter-5"],
    ["combineHills", "chapter-5"],
    ["skiesAbove", "chapter-5"],
    ["tree", "chapter-5"],
    ["latheMesh", "chapter-6"],
    ["particleSpray", "chapter-6"],
    ["switchEvent", "chapter-6"],
    ["lightTheNight", "chapter-7"],
    ["lightTheNight2", "chapter-7"],
    ["dayToNight", "chapter-7"],
    ["addingShadows", "chapter-7"],
    ["addingShadows2", "chapter-7"],
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
        case "chapter-3":
            import(`./chapter-3/${query}.ts`);
            break;
        case "chapter-4":
            import(`./chapter-4/${query}.ts`);
            break;
        case "chapter-5":
            import(`./chapter-5/${query}.ts`);
            break;
        case "chapter-6":
            import(`./chapter-6/${query}.ts`);
            break;
        case "chapter-7":
            import(`./chapter-7/${query}.ts`);
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
