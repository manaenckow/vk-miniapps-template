import React, {Component} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    ConfigProvider,
    View,
    Snackbar,
    Avatar,
    IS_PLATFORM_ANDROID,
    Div,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Epic,
    Tabbar,
    TabbarItem,
    ScreenSpinner
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './css/main.css';
import './css/fonts.css';

import API from './helpers/API.js';

import Onboarding from "./panels/Onboarding";

import Home from './panels/Home';

import Panel2 from './panels/Panel2';

import {
    Icon16Clear,
    Icon16Done,
    Icon24Done,
    Icon24Cancel,
    Icon28SettingsOutline,
    Icon28LikeOutline
} from '@vkontakte/icons';

import dark1 from './panels/components/onboardingPanels/dark1.png';
import dark4 from './panels/components/onboardingPanels/dark4.png';
import dark6 from './panels/components/onboardingPanels/dark6.png';
import dark7 from './panels/components/onboardingPanels/dark7.png';

import light1 from './panels/components/onboardingPanels/light1.png';
import light4 from './panels/components/onboardingPanels/light4.png';
import light6 from './panels/components/onboardingPanels/light6.png';
import light7 from './panels/components/onboardingPanels/light7.png';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            activeStory: 'home',

            slideIndex: 1,

            popout: null,
            modal: null,
            snackbar: null,

            fetchedUser: {
                id: 1,
                first_name: 'Test',
                last_name: 'User'
            },

            scheme: true ? 'space_gray' : 'bright_light'
        };
        this.api = new API();
        this.initHelpers();
    }

    componentDidMount() {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme;
                document.body.attributes.setNamedItem(schemeAttribute);
                this.setState({scheme: data.scheme});
            }
            if (type === 'VKWebAppGetUserInfoResult') {
                this.setState({fetchedUser: data});
            }
        });
        bridge.send('VKWebAppGetUserInfo');
    }

    initHelpers = () => {
        window.startLoad = () => {
            this.setState({
                popout: <ScreenSpinner/>
            })
        }

        window.endLoad = () => {
            this.setState({
                popout: null
            })
        }

        window.openDoneSnackBar = this.openDoneSnackBar;
        window.openErrorSnackBar = this.openErrorSnackBar;
    }

    go = (activePanel) => {
        this.setState({activePanel});
    };

    openDoneSnackBar = e => {
        this.setState({
            snackbar:
                <Snackbar
                    layout="vertical"
                    duration={3000}
                    onClose={() => this.setState({snackbar: null})}
                    before={
                        <Avatar size={24} style={{backgroundColor: '#4bb34b'}}>
                            <Icon16Done fill="#fff" width={14} height={14}/>
                        </Avatar>
                    }
                >
                    {e}
                </Snackbar>
        });
    };

    openErrorSnackBar = e => {
        this.setState({
            snackbar:
                <Snackbar
                    duration={3000}
                    layout="vertical"
                    onClose={() => this.setState({snackbar: null})}
                    before={
                        <Avatar size={24} style={{backgroundColor: '#FF0000'}}>
                            <Icon16Clear fill="#fff" width={14} height={14}/>
                        </Avatar>
                    }
                >
                    {e}
                </Snackbar>
        });
    };

    closeModal = () => {
        this.setState({modal: null});
    };

    openModal = (modal) => {
        this.setState({modal: modal});
    };

    render() {

        const modal = (
            <ModalRoot activeModal={this.state.modal} onClose={this.closeModal}>
                <ModalPage
                    id='main'
                    onClose={this.closeModal}
                    header={
                        <ModalPageHeader
                            left={IS_PLATFORM_ANDROID &&
                            <PanelHeaderButton onClick={this.closeModal}>
                                <Icon24Cancel/>
                            </PanelHeaderButton>}
                            right={
                                <PanelHeaderButton onClick={this.closeModal}>
                                    {IS_PLATFORM_ANDROID ? <Icon24Done/> : 'Готово'}
                                </PanelHeaderButton>
                            }
                        >
                            Simple modal
                        </ModalPageHeader>
                    }
                >
                    <Div>
                        Simple modal content
                    </Div>
                </ModalPage>
            </ModalRoot>
        );

        const pages = [
            {
                image: this.state.scheme === 'bright_light' ? light1 : dark1,
                title: 'Заголовок',
                subtitle: 'Подзаголовок',
            },
            {
                image: this.state.scheme === 'bright_light' ? light4 : dark4,
                title: 'Заголовок',
                subtitle: 'Подзаголовок',
            },
            {
                image: this.state.scheme === 'bright_light' ? light6 : dark6,
                title: 'Заголовок',
                subtitle: 'Подзаголовок',
            },
            {
                image: this.state.scheme === 'bright_light' ? light7 : dark7,
                title: 'Заголовок',
                subtitle: 'Подзаголовок',
            },
        ];

        const {activePanel, activeStory, popout, scheme} = this.state;
        const history = ['home', 'onboarding'].includes(activePanel) ? [activePanel] : ['home', activePanel];
        const onSwipeBack = () => this.go('home');
        const view = {activePanel, activeStory, popout, modal, history, onSwipeBack};
        return (
            <ConfigProvider scheme={scheme} isWebView>
                <Epic activeStory={activeStory} tabbar={activePanel !== 'onboarding' &&
                    <Tabbar>
                        <TabbarItem
                            onClick={() => {
                                this.setState({
                                    activeStory: 'home',
                                    activePanel: 'home'
                                })
                            }}
                            selected={this.state.activeStory === 'home'}
                        ><Icon28SettingsOutline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => {
                                this.setState({
                                    activeStory: 'story2',
                                    activePanel: 'home'
                                })
                            }}
                            selected={this.state.activeStory === 'story2'}
                        ><Icon28LikeOutline/>
                        </TabbarItem>
                    </Tabbar>
                }>
                    <View id='home' header={false} {...view}>
                        <Onboarding
                            id='onboarding'
                            setPState={this.setState.bind(this)}
                            pages={pages}
                            {...this}
                        />
                        <Home id='home' {...this} />
                        <Panel2 id='panel2' {...this} />
                    </View>
                    <View id='story2' header={false} {...view}>
                        <Home id='home' {...this} />
                        <Panel2 id='panel2' {...this} />
                    </View>
                </Epic>
            </ConfigProvider>
        );
    }
}

export default App;

