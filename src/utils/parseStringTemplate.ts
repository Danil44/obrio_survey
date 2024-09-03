export function parseStringTemplate(template: string, extractValue: (key: string) => string): string {
  return template.replace(/{(.*?)}/g, (_, key) => extractValue(key));
}
