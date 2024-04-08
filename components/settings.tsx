"use client";


import { SettingIcon } from "@/components/icons";
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

export const Settings = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>  <Link isExternal onClick={onOpen}>
            <SettingIcon className="text-default-500" />
        </Link>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
                            <ModalBody>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary">
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    );
};