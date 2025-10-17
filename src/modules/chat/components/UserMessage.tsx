import Message from "./Message";

type UserMessageProps = {
    content: string;
};

const UserMessage = ({ content }: UserMessageProps) => {
    return (
        <div className="flex justify-end">
            <Message content={content} sender="user" />
        </div>
    );
};

export default UserMessage;
