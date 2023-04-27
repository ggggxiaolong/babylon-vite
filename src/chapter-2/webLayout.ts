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
    Mesh,
    InstancedMesh,
} from "@babylonjs/core";

import "@babylonjs/inspector";

init();
addInstructions();

enum HouseType {
    Detach,
    Semi,
}
interface HouseInfo {
    houseType: HouseType;
    rotationY: number;
    positionX: number;
    positionZ: number;
}

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 25, Vector3.Zero(), scene);
    camera.attachControl(camera, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    buildDwellings(scene);
    buildGround();

    window.addEventListener("keydown", (ev) => {
        console.log(ev);

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

function buildDwellings(scene: Scene) {
    const detachHouse = buildDetachedHouse(scene);
    detachHouse.rotation.y = -Math.PI / 16;
    detachHouse.position.x = -6.8;
    detachHouse.position.z = 2.5;

    const semiHouse = buildSemiHouse(scene);
    semiHouse.rotation.y = -Math.PI / 16;
    semiHouse.position.x = -4.5;
    semiHouse.position.z = 3;

    const houseInfos: Array<HouseInfo> = [];
    houseInfos.push({ houseType: HouseType.Semi, rotationY: -Math.PI / 16, positionX: -1.5, positionZ: 4 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: -Math.PI / 3, positionX: 1.5, positionZ: 6 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: (15 * Math.PI) / 16, positionX: -6.4, positionZ: -1.5 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: (15 * Math.PI) / 16, positionX: -4.1, positionZ: -1 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: (15 * Math.PI) / 16, positionX: -2.1, positionZ: -0.5 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: (5 * Math.PI) / 4, positionX: 0, positionZ: -1 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: Math.PI + Math.PI / 2.5, positionX: 0.5, positionZ: -3 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: Math.PI + Math.PI / 2.1, positionX: 0.75, positionZ: -5 });
    houseInfos.push({
        houseType: HouseType.Detach,
        rotationY: Math.PI + Math.PI / 2.25,
        positionX: 0.75,
        positionZ: -7,
    });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: Math.PI / 1.9, positionX: 4.75, positionZ: -1 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: Math.PI / 1.95, positionX: 4.5, positionZ: -3 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: Math.PI / 1.9, positionX: 4.75, positionZ: -5 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: Math.PI / 1.9, positionX: 4.75, positionZ: -7 });
    houseInfos.push({ houseType: HouseType.Semi, rotationY: -Math.PI / 3, positionX: 5.25, positionZ: 2 });
    houseInfos.push({ houseType: HouseType.Detach, rotationY: -Math.PI / 3, positionX: 6, positionZ: 4 });

    houseInfos.forEach((info, index) => {
        var house: InstancedMesh;
        if (info.houseType === HouseType.Detach) {
            house = detachHouse.createInstance(`house ${index}`);
        } else {
            house = semiHouse.createInstance(`house ${index}`);
        }
        house.rotation.y = info.rotationY;
        house.position.x = info.positionX;
        house.position.z = info.positionZ;
    });
}

function buildDetachedHouse(scene: Scene): Mesh {
    // 主体
    const faceUV = [];
    faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //背面
    faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //正面
    faceUV[2] = new Vector4(0.25, 0.0, 0.5, 1.0); //右面
    faceUV[3] = new Vector4(0.75, 0.0, 1.0, 1.0); //左面

    const boxSize = new Vector3(1, 1, 1);
    const box = MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true }, scene);
    box.scaling = boxSize;
    box.position = new Vector3(0, boxSize.y / 2, 0);
    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene);
    box.material = boxMat;

    // 屋顶
    const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.6, height: boxSize.x, tessellation: 3 });
    roof.scaling.x = 0.75;
    roof.rotation.z = Tools.ToRadians(90);
    roof.position = new Vector3(0, boxSize.y + (1.6 / 4) * 0.75, 0);
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof.material = roofMat;
    //第二个为true的参数表示合并mesh之后会释放旧的mesh
    //最后一个为true的参数表示合并后的mesh会使用多材质对应到原有的部分，保持样式不变
    return Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)!!;
}
function buildSemiHouse(scene: Scene): Mesh {
    // 主体2
    const faceUV2 = [];
    faceUV2[0] = new Vector4(3 / 5, 0.0, 1.0, 1.0); //背面
    faceUV2[1] = new Vector4(0.0, 0.0, 2 / 5, 1.0); //正面
    faceUV2[2] = new Vector4(2 / 5, 0.0, 3 / 5, 1.0); //右面
    faceUV2[3] = new Vector4(2 / 5, 0.0, 3 / 5, 1.0); //左面

    const box2Size = new Vector3(2, 1, 1);
    const box2 = MeshBuilder.CreateBox("box", { faceUV: faceUV2, wrap: true }, scene);
    box2.scaling = box2Size;
    box2.position = new Vector3(0, box2Size.y / 2, 0);
    const box2Mat = new StandardMaterial("boxMat");
    box2Mat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/semihouse.png", scene);
    box2.material = box2Mat;

    // 屋顶2
    const roof2 = MeshBuilder.CreateCylinder("roof", { diameter: 1.6, height: box2Size.x + 0.2, tessellation: 3 });
    roof2.scaling.x = 0.75;
    roof2.rotation.z = Tools.ToRadians(90);
    roof2.position = new Vector3(0, box2Size.y + (1.6 / 4) * 0.75, 0);
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof2.material = roofMat;
    return Mesh.MergeMeshes([box2, roof2], true, false, undefined, false, true)!!;
}

function buildGround(): GroundMesh {
    //地面
    const ground = MeshBuilder.CreateGround("ground", { width: 15, height: 16 });
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0, 1, 0);
    ground.material = groundMat;
    return ground;
}

function addInstructions() {
    const info = document.createElement("div");
    info.id = "instructions";
    const title = document.createElement("h2");
    title.textContent = "Dwellings";
    info.appendChild(title);
    // info.appendChild(document.createElement("br"));
    const content = document.createElement("span");
    content.textContent = "A small village, has some houses and a green ground";
    info.appendChild(content);
    document.body.appendChild(info);
}
