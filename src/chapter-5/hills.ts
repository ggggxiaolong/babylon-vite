import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

import "@babylonjs/inspector"
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    //村庄地面
    const villageGroundMat = new StandardMaterial("villageGroundMat");
    villageGroundMat.diffuseTexture = new Texture("/environments/villagegreen.png");
    const villageGround = MeshBuilder.CreateGround("ground", {width: 24, height: 24});
    villageGround.material = villageGroundMat;


    // 山地面
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseTexture = new Texture("./environments/valleygrass.png");
    const ground = MeshBuilder.CreateGroundFromHeightMap("largeGround", "./environments/villageheightmap.png", {width: 150, height: 150, subdivisions: 20, minHeight:0, maxHeight: 10})
    ground.material = groundMat;
    ground.position.y = -0.01;

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
