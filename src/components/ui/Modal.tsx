import { FC, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "./IconButton";

interface IModalProps {
    state: boolean;
    closeModal: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

export const Modal: FC<IModalProps> = ({
    title = "",
    state,
    closeModal,
    children,
}) => {
    return (
        <Transition.Root show={state} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="bg-secondary border-2 border-primary w-[80vw] relative text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full p-4">
                                <div style={{ opacity: state ? 1 : 0 }}>
                                    <div className="flex items-center justify-between">
                                        <h4>{title}</h4>
                                        <IconButton
                                            onClick={closeModal}
                                            name="close"
                                            size="lg"
                                            color="var(--color-primary)"
                                        />
                                    </div>
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
