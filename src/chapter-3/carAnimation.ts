import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    Animation,
    IAnimationKey,
    SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/inspector";
// import earcut from "earcut";
import "@babylonjs/loaders/glTF";
import { showAxis } from "../tools";

init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    showAxis(2, scene);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(-1, 1, 0), scene);
    SceneLoader.ImportMeshAsync("", "./meshes/", "village.glb", scene);
    SceneLoader.ImportMeshAsync("", "./meshes/", "car.glb", scene).then((r) => {
        r.meshes.forEach((mesh) => {
            if (mesh.name === "car") {
                mesh.rotation = new Vector3(Math.PI / 2, 0, -Math.PI / 2);
                mesh.position = new Vector3(-3, 0.1 + 0.125 / 2, 8);
                const carAni = new Animation(
                    "carAnimation",
                    "position.z",
                    30,
                    Animation.ANIMATIONTYPE_FLOAT,
                    Animation.ANIMATIONLOOPMODE_CYCLE
                );
                const carKeys: Array<IAnimationKey> = [];
                carKeys.push({ frame: 0, value: 8 });
                carKeys.push({ frame: 150, value: -7 });
                carKeys.push({ frame: 210, value: -7 });
                carAni.setKeys(carKeys);
                mesh.animations = [carAni];
                scene.beginAnimation(mesh, 0, 210, true);
            }
            if (mesh.name.startsWith("wheel")) {
                scene.beginAnimation(mesh, 0, 30, true);
            }
        });
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
