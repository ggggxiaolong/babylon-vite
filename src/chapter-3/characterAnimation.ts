import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/inspector";
// import earcut from "earcut";
// import "@babylonjs/loaders/glTF";
import { showAxis } from "../tools";

init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    showAxis(2, scene);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    SceneLoader.ImportMeshAsync("him", "./meshes/Dude/", "Dude.babylon", scene).then((r) => {
        const mesh = r.meshes[0];
        mesh.scaling = new Vector3(0.25, 0.25, 0.25);
        scene.beginAnimation(r.skeletons[0], 0, 100, true, 1.0);
    });

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
