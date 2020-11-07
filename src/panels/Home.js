import React from 'react';
import {
  Panel,
  PanelHeaderSimple,
  Button,
  Group,
  Div,
  Header,
  FormLayout
} from '@vkontakte/vkui';

const Home = props => {
  const { fetchedUser } = props.state;

  return (
    <Panel id={props.id}>
      <PanelHeaderSimple>Example</PanelHeaderSimple>

      <Group header={<Header>Basic functions</Header>}>
        <Div>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</Div>
        <Div>
          <FormLayout>
            <Button size="xl" onClick={() => props.go('panel2')}>
              Simple button
            </Button>
            <Button size="xl" onClick={() => props.go('onboarding')}>
              Open onboarding
            </Button>
            <Button size="xl" onClick={() => props.openDoneSnackBar('Done.')}>
              OpenDoneSnackBar
            </Button>
            <Button
              size="xl"
              onClick={() => props.openErrorSnackBar("Unknown error occurred.")}
            >
              OpenErrorSnackBar
            </Button>
            <Button size="xl" onClick={() => props.openModal('main')}>
              Open simple modal
            </Button>
          </FormLayout>
        </Div>
      </Group>
      {props.state.snackbar}
    </Panel>
  );
};

export default Home;
