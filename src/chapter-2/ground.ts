import { ArcRotateCamera, Engine, HemisphericLight, Scene, MeshBuilder, Vector3 } from "@babylonjs/core";
import "@babylonjs/inspector"
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

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    const box = MeshBuilder.CreateBox("box", {}, scene);
    box.position.y = 0.5;
    MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

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
