import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    MeshBuilder,
    Texture,
    Mesh,
    ParticleSystem,
    Color4,
} from "@babylonjs/core";

import "@babylonjs/inspector";
init();

function init() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", (3 * Math.PI) / 2, Math.PI / 2, 70, Vector3.Zero(), scene);
    camera.attachControl(camera, true);
    // camera.upperBetaLimit = Math.PI / 2.2; //纵向的最大旋转角度
    // camera.upperRadiusLimit = 50; //最远距离
    // camera.lowerRadiusLimit = 3; //最近距离

    new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    //喷泉
    const fountainProfile = [
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
        new Vector3(10, 4, 0),
        new Vector3(8, 4, 0),
        new Vector3(8, 1, 0),
        new Vector3(1, 2, 0),
        new Vector3(1, 15, 0),
        new Vector3(3, 17, 0),
    ];

    const fountain = MeshBuilder.CreateLathe(
        "fountain",
        { shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE },
        scene
    );
    // fountain.scaling = new Vector3(0.05, 0.05, 0.05);
    fountain.position = new Vector3(0, -15, 0);

    const particleSystem = new ParticleSystem("particles", 5000, scene);
    //粒子贴图
    particleSystem.particleTexture = new Texture("textures/flare.png", scene);
    // 发射区域
    particleSystem.emitter = new Vector3(0, 0, 0);
    // 发射的立方体区域
    particleSystem.minEmitBox = new Vector3(-1, 0, 0);
    particleSystem.maxEmitBox = new Vector3(1, 0, 0);
    //设置粒子颜色
    particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    //尺寸和生命周期
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 3.5;
    // 每秒发射数
    particleSystem.emitRate = 1500;
    // 可能的发射方向
    particleSystem.direction1 = new Vector3(-2, 8, 2);
    particleSystem.direction2 = new Vector3(2, 8, -2);
    // 角速度
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;
    // 粒子发射的最大最小系数，粒子的更新速度
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.025;
    // 重力方向
    particleSystem.gravity = new Vector3(0, -9.81, 0);
    particleSystem.start();

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
