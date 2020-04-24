import React from 'react';
import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';

const Panel2 = props => (
  <Panel id={props.id}>
    <PanelHeaderSimple
      left={<PanelHeaderBack onClick={() => props.go('home')} />}
    >
      Example
    </PanelHeaderSimple>
  </Panel>
);

export default Panel2;
