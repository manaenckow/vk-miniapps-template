import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

const Panel2 = props => (
  <Panel id={props.id}>
    <PanelHeader
      left={<PanelHeaderBack onClick={() => props.go('home')} />}
    >
      Example
    </PanelHeader>
  </Panel>
);

export default Panel2;
