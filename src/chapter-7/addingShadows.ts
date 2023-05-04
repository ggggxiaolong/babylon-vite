import {
    ArcRotateCamera,
    DirectionalLight,
    Engine,
    MeshBuilder,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3,
} from "@babylonjs/core";

import "@babylonjs/inspector";
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
    light.position = new Vector3(0, 15, -30);

    const ground = MeshBuilder.CreateGround("ground", {width:100, height:100, updatable: false}, scene);
    ground.receiveShadows = true;

    const shadowGenerator = new ShadowGenerator(1024, light);
    SceneLoader.ImportMeshAsync("him", "./meshes/Dude/", "Dude.babylon", scene).then(res => {
        const dude = res.meshes[0];
        dude.scaling = new Vector3(0.2, 0.2, 0.2);
        shadowGenerator.addShadowCaster(dude, true);
        scene.beginAnimation(res.skeletons[0], 0, 100, true);
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
