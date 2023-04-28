import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    MeshBuilder,
    Axis,
    Space,
} from "@babylonjs/core";
import "@babylonjs/inspector";
// import earcut from "earcut";
// import "@babylonjs/loaders/glTF";
import { showAxis } from "../tools";

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
    showAxis(1, scene);

    const camera = new ArcRotateCamera("camera", -Math.PI / 1.5, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.25 });
    sphere.position = new Vector3(2, 0, 2);

    const points = [new Vector3(2, 0, 2), new Vector3(2, 0, -2), new Vector3(-2, 0, -2), new Vector3(2, 0, 2)];
    MeshBuilder.CreateLines("triangle", { points: points });

    const track: Array<Track> = [
        { turn: Math.PI / 2, dist: 4 },
        { turn: (3 * Math.PI) / 4, dist: 4 + 4 },
        { turn: (3 * Math.PI) / 4, dist: 4 + 4 + 4 * Math.sqrt(2) },
    ];

    let trackIndex = 0;
    let distance = 0;
    const step = 0.05;
    scene.onBeforeRenderObservable.add(() => {
        if (distance > track[trackIndex].dist) {
            // 沿着自身Y轴旋转
            sphere.rotate(Axis.Y, track[trackIndex].turn, Space.LOCAL);
            trackIndex += 1;
            trackIndex %= track.length;
            if (trackIndex === 0) {
                distance = 0;
                sphere.position = new Vector3(2, 0, 2);
                sphere.rotation = Vector3.Zero();
            }
        }
        distance += step;
        sphere.movePOV(0, 0, step);
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
