import { ArcRotateCamera, Engine, HemisphericLight, Scene, SceneLoader, Vector3 } from "@babylonjs/core";

// import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
// import "@babylonjs/core/Materials/standardMaterial";
// import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    // const box = MeshBuilder.CreateBox("box", { }, scene);
    SceneLoader.ImportMeshAsync("box", "./", "box.glb", scene);

    window.addEventListener("keydown", (ev) => {
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        }
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    engine.runRenderLoop(() => {
        scene.render();
    });
}
