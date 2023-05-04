import {
    ArcRotateCamera,
    Axis,
    Color3,
    CubeTexture,
    DirectionalLight,
    Engine,
    MeshBuilder,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Space,
    StandardMaterial,
    Texture,
    Tools,
    Vector3,
} from "@babylonjs/core";

import "@babylonjs/inspector";
init();

interface Track {
    turn: number;
    dist: number;
}

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 20, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
    light.position = new Vector3(0, 50, -100);

    const shadowGenerator = new ShadowGenerator(1024, light);

    const tracks: Array<Track> = [
        { turn: 86, dist: 7 },
        { turn: 86, dist: 7 },
        { turn: -85, dist: 14.8 },
        { turn: -93, dist: 16.5 },
        { turn: 48, dist: 25.5 },
        { turn: -112, dist: 30.5 },
        { turn: -72, dist: 33.2 },
        { turn: 42, dist: 37.5 },
        { turn: -98, dist: 45.2 },
        { turn: 0, dist: 47 },
    ];
    SceneLoader.ImportMeshAsync("him", "./meshes/Dude/", "Dude.babylon", scene).then((res) => {
        const dude = res.meshes[0];
        dude.scaling = new Vector3(0.008, 0.008, 0.008);
        shadowGenerator.addShadowCaster(dude, true);
        dude.position = new Vector3(-6, 0, 0);
        dude.rotate(Axis.Y, Tools.ToRadians(-95), Space.LOCAL);
        const startRotation = dude.rotationQuaternion?.clone()!!;

        scene.beginAnimation(res.skeletons[0], 0, 100, true);

        let distance = 0;
        const step = 0.01;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
            dude.movePOV(0, 0, step);
            distance += step;

            if(distance > tracks[p].dist){
                dude.rotate(Axis.Y, Tools.ToRadians(tracks[p].turn), Space.LOCAL);
                p += 1;
                p %= tracks.length;
                if(p === 0){
                    distance = 0;
                    dude.position = Vector3.Zero();
                    dude.rotationQuaternion = startRotation.clone();
                }
            }
        })
    });

    // 天空盒子
    const skyBox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyBoxMat = new StandardMaterial("skyBoxMat");
    skyBoxMat.backFaceCulling = false; //背面剔除
    skyBoxMat.reflectionTexture = new CubeTexture("./textures/skyboxCube/skybox", scene);
    skyBoxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyBoxMat.diffuseColor = new Color3(0, 0, 0);
    skyBoxMat.specularColor = new Color3(0, 0, 0);
    skyBox.material = skyBoxMat;

    SceneLoader.ImportMeshAsync("", "./meshes/", "valleyvillage.glb").then(() => {
        scene.getMeshByName("ground")!!.receiveShadows = true;
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
