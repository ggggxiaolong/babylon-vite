import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    MeshBuilder,
    Vector3,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import earcut from "earcut";
import { showAxis } from "../tools";

init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    showAxis(1, scene);
    buildCar(scene);

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

function buildCar(scene: Scene) {
    const outline = [new Vector3(-0.3, 0, -0.1), new Vector3(0.2, 0, -0.1)];
    // 前面，半圆
    for (let i = 0; i < 20; i++) {
        outline.push(new Vector3(0.2 * Math.cos(i * Math.PI/ 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }
    outline.push(new Vector3(0, 0, 0.1));
    outline.push(new Vector3(-0.3, 0, 0.1));
    const car = MeshBuilder.ExtrudePolygon("car", { shape: outline, depth: 0.2 }, scene, earcut);

    const wheelRB = MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height:0.05});
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;

    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;

    const wheelLB = wheelRB.clone("wheelRF");
    wheelLB.position.y = -0.2 - 0.035;

    const wheelLF = wheelLB.clone("wheelRF");
    wheelLF.position.x = 0.1;

    car.rotation.x = -Math.PI / 2;
    car.position.z = -0.1;
}
