import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import { FETCH_USER } from "./Character.queries";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { S3_PATH } from "../../../../commons/constants/Constants";

declare global {
  interface Window {
    scene: THREE.Scene;
  }
}

export default function Character() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mixers: THREE.AnimationMixer[] = [];
  const gltfLoader = new GLTFLoader();
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;

  const { data } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER, {
    fetchPolicy: "network-only",
  });
  /* 그래픽 초기화 */
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!data?.fetchUser.character) return;

    /* scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1128");
    scene.fog = new THREE.Fog("#0D0D2B", 5, 25);
    if (!scene) {
      console.error("Scene initialization failed");
      return;
    }
    window.scene = scene;

    /* camera */
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const playerPositions: THREE.Vector3 = new THREE.Vector3(0, 0.5, -3.5); // 가운데
    camera.position.z = 0;
    camera.position.y = 2;
    camera.position.x = 1.7;
    camera.lookAt(new THREE.Vector3(0, 1, -3.5));

    /* Light */
    const ambientLight = new THREE.AmbientLight("white", 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 1);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    /* renderer */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);

    gltfLoader.load(
      `${S3_PATH}/game/player/${data?.fetchUser.character}.glb`,
      (gltf) => {
        const player = gltf.scene.children[0];
        player.scale.set(0.7, 0.7, 0.7);
        player.position.copy(playerPositions);
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(player); // 애니메이션을 재생할 mixer 생성
          const action = mixer.clipAction(gltf.animations[6]); // 애니메이션을 재생할 action 생성
          mixer.timeScale = 0.5;
          action.play(); // 애니메이션 재생
          mixers.push(mixer); // animate 함수에서 mixer를 update해서 재생해야 하기 때문에 저장해둠
        }

        player.traverse((child) => {
          child.castShadow = true; // 그림자 생성
        });
        scene.add(player);
      }
    );
  }, [data?.fetchUser.character]);

  /* animation */
  useEffect(() => {
    const clock = new THREE.Clock();
    /* 애니메이션을 재생하는 함수 */
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      for (const mixer of mixers) {
        mixer.update(delta);
      }
      if (renderer) renderer.render(scene, camera);
    };
    animate();
  }, [data?.fetchUser.character]);

  return (
    <div
      style={{
        top: 0,
        left: 0,
        // position: "fixed",
      }}
      ref={canvasRef}
    />
  );
}
