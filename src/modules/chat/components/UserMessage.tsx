import Message from "./Message";

type UserMessageProps = {
    content: string;
};

const UserMessage = ({ content }: UserMessageProps) => {
    return (
        <div className="flex justify-end max-w-[80vw] ml-auto">
            <Message content={content} sender="user" />
        </div>
    );
};

export default UserMessage;
