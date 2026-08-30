import "../styles/star-cover.css";

type StarCoverProps = {
    children: React.ReactNode;
    hidden?: boolean;
};

export default function StarCover({ children, hidden = false }: StarCoverProps) {
    return (
        <div className="h-full w-fit flex flex-col justify-center items-center">
            <div className={`flex ${hidden ? '' : 'star-cover'}`}>
                {children}
            </div>
        </div>
    );
}