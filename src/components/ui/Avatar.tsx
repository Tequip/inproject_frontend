import { FC } from "react";
import { ESizes, sizeType } from "utils/constants";

interface AvatarProps {
    src: string;
    size?: sizeType;
    square?: boolean;
}

const Avatar: FC<AvatarProps> = ({ size = "default", square, src }) => {
    return (
        <div
            className={["overflow-hidden", square ? "" : "rounded-[50%]"].join(
                " "
            )}
        >
            <img
                width={ESizes[size]}
                height={ESizes[size]}
                style={{
                    minWidth: ESizes[size] + "px",
                    minHeight: ESizes[size] + "px",
                    maxWidth: ESizes[size] + "px",
                    maxHeight: ESizes[size] + "px",
                }}
                src={src}
                alt=""
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMTMuMDMwMiAwIDExLjA3OTYgMC4zODc5ODcgOS4yNTk3NSAxLjE0MTgxQzcuNDM5ODYgMS44OTU2MyA1Ljc4NjI4IDMuMDAwNTIgNC4zOTM0IDQuMzkzNEMxLjU4MDM1IDcuMjA2NDQgMCAxMS4wMjE4IDAgMTVDMCAxOC45NzgyIDEuNTgwMzUgMjIuNzkzNiA0LjM5MzQgMjUuNjA2NkM1Ljc4NjI4IDI2Ljk5OTUgNy40Mzk4NiAyOC4xMDQ0IDkuMjU5NzUgMjguODU4MkMxMS4wNzk2IDI5LjYxMiAxMy4wMzAyIDMwIDE1IDMwQzE4Ljk3ODIgMzAgMjIuNzkzNiAyOC40MTk2IDI1LjYwNjYgMjUuNjA2NkMyOC40MTk2IDIyLjc5MzYgMzAgMTguOTc4MiAzMCAxNUMzMCAxMy4wMzAyIDI5LjYxMiAxMS4wNzk2IDI4Ljg1ODIgOS4yNTk3NUMyOC4xMDQ0IDcuNDM5ODYgMjYuOTk5NSA1Ljc4NjI4IDI1LjYwNjYgNC4zOTM0QzI0LjIxMzcgMy4wMDA1MiAyMi41NjAxIDEuODk1NjMgMjAuNzQwMyAxLjE0MTgxQzE4LjkyMDQgMC4zODc5ODcgMTYuOTY5OCAwIDE1IDBNNy42MDUgMjQuNDJDOC4yNSAyMy4wNyAxMi4xOCAyMS43NSAxNSAyMS43NUMxNy44MiAyMS43NSAyMS43NSAyMy4wNyAyMi4zOTUgMjQuNDJDMjAuMzU1IDI2LjA0IDE3Ljc5IDI3IDE1IDI3QzEyLjIxIDI3IDkuNjQ1IDI2LjA0IDcuNjA1IDI0LjQyWk0yNC41NCAyMi4yNDVDMjIuMzk1IDE5LjYzNSAxNy4xOSAxOC43NSAxNSAxOC43NUMxMi44MSAxOC43NSA3LjYwNSAxOS42MzUgNS40NiAyMi4yNDVDMy45MyAyMC4yNSAzIDE3LjczIDMgMTVDMyA4LjM4NSA4LjM4NSAzIDE1IDNDMjEuNjE1IDMgMjcgOC4zODUgMjcgMTVDMjcgMTcuNzMgMjYuMDcgMjAuMjUgMjQuNTQgMjIuMjQ1Wk0xNSA2QzEyLjA5IDYgOS43NSA4LjM0IDkuNzUgMTEuMjVDOS43NSAxNC4xNiAxMi4wOSAxNi41IDE1IDE2LjVDMTcuOTEgMTYuNSAyMC4yNSAxNC4xNiAyMC4yNSAxMS4yNUMyMC4yNSA4LjM0IDE3LjkxIDYgMTUgNlpNMTUgMTMuNUMxNC40MDMzIDEzLjUgMTMuODMxIDEzLjI2MjkgMTMuNDA5IDEyLjg0MUMxMi45ODcxIDEyLjQxOSAxMi43NSAxMS44NDY3IDEyLjc1IDExLjI1QzEyLjc1IDEwLjY1MzMgMTIuOTg3MSAxMC4wODEgMTMuNDA5IDkuNjU5MDFDMTMuODMxIDkuMjM3MDUgMTQuNDAzMyA5IDE1IDlDMTUuNTk2NyA5IDE2LjE2OSA5LjIzNzA1IDE2LjU5MSA5LjY1OTAxQzE3LjAxMjkgMTAuMDgxIDE3LjI1IDEwLjY1MzMgMTcuMjUgMTEuMjVDMTcuMjUgMTEuODQ2NyAxNy4wMTI5IDEyLjQxOSAxNi41OTEgMTIuODQxQzE2LjE2OSAxMy4yNjI5IDE1LjU5NjcgMTMuNSAxNSAxMy41WiIgZmlsbD0iIzhGOERCRSIvPgo8L3N2Zz4K"
                }}
            />
        </div>
    );
};

export default Avatar;
