export const isKeyword = (data: string, keyword: string, i: number) => {
  return (
    data.replaceAll(keyword, `!@#$${keyword}!@#$`).split("!@#$")?.[
      i + 1
    ]?.[0] === " " ||
    (i !== 0 && keyword[keyword.length - 1] === " ")
  );
};
