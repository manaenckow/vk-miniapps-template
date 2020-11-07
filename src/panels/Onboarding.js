import React from 'react';
import {
    Panel,
    PanelHeaderSimple,
    Gallery,
    Div, Button, FixedLayout
} from '@vkontakte/vkui';

import '../css/Page.css';

const Onboarding = props => {
    const pages = props.pages;

    const PageDot = ({selected, id}) => (
        <div
            className={props.state.scheme === 'space_gray' ? 'dotDark' : 'dot'}
            style={{
                width: (selected ? '8px' : '6px'),
                height: (selected ? '8px' : '6px')
            }}
            onClick={() => {
                props.setPState({slideIndex: id});
            }}
        />
    );

    const PageDots = ({pages, currentPage}) => (
        <div className="dots">
            {Array.from(new Array(pages), (x, i) => i).map((page) => (
                <PageDot key={page} selected={page === currentPage} id={page}/>
            ))}
        </div>
    );

    return (
        <Panel id={props.id}>
            <PanelHeaderSimple separator={false}/>
            <FixedLayout vertical='top'>
                <Gallery
                    onChange={(slideIndex) => props.setPState({slideIndex})}
                    slideIndex={props.state.slideIndex}
                    style={{height: window.innerHeight}}
                >
                    {pages.map((page, key) => {
                        const {image, title, subtitle} = page;
                        const scheme = props.state.scheme;
                        return (
                            <div key={key} className="onboarding">
                                <img alt='пикча' src={image} className="image"/>
                                <span className={scheme === 'bright_light' ? 'title' : 'titleD'}>{title}</span>
                                <span className={scheme === 'bright_light' ? 'subtitle' : 'subtitleD'}>{subtitle}</span>
                            </div>
                        );
                    })}
                </Gallery>
            </FixedLayout>
            <FixedLayout style={{marginBottom: 40}} vertical={'bottom'}>
                <Div>
                    <Button
                        style={{
                            marginBottom: -10
                        }}
                        stretched
                        onClick={() => {
                            if (pages.length - 1 === props.state.slideIndex) {
                                props.setPState({activePanel: 'home'});
                            } else {
                                props.setPState({slideIndex: props.state.slideIndex + 1});
                            }
                        }}
                    >
                        {pages.length - 1 === props.state.slideIndex ? 'Начать' : 'Далее'}
                    </Button>
                </Div>
                <Div>
                    <PageDots pages={pages.length} currentPage={props.state.slideIndex}/>
                </Div>
            </FixedLayout>
        </Panel>
    );
}

export default Onboarding;
