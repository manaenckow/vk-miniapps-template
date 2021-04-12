import React, {Component, /*Suspense, lazy*/} from 'react';
import bridge from '@vkontakte/vk-bridge';

// Components
import {
    ConfigProvider,
    View,
    Snackbar,
    Avatar,
    ModalRoot,
    Epic,
    Tabbar,
    TabbarItem,
    ScreenSpinner
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


// Styles
import './css/main.css';
import './css/fonts.css';

// Helpers
import API from './helpers/API.js';

// Panels
import Onboarding from "./panels/components/onboardingPanels/Onboarding";
import Home from './panels/Home';
import Panel2 from './panels/Panel2';

// Modals
import SimpleModal from "./modals/SimpleModal";

// Icons

import {
    Icon16Clear,
    Icon16Done,
    Icon28SettingsOutline,
    Icon28Profile
} from '@vkontakte/icons';


//const SimpleModal = lazy(() => import('./modals/SimpleModal'));

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

            user: false,

            scheme: 'bright_light'
        };
        this.api = new API();
        this.initHelpers();
    }

    componentDidMount() {
        bridge.send("VKWebAppInit");
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


    getUser = () => {
        this.api.GetUser().then(res => {
            if (res.vk_id) {
                this.setState({user: res});
            } else {
                this.openErrorSnackBar(res.error || res);
            }
        })
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

        const {activePanel, activeStory, popout, scheme, modal} = this.state;

        const modalRoot = (
            <ModalRoot activeModal={modal} onClose={this.closeModal}>
                    <SimpleModal id='main' closeModal={this.closeModal}/>
            </ModalRoot>
        );

        const history = ['home', 'onboarding'].includes(activePanel) ? [activePanel] : ['home', activePanel];
        const onSwipeBack = () => this.go('home');
        const view = {activePanel, activeStory, popout, modal: modalRoot, history, onSwipeBack};
        const props = {setPState: this.setState.bind(this)}
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
                        selected={activeStory === 'home'}
                    ><Icon28Profile/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={() => {
                            this.setState({
                                activeStory: 'story2',
                                activePanel: 'panel2'
                            })
                        }}
                        selected={activeStory === 'story2'}
                    ><Icon28SettingsOutline/>
                    </TabbarItem>
                </Tabbar>
                }>
                    <View id='home' {...view}>
                        <Onboarding id='onboarding' {...this} {...props}/>
                        <Home id='home' {...this} {...props}/>
                        <Panel2 id='panel2' {...this} {...props}/>
                    </View>
                    <View id='story2' {...view}>
                        <Home id='home' {...this} {...props}/>
                        <Panel2 id='panel2' {...this} {...props}/>
                    </View>
                </Epic>
            </ConfigProvider>
        );
    }
}

export default App;

