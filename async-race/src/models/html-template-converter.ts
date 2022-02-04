export default function (htmlString: string) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  // const clone = template.content.cloneNode(true);
  return template.content.cloneNode(true);
}
