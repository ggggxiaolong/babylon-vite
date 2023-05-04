import {
    ArcRotateCamera,
    Color3,
    CubeTexture,
    Engine,
    HemisphericLight,
    MeshBuilder,
    PBRMaterial,
    Scene,
    SceneLoader,
    SpotLight,
    StandardMaterial,
    Texture,
    Vector3,
} from "@babylonjs/core";

import "@babylonjs/inspector";
// import "@babylonjs/gui";
import { AdvancedDynamicTexture, Control, Slider, StackPanel, TextBlock } from "@babylonjs/gui";
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, Vector3.Zero(), scene);
    camera.attachControl(camera, true);
    camera.upperBetaLimit = Math.PI / 2.2; //纵向的最大旋转角度
    camera.upperRadiusLimit = 50; //最远距离
    camera.lowerRadiusLimit = 3; //最近距离

    const light = new HemisphericLight("light1", new Vector3(0, 50, 0), scene);
    // light.intensity = 0.1;

    SceneLoader.ImportMeshAsync("", "./meshes/", "lamp.babylon", scene).then((res) => {
        console.log(res);

        const bulb = res.meshes[1];
        const lampLight = new SpotLight("lampLight", Vector3.Zero(), new Vector3(0, -1, 0), 0.8 * Math.PI, 0.01, scene);
        lampLight.diffuse = Color3.Yellow();
        lampLight.parent = bulb;

        const lamp = res.meshes[0];
        lamp.position = new Vector3(2, 0, 2);
        lamp.rotation = new Vector3(0, -Math.PI / 4, 0);

        const lamp3 = lamp.clone("lamp3", null)!!;
        lamp3.position.z = -8;

        const lamp1 = lamp.clone("lamp1", null)!!;
        lamp1.position = new Vector3(-8, 0, 1.2);
        lamp1.rotation.y = Math.PI / 2;

        const lamp2 = lamp.clone("lamp2", null)!!;
        lamp2.position = new Vector3(-2.7, 0, 0.8);
        lamp2.rotation.y = -Math.PI / 2;
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
        (scene.getMeshByName("ground")!!.material!! as PBRMaterial).maxSimultaneousLights = 5;
    });

    //gui
    const adt = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const panel = new StackPanel();
    panel.width = "220px";
    panel.top = "-50px";
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    adt.addControl(panel);
    // 文本
    const header = new TextBlock();
    header.text = "昼夜";
    header.height = "30px";
    header.color = "white";
    panel.addControl(header);
    //滑动条
    const slider = new Slider();
    slider.minimum = 0;
    slider.maximum = 1;
    slider.borderColor = "black";
    slider.color = "#aaaaaa";
    slider.background = "white";
    slider.value = 1;
    slider.height = "20px";
    slider.width = "200px";
    panel.addControl(slider);
    slider.onValueChangedObservable.add(value => {
        light.intensity = value;
    })

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
