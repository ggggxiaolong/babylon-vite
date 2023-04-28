import { Scene, Mesh, DynamicTexture, MeshBuilder, StandardMaterial, Color3, Vector3 } from "@babylonjs/core";

export function showAxis(size: number, scene: Scene) {
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