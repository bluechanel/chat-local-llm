import { Button } from "@nextui-org/react";
import { EditIcon } from "./icons";

export const SideBar = () => {

    return (
        <div className="h-full w-2/12 flex flex-col overflow-hidden">
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light" endContent={<EditIcon size={18} />}>New Chat</Button>
            </div>
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light">Question 1</Button>
            </div>
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light">Question 2</Button>
            </div>
            <div>
                <Button className="justify-between" fullWidth color="default" variant="light">Question 3</Button>
            </div>
        </div>
    );
};
