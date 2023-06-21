// Graphic.tsx
import { useRef, useEffect, useState, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IGrapicProps } from "./Graphic.types";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../../commons/store";

declare global {
  interface Window {
    scene: THREE.Scene;
  }
}

const SNOWMAN_DAMAGE_INTERVAL = 3.5;

export default function Graphic(props: IGrapicProps) {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const userInfo = useRecoilValue(userInfoState);

  const [players, setPlayers] = useState<{
    mid: THREE.Object3D | undefined;
    right: THREE.Object3D | undefined;
    left: THREE.Object3D | undefined;
  }>();
  // const [actions, setActions] = useState<THREE.AnimationAction[]>([]);
  const [isStop, setIsStop] = useState<boolean[]>([]);
  const currentPlayerRef = useRef<THREE.Object3D | null>(null); // 현재 유저의 플레이어를 가리키는 ref

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
    scene.background = new THREE.Color("#0D0D2B");
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
    camera.position.z = -10;
    camera.position.y = 5;
    camera.position.x = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    /* floor */
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load("/game/floor/neon.png");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10); // Repeat the texture 10 times in both directions
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      side: THREE.DoubleSide,
      color: "#d0d0d0",
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    /* players */
    // 각 플레이어가 처음에 생성될 위치
    const playerPositions: THREE.Vector3[] = [
      new THREE.Vector3(0, 0, -5.5), // 가운데
      new THREE.Vector3(-1.5, 0, -5.5), // 오른쪽
      new THREE.Vector3(1.5, 0, -5.5), // 왼쪽
    ];

    const characters = props.playersInfo.map((player) => player.character);
    for (let i = 0; i < props.playersInfo.length; i++) {
      gltfLoader.load(`/game/player/${characters[i]}.glb`, (gltf) => {
        const player = gltf.scene.children[0];
        player.scale.set(0.7, 0.7, 0.7);
        player.position.copy(playerPositions[i]);

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(player); // 애니메이션을 재생할 mixer 생성
          const action = mixer.clipAction(gltf.animations[13]); // 애니메이션을 재생할 action 생성
          action.play(); // 애니메이션 재생
          mixers.push(mixer); // animate 함수에서 mixer를 update해서 재생해야 하기 때문에 저장해둠
          // 아이템 효과로 애니메이션을 정지/재생 시키기 위해서 action을 저장해둠
          // setActions((actions) => {
          //   const newActions = [...actions];
          //   newActions[i] = action;
          //   return newActions;
          // });
        }

        player.traverse((child) => {
          child.castShadow = true; // 그림자 생성
        });
        scene.add(player);

        setPlayers((players) => {
          const newPlayers =
            i === 0
              ? { mid: player, right: players?.right, left: players?.left }
              : i === 1
              ? { right: player, mid: players?.mid, left: players?.left }
              : { left: player, mid: players?.mid, right: players?.right };
          return newPlayers;
        });

        setIsStop((isStop) => {
          const newIsStop = [...isStop];
          newIsStop[i] = false;
          return newIsStop;
        });

        // 최초로 생성된 (가운데에 위치한) 플레이어를 currentPlayer로 저장해둠
        if (i === 0) currentPlayerRef.current = player;
      });
    }

    /* Touch & Click 이벤트 리스너 */
    window.addEventListener("touchstart", reduceSnowmanHealth);
    window.addEventListener("mousedown", reduceSnowmanHealth);
    return () => {
      window.removeEventListener("touchstart", reduceSnowmanHealth);
      window.removeEventListener("mousedown", reduceSnowmanHealth);
    };
  }, []);

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
  }, [players, isStop]);

  useEffect(() => {
    if (props.playersInfo.length === 1) return; // 플레이어가 한명이면 이동하지 않음
    adjustPlayerPosition();
  }, [props.playersInfo]);

  /** 현재 유저와의 점수 차이에 따라 rival들의 위치를 이동하는 함수 */
  const adjustPlayerPosition = () => {
    const [baseScore, rightScore, leftScore] = [
      props.playersInfo.filter((el) => el.position === "mid")[0].score,
      props.playersInfo.filter((el) => el.position === "right")[0].score,
      props.playersInfo.filter((el) => el.position === "left")?.[0]?.score,
    ];
    movePlayer("right", Math.round(((rightScore - baseScore) / 3) * 10) / 10);
    // 왼쪽 플레이어가 없을 수도 있음 (2명일 때)
    if (leftScore)
      movePlayer("left", Math.round(((leftScore - baseScore) / 3) * 10) / 10);
  };

  /** player의 z 위치를 이동하는 함수 */
  const movePlayer = (position: string, targetPosition: number) => {
    if (!players?.[position]) return;
    if (!players?.[position].visible) return;
    players[position].position.z = targetPosition - 5.5;
  };

  /* 전체 유저 아이템 효과 */
  // useEffect(() => {
  //   props.playersActiveItem.forEach((item, index) => {
  //     // 음소거 아이템 공격 -> 멈춤
  //     if (item === "mute") stopPlayer(index);
  //     // 눈사람 아이템 공격 -> 눈사람으로 변신
  //     // else if (item === "frozen") switchPlayerToSnowman(index);
  //     else if (item === "frozen") switchPlayerToSnowman(index);
  //     // 아이템 해제 -> 재생, 눈사람 해제
  //     else if (item === "") {
  //       startPlayer(index);
  //       // if (snowmans[index] && index !== 0) {
  //       // if (index !== 0) {
  //       // 본인이 눈사람이 된 경우는 reduceSnowmanHealth에서 처리하므로 여기서는 타 유저들만 처리
  //       switchSnowmanToPlayer(index);
  //       // }
  //     }
  //   });
  // }, [...props.playersActiveItem]);

  /* 눈사람 아이템 */
  const [snowmans] = useState<THREE.Object3D | null[]>([]);
  const [, setSnowmanHealth] = useState(0); // 현재 유저의 눈사람 체력

  /** 플레이어를 눈사람으로 바꾸는 함수 */
  // const switchPlayerToSnowman = (index: number) => {
  //   if (snowmans[index]) return; // If the snowman is already loaded, do not load again
  //   // load the snowman
  //   const gltfLoader = new GLTFLoader();
  //   if (!players[index]) return;
  //   gltfLoader.load("/game/player/snowman.glb", (gltf) => {
  //     const snowman = gltf.scene.children[0];
  //     snowman.scale.set(0.02, 0.02, 0.02);
  //     snowman.position.copy(players[index].position);
  //     snowman.rotateZ(Math.PI);
  //     snowman.traverse((child) => {
  //       child.castShadow = true;
  //     });
  //     snowman.name = "snowman";

  //     // 현재 유저의 player가 눈사람이 된 경우, health bar를 추가한다.
  //     if (index === 0) {
  //       addHealthBar(snowman);
  //       setSnowmanHealth(100);
  //     }

  //     // 플레이어 숨기기
  //     if (window.scene && players[index]) {
  //       players[index].visible = false;
  //       snowmans[index] = snowman;
  //     }

  //     // 눈사람 추가
  //     if (window.scene) {
  //       window.scene.add(snowman);
  //     }
  //   });
  // };

  // 눈사람 체력 게이지를 가리키는 ref
  const snowmanHealthBarRef = useRef<THREE.Mesh | null>();

  /** 현재 유저의 눈사람에 체력 게이지를 추가하는 함수 */
  // 타 유저의 눈사람에는 체력 게이지를 추가하지 않음
  // const addHealthBar = (snowman: THREE.Object3D) => {
  //   const geometry = new THREE.BoxGeometry(100, 10, 10);
  //   const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
  //   const healthBar = new THREE.Mesh(geometry, material);
  //   healthBar.rotation.x = Math.PI / 2;
  //   healthBar.position.y = snowman.position.y;
  //   healthBar.position.z = snowman.position.z + snowman.scale.z + 130;
  //   snowman.add(healthBar); // snowman의 자식으로 추가
  //   snowmanHealthBarRef.current = healthBar;
  // };

  /** 눈사람을 다시 플레이어로 바꾸는 함수 */
  // const switchSnowmanToPlayer = (index: number) => {
  //   // 플레이어 노출
  //   if (players[index]) players[index].visible = true;
  //   else if (currentPlayerRef.current) currentPlayerRef.current.visible = true;

  //   // 눈사람 제거
  //   if (snowmans[index]) window.scene.remove(snowmans[index]);
  //   snowmans[index] = null;
  //   snowmanHealthBarRef.current = null;
  // };

  /** 눈사람의 체력을 SNOWMAN_DAMAGE_INTERVAL씩 감소하는 함수 */
  const reduceSnowmanHealth = () => {
    if (!snowmans[0]) return;
    if (snowmans[0]) playCrashSound();
    setSnowmanHealth((health) => {
      if (health <= 5) {
        socket?.emit("escape_item", {
          item: "frozen",
          userId: userInfo.userId,
        });
        props.offItem("frozen");
      }
      const newHealth = Math.max(health - SNOWMAN_DAMAGE_INTERVAL, 0);
      if (snowmanHealthBarRef.current)
        snowmanHealthBarRef.current.scale.x = newHealth / 100;
      return newHealth;
    });
  };

  /* 눈사람 뿌시는 소리 */
  const soundRef = useRef(false);
  const soundCounterRef = useRef(0);
  let audio: HTMLAudioElement;
  useEffect(() => {
    audio = new Audio("/game/item/effect/small_crash.mp3");
    audio.onended = () => {
      // 오디오가 끝나면 플래그를 다시 false로 설정하고, 카운터 초기화
      // (세번 클릭까지는 오디오를 다시 재생하지 않음)
      soundRef.current = false;
      soundCounterRef.current = 0;
    };
  }, []);

  /** 눈사람 뿌시는 소리를 재생하는 함수 */
  const playCrashSound = () => {
    // 오디오가 이미 재생 중이고 카운터가 3보다 작다면 카운터를 증가시키고 아무 것도 하지 않음
    if (soundRef.current && soundCounterRef.current < 3) {
      soundCounterRef.current++;
      return;
    }

    // 오디오를 재생하고 플래그를 true로 설정하며, 카운터를 초기화합니다.
    audio
      .play()
      .catch((error) => console.error("Audio playback failed due to:", error));
    soundRef.current = true;
    soundCounterRef.current = 0;
  };

  return <div ref={canvasRef} />;
}
