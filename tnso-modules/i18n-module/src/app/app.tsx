import i18n from '../translations/i18n';

export interface TextProps {
  text: string;
}
export function App({ text }: TextProps) {
  return <>{i18n.t(text)}</>;
}

export default App;
