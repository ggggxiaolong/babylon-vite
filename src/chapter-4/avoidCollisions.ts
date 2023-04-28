import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    SceneLoader,
    Animation,
    IAnimationKey,
    Axis,
    Space,
    Tools,
    StandardMaterial,
    MeshBuilder,
} from "@babylonjs/core";
import "@babylonjs/inspector";
// import earcut from "earcut";
// import "@babylonjs/loaders/glTF";
import { showAxis } from "../tools";

interface Track {
    turn: number;
    dist: number;
}

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

    //碰撞检测盒子
    const wireMat = new StandardMaterial("wireMat");
    wireMat.alpha = 0;
    // wireMat.wireframe = true;

    const hitBox = MeshBuilder.CreateBox("carBox", {width: 0.5, height: 0.6, depth:4.5});
    hitBox.material = wireMat;
    hitBox.position = new Vector3(3.1, 0.3, -5);

    let carReady = false;
    SceneLoader.ImportMeshAsync("", "./meshes/", "village.glb", scene);
    SceneLoader.ImportMeshAsync("", "./meshes/", "car.glb", scene).then((r) => {
        carReady = true;
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
    SceneLoader.ImportMeshAsync("him", "./meshes/Dude/", "Dude.babylon", scene).then((r) => {
        const mesh = r.meshes[0];
        mesh.scaling = new Vector3(0.008, 0.008, 0.008);
        mesh.position = new Vector3(1.5, 0, -6.9);
        mesh.rotate(Axis.Y, Tools.ToRadians(-90), Space.LOCAL);
        const startRotation = mesh.rotationQuaternion!!.clone(); 
        scene.beginAnimation(r.skeletons[0], 0, 100, true, 1.0);

        const track: Array<Track> = [
            { turn: 180, dist: 2.5 },
            { turn: 0, dist: 5 },
        ];

        let trackIndex = 0;
        let distance = 0;
        const step = 0.015;
        
        const dudeBox = r.meshes[2];
        
        const car = scene.getMeshByName("car");
        scene.onBeforeRenderObservable.add(() => {
            if(carReady){
                // 当汽车在盒子里，人不在 让人停住
                if(!dudeBox.intersectsMesh(hitBox) && car?.intersectsMesh(hitBox)){
                    return;
                }
            }
            if (distance > track[trackIndex].dist) {
                // 沿着自身Y轴旋转
                mesh.rotate(Axis.Y, Tools.ToRadians(track[trackIndex].turn), Space.LOCAL);
                trackIndex += 1;
                trackIndex %= track.length;
                if (trackIndex === 0) {
                    distance = 0;
                    mesh.position = new Vector3(-6, 0, 0);
                    mesh.rotationQuaternion = startRotation.clone();
                }
            }
            distance += step;
            mesh.movePOV(0, 0, step);
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
