import {
    ArcRotateCamera,
    Color3,
    Engine,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SpotLight,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";

import "@babylonjs/inspector";
import { doDownload, showAxis } from "../tools";
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    showAxis(2, scene);

    const light = new HemisphericLight("light1", new Vector3(0, 10, 0), scene);
    light.intensity = 0.5;

    // 名字，位置，方向，发散范围，衰减速度
    const lampLight = new SpotLight("lampLight", Vector3.Zero(), new Vector3(0, -1, 0), Math.PI, 1, scene);
    lampLight.diffuse = Color3.Yellow();

    const lampShape = [];
    for (let i = 0; i < 20; i++) {
        lampShape.push(new Vector3(Math.cos((i * Math.PI) / 10), Math.sin((i * Math.PI) / 10), 0));
    }
    lampShape.push(lampShape[0]);

    const lampPath: Array<Vector3> = [];
    lampPath.push(new Vector3(0, 0, 0));
    lampPath.push(new Vector3(0, 10, 0));
    for (let i = 1; i < 20; i++) {
        lampPath.push(new Vector3(1 + Math.cos(Math.PI + (i * Math.PI) / 40), 10 + Math.sin((i * Math.PI) / 40), 0));
    }
    lampPath.push(new Vector3(3, 11, 0));

    const yellowMat = new StandardMaterial("yellowMat");
    yellowMat.emissiveColor = Color3.Yellow();

    const lamp = MeshBuilder.ExtrudeShape("lamp", { cap: Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5 });
    const bulb = MeshBuilder.CreateSphere("bulb", { diameterX: 1.5, diameterZ: 0.8 });

    bulb.material = yellowMat;
    bulb.parent = lamp;
    bulb.position = new Vector3(2, 10.5, 0);
    lampLight.parent = bulb;
    lamp.scaling = new Vector3(0.1, 0.1, 0.1)

    MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

    if (confirm("导出路灯?")) {
        doDownload("lamp", lamp);
    }

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