import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { S3_PATH } from "../../../../commons/constants/Constants";

declare global {
  interface Window {
    scene: THREE.Scene;
  }
}

const CHARACTERS = [
  "beluga",
  "hare",
  "husky",
  "lynx",
  "narwhal",
  "puffin",
  "puma",
  "leopard",
  "moose",
];

export default function MyroomCharacters(props: { character: string }) {
  const [characters, setCharacters] =
    useState<Array<THREE.Object3D<THREE.Event>>>();
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const mixers: THREE.AnimationMixer[] = [];
  const gltfLoader = new GLTFLoader();
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;

  /* 그래픽 초기화 */
  useEffect(() => {
    if (!canvasRef.current) return;

    /* scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1128");
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
    const playerPositions: THREE.Vector3 = new THREE.Vector3(0, 0, -2.7); // 가운데
    camera.position.z = 0;
    camera.position.y = 1.5;
    camera.position.x = 2;
    camera.lookAt(new THREE.Vector3(-0.5, 1, -2.7));

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
    renderer.setSize(250, 250);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);
    const characterObjects = new Array<THREE.Object3D<THREE.Event>>(
      CHARACTERS.length
    );

    CHARACTERS.forEach((character, idx) => {
      if (characterObjects[idx]) return;
      gltfLoader.load(`${S3_PATH}/game/player/${character}.glb`, (gltf) => {
        const player = gltf.scene.children[0];
        player.scale.set(1, 1, 1);
        player.position.copy(playerPositions);
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(player); // 애니메이션을 재생할 mixer 생성
          const action = mixer.clipAction(gltf.animations[6]); // 애니메이션을 재생할 action 생성
          mixer.timeScale = 0.5;
          action.play(); // 애니메이션 재생
          mixers.push(mixer); // animate 함수에서 mixer를 update해서 재생해야 하기 때문에 저장해둠
          characterObjects[idx] = player;
          if (props.character !== character) {
            player.visible = false;
          } else {
            setActiveCharacterIndex(idx);
          }
        }

        player.traverse((child) => {
          child.castShadow = true; // 그림자 생성
        });
        scene.add(player);
      });
    });
    setCharacters(characterObjects);
  }, []);

  const changeCharacter = () => {
    if (!characters) return;
    if (!characters?.[activeCharacterIndex]) return;
    characters[activeCharacterIndex].visible = false;
    const newIndex = CHARACTERS.indexOf(props.character);
    if (!characters?.[newIndex]) return;
    characters[newIndex].visible = true;
    setActiveCharacterIndex(newIndex);
  };

  useEffect(() => {
    if (!characters) return;
    if (!props.character) return;
    changeCharacter();
  }, [props.character]);

  /* animation */
  useEffect(() => {
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      for (const mixer of mixers) {
        mixer.update(delta);
      }
      if (renderer) renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <Wrapper>
      <div ref={canvasRef} />
      <Text>함께 달릴 캐릭터를 선택하세요!</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;
