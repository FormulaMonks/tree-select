import * as React from 'react';
import * as onClickOutside from 'react-onclickoutside';

export class _FocusHandler extends React.Component<{ onClick: (inside: boolean) => void }, {}>{
  public handleClickOutside() {
    this.props.onClick(false);
  }
  public render() {
    return <div
      onClick={() => this.props.onClick(true)}
      onFocus={() => this.props.onClick(true)}
      onKeyUp={e => { if (e.key === 'Escape') this.props.onClick(false) }}
    >
      {this.props.children}
    </div>;
  }
}

const FocusHandler = onClickOutside(_FocusHandler as any) as typeof _FocusHandler;

export default FocusHandler;
