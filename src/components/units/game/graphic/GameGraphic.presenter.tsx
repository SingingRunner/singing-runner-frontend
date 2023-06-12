import * as S from "./GameGraphic.styles";
import { IGameGraphicUIProps } from "./GameGraphic.types";

export default function GameGraphicUI(props: IGameGraphicUIProps) {
  return (
    <>
      <div ref={props.canvasRef}></div>
      <S.TestButtonWrapper>
        <button onClick={() => props.reduceSnowmanHealth()}>체력</button>

        {/* 눈사람 아이템: 화면 두드려야 탈출 가능 */}
        <button onClick={() => props.switchPlayerToSnowman(2)}>
          눈사람으로
        </button>
        <button onClick={() => props.switchPlayerToSnowman(1)}>
          눈사람으로
        </button>
        <button onClick={() => props.switchPlayerToSnowman(0)}>
          눈사람으로
        </button>
        <br />

        <button onClick={() => props.switchSnowmanToPlayer(2)}>고양이로</button>
        <button onClick={() => props.switchSnowmanToPlayer(1)}>고양이로</button>
        <button onClick={() => props.switchSnowmanToPlayer(0)}>고양이로</button>
        <br />

        {/* 음소거 아이템: 소리 질러야 탈출 가능 */}
        <button onClick={() => props.stopPlayer(2)}>1번 멈춰</button>
        <button onClick={() => props.startPlayer(2)}>1번 달려</button>
        <br />

        <button onClick={() => props.stopPlayer(1)}>2번 멈춰</button>
        <button onClick={() => props.startPlayer(1)}>2번 달려</button>
        <br />

        <button onClick={() => props.stopPlayer(0)}>3번 멈춰</button>
        <button onClick={() => props.startPlayer(0)}>3번 달려</button>
        <br />

        {/* 실시간 채점 */}
        <button onClick={() => props.movePlayer(2, "forward")}>
          1번 빠르게
        </button>
        <button onClick={() => props.movePlayer(2, "backward")}>
          1번 느리게
        </button>
        <br />

        <button onClick={() => props.movePlayer(1, "forward")}>
          2번 빠르게
        </button>
        <button onClick={() => props.movePlayer(1, "backward")}>
          2번 느리게
        </button>
        <br />

        <button onClick={() => props.movePlayer(0, "forward")}>
          3번 빠르게
        </button>
        <button onClick={() => props.movePlayer(0, "backward")}>
          3번 느리게
        </button>
      </S.TestButtonWrapper>
    </>
  );
}
