import styled from "@emotion/styled";

interface ILabeProps {
  text: string;
  marginTop?: string;
}

export default function Label(props: ILabeProps) {
  return (
    <LabelDiv style={{ marginTop: props.marginTop }}>{props.text}</LabelDiv>
  );
}

const LabelDiv = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;
