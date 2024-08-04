import { useState } from "react";
import { LoginModal } from "./LoginModal/LoginModal";
import { RegisterModal } from "./RegisterModal/RegisterModal";

export let openLoginModal;
export let openRegisterModal;
export let closeLoginModal;
export let closeRegisterModal;

export function ModalsProvider() {
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

    openLoginModal = ()=>{setIsOpenLoginModal(true)};
    openRegisterModal = ()=>{setIsOpenRegisterModal(true)};

    closeLoginModal = ()=>{setIsOpenLoginModal(false)};
    closeRegisterModal = ()=>{setIsOpenRegisterModal(false)};

    return (
        <>
            {isOpenLoginModal && <LoginModal showModal={isOpenLoginModal} closeModal={()=>{setIsOpenLoginModal(false)}} openRegisterModal={()=>{setIsOpenRegisterModal(true)}} />}
            {isOpenRegisterModal && <RegisterModal showModal={isOpenRegisterModal} closeModal={()=>{setIsOpenRegisterModal(false)}} />}
        </>
    )
}