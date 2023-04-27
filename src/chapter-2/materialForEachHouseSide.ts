import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    MeshBuilder,
    Vector3,
    Tools,
    StandardMaterial,
    Color3,
    Texture,
    Vector4,
    GroundMesh,
} from "@babylonjs/core";
import "@babylonjs/inspector"

init();

// enum HouseType {
//     Detach,
//     Semi,
// }

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 25, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    buildDetachedHouse(-1, scene);
    buildSemiHouse(1.5, scene);
    buildGround();

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

function buildDetachedHouse(positionX: number, scene: Scene) {
    // 主体
    const faceUV = [];
    faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //背面
    faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //正面
    faceUV[2] = new Vector4(0.25, 0.0, 0.5, 1.0); //右面
    faceUV[3] = new Vector4(0.75, 0.0, 1.0, 1.0); //左面

    const boxSize = new Vector3(1, 1, 1);
    const box = MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true }, scene);
    box.scaling = boxSize;
    box.position = new Vector3(positionX, boxSize.y / 2, 0);
    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene);
    box.material = boxMat;

    // 屋顶
    const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.6, height: boxSize.x, tessellation: 3 });
    roof.scaling.x = 0.75;
    roof.rotation.z = Tools.ToRadians(90);
    roof.position = new Vector3(positionX, boxSize.y + (1.6 / 4) * 0.75, 0);
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof.material = roofMat;
}
function buildSemiHouse(positionX: number, scene: Scene) {
    // 主体2
    const faceUV2 = [];
    faceUV2[0] = new Vector4(3 / 5, 0.0, 1.0, 1.0); //背面
    faceUV2[1] = new Vector4(0.0, 0.0, 2 / 5, 1.0); //正面
    faceUV2[2] = new Vector4(2 / 5, 0.0, 3 / 5, 1.0); //右面
    faceUV2[3] = new Vector4(2 / 5, 0.0, 3 / 5, 1.0); //左面

    const box2Size = new Vector3(2, 1, 1);
    const box2 = MeshBuilder.CreateBox("box", { faceUV: faceUV2, wrap: true }, scene);
    box2.scaling = box2Size;
    box2.position = new Vector3(positionX, box2Size.y / 2, 0);
    const box2Mat = new StandardMaterial("boxMat");
    box2Mat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/semihouse.png", scene);
    box2.material = box2Mat;

    // 屋顶2
    const roof2 = MeshBuilder.CreateCylinder("roof", { diameter: 1.6, height: box2Size.x + 0.2, tessellation: 3 });
    roof2.scaling.x = 0.75;
    roof2.rotation.z = Tools.ToRadians(90);
    roof2.position = new Vector3(positionX, box2Size.y + (1.6 / 4) * 0.75, 0);
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof2.material = roofMat;
}

function buildGround(): GroundMesh {
    //地面
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0, 1, 0);
    ground.material = groundMat;
    return ground;
}