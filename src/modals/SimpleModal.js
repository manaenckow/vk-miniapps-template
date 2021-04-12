import {
    Div,
    IS_PLATFORM_ANDROID,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton
} from "@vkontakte/vkui";
import {Icon24Cancel} from "@vkontakte/icons";
import React, {Suspense} from "react";

const SimpleModal = ({closeModal, id}) => (
    <Suspense fallback={<div>Loading... </div>}>
    <ModalPage
        id={id}
        onClose={closeModal}
        header={
            <ModalPageHeader
                left={IS_PLATFORM_ANDROID &&
                <PanelHeaderButton onClick={closeModal}>
                    <Icon24Cancel/>
                </PanelHeaderButton>}
                right={
                    !IS_PLATFORM_ANDROID &&
                    <PanelHeaderButton onClick={closeModal}>
                        <Div>Готово</Div>
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
    </Suspense>
);

export default SimpleModal;