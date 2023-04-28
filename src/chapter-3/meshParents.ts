import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    MeshBuilder,
    Vector3,
    Color3,
    TransformNode,
    Node,
    DynamicTexture,
    StandardMaterial,
    Mesh,
} from "@babylonjs/core";
import "@babylonjs/inspector";

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

    addMeshes(scene);

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

function addMeshes(scene: Scene) {
    const boxParent = createBox("boxParent", 1);
    const boxChild = createBox("boxChild", 0.5);
    boxChild.setParent(boxParent);

    boxChild.position = new Vector3(0, 2, 0);
    boxChild.rotation = new Vector3(Math.PI / 4, Math.PI / 4, Math.PI / 4);

    boxParent.position = new Vector3(2, 0, 0);
    boxParent.rotation = new Vector3(0, 0, -Math.PI / 4);

    const axisChild = localAxes(1, scene);
    axisChild.parent = boxChild;
    showAxis(6, scene);
}

function createBox(name: string, size: number): Mesh {
    const faceColors = [
        Color3.Blue().toColor4(),
        Color3.Teal().toColor4(),
        Color3.Red().toColor4(),
        Color3.Purple().toColor4(),
        Color3.Green().toColor4(),
        Color3.Yellow().toColor4(),
    ];

    return MeshBuilder.CreateBox(name, { faceColors: faceColors, size: size })!!;
}

function localAxes(size: number, scene: Scene): Node {
    const axisX = MeshBuilder.CreateLines(
        "localAxesX",
        {
            points: [
                Vector3.Zero(),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, size * 0.05, 0),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, -0.05 * size, 0),
            ],
        },
        scene
    );
    axisX.color = new Color3(1, 0, 0);
    const axisY = MeshBuilder.CreateLines(
        "localAxesY",
        {
            points: [
                Vector3.Zero(),
                new Vector3(0, size, 0),
                new Vector3(-0.05 * size, size * 0.95, 0),
                new Vector3(0, size, 0),
                new Vector3(0.05 * size, 0.95 * size, 0),
            ],
        },
        scene
    );
    axisY.color = new Color3(0, 1, 0);
    const axisZ = MeshBuilder.CreateLines(
        "localAxesY",
        {
            points: [
                Vector3.Zero(),
                new Vector3(0, 0, size),
                new Vector3(0, -0.05 * size, size * 0.95),
                new Vector3(0, 0, size),
                new Vector3(0, 0.05 * size, 0.95 * size),
            ],
        },
        scene
    );
    axisZ.color = new Color3(0, 0, 1);
    const origin = new TransformNode("originAxis");
    axisX.parent = origin;
    axisY.parent = origin;
    axisZ.parent = origin;
    return origin;
}

function showAxis(size: number, scene: Scene) {
    function makeTextPlane(text: string, color: string, size: number): Mesh {
        const texture = new DynamicTexture("DynamicTexture", 50, scene, true);
        texture.hasAlpha = true;
        texture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
        const plane = MeshBuilder.CreatePlane("TextPlane", { size: size, updatable: true }, scene);
        const material = new StandardMaterial("TextPlaneMaterial", scene);
        material.backFaceCulling = false;
        material.specularColor = new Color3(0, 0, 0);
        material.diffuseTexture = texture;
        plane.material = material;
        return plane;
    }

    const axisX = MeshBuilder.CreateLines(
        "axisX",
        {
            points: [
                Vector3.Zero(),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, 0.05 * size, 0),
                new Vector3(size, 0, 0),
                new Vector3(size * 0.95, -0.05 * size, 0),
            ],
        },
        scene
    );
    axisX.color = new Color3(1, 0, 0);
    const xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = MeshBuilder.CreateLines(
        "axisX",
        {
            points: [
                Vector3.Zero(),
                new Vector3(0, size, 0),
                new Vector3(-0.05 * size, size * 0.95, 0),
                new Vector3(0, size, 0),
                new Vector3(0.05 * size, size * 0.95, 0),
            ],
        },
        scene
    );
    axisY.color = new Color3(0, 1, 0);
    const yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = MeshBuilder.CreateLines(
        "axisX",
        {
            points: [
                Vector3.Zero(),
                new Vector3(0, 0, size),
                new Vector3(0, -0.05 * size, size * 0.95),
                new Vector3(0, 0, size),
                new Vector3(0, 0.05 * size, size * 0.95),
            ],
        },
        scene
    );
    axisZ.color = new Color3(0, 0, 1);
    const zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
}
