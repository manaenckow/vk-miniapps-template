import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	ConfigProvider, View, Snackbar, Avatar, IS_PLATFORM_ANDROID, Div,
	ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton,
	Epic, Tabbar, TabbarItem
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './css/main.css';
import './css/fonts.css';

import API from './helpers/API.js';

import Home from './panels/Home';
import Panel2 from './panels/Panel2';

import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Clear from '@vkontakte/icons/dist/16/clear';

import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28LikeOutline from '@vkontakte/icons/dist/28/like_outline';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activeStory: 'home',

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
	}

	componentDidMount() {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme;
				document.body.attributes.setNamedItem(schemeAttribute);
				this.setState({ scheme: data.scheme });
			}
			if(type === 'VKWebAppGetUserInfoResult'){
				this.setState({ fetchedUser: data });
			}
		});
		bridge.send('VKWebAppGetUserInfo');
	}

	go = (activePanel) => {
			this.setState({ activePanel });
	};

	openDoneSnackBar = e => {
		this.setState({
			snackbar:
				<Snackbar
					layout="vertical"
					duration={3000}
					onClose={() => this.setState({ snackbar: null })}
					before={
						<Avatar size={24} style={{ backgroundColor: '#4bb34b' }}>
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
					onClose={() => this.setState({ snackbar: null })}
					before={
						<Avatar size={24} style={{ backgroundColor: '#FF0000' }}>
							<Icon16Clear fill="#fff" width={14} height={14}/>
						</Avatar>
					}
				>
					{e}
				</Snackbar>
		});
	};

	 closeModal = () => {
		this.setState({ modal: null });
	};

	 openModal = (modal) => {
		this.setState({ modal: modal });
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

		const { activePanel, activeStory, popout, scheme } = this.state;
		const view = { activePanel, activeStory, popout, modal };
		return (
			<ConfigProvider scheme={scheme}>
				<Epic activeStory={activeStory} tabbar={
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

