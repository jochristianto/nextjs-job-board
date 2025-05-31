// Utility to strip all HTML tags
export const stripAllHtml = (input: string) => {
  return input.replace(/<[^>]+>/g, "");
};

// Utility to allow only formatting tags in description
export const sanitizeDescription = (input: string) => {
  // Allow only <b>, <strong>, <i>, <em>, <u>, <s>, <ul>, <ol>, <li>, <br>, <p>, <blockquote>, <code>, <pre>, <a>
  // Remove all other tags
  return input.replace(
    /<(?!\/?(b|strong|i|em|u|s|ul|ol|li|br|p|blockquote|code|pre|a)(\s|>|\/))/gi,
    "&lt;"
  );
};
