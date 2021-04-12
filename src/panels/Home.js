import React from 'react';
import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Div,
  Header,
  FormLayout,
  FormItem
} from '@vkontakte/vkui';

const Home = props => {
  const {fetchedUser} = props.state;

  return (
      <Panel id={props.id}>
        <PanelHeader>Example</PanelHeader>

        <Group header={<Header>Basic functions</Header>}>
          <Div>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</Div>
          <Div>
            <FormLayout>
              <FormItem>
                <Button size="l" stretched onClick={() => props.go('panel2')}>
                  Simple button
                </Button>
              </FormItem>

              <FormItem>
                <Button size="l" stretched onClick={() => props.setPState({activePanel: 'onboarding'})}>
                  Open onboarding
                </Button>
              </FormItem>

              <FormItem>
                <Button size="l" stretched onClick={() => props.openDoneSnackBar('Done.')}>
                  OpenDoneSnackBar
                </Button>
              </FormItem>

              <FormItem>
                <Button
                    size="l"
                    stretched
                    onClick={() => props.openErrorSnackBar("Unknown error occurred.")}
                >
                  OpenErrorSnackBar
                </Button>
              </FormItem>

              <FormItem>
                <Button size="l" stretched onClick={() => props.openModal('main')}>
                  Open simple modal
                </Button>
              </FormItem>
            </FormLayout>
          </Div>
        </Group>
        {props.state.snackbar}
      </Panel>
  );
};

export default Home;
