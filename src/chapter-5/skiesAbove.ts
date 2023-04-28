import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Animation,
    Scene,
    SceneLoader,
    IAnimationKey,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    CubeTexture,
    Texture,
    Color3,
} from "@babylonjs/core";

import "@babylonjs/inspector";
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    camera.attachControl(camera, true);
    camera.upperBetaLimit = Math.PI / 2.2;//纵向的最大旋转角度
    camera.upperRadiusLimit = 50; //最远距离
    camera.lowerRadiusLimit = 3; //最近距离

    new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMeshAsync("", "./meshes/", "valleyvillage.glb", scene);
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
                carKeys.push({ frame: 0, value: 10 });
                carKeys.push({ frame: 200, value: -15 });
                carAni.setKeys(carKeys);
                mesh.animations = [carAni];
                scene.beginAnimation(mesh, 0, 200, true);
            }
            if (mesh.name.startsWith("wheel")) {
                scene.beginAnimation(mesh, 0, 30, true);
            }
        });
    });

    // 天空
    const skyBox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyBoxMat = new StandardMaterial("skyBoxMat");
    skyBoxMat.backFaceCulling = false; //背面剔除
    skyBoxMat.reflectionTexture = new CubeTexture("./textures/skyboxCube/skybox", scene);
    skyBoxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyBoxMat.diffuseColor = new Color3(0, 0, 0);
    skyBoxMat.specularColor = new Color3(0, 0, 0);
    skyBox.material = skyBoxMat;

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
