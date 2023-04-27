import { ArcRotateCamera, Engine, HemisphericLight, Scene, MeshBuilder, Vector3, Tools, StandardMaterial, Color3, Texture } from "@babylonjs/core";

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

    // 主体
    const box = MeshBuilder.CreateBox("box", { width: 2, height: 1.8, depth: 1 }, scene);
    box.position = new Vector3(0, 0.9, 0);
    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/floor.png", scene);
    box.material = boxMat;

    // 屋顶
    const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.6, height: 2, tessellation: 3 });
    roof.scaling.x = 0.75;
    roof.rotation.z = Tools.ToRadians(90);
    roof.position = new Vector3(0, 1.8 + (1.6 / 4) * 0.75, 0);
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof.material = roofMat;

    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0,1,0);
    ground.material = groundMat;

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
