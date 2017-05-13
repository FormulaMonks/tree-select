import * as React from 'react';
import * as onClickOutside from 'react-onclickoutside';

const elementKeepsUserFocus = function(el: HTMLElement){
  if (el.tagName.toLowerCase() === 'input') {
    const input = el as HTMLInputElement;
    return [
      'radio', 'range', 'file', 'submit',
      'image', 'button', 'reset', 'checkbox'
    ].indexOf(input.type.toLowerCase()) === -1;
  }
  return ['textarea'].indexOf(el.tagName.toLowerCase()) > -1;
};

export class _FocusHandler extends React.Component<{ onClick: (inside: boolean) => void }, {}>{
  public handleClickOutside() {
    this.props.onClick(false);
  }
  public render() {
    return <div
      onClick={() => this.props.onClick(true)}
      onFocus={() => this.props.onClick(true)}
      onKeyDown={e => {
        if (e.key === 'Escape' && !elementKeepsUserFocus(e.target as any))
          this.props.onClick(false)
      }}
    >
      {this.props.children}
    </div>;
  }
}

const FocusHandler = onClickOutside(_FocusHandler as any) as typeof _FocusHandler;

export default FocusHandler;
