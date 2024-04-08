"use client";


import { SettingIcon } from "@/components/icons";
import { setting } from "@/config/settings";
import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";


export const Settings = () => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [modelConfig, setModelConfig] = useState<ModelConfig>({ modelName: "", apiUrl: "", apiKey: "" });


    const save = () => {
        setting.setItem("modelConfig", modelConfig)
        onClose();
    }

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
                                <Input
                                    key="name"
                                    type="text"
                                    label="Model Name"
                                    defaultValue={modelConfig.modelName}
                                    onChange={(e) => setModelConfig({ ...modelConfig, modelName: e.target.value })}
                                />
                                <Input
                                    key="api_base"
                                    type="url"
                                    label="API Url"
                                    defaultValue={modelConfig.modelName}
                                    onChange={(e) => setModelConfig({ ...modelConfig, apiUrl: e.target.value })}
                                />
                                <Input
                                    key="api_key"
                                    type="password"
                                    label="API Key"
                                    defaultValue={modelConfig.modelName}
                                    onChange={(e) => setModelConfig({ ...modelConfig, apiKey: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={save}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    );
};