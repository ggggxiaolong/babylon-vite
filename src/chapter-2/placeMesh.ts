import { ArcRotateCamera, Engine, HemisphericLight, Scene, MeshBuilder, Vector3, Tools } from "@babylonjs/core";
import "@babylonjs/inspector"
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 25, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    const box = MeshBuilder.CreateBox("box", {}, scene);
    box.scaling = new Vector3(2,4,3);
    box.position = new Vector3(-2, 2, 1);
    box.rotation.y = Tools.ToRadians(45);
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
