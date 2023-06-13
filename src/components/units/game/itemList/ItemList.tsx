// 현재 유저가 가지고 있는 아이템 목록
import styled from "@emotion/styled";

interface IItemListProps {
  itemList: string[];
  useItem: (item: string) => void;
}

export default function ItemList(props: IItemListProps) {
  return (
    <ItemWrapper>
      {props.itemList
        .filter((item) => item)
        .map((item, i) => (
          <img
            key={i}
            src={`/game/item/${item}.png`}
            onClick={() => props.useItem(item)}
          />
        ))}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  right: 0;
  img {
    width: 84px;
    height: 84px;
    margin-bottom: -8px;
  }
`;
