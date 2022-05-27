import { JSX } from '@statsify/rendering';
import { noop } from '@statsify/util';

export interface IfProps {
  condition: boolean;
  children: JSX.Children | JSX.Children<() => JSX.Children>;
}

/**
 *
 * @description Conditionally show a component based on a boolean `condition` prop
 * @example
 * ```ts
 * <If condition={true} >
 *  <box><text>Hello World</text></box>
 * </If>
 * ```
 */
export const If: JSX.FC<IfProps> = ({ condition, children }) => {
  if (condition) {
    return <>{typeof children === 'function' ? children() : children}</>;
  }

  return noop();
};
