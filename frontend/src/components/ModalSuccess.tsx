import Modal from 'react-modal';

import { CSSTransition } from 'react-transition-group';
import { CheckIcon } from '@heroicons/react/24/outline';

const ModalSuccess = ({ modalState, closeModalFunction, styles, message, successMessage, backMessage }: any) => {
    return (
        <CSSTransition
            in={modalState}
            timeout={150}
        >
            <Modal
                isOpen={modalState}
                onRequestClose={closeModalFunction}
                contentLabel="Correct Guess!"
                style={styles}
                shouldCloseOnOverlayClick={true}
            >
                <div className="
                lg:w-[32rem] lg:h-[14rem]
                md:w-[24rem] md:h-[12rem]
                sm:w-[18rem] sm:h-[12rem]
                min-[0px]:w-[16rem] min-[0px]:h-[12rem]
                ">
                    <div className="flex flex-col">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-6">
                            <h2 className="
                            font-bold mt-6
                            lg:text-2xl
                            md:text-xl
                            sm:text-lg
                            min-[0px]:text-lg
                            ">{successMessage}</h2>
                            <p className="
                            text-gray-600
                            lg:text-sm
                            md:text-xs
                            sm:text-xs
                            min-[0px]:text-xs
                            ">{message}</p>
                            <div className="flex flex-row justify-end space-x-6 mt-24 w-full">
                                <button 
                                    onClick={closeModalFunction} 
                                    className="
                                    flex shadow-2xl w-full items-center justify-center rounded-md bg-red-700 pt-[10px] pb-[10px] pl-[15px] pr-[15px] font-semibold text-white opacity-80 transition duration-300 ease-in-out hover:opacity-100
                                    lg:text-base
                                    md:text-sm
                                    sm:text-xs
                                    min-[0px]:text-xs
                                    ">
                                    {backMessage}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </CSSTransition>
    )
};

export default ModalSuccess