import { TNSOContainerProps } from "./container.model";

export function TNSOContainer(props: TNSOContainerProps): JSX.Element {
  return (
    <div className={`${props.fluid ? "container-fluid" : "container"} ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}

export default TNSOContainer;
