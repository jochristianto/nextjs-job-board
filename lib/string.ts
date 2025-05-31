// Utility to strip all HTML tags
export const stripAllHtml = (input: string) => {
  return input.replace(/<[^>]+>/g, "");
};

// Utility to allow only formatting tags in description
export const sanitizeDescription = (input: string) => {
  // Allow only <b>, <strong>, <i>, <em>, <u>, <s>, <ul>, <ol>, <li>, <br>, <p>, <blockquote>, <code>, <pre>, <a>, <div>, <span>
  // Remove all other tags
  return input.replace(
    /<(?!\/?(b|strong|i|em|u|s|ul|ol|li|br|p|blockquote|code|pre|a|div|span)(\s|>|\/))/gi,
    "&lt;"
  );
};

// Convert Quill unordered lists (<ol> with <li data-list="bullet">) to <ul>
export const quillOlBulletToUl = (input: string) => {
  // Replace <ol>...</ol> with <ul>...</ul> if it contains <li data-list="bullet">
  return input
    .replace(/<ol>([\s\S]*?<li data-list="bullet">[\s\S]*?<\/li>[\s\S]*?)<\/ol>/g, (match) =>
      match.replace("<ol>", "<ul>").replace("</ol>", "</ul>")
    )
    .replace(/<li data-list="bullet">/g, "<li>");
};
